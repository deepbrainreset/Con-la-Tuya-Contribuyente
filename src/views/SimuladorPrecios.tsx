/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ShoppingBag, ChevronRight, FileText, BarChart, Info, HelpCircle, ShieldCheck, AlertCircle, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/productos';
import { ProductSustance } from '../types';

export default function SimuladorPrecios() {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [activeTab, setActiveTab] = useState<'calculable' | 'inventory'>('calculable');
  
  // Custom interactive final price adjustment factor
  // Lets the user slide the total price up and down to see how values scale proportionally
  const [userPriceMultiplier, setUserPriceMultiplier] = useState<number>(1);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  // Recalculated values based on multiplier
  const currentValues = useMemo(() => {
    const rawSum = selectedProduct.basePrice + selectedProduct.logistics + selectedProduct.taxNational + selectedProduct.taxProvincial + selectedProduct.taxMunicipal + selectedProduct.margin;
    
    return {
      rawSum,
      base: selectedProduct.basePrice * userPriceMultiplier,
      logistics: selectedProduct.logistics * userPriceMultiplier,
      national: selectedProduct.taxNational * userPriceMultiplier,
      provincial: selectedProduct.taxProvincial * userPriceMultiplier,
      municipal: selectedProduct.taxMunicipal * userPriceMultiplier,
      margin: selectedProduct.margin * userPriceMultiplier,
      total: rawSum * userPriceMultiplier
    };
  }, [selectedProduct, userPriceMultiplier]);

  const percentValues = useMemo(() => {
    const sum = currentValues.total;
    return {
      base: (currentValues.base / sum) * 100,
      logistics: (currentValues.logistics / sum) * 100,
      national: (currentValues.national / sum) * 100,
      provincial: (currentValues.provincial / sum) * 100,
      municipal: (currentValues.municipal / sum) * 100,
      margin: (currentValues.margin / sum) * 100,
      totalTaxes: ((currentValues.national + currentValues.provincial + currentValues.municipal) / sum) * 105 // rounded factor
    };
  }, [currentValues]);

  // Inventory specifications - list of all applicable laws, codes on these industries for completeness
  // Even those with complex rates or varying fractions, to provide transparency
  const productInventoryList: { [key: string]: { name: string; level: string; desc: string; source: string; score: string }[] } = {
    leche: [
      { name: 'IVA Alimentos Diferenciado (10.5%)', level: 'Nación', desc: 'Ley de Impuesto al Valor Agregado exención parcial para lácteos.', source: 'InfoLEG Ley 20.631', score: 'A' },
      { name: 'Impuesto sobre los Ingresos Brutos (ARBA/Agip)', level: 'Provincia', desc: 'Gravamen acumulativo sobre la facturación industrial y agropecuaria.', source: 'Dirección Provincial de Rentas', score: 'B' },
      { name: 'Tasa de Seguridad e Higiene Industrial', level: 'Municipio', desc: 'Inspección municipal sobre plantas embotelladores y centros de acopio.', source: 'Ordenanzas Tarifarias Locales', score: 'C' },
      { name: 'Aporte de Control SENASA de Sanidad Animal', level: 'Nación', desc: 'Control de sanidad láctea sobre rodeos, tasa de control fitosanitario.', source: 'Portal Ejecutivo Nacional de Sanidad', score: 'B' }
    ],
    pan: [
      { name: 'IVA Pan Común Exento / Tasa General de Harinas', level: 'Nación', desc: 'Tasa general sobre insumos mecánicos y moliendas primarias de trigo.', source: 'Alícuota reducida AFIP', score: 'A' },
      { name: 'Ingresos Brutos Agrícola y Panificación', level: 'Provincia', desc: 'Carga impositiva provincial que grava la compraventa de grano y harina.', source: 'Código Fiscal Provincial', score: 'B' },
      { name: 'Tasa por Control Bromatológico de Locales Gastronómicos', level: 'Municipio', desc: 'Inspección microbiológica obligatoria regular aplicada a panaderías.', source: 'Ordenanza de Salubridad Municipal', score: 'C' },
      { name: 'Impuesto de Sellos sobre Contratos de Entrega Tecnológica', level: 'Provincia', desc: 'Encuadre sobre maquinarias de amasado importadas.', source: 'Rentas Provinciales', score: 'C' }
    ],
    combustible: [
      { name: 'Impuesto sobre los Combustibles Líquidos (ICL)', level: 'Nación', desc: 'Suma fija indexada por trimestre sobre surtidores de nafta y diesel.', source: 'Ley Nacional 23.966', score: 'A' },
      { name: 'Impuesto al Dióxido de Carbono (IDC)', level: 'Nación', desc: 'Gravamen nacional ambiental sobre emisiones de hidrocarburos fósiles.', source: 'InfoLEG Ley de Combustibles', score: 'A' },
      { name: 'Tasa Vial Municipal sobre Hidrocarburos', level: 'Municipio', desc: 'Adicional por litro cargado para recomposición de calzadas viales locales.', source: 'Concejos Deliberantes Municipales', score: 'B' },
      { name: 'Ingresos Brutos Mayoristas sobre Surtidor', level: 'Provincia', desc: 'Fraccional impositivo sobre reventa mayorista ex-refinería.', source: 'ARBA / AGIP', score: 'B' }
    ],
    celular: [
      { name: 'Derecho Adicional por Ensamblado en Región Especial', level: 'Nación', desc: 'Tasa diferencial de industria integrada sobre Tierra del Fuego.', source: 'Ley de Promoción Industrial 19.640', score: 'A' },
      { name: 'Impuestos Internos Tecnológicos', level: 'Nación', desc: 'Sobretasa por productos suntuarios o electrónicos importados.', source: 'InfoLEG Impuestos Internos', score: 'A' },
      { name: 'Impuesto sobre los Débitos y Créditos Bancarios', level: 'Nación', desc: 'Impuesto al cheque acumulado en toda la cadena de distribución mayorista.', source: 'Régimen de Bancos Retenedores', score: 'A' },
      { name: 'Ingresos Brutos Minorista de Electrónica', level: 'Provincia', desc: 'Percepción impositiva del comercio final de venta.', source: 'API / Agip Retenciones', score: 'B' }
    ],
    auto: [
      { name: 'Impuesto Interno Suntuario a Motores (Impuesto al Lujo)', level: 'Nación', desc: 'Gravamen progresivo si el coche supera escalas básicas de venta.', source: 'AFIP Decretos Trimestrales', score: 'A' },
      { name: 'Impuesto de Sellos sobre Inscripción Inicial (Patentamiento)', level: 'Provincia', desc: 'Tasa obligatoria para el egreso del vehículo del registro nacional.', source: 'Códigos Fiscales de Rentas', score: 'A' },
      { name: 'Derecho de Inscripción y Tasas Administrativas', level: 'Municipio', desc: 'Tasa o cargo del municipio para dar de alta las patentes del coche.', source: 'Gacetas de Dirección del Automotor', score: 'C' },
      { name: 'Tasa de Importación Arancelaria Extrazona', level: 'Nación', desc: '35% de recargo sobre autopartes del exterior (fuera del Mercosur).', source: 'Aduana Argentina', score: 'A' }
    ],
    alquiler: [
      { name: 'Impuesto de Sellos sobre Contrato Comercial / Vivienda', level: 'Provincia', desc: 'Habilitación provincial obligatoria (se liquida por escribanía).', source: 'Código Fiscal Local de Contratos', score: 'B' },
      { name: 'Tasa General por Alumbrado, Barrido y Limpieza', level: 'Municipio', desc: 'Cargos de mantenimiento urbano del frente de la propiedad.', source: 'Boletín de Rentas Inmobiliarias', score: 'B' },
      { name: 'Impuesto a las Ganancias sobre Rentas Inmuebles', level: 'Nación', desc: 'Piso de liquidación para propietarios con varias unidades.', source: 'Escalas AFIP', score: 'A' }
    ],
    servicios: [
      { name: 'Contribución Especial Ley 24.065 Factura Luz', level: 'Nación', desc: 'Cargo nacional para financiamiento de entes reguladores de energía.', source: 'Boletín del ENRE', score: 'A' },
      { name: 'Fondo Provincial de Desarrollo Energético Luz', level: 'Provincia', desc: 'Sobrecargo provincial en el AMBA dedicado a subestaciones rurales.', source: 'Leyes Especiales de Luz GBA', score: 'B' },
      { name: 'Tasa de Alumbrado Público Directa en Boleta Energetica', level: 'Municipio', desc: 'Tasa municipal cargada de prepo en la luz del hogar.', source: 'Municipalidad Conurbana Ordinaria', score: 'B' }
    ]
  };

  const currentInventory = productInventoryList[selectedProduct.id] || [];

  return (
    <div className="space-y-8 py-4 text-left" id="simulador-precios-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Estructura Impositiva de Precios Comerciales</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          ¿Cuánto de lo que pagás va para impuestos? Simulá el desglose científico del precio final estimado de productos básicos del día a día 
          y descubrí el peso impositivo nacional, provincial y municipal que altera los precios de góndola.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SELECTOR COLUMN (Left - 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase pl-1">Bienes y Servicios Analizados</span>
          
          <div className="space-y-2">
            {PRODUCTS.map((prod) => {
              const matchesSelected = prod.id === selectedProductId;
              return (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setUserPriceMultiplier(1); // reset slider factor
                  }}
                  className={`w-full flex items-center justify-between p-3.5 text-left rounded-xl border transition-all duration-205 cursor-pointer ${
                    matchesSelected
                      ? 'bg-emerald-500/10 border-emerald-500/35 text-white'
                      : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`w-4 h-4 ${matchesSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-xs text-slate-100">{prod.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              );
            })}
          </div>

          {/* Price Adjuster Slider Option */}
          <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>Simular Ajuste en Góndola</span>
              <span className="text-white font-bold">{Math.round(userPriceMultiplier * 100)}% del Base</span>
            </div>
            
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={userPriceMultiplier}
              onChange={(e) => setUserPriceMultiplier(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 leading-snug">
              Desplazá el valor para simular aumentos o rebajas comerciales e inspeccionar cómo escala la porción proporcional de impuestos.
            </p>
          </div>
        </div>

        {/* DETAILS AND GRAPHS COLUMN (Right - 8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Header detail */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800 text-left">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedProduct.name}</h2>
              <p className="text-xs text-slate-400 mt-1">Estimación de componentes e impuestos integrales acumulados en cadena.</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">Precio Final Estimado</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">${Math.round(currentValues.total).toLocaleString('es-AR')}</span>
            </div>
          </div>

          {/* Tabs switch: Calculable and Inventory */}
          <div className="flex border-b border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('calculable')}
              className={`pb-2 px-4 font-bold border-b-2 tracking-wide cursor-pointer transition ${
                activeTab === 'calculable' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <BarChart className="w-3.5 h-3.5" />
                <span>Casificación de Costos / Gráfico</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`pb-2 px-4 font-bold border-b-2 tracking-wide cursor-pointer transition ${
                activeTab === 'inventory' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Inventario Completo de Regulaciones ({currentInventory.length})</span>
              </span>
            </button>
          </div>

          {/* TAB CONTENT A — CALCULABLE GRAPH WATERFALL */}
          {activeTab === 'calculable' ? (
            <div className="space-y-6">
              {/* Stacked visually clean receipt bar */}
              <div className="space-y-1.5">
                <div className="flex text-[10px] text-slate-500 font-mono justify-between">
                  <span>Esquema de Góndola (Suma de Componentes)</span>
                  <span>Total Neto: 100%</span>
                </div>
                
                <div className="w-full h-8 rounded-xl bg-slate-950 overflow-hidden flex shadow-inner border border-slate-900">
                  <div
                    style={{ width: `${percentValues.base}%` }}
                    className="bg-slate-300 h-full hover:opacity-85 transition"
                    title={`Materia Prima / Costo Base: ${percentValues.base.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${percentValues.logistics}%` }}
                    className="bg-amber-400/90 h-full hover:opacity-85 transition"
                    title={`Logística / Flete: ${percentValues.logistics.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${percentValues.national}%` }}
                    className="bg-emerald-500 h-full hover:opacity-85 transition"
                    title={`Impuestos Nacionales (IVA / Internos): ${percentValues.national.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${percentValues.provincial}%` }}
                    className="bg-blue-500 h-full hover:opacity-85 transition"
                    title={`Impuestos Provinciales (IIBB): ${percentValues.provincial.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${percentValues.municipal}%` }}
                    className="bg-purple-500 h-full hover:opacity-85 transition"
                    title={`Tasas Municipales (TISH / Vial): ${percentValues.municipal.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${percentValues.margin}%` }}
                    className="bg-slate-600 h-full hover:opacity-85 transition"
                    title={`Margen Minorista / Comercial: ${percentValues.margin.toFixed(1)}%`}
                  />
                </div>
              </div>

              {/* Legend Bento Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Costo de origen */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-slate-300" />
                      <span className="font-bold text-slate-300">Costo Base / Origen</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Producción primaria e industriales</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-white block">${Math.round(currentValues.base).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.base.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Logística */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                      <span className="font-bold text-slate-300">Combustibles y Logística</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Distribución de flete nacional</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-white block">${Math.round(currentValues.logistics).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.logistics.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Nacionales */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                      <span className="font-bold text-slate-300 font-mono">Impuestos Nacionales</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">IVA, Imp. Internos, cheque acumulado</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-400 block">${Math.round(currentValues.national).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.national.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Provinciales */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                      <span className="font-bold text-slate-300 font-mono">Impuestos Provinciales</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Ingresos Brutos en cadena, Sellos</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-blue-400 block">${Math.round(currentValues.provincial).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.provincial.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Municipales */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-purple-500" />
                      <span className="font-bold text-slate-300 font-mono">Tasas Municipales</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">TISH municipal, Tasa vial, patentes de reparto</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-purple-400 block">${Math.round(currentValues.municipal).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.municipal.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Margen */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-slate-600" />
                      <span className="font-bold text-slate-300">Margen Comercial Neto</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Reposo del retail minorista</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-white block">${Math.round(currentValues.margin).toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-slate-500 block">{percentValues.margin.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Total aggregated tax burden card */}
              <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl flex justify-between items-center text-left">
                <div className="space-y-1">
                  <span className="font-extrabold text-sm text-slate-200 block">Presión Impositiva Total Combinada</span>
                  <p className="text-[11px] text-slate-400 leading-normal max-w-lg">
                    Suma total de tributación nacional, provincial y municipal acumulada sobre el bien. 
                    Por cada unidad de compra, el Estado recauda un índice del precio final al consumidor.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Suma Fiscal Real</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">${Math.round(currentValues.national + currentValues.provincial + currentValues.municipal).toLocaleString('es-AR')}</span>
                  <span className="text-xs text-slate-400 font-bold font-mono block">
                    {((currentValues.national + currentValues.provincial + currentValues.municipal) / currentValues.total * 100).toFixed(1)}% del Total
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* TAB CONTENT B — INVENTORY OF LEGISLATIVE RULES */
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl text-xs flex gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 select-none mt-0.5" />
                <p className="text-slate-400 leading-relaxed">
                  A continuación se listan **todas las normas tributarias vigentes** que capturan o gravan la cadena de molienda, 
                  suministro, flete, y empaquetamiento comercial de este producto. Aunque la tasa fraccional individual varíe, 
                  esta lista representa de manera documental cada ley nacional o decreto que interviene.
                </p>
              </div>

              <div className="space-y-2.5">
                {currentInventory.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl flex items-start justify-between gap-4 text-left">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-[9px] text-slate-400 uppercase font-mono font-bold rounded">
                          {item.level}
                        </span>
                        <h4 className="font-bold text-xs text-slate-200">{item.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{item.desc}</p>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Registro: <span className="text-emerald-400">{item.source}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Evidencia {item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
