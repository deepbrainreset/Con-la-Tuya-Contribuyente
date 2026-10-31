/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Microscope,
  GraduationCap,
  Landmark,
  FileText,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { THEMATIC_AUDITS } from '../data/auditoriasTematicas';
import { EVIDENCE_VS_NARRATIVE_REPORTS } from '../data/contrasteEvidencia';
import type { ThematicAuditRecord } from '../types/observatorio';

interface AuditoriasTematicasProps {
  onNavigate?: (tab: string, param?: string) => void;
  initialSlug?: string;
}

export default function AuditoriasTematicas({ onNavigate, initialSlug }: AuditoriasTematicasProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialSlug || THEMATIC_AUDITS[0].slug
  );

  const activeAudit: ThematicAuditRecord = useMemo(() => {
    return THEMATIC_AUDITS.find(a => a.slug === selectedSlug) || THEMATIC_AUDITS[0];
  }, [selectedSlug]);

  return (
    <div className="space-y-10 py-4 text-left" id="auditorias-tematicas-view">
      {/* Encabezado */}
      <header className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <Microscope className="w-4 h-4" />
          <span>4. Auditorías Temáticas Sectoriales (1946–Actualidad)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Evaluación Sectorial: Previsión, Universidades, CONICET, Subsidios y Compras
        </h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          Análisis de costos presupuestarios, marco normativo, organismos ejecutores, indicadores físicos documentados y limitaciones de medición por sector. No equiparamos ausencia de medición con ausencia de impacto ni presupuesto aprobado con gasto pagado.
        </p>
      </header>

      {/* Selector de Sector */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {THEMATIC_AUDITS.map(audit => {
          const isSelected = audit.slug === activeAudit.slug;
          return (
            <button
              key={audit.id}
              type="button"
              onClick={() => {
                setSelectedSlug(audit.slug);
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setTimeout(() => {
                    document.getElementById('active-audit-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 60);
                }
              }}
              className={`text-left p-4 rounded-2xl border transition cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                  : 'bg-slate-900/30 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase">{audit.sector}</div>
              <div className="font-bold text-sm mt-1">{audit.title}</div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{audit.historicalCoverage}</div>
            </button>
          );
        })}
      </section>

      {/* Ficha de Auditoría Sectorial Activa */}
      <section id="active-audit-detail" className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 scroll-mt-28">
        <div className="border-b border-slate-800 pb-4 space-y-1">
          <div className="text-xs font-mono text-emerald-400 uppercase">{activeAudit.sector}</div>
          <h2 className="text-2xl font-extrabold text-white">{activeAudit.title}</h2>
          <p className="text-xs text-slate-400 font-mono">Cobertura histórica: {activeAudit.historicalCoverage}</p>
        </div>

        {/* Marco Normativo y Organismos Responsables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Normativa Rectora</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeAudit.governingNorms.map((norm, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{norm}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Organismos Ejecutores y de Control</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeAudit.responsibleOrganisms.map((org, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Landmark className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{org}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resumen Financiero */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Magnitud Presupuestaria y Etapa de Ejecución
          </h3>
          {activeAudit.financialSummary.map((fin, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-base font-black text-white">
                  {fin.nominalAmount !== null
                    ? `${fin.currency} ${fin.nominalAmount.toLocaleString('es-AR')}`
                    : `Serie en ${fin.currency} (${fin.period})`}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Etapa: {fin.budgetStage} · Período: {fin.period}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{fin.consolidationRuleNote}</p>
              <a
                href={fin.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
              >
                <span>Ver fuente presupuestaria oficial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Indicadores Físicos y de Desempeño */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Indicadores Físicos, Beneficiarios y Desempeño Documentado</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAudit.physicalAndPerformanceMetrics.map((metric, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                    <span>Período: {metric.period}</span>
                    <span className="text-emerald-400 uppercase">{metric.epistemicStatus}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">{metric.label}</h4>
                  <p className="text-sm font-extrabold text-white">{metric.value}</p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{metric.sourceName}</span>
                  <a
                    href={metric.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Fuente</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitaciones de Medición */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-mono uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Limitaciones de Medición y Reglas de Interpretación</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
            {activeAudit.measurementLimitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Informes de Auditoría y Repositorios Oficiales */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Informes Oficiales y Repositorios Primarios</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAudit.auditReportsCited.map((rep, idx) => (
              <a
                key={idx}
                href={rep.url}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 transition"
              >
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {rep.issuer} · {rep.year}
                  </span>
                  <div className="text-xs font-bold text-white mt-0.5">{rep.title}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Informes de Contraste Relato vs. Proceso Administrativo vinculados a este sector */}
        {(() => {
          const linkedContrasts = EVIDENCE_VS_NARRATIVE_REPORTS.filter(r =>
            r.relatedRoutes.some(rt => rt.auditSlug === activeAudit.slug)
          );
          if (linkedContrasts.length === 0) return null;
          return (
            <div className="bg-emerald-950/15 border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase text-emerald-300 font-bold">
                  Contraste Vinculado: Narrativa Mediática vs. Proceso Administrativo Real
                </span>
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('evidencia-vs-relato', linkedContrasts[0].slug)}
                    className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Abrir informe completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {linkedContrasts.map(item => (
                <div key={item.id} className="bg-slate-950/90 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {onNavigate && (
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Explorá los expedientes normativos detallados, el contraste de narrativas o el desglose presupuestario completo.
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate('evidencia-vs-relato')}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 text-xs font-bold text-emerald-300 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Relato vs. Proceso Administrativo</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('observatorio')}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Expedientes en el Observatorio</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('gasto')}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold text-emerald-300 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ir a Ejecución de Gasto, Compras y Pauta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
