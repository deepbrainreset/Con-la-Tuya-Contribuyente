/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  History,
  Landmark,
  FileText,
  Scale,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  Coins,
  Filter,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  PRESIDENTIAL_PERIODS_1946_2026,
  HISTORICAL_FISCAL_SERIES,
  HISTORICAL_DOSSIERS,
  MONETARY_REGIMES_ARGENTINA
} from '../data/observatorioHistorico';
import type { HistoricalDossier, EpistemicStatus } from '../types/observatorio';

interface ObservatorioHistoricoProps {
  onNavigate?: (tab: string, param?: string) => void;
  initialDossierId?: string;
}

const EPISTEMIC_BADGE_STYLES: Record<EpistemicStatus, { label: string; className: string }> = {
  verificado: {
    label: 'Hecho Verificado (Fuente Primaria)',
    className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  },
  oficial_con_reserva: {
    label: 'Dato Oficial con Reserva Metodológica',
    className: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  estimacion: {
    label: 'Estimación con Metodología Explícita',
    className: 'bg-sky-500/10 text-sky-300 border-sky-500/30'
  },
  interpretacion: {
    label: 'Interpretación Documentada',
    className: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
  },
  controversia: {
    label: 'Controversia / Litigio Abierto',
    className: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  },
  desconocido: {
    label: 'Dato No Publicado / Pendiente de Verificación',
    className: 'bg-slate-800 text-slate-300 border-slate-700'
  }
};

const ROLE_LABELS: Record<string, string> = {
  autor_proyecto: 'Autor / Remitente del Proyecto',
  coautor_proyecto: 'Coautor del Proyecto',
  miembro_informante: 'Miembro Informante',
  voto_afirmativo: 'Voto Nominal Afirmativo',
  voto_negativo: 'Voto Nominal Negativo',
  abstencion: 'Abstención / Ausencia',
  ausente: 'Ausente en Votación',
  promulgacion_ejecutiva: 'Promulgación Ejecutiva',
  firmante_decreto_resolucion: 'Firmante de Decreto / Resolución',
  autoridad_adjudicante: 'Autoridad Adjudicante',
  responsable_ejecucion: 'Responsable de Ejecución',
  organismo_pagador: 'Organismo Pagador'
};

export default function ObservatorioHistorico({ onNavigate, initialDossierId }: ObservatorioHistoricoProps) {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeDossierId, setActiveDossierId] = useState<string>(
    initialDossierId || HISTORICAL_DOSSIERS[0].id
  );

  const filteredPeriods = useMemo(() => {
    if (selectedPeriodId === 'all') return PRESIDENTIAL_PERIODS_1946_2026;
    return PRESIDENTIAL_PERIODS_1946_2026.filter(p => p.id === selectedPeriodId);
  }, [selectedPeriodId]);

  const chartSeries = useMemo(() => {
    return HISTORICAL_FISCAL_SERIES.filter(item => {
      if (selectedPeriodId !== 'all' && item.presidencyId !== selectedPeriodId) return false;
      if (selectedStageFilter !== 'all' && item.budgetStage !== selectedStageFilter) return false;
      return item.taxPressureConsolidatedPctGdp !== null;
    });
  }, [selectedPeriodId, selectedStageFilter]);

  const filteredDossiers = useMemo(() => {
    if (selectedCategoryFilter === 'all') return HISTORICAL_DOSSIERS;
    return HISTORICAL_DOSSIERS.filter(d => d.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  const activeDossier: HistoricalDossier = useMemo(() => {
    return (
      filteredDossiers.find(d => d.id === activeDossierId) ||
      filteredDossiers[0] ||
      HISTORICAL_DOSSIERS[0]
    );
  }, [filteredDossiers, activeDossierId]);

  return (
    <div className="space-y-10 py-4 text-left" id="observatorio-historico-view">
      {/* Encabezado Principal */}
      <header className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <History className="w-4 h-4" />
          <span>Observatorio Histórico Fiscal y Político (1946–2026)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Recorrido Histórico del Dinero Público, Reformas y Expedientes
        </h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          Reconstrucción documentada del origen de los recursos públicos, su distribución entre Nación y provincias, las etapas reales de ejecución presupuestaria y los expedientes normativos clave desde 1946 hasta la actualidad. Nunca se inventan datos para cubrir períodos sin información ni se duplican transferencias intergubernamentales.
        </p>
      </header>

      {/* Aviso de Regla de Consolidación y Moneda Histórica */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Regla Anti-Duplicación de Transferencias Intergubernamentales
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Los recursos recaudados por Nación y enviados por Coparticipación Federal (Ley 23.548 y regímenes previos) a las 23 provincias y CABA se contabilizan una sola vez en el gasto consolidado: se deducen del gasto nacional propio y se computan al ejecutarse en cada jurisdicción receptora.
            </p>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3">
          <Coins className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
              Normalización Monetaria Histórica (13 Ceros Eliminados desde 1946)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Entre 1946 y 2026 rigieron cinco signos monetarios distintos (<code className="text-amber-200">m$n</code>, <code className="text-amber-200">$ley</code>, <code className="text-amber-200">$a</code>, <code className="text-amber-200">₳</code> y <code className="text-amber-200">ARS</code>). Para comparar décadas sin distorsión nominal se exhiben porcentajes del PIB e importes en moneda original con su etapa presupuestaria explícita.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros del Explorador Fiscal Histórico */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>1. Explorador de Series Fiscales y Etapas Presupuestarias (1946–2026)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Evolución de la presión tributaria consolidada, recaudación nacional, coparticipación y gasto primario como % del PIB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="period-filter" className="text-[11px] font-mono text-slate-400">
                Período:
              </label>
              <select
                id="period-filter"
                value={selectedPeriodId}
                onChange={e => setSelectedPeriodId(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/40"
              >
                <option value="all">Todos los períodos (1946–2026)</option>
                {PRESIDENTIAL_PERIODS_1946_2026.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.periodLabel} — {p.headOfState}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="stage-filter" className="text-[11px] font-mono text-slate-400">
                Etapa:
              </label>
              <select
                id="stage-filter"
                value={selectedStageFilter}
                onChange={e => setSelectedStageFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/40"
              >
                <option value="all">Todas las etapas ejecutadas</option>
                <option value="ejecutado_cuenta_inversion">Cuenta de Inversión Histórica</option>
                <option value="devengado">Ejecutado Devengado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gráfico Recharts */}
        <div className="h-80 w-full bg-slate-950/60 border border-slate-900 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartSeries} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="% PIB" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#1e293b',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#f8fafc'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area
                type="monotone"
                dataKey="taxPressureConsolidatedPctGdp"
                name="Presión Tributaria Consolidada (% PIB)"
                fill="#10b981"
                fillOpacity={0.15}
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="primarySpendingNationalPctGdp"
                name="Gasto Primario Nacional (% PIB)"
                stroke="#f59e0b"
                strokeWidth={2}
              />
              <Bar
                dataKey="provincialAutoTransferPctGdp"
                name="Coparticipación a Provincias (% PIB)"
                fill="#38bdf8"
                barSize={18}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de Puntos Históricos con Etapa Presupuestaria */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">
              Serie histórica de presión tributaria, transferencias y gasto primario con etapa presupuestaria y fuente oficial
            </caption>
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                <th scope="col" className="py-2.5 px-3">Año</th>
                <th scope="col" className="py-2.5 px-3">Presión Consolidada</th>
                <th scope="col" className="py-2.5 px-3">Recaudación Nac.</th>
                <th scope="col" className="py-2.5 px-3">Coparticipación Prov.</th>
                <th scope="col" className="py-2.5 px-3">Gasto Primario Nac.</th>
                <th scope="col" className="py-2.5 px-3">Resultado Financiero</th>
                <th scope="col" className="py-2.5 px-3">Etapa Presupuestaria</th>
                <th scope="col" className="py-2.5 px-3">Fuente Primaria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {HISTORICAL_FISCAL_SERIES.filter(
                row => selectedPeriodId === 'all' || row.presidencyId === selectedPeriodId
              ).map(row => (
                <tr key={row.year} className="hover:bg-slate-900/50 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-white">{row.year}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-300">
                    {row.taxPressureConsolidatedPctGdp !== null
                      ? `${row.taxPressureConsolidatedPctGdp.toFixed(1)}% PIB`
                      : 'En curso (Ley 27.798)'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">
                    {row.nationalTaxRevenuePctGdp !== null ? `${row.nationalTaxRevenuePctGdp.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sky-300">
                    {row.provincialAutoTransferPctGdp !== null ? `${row.provincialAutoTransferPctGdp.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">
                    {row.primarySpendingNationalPctGdp !== null ? `${row.primarySpendingNationalPctGdp.toFixed(1)}%` : '$148,07 B (aprob.)'}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {row.financialResultPctGdp !== null ? (
                      <span className={row.financialResultPctGdp >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {row.financialResultPctGdp > 0 ? `+${row.financialResultPctGdp.toFixed(1)}%` : `${row.financialResultPctGdp.toFixed(1)}%`}
                      </span>
                    ) : (
                      <span className="text-slate-500">Pendiente cierre</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {row.budgetStage}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <a
                      href={row.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{row.sourceName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Línea Temporal de Períodos 1946–2026 */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <span>2. Línea Temporal de Gobiernos y Reformas Estructurales (1946–2026)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hitos tributarios, previsionales y monetarios verificados en cada período con los mismos estándares documentales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPeriods.map(period => {
            const badge = EPISTEMIC_BADGE_STYLES[period.epistemicStatus];
            return (
              <article
                key={period.id}
                className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg">
                      {period.periodLabel}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white">{period.headOfState}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {period.politicalForce} · Moneda dominante: <code className="text-amber-300">{period.dominantCurrency}</code>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950/70 border border-slate-850 rounded-xl p-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">Gasto Consolidado</span>
                      <span className="font-bold text-slate-200">{period.publicSpendingPctGdpRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">Presión Tributaria</span>
                      <span className="font-bold text-emerald-300">{period.taxPressurePctGdpRange}</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {period.keyFiscalMilestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-3 text-[11px]">
                  {period.primarySources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Explorador de Expedientes Interactivos */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6" id="expedientes-interactivos">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>3. Explorador de Expedientes Históricos Interactivos</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cada expediente conecta normativa oficial, origen y destino de fondos, etapa presupuestaria, responsables con rol verificado y resultados medidos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="dossier-cat-filter" className="text-[11px] font-mono text-slate-400">
              Categoría:
            </label>
            <select
              id="dossier-cat-filter"
              value={selectedCategoryFilter}
              onChange={e => {
                setSelectedCategoryFilter(e.target.value);
                const nextList =
                  e.target.value === 'all'
                    ? HISTORICAL_DOSSIERS
                    : HISTORICAL_DOSSIERS.filter(d => d.category === e.target.value);
                if (nextList.length > 0) setActiveDossierId(nextList[0].id);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/40"
            >
              <option value="all">Todos los expedientes ({HISTORICAL_DOSSIERS.length})</option>
              <option value="previsional">Sistema Previsional y Moratorias</option>
              <option value="empresas_publicas">Empresas Públicas (YPF)</option>
              <option value="tributario">Reformas Tributarias (Ganancias)</option>
              <option value="cientifico_universitario">Ciencia y CONICET</option>
              <option value="contrataciones">Compras Públicas (COMPR.AR)</option>
            </select>
          </div>
        </div>

        {/* Selector de Expedientes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDossiers.map(dossier => {
            const isSelected = dossier.id === activeDossier.id;
            return (
              <button
                key={dossier.id}
                type="button"
                onClick={() => setActiveDossierId(dossier.id)}
                className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                    : 'bg-slate-950/70 border-slate-800/90 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-emerald-400">
                  <span>{dossier.code}</span>
                  <span>{dossier.periodCovered}</span>
                </div>
                <div className="font-bold text-sm mt-1 line-clamp-2">{dossier.title}</div>
              </button>
            );
          })}
        </div>

        {/* Detalle del Expediente Activo */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>{activeDossier.code}</span>
                <span>·</span>
                <span>{activeDossier.jurisdiction}</span>
                <span>·</span>
                <span>Período: {activeDossier.periodCovered}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeDossier.title}</h3>
            </div>
            <span
              className={`text-[11px] font-mono px-3 py-1 rounded-full border ${
                EPISTEMIC_BADGE_STYLES[activeDossier.epistemicStatus].className
              }`}
            >
              {EPISTEMIC_BADGE_STYLES[activeDossier.epistemicStatus].label}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{activeDossier.summaryNeutral}</p>

          {/* Dimensiones A y B: Origen y Destino del Dinero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Dimensión A — Origen del Dinero
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeDossier.originOfFunds}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Dimensión B — Destino y Beneficiarios
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeDossier.destinationAndBeneficiaries}</p>
            </div>
          </div>

          {/* Marco Normativo */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Marco Normativo y Documentos Primarios
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDossier.normativeFramework.map((norm, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-xl p-3.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {norm.normNumber} ({norm.sanctionOrIssueDate})
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{norm.title}</p>
                  </div>
                  <a
                    href={norm.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Fuente</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Registros Monetarios por Etapa */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Magnitudes Monetarias (Moneda, Período y Etapa Presupuestaria)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDossier.monetaryRecords.map((m, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-black text-white">
                      {m.nominalAmount !== null
                        ? `${m.currency} ${m.nominalAmount.toLocaleString('es-AR')}`
                        : `Serie en ${m.currency} (${m.period})`}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                      Etapa: {m.budgetStage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{m.consolidationRuleNote}</p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400 font-mono">Período: {m.period}</span>
                    <a
                      href={m.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Ver documento oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensión D: Trazabilidad de Intervenciones */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Dimensión D — Responsables Públicos e Intervenciones Documentadas (por Rol Específico)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDossier.documentedInterventions.map(inter => (
                <div key={inter.id} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-white">{inter.officialName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {ROLE_LABELS[inter.interventionType] || inter.interventionType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {inter.roleAtEvent} · {inter.partyOrCoalitionAtEvent} · {inter.date}
                  </p>
                  <p className="text-xs text-slate-300">{inter.summary}</p>
                  <a
                    href={inter.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{inter.sourceName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensión C: Resultados Verificados y Limitaciones de Medición */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Dimensión C — Resultados Documentados y Limitaciones de Medición
            </h4>
            {activeDossier.outcomesAndResults.map(out => (
              <div key={out.id} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{out.metricName} ({out.period})</span>
                  <a
                    href={out.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{out.sourceName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-emerald-300 font-medium">Resultado observado: {out.observedValue}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-amber-300">Límite metodológico:</strong> {out.measurementLimitation}
                </p>
              </div>
            ))}
          </div>

          {/* Perspectivas Documentadas en Controversia */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Fundamentos Oficiales y Objeciones Parlamentarias / Técnicas Documentadas</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDossier.controversiesAndArguments.map((arg, idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-amber-200">{arg.perspectiveLabel}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{arg.argumentSummary}</p>
                  <a
                    href={arg.supportingSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Fuente documental</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones conectadas con otros módulos */}
          {onNavigate && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                ¿Querés comparar las declaraciones históricas sobre este expediente o generar una consulta pública?
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('declaraciones')}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Abrir Comparador de Declaraciones</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contribucion')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold text-emerald-300 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Solicitar Explicación Documentada (Ley 27.275)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tabla de Regímenes Monetarios Históricos */}
      <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            4. Tabla de Conversión de Signos Monetarios Argentinos (1946–2026)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">Signos monetarios argentinos vigentes desde 1946 y equivalencias legales</caption>
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                <th scope="col" className="py-2 px-3">Código</th>
                <th scope="col" className="py-2 px-3">Signo Monetario</th>
                <th scope="col" className="py-2 px-3">Vigencia</th>
                <th scope="col" className="py-2 px-3">Norma de Creación</th>
                <th scope="col" className="py-2 px-3">Equivalencia / Quita de Ceros</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {MONETARY_REGIMES_ARGENTINA.map(reg => (
                <tr key={reg.code}>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-300">{reg.code}</td>
                  <td className="py-2.5 px-3 font-bold text-white">{reg.name}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">{reg.validPeriod}</td>
                  <td className="py-2.5 px-3 text-slate-300">{reg.legalBasis}</td>
                  <td className="py-2.5 px-3 text-slate-400">{reg.conversionRule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
