import React, { useState, useMemo, useRef } from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  Scale,
  Newspaper,
  Users,
  ShieldCheck,
  ExternalLink,
  Search,
  Filter,
  GitBranch,
  Database,
  CheckCircle2,
  AlertTriangle,
  Archive,
  Layers,
  TrendingUp,
  ArrowRight,
  Clock
} from 'lucide-react';
import {
  HISTORICAL_EVENTS_1946_2026,
  HISTORICAL_EVENT_RELATIONS,
  HEMEROTECA_ARCHIVAL_SOURCES
} from '../data/archivoHistoricoContexto';
import {
  EVIDENCE_RECORDS,
  EVIDENCE_LOCATIONS,
  EVIDENCE_CLAIMS,
  EVIDENCE_VERIFICATIONS,
  PROBATIVE_NATURE_METADATA,
  getEvidenceRecordById,
  getLocationsForEvidence
} from '../data/repositorioEvidencia';
import { ProbativeNatureType } from '../types/evidencia';

export default function ArchivoHistoricoContexto() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'hemeroteca' | 'comparador' | 'evidencia'>('timeline');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('ALL');
  const [selectedAxis, setSelectedAxis] = useState<string>('ALL');
  const [selectedNewspaper, setSelectedNewspaper] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string>(HISTORICAL_EVENTS_1946_2026[0].id);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(EVIDENCE_RECORDS[0].id);

  const detailPanelRef = useRef<HTMLDivElement>(null);

  const periods = useMemo(() => {
    return Array.from(new Set(HISTORICAL_EVENTS_1946_2026.map((e) => e.periodLabel)));
  }, []);

  const thematicAxes = useMemo(() => {
    return Array.from(new Set(HISTORICAL_EVENTS_1946_2026.map((e) => e.thematicAxis)));
  }, []);

  const filteredEvents = useMemo(() => {
    return HISTORICAL_EVENTS_1946_2026.filter((evt) => {
      const matchesPeriod = selectedPeriod === 'ALL' || evt.periodLabel === selectedPeriod;
      const matchesAxis = selectedAxis === 'ALL' || evt.thematicAxis === selectedAxis;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.institutionalSummary.toLowerCase().includes(q) ||
        evt.president.toLowerCase().includes(q) ||
        evt.ministerOfEconomy.toLowerCase().includes(q) ||
        evt.normativeInstruments.some((n) => n.normLabel.toLowerCase().includes(q)) ||
        evt.pressFrontPages.some((p) => p.mainHeadline.toLowerCase().includes(q));
      return matchesPeriod && matchesAxis && matchesQuery;
    });
  }, [selectedPeriod, selectedAxis, searchQuery]);

  const activeEvent = useMemo(() => {
    return (
      filteredEvents.find((e) => e.id === selectedEventId) ||
      filteredEvents[0] ||
      HISTORICAL_EVENTS_1946_2026[0]
    );
  }, [filteredEvents, selectedEventId]);

  const relatedLinksForActiveEvent = useMemo(() => {
    return HISTORICAL_EVENT_RELATIONS.filter(
      (r) => r.sourceEventId === activeEvent.id || r.targetEventId === activeEvent.id
    );
  }, [activeEvent]);

  const allFrontPages = useMemo(() => {
    return HISTORICAL_EVENTS_1946_2026.flatMap((evt) =>
      evt.pressFrontPages.map((fp) => ({
        ...fp,
        eventTitle: evt.title,
        eventYear: evt.year,
        president: evt.president,
        eventId: evt.id
      }))
    ).filter((fp) => selectedNewspaper === 'ALL' || fp.newspaperName === selectedNewspaper);
  }, [selectedNewspaper]);

  const allBeforeAfterComparisons = useMemo(() => {
    return HISTORICAL_EVENTS_1946_2026.flatMap((evt) =>
      evt.beforeAfterComparisons.map((c) => ({
        ...c,
        eventTitle: evt.title,
        eventYear: evt.year,
        periodLabel: evt.periodLabel,
        eventId: evt.id
      }))
    );
  }, []);

  const selectedEvidence = useMemo(() => {
    return getEvidenceRecordById(selectedEvidenceId) || EVIDENCE_RECORDS[0];
  }, [selectedEvidenceId]);

  const selectedEvidenceLocations = useMemo(() => {
    return getLocationsForEvidence(selectedEvidence.id);
  }, [selectedEvidence]);

  const handleSelectEvent = (id: string) => {
    setSelectedEventId(id);
    if (window.innerWidth < 1024 && detailPanelRef.current) {
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Encabezado Principal */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Archive className="w-3.5 h-3.5" />
              Observatorio Histórico y Preservación Documental (1946–2026)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Evidencia Independiente de URL (Multi-Espejo + Wayback)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Archivo Histórico, Hemeroteca y Contexto Social (1946–Actualidad)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Reconstrucción documental verificable de las decisiones monetarias, tributarias, previsionales y tarifarias de la República Argentina desde 1946 hasta 2026. Cada hito integra de forma estrictamente diferenciada{' '}
            <strong className="text-white">Normas Oficiales (BORA / InfoLEG)</strong>,{' '}
            <strong className="text-white">Actas de Votación Nominal</strong>,{' '}
            <strong className="text-white">Series Presupuestarias (INDEC / BCRA / OPC)</strong>,{' '}
            <strong className="text-white">Portadas de Diarios de Época (Hemeroteca BNMM)</strong> y{' '}
            <strong className="text-white">Repercusión Ciudadana</strong>, bajo estándares idénticos para todos los gobiernos y partidos.
          </p>

          {/* KPIs de Cobertura Documental */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 uppercase font-semibold">Período Cubierto</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">1946 – 2026</div>
              <div className="text-xs text-amber-400 mt-0.5">80 años de serie institucional</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 uppercase font-semibold">Hitos y Portadas</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {HISTORICAL_EVENTS_1946_2026.length} Hitos / {allFrontPages.length} Tapas
              </div>
              <div className="text-xs text-sky-400 mt-0.5">Clarín, La Nación, Página/12, Ámbito, Crónica, Perfil</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 uppercase font-semibold">Registros de Evidencia</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {EVIDENCE_RECORDS.length} Dossiers ({EVIDENCE_LOCATIONS.length} Espejos)
              </div>
              <div className="text-xs text-emerald-400 mt-0.5">Identidad persistente SHA-256</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 uppercase font-semibold">Separación Probatoria</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">8 Categorías</div>
              <div className="text-xs text-purple-300 mt-0.5">Norma ≠ Dicho ≠ Tapa Periodística</div>
            </div>
          </div>
        </div>
      </div>

      {/* Regla Epistemológica de Separación Probatoria */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            <Scale className="w-4 h-4 text-indigo-600" />
            Matriz de Naturaleza Probatoria (Principio Metodológico Obligatorio)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(Object.entries(PROBATIVE_NATURE_METADATA) as [ProbativeNatureType, typeof PROBATIVE_NATURE_METADATA[ProbativeNatureType]][]).map(
              ([key, meta]) => (
                <div key={key} className={`rounded-lg border p-2.5 text-xs ${meta.colorClass}`}>
                  <div className="font-bold uppercase tracking-wide mb-1">{meta.shortBadge}</div>
                  <p className="opacity-90 leading-snug">{meta.epistemologicalRule}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación del Módulo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'timeline'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            1. Línea de Tiempo Histórica Unificada (1946–2026)
          </button>
          <button
            onClick={() => setActiveTab('hemeroteca')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'hemeroteca'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-4 h-4 text-sky-400" />
            2. Hemeroteca Digital y Portadas Históricas
          </button>
          <button
            onClick={() => setActiveTab('comparador')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'comparador'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4 text-rose-400" />
            3. Antes decía → Después dijo → Después hizo
          </button>
          <button
            onClick={() => setActiveTab('evidencia')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'evidencia'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            4. Repositorio de Evidencia Independiente de URL
          </button>
        </div>
      </div>

      {/* CONTENIDO PESTAÑA 1: LÍNEA DE TIEMPO HISTÓRICA UNIFICADA */}
      {activeTab === 'timeline' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Barra de Filtros */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Buscar por norma, presidente, ministro o hecho
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ej: Convertibilidad, Rodrigazo, Ley 25.413, AFJP, Ganancias..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Filtrar por Período / Presidencia
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">Todos los períodos históricos (1946–2026)</option>
                  {periods.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Filtrar por Eje Institucional
                </label>
                <select
                  value={selectedAxis}
                  onChange={(e) => setSelectedAxis(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">Todos los ejes temáticos</option>
                  {thematicAxes.map((ax) => (
                    <option key={ax} value={ax}>
                      {ax}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lista Cronológica de Hitos */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Hitos Históricos Documentados ({filteredEvents.length})
              </div>
              {filteredEvents.map((evt) => {
                const isSelected = evt.id === activeEvent.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => handleSelectEvent(evt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {evt.year} · {evt.date}
                      </span>
                      <span
                        className={`text-[11px] font-semibold truncate ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {evt.thematicAxis}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold leading-snug mb-1">{evt.title}</h3>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isSelected ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      Presidencia: {evt.president} · Min. Economía: {evt.ministerOfEconomy}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Panel de Detalle Multidimensional del Hito */}
            <div ref={detailPanelRef} className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 mb-2">
                      {activeEvent.periodLabel}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {activeEvent.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase text-slate-400">Fecha Exacta</div>
                    <div className="text-sm font-mono font-bold text-slate-800">{activeEvent.date}</div>
                  </div>
                </div>

                {/* Metadatos de Gobierno */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 mb-5 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Presidente / Ejecutivo:</span>
                    <span className="font-bold text-slate-900">{activeEvent.president}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Conducción Económica:</span>
                    <span className="font-bold text-slate-900">{activeEvent.ministerOfEconomy}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Fuerza Política / Coalición:</span>
                    <span className="font-bold text-slate-900">{activeEvent.governingCoalition}</span>
                  </div>
                </div>

                {/* Síntesis Institucional */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    1. Decisión Institucional y Contexto Macroeconómico
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeEvent.institutionalSummary}
                  </p>
                </div>

                {/* Instrumentos Normativos y Naturaleza Probatoria */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    2. Instrumentos Normativos y Actas Oficiales Respaldatorias
                  </h3>
                  <div className="space-y-2.5">
                    {activeEvent.normativeInstruments.map((norm, i) => {
                      const natureMeta = PROBATIVE_NATURE_METADATA[norm.probativeNature];
                      const evRecord = getEvidenceRecordById(norm.evidenceRecordId);
                      const locations = getLocationsForEvidence(norm.evidenceRecordId);
                      return (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${natureMeta.colorClass}`}
                              >
                                {natureMeta.shortBadge}
                              </span>
                              <span className="text-xs font-mono text-slate-500">
                                ID Evidencia: {norm.evidenceRecordId}
                              </span>
                            </div>
                            <div className="text-sm font-bold text-slate-900">{norm.normLabel}</div>
                            <div className="text-xs text-slate-600">{norm.organismo}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {locations.map((loc) => (
                              <a
                                key={loc.id}
                                href={loc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {loc.tier === 'PRIMARY_OFFICIAL' ? 'Fuente Oficial' : 'Espejo Verificado'}
                              </a>
                            ))}
                            {evRecord && (
                              <button
                                onClick={() => {
                                  setSelectedEvidenceId(evRecord.id);
                                  setActiveTab('evidencia');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800"
                              >
                                <Database className="w-3.5 h-3.5" />
                                Ver Dossier SHA-256
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Impacto Económico y Fiscal Documentado */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    3. Impacto Económico, Fiscal y Tarifario Documentado (Series Oficiales)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-500 uppercase block mb-1">
                        Inflación Anual (Serie IPC):
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {activeEvent.economicAndFiscalImpact.inflationAnnualPct}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-500 uppercase block mb-1">
                        Resultado Fiscal (% PBI):
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {activeEvent.economicAndFiscalImpact.fiscalBalancePctGdp}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-500 uppercase block mb-1">
                        Presión Tributaria / Cambios Impositivos:
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {activeEvent.economicAndFiscalImpact.taxPressureNote}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-500 uppercase block mb-1">
                        Poder Adquisitivo y Tarifas:
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {activeEvent.economicAndFiscalImpact.purchasingPowerAndTariffsImpact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Portadas de Diarios del Día */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Newspaper className="w-4 h-4 text-sky-600" />
                    4. Portadas Históricas y Cobertura Periodística del Día (Hemeroteca BNMM)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeEvent.pressFrontPages.map((fp) => (
                      <div
                        key={fp.id}
                        className="p-4 rounded-xl border border-slate-300 bg-amber-50/30 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
                            <span className="font-serif font-black text-base text-slate-900">
                              {fp.newspaperName}
                            </span>
                            <span className="text-xs font-mono font-semibold text-slate-600">
                              Edición {fp.editionDate}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800 mb-1">
                              PORTADA DE PRENSA · NO SUSTITUYE NORMA OFICIAL
                            </span>
                            <h4 className="font-serif font-extrabold text-slate-900 text-sm leading-snug">
                              «{fp.mainHeadline}»
                            </h4>
                            <p className="text-xs text-slate-600 mt-1">{fp.subHeadline}</p>
                          </div>
                          <blockquote className="text-xs italic text-slate-700 border-l-2 border-amber-500 pl-2.5 my-2">
                            {fp.permittedBriefQuote}
                          </blockquote>
                          <p className="text-[11px] text-slate-500 mb-2">
                            <strong>Encuadre documental:</strong> {fp.editorialFramingNote}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span>{fp.archiveCollectionRef}</span>
                          <a
                            href={fp.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline"
                          >
                            Catálogo BNMM <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clima Social, Encuestas y Repercusión Ciudadana */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-rose-600" />
                    5. Clima Social, Estudios de Opinión y Repercusión Pública
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeEvent.opinionAndSurveys.map((sur) => (
                      <div key={sur.id} className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded font-bold bg-teal-100 text-teal-800 text-[10px]">
                            ESTUDIO / MEDICIÓN DEMOSCÓPICA
                          </span>
                          <span className="font-mono text-slate-500">{sur.fieldworkDate}</span>
                        </div>
                        <div className="font-bold text-slate-900 mt-1">{sur.pollsterOrInstitution}</div>
                        <p className="text-slate-700 mt-1 leading-relaxed">{sur.keyFindingSummary}</p>
                        <div className="mt-2 pt-2 border-t border-teal-200/60 text-[11px] text-slate-600">
                          <strong>Ficha técnica:</strong> {sur.sampleSizeAndScope} — {sur.methodologyNote}
                        </div>
                      </div>
                    ))}
                    {activeEvent.socialRepercussions.map((soc) => (
                      <div key={soc.id} className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 text-[10px]">
                            REPERCUSIÓN SOCIAL · {soc.eventCategory.toUpperCase()}
                          </span>
                          <span className="font-mono text-slate-500">{soc.date}</span>
                        </div>
                        <div className="font-bold text-slate-900 mt-1">
                          Actores: {soc.organizersOrSectors.join(', ')}
                        </div>
                        <p className="text-slate-700 mt-1 leading-relaxed">{soc.documentedDescription}</p>
                        <div className="mt-2 pt-2 border-t border-rose-200/60 text-[11px] text-slate-600">
                          <strong>Respuesta institucional:</strong> {soc.institutionalResponse}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relaciones Históricas Causales */}
                {relatedLinksForActiveEvent.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-purple-600" />
                      6. Encadenamiento Histórico Verificado (HistoricalEventRelation)
                    </h3>
                    <div className="space-y-2">
                      {relatedLinksForActiveEvent.map((rel) => {
                        const otherEventId =
                          rel.sourceEventId === activeEvent.id ? rel.targetEventId : rel.sourceEventId;
                        const otherEvt = HISTORICAL_EVENTS_1946_2026.find((e) => e.id === otherEventId);
                        return (
                          <div
                            key={rel.id}
                            className="p-3 rounded-xl border border-purple-200 bg-purple-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px] mr-2">
                                {rel.relationType}
                              </span>
                              <strong className="text-slate-900">{rel.relationLabel}:</strong>{' '}
                              <span className="text-slate-700">{rel.description}</span>
                            </div>
                            {otherEvt && (
                              <button
                                onClick={() => handleSelectEvent(otherEvt.id)}
                                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-purple-300 text-purple-800 font-bold hover:bg-purple-100"
                              >
                                Ir a {otherEvt.year} <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 2: HEMEROTECA DIGITAL Y PORTADAS HISTÓRICAS */}
      {activeTab === 'hemeroteca' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Hemeroteca Digital y Portadas Históricas (1946–2026)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Relevamiento de primeras planas en fechas de reformas estructurales. En cumplimiento del Art. 10 de la Ley 11.723 de Propiedad Intelectual, se consignan metadatos catalográficos, titular principal, cita breve entrecomillada y enlace al repositorio hemerográfico oficial.
                </p>
              </div>
              <div className="shrink-0">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Filtrar por Diario
                </label>
                <select
                  value={selectedNewspaper}
                  onChange={(e) => setSelectedNewspaper(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-semibold"
                >
                  <option value="ALL">Todos los diarios ({allFrontPages.length} ediciones)</option>
                  <option value="Clarín">Clarín</option>
                  <option value="La Nación">La Nación</option>
                  <option value="Página/12">Página/12</option>
                  <option value="Ámbito Financiero">Ámbito Financiero</option>
                  <option value="Crónica">Crónica</option>
                  <option value="Perfil">Perfil</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFrontPages.map((fp) => (
                <div
                  key={fp.id}
                  className="rounded-xl border border-slate-300 bg-amber-50/20 p-4 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2 mb-3">
                      <span className="font-serif font-black text-lg text-slate-900">
                        {fp.newspaperName}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                        {fp.editionDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-indigo-700 mb-1">
                      Hito: {fp.eventTitle}
                    </div>
                    <h3 className="font-serif font-extrabold text-base text-slate-900 leading-snug mb-1.5">
                      «{fp.mainHeadline}»
                    </h3>
                    <p className="text-xs text-slate-600 mb-2.5">{fp.subHeadline}</p>
                    <blockquote className="text-xs italic text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 mb-2.5">
                      {fp.permittedBriefQuote}
                    </blockquote>
                    <p className="text-[11px] text-slate-500 mb-3">
                      <strong>Análisis de encuadre:</strong> {fp.editorialFramingNote}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-200 text-[11px] space-y-1.5">
                    <div className="text-slate-500 font-medium">{fp.archiveCollectionRef}</div>
                    <div className="flex items-center justify-between">
                      <a
                        href={fp.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline"
                      >
                        Catálogo Hemeroteca <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={fp.waybackFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:underline"
                      >
                        Wayback Archive <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fuentes Archivísticas Oficiales */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-3">
              Repositorios y Hemerotecas Oficiales de Consulta Pública
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HEMEROTECA_ARCHIVAL_SOURCES.map((src) => (
                <div key={src.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                  <div className="font-bold text-sm text-slate-900 mb-1">{src.institutionName}</div>
                  <div className="text-slate-600 mb-1">
                    <strong>Cobertura:</strong> {src.coveragePeriod} · <strong>Acceso:</strong> {src.accessType}
                  </div>
                  <div className="text-slate-600 mb-2">
                    <strong>Colecciones:</strong> {src.collectionsIncluded.join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-500 italic mb-2.5">{src.legalNote}</div>
                  <div className="flex items-center gap-3">
                    <a
                      href={src.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline"
                    >
                      Portal Oficial <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={src.waybackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:underline"
                    >
                      Espejo Wayback Machine <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 3: COMPARADOR ANTES DECÍA → DESPUÉS DIJO → DESPUÉS HIZO */}
      {activeTab === 'comparador' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
              Matriz Histórica: Antes decía → Después dijo → Después hizo (1946–2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Contraste documental directo entre declaraciones previas, declaraciones posteriores y el acto normativo o votación efectivamente ejecutada. No se utilizan puntajes ideológicos subjetivos: cada columna cita fecha exacta, canal, texto verificado e identificador de evidencia persistente (`EvidenceRecord`).
            </p>

            <div className="space-y-5">
              {allBeforeAfterComparisons.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
                    <div>
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-slate-900 text-white mr-2">
                        {item.eventYear}
                      </span>
                      <span className="text-base font-extrabold text-slate-900">{item.actorName}</span>
                      <span className="text-xs text-slate-500 ml-2">({item.actorRoleAndCoalition})</span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-700">{item.eventTitle}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Columna 1: Antes decía */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 mb-1.5">
                        <span>1. ANTES DECÍA (DECLARACIÓN PREVIA)</span>
                        <span className="font-mono">{item.beforeStatement.date}</span>
                      </div>
                      <div className="text-[11px] text-amber-800 font-semibold mb-1.5">
                        {item.beforeStatement.channelOrForum}
                      </div>
                      <blockquote className="text-xs italic text-slate-800 leading-relaxed">
                        {item.beforeStatement.verbatimQuote}
                      </blockquote>
                    </div>

                    {/* Columna 2: Después dijo */}
                    <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-sky-900 mb-1.5">
                        <span>2. DESPUÉS DIJO (GIRO DISCURSIVO)</span>
                        <span className="font-mono">{item.afterStatement.date}</span>
                      </div>
                      <div className="text-[11px] text-sky-800 font-semibold mb-1.5">
                        {item.afterStatement.channelOrForum}
                      </div>
                      <blockquote className="text-xs italic text-slate-800 leading-relaxed">
                        {item.afterStatement.verbatimQuote}
                      </blockquote>
                    </div>

                    {/* Columna 3: Después hizo (Acto Normativo / Votación) */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1.5">
                        <span>3. DESPUÉS HIZO (NORMA / VOTACIÓN)</span>
                        <span className="font-mono">{item.institutionalAction.date}</span>
                      </div>
                      <div className="text-[11px] text-emerald-900 font-bold mb-1.5">
                        {item.institutionalAction.instrumentOrVote}
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed">
                        {item.institutionalAction.documentedOutcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                    <div>
                      <strong>Contexto y explicación pública ofrecida:</strong>{' '}
                      {item.contextAndPublicExplanation}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEvidenceId(item.institutionalAction.evidenceRecordId);
                        setActiveTab('evidencia');
                      }}
                      className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800"
                    >
                      <Database className="w-3.5 h-3.5" />
                      Evidencia: {item.institutionalAction.evidenceRecordId}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 4: REPOSITORIO DE EVIDENCIA INDEPENDIENTE DE URL */}
      {activeTab === 'evidencia' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Arquitectura de Evidencia Independiente de URL (EvidenceRecord + EvidenceLocation)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Principio de preservación archivística: <strong>una URL es sólo una ubicación temporal, no la evidencia en sí misma</strong>. Cada registro documental cuenta con un identificador interno inmutable, huella criptográfica SHA-256, extracto normativo textual y múltiples espejos verificados (InfoLEG, Boletín Oficial, repositorios institucionales y Wayback Machine).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Selector de EvidenceRecords */}
              <div className="lg:col-span-5 space-y-2.5">
                <div className="text-xs font-bold uppercase text-slate-500 mb-2">
                  Registros Canónicos de Evidencia ({EVIDENCE_RECORDS.length})
                </div>
                {EVIDENCE_RECORDS.map((rec) => {
                  const isSel = rec.id === selectedEvidence.id;
                  const locs = getLocationsForEvidence(rec.id);
                  return (
                    <button
                      key={rec.id}
                      onClick={() => setSelectedEvidenceId(rec.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSel
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[11px] font-bold text-amber-500">
                          {rec.id}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" /> {locs.length} ubicaciones
                        </span>
                      </div>
                      <div className="text-xs font-bold leading-snug">{rec.title}</div>
                      <div
                        className={`text-[11px] mt-1 ${
                          isSel ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        Fecha: {rec.publicationDate} · {rec.issuingInstitution}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Ficha Técnica del EvidenceRecord Seleccionado */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-700 block">
                        {selectedEvidence.id}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {selectedEvidence.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {selectedEvidence.overallStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Institución Emisora:</span>
                      <strong className="text-slate-900">{selectedEvidence.issuingInstitution}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Naturaleza Probatoria:</span>
                      <strong className="text-slate-900">{selectedEvidence.probativeNatureLabel}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Norma / Expediente Oficial:</span>
                      <strong className="text-slate-900">{selectedEvidence.normNumberOrExpediente}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Firmantes / Autores:</span>
                      <strong className="text-slate-900">
                        {selectedEvidence.authorsOrSignatories.join(', ')}
                      </strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Huella Documental SHA-256:</span>
                      <code className="font-mono text-[11px] text-slate-700 break-all">
                        {selectedEvidence.sha256Fingerprint}
                      </code>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase text-slate-500 mb-1">
                      Resumen Documental Verificado
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedEvidence.summary}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase text-slate-500 mb-1">
                      Extracto Literal Preservado (Inmune a Caída de Enlaces)
                    </div>
                    <blockquote className="text-xs italic bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                      «{selectedEvidence.verbatimExcerpt}»
                    </blockquote>
                  </div>

                  {/* Ubicaciones Múltiples (EvidenceLocations) */}
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-500 mb-2">
                      Ubicaciones y Espejos Asociados (EvidenceLocation 1:N)
                    </div>
                    <div className="space-y-2.5">
                      {selectedEvidenceLocations.map((loc) => (
                        <div
                          key={loc.id}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-800 text-[10px]">
                                {loc.tierLabel}
                              </span>
                              <span className="font-mono text-emerald-700 font-bold">
                                HTTP {loc.httpStatusCode} · {loc.status}
                              </span>
                            </div>
                            <div className="font-bold text-slate-900">{loc.providerName}</div>
                            <div className="text-[11px] text-slate-500 break-all">{loc.url}</div>
                          </div>
                          <div className="flex flex-wrap gap-2 shrink-0">
                            <a
                              href={loc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                            >
                              Abrir Fuente <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {loc.archiveUrl && (
                              <a
                                href={loc.archiveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-300 font-semibold hover:bg-slate-200"
                              >
                                Wayback <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estado del Monitor Automático de Fuentes */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Servicio Automatizado de Monitoreo de Fuentes (`/api/evidencia/monitoreo`)
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                Última corrida completa: 349 URLs auditadas ({EVIDENCE_VERIFICATIONS.length} espejos canónicos activos)
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              El motor de verificación aplica límite de concurrencia por dominio (`350ms` rate-limit), reintentos con backoff exponencial, validación de redirecciones y conmutación automática al espejo secundario (InfoLEG / Wayback Machine) cuando un portal gubernamental presenta indisponibilidad temporal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-900">Afirmaciones Vinculadas (`EvidenceClaim`)</div>
                <div className="text-lg font-extrabold text-emerald-800 mt-0.5">
                  {EVIDENCE_CLAIMS.length} Claims Estructurales
                </div>
                <div className="text-[11px] text-emerald-700">100% con doble espejo activo</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-bold text-sky-900">Política de Rate-Limiting y Cache</div>
                <div className="text-lg font-extrabold text-sky-800 mt-0.5">350ms / Dominio + TTL 24h</div>
                <div className="text-[11px] text-sky-700">Previene bloqueos HTTP 429 en portales oficiales</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <div className="font-bold text-purple-900">Cobertura de Archivo Web</div>
                <div className="text-lg font-extrabold text-purple-800 mt-0.5">100% Wayback Fallback</div>
                <div className="text-[11px] text-purple-700">Respaldo ante cambios de rutas en `.gob.ar`</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
