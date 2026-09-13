/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  Landmark,
  PieChart,
  Search,
  ExternalLink,
  ShoppingCart,
  AlertTriangle,
  FileText,
  BadgeDollarSign,
  Layers3,
  Scale,
  ReceiptText,
  MapPin
} from 'lucide-react';
import { PUBLIC_PURCHASES, SPENDING_JURISDICTIONS, SpendingJurisdiction } from '../data/gastoPublico';
import { CENSUS_PROVINCES_2022, CENSUS_POPULATION_THRESHOLD } from '../data/censo2022Territorial';

type ScopeLevel = 'nacion' | 'provincia' | 'municipio';
type LocalityOption = { id: string; name: string; department?: string; population2022: number; georefId?: string };

const formatMoney = (value: number | null) => {
  if (value === null) return 'Sin dato verificado';
  if (Math.abs(value) >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)} billones`;
  if (Math.abs(value) >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)} mil millones`;
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)} millones`;
  return `$${Math.round(value).toLocaleString('es-AR')}`;
};

const macroIds = new Set([
  'servicios-sociales',
  'deuda-publica',
  'servicios-economicos',
  'administracion-gubernamental',
  'defensa-seguridad'
]);

function emptyJurisdiction(name: string, level: 'Provincia' | 'Municipio', sourceUrl?: string): SpendingJurisdiction {
  return {
    id: `missing-${level.toLowerCase()}-${name}`,
    name,
    level,
    period: 'Último dato oficial disponible',
    approvedBudget: null,
    executedBudget: null,
    categories: [],
    sources: sourceUrl ? [{ label: `Portal oficial / fuente base de ${name}`, url: sourceUrl, official: true, retrievedAt: '2026-09-13' }] : [],
    evidenceNote: `La jurisdicción está incluida en la cobertura nacional, pero todavía no hay presupuesto y ejecución oficial individual cargados para ${name}. No se heredan ni extrapolan cifras de Nación u otra jurisdicción.`
  };
}

export default function GastoPublico() {
  const [scopeLevel, setScopeLevel] = useState<ScopeLevel>('nacion');
  const [selectedProvinceId, setSelectedProvinceId] = useState('buenos_aires');
  const [selectedLocalityId, setSelectedLocalityId] = useState('');
  const [localities, setLocalities] = useState<LocalityOption[]>([]);
  const [loadingLocalities, setLoadingLocalities] = useState(false);
  const [localityError, setLocalityError] = useState('');
  const [detailMode, setDetailMode] = useState<'general' | 'detalle'>('general');
  const [query, setQuery] = useState('');

  const selectedProvince = CENSUS_PROVINCES_2022.find(item => item.id === selectedProvinceId) || CENSUS_PROVINCES_2022[0];
  const selectedLocality = localities.find(item => item.id === selectedLocalityId);

  useEffect(() => {
    if (scopeLevel !== 'municipio') return;
    let cancelled = false;
    setLoadingLocalities(true);
    setLocalityError('');
    setSelectedLocalityId('');
    fetch(`/api/censo/localidades?provinceId=${encodeURIComponent(selectedProvinceId)}`)
      .then(async response => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || 'No se pudieron cargar las localidades.');
        return payload;
      })
      .then(payload => {
        if (cancelled) return;
        const rows = Array.isArray(payload?.localities) ? payload.localities : [];
        setLocalities(rows);
        if (rows[0]?.id) setSelectedLocalityId(rows[0].id);
      })
      .catch(error => {
        if (cancelled) return;
        setLocalities([]);
        setLocalityError(error instanceof Error ? error.message : 'Sin datos verificables para esta provincia.');
      })
      .finally(() => { if (!cancelled) setLoadingLocalities(false); });
    return () => { cancelled = true; };
  }, [scopeLevel, selectedProvinceId]);

  const jurisdiction = useMemo<SpendingJurisdiction>(() => {
    if (scopeLevel === 'nacion') return SPENDING_JURISDICTIONS.find(item => item.id === 'nacion') || SPENDING_JURISDICTIONS[0];

    if (scopeLevel === 'provincia') {
      const exact = SPENDING_JURISDICTIONS.find(item => item.id === selectedProvinceId);
      if (exact) return exact;
      const federalBase = SPENDING_JURISDICTIONS.find(item => item.id === 'provincias');
      return {
        ...(federalBase || emptyJurisdiction(selectedProvince.name, 'Provincia')),
        id: selectedProvinceId,
        name: selectedProvince.name,
        level: 'Provincia',
        approvedBudget: exact?.approvedBudget ?? null,
        executedBudget: exact?.executedBudget ?? null,
        categories: exact?.categories ?? [],
        evidenceNote: exact?.evidenceNote || `Provincia seleccionada: ${selectedProvince.name}. La cobertura existe, pero no se muestran cifras hasta cargar presupuesto y ejecución oficiales específicos de esta provincia.`
      };
    }

    const localityName = selectedLocality?.name || 'Gobierno local pendiente de selección';
    const exact = selectedLocality ? SPENDING_JURISDICTIONS.find(item => item.id === selectedLocality.id) : undefined;
    return exact || emptyJurisdiction(localityName, 'Municipio');
  }, [scopeLevel, selectedProvince, selectedProvinceId, selectedLocality]);

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return jurisdiction.categories
      .filter(item => detailMode === 'detalle' || macroIds.has(item.id))
      .filter(item => !normalized || `${item.name} ${item.description}`.toLowerCase().includes(normalized));
  }, [jurisdiction, detailMode, query]);

  const purchaseJurisdictionId = scopeLevel === 'nacion'
    ? 'nacion'
    : scopeLevel === 'provincia'
      ? selectedProvinceId
      : selectedLocality?.id || '';

  const purchases = useMemo(
    () => PUBLIC_PURCHASES.filter(item => item.jurisdictionId === purchaseJurisdictionId),
    [purchaseJurisdictionId]
  );

  const hierarchyLabel = scopeLevel === 'nacion'
    ? 'Nación Argentina'
    : scopeLevel === 'provincia'
      ? `Nación → ${selectedProvince.name}`
      : `Nación → ${selectedProvince.name} → ${selectedLocality?.name || 'seleccionar localidad'}`;

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="gasto-publico-view">
      <header className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
          <Landmark className="w-4 h-4" />
          <span>Destino del dinero de los contribuyentes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Gasto Público y Compras del Estado</h1>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Misma metodología para Nación, provincias y municipios: presupuesto, ejecución, rubros, compras, proveedor y comparación con mercado cuando exista una referencia homogénea y verificable.
        </p>
      </header>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono"><MapPin className="w-4 h-4" /><span>{hierarchyLabel}</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Selector label="Nivel" value={scopeLevel} onChange={value => { setScopeLevel(value as ScopeLevel); setQuery(''); }}>
            <option value="nacion">Nación</option>
            <option value="provincia">Provincia</option>
            <option value="municipio">Municipio / gobierno local</option>
          </Selector>

          {scopeLevel !== 'nacion' && (
            <Selector label="Provincia" value={selectedProvinceId} onChange={value => { setSelectedProvinceId(value); setQuery(''); }}>
              {CENSUS_PROVINCES_2022.map(province => <option key={province.id} value={province.id}>{province.name}</option>)}
            </Selector>
          )}

          {scopeLevel === 'municipio' && (
            <Selector label={`Localidad ≥ ${CENSUS_POPULATION_THRESHOLD.toLocaleString('es-AR')} hab.`} value={selectedLocalityId} onChange={setSelectedLocalityId} disabled={loadingLocalities || localities.length === 0}>
              {loadingLocalities && <option value="">Cargando localidades...</option>}
              {!loadingLocalities && localities.length === 0 && <option value="">Sin localidades disponibles</option>}
              {localities.map(locality => <option key={locality.id} value={locality.id}>{locality.name} · {locality.population2022.toLocaleString('es-AR')} hab.</option>)}
            </Selector>
          )}
        </div>
        {scopeLevel === 'municipio' && (
          <p className="text-xs text-slate-300 leading-relaxed">
            El umbral usa población del Censo 2022. La localidad censal define elegibilidad; el gasto y las tasas deben vincularse al gobierno local competente porque localidad y municipio no siempre son la misma unidad administrativa.
          </p>
        )}
        {localityError && <p className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">{localityError}</p>}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-5 space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">Buscar rubro</label>
          <div className="min-h-11 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Educación, salud, pauta, energía..." className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none" />
          </div>
        </div>
        <div className="lg:col-span-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setDetailMode('general')} className={`min-h-11 rounded-xl border text-xs font-bold transition ${detailMode === 'general' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Resumen breve</button>
          <button type="button" onClick={() => setDetailMode('detalle')} className={`min-h-11 rounded-xl border text-xs font-bold transition ${detailMode === 'detalle' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Ver detalle</button>
        </div>
        <div className="lg:col-span-3 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl p-3">Cobertura seleccionada: <strong className="text-white">{jurisdiction.name}</strong></div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric title="Presupuesto aprobado" value={formatMoney(jurisdiction.approvedBudget)} note={`Período: ${jurisdiction.period}`} />
        <Metric title="Presupuesto ejecutado" value={formatMoney(jurisdiction.executedBudget)} note={jurisdiction.executedAsOf ? `Corte: ${jurisdiction.executedAsOf}` : 'Sin corte de ejecución cargado.'} />
        <Metric title="Cobertura cargada" value={jurisdiction.categories.length ? `${jurisdiction.categories.length} rubros` : 'Pendiente'} note="Sólo rubros con fuente individual verificable." />
      </section>

      <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-sm text-sky-50 leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" /><p>{jurisdiction.evidenceNote}</p>
      </div>

      {visibleCategories.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center gap-2">{detailMode === 'general' ? <PieChart className="w-5 h-5 text-emerald-400" /> : <Layers3 className="w-5 h-5 text-emerald-400" />}<h2 className="text-lg font-bold text-white">{detailMode === 'general' ? 'Resumen por grandes finalidades' : 'Detalle funcional y rubros específicos'}</h2></div>
          {detailMode === 'detalle' && <p className="text-xs text-amber-100 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 leading-relaxed">Las categorías pueden estar anidadas; no se deben sumar dos veces al presupuesto total.</p>}
          <div className="space-y-3">{visibleCategories.map(category => (
            <article key={category.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div className="min-w-0"><h3 className="font-bold text-white">{category.name}</h3><p className="text-xs text-slate-300 mt-1 leading-relaxed">{category.description}</p></div><div className="sm:text-right shrink-0"><strong className="font-mono text-lg text-white block">{formatMoney(category.amount)}</strong><span className="text-xs font-mono text-emerald-300">{category.share === null ? 'Participación: sin dato verificado' : `${category.share.toFixed(2)}% del presupuesto`}</span></div></div>
              {category.share !== null && <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, category.share)}%` }} /></div>}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]"><span className="text-slate-400 font-mono">{category.period} · {category.sourceLabel}</span><a href={category.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 hover:underline font-semibold">Ver fuente oficial <ExternalLink className="w-3.5 h-3.5" /></a></div>
            </article>
          ))}</div>
        </section>
      ) : (
        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl"><h2 className="font-bold text-white">Sin desglose verificado cargado para esta selección</h2><p className="text-sm text-slate-300 mt-2 leading-relaxed">La ausencia de información no se interpreta como gasto cero. Esta jurisdicción queda visible hasta incorporar presupuesto y ejecución oficiales trazables.</p>{jurisdiction.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="mt-3 mr-4 inline-flex items-center gap-1.5 text-emerald-300 text-xs hover:underline">{source.label} <ExternalLink className="w-3.5 h-3.5" /></a>)}</section>
      )}

      <section className="space-y-4 pt-2">
        <div className="flex items-start gap-3"><ShoppingCart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><div><h2 className="text-lg font-bold text-white">Auditoría de compras: Estado vs mercado privado</h2><p className="text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">Las compras se filtran por la jurisdicción seleccionada. Una diferencia de precio sólo se calcula cuando especificación, unidad, fecha, impuestos, volumen y entrega son suficientemente comparables.</p></div></div>
        {purchases.length === 0 ? <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-slate-300">Sin compras verificadas cargadas para <strong className="text-white">{jurisdiction.name}</strong>.</div> : purchases.map(purchase => {
          const canCompare = purchase.awardedUnitPrice !== null && purchase.privateReferenceUnitPrice !== null;
          const difference = canCompare ? ((purchase.awardedUnitPrice! - purchase.privateReferenceUnitPrice!) / purchase.privateReferenceUnitPrice!) * 100 : null;
          return <article key={purchase.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"><div className="p-5 border-b border-slate-800 space-y-2"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider">{purchase.agency}</span><h3 className="font-bold text-white mt-1">{purchase.item}</h3><p className="text-xs text-slate-300 mt-1">{purchase.specification}</p></div><span className={`w-fit px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${canCompare ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-200'}`}>{canCompare ? 'COMPARABLE' : 'COMPARACIÓN NO CONCLUYENTE'}</span></div><div className="text-[11px] text-slate-400 font-mono">Proceso {purchase.processNumber} · Expediente {purchase.fileNumber} · {purchase.date}</div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-slate-800"><PurchaseMetric icon={<ReceiptText className="w-4 h-4" />} title="Precio unitario estatal" value={purchase.awardedUnitPrice === null ? 'No vinculado todavía' : formatMoney(purchase.awardedUnitPrice)} /><PurchaseMetric icon={<BadgeDollarSign className="w-4 h-4" />} title="Referencia privada" value={purchase.privateReferenceUnitPrice === null ? 'Sin referencia' : formatMoney(purchase.privateReferenceUnitPrice)} /><PurchaseMetric icon={<Scale className="w-4 h-4" />} title="Diferencia comparable" value={difference === null ? 'No calculable' : `${difference >= 0 ? '+' : ''}${difference.toFixed(1)}%`} /></div><div className="p-5 bg-slate-950/40 space-y-3"><p className="text-xs text-slate-300 leading-relaxed">{purchase.comparisonNote}</p><div className="flex flex-wrap gap-3"><a href={purchase.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold hover:underline">Ver compra oficial <ExternalLink className="w-3.5 h-3.5" /></a>{purchase.privateReferenceUrl && <a href={purchase.privateReferenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-sky-300 font-semibold hover:underline">Ver referencia de mercado <ExternalLink className="w-3.5 h-3.5" /></a>}</div></div></article>;
        })}
      </section>

      <section className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-400" /><h2 className="font-bold text-white">Fuentes de esta jurisdicción</h2></div><div className="space-y-2">{jurisdiction.sources.length === 0 ? <p className="text-sm text-slate-300">Sin fuente oficial individual cargada todavía.</p> : jurisdiction.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-xs text-slate-300 hover:text-white"><ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span><strong className="text-emerald-300">{source.label}</strong> · consultada {source.retrievedAt}</span></a>)}</div></section>
    </div>
  );
}

function Selector({ label, value, onChange, children, disabled = false }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode; disabled?: boolean }) {
  return <div className="space-y-2"><label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">{label}</label><select value={value} onChange={event => onChange(event.target.value)} disabled={disabled} className="w-full min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-3 text-sm text-white disabled:opacity-60 focus:outline-none focus:border-emerald-500">{children}</select></div>;
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-w-0"><span className="text-[10px] uppercase font-mono tracking-wider text-slate-300 block">{title}</span><strong className="text-lg font-mono text-white block mt-1 break-words">{value}</strong><p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{note}</p></div>;
}

function PurchaseMetric({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="p-5 min-w-0"><div className="flex items-center gap-2 text-slate-300">{icon}<span className="text-[10px] uppercase font-mono tracking-wider">{title}</span></div><strong className="text-base font-mono text-white block mt-2 break-words">{value}</strong></div>;
}
