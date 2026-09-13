import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Info,
  LineChart as LineChartIcon,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  CURRENT_INFLATION_2026,
  INFLATION_METHODOLOGY_LINKS,
  INFLATION_SERIES
} from '../data/inflacion';

const formatPct = (value: number | null) => value === null ? 'Sin datos verificados' : `${value.toLocaleString('es-AR', { maximumFractionDigits: 2 })}%`;

export default function Inflacion() {
  const [showTable, setShowTable] = useState(true);
  const [showOfficial, setShowOfficial] = useState(true);
  const [showAlternative, setShowAlternative] = useState(true);

  const chartData = useMemo(() => INFLATION_SERIES.map(point => ({
    ...point,
    oficial: showOfficial ? point.official : null,
    alternativa: showAlternative ? point.alternative : null
  })), [showOfficial, showAlternative]);

  const disputed = INFLATION_SERIES.filter(p => p.evidence === 'oficial_con_reserva');
  const avgGap = disputed
    .filter(p => p.official !== null && p.alternative !== null)
    .reduce((acc, p, _, arr) => acc + ((p.alternative as number) - (p.official as number)) / arr.length, 0);

  return (
    <div className="space-y-8 py-4 text-left" id="inflacion-view">
      <section className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <LineChartIcon className="w-4 h-4" />
          <span>Serie histórica y contraste de fuentes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Inflación Argentina: 1983–actualidad</h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          Serie histórica desde el retorno democrático. Cuando no existe un dato verificable o una serie comparable para un período, la plataforma lo informa expresamente y no completa el vacío por estimación o inferencia.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5"><span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-black">Inicio de la serie</span><div className="text-3xl font-black text-white mt-2">1983</div><div className="text-xs text-slate-400 mt-1">Retorno democrático</div></div>
        <div className="bg-slate-900/40 border border-rose-500/20 rounded-2xl p-5"><span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-black">Pico histórico de la serie</span><div className="text-3xl font-black text-white mt-2">4.923,3%</div><div className="text-xs text-rose-300 mt-1">1989 · diciembre/diciembre</div></div>
        <div className="bg-slate-900/40 border border-amber-500/20 rounded-2xl p-5"><span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-black">Período bajo reserva</span><div className="text-3xl font-black text-white mt-2">2007–2015</div><div className="text-xs text-slate-400 mt-1">Advertencia metodológica oficial de INDEC</div></div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5"><span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-black">Brecha media en años comparados</span><div className="text-3xl font-black text-white mt-2">{avgGap.toFixed(1)} p.p.</div><div className="text-xs text-slate-400 mt-1">Sólo años con ambas mediciones disponibles</div></div>
      </section>

      <section className="border border-amber-500/25 bg-amber-500/5 rounded-2xl p-5 flex gap-4 items-start">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h2 className="font-bold text-amber-200 text-sm">Advertencia metodológica imprescindible</h2>
          <p className="text-xs text-slate-300 leading-relaxed">La serie 1983–actualidad atraviesa distintas bases y metodologías. INDEC documenta cambios de base y, además, advierte que las estadísticas publicadas con posterioridad a enero de 2007 y hasta diciembre de 2015 deben considerarse con reservas salvo revisiones posteriores. Los faltantes se muestran como “Sin datos verificados”.</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href={INFLATION_METHODOLOGY_LINKS.indecHistoricalArchive} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-amber-300 hover:underline inline-flex items-center gap-1">Archivo histórico INDEC <ExternalLink className="w-3 h-3" /></a>
            <a href={INFLATION_METHODOLOGY_LINKS.indecHistoricalWarning} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-amber-300 hover:underline inline-flex items-center gap-1">Advertencia histórica INDEC <ExternalLink className="w-3 h-3" /></a>
            <a href={INFLATION_METHODOLOGY_LINKS.indecFaq} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-amber-300 hover:underline inline-flex items-center gap-1">Cambios de base / FAQ <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-400" /> Variación anual (%)</h2><p className="text-xs text-slate-500 mt-1">Diciembre contra diciembre cuando corresponde. Los años sin datos verificados quedan como huecos en el gráfico.</p></div><div className="flex flex-wrap gap-2 text-xs"><button onClick={() => setShowOfficial(v => !v)} className={`px-3 py-2 rounded-lg border cursor-pointer ${showOfficial ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-500'}`}>Serie oficial/publicada</button><button onClick={() => setShowAlternative(v => !v)} className={`px-3 py-2 rounded-lg border cursor-pointer ${showAlternative ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-slate-800 text-slate-500'}`}>Privada / alternativa</button></div></div>
        <div className="w-full h-[420px] bg-slate-950/40 rounded-xl border border-slate-900 p-2 sm:p-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 12, right: 22, left: 0, bottom: 8 }}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b" /><XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} interval={2} /><YAxis stroke="#64748b" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} /><Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 12, fontSize: 12 }} labelStyle={{ color: '#fff', fontWeight: 700 }} formatter={(value: any, name: any) => [value == null ? 'Sin datos verificados' : `${Number(value).toLocaleString('es-AR')}%`, name === 'oficial' ? 'Oficial / publicada' : 'Privada / alternativa']} /><Legend wrapperStyle={{ fontSize: 11 }} /><Line type="monotone" dataKey="oficial" name="Oficial / publicada" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} /><Line type="monotone" dataKey="alternativa" name="Privada / alternativa" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} connectNulls={false} /></LineChart></ResponsiveContainer></div>
      </section>

      <section className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
        <button onClick={() => setShowTable(v => !v)} className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-900/60 transition"><div><h2 className="font-bold text-white text-sm">Tabla completa y fuentes por año</h2><p className="text-[11px] text-slate-500 mt-0.5">Cada observación conserva su procedencia. Los faltantes se declaran.</p></div><span className="font-mono text-xs text-emerald-400">{showTable ? 'Ocultar' : 'Mostrar'}</span></button>
        {showTable && <div className="overflow-x-auto border-t border-slate-800"><table className="w-full text-left text-xs"><thead className="bg-slate-950/60 text-[10px] uppercase tracking-wider font-mono text-slate-500"><tr><th className="px-4 py-3">Año</th><th className="px-4 py-3">Oficial / publicada</th><th className="px-4 py-3">Privada / alternativa</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Fuentes</th></tr></thead><tbody className="divide-y divide-slate-850">{INFLATION_SERIES.map(point => <tr key={point.year} className={point.evidence === 'oficial_con_reserva' ? 'bg-amber-500/[0.025]' : ''}><td className="px-4 py-3 font-mono font-bold text-white">{point.year}</td><td className="px-4 py-3"><div className={`font-bold ${point.official === null ? 'text-slate-500' : 'text-emerald-300'}`}>{formatPct(point.official)}</div><div className="text-[10px] text-slate-500 mt-0.5 max-w-[240px]">{point.official === null ? 'No se encontró una observación oficial homogénea y verificable para este período.' : point.officialLabel}</div></td><td className="px-4 py-3"><div className={`font-bold ${point.alternative === null ? 'text-slate-500' : 'text-amber-300'}`}>{formatPct(point.alternative)}</div><div className="text-[10px] text-slate-500 mt-0.5 max-w-[240px]">{point.alternative === null ? 'No hay una serie privada/alternativa verificable y comparable documentada para este año.' : point.alternativeLabel}</div></td><td className="px-4 py-3">{point.evidence === 'oficial_con_reserva' ? <span className="inline-flex px-2 py-1 rounded border border-amber-500/20 bg-amber-500/5 text-amber-300 font-mono text-[9px] uppercase">Con reserva</span> : point.evidence === 'referencia' ? <span className="inline-flex px-2 py-1 rounded border border-slate-700 text-slate-400 font-mono text-[9px] uppercase">Transición</span> : <span className="inline-flex px-2 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 font-mono text-[9px] uppercase">Oficial</span>}{point.note && <p className="text-[10px] text-slate-500 mt-2 max-w-xs leading-relaxed">{point.note}</p>}</td><td className="px-4 py-3"><div className="flex flex-col gap-1.5">{point.official !== null && <a href={point.officialSource} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">Fuente oficial/metodológica <ExternalLink className="w-3 h-3" /></a>}{point.alternativeSource && <a href={point.alternativeSource} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline inline-flex items-center gap-1">Fuente alternativa <ExternalLink className="w-3 h-3" /></a>}{point.official === null && !point.alternativeSource && <span className="text-slate-600">Sin fuente verificable disponible para esa observación.</span>}</div></td></tr>)}</tbody></table></div>}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900/20 space-y-3"><div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /><h3 className="font-bold text-white text-sm">2026: dato en curso</h3></div><p className="text-2xl font-black text-white">{CURRENT_INFLATION_2026.lastMonthlyRate.toLocaleString('es-AR')}% <span className="text-xs font-normal text-slate-500">mensual en {CURRENT_INFLATION_2026.lastMonth}</span></p><p className="text-xs text-slate-400 leading-relaxed">{CURRENT_INFLATION_2026.status} No se compara un parcial 2026 contra años completos.</p><a href={CURRENT_INFLATION_2026.source} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1">Fuente INDEC <ExternalLink className="w-3 h-3" /></a></div>
        <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900/20 space-y-3"><div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" /><h3 className="font-bold text-white text-sm">Regla de integridad de datos</h3></div><p className="text-xs text-slate-400 leading-relaxed">Si no existe una medición verificable para un año, período o metodología comparable, la plataforma lo declara como “Sin datos verificados”. No se interpolan, inventan ni extrapolan cifras para completar la visualización.</p><div className="flex items-start gap-2 text-[10px] text-slate-500"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>Un hueco explícito es metodológicamente preferible a una cifra falsa.</span></div></div>
      </section>
    </div>
  );
}
