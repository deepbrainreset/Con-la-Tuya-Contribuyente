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
  UserCheck,
  Repeat,
  MessageSquare,
  Copy,
  Check,
  Send,
  Newspaper
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialPoliticianId) {
      setSelectedPolitician(initialPoliticianId);
    }
  }, [initialPoliticianId]);

  const handleCopyInquiry = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const politiciansSummary = useMemo(() => {
    const map = new Map<
      string,
      {
        politicianId: string;
        name: string;
        role: string;
        party: string;
        xHandle?: string;
        entriesCount: number;
        totalContradictionsCount: number;
        clipsAndPostsCount: number;
        counterActionsCount: number;
      }
    >();

    for (const entry of CONGRUENCE_BLOG_ENTRIES) {
      const existing = map.get(entry.politicianId);
      const mediaItems =
        entry.tvYoutubeClips.length + entry.xTwitterAndPressArchives.length;
      if (existing) {
        existing.entriesCount += 1;
        existing.totalContradictionsCount += entry.contradictionsCount;
        existing.clipsAndPostsCount += mediaItems;
        existing.counterActionsCount += entry.counterActions.length;
      } else {
        map.set(entry.politicianId, {
          politicianId: entry.politicianId,
          name: entry.politicianName,
          role: entry.currentRole,
          party: entry.currentParty,
          xHandle: entry.verifiedSocialHandles.xHandle,
          entriesCount: 1,
          totalContradictionsCount: entry.contradictionsCount,
          clipsAndPostsCount: mediaItems,
          counterActionsCount: entry.counterActions.length
        });
      }
    }
    return Array.from(map.values());
  }, []);

  const totalPlatformContradictions = useMemo(
    () =>
      CONGRUENCE_BLOG_ENTRIES.reduce(
        (sum, entry) => sum + entry.contradictionsCount,
        0
      ),
    []
  );

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
        ) ||
        entry.xTwitterAndPressArchives.some(
          x =>
            x.exactPostOrQuote.toLowerCase().includes(q) ||
            x.sourceOrHandle.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedPolitician, selectedPattern, selectedChannel, search]);

  return (
    <div className="space-y-8 py-4 text-left" id="blog-congruencia-view">
      {!embedded && (
        <header className="border-b border-slate-800 pb-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
            <Tv className="w-4 h-4" />
            <span>
              Escrutinio Diario Multipardidario (2003–2026) · Archivos de X/Twitter, Diarios, TV y YouTube vs. Hechos Oficiales
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Blog de Congruencia: Archivo de X/Twitter, Prensa y TV vs. Votos, Firmas y Contador de Contradicciones
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Revisión histórica y diaria desde <strong className="text-white">2003 hasta la actualidad</strong> sobre publicaciones en <strong className="text-white">X (Twitter), diarios nacionales (La Nación, Clarín, Página/12, Infobae) y archivos de TV/YouTube (TN, LN+, C5N, Crónica TV, Diputados TV y Senado TV)</strong> de los políticos en funciones de todos los partidos. Contabilizamos cuántas veces invirtieron su postura dentro de un mismo planteo e incluimos un generador de interpelación ciudadana con fuente oficial verificada para sus redes públicas.
          </p>
        </header>
      )}

      {/* Resumen por Político en Funciones + Contador de Contradicciones */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Funcionarios bajo Escrutinio Histórico 2003–2026 (Todos los Partidos)</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono font-bold text-rose-300">
              {totalPlatformContradictions} contradicciones / giros contabilizados
            </span>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
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
                      document
                        .getElementById('blog-congruencia-entries')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 60);
                  }
                }}
                className={`text-left p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2.5 ${
                  active
                    ? 'bg-emerald-500/15 border-emerald-500/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-xs font-bold text-white">{p.name}</strong>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono font-bold text-rose-300 shrink-0">
                      <Repeat className="w-3 h-3 inline mr-1" />
                      {p.totalContradictionsCount} giros
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{p.role}</span>
                  <div className="flex items-center justify-between text-[10px] font-mono pt-0.5">
                    <span className="text-emerald-400">{p.party}</span>
                    {p.xHandle && <span className="text-sky-400">{p.xHandle}</span>}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>{p.clipsAndPostsCount} archivos X/Prensa/TV</span>
                  <span>{p.counterActionsCount} acto{p.counterActionsCount === 1 ? '' : 's'} oficial{p.counterActionsCount === 1 ? '' : 'es'}</span>
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
                  {ch === 'all'
                    ? 'Todos los medios (X/Twitter, Diarios, TN, LN+, C5N, HCDN/HSN...)'
                    : ch}
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
              Buscador de Palabras Clave (2003–2026)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ej. @JMilei, @Kicillofok, 125, Ganancias, YPF, 82% móvil..."
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
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-lg"
            >
              {/* Cabecera de la Entrada */}
              <div className="border-b border-slate-800 pb-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                      {entry.topic} · Período auditado: {entry.historicalSpanCovered}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full border font-bold ${patternInfo.badgeClass}`}
                    >
                      {patternInfo.label}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-extrabold">
                      <Repeat className="w-3 h-3 inline mr-1" />
                      {entry.contradictionsCount} contradicciones / giros contabilizados
                    </span>
                  </div>
                  <span className="text-slate-400">Verificado: {entry.lastVerified}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {entry.title}
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">{entry.politicianName}</strong> ·{' '}
                    <span>{entry.currentRole}</span> ·{' '}
                    <span className="text-emerald-400 font-mono">{entry.currentParty}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {entry.verifiedSocialHandles.xUrl && (
                      <a
                        href={entry.verifiedSocialHandles.xUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-sky-400 hover:underline inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <span>Cuenta oficial {entry.verifiedSocialHandles.xHandle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {onNavigate && (
                      <button
                        type="button"
                        onClick={() => onNavigate('politicos', entry.politicianId)}
                        className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Abrir legajo completo del funcionario</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 1. Cadena Cronológica de Contradicciones / Vueltas de Campana (2003–2026) */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    <Repeat className="w-4 h-4 text-rose-400" />
                    <span>
                      1. Secuencia Cronológica de Giros y Contradicciones ({entry.historicalSpanCovered})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Total verificado en este eje: {entry.contradictionsCount} giros sobre la postura inicial
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {entry.positionShiftsChain.map(step => {
                    const isInitial = step.stepNumber === 1;
                    return (
                      <div
                        key={step.stepNumber}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                          isInitial
                            ? 'bg-slate-900 border-slate-700'
                            : 'bg-rose-950/15 border-rose-500/30'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                            <span
                              className={`px-2 py-0.5 rounded font-bold ${
                                isInitial
                                  ? 'bg-sky-500/15 text-sky-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {step.stageLabel}
                            </span>
                            <span className="text-slate-400">{step.yearOrDate}</span>
                          </div>
                          <div className="text-[10px] font-mono text-emerald-400">
                            Medio / Acto: {step.medium}
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {step.summaryOfStanceOrAct}
                          </p>
                        </div>
                        <a
                          href={step.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
                        >
                          <span>Verificar fuente documental</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Archivo de X / Twitter, Diarios y Reacción Ciudadana con Evidencia */}
              {entry.xTwitterAndPressArchives.length > 0 && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400 font-bold">
                    <Newspaper className="w-4 h-4" />
                    <span>
                      2. Archivo de X (Twitter), Diarios y Respuestas Ciudadanas Documentadas
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {entry.xTwitterAndPressArchives.map(post => (
                      <div
                        key={post.id}
                        className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <span className="text-sky-300 font-bold">{post.sourceOrHandle}</span>
                          <span className="text-slate-400">
                            Fecha: {post.publishedDate} · Cargo: {post.roleAtTime}
                          </span>
                        </div>
                        <blockquote className="text-xs text-slate-100 border-l-2 border-sky-500/60 pl-3 py-0.5 italic leading-relaxed">
                          “{post.exactPostOrQuote}”
                        </blockquote>
                        <div className="bg-slate-950 border border-slate-800/90 rounded-lg p-2.5 text-[11px] text-slate-300 leading-relaxed">
                          <strong className="text-amber-300 font-mono uppercase text-[10px] block mb-0.5">
                            Contraste ciudadano y evidencia adjuntada en redes:
                          </strong>
                          {post.socialCommentsAndCommunityContext}
                        </div>
                        <a
                          href={post.archiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400 hover:underline"
                        >
                          <span>Consultar archivo público en X / Hemeroteca</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Lado a Lado: Archivo TV / YouTube vs. Acto Oficial / Voto / Firma */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Columna Izquierda: Clips de TV y YouTube */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-300 font-bold">
                    <Youtube className="w-4 h-4 text-rose-400" />
                    <span>3A. Lo que Dijo en Televisión / Archivo de YouTube</span>
                  </div>

                  <div className="space-y-3">
                    {entry.tvYoutubeClips.map(clip => (
                      <div
                        key={clip.id}
                        className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                            {clip.channel}
                          </span>
                          <span className="text-slate-400">Fecha: {clip.broadcastDate}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {clip.programOrContext} · Cargo entonces: {clip.roleAtTime}
                        </div>
                        <blockquote className="text-xs text-slate-100 border-l-2 border-rose-500/60 pl-3 py-0.5 leading-relaxed italic">
                          {clip.exactQuoteOrPosition}
                        </blockquote>
                        <a
                          href={clip.youtubeArchiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-rose-300 hover:underline pt-1"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          <span>Ver / Buscar clip en el archivo de YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Columna Derecha: Lo que Efectivamente Hizo / Votó / Firmó */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
                    <FileCheck2 className="w-4 h-4" />
                    <span>3B. Lo que Efectivamente Hizo, Votó o Firmó en el Estado</span>
                  </div>

                  <div className="space-y-3">
                    {entry.counterActions.map((act, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {act.instrument}
                          </span>
                          <span className="text-slate-400">Fecha: {act.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Cargo en el acto: {act.roleAtAction}
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {act.whatTheyActuallyDid}
                        </p>
                        <a
                          href={act.officialDocumentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:underline pt-1"
                        >
                          <span>Ver documento oficial (Boletín Oficial / HCDN / InfoLEG)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Generador de Interpelación Ciudadana Documentada en Redes Sociales Públicas */}
              {entry.citizenPublicInquiries.length > 0 && (
                <div className="bg-emerald-950/15 border border-emerald-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        4. Interpelación Ciudadana en Redes Públicas con Fuente Oficial Verificada
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      100% respaldado por Boletín Oficial / Actas del Congreso
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Podés copiar esta consulta documentada o abrirla directamente en tu cuenta de{' '}
                    <strong className="text-white">X (Twitter)</strong> mencionando la cuenta pública oficial de{' '}
                    <strong className="text-white">{entry.politicianName}</strong>. Incluye la fecha exacta, el número de ley/decreto/acta y el enlace oficial para que ningún funcionario pueda desestimarla como rumor o calumnia.
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {entry.citizenPublicInquiries.map(inq => {
                      const isCopied = copiedId === inq.id;
                      const tweetIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
                        inq.preDraftedVerifiedMessage
                      )}`;
                      return (
                        <div
                          key={inq.id}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                            <span className="text-white font-bold">{inq.questionTitle}</span>
                            <span className="text-emerald-400">
                              Evidencia adjunta: {inq.evidenceNormOrAct}
                            </span>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed break-words">
                            {inq.preDraftedVerifiedMessage}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyInquiry(inq.id, inq.preDraftedVerifiedMessage)
                              }
                              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer transition"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">¡Texto con fuente copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Copiar pregunta con evidencia</span>
                                </>
                              )}
                            </button>

                            <a
                              href={tweetIntentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-xs font-bold text-sky-300 inline-flex items-center gap-1.5 transition"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Preguntar en X ({inq.officialHandle}) con fuente →</span>
                            </a>

                            <a
                              href={inq.evidenceOfficialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                            >
                              <span>Abrir prueba oficial</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Análisis de Congruencia + Descargo Institucional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-amber-950/15 border border-amber-500/30 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-amber-300 font-bold">
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>Síntesis de Congruencia y Crítica Cruzada</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {entry.crossCriticismAnalysis}
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-sky-400 font-bold">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Contexto Institucional y Argumento / Defensa del Funcionario</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {entry.institutionalContextAndDefense}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Nota Metodológica de Neutralidad */}
      <footer className="bg-emerald-950/15 border border-emerald-500/25 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block">
            Regla de Simetría Partidaria y Evidencia Primaria (2003–2026)
          </strong>
          Todos los funcionarios en funciones —oficialistas y opositores, nacionales, provinciales y municipales— son auditados bajo el mismo estándar. Ninguna afirmación se publica sin indicar el medio o red social, la fecha, el instrumento estatal contrapuesto (ley, decreto o acta de votación nominal) y el descargo público formulado por el funcionario. Las consultas ciudadanas para redes sociales citan exclusivamente documentos públicos oficiales verificables.
        </div>
      </footer>
    </div>
  );
}
