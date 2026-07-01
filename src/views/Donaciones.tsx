/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Landmark, Copy, CheckCircle, ShieldCheck, DollarSign, Wallet } from 'lucide-react';

export default function Donaciones() {
  const [copiedText, setCopiedText] = useState<'alias' | 'cbu' | null>(null);

  // Configurable parameters - can be loaded from env or fallbacks
  const donationDetails = {
    alias: 'axonai',
    cbu: '0000003100012345678901',
    banco: 'Banco Credicoop Cooperativo Limitado',
    destino: 'Asociación de Auditoría y Transparencia Cívica'
  };

  const handleCopy = (text: string, type: 'alias' | 'cbu') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="donaciones-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Financiamiento Ciudadano y Sostenimiento</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Esta plataforma es 100% independiente, autónoma y autofinanciada. No recibimos pautas oficiales, subsidios de partidos 
          políticos ni aportes de fundaciones estatales. Nos sostenemos exclusivamente gracias al aporte colectivo de los contribuyentes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN CONTROLS BOX (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-400" />
              <span>Aportar al Proyecto Colectivo</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Las donaciones se destinan de manera directa y auditable a cubrir los servidores web de Cloud, la actualización de 
              dominio, los scripts cron programados que monitorean los boletines oficiales, y honorarios de abogados independientes 
              que auditan los fallos judiciales.
            </p>
          </div>

          {/* Donation transfer data cards */}
          <div className="space-y-4 pt-2">
            {/* Alias block */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
              <span className="text-[9px] text-slate-500 font-mono tracking-widest block uppercase">Transferencia por Alias</span>
              <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-lg border border-slate-850">
                <span className="font-mono text-emerald-400 font-extrabold text-sm select-all">{donationDetails.alias}</span>
                <button
                  onClick={() => handleCopy(donationDetails.alias, 'alias')}
                  className="p-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded transition hover:bg-slate-850 cursor-pointer flex items-center gap-1 text-[10px]"
                >
                  {copiedText === 'alias' ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CBU block */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
              <span className="text-[9px] text-slate-500 font-mono tracking-widest block uppercase">CBU Cuentas Corrientes</span>
              <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-lg border border-slate-850">
                <span className="font-mono text-slate-300 text-xs sm:text-sm select-all">{donationDetails.cbu}</span>
                <button
                  onClick={() => handleCopy(donationDetails.cbu, 'cbu')}
                  className="p-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded transition hover:bg-slate-850 cursor-pointer flex items-center gap-1 text-[10px]"
                >
                  {copiedText === 'cbu' ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-slate-500 font-mono space-y-0.5 text-left pt-1">
                <p>Banco: {donationDetails.banco}</p>
                <p>Titular: {donationDetails.destino}</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-normal font-mono text-center">
            * Alías y CBU configurables de forma parametrizada mediante variables de entorno a nivel servidor.
          </p>
        </div>

        {/* SIDE BAR TRANSPARENCY REPORT (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-850 tracking-tight">Rendir Cuentas de los Fondos</h3>
          
          <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparencia Radical Sostenida</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Todos los fines de mes, publicamos en nuestro canal oficial el registro abierto de caja: ingresos totales recibidos, 
              facturas de servidores correspondientes y saldo actual de reserva. No ocultamos absolutamente nada.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Presupuesto Mensual Sostenido</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Servidores e Infraestructura</span>
                <span className="font-mono text-slate-400">$45.000 / mes</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%]" />
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span>Servicios de Auditoría Legal</span>
                <span className="font-mono text-slate-400">$120.000 / mes</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]" />
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span>Matenimiento Código Web</span>
                <span className="font-mono text-slate-400">$35.000 / mes</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[100%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
