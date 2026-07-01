/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { TrendingUp, Landmark, FileText, AlertCircle, Sparkles, PieChart, Users, HardDrive, ShoppingCart, Activity } from 'lucide-react';

export default function GastoPublico() {
  const [selectedJurisId, setSelectedJurisId] = useState<string>('nacion');

  const budgetItems = [
    { title: 'Presupuesto Aprobado 2026', amount: 52000000000000, desc: 'Suma total habilitada por Ley de Presupuesto del Congreso.' },
    { title: 'Presupuesto Ejecutado a la Fecha', amount: 21840000000000, desc: 'Fondos efectivamente devengados y pagados según registros de Hacienda.' },
    { title: 'Ahorro / Superávit Financiero Estimado', amount: 312000000000, desc: 'Inferencia contable acumulada tras egreso primario.' }
  ];

  const breakdownStats = [
    { label: 'Sueldos Públicos & Previsional', percent: 42, value: '21.8 Billones ARS', color: 'bg-emerald-500' },
    { label: 'Subsidios Económicos (Luz, Transporte)', percent: 18, value: '9.3 Billones ARS', color: 'bg-amber-400' },
    { label: 'Obra Pública & Infraestructura', percent: 11, value: '5.7 Billones ARS', color: 'bg-blue-500' },
    { label: 'Transferencias Discrecionales a Provincias', percent: 9, value: '4.6 Billones ARS', color: 'bg-purple-500' },
    { label: 'Intereses de Deuda Pública', percent: 14, value: '7.2 Billones ARS', color: 'bg-rose-500' },
    { label: 'Estructura Administrativa y Otros', percent: 6, value: '3.1 Billones ARS', color: 'bg-slate-500' }
  ];

  const suppliers = [
    { rank: '#1', name: 'Constructora Austral S.A. (Infraestructura)', rache: 'Obra Pública Vial', amount: '$145.000 Millones' },
    { rank: '#2', name: 'Energía Argentina S.A. (ENARSA)', rache: 'Importación Gas / Combustibles', amount: '$110.000 Millones' },
    { rank: '#3', name: 'Sistemas Federales S.R.L. (Tecnología)', rache: 'Soporte y Ciberseguridad AFIP', amount: '$42000 Millones' },
    { rank: '#4', name: 'Distribuidora Panamericana', rache: 'Abasto Social de Emergencia', amount: '$24000 Millones' }
  ];

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="gasto-publico-view">
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Presupuesto y Destino de los Fondos Públicos</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Mapeo analítico del gasto del Estado. Podés ver cuánto se proyecta gastar (Presupuesto aprobado) vs cuánto se gasta 
            realmente (Presupuesto ejecutado), junto con las transferencias por obra pública y subsidios.
          </p>
        </div>

        {/* PROMINENT DEMO MOCK BADGE */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 select-none" />
          <span className="text-[10px] text-amber-400 font-mono font-black tracking-widest block uppercase">
            Módulo Futuro — Dato de ejemplo / Simulado
          </span>
        </div>
      </div>

      {/* WARNING NOTIFICATION */}
      <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-xs space-y-1 block leading-normal text-slate-350">
        <span className="font-bold text-white uppercase tracking-wider block">CONSTITUCIÓN DE DATOS EXPERIMENTALES</span>
        <p className="text-[11px] text-slate-400">
          De acuerdo con nuestra metodología de transparencia, este módulo se presenta como propuesta de visualización de interfaces. 
          Los presupuestos consolidados de los 135 municipios bonaerenses y entes descentralizados se incorporarán plenamente en la fase 2.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Overview Metrics and Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wide block">{item.title}</span>
                <p className="text-sm font-black text-white font-mono">
                  {item.amount >= 1000000000000 ? `$${(item.amount / 1000000000000).toFixed(1)} Billones` : `$${(item.amount / 1000000).toFixed(0)} Millones`}
                </p>
                <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Visual chart representation of the spending partition */}
          <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-5">
            <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Distribución por Grandes Partidas de Gasto (Estimado)</span>
            </h3>

            {/* Custom visual progress list as a graph alternative */}
            <div className="space-y-4">
              {breakdownStats.map((stat, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold">{stat.label}</span>
                    <span className="font-mono text-slate-400">{stat.value} ({stat.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                    <div
                      style={{ width: `${stat.percent}%` }}
                      className={`h-full ${stat.color} transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Suppliers and Auditable Contractors Table (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Principales Proveedores y Obras Adjudicadas</span>
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Inferencia de contrataciones vigentes simuladas según las partidas de obras públicas de fomento.
            </p>
          </div>

          <div className="space-y-3">
            {suppliers.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono font-extrabold">{item.rank}</span>
                    <span className="font-bold text-slate-200">{item.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">Rubro: {item.rache}</span>
                </div>
                <div className="text-right font-mono font-bold text-emerald-400">
                  {item.amount}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 text-[11px] text-slate-500 text-center">
            Próximamente: Integración mediante scripts ETL automáticos con el boletín oficial de acreditaciones de proveedores.
          </div>
        </div>
      </div>
    </div>
  );
}
