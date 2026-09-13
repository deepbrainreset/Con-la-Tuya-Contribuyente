/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Landmark,
  PieChart,
  Search,
  ExternalLink,
  ShoppingCart,
  AlertTriangle,
  FileText,
  BadgeDollarSign,
  Layers3,
  Scale,
  ReceiptText
} from 'lucide-react';
import { PUBLIC_PURCHASES, SPENDING_JURISDICTIONS } from '../data/gastoPublico';

const formatMoney = (value: number | null) => {
  if (value === null) return 'Sin dato verificado';
  if (Math.abs(value) >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)} billones`;
  if (Math.abs(value) >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)} mil millones`;
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)} millones`;
  return `$${Math.round(value).toLocaleString('es-AR')}`;
};

const macroIds = new Set([
  'servicios-sociales',
  'deuda-publica',
  'servicios-economicos',
  'administracion-gubernamental',
  'defensa-seguridad'
]);

export default function GastoPublico() {
  const [selectedJurisId, setSelectedJurisId] = useState('nacion');
  const [detailMode, setDetailMode] = useState<'general' | 'detalle'>('general');
  const [query, setQuery] = useState('');

  const jurisdiction = SPENDING_JURISDICTIONS.find(item => item.id === selectedJurisId) || SPENDING_JURISDICTIONS[0];

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return jurisdiction.categories
      .filter(item => detailMode === 'detalle' || macroIds.has(item.id))
      .filter(item => !normalized || `${item.name} ${item.description}`.toLowerCase().includes(normalized));
  }, [jurisdiction, detailMode, query]);

  const purchases = useMemo(
    () => PUBLIC_PURCHASES.filter(item => selectedJurisId === 'nacion' ? item.jurisdictionId === 'nacion' : item.jurisdictionId === selectedJurisId),
    [selectedJurisId]
  );

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="gasto-publico-view">
      <header className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
          <Landmark className="w-4 h-4" />
          <span>Destino del dinero de los contribuyentes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Gasto Público y Compras del Estado</h1>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Explorá cuánto presupuesto administra cada nivel del Estado, en qué funciones se asigna y qué porcentaje representa. En el nivel de detalle se vinculan partidas y compras con la fuente oficial, y cuando existe una referencia privada suficientemente comparable se calcula la diferencia de precio sin presumir sobreprecio por defecto.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-5 space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">Nivel / jurisdicción</label>
          <select
            value={selectedJurisId}
            onChange={event => { setSelectedJurisId(event.target.value); setQuery(''); }}
            className="w-full min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {SPENDING_JURISDICTIONS.map(item => (
              <option key={item.id} value={item.id}>{item.level} — {item.name}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-4 space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">Buscar rubro</label>
          <div className="min-h-11 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Educación, salud, pauta, energía..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDetailMode('general')}
            className={`min-h-11 rounded-xl border text-xs font-bold transition ${detailMode === 'general' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
          >
            Resumen breve
          </button>
          <button
            type="button"
            onClick={() => setDetailMode('detalle')}
            className={`min-h-11 rounded-xl border text-xs font-bold transition ${detailMode === 'detalle' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
          >
            Ver detalle
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric title="Presupuesto aprobado" value={formatMoney(jurisdiction.approvedBudget)} note={`Período: ${jurisdiction.period}`} />
        <Metric title="Presupuesto ejecutado" value={formatMoney(jurisdiction.executedBudget)} note={jurisdiction.executedAsOf ? `Corte de referencia: ${jurisdiction.executedAsOf}` : 'Sin corte de ejecución cargado.'} />
        <Metric title="Cobertura cargada" value={jurisdiction.categories.length ? `${jurisdiction.categories.length} rubros` : 'Pendiente'} note="Sólo cuenta rubros con fuente individual cargada." />
      </section>

      <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-sm text-sky-50 leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
        <p>{jurisdiction.evidenceNote}</p>
      </div>

      {visibleCategories.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            {detailMode === 'general' ? <PieChart className="w-5 h-5 text-emerald-400" /> : <Layers3 className="w-5 h-5 text-emerald-400" />}
            <h2 className="text-lg font-bold text-white">
              {detailMode === 'general' ? 'Resumen por grandes finalidades' : 'Detalle funcional y rubros específicos'}
            </h2>
          </div>

          {detailMode === 'detalle' && (
            <p className="text-xs text-amber-100 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 leading-relaxed">
              El detalle contiene categorías anidadas. Por ejemplo, Educación y Salud forman parte de Servicios sociales; por eso no deben sumarse nuevamente al total macro.
            </p>
          )}

          <div className="space-y-3">
            {visibleCategories.map(category => (
              <article key={category.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-white">{category.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{category.description}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <strong className="font-mono text-lg text-white block">{formatMoney(category.amount)}</strong>
                    <span className="text-xs font-mono text-emerald-300">
                      {category.share === null ? 'Participación: sin dato verificado' : `${category.share.toFixed(2)}% del presupuesto`}
                    </span>
                  </div>
                </div>

                {category.share !== null && (
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, category.share)}%` }} />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-mono">{category.period} · {category.sourceLabel}</span>
                  <a href={category.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 hover:underline font-semibold">
                    Ver fuente oficial <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <h2 className="font-bold text-white">Sin desglose verificado cargado para esta selección</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            La jurisdicción permanece visible para que la ausencia de información no se confunda con gasto cero. Se incorporarán partidas sólo cuando exista presupuesto/ejecución oficial trazable.
          </p>
          {jurisdiction.sources.map(source => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-emerald-300 text-xs hover:underline">
              {source.label} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </section>
      )}

      <section className="space-y-4 pt-2">
        <div className="flex items-start gap-3">
          <ShoppingCart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-white">Auditoría de compras: Estado vs mercado privado</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
              Cada comparación exige el mismo producto o una especificación suficientemente equivalente, misma unidad, fecha cercana, impuestos, volumen y condiciones de entrega. Una diferencia de precio no se etiqueta automáticamente como corrupción o sobreprecio.
            </p>
          </div>
        </div>

        {purchases.length === 0 ? (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-slate-300">Sin compras verificadas cargadas para esta jurisdicción.</div>
        ) : purchases.map(purchase => {
          const canCompare = purchase.awardedUnitPrice !== null && purchase.privateReferenceUnitPrice !== null;
          const difference = canCompare
            ? ((purchase.awardedUnitPrice! - purchase.privateReferenceUnitPrice!) / purchase.privateReferenceUnitPrice!) * 100
            : null;

          return (
            <article key={purchase.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider">{purchase.agency}</span>
                    <h3 className="font-bold text-white mt-1">{purchase.item}</h3>
                    <p className="text-xs text-slate-300 mt-1">{purchase.specification}</p>
                  </div>
                  <span className={`w-fit px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${canCompare ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-200'}`}>
                    {canCompare ? 'COMPARABLE' : 'COMPARACIÓN NO CONCLUYENTE'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Proceso {purchase.processNumber} · Expediente {purchase.fileNumber} · {purchase.date}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-slate-800">
                <PurchaseMetric icon={<ReceiptText className="w-4 h-4" />} title="Precio unitario estatal" value={purchase.awardedUnitPrice === null ? 'No vinculado todavía' : formatMoney(purchase.awardedUnitPrice)} />
                <PurchaseMetric icon={<BadgeDollarSign className="w-4 h-4" />} title="Referencia privada" value={purchase.privateReferenceUnitPrice === null ? 'Sin referencia' : formatMoney(purchase.privateReferenceUnitPrice)} />
                <PurchaseMetric icon={<Scale className="w-4 h-4" />} title="Diferencia comparable" value={difference === null ? 'No calculable' : `${difference >= 0 ? '+' : ''}${difference.toFixed(1)}%`} />
              </div>

              <div className="p-5 bg-slate-950/40 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">{purchase.comparisonNote}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={purchase.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold hover:underline">
                    Ver compra oficial en COMPR.AR <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {purchase.privateReferenceUrl && (
                    <a href={purchase.privateReferenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-sky-300 font-semibold hover:underline">
                      Ver referencia de mercado <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                {purchase.privateReferenceLabel && <p className="text-[10px] font-mono text-slate-400">{purchase.privateReferenceLabel}</p>}
              </div>
            </article>
          );
        })}
      </section>

      <section className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-400" /><h2 className="font-bold text-white">Fuentes de esta jurisdicción</h2></div>
        <div className="space-y-2">
          {jurisdiction.sources.length === 0 ? (
            <p className="text-sm text-slate-300">Sin fuente oficial individual cargada todavía.</p>
          ) : jurisdiction.sources.map(source => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-xs text-slate-300 hover:text-white">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-emerald-300">{source.label}</strong> · consultada {source.retrievedAt}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-w-0">
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300 block">{title}</span>
      <strong className="text-lg font-mono text-white block mt-1 break-words">{value}</strong>
      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{note}</p>
    </div>
  );
}

function PurchaseMetric({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="p-5 min-w-0">
      <div className="flex items-center gap-2 text-slate-300">{icon}<span className="text-[10px] uppercase font-mono tracking-wider">{title}</span></div>
      <strong className="text-base font-mono text-white block mt-2 break-words">{value}</strong>
    </div>
  );
}
