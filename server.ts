import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const CENSUS_THRESHOLD = 10_000;
const CITY_POPULATION_BASE = "https://www.citypopulation.de/en/argentina";
const CENSUS_SOURCE = "https://www.indec.gob.ar/indec/web/Nivel4-Tema-2-41-165?lang=es";
const CONICET_LOCALITIES_SOURCE = "https://datosdeinvestigacion.conicet.gov.ar/handle/11336/274043";

const provinceSlugs: Record<string, string> = {
  buenos_aires: "buenosaires",
  catamarca: "catamarca",
  chaco: "chaco",
  chubut: "chubut",
  cordoba: "cordoba",
  corrientes: "corrientes",
  entre_rios: "entrerios",
  formosa: "formosa",
  jujuy: "jujuy",
  la_pampa: "lapampa",
  la_rioja: "larioja",
  mendoza: "mendoza",
  misiones: "misiones",
  neuquen: "neuquen",
  rio_negro: "rionegro",
  salta: "salta",
  san_juan: "sanjuan",
  san_luis: "sanluis",
  santa_cruz: "santacruz",
  santa_fe: "santafe",
  santiago_del_estero: "santiagodelestero",
  tierra_del_fuego: "tierradelfuego",
  tucuman: "tucuman"
};

type CensusLocalityApiRow = {
  id: string;
  name: string;
  department?: string;
  population2022: number;
  unit: "localidad_censal";
};

const localityCache = new Map<string, { expiresAt: number; rows: CensusLocalityApiRow[] }>();

const decodeHtml = (value: string) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í").replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú")
  .replace(/&Aacute;/g, "Á").replace(/&Eacute;/g, "É").replace(/&Iacute;/g, "Í").replace(/&Oacute;/g, "Ó").replace(/&Uacute;/g, "Ú")
  .replace(/&ntilde;/g, "ñ").replace(/&Ntilde;/g, "Ñ");

const stripHtml = (value: string) => decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parseCityPopulationLocalities(html: string): CensusLocalityApiRow[] {
  const rows: CensusLocalityApiRow[] = [];
  const rowMatches = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];

  for (const rowHtml of rowMatches) {
    const cells = Array.from(rowHtml.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)).map(match => stripHtml(match[1]));
    if (cells.length < 5) continue;

    const statusIndex = cells.findIndex(cell => /^Locality$/i.test(cell));
    if (statusIndex < 0) continue;

    const name = cells[0]?.trim();
    if (!name) continue;
    const department = cells[statusIndex + 1]?.trim() || undefined;

    const numericCells = cells
      .slice(statusIndex + 2)
      .map(cell => Number(cell.replace(/[^0-9]/g, "")))
      .filter(value => Number.isFinite(value) && value > 0);
    const population2022 = numericCells[numericCells.length - 1];
    if (!population2022 || population2022 < CENSUS_THRESHOLD) continue;

    rows.push({
      id: slugify(`${department || ""}-${name}`),
      name,
      department,
      population2022,
      unit: "localidad_censal"
    });
  }

  const unique = new Map<string, CensusLocalityApiRow>();
  for (const row of rows) {
    const prev = unique.get(row.id);
    if (!prev || row.population2022 > prev.population2022) unique.set(row.id, row);
  }
  return Array.from(unique.values()).sort((a, b) => b.population2022 - a.population2022 || a.name.localeCompare(b.name, "es"));
}

async function getCensusLocalities(provinceId: string): Promise<CensusLocalityApiRow[]> {
  if (provinceId === "caba") {
    return [{ id: "caba", name: "Ciudad Autónoma de Buenos Aires", population2022: 3_121_707, unit: "localidad_censal" }];
  }

  const cached = localityCache.get(provinceId);
  if (cached && cached.expiresAt > Date.now()) return cached.rows;

  const slug = provinceSlugs[provinceId];
  if (!slug) throw new Error("Provincia no reconocida");

  const response = await fetch(`${CITY_POPULATION_BASE}/${slug}/`, {
    headers: { "User-Agent": "ConLaTuyaContribuyente/1.0 (+census-comparator)" },
    signal: AbortSignal.timeout(15_000)
  });
  if (!response.ok) throw new Error(`Fuente censal operativa respondió ${response.status}`);
  const html = await response.text();
  const rows = parseCityPopulationLocalities(html);
  if (!rows.length) throw new Error("No se pudieron extraer localidades verificables de la fuente operativa");

  localityCache.set(provinceId, { expiresAt: Date.now() + 24 * 60 * 60 * 1000, rows });
  return rows;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const VISITS_FILE = path.join(process.cwd(), "visits.json");
  let visitCount = 24153;

  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (typeof parsed.views === "number") visitCount = parsed.views;
    } else {
      fs.writeFileSync(VISITS_FILE, JSON.stringify({ views: visitCount }), "utf-8");
    }
  } catch (error) {
    console.error("Error al leer/escribir base de visitas, se usa memoria:", error);
  }

  const saveVisits = () => {
    try {
      fs.writeFile(VISITS_FILE, JSON.stringify({ views: visitCount }), "utf-8", (err) => {
        if (err) console.error("Error al escribir visitas:", err);
      });
    } catch (error) {
      console.error("Error al iniciar escritura en disco de visitas:", error);
    }
  };

  app.get("/api/visits", (_req, res) => res.json({ views: visitCount }));

  app.post("/api/visits/increment", (_req, res) => {
    visitCount += 1;
    saveVisits();
    res.json({ views: visitCount });
  });

  app.get("/api/censo/localidades", async (req, res) => {
    const provinceId = String(req.query.provinceId || "");
    if (!provinceId || (provinceId !== "caba" && !provinceSlugs[provinceId])) {
      return res.status(400).json({ error: "provinceId inválido" });
    }

    try {
      const localities = await getCensusLocalities(provinceId);
      return res.json({
        censusYear: 2022,
        threshold: CENSUS_THRESHOLD,
        provinceId,
        count: localities.length,
        localities,
        methodology: "Localidades con población 2022 >= 10.000. La población define elegibilidad; la imposición municipal se vincula por separado al gobierno local competente.",
        primarySources: [CENSUS_SOURCE, CONICET_LOCALITIES_SOURCE],
        operationalMirror: `${CITY_POPULATION_BASE}/${provinceSlugs[provinceId] || ""}/`,
        evidenceStatus: "population_from_censo_2022_operational_mirror"
      });
    } catch (error) {
      console.error("Error al cargar localidades Censo 2022:", error);
      return res.status(503).json({
        error: "Sin datos verificables disponibles en este momento para la provincia seleccionada.",
        censusYear: 2022,
        threshold: CENSUS_THRESHOLD,
        primarySources: [CENSUS_SOURCE, CONICET_LOCALITIES_SOURCE]
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
}

startServer();
