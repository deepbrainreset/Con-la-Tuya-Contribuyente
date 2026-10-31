/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  ReceiptText,
  Layers,
  AlertTriangle,
  Scale,
  ExternalLink,
  Zap,
  Droplets,
  Home,
  Repeat,
  History,
  MapPin
} from 'lucide-react';
import {
  CONCEPTUAL_SERVICE_BILLS,
  HISTORICAL_SUBSIDY_SERIES_2001_2026
} from '../data/facturasServiciosSubsidios';

type RegionKey = 'caba' | 'pba_conurbano' | 'cordoba' | 'santa_fe';
type SegmentKey = 'n1' | 'n2' | 'n3';

const REGION_LABELS: Record<RegionKey, string> = {
  caba: 'Ciudad Autónoma de Buenos Aires (CABA)',
  pba_conurbano: 'Provincia de Buenos Aires (Conurbano / GBA)',
  cordoba: 'Provincia de Córdoba',
  santa_fe: 'Provincia de Santa Fe'
};

const SEGMENT_LABELS: Record<SegmentKey, { label: string; desc: string }> = {
  n1: { label: 'Nivel 1 (Ingresos Altos / Tarifa Plena)', desc: 'Menor o nulo subsidio nacional' },
  n3: { label: 'Nivel 3 (Ingresos Medios)', desc: 'Bloque de consumo subsidiado con tope' },
  n2: { label: 'Nivel 2 (Ingresos Bajos / Tarifa Social)', desc: 'Mayor bonificación del Tesoro Nacional' }
};

export default function FacturasServiciosSubsidios() {
  const [selectedServiceId, setSelectedServiceId] = useState<'electricidad' | 'agua' | 'abl_inmobiliario'>('electricidad');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('caba');
  const [selectedSegment, setSelectedSegment] = useState<SegmentKey>('n3');

  const activeService = useMemo(
    () =>
      CONCEPTUAL_SERVICE_BILLS.find(s => s.id === selectedServiceId) ||
      CONCEPTUAL_SERVICE_BILLS[0],
    [selectedServiceId]
  );

  const invoiceCalculation = useMemo(() => {
    const realCost = activeService.realFullMonthlyCostArs;
    const netBilled =
      activeService.defaultNetBilledByRegionAndSegment[selectedRegion][selectedSegment];
    const subsidyAmount = Math.max(0, realCost - netBilled);
    const subsidyPctOfRealCost = realCost > 0 ? (subsidyAmount / realCost) * 100 : 0;

    const taxLines = activeService.taxLinesByRegion[selectedRegion].map(line => {
      const amountArs = Math.round((netBilled * line.percentageOfNetBill) / 100);
      return { ...line, amountArs };
    });

    const totalTaxesArs = taxLines.reduce((acc, item) => acc + item.amountArs, 0);
    const totalFinalBillArs = netBilled + totalTaxesArs;
    const taxShareOfFinalBillPct =
      totalFinalBillArs > 0 ? (totalTaxesArs / totalFinalBillArs) * 100 : 0;
    const totalTaxApplicationsCount = taxLines.reduce(
      (acc, item) => acc + item.timesChargedInChain,
      0
    );

    // Comparación simultánea entre las 4 jurisdicciones para el mismo segmento
    const regionalComparison = (Object.keys(REGION_LABELS) as RegionKey[]).map(reg => {
      const regNet = activeService.defaultNetBilledByRegionAndSegment[reg][selectedSegment];
      const regTaxPct = activeService.taxLinesByRegion[reg].reduce(
        (sum, l) => sum + l.percentageOfNetBill,
        0
      );
      const regTaxes = Math.round((regNet * regTaxPct) / 100);
      return {
        region: reg,
        label: REGION_LABELS[reg],
        netBilled: regNet,
        taxes: regTaxes,
        totalFinal: regNet + regTaxes
      };
    });

    return {
      realCost,
      netBilled,
      subsidyAmount,
      subsidyPctOfRealCost,
      taxLines,
      totalTaxesArs,
      totalFinalBillArs,
      taxShareOfFinalBillPct,
      totalTaxApplicationsCount,
      regionalComparison
    };
  }, [activeService, selectedRegion, selectedSegment]);

  return (
    <div className="space-y-10 py-4 text-left" id="facturas-servicios-subsidios-view">
      {/* Encabezado */}
      <header className="border-b border-slate-800 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <ReceiptText className="w-4 h-4" />
          <span>Radiografía de Boletas Conceptuales · Efecto Cascada (IIBB) · Subsidios Cruzados AMBA vs. Interior</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cuánto cuesta realmente un servicio, cuántas veces te cobran el mismo impuesto y quién paga el subsidio
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
          Desglose conceptual de las boletas de <strong className="text-white">Luz, Agua y ABL/Inmobiliario</strong> a nivel Nación, Provincia y Municipio. Descubrí cuántas veces se aplica <strong className="text-white">Ingresos Brutos y el Impuesto al Cheque en cascada</strong> dentro del mismo servicio (impuesto sobre el impuesto) y cómo evolucionó desde 2001 el subsidio cruzado que millones de contribuyentes de todo el país pagaron sobre las tarifas del AMBA.
        </p>
      </header>

      {/* Selectores Interactivos */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Servicio */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              1. Seleccioná el Servicio / Boleta
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'electricidad', label: 'Luz (350 kWh)', icon: Zap },
                { id: 'agua', label: 'Agua y Cloacas', icon: Droplets },
                { id: 'abl_inmobiliario', label: 'ABL + Inmobiliario', icon: Home }
              ].map(item => {
                const Icon = item.icon;
                const active = selectedServiceId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedServiceId(item.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1.5 transition cursor-pointer ${
                      active
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-center leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Jurisdicción */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-slate-400 block">
              2. Jurisdicción (Nación / Provincia / Municipio)
            </label>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value as RegionKey)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {(Object.keys(REGION_LABELS) as RegionKey[]).map(key => (
                <option key={key} value={key}>
                  {REGION_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Segmento */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-slate-400 block">
              3. Segmentación Tarifaria del Hogar
            </label>
            <select
              value={selectedSegment}
              onChange={e => setSelectedSegment(e.target.value as SegmentKey)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {(Object.keys(SEGMENT_LABELS) as SegmentKey[]).map(key => (
                <option key={key} value={key}>
                  {SEGMENT_LABELS[key].label} — {SEGMENT_LABELS[key].desc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Factura Conceptual Interactiva + Comparación Federal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda (7 cols): La Factura Conceptual */}
        <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                FACTURA CONCEPTUAL AUDITADA · {REGION_LABELS[selectedRegion]}
              </span>
              <h2 className="text-lg font-extrabold text-white mt-0.5">
                {activeService.serviceName}
              </h2>
              <p className="text-[11px] text-slate-400">{activeService.unitDescription}</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-right shrink-0">
              <span className="text-[9px] font-mono uppercase text-rose-300 block">
                Superposición en esta boleta
              </span>
              <strong className="text-sm font-mono font-black text-rose-300">
                {invoiceCalculation.totalTaxApplicationsCount} cobros impositivos en cadena
              </strong>
            </div>
          </div>

          {/* Bloque 1: Costo Real vs. Subsidio Oculto de Terceros */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-[10px] font-mono uppercase text-sky-400 font-bold">
              A. Verdad Económica del Servicio (Antes de Impuestos)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">
                  1. Costo Real Puro del Servicio
                </span>
                <strong className="text-base font-mono text-white">
                  ${invoiceCalculation.realCost.toLocaleString('es-AR')}
                </strong>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Lo que cuesta realmente producirlo y distribuirlo
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <span className="text-[10px] text-amber-300 block">
                  2. Subsidio Pagado por Terceros
                </span>
                <strong className="text-base font-mono text-amber-300">
                  -${invoiceCalculation.subsidyAmount.toLocaleString('es-AR')} ({invoiceCalculation.subsidyPctOfRealCost.toFixed(0)}%)
                </strong>
                <span className="text-[9px] text-amber-200/80 block mt-0.5">
                  Cubierto por el Tesoro Nacional con impuestos de todo el país
                </span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-300 block">
                  3. Neto Tarifario en tu Boleta
                </span>
                <strong className="text-base font-mono text-emerald-300">
                  ${invoiceCalculation.netBilled.toLocaleString('es-AR')}
                </strong>
                <span className="text-[9px] text-emerald-200/80 block mt-0.5">
                  Base sobre la que se agregan los impuestos de abajo
                </span>
              </div>
            </div>
          </div>

          {/* Bloque 2: Renglones Impositivos y Cuántas Veces se Cobra Cada Uno */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
              <span>B. Impuestos Nacionales, Provinciales y Tasas Municipales Cargados</span>
              <span>Veces cobrado / Importe</span>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
              {invoiceCalculation.taxLines.map(line => (
                <div key={line.id} className="p-3.5 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-900 border border-slate-700 text-slate-300">
                          {line.jurisdictionLevel}
                        </span>
                        <strong className="text-xs text-white">{line.concept}</strong>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Norma: {line.legalNorm} ({line.percentageOfNetBill}% sobre neto)
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          line.timesChargedInChain > 1
                            ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Repeat className="w-3 h-3 inline mr-1" />
                        {line.timesChargedInChain} {line.timesChargedInChain === 1 ? 'vez' : 'veces'}
                      </span>
                      <strong className="text-xs font-mono text-white min-w-[75px] text-right">
                        +${line.amountArs.toLocaleString('es-AR')}
                      </strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {line.constitutionalOrLegalNote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 3: Total Final de la Boleta */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Total Final que Paga el Vecino en la Boleta
              </span>
              <span className="text-xs text-slate-300">
                Impuestos y tasas representan el{' '}
                <strong className="text-white">
                  {invoiceCalculation.taxShareOfFinalBillPct.toFixed(1)}%
                </strong>{' '}
                del total facturado (+{' '}
                <strong className="text-rose-300">
                  ${invoiceCalculation.totalTaxesArs.toLocaleString('es-AR')}
                </strong>{' '}
                en tributos)
              </span>
            </div>
            <strong className="text-2xl font-mono font-black text-emerald-400">
              ${invoiceCalculation.totalFinalBillArs.toLocaleString('es-AR')}
            </strong>
          </div>
        </section>

        {/* Columna Derecha (5 cols): Asimetría Federal CABA vs. GBA vs. Interior */}
        <aside className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Comparación Federal por el Mismo Consumo ({SEGMENT_LABELS[selectedSegment].label})
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeService.federalDisparitySummary}
            </p>

            <div className="space-y-3 pt-1">
              {invoiceCalculation.regionalComparison.map(item => {
                const maxTotal = Math.max(
                  ...invoiceCalculation.regionalComparison.map(r => r.totalFinal)
                );
                const widthPct = maxTotal > 0 ? (item.totalFinal / maxTotal) * 100 : 0;
                const isCurrent = item.region === selectedRegion;
                return (
                  <div
                    key={item.region}
                    className={`p-3 rounded-xl border space-y-1.5 ${
                      isCurrent
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-white">{item.label}</strong>
                      <span className="font-mono font-bold text-emerald-400">
                        ${item.totalFinal.toLocaleString('es-AR')}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/80 rounded-full"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Servicio neto: ${item.netBilled.toLocaleString('es-AR')}</span>
                      <span>Impuestos/Tasas: +${item.taxes.toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marco Constitucional sobre Doble Imposición e IIBB */}
          <div className="bg-amber-950/15 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase font-bold">
              <Scale className="w-4 h-4" />
              <span>Por qué es inconstitucional e ilegal la múltiple imposición</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              1. <strong className="text-white">Ley 23.548 de Coparticipación Federal (Art. 9 inc. b):</strong> Las provincias y sus municipios se obligaron a <strong className="text-amber-300">no aplicar gravámenes locales análogos a los impuestos nacionales coparticipados (como el IVA)</strong>. Sin embargo, los municipios cobran Tasas de Seguridad e Higiene (TISH) calculadas sobre los ingresos brutos del comercio o industria, funcionando como un tercer IVA/IIBB encubierto.
            </p>
            <p className="text-xs text-slate-200 leading-relaxed">
              2. <strong className="text-white">Doctrina de la Corte Suprema (Fallos «Laboratorios Raffo», «Quilpe» y «Esso»):</strong> Una tasa municipal sólo es constitucional si retribuye un servicio público individualizado, efectivamente prestado y guarda razonable proporción con su costo. Cobrar «Alumbrado Público» en el ABL y volver a cobrarlo como porcentaje de la boleta de luz constituye doble imposición sin contraprestación adicional.
            </p>
          </div>
        </aside>
      </div>

      {/* Radiografía del Efecto Cascada (Cómo Ingresos Brutos y Cheque se cobran 3 a 4 veces) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Efecto Piramidación: Cómo te cobran 3 a 4 veces Ingresos Brutos y el Impuesto al Cheque dentro del mismo servicio
          </h2>
        </div>
        <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
          A diferencia del IVA (que descuenta el crédito fiscal de la etapa anterior), <strong className="text-white">Ingresos Brutos (IIBB)</strong> y el <strong className="text-white">Impuesto al Cheque (Ley 25.413)</strong> son plurifásicos y acumulativos: cada eslabón aplica la alícuota sobre el precio bruto total, que ya incluye los impuestos pagados por todos los eslabones anteriores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {activeService.cascadeStages.map(stage => (
            <div
              key={stage.stageNumber}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 font-bold">
                    ESLABÓN {stage.stageNumber}
                  </span>
                  <span className="text-slate-400">+{stage.statutoryRatePct}% directo</span>
                </div>
                <h3 className="text-xs font-bold text-white">{stage.stageName}</h3>
                <div className="text-[11px] font-mono text-emerald-400">{stage.actor}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{stage.explanation}</p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-amber-300">
                Tributo aplicado: {stage.taxApplied}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Serie Histórica 2001–2026: Cuánto costaban los servicios y cuánto pagaban terceros vía subsidios */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Serie Histórica (2001–2026): Qué porcentaje de la boleta de Luz y Agua en el AMBA pagó el usuario y cuánto pagaron terceros
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
            Durante más de 15 años, las facturas residenciales de electricidad y agua (AySA) en CABA y el Gran Buenos Aires reflejaron entre el <strong className="text-white">14% y el 25% del costo real del servicio</strong>. El 75% a 86% restante no era «gratis»: fue pagado por terceros desde las 24 jurisdicciones mediante impuestos nacionales (IVA, Ganancias, Retenciones, Impuesto al Cheque) y emisión monetaria inflacionaria.
          </p>
        </div>

        <div className="md:hidden text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span>↔ Deslizá la tabla horizontalmente para consultar todas las columnas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-3">Año / Gestión</th>
                <th className="py-3 px-3">Luz: Pagado en Boleta</th>
                <th className="py-3 px-3">Luz: Subsidiado por Terceros</th>
                <th className="py-3 px-3">Agua (AySA AMBA): Subsidio Tesoro</th>
                <th className="py-3 px-3">Evidencia Histórica y Efecto Federal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {HISTORICAL_SUBSIDY_SERIES_2001_2026.map(row => (
                <tr key={row.year} className="hover:bg-slate-950/60">
                  <td className="py-3.5 px-3 font-mono">
                    <strong className="text-white block text-sm">{row.year}</strong>
                    <span className="text-[10px] text-slate-400">{row.presidency}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 font-bold">
                      {row.electricityUserPaidPct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span
                      className={`px-2 py-1 rounded font-bold ${
                        row.electricitySubsidizedByThirdPartiesPct >= 50
                          ? 'bg-rose-500/15 text-rose-300'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {row.electricitySubsidizedByThirdPartiesPct}% pagado por terceros
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-300 font-bold">
                      {row.aysaWaterSubsidizedByNationalTreasuryPct}% Tesoro Nacional
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 max-w-md leading-relaxed">
                    {row.historicalNote}{' '}
                    <a
                      href={row.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono text-[10px]"
                    >
                      Fuente <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
