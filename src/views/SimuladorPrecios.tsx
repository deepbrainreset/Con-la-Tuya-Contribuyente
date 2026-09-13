/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { ShoppingBag, ChevronRight, Info, AlertTriangle, Layers3, ReceiptText, Repeat2, Landmark, Factory, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../data/productos';
import { PRODUCT_TAX_CHAINS, TaxChainItem } from '../data/cadenaTributaria';
import { TAX_POLITICAL_PROFILES, findTaxPoliticalProfile } from '../data/impactoTributarioPolitico';

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
  const modeledProductionCost = values.base + values.logistics;
  const shelfUpliftOverProduction = modeledProductionCost > 0 ? ((values.total - modeledProductionCost) / modeledProductionCost) * 100 : 0;
  const taxUpliftOverProduction = modeledProductionCost > 0 ? (totalTaxes / modeledProductionCost) * 100 : 0;
  const grossMarginShelf = values.total > 0 ? (values.margin / values.total) * 100 : 0;
  const grossMarkupOnProduction = modeledProductionCost > 0 ? (values.margin / modeledProductionCost) * 100 : 0;

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
      const profile = findTaxPoliticalProfile(tax.taxName);
      const canonical = profile?.canonicalName || tax.taxName;
      const key = `${canonical}-${tax.mechanism}`;
      const prev = map.get(key) || { name: canonical, mechanism: tax.mechanism, count: 0, amount: 0 };
      prev.count += 1;
      prev.amount += tax.amount;
      map.set(key, prev);
    }));
    return Array.from(map.values()).filter(item => item.count > 1).sort((a, b) => b.amount - a.amount);
  }, [stageRows]);

  const iibbCascade = useMemo(() => {
    const entries = stageRows.flatMap(stage => stage.taxes
      .filter(tax => findTaxPoliticalProfile(tax.taxName)?.id === 'iibb')
      .map(tax => ({ stage: stage.name, amount: tax.amount, shelfPercent: tax.shelfPercent }))
    );
    const amount = entries.reduce((sum, item) => sum + item.amount, 0);
    return { entries, amount, shelfPercent: values.total > 0 ? (amount / values.total) * 100 : 0 };
  }, [stageRows, values.total]);

  const politicalProfiles = useMemo(() => {
    const ids = new Set<string>();
    stageRows.forEach(stage => stage.taxes.forEach(tax => {
      const profile = findTaxPoliticalProfile(tax.taxName);
      if (profile) ids.add(profile.id);
    }));
    ['cheque', 'sellos', 'ganancias_empresa'].forEach(id => ids.add(id));
    return TAX_POLITICAL_PROFILES.filter(profile => ids.has(profile.id));
  }, [stageRows]);

  const occurrenceCount = (profileId: string) => stageRows.reduce(
    (count, stage) => count + stage.taxes.filter(tax => findTaxPoliticalProfile(tax.taxName)?.id === profileId).length,
    0
  );

  const totalOccurrences = stageRows.reduce((sum, stage) => sum + stage.taxes.length, 0);

  return (
    <div className="space-y-8 py-4 text-left" id="simulador-precios-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Cadena Impositiva hasta la Góndola</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Visualizá qué impuestos y tasas aparecen en cada eslabón, quién los creó o modificó, su contexto político, cuántas veces reaparecen y cuánto explican del precio final. El modelo separa carga tributaria, costo productivo y margen empresario para no confundir impuestos con ganancia.
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
                  <div className="flex items-center gap-3"><ShoppingBag className={`w-4 h-4 ${selected ? 'text-emerald-400' : 'text-slate-500'}`} /><span className="font-bold text-xs">{prod.name}</span></div>
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
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Apariciones tributarias</span><strong className="text-xl text-white font-mono">{totalOccurrences || '—'}</strong></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2"><Factory className="w-4 h-4 text-emerald-400" /><h2 className="font-bold text-white">Del costo productivo al precio de góndola</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Metric title="Costo productivo/logístico modelado" value={money(modeledProductionCost)} note="No equivale a costo contable auditado." />
              <Metric title="Suba por carga tributaria" value={`+${pct(taxUpliftOverProduction)}`} note="Tributos identificados / costo modelado." tone="rose" />
              <Metric title="Suba total hasta góndola" value={`+${pct(shelfUpliftOverProduction)}`} note="Incluye impuestos y margen modelado." />
              <Metric title="Margen comercial bruto" value={money(values.margin)} note="Antes de gastos y Ganancias." tone="emerald" />
              <Metric title="Margen / precio final" value={pct(grossMarginShelf)} note="Participación del margen en góndola." tone="emerald" />
              <Metric title="Markup / costo modelado" value={pct(grossMarkupOnProduction)} note="No es utilidad neta del empresario." tone="emerald" />
            </div>
            <div className="flex gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[11px] text-amber-100/80 leading-relaxed"><TrendingUp className="w-4 h-4 text-amber-400 shrink-0" /><p><strong>Potencial empresario:</strong> el margen bruto es lo que queda en el modelo antes de salarios administrativos, alquileres, financiación, amortizaciones, pérdidas, seguros, marketing, impuestos sobre la renta y otros gastos. No es ganancia neta.</p></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2"><ReceiptText className="w-4 h-4 text-emerald-400" /><h2 className="font-bold text-white">Carga total por nivel del Estado</h2></div>
            {[['Nación', values.national], ['Provincia', values.provincial], ['Municipio', values.municipal]].map(([label, amount]) => {
              const val = Number(amount); const share = values.total > 0 ? val / values.total * 100 : 0;
              return <div key={String(label)} className="grid grid-cols-12 gap-3 items-center text-xs"><span className="col-span-3 text-slate-300 font-semibold">{label}</span><div className="col-span-5 h-2 bg-slate-950 rounded overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, share * 2)}%` }} /></div><span className="col-span-2 text-right font-mono text-white">{money(val)}</span><span className="col-span-2 text-right font-mono text-slate-400">{pct(share)}</span></div>;
            })}
          </div>

          {chain ? <>
            {iibbCascade.entries.length > 1 && <div className="bg-rose-500/5 border border-rose-500/25 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3"><Repeat2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" /><div><h2 className="font-bold text-white">Efecto cascada de Ingresos Brutos</h2><p className="text-xs text-slate-400 mt-1 leading-relaxed">IIBB puede gravar productor, industria, mayorista y minorista sin un crédito fiscal general equivalente al IVA. Cada eslabón compra sobre un precio que ya puede contener IIBB previo.</p></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{iibbCascade.entries.map((entry, idx) => <div key={`${entry.stage}-${idx}`} className="p-3 bg-slate-950/50 border border-rose-500/10 rounded-xl"><span className="text-[9px] uppercase font-mono text-slate-500 block">{entry.stage}</span><div className="flex justify-between gap-3 mt-1"><strong className="text-xs text-white">IIBB atribuido</strong><span className="font-mono text-rose-300 text-xs">{money(entry.amount)} · {pct(entry.shelfPercent)}</span></div></div>)}</div>
              <div className="pt-3 border-t border-rose-500/10 flex flex-col sm:flex-row sm:items-end justify-between gap-2"><div><span className="text-[9px] uppercase font-mono text-slate-500 block">IIBB acumulado estimado incorporado al precio</span><strong className="font-mono text-xl text-rose-300">{money(iibbCascade.amount)}</strong></div><strong className="font-mono text-xl text-white">{pct(iibbCascade.shelfPercent)} de góndola</strong></div>
            </div>}

            <div className="space-y-4">
              <div className="flex items-center gap-2"><Layers3 className="w-4 h-4 text-emerald-400" /><h2 className="text-base font-bold text-white">Etapas de producción, distribución y venta</h2></div>
              {stageRows.map((stage, index) => <div key={stage.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><span className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">Etapa {index + 1}</span><h3 className="font-bold text-white">{stage.name}</h3><p className="text-[11px] text-slate-500">{stage.description}</p></div><div className="text-right"><span className="text-[9px] uppercase font-mono text-slate-500 block">Carga atribuida a etapa</span><strong className="font-mono text-white">{money(stage.stageTaxAmount)} · {pct(stage.stageShelfPercent)}</strong></div></div>
                <div className="overflow-x-auto"><table className="w-full text-xs"><thead className="text-[9px] uppercase font-mono text-slate-500 border-b border-slate-800"><tr><th className="p-3 text-left">Impuesto / tasa</th><th className="p-3 text-left">Nivel</th><th className="p-3 text-left">Incidencia</th><th className="p-3 text-right">Monto</th><th className="p-3 text-right">% góndola</th></tr></thead><tbody className="divide-y divide-slate-800/60">{stage.taxes.map(tax => <tr key={tax.id} className="align-top"><td className="p-3"><span className="font-bold text-slate-200 block">{tax.taxName}</span><span className="text-[10px] text-slate-500 leading-relaxed block mt-1">{tax.note}</span>{tax.nominalRate && <span className="text-[9px] text-emerald-400 font-mono">Alícuota/criterio: {tax.nominalRate}</span>}</td><td className="p-3 text-slate-400">{tax.level}</td><td className="p-3"><span className={`px-2 py-1 rounded text-[9px] font-mono ${tax.mechanism === 'acumulativo' ? 'bg-rose-500/10 text-rose-300' : tax.mechanism === 'credito_fiscal' ? 'bg-sky-500/10 text-sky-300' : 'bg-amber-500/10 text-amber-300'}`}>{tax.mechanism.replace('_', ' ')}</span></td><td className="p-3 text-right font-mono text-white">{money(tax.amount)}</td><td className="p-3 text-right font-mono text-emerald-400">{pct(tax.shelfPercent)}</td></tr>)}</tbody></table></div>
              </div>)}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"><h2 className="text-sm font-bold text-white">Tributos que aparecen en más de una etapa</h2>{repeatedTaxes.length === 0 ? <p className="text-xs text-slate-500">No hay tributos repetidos identificados en este modelo.</p> : <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{repeatedTaxes.map(item => <div key={`${item.name}-${item.mechanism}`} className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl"><div className="flex justify-between gap-3"><strong className="text-xs text-white">{item.name}</strong><span className="text-[9px] font-mono text-emerald-400">{item.count} etapas</span></div><div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400"><span>{item.mechanism.replace('_', ' ')}</span><span>{money(item.amount)} · {pct(values.total > 0 ? item.amount / values.total * 100 : 0)}</span></div></div>)}</div>}</div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-400" /><h2 className="text-base font-bold text-white">Quién lo puso, contexto político y efecto económico</h2></div>
              <p className="text-[11px] text-slate-500 leading-relaxed">La atribución distingue creación legal, administración política y reformas posteriores. En impuestos provinciales o tasas municipales no se inventa un único “creador nacional”.</p>
              <div className="space-y-3">{politicalProfiles.map(profile => {
                const repetitions = occurrenceCount(profile.id);
                return <details key={profile.id} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4"><summary className="cursor-pointer list-none flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><strong className="text-sm text-white block">{profile.canonicalName}</strong><span className="text-[10px] font-mono text-slate-500">{profile.level} · {profile.impactClass.replace('_', ' ')}</span></div><span className={`text-[10px] font-mono px-2 py-1 rounded ${repetitions > 1 ? 'bg-rose-500/10 text-rose-300' : repetitions === 1 ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{repetitions > 0 ? `${repetitions} aparición${repetitions === 1 ? '' : 'es'} en este producto` : 'Impacto potencial no cuantificado'}</span></summary><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-[11px] leading-relaxed"><div className="space-y-2"><Field label="Origen legal" text={profile.legalOrigin}/><Field label="Responsabilidad / origen político" text={profile.politicalOrigin}/><Field label="Contexto político-fiscal" text={profile.politicalContext}/></div><div className="space-y-2"><Field label="Cómo impacta en góndola" text={profile.shelfImpact}/><Field label="Cuántas veces puede repetirse" text={profile.repetitionRule}/><Field label="Impacto sobre el empresario" text={profile.entrepreneurImpact}/></div></div><div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-2 text-[9px] font-mono"><span className="text-slate-500">{profile.evidenceNote}</span><a href={profile.sourceUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Fuente normativa / técnica</a></div></details>;
              })}</div>
            </div>

            <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl text-xs text-sky-100/80 leading-relaxed"><Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><p><strong className="text-sky-300">Metodología:</strong> IVA puede aparecer en varias etapas pero su débito/crédito fiscal evita tratarlo como cascada pura. IIBB sí puede acumularse sobre facturación sucesiva. Sellos, Cheque y tasas locales también pueden añadir costos en diferentes momentos, pero sólo se cuantifican cuando hay base suficiente para el producto y jurisdicción elegidos.</p></div>
          </> : <div className="flex gap-3 p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-xs text-amber-100/80 leading-relaxed"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><p>Este producto todavía no tiene una cadena por etapas suficientemente documentada. Se mantiene el desglose agregado hasta incorporar fuentes específicas de cada eslabón.</p></div>}
        </section>
      </div>
    </div>
  );
}

function Metric({ title, value, note, tone = 'white' }: { title: string; value: string; note: string; tone?: 'white' | 'rose' | 'emerald' }) {
  const cls = tone === 'rose' ? 'text-rose-300' : tone === 'emerald' ? 'text-emerald-400' : 'text-white';
  return <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl"><span className="text-[9px] uppercase font-mono text-slate-500 block">{title}</span><strong className={`font-mono text-lg ${cls}`}>{value}</strong><p className="text-[9px] text-slate-500 mt-1">{note}</p></div>;
}

function Field({ label, text }: { label: string; text: string }) {
  return <div><span className="text-[9px] uppercase font-mono text-slate-500 block">{label}</span><p className="text-slate-300">{text}</p></div>;
}
