import React, { useMemo, useState } from 'react';
import {
  ExternalLink,
  Search,
  Scale,
  Landmark,
  WalletCards,
  ReceiptText,
  AlertTriangle,
  ShieldCheck,
  Vote,
  Users,
  Image as ImageIcon,
  Youtube,
  ArrowRight,
  Repeat,
  MessageSquare,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { POLITICAL_TRANSPARENCY, calculateAssetChange } from '../data/transparenciaPolitica';
import { EXECUTIVE_AUTHORITIES_2026 } from '../data/autoridadesEjecutivas2026';
import { CONGRUENCE_BLOG_ENTRIES, CONGRUENCE_PATTERN_LABELS } from '../data/blogCongruencia';

const ALL_POLITICAL_RECORDS = [
  ...POLITICAL_TRANSPARENCY,
  ...EXECUTIVE_AUTHORITIES_2026.filter(
    exec => !POLITICAL_TRANSPARENCY.some(base => base.name === exec.name)
  )
];

const money = (value: number | null | undefined) =>
  typeof value === 'number'
    ? `$${Math.round(value).toLocaleString('es-AR')}`
    : 'Sin datos oficiales verificados';
const pct = (value: number | null | undefined) =>
  typeof value === 'number' ? `${value.toFixed(2)}%` : 'No calculable';

interface RegistroPoliticoProps {
  onNavigate?: (tab: string, param?: string) => void;
  initialPoliticianId?: string;
}

export default function RegistroPolitico({ onNavigate, initialPoliticianId }: RegistroPoliticoProps) {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [selectedId, setSelectedId] = useState(
    initialPoliticianId || ALL_POLITICAL_RECORDS[0]?.id || ''
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialPoliticianId) {
      // Soportar tanto ID exacto ('cristian_ritondo_2024') como ID corto ('cristian_ritondo')
      const exact = ALL_POLITICAL_RECORDS.find(
        p => p.id === initialPoliticianId || p.id.startsWith(initialPoliticianId)
      );
      if (exact) setSelectedId(exact.id);
    }
  }, [initialPoliticianId]);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filtered = useMemo(
    () =>
      ALL_POLITICAL_RECORDS.filter(record => {
        const q = query.trim().toLowerCase();
        const text = `${record.name} ${record.role} ${record.jurisdiction} ${record.party}`.toLowerCase();
        return (!q || text.includes(q)) && (level === 'all' || record.level === level);
      }),
    [query, level]
  );

  const selected =
    ALL_POLITICAL_RECORDS.find(p => p.id === selectedId) ||
    filtered[0] ||
    ALL_POLITICAL_RECORDS[0];
  const assetChange = selected ? calculateAssetChange(selected) : null;
  const executiveCount = ALL_POLITICAL_RECORDS.filter(r =>
    ['Nacion', 'Provincia', 'CABA'].includes(r.level)
  ).length;

  const matchingCongruenceEntries = useMemo(() => {
    if (!selected) return [];
    return CONGRUENCE_BLOG_ENTRIES.filter(
      c =>
        c.politicianId === selected.id ||
        selected.id.startsWith(c.politicianId) ||
        c.politicianName.toLowerCase() === selected.name.toLowerCase()
    );
  }, [selected]);

  const totalPoliticianContradictions = useMemo(
    () =>
      matchingCongruenceEntries.reduce(
        (sum, item) => sum + item.contradictionsCount,
        0
      ),
    [matchingCongruenceEntries]
  );

  // Construir plantillas de interpelación ciudadana verificadas para la autoridad seleccionada
  const citizenInquiriesForSelected = useMemo(() => {
    if (!selected) return [];
    const fromBlog = matchingCongruenceEntries.flatMap(e => e.citizenPublicInquiries);
    if (fromBlog.length > 0) return fromBlog;

    const xSocial = (selected.officialSocials || []).find(s => s.network === 'X');
    const handle = xSocial?.handle || selected.name;
    const socialUrl = xSocial?.url || selected.roleSource.url;

    if (selected.fiscalActions.length > 0) {
      return selected.fiscalActions.map((act, idx) => ({
        id: `auto-inq-${selected.id}-${idx}`,
        officialHandle: handle,
        officialSocialUrl: socialUrl,
        networkLabel: 'X (Twitter)' as const,
        questionTitle: `Consulta ciudadana sobre: ${act.title}`,
        preDraftedVerifiedMessage: `${handle}: Según consta en ${act.source.label} (${act.date}), en su rol de ${act.role} intervino en "${act.title}" (${act.taxOrFee}: ${act.outcome}). ¿Cómo justifica el impacto de esta medida sobre los contribuyentes? Fuente oficial verificada: ${act.source.url}`,
        evidenceNormOrAct: `${act.source.label} (${act.date})`,
        evidenceOfficialUrl: act.source.url
      }));
    }

    return [
      {
        id: `auto-inq-gov-${selected.id}`,
        officialHandle: handle,
        officialSocialUrl: socialUrl,
        networkLabel: 'X (Twitter)' as const,
        questionTitle: `Consulta ciudadana por Ingresos Brutos, tasas y ejecución presupuestaria en ${selected.jurisdiction}`,
        preDraftedVerifiedMessage: `${handle}: Como ${selected.role} de ${selected.jurisdiction}, solicitamos la publicación desagregada del gasto ejecutado devengado y un cronograma para reducir la alícuota en cascada de Ingresos Brutos sobre servicios y alimentos (Ley 27.275). Fuente oficial: ${selected.roleSource.url}`,
        evidenceNormOrAct: `${selected.roleSource.label}`,
        evidenceOfficialUrl: selected.roleSource.url
      }
    ];
  }, [selected, matchingCongruenceEntries]);

  return (
    <div className="space-y-7 py-4 text-left" id="registro-politico-view">
      <header className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]">
          <ShieldCheck className="w-4 h-4" />
          Registro auditable · Conexión a redes públicas e interpelación ciudadana con evidencia
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Autoridades, patrimonio, congruencia (2003–2026) y consulta ciudadana en redes
        </h1>
        <p className="text-sm text-slate-400 max-w-5xl leading-relaxed">
          Registro basado en fuentes públicas oficiales. Se separan cargo, partido, remuneración, declaraciones juradas, evolución patrimonial, situación judicial, decisiones tributarias, contador de contradicciones (2003–2026) y conexión directa a sus redes sociales públicas para enviar consultas ciudadanas respaldadas por fuente oficial verificada.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Mini label="Ejecutivos nacionales/provinciales" value={String(executiveCount)} />
        <Mini label="Cobertura jurisdiccional" value="Nación + 23 provincias + CABA" />
        <Mini label="Escrutinio de congruencia" value="X, Diarios y TV (2003–2026)" />
        <Mini label="Interpelación en redes" value="Con fuente oficial adjunta" />
      </section>

      <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 flex gap-3 text-xs text-amber-100/80 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Regla de publicación:</strong> “sin expediente oficial verificado cargado” no significa “sin causas”. Una DDJJ no permite afirmar incremento patrimonial sin al menos dos declaraciones comparables. Las consultas ciudadanas para redes sociales se basan exclusivamente en leyes, decretos, actas de votación y portales oficiales verificados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Nombre, cargo, partido, jurisdicción..."
                className="w-full bg-transparent outline-none text-xs text-white placeholder-slate-600"
              />
            </div>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
            >
              <option value="all">Todos los niveles</option>
              <option value="Nacion">Nación</option>
              <option value="Provincia">Provincia</option>
              <option value="CABA">CABA</option>
              <option value="Municipio">Municipio</option>
              <option value="Legislativo">Legislativo</option>
            </select>

            {/* Selector rápido directo para móviles y tablets */}
            <div className="lg:hidden pt-1">
              <label className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                Salto directo a funcionario ({filtered.length}):
              </label>
              <select
                value={selected?.id || ''}
                onChange={e => {
                  setSelectedId(e.target.value);
                  setTimeout(() => {
                    document
                      .getElementById('politician-detail-panel')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 60);
                }}
                className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white"
              >
                {filtered.map(record => (
                  <option key={record.id} value={record.id}>
                    {record.name} — {record.role} ({record.jurisdiction})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {filtered.length} perfiles visibles · sólo hechos individualmente trazables se presentan como verificados.
            </div>
          </div>

          <div className="space-y-2 max-h-[260px] lg:max-h-[680px] overflow-y-auto pr-1">
            {filtered.map(record => {
              const recordContradictions = CONGRUENCE_BLOG_ENTRIES.filter(
                c =>
                  c.politicianId === record.id ||
                  record.id.startsWith(c.politicianId) ||
                  c.politicianName.toLowerCase() === record.name.toLowerCase()
              ).reduce((s, e) => s + e.contradictionsCount, 0);
              return (
                <button
                  key={record.id}
                  onClick={() => {
                    setSelectedId(record.id);
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      setTimeout(() => {
                        document
                          .getElementById('politician-detail-panel')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 60);
                    }
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer ${
                    selected?.id === record.id
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-xs text-white block">{record.name}</strong>
                    {recordContradictions > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[9px] font-mono font-bold text-rose-300 shrink-0">
                        {recordContradictions} giros
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{record.role}</span>
                  <span className="text-[9px] text-slate-600 font-mono block mt-1">
                    {record.party} · {record.jurisdiction}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {selected && (
          <main className="lg:col-span-8 space-y-5 scroll-mt-28" id="politician-detail-panel">
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex gap-4 items-start">
                  {selected.photoUrl ? (
                    <img
                      src={selected.photoUrl}
                      alt={selected.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-800"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-slate-600" />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-extrabold text-white">{selected.name}</h2>
                      {totalPoliticianContradictions > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono font-bold text-rose-300">
                          <Repeat className="w-3 h-3 inline mr-1" />
                          {totalPoliticianContradictions} contradicciones documentadas (2003–2026)
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{selected.role}</p>
                    <p className="text-xs text-slate-500">
                      {selected.party} · {selected.jurisdiction}
                    </p>
                    <p className="text-[9px] text-slate-600 mt-2">
                      {selected.photoUrl
                        ? 'Foto institucional verificada'
                        : 'Sin foto institucional verificada cargada'}
                    </p>
                  </div>
                </div>
                <a
                  href={selected.roleSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline shrink-0"
                >
                  Fuente oficial del cargo <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Mini label="Nivel" value={selected.level} />
                <Mini
                  label="Estado del perfil"
                  value={
                    selected.profileStatus === 'verified'
                      ? 'Verificado'
                      : selected.profileStatus === 'partial'
                      ? 'Cobertura parcial'
                      : 'Sin verificar'
                  }
                />
                <Mini
                  label="Remuneración actual"
                  value={
                    selected.salary.length && selected.salary[0].grossMonthlyArs !== null
                      ? money(selected.salary[0].grossMonthlyArs)
                      : 'Sin dato oficial cargado'
                  }
                />
                <Mini
                  label="Giros contabilizados"
                  value={
                    totalPoliticianContradictions > 0
                      ? `${totalPoliticianContradictions} contradicciones`
                      : 'En relevamiento'
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[9px] uppercase font-mono text-slate-600">
                      Historial partidario
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-2">
                    {(selected.memberships || []).length
                      ? selected.memberships!
                          .map(
                            m =>
                              `${m.party}${
                                m.from ? ` (${m.from}${m.to ? `–${m.to}` : ''})` : ''
                              }`
                          )
                          .join(' · ')
                      : 'Sin historial adicional verificado cargado.'}
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <span className="text-[9px] uppercase font-mono text-slate-600">
                    Canales y Redes Sociales Públicas Oficiales
                  </span>
                  {(selected.officialSocials || []).length ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selected.officialSocials!.map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-[10px] font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>
                            {social.network}
                            {social.handle ? `: ${social.handle}` : ''}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-amber-300 mt-2">
                      Sin redes oficiales verificadas cargadas.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* NUEVO: Interpelación Ciudadana Documentada en Redes Sociales Públicas */}
            <Panel
              icon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
              title="Interpelación Ciudadana en Redes Públicas con Fuente Oficial Verificada"
            >
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conectate directamente con las redes sociales públicas de{' '}
                  <strong className="text-white">{selected.name}</strong> para consultarle por qué votó, firmó o mantuvo un impuesto o por qué cambió su postura histórica. Cada mensaje adjunta la <strong className="text-emerald-400">norma, fecha y URL oficial primaria</strong> (Boletín Oficial / HCDN / Senado / Portal Provincial) para que no pueda desestimarse como rumor o calumnia.
                </p>

                <div className="space-y-3">
                  {citizenInquiriesForSelected.map(inq => {
                    const isCopied = copiedId === inq.id;
                    const tweetIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
                      inq.preDraftedVerifiedMessage
                    )}`;
                    return (
                      <div
                        key={inq.id}
                        className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3.5 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                          <strong className="text-white">{inq.questionTitle}</strong>
                          <span className="text-emerald-400">
                            Fuente: {inq.evidenceNormOrAct}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed break-words">
                          {inq.preDraftedVerifiedMessage}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(inq.id, inq.preDraftedVerifiedMessage)
                            }
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer transition"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">
                                  ¡Copiado con fuente oficial!
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Copiar consulta con evidencia</span>
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
                            <span>
                              Preguntar en X ({inq.officialHandle}) adjuntando prueba →
                            </span>
                          </a>

                          <a
                            href={inq.evidenceOfficialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Ver documento oficial</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Panel
                icon={<WalletCards className="w-4 h-4 text-emerald-400" />}
                title="Remuneración oficial"
              >
                {selected.salary.length ? (
                  selected.salary.map((s, i) => (
                    <div
                      key={i}
                      className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"
                    >
                      <div className="flex justify-between gap-3">
                        <span className="text-xs text-slate-300">{s.period}</span>
                        <strong className="font-mono text-xs text-white">
                          {money(s.grossMonthlyArs)}
                        </strong>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        {s.note}
                      </p>
                      {s.source && <Source source={s.source} />}
                    </div>
                  ))
                ) : (
                  <Missing text="Sin remuneración oficial individual cargada." />
                )}
              </Panel>

              <Panel
                icon={<Landmark className="w-4 h-4 text-emerald-400" />}
                title="Historial patrimonial / DDJJ"
              >
                {selected.assets.length ? (
                  selected.assets.map((a, i) => (
                    <div
                      key={i}
                      className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0 space-y-1"
                    >
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-300">{a.period}</span>
                        <strong className="text-xs font-mono text-white">
                          {money(a.declaredTotalArs)}
                        </strong>
                      </div>
                      {typeof a.declaredIncomeArs === 'number' && (
                        <p className="text-[10px] text-slate-400">
                          Ingreso laboral declarado: {money(a.declaredIncomeArs)}
                        </p>
                      )}
                      {typeof a.cashArs === 'number' && (
                        <p className="text-[10px] text-slate-400">
                          Efectivo declarado: {money(a.cashArs)}
                        </p>
                      )}
                      {typeof a.depositsArs === 'number' && (
                        <p className="text-[10px] text-slate-400">
                          Depósitos declarados: {money(a.depositsArs)}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500 leading-relaxed">{a.note}</p>
                      <Source source={a.source} />
                    </div>
                  ))
                ) : (
                  <Missing text="Sin DDJJ individual oficial cargada." />
                )}
                <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[10px] text-slate-400">
                  {assetChange ? (
                    <>
                      Variación comparable {assetChange.from} → {assetChange.to}:{' '}
                      <strong className="text-white">
                        {money(assetChange.absoluteArs)} ({pct(assetChange.percent)})
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Incremento patrimonial:{' '}
                      <strong className="text-amber-300">
                        no calculable con las DDJJ cargadas
                      </strong>
                      .
                    </>
                  )}
                </div>
              </Panel>
            </section>

            <Panel
              icon={<Scale className="w-4 h-4 text-rose-400" />}
              title="Situación judicial documentada"
            >
              {selected.judicial.length ? (
                selected.judicial.map((j, i) => (
                  <div
                    key={i}
                    className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <strong className="text-xs text-white">{j.title}</strong>
                      <span className="text-[9px] font-mono px-2 py-1 rounded bg-rose-500/10 text-rose-300">
                        {j.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {j.caseNumber ? `Expte. ${j.caseNumber} · ` : ''}
                      {j.courtOrBody} · {j.date}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                      {j.note}
                    </p>
                    <Source source={j.source} />
                  </div>
                ))
              ) : (
                <Missing text={selected.judicialCoverageNote} />
              )}
            </Panel>

            <Panel
              icon={<ReceiptText className="w-4 h-4 text-emerald-400" />}
              title="Impuestos, tasas, decretos y votos vinculados"
            >
              {selected.fiscalActions.length ? (
                selected.fiscalActions.map((a, i) => (
                  <div
                    key={i}
                    className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <strong className="text-xs text-white block">{a.title}</strong>
                        <span className="text-[10px] text-slate-500">
                          {a.taxOrFee} · {a.date} · {a.actionType}
                        </span>
                      </div>
                      {a.vote && (
                        <span
                          className={`text-[9px] font-mono px-2 py-1 rounded ${
                            a.vote === 'AFIRMATIVO'
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'bg-rose-500/10 text-rose-300'
                          }`}
                        >
                          <Vote className="w-3 h-3 inline mr-1" />
                          {a.vote}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">
                      <strong>Rol:</strong> {a.role}. {a.outcome}
                    </p>
                    <Source source={a.source} />
                  </div>
                ))
              ) : (
                <Missing text="Sin decisión tributaria individual verificada cargada para esta ficha." />
              )}
            </Panel>

            <Panel
              icon={<Youtube className="w-4 h-4 text-rose-400" />}
              title="Escrutinio de Congruencia 2003–2026 (X/Twitter, Diarios y TV vs. Votos y Firmas)"
            >
              {matchingCongruenceEntries.length === 0 ? (
                <Missing text="Sin entradas de contraste en X/Prensa/TV cargadas aún para esta autoridad. La revisión diaria incorpora archivos de X (Twitter), diarios nacionales y canales de TV desde 2003 a medida que se contrastan con actos oficiales." />
              ) : (
                <div className="space-y-4">
                  {matchingCongruenceEntries.map(entry => {
                    const badge = CONGRUENCE_PATTERN_LABELS[entry.congruencePattern];
                    return (
                      <div
                        key={entry.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${badge.badgeClass}`}
                            >
                              {badge.label}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono font-bold text-rose-300">
                              <Repeat className="w-3 h-3 inline mr-1" />
                              {entry.contradictionsCount} giros ({entry.historicalSpanCovered})
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            Verificado: {entry.lastVerified}
                          </span>
                        </div>
                        <strong className="text-xs sm:text-sm text-white block">
                          {entry.title}
                        </strong>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {entry.crossCriticismAnalysis}
                        </p>

                        {/* Resumen de pasos de contradicción */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {entry.positionShiftsChain.map(step => (
                            <div
                              key={step.stepNumber}
                              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1"
                            >
                              <div className="flex items-center justify-between font-mono text-[10px]">
                                <span className="text-rose-300 font-bold">
                                  {step.stageLabel}
                                </span>
                                <span className="text-slate-400">{step.yearOrDate}</span>
                              </div>
                              <p className="text-slate-300 leading-snug">
                                {step.summaryOfStanceOrAct}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-mono">
                          {entry.tvYoutubeClips[0] && (
                            <a
                              href={entry.tvYoutubeClips[0].youtubeArchiveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-rose-300 hover:underline inline-flex items-center gap-1"
                            >
                              <Youtube className="w-3.5 h-3.5" /> Archivo{' '}
                              {entry.tvYoutubeClips[0].channel}{' '}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {entry.counterActions[0] && (
                            <a
                              href={entry.counterActions[0].officialDocumentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                            >
                              Acto oficial ({entry.counterActions[0].instrument}){' '}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {onNavigate && (
                            <button
                              type="button"
                              onClick={() => onNavigate('congruencia', entry.politicianId)}
                              className="text-sky-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              Abrir historial completo en Blog de Congruencia{' '}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>
          </main>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
      <span className="text-[9px] uppercase font-mono text-slate-500 block">{label}</span>
      <strong className="text-xs sm:text-sm text-white block mt-1">{value}</strong>
    </div>
  );
}

function Panel({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {icon}
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Source({
  source
}: {
  source: { label: string; url: string; verifiedAt: string };
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline mt-1"
    >
      {source.label} · verificado {source.verifiedAt}{' '}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

function Missing({ text }: { text: string }) {
  return (
    <p className="text-xs text-amber-200/80 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
      {text}
    </p>
  );
}
