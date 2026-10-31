/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Scale,
  FileSearch,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  GitCompare,
  Search,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { EVIDENCE_VS_NARRATIVE_REPORTS, NarrativeClaim } from '../data/contrasteEvidencia';

interface ContrasteEvidenciaProps {
  onNavigate: (tab: string, param?: string) => void;
  initialSlug?: string;
}

const OUTCOME_BADGE: Record<
  NarrativeClaim['verificationOutcome'],
  { label: string; className: string }
> = {
  contradicho_por_norma_o_expediente: {
    label: 'Contradicho por norma o expediente oficial',
    className: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
  },
  parcialmente_cierto_con_omisiones: {
    label: 'Parcialmente cierto / Con omisiones de contexto',
    className: 'bg-amber-500/10 border-amber-500/30 text-amber-300'
  },
  respaldado_por_registro_oficial: {
    label: 'Respaldado por registro oficial',
    className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
  },
  sin_evidencia_publica_concluyente: {
    label: 'Sin evidencia pública concluyente',
    className: 'bg-slate-500/10 border-slate-500/30 text-slate-300'
  }
};

export default function ContrasteEvidencia({ onNavigate, initialSlug }: ContrasteEvidenciaProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialSlug || EVIDENCE_VS_NARRATIVE_REPORTS[0].slug
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');

  React.useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
  }, [initialSlug]);

  const categories = useMemo(
    () => ['todas', ...Array.from(new Set(EVIDENCE_VS_NARRATIVE_REPORTS.map(r => r.category)))],
    []
  );

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EVIDENCE_VS_NARRATIVE_REPORTS.filter(report => {
      const matchesCat = categoryFilter === 'todas' || report.category === categoryFilter;
      const matchesSearch =
        !q ||
        report.title.toLowerCase().includes(q) ||
        report.summary.toLowerCase().includes(q) ||
        report.narrativesAnalyzed.some(
          n =>
            n.claimSummary.toLowerCase().includes(q) ||
            n.verificationExplanation.toLowerCase().includes(q)
        );
      return matchesCat && matchesSearch;
    });
  }, [categoryFilter, search]);

  const activeReport = useMemo(
    () =>
      filteredReports.find(r => r.slug === selectedSlug) ||
      EVIDENCE_VS_NARRATIVE_REPORTS.find(r => r.slug === selectedSlug) ||
      EVIDENCE_VS_NARRATIVE_REPORTS[0],
    [filteredReports, selectedSlug]
  );

  return (
    <div className="space-y-8 py-4 text-left" id="contraste-evidencia-view">
      {/* Header */}
      <header className="border-b border-slate-800 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <GitCompare className="w-4 h-4" />
          <span>Contraste Diario Independiente · Relato Mediático vs. Expediente Administrativo</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Lo que se intenta instalar vs. lo que consta en los procesos del Estado
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
          Esta sección contrasta las narrativas instaladas en los medios, en el oficialismo o en la oposición contra el{' '}
          <strong className="text-white">proceso legal, contable y administrativo real</strong> registrado en leyes, decretos, dictámenes de SIGEN/AGN, ejecuciones presupuestarias y órdenes de compra. Independientemente de quién gobierne o qué declare cada sector, sólo se da por válido lo que deja huella documental verificable.
        </p>
      </header>

      {/* Filters & Search */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                  categoryFilter === cat
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'todas' ? 'Todos los sectores' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por tema, ley, SIGEN, ANSES..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredReports.map(report => {
            const isSelected = report.slug === activeReport.slug;
            return (
              <button
                key={report.id}
                type="button"
                onClick={() => {
                  setSelectedSlug(report.slug);
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setTimeout(() => {
                      document.getElementById('active-contrast-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 60);
                  }
                }}
                className={`text-left p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="text-emerald-400 uppercase">{report.category}</span>
                    <span className="text-slate-400">Verificado: {report.lastVerified}</span>
                  </div>
                  <h2 className="text-sm font-bold text-white leading-snug">{report.title}</h2>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{report.summary}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Report Detail */}
      <article id="active-contrast-detail" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-7 space-y-8 scroll-mt-28">
        <div className="border-b border-slate-800 pb-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase">
              {activeReport.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              Estado epistémico: {activeReport.epistemicStatus.toUpperCase()}
            </span>
            <span className="text-slate-400">Última verificación documental: {activeReport.lastVerified}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{activeReport.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeReport.summary}</p>

          {/* Cross-Links to other vertices of the web */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Vértices conectados en la plataforma:
            </span>
            {activeReport.relatedRoutes.map((route, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onNavigate(route.tab, route.auditSlug || route.dossierId || route.comparisonId)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-emerald-300 font-medium transition cursor-pointer"
              >
                <span>{route.label}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>

        {/* 1. Narratives vs Evidence */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              1. Lo que se dice / intenta instalar (Oficialismo, Oposición y Medios) vs. Evidencia
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeReport.narrativesAnalyzed.map((item, idx) => {
              const badge = OUTCOME_BADGE[item.verificationOutcome];
              return (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item.sector}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border w-fit ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <blockquote className="text-sm font-bold text-white border-l-2 border-amber-500/60 pl-3 py-0.5">
                    {item.claimSummary}
                  </blockquote>
                  <p className="text-[11px] text-slate-400 font-mono">Contexto de circulación: {item.sourceContext}</p>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                      Contraste con el registro normativo y contable:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{item.verificationExplanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Real Administrative Process Step-by-Step */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              2. Cómo funciona realmente el proceso administrativo y qué quedó registrado
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeReport.administrativeProcess.map(step => (
              <div
                key={step.stepOrder}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold">
                      ETAPA {step.stepOrder}
                    </span>
                    <span className="text-slate-400">{step.responsibleBody}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{step.stageTitle}</h4>
                  <div className="text-[11px] font-mono text-sky-300">Base legal: {step.legalBasis}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.howItActuallyWorks}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-slate-300">
                    <strong className="text-emerald-300 block text-[10px] font-mono uppercase">
                      Evidencia registrada en el expediente:
                    </strong>
                    {step.recordedEvidenceInCase}
                  </div>
                  <a
                    href={step.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline"
                  >
                    Ver fuente normativa / administrativa <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Synthesis of What is Actually Happening & Pending Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="bg-emerald-950/15 border border-emerald-500/25 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                3. Síntesis de lo que realmente ocurre según la evidencia
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-200 leading-relaxed list-disc pl-4">
              {activeReport.whatIsActuallyHappening.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                4. Datos aún faltantes que el Estado debe transparentar
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-4">
              {activeReport.pendingUnverifiedQuestions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('consultas')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline pt-1 cursor-pointer"
            >
              Generar solicitud de acceso a la información pública (Ley 27.275) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </div>

        {/* Official Sources Footer */}
        <footer className="border-t border-slate-800 pt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>Fuentes Primarias y Documentación Oficial Consultada</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeReport.officialSources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-200 transition"
              >
                <span className="font-semibold text-emerald-400">{src.institution}:</span>
                <span>{src.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ))}
          </div>
        </footer>
      </article>

      {/* Methodology Note */}
      <section className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block">Estándar de Verificación Diaria Independiente</strong>
          Ningún dicho mediático o partidario —provenga del Poder Ejecutivo, de legisladores, de gobernadores, de sindicatos o de medios de comunicación— se toma como hecho administrativo. El sistema contrasta diariamente las afirmaciones públicas contra el Boletín Oficial, InfoLEG, Presupuesto Abierto, dictámenes de la Procuración del Tesoro, informes de SIGEN/AGN y actas parlamentarias.
        </div>
      </section>
    </div>
  );
}
