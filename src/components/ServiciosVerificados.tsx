import React from 'react';
import { VIDEO_SERVICE_CLAIMS } from '../data/afirmacionesVideoServicios';

export const SERVICE_CASES = [
  { id: 'facturacion', date: '2024-09-11', title: 'Servicios y otros consumos: cargos ajenos', scope: 'Nación · Relaciones de consumo', text: 'La Resolución SIyC 267/2024 limita los conceptos ajenos al bien o servicio contratado y otorga 30 días de adecuación. Regula la factura; no deroga por sí misma los tributos locales ni elimina todos los impuestos vinculados al servicio.', source: 'Resolución SIyC 267/2024, arts. 1–3', url: 'https://www.boletinoficial.gov.ar/detalleAviso/primera/313712/20240911' },
  { id: 'luz', date: '2024-10-08', title: 'Electricidad: EDENOR y EDESUR', scope: 'Concesiones federales indicadas en la norma', text: 'La Resolución ENRE 708/2024 dejó sin efecto las autorizaciones para cobrar conceptos ajenos al servicio en estas dos distribuidoras. No permite extrapolar su alcance específico a todas las distribuidoras provinciales.', source: 'Resolución ENRE 708/2024, arts. 1–5', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/315320/20241008' },
  { id: 'gas', date: '2024-10-07', title: 'Gas por redes: recaudación y traslado tributario', scope: 'Nación · Distribuidoras y subdistribuidoras', text: 'La Resolución ENARGAS 625/2024 retiró las autorizaciones de percepciones otorgadas bajo la Resolución 185/2018. Distingue al prestador que recauda un tributo del usuario del prestador que soporta un tributo cuyo traslado regulatorio se autoriza. No todo renglón tributario quedó prohibido.', source: 'Resolución ENARGAS 625/2024, considerandos y arts. 1–2', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/315240/20241007' },
  { id: 'abl', date: '2025', title: 'ABL e inmobiliario: conceptos diferentes', scope: 'CABA · Código Fiscal, texto ordenado 2025', text: 'El artículo 371 distingue el impuesto inmobiliario de la tasa por alumbrado, barrido, limpieza y sumideros. La electricidad de una vivienda y el alumbrado de la vía pública son prestaciones diferentes. Para acreditar un cobro duplicado hacen falta las dos boletas, período, cuenta, ordenanza y mecanismo de imputación o descuento.', source: 'Código Fiscal CABA 2025, art. 371', url: 'https://imagenes.agip.gob.ar/filemanager/source/Decretos/2025/PE-DEC-AJG-AJG-116-25-ANX-1.pdf' },
  { id: 'agua', date: '2026-11-01', title: 'Agua y cloacas: verificar cada prestador', scope: 'AySA · Información consultada en esta fecha', text: 'AySA distingue agua potable, cloacas y la prestación conjunta; también facturación medida y no medida. Dos conceptos no acreditan dos cobros por un mismo hecho. Esta información no determina las tasas de otros prestadores provinciales o municipales ni prueba un cargo ilegal concreto.', source: 'AySA · Conocé tu factura', url: 'https://www.aysa.com.ar/tramites/Conoce-tu-factura' },
] as const;

export default function ServiciosVerificados() {
  return <section aria-labelledby="servicios-verificados" className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-5">
    <h2 id="servicios-verificados" className="text-xl font-bold text-white">Impuestos en servicios: hechos documentados y límites</h2>
    <p className="text-sm text-slate-300">Revisión documental: 1 de noviembre de 2026. Los casos describen normas y fuentes con su fecha; no certifican la vigencia integral ni el resultado firme de todos los litigios posteriores.</p>
    <p className="text-sm text-slate-300">Se recuperó una transcripción automática del video de referencia. Se revisan las afirmaciones del tramo 09:00–10:41 y la comparación tributaria que comienza en 08:50. Las formulaciones siguientes son paráfrasis; los tiempos pueden tener pequeños desajustes. <a className="underline" href="https://www.youtube.com/watch?v=XXn7xad-OBM&amp;t=540" target="_blank" rel="noopener noreferrer">Abrir video</a>.</p>
    <h3 className="text-lg font-bold text-white">Contraste de las afirmaciones del video</h3>
    <div className="space-y-3">{VIDEO_SERVICE_CLAIMS.map(item => <details key={item.seconds} className="border border-slate-700 rounded-xl p-4">
      <summary className="cursor-pointer text-sm font-bold text-white">{item.time} · {item.claim} <span className="block mt-1 text-amber-200">{item.status}</span></summary>
      <p className="mt-3 text-sm text-slate-300">{item.finding}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-cyan-300 underline">
        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.source}</a>
        <a href={`https://www.youtube.com/watch?v=XXn7xad-OBM&t=${item.seconds}`} target="_blank" rel="noopener noreferrer">Ver tramo del video</a>
      </div>
    </details>)}</div>
    <h3 className="text-lg font-bold text-white">Casos normativos por servicio</h3>
    <div className="grid gap-4 md:grid-cols-2">{SERVICE_CASES.map(item => <article key={item.id} className="border border-slate-700 rounded-xl p-4 space-y-2">
      <p className="text-xs text-emerald-300">{item.date} · {item.scope}</p><h3 className="font-bold text-white">{item.title}</h3>
      <p className="text-sm text-slate-300">{item.text}</p><a className="text-sm text-cyan-300 underline" href={item.url} target="_blank" rel="noopener noreferrer">{item.source}</a>
    </article>)}</div>
    <p className="text-sm text-slate-300">Nación y provincias tienen competencias tributarias concurrentes en materia de contribuciones indirectas; las provincias conservan poderes no delegados y regulan el alcance de la autonomía municipal. CABA tiene régimen autónomo. La creación o modificación exige examinar la ley u ordenanza y las facultades aplicables: la firma de un funcionario por sí sola no acredita arbitrariedad. <a className="text-cyan-300 underline" href="https://www.argentina.gob.ar/normativa/nacional/804/texto">Constitución, arts. 4, 17, 75 inc. 2, 99 inc. 3, 121, 123 y 129</a>.</p>
    <p className="text-sm text-slate-300">Doble imposición, acumulación económica y cobro duplicado son problemas distintos. El art. 9 inc. b de la <a className="text-cyan-300 underline" href="https://www.argentina.gob.ar/normativa/nacional/ley-23548-21108/actualizacion">Ley 23.548</a> limita gravámenes locales análogos, con excepciones y reglas específicas, entre ellas las relativas a Ingresos Brutos y tasas por servicios efectivamente prestados. La coexistencia de tributos no demuestra automáticamente ilegalidad o inconstitucionalidad.</p>
    <p className="text-sm text-amber-200">Hipótesis pendiente: “una baja nacional fue compensada por una suba provincial o municipal”. No se publica como hecho probado sin identificar ambas normas, fechas, bases, alícuotas y evidencia de la relación causal. Tampoco se infiere una intención recaudatoria de la mera sucesión temporal.</p>
  </section>;
}
