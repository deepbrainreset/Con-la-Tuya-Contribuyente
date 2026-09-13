/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Copy, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Donaciones() {
  const [copied, setCopied] = useState(false);
  const donationAlias = 'axonai';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(donationAlias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="donaciones-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Financiamiento Ciudadano y Sostenimiento</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Esta plataforma se sostiene mediante aportes voluntarios. Para evitar errores o transferencias a datos no verificados,
          publicamos únicamente el medio de aporte que se encuentra confirmado por el proyecto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-400" />
              <span>Aportar al proyecto</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Los aportes ayudan a sostener infraestructura, dominio, procesamiento de datos y tareas de verificación de fuentes públicas.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[9px] text-slate-500 font-mono tracking-widest block uppercase">Alias de transferencia verificado</span>
            <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="font-mono text-emerald-400 font-extrabold text-lg select-all">{donationAlias}</span>
              <button
                onClick={handleCopy}
                className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded transition cursor-pointer flex items-center gap-1.5 text-[10px]"
              >
                {copied ? (
                  <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400 font-bold">Copiado</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /><span>Copiar</span></>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2.5 p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[11px] text-amber-200/80 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>No se publica CBU, banco ni titular hasta contar con datos expresamente verificados. Antes de transferir, confirme que su aplicación bancaria resuelva el alias <strong className="text-amber-300">axonai</strong> al destinatario esperado.</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800 tracking-tight">Criterio de transparencia</h3>
          <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Datos de pago mínimos y verificables</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              La página evita exhibir números bancarios, entidades o titulares de ejemplo. Cualquier dato adicional deberá incorporarse sólo después de su verificación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
