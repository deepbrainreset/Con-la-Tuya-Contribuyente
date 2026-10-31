/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Tv,
  Youtube,
  Scale,
  ExternalLink,
  Search,
  FileCheck2,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import {
  CONGRUENCE_BLOG_ENTRIES,
  CONGRUENCE_PATTERN_LABELS,
  CongruencePatternType
} from '../data/blogCongruencia';

interface BlogCongruenciaProps {
  onNavigate?: (tab: string, param?: string) => void;
  initialPoliticianId?: string;
  embedded?: boolean;
}

export default function BlogCongruencia({
  onNavigate,
  initialPoliticianId,
  embedded = false
}: BlogCongruenciaProps) {
  const [selectedPolitician, setSelectedPolitician] = useState<string>(
    initialPoliticianId || 'all'
  );
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  React.useEffect(() => {
    if (initialPoliticianId) {
      setSelectedPolitician(initialPoliticianId);
    }
  }, [initialPoliticianId]);

  const politiciansSummary = useMemo(() => {
    const map = new Map<
      string,
      {
        politicianId: string;
        name: string;
        role: string;
        party: string;
        entriesCount: number;
        clipsCount: number;
        counterActionsCount: number;
      }
    >();

    for (const entry of CONGRUENCE_BLOG_ENTRIES) {
      const existing = map.get(entry.politicianId);
      if (existing) {
        existing.entriesCount += 1;
        existing.clipsCount += entry.tvYoutubeClips.length;
        existing.counterActionsCount += entry.counterActions.length;
      } else {
        map.set(entry.politicianId, {
          politicianId: entry.politicianId,
          name: entry.politicianName,
          role: entry.currentRole,
          party: entry.currentParty,
          entriesCount: 1,
          clipsCount: entry.tvYoutubeClips.length,
          counterActionsCount: entry.counterActions.length
        });
      }
    }
    return Array.from(map.values());
  }, []);

  const channels = useMemo(() => {
    const set = new Set<string>();
    for (const entry of CONGRUENCE_BLOG_ENTRIES) {
      for (const clip of entry.tvYoutubeClips) {
        set.add(clip.channel);
      }
    }
    return ['all', ...Array.from(set)];
  }, []);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CONGRUENCE_BLOG_ENTRIES.filter(entry => {
      if (selectedPolitician !== 'all' && entry.politicianId !== selectedPolitician) return false;
      if (selectedPattern !== 'all' && entry.congruencePattern !== selectedPattern) return false;
      if (
        selectedChannel !== 'all' &&
        !entry.tvYoutubeClips.some(clip => clip.channel === selectedChannel)
      ) {
        return false;
      }
      if (!q) return true;
      return (
        entry.politicianName.toLowerCase().includes(q) ||
        entry.currentParty.toLowerCase().includes(q) ||
        entry.title.toLowerCase().includes(q) ||
        entry.crossCriticismAnalysis.toLowerCase().includes(q) ||
        entry.tvYoutubeClips.some(
          c =>
            c.exactQuoteOrPosition.toLowerCase().includes(q) ||
            c.channel.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedPolitician, selectedPattern, selectedChannel, search]);

  return (
    <div className="space-y-8 py-4 text-left" id="blog-congruencia-view">
      {!embedded && (
        <header className="border-b border-slate-800 pb-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
            <Tv className="w-4 h-4" />
            <span>Escrutinio Diario Multipardidario · Archivos de TV / YouTube vs. Hechos Oficiales</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Blog de Congruencia: Archivo Audiovisual vs. Votos, Firmas y Crítica Cruzada
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Revisión diaria del archivo televisivo y de YouTube (<strong className="text-white">TN, LN+, C5N, Crónica TV, A24, Diputados TV y Senado TV</strong>) sobre los políticos actualmente en funciones de todos los partidos. Cada entrada contrasta lo que dijeron o criticaron en televisión contra lo que efectivamente votaron, firmaron o ejecutaron en el Estado.
          </p>
        </header>
      )}

      {/* Resumen por Político en Funciones */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Funcionarios en Ejercicio bajo Escrutinio Audiovisual (Todos los Partidos)</span>
          </h2>
          {selectedPolitician !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedPolitician('all')}
              className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
            >
              Mostrar todos los funcionarios →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {politiciansSummary.map(p => {
            const active = selectedPolitician === p.politicianId;
            return (
              <button
                key={p.politicianId}
                type="button"
                onClick={() => {
                  const next = active ? 'all' : p.politicianId;
                  setSelectedPolitician(next);
                  if (next !== 'all' && typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setTimeout(() => {
                      document.getElementById('blog-congruencia-entries')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 60);
                  }
                }}
                className={`text-left p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2 ${
                  active
                    ? 'bg-emerald-500/15 border-emerald-500/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <strong className="text-xs font-bold text-white block">{p.name}</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{p.role}</span>
                  <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">{p.party}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>{p.clipsCount} clip{p.clipsCount === 1 ? '' : 's'} TV/YT</span>
                  <span>{p.counterActionsCount} acto{p.counterActionsCount === 1 ? '' : 's'} contrapuesto{p.counterActionsCount === 1 ? '' : 's'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filtros del Blog */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Canal / Archivo Audiovisual
            </label>
            <select
              value={selectedChannel}
              onChange={e => setSelectedChannel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {channels.map(ch => (
                <option key={ch} value={ch}>
                  {ch === 'all' ? 'Todos los canales (TN, LN+, C5N, Diputados TV, Senado TV...)' : ch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Tipo de Incongruencia / Patrón Detectado
            </label>
            <select
              value={selectedPattern}
              onChange={e => setSelectedPattern(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Todos los patrones documentados</option>
              {(Object.keys(CONGRUENCE_PATTERN_LABELS) as CongruencePatternType[]).map(key => (
                <option key={key} value={key}>
                  {CONGRUENCE_PATTERN_LABELS[key].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Buscador de Palabras Clave
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ej. Ganancias, YPF, PAIS, jubilaciones, TN, C5N..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Entradas tipo Blog */}
      <section className="space-y-6 scroll-mt-28" id="blog-congruencia-entries">
        {filteredEntries.map(entry => {
          const patternInfo = CONGRUENCE_PATTERN_LABELS[entry.congruencePattern];
          return (
            <article
              key={entry.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg"
            >
              {/* Encabezado de la entrada del blog */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full border font-bold ${patternInfo.badgeClass}`}>
                      {patternInfo.label}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      {entry.topic}
                    </span>
                    <span className="text-slate-400">Publicado/Verificado: {entry.lastVerified}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    {entry.title}
                  </h3>
                  <div className="text-xs text-slate-300">
                    <strong className="text-emerald-400">{entry.politicianName}</strong> · {entry.currentRole} ({entry.currentParty})
                  </div>
                </div>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('politicos', entry.politicianId)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono text-emerald-300 inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Ver ficha patrimonial y votos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Comparación Lado a Lado: Archivo de TV/YouTube vs. Acto Oficial / Voto */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Columna 1: Archivo de TV / YouTube */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-300 font-bold">
                    <Youtube className="w-4 h-4 text-rose-400" />
                    <span>1. Qué dijo o criticó en TV / YouTube</span>
                  </div>

                  <div className="space-y-3">
                    {entry.tvYoutubeClips.map(clip => (
                      <div
                        key={clip.id}
                        className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <span className="text-rose-300 font-bold">{clip.channel}</span>
                          <span className="text-slate-400">Emisión: {clip.broadcastDate}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Programa/Contexto: <strong className="text-slate-200">{clip.programOrContext}</strong> ({clip.roleAtTime})
                        </div>
                        <blockquote className="text-xs text-white border-l-2 border-rose-500/60 pl-3 py-0.5 leading-relaxed">
                          {clip.exactQuoteOrPosition}
                        </blockquote>
                        <a
                          href={clip.youtubeArchiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:underline pt-1"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          <span>Abrir archivo / clip en YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Columna 2: Qué votó, firmó o ejecutó efectivamente */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-300 font-bold">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    <span>2. Qué votó, firmó o ejecutó en el Estado</span>
                  </div>

                  <div className="space-y-3">
                    {entry.counterActions.map((act, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <span className="text-emerald-300 font-bold">{act.instrument}</span>
                          <span className="text-slate-400">Fecha: {act.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Cargo al decidir: <strong className="text-slate-200">{act.roleAtAction}</strong>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">{act.whatTheyActuallyDid}</p>
                        <a
                          href={act.officialDocumentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:underline pt-1"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>Verificar norma / acta oficial</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Análisis de Crítica Cruzada y Descargo / Contexto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-amber-950/15 border border-amber-500/25 rounded-xl p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                    <GitCompare className="w-3.5 h-3.5" />
                    Análisis de Congruencia y Crítica a Terceros
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{entry.crossCriticismAnalysis}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-sky-300 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Contexto Institucional y Argumento del Funcionario
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {entry.institutionalContextAndDefense}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
