import React from 'react';
import { MapPin } from 'lucide-react';
import SimuladorPreciosCore from './SimuladorPreciosCore';
import ComparadorTerritorial from '../components/ComparadorTerritorial';

export default function SimuladorPrecios() {
  return (
    <div className="space-y-8 py-4 text-left" id="simulador-precios-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Cadena Impositiva hasta la Góndola</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Analizá cuánto del precio final corresponde a costo productivo, margen comercial e impuestos nacionales, provinciales y municipales. La nueva comparación territorial permite ver por qué un mismo producto puede terminar con distinto precio según dónde se compre, sin completar con cifras no verificadas.
        </p>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
        <MapPin className="w-4 h-4" />
        <span>Comparación territorial basada en evidencia</span>
      </div>
      <ComparadorTerritorial />
      <SimuladorPreciosCore />
    </div>
  );
}
