/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  MessageSquareQuote,
  Scale,
  ExternalLink,
  Search,
  ShieldCheck,
  Calendar,
  FileText,
  ArrowLeftRight,
  Info
} from 'lucide-react';
import { PUBLIC_STATEMENTS_ARCHIVE, STATEMENT_COMPARISONS } from '../data/declaracionesHistoricas';

export default function DeclaracionesComparador() {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeComparisonId, setActiveComparisonId] = useState<string>(STATEMENT_COMPARISONS[0].id);

  const filteredComparisons = useMemo(() => {
    return STATEMENT_COMPARISONS.filter(comp => {
      if (selectedTopic !== 'all' && comp.topic !== selectedTopic) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        comp.title.toLowerCase().includes(q) ||
        comp.officialName.toLowerCase().includes(q) ||
        comp.statementA.exactQuote.toLowerCase().includes(q) ||
        (comp.statementB?.exactQuote.toLowerCase().includes(q) ?? false)
      );
    });
  }, [selectedTopic, searchQuery]);

  const activeComparison = useMemo(() => {
    return (
      filteredComparisons.find(c => c.id === activeComparisonId) ||
      filteredComparisons[0] ||
      STATEMENT_COMPARISONS[0]
    );
  }, [filteredComparisons, activeComparisonId]);

  const filteredStatements = useMemo(() => {
    return PUBLIC_STATEMENTS_ARCHIVE.filter(stmt => {
      if (selectedTopic !== 'all' && stmt.topic !== selectedTopic) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        stmt.officialName.toLowerCase().includes(q) ||
        stmt.topicLabel.toLowerCase().includes(q) ||
        stmt.exactQuote.toLowerCase().includes(q) ||
        stmt.contextNote.toLowerCase().includes(q)
      );
    });
  }, [selectedTopic, searchQuery]);

  return (
    <div className="space-y-10 py-4 text-left" id="declaraciones-comparador-view">
      {/* Encabezado */}
      <header className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <MessageSquareQuote className="w-4 h-4" />
          <span>Dimensión E — Declaraciones Públicas y Rendición de Cuentas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Archivo Documental y Comparador Contextual de Posiciones
        </h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          Contraste documental entre declaraciones públicas históricas, proyectos remitidos y votaciones o leyes sancionadas sobre un mismo asunto. Cada registro conserva fecha, cargo institucional en ese momento, contexto completo, fuente original y explicaciones públicas documentadas.
        </p>
      </header>

      {/* Garantías Editoriales */}
      <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
            Protocolo Editorial de Comparación Contextual
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            La plataforma no fabrica transcripciones, no utiliza recortes fuera de contexto ni emite calificaciones generales sobre la integridad o coherencia moral de personas o partidos. El objetivo es presentar los documentos primarios (versiones taquigráficas, mensajes de elevación de leyes y actas de votación) junto con el cambio de contexto institucional declarado por sus protagonistas.
          </p>
        </div>
      </section>

      {/* Filtros Globales */}
      <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/30 border border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Todos los temas' },
            { id: 'presion_tributaria', label: 'Impuestos y Presión Fiscal' },
            { id: 'sistema_previsional', label: 'Sistema Previsional (AFJP / SIPA)' },
            { id: 'empresas_publicas', label: 'Empresas Públicas (YPF)' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTopic(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedTopic === tab.id
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar funcionario, ley o tema..."
            aria-label="Buscar en declaraciones históricas"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/40"
          />
        </div>
      </section>

      {/* Comparador Contextual Lado a Lado */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            1. Comparador Contextual Histórico (Declaración vs. Declaración / Acto Oficial)
          </h2>
        </div>

        {/* Selector de Dossier de Comparación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredComparisons.map(comp => {
            const isSelected = comp.id === activeComparison.id;
            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => setActiveComparisonId(comp.id)}
                className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400 uppercase">{comp.partyOrCoalitionHistory}</div>
                <div className="font-bold text-sm mt-1">{comp.title}</div>
                <div className="text-xs text-slate-400 mt-1">{comp.officialName}</div>
              </button>
            );
          })}
        </div>

        {/* Vista Lado a Lado del Dossier Seleccionado */}
        {activeComparison && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <div className="text-xs font-mono text-emerald-400">{activeComparison.partyOrCoalitionHistory}</div>
              <h3 className="text-xl font-extrabold text-white">{activeComparison.title}</h3>
              <p className="text-xs text-slate-400">Sujeto / Actor institucional: {activeComparison.officialName}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Posición / Documento A */}
              <article className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/25">
                      Posición Documentada A · {activeComparison.statementA.date}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {activeComparison.statementA.timestampOrPageRef}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{activeComparison.statementA.officialName}</h4>
                    <p className="text-xs text-slate-400">{activeComparison.statementA.roleAtStatement}</p>
                  </div>

                  <blockquote className="border-l-2 border-emerald-500/60 pl-3.5 py-1 text-sm italic text-slate-100 bg-slate-900/50 rounded-r-lg">
                    “{activeComparison.statementA.exactQuote}”
                  </blockquote>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Contexto:</strong> {activeComparison.statementA.contextNote}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{activeComparison.statementA.sourceName}</span>
                  <a
                    href={activeComparison.statementA.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>Fuente original</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>

              {/* Posición / Documento B o Acto Público Posterior */}
              {activeComparison.statementB ? (
                <article className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
                        Posición Documentada B · {activeComparison.statementB.date}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {activeComparison.statementB.timestampOrPageRef}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{activeComparison.statementB.officialName}</h4>
                      <p className="text-xs text-slate-400">{activeComparison.statementB.roleAtStatement}</p>
                    </div>

                    <blockquote className="border-l-2 border-amber-500/60 pl-3.5 py-1 text-sm italic text-slate-100 bg-slate-900/50 rounded-r-lg">
                      “{activeComparison.statementB.exactQuote}”
                    </blockquote>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-200">Contexto:</strong> {activeComparison.statementB.contextNote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">{activeComparison.statementB.sourceName}</span>
                    <a
                      href={activeComparison.statementB.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      <span>Fuente original</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              ) : (
                activeComparison.relatedPublicAct && (
                  <article className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
                        Actuación Normativa Posterior · {activeComparison.relatedPublicAct.date}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {activeComparison.relatedPublicAct.normNumber}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeComparison.relatedPublicAct.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-900 flex justify-end text-xs">
                      <a
                        href={activeComparison.relatedPublicAct.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
                      >
                        <span>Ver norma oficial</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                )
              )}
            </div>

            {/* Contexto Institucional y Explicaciones Públicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Comparación de Contexto Institucional</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeComparison.institutionalContextComparison}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Info className="w-4 h-4 text-sky-400" />
                  <span>Explicaciones Públicas Documentadas</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeComparison.documentedPublicExplanations}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Archivo Completo de Declaraciones */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            2. Registro Cronológico de Declaraciones y Fundamentos Normativos ({filteredStatements.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStatements.map(stmt => (
            <article key={stmt.id} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{stmt.date}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{stmt.topicLabel}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{stmt.officialName}</h3>
                <p className="text-xs text-slate-400">
                  {stmt.roleAtStatement} · {stmt.partyOrCoalitionAtStatement}
                </p>
              </div>

              <blockquote className="text-xs italic text-slate-200 border-l-2 border-emerald-500/40 pl-3 py-1 bg-slate-950/60 rounded-r-lg">
                “{stmt.exactQuote}”
              </blockquote>

              <p className="text-xs text-slate-400 leading-relaxed">{stmt.contextNote}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{stmt.sourceName}</span>
                <a
                  href={stmt.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>Abrir documento</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
