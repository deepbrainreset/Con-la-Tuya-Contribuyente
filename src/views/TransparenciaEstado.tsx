/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, CircleHelp, ExternalLink, Eye, MapPin, ShieldCheck, XCircle } from 'lucide-react';
import { CENSUS_POPULATION_THRESHOLD, CENSUS_PROVINCES_2022 } from '../data/censo2022Territorial';
import {
  makePendingTransparencyProfile,
  makeProvincialTransparencyProfile,
  NATIONAL_TRANSPARENCY_PROFILE,
  StateTransparencyProfile,
  TRANSPARENCY_DIMENSIONS,
  TransparencyStatus,
  transparencyScore
} from '../data/transparenciaEstado';

type ScopeLevel = 'nacion' | 'provincia' | 'municipio';
type LocalityOption = { id: string; name: string; population2022: number };

const STATUS_COPY: Record<TransparencyStatus, { label: string; className: string; icon: React.ReactNode }> = {
  published: { label: 'Publicado y verificable', className: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 className="w-4 h-4" /> },
  partial: { label: 'Publicado parcialmente', className: 'text-amber-200 bg-amber-500/10 border-amber-500/20', icon: <AlertTriangle className="w-4 h-4" /> },
  not_found: { label: 'No verificado por la plataforma', className: 'text-slate-200 bg-slate-500/10 border-slate-500/20', icon: <CircleHelp className="w-4 h-4" /> },
  not_published_confirmed: { label: 'No publicado por la jurisdicción', className: 'text-rose-200 bg-rose-500/10 border-rose-500/20', icon: <XCircle className="w-4 h-4" /> }
};

export default function TransparenciaEstado() {
  const [scope, setScope] = useState<ScopeLevel>('nacion');
  const [provinceId, setProvinceId] = useState('buenos_aires');
  const [localityId, setLocalityId] = useState('');
  const [localities, setLocalities] = useState<LocalityOption[]>([]);
  const [loading, setLoading] = useState(false);

  const province = CENSUS_PROVINCES_2022.find(item => item.id === provinceId) || CENSUS_PROVINCES_2022[0];
  const locality = localities.find(item => item.id === localityId);

  useEffect(() => {
    if (scope !== 'municipio') return;
    let cancelled = false;
    setLoading(true);
    setLocalityId('');
    fetch(`/api/censo/localidades?provinceId=${encodeURIComponent(provinceId)}`)
      .then(response => response.json())
      .then(payload => {
        if (cancelled) return;
        const rows = Array.isArray(payload?.localities) ? payload.localities : [];
        setLocalities(rows);
        if (rows[0]?.id) setLocalityId(rows[0].id);
      })
      .catch(() => { if (!cancelled) setLocalities([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [scope, provinceId]);

  const profile = useMemo<StateTransparencyProfile>(() => {
    if (scope === 'nacion') return NATIONAL_TRANSPARENCY_PROFILE;
    if (scope === 'provincia') return makeProvincialTransparencyProfile(province.id, province.name);
    return makePendingTransparencyProfile(locality?.id || `pending-${province.id}`, locality?.name || 'Gobierno local pendiente', 'Municipio');
  }, [scope, province, locality]);

  const provinceProfiles = useMemo(
    () => CENSUS_PROVINCES_2022.map(item => makeProvincialTransparencyProfile(item.id, item.name)),
    []
  );

  const score = transparencyScore(profile);
  const published = profile.evidence.filter(item => item.status === 'published').length;
  const partial = profile.evidence.filter(item => item.status === 'partial').length;
  const confirmedMissing = profile.evidence.filter(item => item.status === 'not_published_confirmed').length;
  const pendingReview = profile.evidence.filter(item => item.status === 'not_found').length;

  const hierarchy = scope === 'nacion'
    ? 'Nación Argentina'
    : scope === 'provincia'
      ? `Nación → ${province.name}`
      : `Nación → ${province.name} → ${locality?.name || 'seleccionar localidad'}`;

  const selectProvince = (id: string) => {
    setScope('provincia');
    setProvinceId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 py-4 text-left">
      <header className="space-y-3 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest"><ShieldCheck className="w-4 h-4" />Transparencia del Estado</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Qué publica cada jurisdicción y qué no</h1>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">Cobertura federal explícita: Nación, las 23 provincias, CABA y gobiernos locales. La plataforma separa ausencia de evidencia propia de ausencia de publicación oficial. Sólo se marca “no publicado por la jurisdicción” cuando existe verificación suficiente de los portales oficiales revisados; de lo contrario se muestra “no verificado por la plataforma”.</p>
      </header>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono"><MapPin className="w-4 h-4" />{hierarchy}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Selector label="Nivel" value={scope} onChange={value => setScope(value as ScopeLevel)}>
            <option value="nacion">Nación</option><option value="provincia">Provincia</option><option value="municipio">Municipio / gobierno local</option>
          </Selector>
          {scope !== 'nacion' && <Selector label="Provincia" value={provinceId} onChange={setProvinceId}>{CENSUS_PROVINCES_2022.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</Selector>}
          {scope === 'municipio' && <Selector label={`Localidad ≥ ${CENSUS_POPULATION_THRESHOLD.toLocaleString('es-AR')} hab.`} value={localityId} onChange={setLocalityId} disabled={loading || localities.length === 0}>{loading && <option value="">Cargando...</option>}{!loading && localities.length === 0 && <option value="">Sin localidades</option>}{localities.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</Selector>}
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Metric title="Índice documental" value={`${score}%`} note="Sólo publicaciones verificadas/parciales suman al índice." />
        <Metric title="Publicados" value={String(published)} note="Con fuente oficial localizada." />
        <Metric title="Parciales" value={String(partial)} note="Existe publicación pero falta desagregación o cobertura." />
        <Metric title="No publicados confirmados" value={String(confirmedMissing)} note="Sólo tras revisión oficial suficiente." />
        <Metric title="Pendientes de verificar" value={String(pendingReview)} note="No se atribuye falta de transparencia todavía." />
      </section>

      <section className="space-y-3">
        {TRANSPARENCY_DIMENSIONS.map(dimension => {
          const item = profile.evidence.find(evidence => evidence.dimensionId === dimension.id);
          if (!item) return null;
          const status = STATUS_COPY[item.status];
          return (
            <article key={dimension.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-white">{dimension.name}</h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{dimension.description}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.className}`}>{status.icon}{status.label}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.note}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 font-mono">Revisión: {item.checkedAt}</span>
                {item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold hover:underline"><Eye className="w-3.5 h-3.5" />{item.sourceLabel || 'Ver fuente'}<ExternalLink className="w-3.5 h-3.5" /></a> : <span className="text-slate-500">Sin fuente individual cargada</span>}
              </div>
            </article>
          );
        })}
      </section>

      <section className="space-y-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-white">Cobertura provincial completa</h2>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">Las 24 jurisdicciones aparecen de forma explícita. La ejecución 2026, el gasto por finalidad/función y el gasto por objeto se apoyan en series oficiales federales desagregadas por jurisdicción. Los demás ítems se completan únicamente cuando se localiza evidencia oficial específica.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {provinceProfiles.map(item => {
            const provinceScore = transparencyScore(item);
            const provincePublished = item.evidence.filter(evidence => evidence.status === 'published').length;
            const provincePartial = item.evidence.filter(evidence => evidence.status === 'partial').length;
            return (
              <button key={item.jurisdictionId} type="button" onClick={() => selectProvince(item.jurisdictionId)} className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/80 transition">
                <div className="flex items-start justify-between gap-3">
                  <strong className="text-white text-sm">{item.jurisdictionName}</strong>
                  <span className="font-mono text-emerald-300 text-sm">{provinceScore}%</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300">{provincePublished} publicados</span>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-200">{provincePartial} parciales</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">{item.evidence.length - provincePublished - provincePartial} pendientes</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="p-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 text-sm text-sky-50 leading-relaxed">
        <strong className="block mb-2">Cómo interpretar el índice</strong>
        El índice mide disponibilidad documental en las dimensiones definidas por la plataforma; no mide corrupción ni calidad de gestión. Una jurisdicción puede tener información dispersa o difícil de localizar. Por eso “no verificado” y “no publicado confirmado” son estados distintos.
      </section>
    </div>
  );
}

function Selector({ label, value, onChange, children, disabled = false }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode; disabled?: boolean }) {
  return <div className="space-y-2"><label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">{label}</label><select value={value} onChange={event => onChange(event.target.value)} disabled={disabled} className="w-full min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-3 text-sm text-white disabled:opacity-60 focus:outline-none focus:border-emerald-500">{children}</select></div>;
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-w-0"><span className="text-[10px] uppercase font-mono tracking-wider text-slate-300 block">{title}</span><strong className="text-lg font-mono text-white block mt-1 break-words">{value}</strong><p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{note}</p></div>;
}
