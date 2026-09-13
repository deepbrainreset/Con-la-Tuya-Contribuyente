/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { ShoppingBag, ChevronRight, Info, AlertTriangle, Layers3, ReceiptText, Repeat2 } from 'lucide-react';
import { PRODUCTS } from '../data/productos';
import { PRODUCT_TAX_CHAINS, TaxChainItem } from '../data/cadenaTributaria';

const money = (value: number) => `$${Math.round(value).toLocaleString('es-AR')}`;
const pct = (value: number) => `${value.toFixed(2)}%`;

export default function SimuladorPrecios() {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [userPriceMultiplier, setUserPriceMultiplier] = useState(1);

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const chain = PRODUCT_TAX_CHAINS.find(c => c.productId === selectedProductId);

  const values = useMemo(() => {
    const totalBase = product.basePrice + product.logistics + product.taxNational + product.taxProvincial + product.taxMunicipal + product.margin;
    return {
      total: totalBase * userPriceMultiplier,
      base: product.basePrice * userPriceMultiplier,
      logistics: product.logistics * userPriceMultiplier,
      national: product.taxNational * userPriceMultiplier,
      provincial: product.taxProvincial * userPriceMultiplier,
      municipal: product.taxMunicipal * userPriceMultiplier,
      margin: product.margin * userPriceMultiplier
    };
  }, [product, userPriceMultiplier]);

  const totalTaxes = values.national + values.provincial + values.municipal;
  const taxShare = values.total > 0 ? (totalTaxes / values.total) * 100 : 0;

  const taxAmountForItem = (tax: TaxChainItem) => {
    const bucket = tax.level === 'Nación' ? values.national : tax.level === 'Provincia' ? values.provincial : values.municipal;
    return bucket * tax.amountShare;
  };

  const stageRows = useMemo(() => {
    if (!chain) return [];
    return chain.stages.map(stage => {
      const taxes = stage.taxes.map(tax => {
        const amount = taxAmountForItem(tax);
        return { ...tax, amount, shelfPercent: values.total > 0 ? (amount / values.total) * 100 : 0 };
      });
      const stageTaxAmount = taxes.reduce((sum, tax) => sum + tax.amount, 0);
      return { ...stage, taxes, stageTaxAmount, stageShelfPercent: values.total > 0 ? (stageTaxAmount / values.total) * 100 : 0 };
    });
  }, [chain, values]);

  const repeatedTaxes = useMemo(() => {
    const map = new Map<string, { name: string; mechanism: string; count: number; amount: number }>();
    stageRows.forEach(stage => stage.taxes.forEach(tax => {
      const normalizedName = tax.taxName.toLowerCase().includes('ingresos brutos')
        ? 'Ingresos Brutos'
        : tax.taxName.toLowerCase().includes('débitos') || tax.taxName.toLowerCase().includes('creditos') || tax.taxName.toLowerCase().includes('créditos')
          ? 'Débitos y Créditos Bancarios'
          : tax.taxName;
      const key = `${normalizedName}-${tax.mechanism}`;
      const prev = map.get(key) || { name: normalizedName, mechanism: tax.mechanism, count: 0, amount: 0 };
      prev.count += 1;
      prev.amount += tax.amount;
      map.set(key, prev);
    }));
    return Array.from(map.values()).filter(item => item.count > 1).sort((a, b) => b.amount - a.amount);
  }, [stageRows]);

  const iibbCascade = useMemo(() => {
    const entries = stageRows.flatMap(stage => stage.taxes
      .filter(tax => tax.taxName.toLowerCase().includes('ingresos brutos'))
      .map(tax => ({ stage: stage.name, amount: tax.amount, shelfPercent: tax.shelfPercent }))
    );
    const amount = entries.reduce((sum, item) => sum + item.amount, 0);
    return {
      entries,
      amount,
      shelfPercent: values.total > 0 ? (amount / values.total) * 100 : 0
    };
  }, [stageRows, values.total]);

  return (
    <div className="space-y-8 py-4 text-left" id="simulador-precios-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Cadena Impositiva hasta la Góndola</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Visualizá en qué etapas aparecen impuestos y tasas, cuánto representan en pesos y qué porcentaje explican del precio final de góndola. El modelo distingue tributos acumulativos de impuestos con crédito fiscal para evitar contar dos veces la misma carga.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 space-y-4">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase pl-1">Producto analizado</span>
          <div className="space-y-2">
            {PRODUCTS.map(prod => {
              const selected = prod.id === selectedProductId;
              return (
                <button key={prod.id} onClick={() => { setSelectedProductId(prod.id); setUserPriceMultiplier(1); }} className={`w-full flex items-center justify-between p-3.5 text-left rounded-xl border transition cursor-pointer ${selected ? 'bg-emerald-500/10 border-emerald-500/35 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`w-4 h-4 ${selected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-xs">{prod.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex justify-between text-[10px] font-mono text-slate-400"><span>Escala del precio</span><span className="text-white font-bold">{Math.round(userPriceMultiplier * 100)}%</span></div>
            <input type="range" min="0.5" max="2.5" step="0.1" value={userPriceMultiplier} onChange={e => setUserPriceMultiplier(Number(e.target.value))} className="w-full accent-emerald-500" />
            <p className="text-[10px] text-slate-500 leading-relaxed">Escala el ejemplo completo manteniendo las proporciones del caso base.</p>
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Precio góndola</span><strong className="text-xl text-emerald-400 font-mono">{money(values.total)}</strong></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Impuestos + tasas</span><strong className="text-xl text-white font-mono">{money(totalTaxes)}</strong></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Carga sobre góndola</span><strong className="text-xl text-white font-mono">{pct(taxShare)}</strong></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Precio sin carga identificada</span><strong className="text-xl text-white font-mono">{money(values.total - totalTaxes)}</strong></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2"><ReceiptText className="w-4 h-4 text-emerald-400" /><h2 className="font-bold text-white">Carga total por nivel del Estado</h2></div>
            {[['Nación', values.national], ['Provincia', values.provincial], ['Municipio', values.municipal]].map(([label, amount]) => {
              const val = Number(amount);
              const share = values.total > 0 ? val / values.total * 100 : 0;
              return <div key={String(label)} className="grid grid-cols-12 gap-3 items-center text-xs"><span className="col-span-3 text-slate-300 font-semibold">{label}</span><div className="col-span-5 h-2 bg-slate-950 rounded overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, share * 2)}%` }} /></div><span className="col-span-2 text-right font-mono text-white">{money(val)}</span><span className="col-span-2 text-right font-mono text-slate-400">{pct(share)}</span></div>;
            })}
          </div>

          {chain ? (
            <>
              {iibbCascade.entries.length > 1 && (
                <div className="bg-rose-500/5 border border-rose-500/25 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Repeat2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-bold text-white">Efecto cascada de Ingresos Brutos</h2>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">Ingresos Brutos puede gravar la facturación de varios eslabones sin un mecanismo general de crédito fiscal equivalente al IVA. Cada etapa alcanzada incorpora ese costo a su precio y el siguiente eslabón compra sobre un valor que ya lo contiene.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {iibbCascade.entries.map((entry, idx) => (
                      <div key={`${entry.stage}-${idx}`} className="p-3 bg-slate-950/50 border border-rose-500/10 rounded-xl">
                        <span className="text-[9px] uppercase font-mono text-slate-500 block">{entry.stage}</span>
                        <div className="flex justify-between gap-3 mt-1"><strong className="text-xs text-white">IIBB atribuido</strong><span className="font-mono text-rose-300 text-xs">{money(entry.amount)} · {pct(entry.shelfPercent)}</span></div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-rose-500/10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div><span className="text-[9px] uppercase font-mono text-slate-500 block">IIBB acumulado estimado incorporado al precio</span><strong className="font-mono text-xl text-rose-300">{money(iibbCascade.amount)}</strong></div>
                    <strong className="font-mono text-xl text-white">{pct(iibbCascade.shelfPercent)} de góndola</strong>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2"><Layers3 className="w-4 h-4 text-emerald-400" /><h2 className="text-base font-bold text-white">Etapas de producción, distribución y venta</h2></div>
                {stageRows.map((stage, index) => (
                  <div key={stage.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div><span className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">Etapa {index + 1}</span><h3 className="font-bold text-white">{stage.name}</h3><p className="text-[11px] text-slate-500">{stage.description}</p></div>
                      <div className="text-right"><span className="text-[9px] uppercase font-mono text-slate-500 block">Carga atribuida a etapa</span><strong className="font-mono text-white">{money(stage.stageTaxAmount)} · {pct(stage.stageShelfPercent)}</strong></div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="text-[9px] uppercase font-mono text-slate-500 border-b border-slate-800"><tr><th className="p-3 text-left">Impuesto / tasa</th><th className="p-3 text-left">Nivel</th><th className="p-3 text-left">Tipo de incidencia</th><th className="p-3 text-right">Monto</th><th className="p-3 text-right">% góndola</th></tr></thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {stage.taxes.map(tax => (
                            <tr key={tax.id} className="align-top"><td className="p-3"><span className="font-bold text-slate-200 block">{tax.taxName}</span><span className="text-[10px] text-slate-500 leading-relaxed block mt-1">{tax.note}</span>{tax.nominalRate && <span className="text-[9px] text-emerald-400 font-mono">Alícuota/criterio: {tax.nominalRate}</span>}</td><td className="p-3 text-slate-400">{tax.level}</td><td className="p-3"><span className={`px-2 py-1 rounded text-[9px] font-mono ${tax.mechanism === 'acumulativo' ? 'bg-rose-500/10 text-rose-300' : tax.mechanism === 'credito_fiscal' ? 'bg-sky-500/10 text-sky-300' : 'bg-amber-500/10 text-amber-300'}`}>{tax.mechanism.replace('_', ' ')}</span></td><td className="p-3 text-right font-mono text-white">{money(tax.amount)}</td><td className="p-3 text-right font-mono text-emerald-400">{pct(tax.shelfPercent)}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-sm font-bold text-white">Tributos que aparecen en más de una etapa</h2>
                {repeatedTaxes.length === 0 ? <p className="text-xs text-slate-500">No hay tributos repetidos identificados en este modelo.</p> : <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{repeatedTaxes.map(item => <div key={`${item.name}-${item.mechanism}`} className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl"><div className="flex justify-between gap-3"><strong className="text-xs text-white">{item.name}</strong><span className="text-[9px] font-mono text-emerald-400">{item.count} etapas</span></div><div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400"><span>{item.mechanism.replace('_', ' ')}</span><span>{money(item.amount)} · {pct(values.total > 0 ? item.amount / values.total * 100 : 0)}</span></div></div>)}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl"><strong className="text-xs text-rose-300 block">Ingresos Brutos</strong><p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Plurifásico y acumulativo. Puede gravar producción, industria, distribución y comercio según actividad y jurisdicción.</p></div>
                <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl"><strong className="text-xs text-rose-300 block">Débitos y Créditos Bancarios</strong><p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Puede repetirse con los movimientos bancarios de los distintos actores de la cadena. Su incidencia neta depende de exenciones y pagos a cuenta.</p></div>
                <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl"><strong className="text-xs text-rose-300 block">Sellos y tasas locales</strong><p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Pueden generar costos en contratos u operaciones sucesivas. Su aplicación concreta depende de la jurisdicción y del hecho imponible.</p></div>
              </div>

              <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl text-xs text-sky-100/80 leading-relaxed"><Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><p><strong className="text-sky-300">Importante:</strong> que IVA aparezca en varias etapas no significa que se sume íntegramente en cada una. El sistema de débito y crédito fiscal netea la carga intermedia. En cambio, Ingresos Brutos es un ejemplo clásico de efecto cascada. Los montos por etapa son una asignación explicativa del total estimado del ejemplo y no una liquidación fiscal individual.</p></div>
            </>
          ) : (
            <div className="flex gap-3 p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-xs text-amber-100/80 leading-relaxed"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><p>Este producto todavía no tiene una cadena por etapas suficientemente documentada en la base. Se mantiene el desglose agregado por Nación, Provincia y Municipio hasta incorporar fuentes específicas de cada eslabón.</p></div>
          )}
        </section>
      </div>
    </div>
  );
}
