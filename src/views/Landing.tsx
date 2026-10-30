/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldCheck,
  Search,
  Calculator,
  ArrowRight,
  BookOpen,
  Scale,
  Coins,
  AlertCircle,
  History,
  MessageSquareQuote,
  Microscope,
  FileText,
  HelpCircle
} from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { TRIBUTOS } from '../data/tributos';
import { POLITICAL_TRANSPARENCY } from '../data/transparenciaPolitica';
import { EXECUTIVE_AUTHORITIES_2026 } from '../data/autoridadesEjecutivas2026';
import { HISTORICAL_DOSSIERS } from '../data/observatorioHistorico';
import { PUBLIC_STATEMENTS_ARCHIVE } from '../data/declaracionesHistoricas';
import { THEMATIC_AUDITS } from '../data/auditoriasTematicas';

const HERO_IMAGE = 'https://res.cloudinary.com/dw4k14vmn/image/upload/v1785234604/file_000000004ae0820e906b8ffaf57779d9_kvjwew.png';

const ALL_POLITICAL_RECORDS = [
  ...POLITICAL_TRANSPARENCY,
  ...EXECUTIVE_AUTHORITIES_2026.filter(
    executive => !POLITICAL_TRANSPARENCY.some(base => base.name === executive.name)
  )
];

const CITIZEN_ENTRY_QUESTIONS = [
  {
    question: '¿De dónde salió el dinero?',
    description: 'Recaudación tributaria, impuestos nacionales, provinciales y tasas municipales, aportes y financiamiento.',
    targetTab: 'tributos',
    dimension: 'A. Origen del Dinero'
  },
  {
    question: '¿A dónde fue?',
    description: 'Coparticipación, presupuestos aprobados vs. devengados, contrataciones y transferencias desde 1946.',
    targetTab: 'gasto',
    dimension: 'B. Distribución y Gasto'
  },
  {
    question: '¿Quién decidió?',
    description: 'Autores de proyectos, votaciones nominales en el Congreso, promulgaciones, firmas y cargos históricos.',
    targetTab: 'responsabilidad-politica',
    dimension: 'D. Responsables Públicos'
  },
  {
    question: '¿Qué resultados hubo?',
    description: 'Auditorías sectoriales de jubilaciones, universidades públicas, CONICET, subsidios e indicadores físicos.',
    targetTab: 'auditorias',
    dimension: 'C. Resultados Documentados'
  },
  {
    question: '¿Qué dijo esa persona antes y después?',
    description: 'Comparador contextual de declaraciones históricas frente a votaciones y leyes sancionadas.',
    targetTab: 'declaraciones',
    dimension: 'E. Declaraciones y Contexto'
  },
  {
    question: '¿Cómo puedo solicitar una explicación?',
    description: 'Generador individual de solicitudes de información pública (Ley 27.275) y curaduría documental.',
    targetTab: 'contribucion',
    dimension: 'E. Rendición de Cuentas'
  }
];

interface LandingProps {
  onNavigate: (tab: string, param?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Landing({ onNavigate, searchQuery, setSearchQuery }: LandingProps) {
  const handleFeaturedSearch = (term: string) => {
    setSearchQuery(term);
    onNavigate('tributos');
  };

  const query = searchQuery.toLowerCase().trim();

  const matchingJurisdictions = query.length >= 2
    ? JURISDICTIONS.filter(j =>
        j.name.toLowerCase().includes(query) ||
        (j.summary && j.summary.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const matchingTributos = query.length >= 2
    ? TRIBUTOS.filter(t =>
        t.name.toLowerCase().includes(query) ||
        (t.normaCreacion && t.normaCreacion.toLowerCase().includes(query)) ||
        (t.authorityCobradora && t.authorityCobradora.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const matchingPoliticians = query.length >= 2
    ? ALL_POLITICAL_RECORDS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.party.toLowerCase().includes(query) ||
        p.jurisdiction.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchingDossiers = query.length >= 2
    ? HISTORICAL_DOSSIERS.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.code.toLowerCase().includes(query) ||
        d.summaryNeutral.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchingStatements = query.length >= 2
    ? PUBLIC_STATEMENTS_ARCHIVE.filter(s =>
        s.officialName.toLowerCase().includes(query) ||
        s.topicLabel.toLowerCase().includes(query) ||
        s.exactQuote.toLowerCase().includes(query)
      ).slice(0, 2)
    : [];

  const matchingAudits = query.length >= 2
    ? THEMATIC_AUDITS.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.sector.toLowerCase().includes(query)
      ).slice(0, 2)
    : [];

  const hasMatches =
    matchingJurisdictions.length > 0 ||
    matchingTributos.length > 0 ||
    matchingPoliticians.length > 0 ||
    matchingDossiers.length > 0 ||
    matchingStatements.length > 0 ||
    matchingAudits.length > 0;

  return (
    <div className="space-y-16 py-6 sm:py-8" id="landing-view">
      <section className="relative max-w-6xl mx-auto px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">
          <img
            src={HERO_IMAGE}
            alt="Con La Tuya Contribuyente — auditoría cívica, fiscal y de transparencia del Estado argentino"
            className="block w-full h-auto max-h-[640px] object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-8 sm:mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-xs font-mono mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>OBSERVATORIO HISTÓRICO CÍVICO Y FISCAL INDEPENDIENTE (1946–ACTUALIDAD)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Seguí la ruta de cada <span className="text-emerald-400">peso público</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Una plataforma independiente para reconstruir de dónde proviene el dinero público en Argentina, cómo se redistribuye entre Nación, provincias y municipios, en qué se gasta efectivamente, quiénes propusieron, votaron o ejecutaron cada medida, qué resultados verificables produjo y qué dijeron históricamente sus responsables.
          </p>

          <div className="max-w-2xl mx-auto relative mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-900">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                  aria-label="Buscar provincia, municipio, tributo, expediente histórico, declaración o autoridad"
                  type="text"
                  placeholder="Buscar tributo, expediente (YPF, SIPA, CONICET), provincia o funcionario..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full font-sans"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onNavigate('tributos');
                  }}
                />
              </div>
              <button
                onClick={() => onNavigate('tributos')}
                className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide rounded-xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Buscar todo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {query.length >= 2 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-left font-sans text-xs max-h-[420px] overflow-y-auto space-y-4">
                {!hasMatches ? (
                  <div className="text-slate-500 text-center py-4 font-mono text-[11px]">
                    No se encontraron coincidencias directas para “{searchQuery}”. Presioná Buscar todo para ver el registro completo.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block font-bold border-b border-slate-800 pb-1">
                      Resultados en el Buscador Histórico Unificado
                    </span>

                    {matchingDossiers.length > 0 && (
                      <SearchGroup title="Expedientes Históricos (1946–2026)" tone="emerald">
                        {matchingDossiers.map(d => (
                          <ResultButton
                            key={d.id}
                            title={d.title}
                            subtitle={`${d.code} · ${d.periodCovered}`}
                            action="Abrir expediente"
                            tone="emerald"
                            onClick={() => onNavigate('observatorio', d.id)}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingJurisdictions.length > 0 && (
                      <SearchGroup title="Jurisdicciones" tone="emerald">
                        {matchingJurisdictions.map(j => (
                          <ResultButton
                            key={j.id}
                            title={j.name}
                            subtitle={j.summary || 'Ver ficha territorial.'}
                            action="Ir al mapa"
                            tone="emerald"
                            onClick={() => onNavigate('mapa', j.id)}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingTributos.length > 0 && (
                      <SearchGroup title="Leyes e impuestos" tone="blue">
                        {matchingTributos.map(t => (
                          <ResultButton
                            key={t.id}
                            title={t.name}
                            subtitle={`${t.normaCreacion || 'Norma local'} · ${t.authorityCobradora}`}
                            action="Ver historial"
                            tone="blue"
                            onClick={() => {
                              setSearchQuery(t.name);
                              onNavigate('tributos');
                            }}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingPoliticians.length > 0 && (
                      <SearchGroup title="Autoridades e historial fiscal" tone="purple">
                        {matchingPoliticians.map(p => (
                          <ResultButton
                            key={p.id}
                            title={p.name}
                            subtitle={`${p.role} · ${p.party}`}
                            action="Ver legajo"
                            tone="purple"
                            onClick={() => onNavigate('politicos', p.id)}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingStatements.length > 0 && (
                      <SearchGroup title="Declaraciones y Comparador" tone="blue">
                        {matchingStatements.map(s => (
                          <ResultButton
                            key={s.id}
                            title={`${s.officialName} (${s.date})`}
                            subtitle={s.topicLabel}
                            action="Comparar"
                            tone="blue"
                            onClick={() => onNavigate('declaraciones')}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingAudits.length > 0 && (
                      <SearchGroup title="Auditorías Temáticas" tone="purple">
                        {matchingAudits.map(a => (
                          <ResultButton
                            key={a.id}
                            title={a.title}
                            subtitle={a.sector}
                            action="Ver auditoría"
                            tone="purple"
                            onClick={() => onNavigate('auditorias', a.slug)}
                          />
                        ))}
                      </SearchGroup>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Sugeridos:</span>
            {['IVA', 'Ganancias', 'SIPA', 'YPF', 'CONICET', 'La Matanza'].map(term => (
              <button
                key={term}
                onClick={() => handleFeaturedSearch(term)}
                className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-300 rounded-md cursor-pointer transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => onNavigate('observatorio')}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 text-slate-950 font-extrabold text-sm tracking-wide rounded-xl hover:bg-emerald-400 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <History className="w-4 h-4" />
              <span>Observatorio 1946–2026</span>
            </button>
            <button
              onClick={() => onNavigate('declaraciones')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white font-bold text-sm tracking-wide rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
              <span>Comparador de Declaraciones</span>
            </button>
            <button
              onClick={() => onNavigate('auditorias')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white font-bold text-sm tracking-wide rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <Microscope className="w-4 h-4 text-emerald-400" />
              <span>Auditorías Sectoriales</span>
            </button>
            <button
              onClick={() => onNavigate('mapa')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white font-bold text-sm tracking-wide rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all"
            >
              Explorar Mapa Nacional
            </button>
          </div>
        </div>
      </section>

      {/* Las 6 Preguntas Ciudadanas de Entrada (Estructura Central de 5 Dimensiones) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" aria-labelledby="preguntas-ciudadanas-heading">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Navegación Guiada por Preguntas Ciudadanas</span>
          </div>
          <h2 id="preguntas-ciudadanas-heading" className="text-2xl font-extrabold text-white tracking-tight">
            ¿Por qué pregunta querés empezar tu auditoría?
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Conectamos las cinco dimensiones del Estado argentino (Origen, Distribución, Resultados, Responsables y Declaraciones) mediante leyes, expedientes, fechas y fuentes oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIZEN_ENTRY_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(item.targetTab)}
              className="p-5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl text-left transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {item.dimension}
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition">
                  {item.question}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Abrir sección</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-amber-950/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left">
            <h2 className="text-sm font-semibold text-amber-400 tracking-wide">AVISO DE SEGURIDAD LEGAL Y NEUTRALIDAD</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              La plataforma reorganiza información pública oficial y estimaciones metodológicas con fines educativos y de auditoría.
              Las responsabilidades políticas, judiciales y fiscales se muestran únicamente cuando existe evidencia trazable y se distingue
              entre propuesta, voto, promulgación, denuncia, procesamiento, sentencia, absolución y sobreseimiento. Cuando una jurisdicción no publica un dato, sólo se marca como tal si la ausencia fue verificada; si la plataforma todavía no pudo comprobarlo, figura como pendiente de verificación.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Todo lo que podés auditar en un solo lugar</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            La web cruza impuestos, territorio, precios, inflación, responsabilidad política, gasto público y transparencia documental para que puedas pasar de un dato general a su fuente y, cuando exista, al expediente, compra o decisión concreta.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={<Coins className="w-5 h-5" />} tone="emerald" title="Impuestos y mapa tributario">
            Consultá tributos nacionales, provinciales y municipales, quién los cobra, su norma de origen, cambios históricos y distribución territorial.
          </FeatureCard>
          <FeatureCard icon={<Calculator className="w-5 h-5" />} tone="purple" title="Presión fiscal y precio final">
            Estimá cuánto de tus ingresos y del precio de un producto corresponde a impuestos, diferenciando Nación, provincia y municipio y evitando atribuir porcentajes no verificados.
          </FeatureCard>
          <FeatureCard icon={<Scale className="w-5 h-5" />} tone="blue" title="Inflación y responsabilidad política">
            Revisá la evolución de la inflación desde 1983 y el contexto político, institucional y fiscal asociado a decisiones documentadas.
          </FeatureCard>
          <FeatureCard icon={<ShieldCheck className="w-5 h-5" />} tone="emerald" title="Gasto público y compras del Estado">
            Seguí presupuesto, ejecución y gasto por rubro —incluida pauta oficial— y bajá hasta compras, proveedores, expedientes y comparaciones de precios cuando sean realmente homogéneas.
          </FeatureCard>
          <FeatureCard icon={<Search className="w-5 h-5" />} tone="blue" title="Transparencia de cada jurisdicción">
            Compará qué publica Nación, cada provincia y cada gobierno local: presupuesto, ejecución, compras, proveedores, personal, pauta, deuda, obra pública y datos abiertos.
          </FeatureCard>
          <FeatureCard icon={<BookOpen className="w-5 h-5" />} tone="purple" title="Registro político, partidos y evidencia">
            Explorá autoridades, partidos, participación en decisiones fiscales, información patrimonial o judicial verificable y la fuente documental que respalda cada afirmación.
          </FeatureCard>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 space-y-6" aria-labelledby="preguntas-frecuentes">
        <h2 id="preguntas-frecuentes" className="text-2xl font-bold text-white">Preguntas sobre impuestos y gasto público</h2>
        <div className="space-y-5 text-sm text-slate-300 leading-relaxed">
          <div>
            <h3 className="font-semibold text-white mb-2">¿Qué es Con La Tuya Contribuyente?</h3>
            <p>Es una plataforma independiente de auditoría cívica y fiscal sobre Argentina. Reúne información sobre impuestos, precios, inflación, gasto público y decisiones políticas para facilitar su consulta y contrastación con fuentes. No es un sitio oficial del Estado.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">¿Cómo interpretar las cifras y sus fuentes?</h3>
            <p>Revisá la fuente, el período, la jurisdicción y la unidad de cada dato. Las estimaciones de las calculadoras dependen de sus supuestos y no equivalen a una liquidación tributaria individual. Un presupuesto aprobado tampoco equivale a gasto ejecutado.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">¿Un dato pendiente significa que el gobierno no lo publica?</h3>
            <p>No. Pendiente de verificación significa que la plataforma todavía no lo comprobó. Es distinto de información publicada parcialmente o de una ausencia de publicación verificada. No debe interpretarse una falta de datos como prueba de una irregularidad.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/40 border-y border-slate-900 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8 text-left">
          <h2 className="text-xl font-bold text-white tracking-tight border-l-2 border-emerald-500 pl-3">
            Trazabilidad de la información y niveles de evidencia
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Cada afirmación debe poder volver a su fuente. Si un dato no está verificado, la plataforma lo indica explícitamente en lugar de completarlo por inferencia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EvidenceCard level="A" title="Oficial primaria" note="Leyes, decretos, boletines oficiales, actas de votación, resoluciones y documentos emitidos por el organismo competente." />
            <EvidenceCard level="B" title="Oficial secundaria" note="Portales de transparencia, datasets gubernamentales y documentación institucional derivada de fuentes primarias." />
            <EvidenceCard level="C" title="Técnica confiable" note="Estudios académicos, instituciones fiscales especializadas y reconstrucciones metodológicas con fuente identificada." />
            <EvidenceCard level="D" title="Pendiente de verificación" note="Dato incompleto o todavía no contrastado. No debe interpretarse como hecho probado." />
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchGroup({ title, tone, children }: { title: string; tone: 'emerald' | 'blue' | 'purple'; children: React.ReactNode }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400' : tone === 'blue' ? 'text-blue-400' : 'text-purple-400';
  return (
    <div className="space-y-2">
      <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${toneClass}`}>{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ResultButton({ title, subtitle, action, tone, onClick }: { key?: React.Key; title: string; subtitle: string; action: string; tone: 'emerald' | 'blue' | 'purple'; onClick: () => void }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400 border-emerald-500/25' : tone === 'blue' ? 'text-blue-400 border-blue-500/25' : 'text-purple-400 border-purple-500/25';
  return (
    <button onClick={onClick} className="w-full p-2.5 bg-slate-950/60 hover:bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center transition text-left cursor-pointer group">
      <div className="truncate pr-4">
        <span className="font-bold text-slate-200 block text-xs">{title}</span>
        <span className="text-[10px] text-slate-400 truncate block">{subtitle}</span>
      </div>
      <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded uppercase shrink-0 ${toneClass}`}>{action}</span>
    </button>
  );
}

function FeatureCard({ icon, tone, title, children }: { icon: React.ReactNode; tone: 'emerald' | 'blue' | 'purple'; title: string; children: React.ReactNode }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10' : tone === 'blue' ? 'text-blue-400 bg-blue-500/10 border-blue-500/10' : 'text-purple-400 bg-purple-500/10 border-purple-500/10';
  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left hover:border-slate-700 transition">
      <div className={`p-2.5 border rounded-xl inline-block mb-4 ${toneClass}`}>{icon}</div>
      <h3 className="text-base font-bold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-300 leading-relaxed">{children}</p>
    </div>
  );
}

function EvidenceCard({ level, title, note }: { level: 'A' | 'B' | 'C' | 'D'; title: string; note: string }) {
  const classes = {
    A: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    B: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    C: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    D: 'text-purple-400 border-purple-500/20 bg-purple-500/5'
  }[level];
  return (
    <div className={`p-4 rounded-xl border ${classes}`}>
      <div className="font-mono text-xs font-extrabold uppercase tracking-wider">Nivel {level} — {title}</div>
      <p className="text-xs text-slate-300 leading-relaxed mt-2">{note}</p>
    </div>
  );
}
