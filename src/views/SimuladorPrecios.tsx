import React from 'react';
import { MapPin } from 'lucide-react';
import SimuladorPreciosCore from './SimuladorPreciosCore';
import ComparadorTerritorial from '../components/ComparadorTerritorial';
import FacturasServiciosSubsidios from './FacturasServiciosSubsidios';

export default function SimuladorPrecios() {
  return (
    <div className="space-y-12 py-4 text-left" id="simulador-precios-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Cadena Impositiva hasta la Góndola y Boletas de Servicios Públicos</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Analizá cuánto del precio final corresponde a costo productivo, margen comercial e impuestos nacionales, provinciales y municipales, cuántas veces se cobra Ingresos Brutos en cascada y cuánto de las boletas de Luz, Agua y ABL corresponde a costo real, subsidios de terceros y múltiple imposición.
        </p>
      </div>

      <FacturasServiciosSubsidios />

      <div className="pt-6 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
          <MapPin className="w-4 h-4" />
          <span>Comparación territorial de productos de consumo basada en evidencia</span>
        </div>
        <ComparadorTerritorial />
        <SimuladorPreciosCore />
      </div>
    </div>
  );
}
