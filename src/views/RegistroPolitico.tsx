import React, { useMemo, useState } from 'react';
import { ExternalLink, Search, Scale, Landmark, WalletCards, ReceiptText, AlertTriangle, ShieldCheck, Vote, Users, Image as ImageIcon } from 'lucide-react';
import { POLITICAL_TRANSPARENCY, calculateAssetChange } from '../data/transparenciaPolitica';
import { EXECUTIVE_AUTHORITIES_2026 } from '../data/autoridadesEjecutivas2026';

const ALL_POLITICAL_RECORDS = [
  ...POLITICAL_TRANSPARENCY,
  ...EXECUTIVE_AUTHORITIES_2026.filter(exec => !POLITICAL_TRANSPARENCY.some(base => base.name === exec.name))
];

const money = (value: number | null | undefined) => typeof value === 'number' ? `$${Math.round(value).toLocaleString('es-AR')}` : 'Sin datos oficiales verificados';
const pct = (value: number | null | undefined) => typeof value === 'number' ? `${value.toFixed(2)}%` : 'No calculable';

export default function RegistroPolitico() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [selectedId, setSelectedId] = useState(ALL_POLITICAL_RECORDS[0]?.id || '');

  const filtered = useMemo(() => ALL_POLITICAL_RECORDS.filter(record => {
    const q = query.trim().toLowerCase();
    const text = `${record.name} ${record.role} ${record.jurisdiction} ${record.party}`.toLowerCase();
    return (!q || text.includes(q)) && (level === 'all' || record.level === level);
  }), [query, level]);

  const selected = ALL_POLITICAL_RECORDS.find(p => p.id === selectedId) || filtered[0] || ALL_POLITICAL_RECORDS[0];
  const assetChange = selected ? calculateAssetChange(selected) : null;
  const executiveCount = ALL_POLITICAL_RECORDS.filter(r => ['Nacion', 'Provincia', 'CABA'].includes(r.level)).length;

  return (
    <div className="space-y-7 py-4 text-left" id="registro-politico-view">
      <header className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]"><ShieldCheck className="w-4 h-4"/>Registro auditable</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Autoridades, patrimonio y responsabilidad fiscal</h1>
        <p className="text-sm text-slate-400 max-w-5xl leading-relaxed">Registro basado en fuentes públicas oficiales. Se separan cargo, partido, remuneración, declaraciones juradas, evolución patrimonial, situación judicial, decisiones tributarias, foto institucional y canales públicos oficiales. La ausencia de una fuente no se reemplaza por prensa, rumores ni inferencias.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Mini label="Ejecutivos nacionales/provinciales" value={String(executiveCount)} />
        <Mini label="Cobertura jurisdiccional" value="Nación + 23 provincias + CABA" />
        <Mini label="Fuente base de cargos" value="Sitios oficiales" />
        <Mini label="Datos faltantes" value="Se muestran, no se estiman" />
      </section>

      <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 flex gap-3 text-xs text-amber-100/80 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p><strong>Regla de publicación:</strong> “sin expediente oficial verificado cargado” no significa “sin causas”. Una DDJJ no permite afirmar incremento patrimonial sin al menos dos declaraciones comparables. Foto y redes se publican sólo si corresponden a perfiles públicos oficiales/verificados.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2"><Search className="w-4 h-4 text-slate-500"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Nombre, cargo, partido, jurisdicción..." className="w-full bg-transparent outline-none text-xs text-white placeholder-slate-600" /></div>
            <select value={level} onChange={e => setLevel(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
              <option value="all">Todos los niveles</option><option value="Nacion">Nación</option><option value="Provincia">Provincia</option><option value="CABA">CABA</option><option value="Municipio">Municipio</option><option value="Legislativo">Legislativo</option>
            </select>
            <div className="text-[10px] font-mono text-slate-500">{filtered.length} perfiles visibles · sólo hechos individualmente trazables se presentan como verificados.</div>
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filtered.map(record => <button key={record.id} onClick={() => setSelectedId(record.id)} className={`w-full p-3.5 rounded-xl border text-left transition ${selected?.id === record.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
              <strong className="text-xs text-white block">{record.name}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">{record.role}</span>
              <span className="text-[9px] text-slate-600 font-mono block mt-1">{record.party} · {record.jurisdiction}</span>
            </button>)}
          </div>
        </aside>

        {selected && <main className="lg:col-span-8 space-y-5">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex gap-4 items-start">
                {selected.photoUrl ? <img src={selected.photoUrl} alt={selected.name} className="w-20 h-20 rounded-xl object-cover border border-slate-800"/> : <div className="w-20 h-20 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center"><ImageIcon className="w-6 h-6 text-slate-600"/></div>}
                <div><h2 className="text-2xl font-extrabold text-white">{selected.name}</h2><p className="text-sm text-slate-300 mt-1">{selected.role}</p><p className="text-xs text-slate-500">{selected.party} · {selected.jurisdiction}</p><p className="text-[9px] text-slate-600 mt-2">{selected.photoUrl ? 'Foto institucional verificada' : 'Sin foto institucional verificada cargada'}</p></div>
              </div>
              <a href={selected.roleSource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline">Fuente oficial del cargo <ExternalLink className="w-3.5 h-3.5"/></a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Mini label="Nivel" value={selected.level}/><Mini label="Estado del perfil" value={selected.profileStatus === 'verified' ? 'Verificado' : selected.profileStatus === 'partial' ? 'Cobertura parcial' : 'Sin verificar'}/><Mini label="Remuneración actual" value={selected.salary.length && selected.salary[0].grossMonthlyArs !== null ? money(selected.salary[0].grossMonthlyArs) : 'Sin dato oficial cargado'}/><Mini label="Variación patrimonial" value={assetChange ? pct(assetChange.percent) : 'No calculable'}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3"><div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-400"/><span className="text-[9px] uppercase font-mono text-slate-600">Historial partidario</span></div><p className="text-[10px] text-slate-300 mt-2">{(selected.memberships || []).length ? selected.memberships!.map(m => `${m.party}${m.from ? ` (${m.from}${m.to ? `–${m.to}` : ''})` : ''}`).join(' · ') : 'Sin historial adicional verificado cargado.'}</p></div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3"><span className="text-[9px] uppercase font-mono text-slate-600">Canales públicos oficiales</span>{(selected.officialSocials || []).length ? <div className="flex flex-wrap gap-2 mt-2">{selected.officialSocials!.map((social,i)=><a key={i} href={social.url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded border border-slate-800 text-[9px] text-emerald-400 hover:underline">{social.network}</a>)}</div> : <p className="text-[10px] text-amber-300 mt-2">Sin redes oficiales verificadas cargadas.</p>}</div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel icon={<WalletCards className="w-4 h-4 text-emerald-400"/>} title="Remuneración oficial">
              {selected.salary.length ? selected.salary.map((s, i) => <div key={i} className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"><div className="flex justify-between gap-3"><span className="text-xs text-slate-300">{s.period}</span><strong className="font-mono text-xs text-white">{money(s.grossMonthlyArs)}</strong></div><p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{s.note}</p>{s.source && <Source source={s.source}/>}</div>) : <Missing text="Sin remuneración oficial individual cargada."/>}
            </Panel>

            <Panel icon={<Landmark className="w-4 h-4 text-emerald-400"/>} title="Historial patrimonial / DDJJ">
              {selected.assets.length ? selected.assets.map((a, i) => <div key={i} className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0 space-y-1"><div className="flex justify-between"><span className="text-xs text-slate-300">{a.period}</span><strong className="text-xs font-mono text-white">{money(a.declaredTotalArs)}</strong></div>{typeof a.declaredIncomeArs === 'number' && <p className="text-[10px] text-slate-400">Ingreso laboral declarado: {money(a.declaredIncomeArs)}</p>}{typeof a.cashArs === 'number' && <p className="text-[10px] text-slate-400">Efectivo declarado: {money(a.cashArs)}</p>}{typeof a.depositsArs === 'number' && <p className="text-[10px] text-slate-400">Depósitos declarados: {money(a.depositsArs)}</p>}<p className="text-[10px] text-slate-500 leading-relaxed">{a.note}</p><Source source={a.source}/></div>) : <Missing text="Sin DDJJ individual oficial cargada."/>}
              <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[10px] text-slate-400">{assetChange ? <>Variación comparable {assetChange.from} → {assetChange.to}: <strong className="text-white">{money(assetChange.absoluteArs)} ({pct(assetChange.percent)})</strong>.</> : <>Incremento patrimonial: <strong className="text-amber-300">no calculable con las DDJJ cargadas</strong>.</>}</div>
            </Panel>
          </section>

          <Panel icon={<Scale className="w-4 h-4 text-rose-400"/>} title="Situación judicial documentada">
            {selected.judicial.length ? selected.judicial.map((j, i) => <div key={i} className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"><div className="flex flex-wrap justify-between gap-2"><strong className="text-xs text-white">{j.title}</strong><span className="text-[9px] font-mono px-2 py-1 rounded bg-rose-500/10 text-rose-300">{j.status}</span></div><p className="text-[10px] text-slate-400 mt-1">{j.caseNumber ? `Expte. ${j.caseNumber} · ` : ''}{j.courtOrBody} · {j.date}</p><p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{j.note}</p><Source source={j.source}/></div>) : <Missing text={selected.judicialCoverageNote}/>} 
          </Panel>

          <Panel icon={<ReceiptText className="w-4 h-4 text-emerald-400"/>} title="Impuestos, tasas, decretos y votos vinculados">
            {selected.fiscalActions.length ? selected.fiscalActions.map((a, i) => <div key={i} className="border-t border-slate-800 first:border-t-0 py-3 first:pt-0"><div className="flex flex-wrap justify-between gap-2"><div><strong className="text-xs text-white block">{a.title}</strong><span className="text-[10px] text-slate-500">{a.taxOrFee} · {a.date} · {a.actionType}</span></div>{a.vote && <span className={`text-[9px] font-mono px-2 py-1 rounded ${a.vote === 'AFIRMATIVO' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}><Vote className="w-3 h-3 inline mr-1"/>{a.vote}</span>}</div><p className="text-[10px] text-slate-400 mt-2"><strong>Rol:</strong> {a.role}. {a.outcome}</p><Source source={a.source}/></div>) : <Missing text="Sin decisión tributaria individual verificada cargada para esta ficha."/>}
          </Panel>
        </main>}
      </div>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5"><h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">{icon}{title}</h3>{children}</section>; }
function Mini({ label, value }: { label: string; value: string }) { return <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3"><span className="text-[9px] uppercase font-mono text-slate-600 block">{label}</span><strong className="text-xs text-slate-200 block mt-1">{value}</strong></div>; }
function Missing({ text }: { text: string }) { return <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[10px] text-amber-100/70 leading-relaxed">{text}</div>; }
function Source({ source }: { source: { label: string; url: string; verifiedAt: string } }) { return <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline mt-2">{source.label} · verificada {source.verifiedAt} <ExternalLink className="w-3 h-3"/></a>; }
