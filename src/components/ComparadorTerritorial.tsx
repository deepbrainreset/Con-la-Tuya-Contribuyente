import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Landmark, Loader2, MapPin, Search, Users } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { PRODUCTS } from '../data/productos';
import {
  CENSUS_2022_METHOD_NOTE,
  CENSUS_POPULATION_THRESHOLD,
  CENSUS_PROVINCES_2022,
  CENSUS_TERRITORIAL_SOURCES,
  CensusLocality
} from '../data/censo2022Territorial';

const money = (value: number) => `$${Math.round(value).toLocaleString('es-AR')}`;
const pct = (value: number) => `${value.toFixed(2)}%`;
const population = (value: number) => value.toLocaleString('es-AR');
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

type CensusApiResponse = {
  censusYear: 2022;
  threshold: number;
  provinceId: string;
  count: number;
  localities: CensusLocality[];
  methodology: string;
  primarySources: string[];
  operationalMirror?: string;
  evidenceStatus: string;
};

export default function ComparadorTerritorial() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [provinceId, setProvinceId] = useState('caba');
  const [localityId, setLocalityId] = useState('caba');
  const [localities, setLocalities] = useState<CensusLocality[]>([
    { id: 'caba', name: 'Ciudad Autónoma de Buenos Aires', provinceId: 'caba', population2022: 3_121_707, unit: 'localidad_censal', censusYear: 2022, taxDataStatus: 'partial', populationSource: 'INDEC_CPV2022' }
  ]);
  const [loadingLocalities, setLoadingLocalities] = useState(false);
  const [localityError, setLocalityError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const province = CENSUS_PROVINCES_2022.find(p => p.id === provinceId) || CENSUS_PROVINCES_2022[0];
  const selectedLocality = localities.find(l => l.id === localityId) || localities[0];

  useEffect(() => {
    let cancelled = false;
    setSearch('');
    setLocalityError(null);

    if (provinceId === 'caba') {
      const caba: CensusLocality = { id: 'caba', name: 'Ciudad Autónoma de Buenos Aires', provinceId: 'caba', population2022: 3_121_707, unit: 'localidad_censal', censusYear: 2022, taxDataStatus: 'partial', populationSource: 'INDEC_CPV2022' };
      setLocalities([caba]);
      setLocalityId('caba');
      return;
    }

    setLoadingLocalities(true);
    fetch(`/api/censo/localidades?provinceId=${encodeURIComponent(provinceId)}`)
      .then(async response => {
        const body = await response.json();
        if (!response.ok) throw new Error(body?.error || 'No se pudo cargar el padrón censal');
        return body as CensusApiResponse;
      })
      .then(body => {
        if (cancelled) return;
        const rows = (body.localities || []).map(row => ({
          ...row,
          provinceId,
          censusYear: 2022 as const,
          taxDataStatus: 'missing' as const,
          populationSource: 'MIRROR_INDEC_CPV2022' as const
        }));
        setLocalities(rows);
        setLocalityId(rows[0]?.id || '');
        if (!rows.length) setLocalityError('Sin localidades verificadas de 10.000 habitantes o más disponibles para esta provincia.');
      })
      .catch(error => {
        if (cancelled) return;
        setLocalities([]);
        setLocalityId('');
        setLocalityError(error instanceof Error ? error.message : 'Sin datos verificables disponibles en este momento.');
      })
      .finally(() => { if (!cancelled) setLoadingLocalities(false); });

    return () => { cancelled = true; };
  }, [provinceId]);

  const filteredLocalities = useMemo(() => {
    const q = normalize(search);
    if (!q) return localities;
    return localities.filter(locality => normalize(`${locality.name} ${locality.department || ''}`).includes(q));
  }, [localities, search]);

  const taxJurisdiction = useMemo(() => {
    if (!selectedLocality) return undefined;
    const localityName = normalize(selectedLocality.name.replace(/\s*\([^)]*\)/g, ''));
    const provinceName = normalize(province.name);

    const exactLocal = JURISDICTIONS.find(j => j.level === 'municipality' && !j.isBaseDemo && normalize(j.name) === localityName);
    if (exactLocal) return exactLocal;

    if (provinceId === 'caba') return JURISDICTIONS.find(j => j.id === 'caba');
    return JURISDICTIONS.find(j => !j.isBaseDemo && (j.level === 'province' || j.level === 'city_autonoma') && normalize(j.name).includes(provinceName));
  }, [selectedLocality, province, provinceId]);

  const baseCost = product.basePrice + product.logistics;
  const national = product.taxNational;
  const baselineProvincial = product.taxProvincial;
  const baselineMunicipal = product.taxMunicipal;
  const margin = product.margin;
  const baselineTotal = baseCost + national + baselineProvincial + baselineMunicipal + margin;

  const hasVerifiedProvincialRate = false;
  const hasVerifiedMunicipalRate = false;
  const territorialPriceComplete = hasVerifiedProvincialRate && (provinceId === 'caba' || hasVerifiedMunicipalRate);

  const selectedLabel = selectedLocality
    ? `${selectedLocality.name}${selectedLocality.department ? ` · ${selectedLocality.department}` : ''}, ${province.name}`
    : province.name;

  return (
    <section className="space-y-5 bg-slate-900/30 border border-slate-800 rounded-2xl p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold text-white">Comparador territorial nacional · Censo 2022</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
            Cobertura diseñada para las 24 jurisdicciones y todas las localidades censales de al menos {population(CENSUS_POPULATION_THRESHOLD)} habitantes. La población define qué localidades aparecen; la carga fiscal se vincula aparte con la provincia y el gobierno local competente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="space-y-1">
          <span className="text-[9px] uppercase font-mono text-slate-500">Producto</span>
          <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
            {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-[9px] uppercase font-mono text-slate-500">Provincia / CABA</span>
          <select value={provinceId} onChange={e => setProvinceId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
            {CENSUS_PROVINCES_2022.map(item => <option key={item.id} value={item.id}>{item.name} · {population(item.population2022)} hab.</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-[9px] uppercase font-mono text-slate-500">Localidad ≥10.000 habitantes</span>
          <select value={localityId} onChange={e => setLocalityId(e.target.value)} disabled={loadingLocalities || filteredLocalities.length === 0} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white disabled:opacity-50">
            {filteredLocalities.map(item => <option key={item.id} value={item.id}>{item.name} · {population(item.population2022)}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar localidad dentro de la provincia…" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-600" />
        </div>
        <div className="text-[10px] font-mono text-slate-500 shrink-0">
          {loadingLocalities ? <span className="inline-flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Cargando Censo 2022…</span> : `${localities.length} localidades elegibles cargadas`}
        </div>
      </div>

      {localityError && <div className="flex gap-2 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] text-amber-200"><AlertTriangle className="w-4 h-4 shrink-0" /><span><strong>Sin datos verificados:</strong> {localityError}</span></div>}

      {selectedLocality && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card title="Población Censo 2022" value={population(selectedLocality.population2022)} note="Habitantes en la unidad censal seleccionada." icon="users" />
            <Card title="Costo + logística" value={money(baseCost)} note="Base modelada común del producto." />
            <Card title="Carga nacional" value={money(national)} note={`${pct(baselineTotal > 0 ? national / baselineTotal * 100 : 0)} del precio base modelado.`} />
            <Card title="Carga provincial/municipal local" value="Sin datos verificados" note="No se reutiliza la estimación base como si fuera la alícuota oficial de esta localidad." muted />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-400" /><h3 className="text-sm font-bold text-white">{selectedLabel}</h3></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Provincia</span><span className="text-slate-200">{province.name}</span></div>
                <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Código INDEC prov.</span><span className="text-slate-200 font-mono">{province.indecCode}</span></div>
                <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Población provincial</span><span className="text-slate-200">{population(province.population2022)}</span></div>
                <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Año censal</span><span className="text-slate-200">2022</span></div>
              </div>

              {taxJurisdiction ? (
                <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Gobierno con ficha tributaria</span><span className="text-slate-200">{taxJurisdiction.name}</span></div>
                  <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Autoridad registrada</span><span className="text-slate-200">{taxJurisdiction.authorityName}</span></div>
                  <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Fuerza política</span><span className="text-slate-200">{taxJurisdiction.authorityParty}</span></div>
                  <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Evidencia general</span><span className="text-slate-200">{taxJurisdiction.confidenceLevel}</span></div>
                </div>
              ) : (
                <div className="border-t border-slate-800 pt-3 text-[11px] text-amber-300">Sin ficha tributaria verificada todavía para el gobierno local competente de esta localidad.</div>
              )}
            </div>

            <div className={`border rounded-xl p-4 ${territorialPriceComplete ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
              <span className="text-[9px] uppercase font-mono text-amber-400 block">Precio territorial final</span>
              <strong className="text-lg text-white block mt-1">{territorialPriceComplete ? money(baselineTotal) : 'Pendiente de datos verificados'}</strong>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                {territorialPriceComplete
                  ? 'Calculado con alícuotas verificadas para Nación, provincia y gobierno local.'
                  : 'Faltan alícuotas oficiales por actividad, período y jurisdicción. No se inventa una diferencia territorial.'}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl text-xs text-sky-100/80 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p><strong>Metodología territorial:</strong> {CENSUS_2022_METHOD_NOTE}</p>
        </div>
        <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl text-[10px] text-slate-500 leading-relaxed">
          <strong className="text-slate-300 block mb-1">Fuentes demográficas</strong>
          INDEC Censo 2022 definitivo + nomenclador/REDATAM. Para operar el filtro nacional, el servidor usa un espejo tabular de los resultados 2022 y conserva como referencias primarias INDEC y el dataset de localidades derivado del Censo depositado en CONICET.
          <div className="flex flex-wrap gap-3 mt-2">
            <a className="text-emerald-400 hover:underline" href={CENSUS_TERRITORIAL_SOURCES.indecDefinitive} target="_blank" rel="noreferrer">INDEC</a>
            <a className="text-emerald-400 hover:underline" href={CENSUS_TERRITORIAL_SOURCES.indecRedatam} target="_blank" rel="noreferrer">Códigos REDATAM</a>
            <a className="text-emerald-400 hover:underline" href={CENSUS_TERRITORIAL_SOURCES.conicetLocalitiesDataset} target="_blank" rel="noreferrer">Dataset CONICET</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value, note, muted = false, icon }: { title: string; value: string; note: string; muted?: boolean; icon?: 'users' }) {
  return <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
    <span className="text-[9px] uppercase font-mono text-slate-500 flex items-center gap-1">{icon === 'users' && <Users className="w-3 h-3" />}{title}</span>
    <strong className={`text-base font-mono block mt-1 ${muted ? 'text-amber-300' : 'text-white'}`}>{value}</strong>
    <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">{note}</p>
  </div>;
}
