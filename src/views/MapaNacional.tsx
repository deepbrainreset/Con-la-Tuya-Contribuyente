/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Layers3, MapPin, ShieldCheck, ZoomIn } from 'lucide-react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { JURISDICTIONS } from '../data/jurisdictions';
import { TRIBUTOS } from '../data/tributos';
import { CENSUS_PROVINCES_2022 } from '../data/censo2022Territorial';

interface MapaNacionalProps {
  onNavigate: (tab: string, param?: string) => void;
  selectedJurisdictionId?: string;
  setSelectedJurisdictionId: (id: string | undefined) => void;
}

type LocalityRow = {
  id: string;
  name: string;
  department?: string;
  population2022: number;
  lat?: number;
  lng?: number;
  georefId?: string;
};

type MapLevel = 'province' | 'locality' | 'municipality';

type BurdenMode = 'indexed' | 'effective';

const GEOREF_SOURCE = 'https://www.argentina.gob.ar/georef/descarga-de-la-base-completa';
const CENSUS_SOURCE = 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-2-41-165?lang=es';

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const provinceAliases: Record<string, string> = {
  'ciudad autonoma de buenos aires': 'caba',
  'caba': 'caba',
  'buenos aires': 'buenos_aires',
  'santiago del estero': 'santiago_del_estero',
  'tierra del fuego antartida e islas del atlantico sur': 'tierra_del_fuego'
};

function provinceIdFromName(name: string) {
  const key = normalize(name);
  const alias = provinceAliases[key];
  if (alias) return alias;
  return CENSUS_PROVINCES_2022.find(p => normalize(p.name) === key)?.id;
}

function jurisdictionFromName(name: string, level?: 'province' | 'municipality') {
  const key = normalize(name.replace(/\s*\([^)]*\)/g, ''));
  return JURISDICTIONS.find(j => {
    if (j.isBaseDemo) return false;
    if (level === 'province' && !['province', 'city_autonoma'].includes(j.level)) return false;
    if (level === 'municipality' && j.level !== 'municipality') return false;
    const jName = normalize(j.name.replace(/^provincia de\s+/i, '').replace(/\s*\([^)]*\)/g, ''));
    return jName === key || jName.includes(key) || key.includes(jName);
  });
}

function verifiedTaxCount(jurisdictionId?: string) {
  if (!jurisdictionId) return 0;
  return TRIBUTOS.filter(t =>
    t.jurisdictionId === jurisdictionId &&
    t.status === 'vigente' &&
    !t.isBaseDemo &&
    (t.evidenceLevel === 'A' || t.evidenceLevel === 'B')
  ).length;
}

function indexedColor(count: number) {
  if (count <= 0) return '#475569';
  if (count === 1) return '#0ea5e9';
  if (count === 2) return '#22c55e';
  if (count === 3) return '#eab308';
  if (count === 4) return '#f97316';
  return '#dc2626';
}

function effectiveColor(value: number | null) {
  if (value === null) return '#475569';
  if (value < 10) return '#0ea5e9';
  if (value < 20) return '#22c55e';
  if (value < 30) return '#eab308';
  if (value < 40) return '#f97316';
  return '#dc2626';
}

function ZoomObserver({ onZoom }: { onZoom: (zoom: number) => void }) {
  useMapEvents({
    zoomend(event) {
      onZoom(event.target.getZoom());
    }
  });
  return null;
}

export default function MapaNacional({ onNavigate, selectedJurisdictionId, setSelectedJurisdictionId }: MapaNacionalProps) {
  const [zoom, setZoom] = useState(4);
  const [provinceGeo, setProvinceGeo] = useState<any>(null);
  const [municipalityGeo, setMunicipalityGeo] = useState<any>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('buenos_aires');
  const [localities, setLocalities] = useState<LocalityRow[]>([]);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [loadingMunicipal, setLoadingMunicipal] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [burdenMode, setBurdenMode] = useState<BurdenMode>('indexed');

  const mapLevel: MapLevel = zoom < 6 ? 'province' : zoom < 9 ? 'locality' : 'municipality';
  const selectedProvince = CENSUS_PROVINCES_2022.find(p => p.id === selectedProvinceId);

  useEffect(() => {
    fetch('/api/georef/provincias')
      .then(async r => {
        const body = await r.json();
        if (!r.ok) throw new Error(body?.error || 'No se pudieron cargar provincias');
        setProvinceGeo(body);
      })
      .catch(error => setMapError(error instanceof Error ? error.message : 'Error de geometría provincial'));
  }, []);

  useEffect(() => {
    const selected = JURISDICTIONS.find(j => j.id === selectedJurisdictionId);
    if (!selected) return;
    if (selected.level === 'province' || selected.level === 'city_autonoma') {
      const id = provinceIdFromName(selected.name.replace(/^Provincia de\s+/i, ''));
      if (id) setSelectedProvinceId(id);
    } else if (selected.level === 'municipality' && selected.parentId) {
      const parent = JURISDICTIONS.find(j => j.id === selected.parentId);
      if (parent) {
        const id = provinceIdFromName(parent.name.replace(/^Provincia de\s+/i, ''));
        if (id) setSelectedProvinceId(id);
      }
    }
  }, [selectedJurisdictionId]);

  useEffect(() => {
    if (zoom < 6 || !selectedProvinceId) return;
    let cancelled = false;
    setLoadingLocal(true);
    fetch(`/api/censo/localidades?provinceId=${encodeURIComponent(selectedProvinceId)}`)
      .then(async r => {
        const body = await r.json();
        if (!r.ok) throw new Error(body?.error || 'No se pudieron cargar localidades');
        return body.localities as LocalityRow[];
      })
      .then(rows => { if (!cancelled) setLocalities(rows.filter(row => row.population2022 >= 10_000)); })
      .catch(() => { if (!cancelled) setLocalities([]); })
      .finally(() => { if (!cancelled) setLoadingLocal(false); });
    return () => { cancelled = true; };
  }, [selectedProvinceId, zoom >= 6]);

  useEffect(() => {
    if (zoom < 9 || !selectedProvinceId) {
      setMunicipalityGeo(null);
      return;
    }
    let cancelled = false;
    setLoadingMunicipal(true);
    fetch(`/api/georef/municipios?provinceId=${encodeURIComponent(selectedProvinceId)}`)
      .then(async r => {
        const body = await r.json();
        if (!r.ok) throw new Error(body?.error || 'No se pudieron cargar municipios');
        return body;
      })
      .then(body => { if (!cancelled) setMunicipalityGeo(body); })
      .catch(() => { if (!cancelled) setMunicipalityGeo(null); })
      .finally(() => { if (!cancelled) setLoadingMunicipal(false); });
    return () => { cancelled = true; };
  }, [selectedProvinceId, zoom >= 9]);

  const provinceStats = useMemo(() => {
    const stats = new Map<string, { jurisdictionId?: string; count: number }>();
    for (const province of CENSUS_PROVINCES_2022) {
      const jurisdiction = jurisdictionFromName(province.name.replace(/^Provincia de\s+/i, ''), 'province');
      stats.set(province.id, { jurisdictionId: jurisdiction?.id, count: verifiedTaxCount(jurisdiction?.id) });
    }
    return stats;
  }, []);

  const styleProvince = (feature: any) => {
    const name = feature?.properties?.nombre || feature?.properties?.NAME_1 || '';
    const provinceId = provinceIdFromName(name);
    const count = provinceId ? (provinceStats.get(provinceId)?.count || 0) : 0;
    const fillColor = burdenMode === 'indexed' ? indexedColor(count) : effectiveColor(null);
    return {
      color: '#cbd5e1',
      weight: zoom < 6 ? 1.1 : 0.7,
      fillColor,
      fillOpacity: zoom < 6 ? 0.72 : 0.16,
      opacity: zoom < 6 ? 0.85 : 0.45
    };
  };

  const onEachProvince = (feature: any, layer: any) => {
    const name = feature?.properties?.nombre || feature?.properties?.NAME_1 || 'Provincia';
    const provinceId = provinceIdFromName(name);
    const stats = provinceId ? provinceStats.get(provinceId) : undefined;
    const count = stats?.count || 0;
    const metric = burdenMode === 'indexed'
      ? `${count} tributo${count === 1 ? '' : 's'} vigente${count === 1 ? '' : 's'} verificado${count === 1 ? '' : 's'} indexado${count === 1 ? '' : 's'}`
      : 'Carga efectiva: sin dato porcentual verificable cargado';
    layer.bindTooltip(`<strong>${name}</strong><br/>${metric}`, { sticky: true });
    layer.on('click', () => {
      if (provinceId) setSelectedProvinceId(provinceId);
      const jurisdiction = jurisdictionFromName(name, 'province');
      if (jurisdiction) setSelectedJurisdictionId(jurisdiction.id);
      if (layer.getBounds && layer._map) layer._map.fitBounds(layer.getBounds(), { padding: [18, 18], maxZoom: 7 });
    });
  };

  const styleMunicipality = (feature: any) => {
    const name = feature?.properties?.nombre || feature?.properties?.NAME_2 || '';
    const jurisdiction = jurisdictionFromName(name, 'municipality');
    const count = verifiedTaxCount(jurisdiction?.id);
    return {
      color: '#e2e8f0',
      weight: 0.8,
      fillColor: burdenMode === 'indexed' ? indexedColor(count) : effectiveColor(null),
      fillOpacity: count > 0 && burdenMode === 'indexed' ? 0.64 : 0.28,
      opacity: 0.75
    };
  };

  const onEachMunicipality = (feature: any, layer: any) => {
    const name = feature?.properties?.nombre || feature?.properties?.NAME_2 || 'Municipio';
    const jurisdiction = jurisdictionFromName(name, 'municipality');
    const count = verifiedTaxCount(jurisdiction?.id);
    layer.bindTooltip(
      `<strong>${name}</strong><br/>${burdenMode === 'indexed' ? (count ? `${count} tributo${count === 1 ? '' : 's'} local${count === 1 ? '' : 'es'} verificado${count === 1 ? '' : 's'}` : 'Sin carga municipal verificada cargada') : 'Carga efectiva: sin alícuota comparable verificada'}`,
      { sticky: true }
    );
    layer.on('click', () => {
      if (jurisdiction) setSelectedJurisdictionId(jurisdiction.id);
    });
  };

  const selectedTaxJurisdiction = JURISDICTIONS.find(j => j.id === selectedJurisdictionId);
  const selectedTaxCount = verifiedTaxCount(selectedTaxJurisdiction?.id);

  return (
    <div className="space-y-6 py-4 text-left" id="mapa-nacional-view">
      <header className="border-b border-slate-800 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.18em] text-emerald-400"><ShieldCheck className="w-4 h-4"/>Geometría oficial + evidencia fiscal</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mapa de carga tributaria por provincia, localidad y municipio</h1>
        <p className="text-xs text-slate-400 max-w-5xl leading-relaxed">Las provincias y municipios se dibujan con geometrías oficiales de Georef/IGN. Al acercar el mapa aparecen localidades del Censo 2022 con al menos 10.000 habitantes y, a mayor zoom, los límites municipales. No se colorea una “carga efectiva” si no existe una alícuota comparable verificada.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2"><Layers3 className="w-4 h-4 text-emerald-400"/><h2 className="text-sm font-bold text-white">Nivel visible</h2></div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              <Level label="Provincia" active={mapLevel === 'province'} note="Zoom < 6" />
              <Level label="Localidades ≥10k" active={mapLevel === 'locality'} note="Zoom 6–8" />
              <Level label="Municipios" active={mapLevel === 'municipality'} note="Zoom ≥ 9" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <label className="text-[9px] uppercase font-mono text-slate-500 block">Métrica de color</label>
            <select value={burdenMode} onChange={e => setBurdenMode(e.target.value as BurdenMode)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
              <option value="indexed">Tributos verificados indexados</option>
              <option value="effective">Carga efectiva % verificada</option>
            </select>
            {burdenMode === 'indexed' ? (
              <p className="text-[10px] text-slate-500 leading-relaxed">El color mide cuántos tributos vigentes con evidencia A/B están cargados para esa jurisdicción. <strong className="text-slate-300">No equivale al porcentaje efectivo de presión fiscal.</strong></p>
            ) : (
              <p className="text-[10px] text-amber-300/80 leading-relaxed">Las jurisdicciones sin una tasa efectiva comparable y documentada aparecen en gris. No se interpolan valores.</p>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[9px] uppercase font-mono text-slate-500">Provincia activa</span>
            <strong className="text-sm text-white block">{selectedProvince?.name || 'Argentina'}</strong>
            <span className="text-[10px] text-slate-500">{loadingLocal ? 'Cargando localidades…' : `${localities.filter(l => l.lat !== undefined && l.lng !== undefined).length} localidades ≥10.000 georreferenciadas`}</span>
            {loadingMunicipal && <span className="text-[10px] text-slate-500 block">Cargando límites municipales…</span>}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[9px] uppercase font-mono text-slate-500">Selección fiscal</span>
            <strong className="text-sm text-white block">{selectedTaxJurisdiction?.name || 'Ninguna jurisdicción seleccionada'}</strong>
            <span className="text-[10px] text-slate-500 block">Tributos verificados indexados: {selectedTaxCount}</span>
            {selectedTaxJurisdiction && <button onClick={() => onNavigate('tributos', selectedTaxJurisdiction.id)} className="text-[10px] text-emerald-400 hover:underline">Abrir registro tributario →</button>}
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-3">
          <div className="relative h-[72vh] min-h-[560px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <MapContainer center={[-38.4161, -63.6167]} zoom={4} minZoom={3} maxZoom={13} scrollWheelZoom className="h-full w-full" attributionControl>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomObserver onZoom={setZoom} />

              {provinceGeo && <GeoJSON key={`prov-${burdenMode}-${zoom}`} data={provinceGeo} style={styleProvince as any} onEachFeature={onEachProvince as any} />}

              {zoom >= 6 && localities.filter(l => l.lat !== undefined && l.lng !== undefined).map(locality => {
                const municipal = jurisdictionFromName(locality.name, 'municipality');
                const count = verifiedTaxCount(municipal?.id);
                const color = burdenMode === 'indexed' ? indexedColor(count) : effectiveColor(null);
                return (
                  <CircleMarker
                    key={locality.id}
                    center={[locality.lat as number, locality.lng as number]}
                    radius={Math.max(4, Math.min(11, 3 + Math.log10(Math.max(locality.population2022, 10_000))))}
                    pathOptions={{ color: '#f8fafc', weight: 1.2, fillColor: color, fillOpacity: count > 0 && burdenMode === 'indexed' ? 0.9 : 0.5 }}
                    eventHandlers={{ click: () => { if (municipal) setSelectedJurisdictionId(municipal.id); } }}
                  >
                    <Tooltip direction="top">
                      <div className="text-xs">
                        <strong>{locality.name}</strong><br/>
                        Censo 2022: {locality.population2022.toLocaleString('es-AR')} hab.<br/>
                        {burdenMode === 'indexed'
                          ? (count ? `${count} tributo${count === 1 ? '' : 's'} municipal${count === 1 ? '' : 'es'} verificado${count === 1 ? '' : 's'}` : 'Sin carga municipal verificada cargada')
                          : 'Carga efectiva: sin dato porcentual comparable cargado'}
                      </div>
                    </Tooltip>
                  </CircleMarker>
                );
              })}

              {zoom >= 9 && municipalityGeo && <GeoJSON key={`mun-${selectedProvinceId}-${burdenMode}`} data={municipalityGeo} style={styleMunicipality as any} onEachFeature={onEachMunicipality as any} />}
            </MapContainer>

            <div className="absolute z-[500] left-3 bottom-3 bg-slate-950/90 backdrop-blur border border-slate-700 rounded-xl p-3 text-[9px] text-slate-300 max-w-[260px] shadow-xl">
              <div className="font-bold text-white mb-2">{burdenMode === 'indexed' ? 'Intensidad tributaria documentada' : 'Carga efectiva verificada'}</div>
              {burdenMode === 'indexed' ? (
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  <Legend color="#475569" label="Sin dato"/><Legend color="#0ea5e9" label="1"/><Legend color="#22c55e" label="2"/><Legend color="#eab308" label="3"/><Legend color="#f97316" label="4"/><Legend color="#dc2626" label="5+"/>
                </div>
              ) : <Legend color="#475569" label="Sin porcentaje verificable"/>}
            </div>

            <div className="absolute z-[500] right-3 top-3 bg-slate-950/90 border border-slate-700 rounded-xl px-3 py-2 text-[10px] text-slate-300 flex items-center gap-2"><ZoomIn className="w-3.5 h-3.5 text-emerald-400" />Zoom {zoom} · {mapLevel === 'province' ? 'Provincias' : mapLevel === 'locality' ? 'Localidades ≥10k' : 'Municipios'}</div>
          </div>

          {mapError && <div className="flex gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[11px] text-amber-200"><AlertTriangle className="w-4 h-4 shrink-0"/><span>{mapError}</span></div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] text-slate-500">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 leading-relaxed"><strong className="text-slate-300 block mb-1">Geometrías</strong>Los límites provinciales y municipales se obtienen de Georef, basado en datos del Instituto Geográfico Nacional. <a href={GEOREF_SOURCE} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Fuente oficial</a>.</div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 leading-relaxed"><strong className="text-slate-300 block mb-1">Localidades</strong>Sólo aparecen localidades con al menos 10.000 habitantes según Censo 2022; sus centroides se normalizan contra Georef. <a href={CENSUS_SOURCE} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Fuente INDEC</a>.</div>
          </div>

          <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl text-xs text-sky-100/80 leading-relaxed"><MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5"/><p><strong>Orden territorial:</strong> primero provincia, después localidades censales ≥10.000 habitantes y finalmente municipio/gobierno local. Una localidad y un municipio no se consideran equivalentes automáticamente. Cuando falta una carga tributaria municipal verificable, el elemento queda gris en vez de heredar o inventar un valor.</p></div>
        </div>
      </section>
    </div>
  );
}

function Level({ label, active, note }: { label: string; active: boolean; note: string }) {
  return <div className={`p-3 rounded-xl border ${active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950 border-slate-800'}`}><strong className={`text-xs block ${active ? 'text-emerald-300' : 'text-slate-300'}`}>{label}</strong><span className="text-[9px] text-slate-600 font-mono">{note}</span></div>;
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm border border-white/20" style={{ backgroundColor: color }}/>{label}</span>;
}
