import React from 'react';
import { ExternalLink, Vote, ShieldCheck, AlertTriangle } from 'lucide-react';
import { POLITICAL_TRANSPARENCY } from '../data/transparenciaPolitica';

const GANANCIAS_2024 = {
  title: 'Impuesto a las Ganancias — insistencia del Título V',
  date: '28/06/2024 01:34',
  act: 'Acta Nº 3 / HCDN — documento 5274',
  source: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
  affirmative: 136,
  negative: 116,
  abstention: 3,
  absent: 1,
  members: 257
};

export default function TrazabilidadPoliticoFiscal() {
  const verifiedActions = POLITICAL_TRANSPARENCY.flatMap(p => p.fiscalActions.map(action => ({ politician: p, action })));

  return (
    <section className="space-y-5 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6" id="trazabilidad-politico-fiscal">
      <div className="flex items-start gap-3">
        <Vote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold text-white">Quién creó, promulgó o votó cada carga fiscal</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">La trazabilidad política sólo se publica cuando existe norma, decreto, acta nominal u otra fuente oficial individualizable. No se atribuyen votos por pertenencia partidaria ni se reconstruyen listas desde notas periodísticas.</p>
        </div>
      </div>

      <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div><span className="text-[9px] uppercase font-mono text-emerald-400">Votación nominal oficial verificada</span><h3 className="font-bold text-white mt-1">{GANANCIAS_2024.title}</h3><p className="text-[10px] text-slate-500">{GANANCIAS_2024.act} · {GANANCIAS_2024.date}</p></div>
          <a href={GANANCIAS_2024.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline">Abrir acta oficial completa <ExternalLink className="w-3.5 h-3.5"/></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Count label="Afirmativos" value={GANANCIAS_2024.affirmative} tone="emerald" />
          <Count label="Negativos" value={GANANCIAS_2024.negative} tone="rose" />
          <Count label="Abstenciones" value={GANANCIAS_2024.abstention} tone="amber" />
          <Count label="Ausentes" value={GANANCIAS_2024.absent} />
          <Count label="Miembros" value={GANANCIAS_2024.members} />
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">El PDF oficial contiene el padrón nominal completo con apellido y nombre, bloque político, distrito y sentido del voto. La base interna actualmente publica perfiles individuales sólo cuando fueron contrastados uno por uno con esa acta.</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400"/><h3 className="text-sm font-bold text-white">Acciones individuales ya verificadas</h3></div>
        {verifiedActions.length === 0 ? <p className="text-xs text-slate-500">Sin acciones individuales verificadas cargadas todavía.</p> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">{verifiedActions.map(({ politician, action }, idx) => <article key={`${politician.id}-${idx}`} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2"><div className="flex justify-between gap-3"><div><strong className="text-xs text-white block">{politician.name}</strong><span className="text-[9px] text-slate-500">{politician.party} · {politician.jurisdiction}</span></div>{action.vote && <span className={`h-fit text-[9px] font-mono px-2 py-1 rounded ${action.vote === 'AFIRMATIVO' ? 'bg-emerald-500/10 text-emerald-300' : action.vote === 'NEGATIVO' ? 'bg-rose-500/10 text-rose-300' : 'bg-amber-500/10 text-amber-300'}`}>{action.vote}</span>}</div><p className="text-[10px] text-slate-400 leading-relaxed">{action.title} · {action.outcome}</p><a href={action.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline">{action.source.label} <ExternalLink className="w-3 h-3"/></a></article>)}</div>}
      </div>

      <div className="flex gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[10px] text-amber-100/75 leading-relaxed"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0"/><p><strong>Cobertura:</strong> una ley puede tener múltiples momentos de responsabilidad: proyecto, dictamen, sanción en cada cámara, promulgación, reglamentación y reformas posteriores. La plataforma debe mostrarlos por separado; “quién puso el impuesto” no se reduce automáticamente a una sola persona.</p></div>
    </section>
  );
}

function Count({ label, value, tone = 'slate' }: { label: string; value: number; tone?: 'slate' | 'emerald' | 'rose' | 'amber' }) {
  const cls = tone === 'emerald' ? 'text-emerald-300' : tone === 'rose' ? 'text-rose-300' : tone === 'amber' ? 'text-amber-300' : 'text-white';
  return <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3"><span className="text-[9px] uppercase font-mono text-slate-600 block">{label}</span><strong className={`text-lg font-mono ${cls}`}>{value}</strong></div>;
}
