import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const CENSUS_THRESHOLD = 10_000;
const CITY_POPULATION_BASE = "https://www.citypopulation.de/en/argentina";
const CENSUS_SOURCE = "https://www.indec.gob.ar/indec/web/Nivel4-Tema-2-41-165?lang=es";
const CONICET_LOCALITIES_SOURCE = "https://datosdeinvestigacion.conicet.gov.ar/handle/11336/274043";
const GEOREF_BASE = "https://apis.datos.gob.ar/georef/api/v2.0";
const GEOREF_SOURCE = "https://www.argentina.gob.ar/georef/descarga-de-la-base-completa";

const provinceSlugs: Record<string, string> = {
  buenos_aires: "buenosaires", catamarca: "catamarca", chaco: "chaco", chubut: "chubut", cordoba: "cordoba", corrientes: "corrientes", entre_rios: "entrerios", formosa: "formosa", jujuy: "jujuy", la_pampa: "lapampa", la_rioja: "larioja", mendoza: "mendoza", misiones: "misiones", neuquen: "neuquen", rio_negro: "rionegro", salta: "salta", san_juan: "sanjuan", san_luis: "sanluis", santa_cruz: "santacruz", santa_fe: "santafe", santiago_del_estero: "santiagodelestero", tierra_del_fuego: "tierradelfuego", tucuman: "tucuman"
};
const provinceGeorefIds: Record<string, string> = { caba: "02", buenos_aires: "06", catamarca: "10", cordoba: "14", corrientes: "18", chaco: "22", chubut: "26", entre_rios: "30", formosa: "34", jujuy: "38", la_pampa: "42", la_rioja: "46", mendoza: "50", misiones: "54", neuquen: "58", rio_negro: "62", salta: "66", san_juan: "70", san_luis: "74", santa_cruz: "78", santa_fe: "82", santiago_del_estero: "86", tucuman: "90", tierra_del_fuego: "94" };

type CensusLocalityApiRow = { id: string; name: string; department?: string; population2022: number; unit: "localidad_censal"; lat?: number; lng?: number; georefId?: string };
const localityCache = new Map<string, { expiresAt: number; rows: CensusLocalityApiRow[] }>();
const geoCache = new Map<string, { expiresAt: number; value: any }>();

const decodeHtml = (value: string) => value.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í").replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú").replace(/&Aacute;/g, "Á").replace(/&Eacute;/g, "É").replace(/&Iacute;/g, "Í").replace(/&Oacute;/g, "Ó").replace(/&Uacute;/g, "Ú").replace(/&ntilde;/g, "ñ").replace(/&Ntilde;/g, "Ñ");
const stripHtml = (value: string) => decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

async function fetchJsonCached(url: string, ttlMs = 24 * 60 * 60 * 1000) {
  const cached = geoCache.get(url);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const response = await fetch(url, { headers: { "User-Agent": "ConLaTuyaContribuyente/1.0 (+public-tax-map)" }, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Georef respondió ${response.status}`);
  const value = await response.json();
  geoCache.set(url, { expiresAt: Date.now() + ttlMs, value });
  return value;
}

function parseCityPopulationLocalities(html: string): CensusLocalityApiRow[] {
  const rows: CensusLocalityApiRow[] = [];
  const rowMatches = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  for (const rowHtml of rowMatches) {
    const cells = Array.from(rowHtml.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)).map(match => stripHtml(match[1]));
    if (cells.length < 5) continue;
    const statusIndex = cells.findIndex(cell => /^Locality$/i.test(cell));
    if (statusIndex < 0) continue;
    const name = cells[0]?.trim(); if (!name) continue;
    const department = cells[statusIndex + 1]?.trim() || undefined;
    const numericCells = cells.slice(statusIndex + 2).map(cell => Number(cell.replace(/[^0-9]/g, ""))).filter(value => Number.isFinite(value) && value > 0);
    const population2022 = numericCells[numericCells.length - 1];
    if (!population2022 || population2022 < CENSUS_THRESHOLD) continue;
    rows.push({ id: slugify(`${department || ""}-${name}`), name, department, population2022, unit: "localidad_censal" });
  }
  const unique = new Map<string, CensusLocalityApiRow>();
  for (const row of rows) { const prev = unique.get(row.id); if (!prev || row.population2022 > prev.population2022) unique.set(row.id, row); }
  return Array.from(unique.values()).sort((a, b) => b.population2022 - a.population2022 || a.name.localeCompare(b.name, "es"));
}

async function enrichWithGeoref(provinceId: string, rows: CensusLocalityApiRow[]) {
  const georefProvinceId = provinceGeorefIds[provinceId]; if (!georefProvinceId) return rows;
  try {
    const payload = await fetchJsonCached(`${GEOREF_BASE}/localidades?provincia=${encodeURIComponent(georefProvinceId)}&max=5000`);
    const byName = new Map<string, any[]>();
    for (const item of payload.localidades || []) { const key = normalize(item.nombre || ""); const arr = byName.get(key) || []; arr.push(item); byName.set(key, arr); }
    return rows.map(row => {
      const candidates = byName.get(normalize(row.name)) || []; let match = candidates[0];
      if (candidates.length > 1 && row.department) { const dep = normalize(row.department); match = candidates.find(item => normalize(item.departamento?.nombre || "").includes(dep) || dep.includes(normalize(item.departamento?.nombre || ""))) || match; }
      const lat = Number(match?.centroide?.lat); const lng = Number(match?.centroide?.lon);
      return { ...row, lat: Number.isFinite(lat) ? lat : undefined, lng: Number.isFinite(lng) ? lng : undefined, georefId: match?.id };
    });
  } catch (error) { console.warn("No se pudieron enriquecer localidades con Georef:", error); return rows; }
}

async function getCensusLocalities(provinceId: string): Promise<CensusLocalityApiRow[]> {
  if (provinceId === "caba") return [{ id: "caba", name: "Ciudad Autónoma de Buenos Aires", population2022: 3_121_707, unit: "localidad_censal", lat: -34.6037, lng: -58.3816, georefId: "02000010" }];
  const cached = localityCache.get(provinceId); if (cached && cached.expiresAt > Date.now()) return cached.rows;
  const slug = provinceSlugs[provinceId]; if (!slug) throw new Error("Provincia no reconocida");
  const response = await fetch(`${CITY_POPULATION_BASE}/${slug}/`, { headers: { "User-Agent": "ConLaTuyaContribuyente/1.0 (+census-comparator)" }, signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Fuente censal operativa respondió ${response.status}`);
  const parsed = parseCityPopulationLocalities(await response.text()); if (!parsed.length) throw new Error("No se pudieron extraer localidades verificables de la fuente operativa");
  const rows = await enrichWithGeoref(provinceId, parsed); localityCache.set(provinceId, { expiresAt: Date.now() + 24 * 60 * 60 * 1000, rows }); return rows;
}

async function startServer() {
  const app = express(); const PORT = 3000; app.use(express.json());
  const VISITS_FILE = path.join(process.cwd(), "visits.json"); let visitCount = 24153;
  try { if (fs.existsSync(VISITS_FILE)) { const parsed = JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8")); if (typeof parsed.views === "number") visitCount = parsed.views; } else fs.writeFileSync(VISITS_FILE, JSON.stringify({ views: visitCount }), "utf-8"); } catch (error) { console.error("Error al leer/escribir base de visitas, se usa memoria:", error); }
  const saveVisits = () => { try { fs.writeFile(VISITS_FILE, JSON.stringify({ views: visitCount }), "utf-8", err => { if (err) console.error("Error al escribir visitas:", err); }); } catch (error) { console.error("Error al iniciar escritura en disco de visitas:", error); } };
  app.get("/api/visits", (_req, res) => res.json({ views: visitCount }));
  app.post("/api/visits/increment", (_req, res) => { visitCount += 1; saveVisits(); res.json({ views: visitCount }); });

  app.get("/api/censo/localidades", async (req, res) => {
    const provinceId = String(req.query.provinceId || "");
    if (!provinceId || (provinceId !== "caba" && !provinceSlugs[provinceId])) return res.status(400).json({ error: "provinceId inválido" });
    try {
      const localities = await getCensusLocalities(provinceId);
      return res.json({ censusYear: 2022, threshold: CENSUS_THRESHOLD, provinceId, count: localities.length, localities, methodology: "Localidades con población 2022 >= 10.000. La población define elegibilidad; la imposición municipal se vincula por separado al gobierno local competente.", primarySources: [CENSUS_SOURCE, CONICET_LOCALITIES_SOURCE, GEOREF_SOURCE], operationalMirror: provinceId === "caba" ? undefined : `${CITY_POPULATION_BASE}/${provinceSlugs[provinceId] || ""}/`, evidenceStatus: "population_censo_2022_plus_official_georef_centroids" });
    } catch (error) { console.error("Error al cargar localidades Censo 2022:", error); return res.status(503).json({ error: "Sin datos verificables disponibles en este momento para la provincia seleccionada.", censusYear: 2022, threshold: CENSUS_THRESHOLD, primarySources: [CENSUS_SOURCE, CONICET_LOCALITIES_SOURCE, GEOREF_SOURCE] }); }
  });

  app.get("/api/georef/provincias", async (_req, res) => { try { res.json(await fetchJsonCached(`${GEOREF_BASE}/provincias.geojson`, 7 * 24 * 60 * 60 * 1000)); } catch (error) { console.error("Error Georef provincias:", error); res.status(503).json({ error: "No se pudo obtener la geometría oficial de provincias." }); } });
  app.get("/api/georef/municipios", async (req, res) => { const provinceId = String(req.query.provinceId || ""); const georefProvinceId = provinceGeorefIds[provinceId]; if (!georefProvinceId) return res.status(400).json({ error: "provinceId inválido" }); try { res.json(await fetchJsonCached(`${GEOREF_BASE}/municipios.geojson?provincia=${encodeURIComponent(georefProvinceId)}`, 7 * 24 * 60 * 60 * 1000)); } catch (error) { console.error("Error Georef municipios:", error); res.status(503).json({ error: "No se pudo obtener la geometría oficial de municipios." }); } });

  if (process.env.NODE_ENV !== "production") { const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" }); app.use(vite.middlewares); }
  else { const distPath = path.join(process.cwd(), "dist"); app.use(express.static(distPath)); app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html"))); }
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
}
startServer();
