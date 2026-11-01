/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ReceiptText } from 'lucide-react';
import ServiciosVerificados from '../components/ServiciosVerificados';

export default function FacturasServiciosSubsidios() {
  return (
    <div className="space-y-8 py-4 text-left" id="facturas-servicios-subsidios-view">
      <header className="border-b border-slate-800 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
          <ReceiptText className="w-4 h-4" aria-hidden="true" />
          <span>Servicios públicos y tributos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Facturas de servicios: impuestos, competencias y evidencia
        </h1>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Electricidad, gas, agua y ABL: qué documentan las fuentes oficiales y qué falta comprobar antes de afirmar que un cargo se repite o es ilegal.
        </p>
      </header>
      <ServiciosVerificados />
      <section aria-labelledby="revisar-boleta" className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4">
        <h2 id="revisar-boleta" className="text-xl font-bold text-white">Cómo documentar un posible cobro duplicado</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-300">
          <li>Compará ambas boletas del mismo período y verificá el titular, la cuenta y el inmueble al que corresponden.</li>
          <li>Identificá cada concepto y buscá la ley u ordenanza que define su hecho imponible, base y alícuota.</li>
          <li>Comprobá si un pago se descuenta o imputa al otro y si los cargos financian prestaciones diferentes.</li>
          <li>Registrá el reclamo y la respuesta del prestador o autoridad. Si citás una sentencia, indicá tribunal, expediente, fecha, alcance y firmeza.</li>
        </ol>
        <p className="text-sm text-amber-200">Los importes y porcentajes de los antiguos ejemplos de boletas y subsidios están en revisión documental y no se muestran como datos comprobados. Esta sección no calcula deudas ni indica qué conceptos dejar de pagar.</p>
      </section>
    </div>
  );
}
