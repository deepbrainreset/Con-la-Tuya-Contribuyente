import React, { useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink, Search, Scale, ShieldCheck, Users, Vote, Landmark } from 'lucide-react';
import { ALL_PARTY_ENTITIES, PARTY_INTEGRITY_METHOD, PARTY_REGISTRY_SOURCES, integrityStats, peopleForParty } from '../data/integridadPartidaria';

export default function IntegridadPartidaria() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(ALL_PARTY_ENTITIES[0]?.id || '');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PARTY_ENTITIES.filter(p => !q || `${p.name} ${p.aliases.join(' ')}`.toLowerCase().includes(q));
  }, [query]);

  const selected = ALL_PARTY_ENTITIES.find(p => p.id === selectedId) || filtered[0] || ALL_PARTY_ENTITIES[0];
  const people = selected ? peopleForParty(selected) : [];
  const stats = selected ? integrityStats(selected) : null;

  return (
    <div className="space-y-8 py-4 text-left" id="integridad-partidaria-view">
      <header className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] uppercase font-mono tracking-[0.2em]"><ShieldCheck className="w-4 h-4"/>Desde 1983 · evidencia pública</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Partidos, dirigentes e historial judicial</h1>
        <p className="text-sm text-slate-400 max-w-5xl leading-relaxed">Registro neutral de partidos y alianzas, dirigentes públicos vinculados, causas judiciales documentadas, decisiones fiscales y votaciones. No se presume culpabilidad por una denuncia ni se etiqueta a una fuerza política por afinidad ideológica.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2"><Search className="w-4 h-4 text-slate-500"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar partido o alianza…" className="w-full bg-transparent outline-none text-xs text-white placeholder-slate-600" /></div>
            <p className="text-[10px] text-slate-500 leading-relaxed">La Cámara Nacional Electoral informaba 44 partidos de orden nacional reconocidos al 30/04/2026. Esta vista además admite alianzas e históricos a medida que se verifican.</p>
          </div>
          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {filtered.map(party => {
              const s = integrityStats(party);
              return <button key={party.id} onClick={() => setSelectedId(party.id)} className={`w-full p-3.5 rounded-xl border text-left transition ${selected?.id === party.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
                <strong className="text-xs text-white block">{party.name}</strong>
                <span className="text-[9px] text-slate-500 font-mono block mt-1">{party.status.replaceAll('_',' ')} · {party.coverageFrom}–{party.coverageTo}</span>
                <span className="text-[9px] text-slate-600 block mt-1">{s.peopleCovered} personas públicas vinculadas y verificadas cargadas</span>
              </button>;
            })}
          </div>
        </aside>

        {selected && stats && <main className="lg:col-span-8 space-y-5">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div><h2 className="text-2xl font-extrabold text-white">{selected.name}</h2><p className="text-xs text-slate-500 mt-1">Cobertura declarada: {selected.coverageFrom}–{selected.coverageTo} · {selected.status.replaceAll('_',' ')}</p></div>
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline">Fuente partidaria oficial <ExternalLink className="w-3.5 h-3.5"/></a>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{selected.coverageNote}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Metric label="Personas cubiertas" value={String(stats.peopleCovered)} />
              <Metric label="Registros judiciales" value={String(stats.judicialRecords)} />
              <Metric label="Condenas firmes" value={String(stats.finalConvictions)} />
              <Metric label="Procesamientos / juicio" value={String(stats.prosecutions + stats.trials)} />
            </div>
            {!stats.denominatorReliable && <div className="flex gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[10px] text-amber-100/80 leading-relaxed"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0"/><p><strong>No se calcula una tasa de corrupción.</strong> La cobertura histórica de integrantes todavía no constituye un denominador completo y comparable. Mostrar un porcentaje ahora sería metodológicamente engañoso.</p></div>}
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-emerald-400"/><h3 className="text-sm font-bold text-white">Dirigentes, candidatos y funcionarios vinculados</h3></div>
            {people.length === 0 ? <Missing text="Todavía no hay personas públicas con pertenencia verificable cargadas para esta fuerza. Esto no significa que el partido no tenga dirigentes; significa que la cobertura histórica aún está incompleta."/> : <div className="space-y-3">{people.map(person => <div key={person.id} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {person.photoUrl ? <img src={person.photoUrl} alt={person.name} className="w-12 h-12 rounded-lg object-cover border border-slate-800"/> : <div className="w-12 h-12 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center font-bold text-slate-500">{person.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>}
                  <div><strong className="text-sm text-white block">{person.name}</strong><span className="text-[10px] text-slate-400">{person.role}</span><span className="text-[9px] text-slate-600 block mt-1">{person.jurisdiction}</span></div>
                </div>
                <a href={person.roleSource.url} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 hover:underline">Cargo oficial <ExternalLink className="w-3 h-3 inline"/></a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="text-[10px] text-slate-400"><strong className="text-slate-300">Historial partidario:</strong> {(person.memberships || []).length ? person.memberships!.map(m => `${m.party}${m.from ? ` (${m.from}${m.to ? `–${m.to}` : ''})` : ''}`).join(' · ') : 'Sin historial partidario adicional verificado.'}</div>
                <div className="text-[10px] text-slate-400"><strong className="text-slate-300">Judicial:</strong> {person.judicial.length ? `${person.judicial.length} registro(s) oficial(es) cargado(s)` : person.judicialCoverageNote}</div>
              </div>
              {person.judicial.map((record, i) => <div key={i} className="mt-3 p-3 bg-rose-500/5 border border-rose-500/15 rounded-lg"><div className="flex flex-wrap justify-between gap-2"><strong className="text-[11px] text-white">{record.title}</strong><span className="text-[9px] text-rose-300 font-mono">{record.status}</span></div><p className="text-[9px] text-slate-500 mt-1">{record.caseNumber ? `Expte. ${record.caseNumber} · ` : ''}{record.courtOrBody} · {record.date}</p><p className="text-[10px] text-slate-400 mt-1">{record.note}</p><a href={record.source.url} target="_blank" rel="noreferrer" className="text-[9px] text-emerald-400 hover:underline mt-1 inline-block">Ver fuente judicial <ExternalLink className="w-3 h-3 inline"/></a></div>)}
              {(person.officialSocials || []).length > 0 && <div className="flex flex-wrap gap-2 mt-3">{person.officialSocials!.map((social, i) => <a key={i} href={social.url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded border border-slate-800 text-[9px] text-slate-300 hover:text-white">{social.network}</a>)}</div>}
            </div>)}</div>}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoPanel icon={<Scale className="w-4 h-4 text-rose-400"/>} title="Fuentes judiciales"><SourceLink href={PARTY_REGISTRY_SOURCES.corruptionCases} label="CIJ · Base de causas de corrupción"/><SourceLink href={PARTY_REGISTRY_SOURCES.judicialDecisions} label="CIJ · Sentencias y resoluciones"/><SourceLink href={PARTY_REGISTRY_SOURCES.pjnCaseSearch} label="PJN · Consulta de expedientes"/></InfoPanel>
            <InfoPanel icon={<Landmark className="w-4 h-4 text-emerald-400"/>} title="Fuentes partidarias"><SourceLink href={PARTY_REGISTRY_SOURCES.cneCurrent} label="Cámara Nacional Electoral · agrupaciones"/><SourceLink href={PARTY_REGISTRY_SOURCES.nationalCharters} label="Argentina.gob.ar · cartas orgánicas"/><SourceLink href={PARTY_REGISTRY_SOURCES.affiliationLaw} label="Ley 26.571 · régimen de afiliaciones"/></InfoPanel>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"><div className="flex items-center gap-2"><Vote className="w-4 h-4 text-emerald-400"/><h3 className="text-sm font-bold text-white">Criterio de comparación entre partidos</h3></div>{PARTY_INTEGRITY_METHOD.notes.map((note, i) => <p key={i} className="text-[11px] text-slate-400 leading-relaxed">{note}</p>)}</section>
        </main>}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3"><span className="text-[9px] uppercase font-mono text-slate-600 block">{label}</span><strong className="text-lg text-white font-mono block mt-1">{value}</strong></div>; }
function Missing({ text }: { text: string }) { return <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[10px] text-amber-100/70 leading-relaxed">{text}</div>; }
function InfoPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"><h3 className="text-sm font-bold text-white flex items-center gap-2">{icon}{title}</h3>{children}</div>; }
function SourceLink({ href, label }: { href: string; label: string }) { return <a href={href} target="_blank" rel="noreferrer" className="block text-[10px] text-emerald-400 hover:underline">{label} <ExternalLink className="w-3 h-3 inline"/></a>; }
