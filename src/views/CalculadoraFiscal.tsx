/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, Calendar, Info, ShieldAlert, FileText, ChevronRight, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CalculadoraFiscal() {
  // Input states
  const [salarioBruto, setSalarioBruto] = useState<number>(350000); // Pesos
  const [perfilConsumo, setPerfilConsumo] = useState<'bajo' | 'medio' | 'alto'>('medio');
  const [autoSujeto, setAutoSujeto] = useState<boolean>(true);
  const [propietario, setPropietario] = useState<boolean>(false);
  const [comunaSujeta, setComunaSujeta] = useState<string>('caba'); // caba, pba, santa_fe

  // Calculate taxes
  const fiscalResults = useMemo(() => {
    // 1. Social security (cargas laborales) -> ~17% worker contribution + typical employer wedge estimated
    const jubilacion = salarioBruto * 0.11;
    const obraSocial = salarioBruto * 0.03;
    const ley19032 = salarioBruto * 0.03;
    const totalCargasSociales = jubilacion + obraSocial + ley19032;

    const salarioNeto = salarioBruto - totalCargasSociales;

    // 2. Direct Taxes -> Impuesto a las ganancias (simplified scales based on updated floor de ganancias 2026)
    // Floor is around 1.8 million pesos in 2026. If below, Gains tax is 0.
    let impuestoGanancias = 0;
    if (salarioBruto > 1800000) {
      const imponible = (salarioBruto - 1800000) * 0.22; // rough flat estimate over floor
      impuestoGanancias = Math.max(0, imponible);
    }

    // 3. Indirect Taxes (Consumo - IVA, IIBB, Tasas)
    // Assume consumption expenditure is 85% of net income for medium profiles
    const gastoConsumo = salarioNeto * (perfilConsumo === 'bajo' ? 0.75 : perfilConsumo === 'medio' ? 0.90 : 1.0);
    
    // Effective tax rates integrated in consumption (IVA + IIBB + Internos cumulative averages)
    const effectiveConsumptionTaxRate = perfilConsumo === 'bajo' ? 0.22 : perfilConsumo === 'medio' ? 0.31 : 0.40;
    const totalImpuestosConsumo = gastoConsumo * effectiveConsumptionTaxRate;

    // 4. Patrimonial Taxes (Patentes, ABL / Inmobiliario)
    let totalPatrimoniales = 0;
    if (autoSujeto) totalPatrimoniales += 18500; // mensual estimado
    if (propietario) totalPatrimoniales += 22000; // mensual estimado

    const totalImpuestosMensuales = totalCargasSociales + impuestoGanancias + totalImpuestosConsumo + totalPatrimoniales;
    const totalRecibidoRealNeto = salarioBruto - totalImpuestosMensuales;

    // Effective Burden Percentage
    const porcentajeCargaFiscal = (totalImpuestosMensuales / salarioBruto) * 100;

    // Fiscal independence day calculator (365 days)
    const diasTrabajadosParaEstado = Math.round((porcentajeCargaFiscal / 100) * 365);
    
    // Find calendar date
    const totalMesesDias: { [key: number]: string } = {
      31: 'Enero', 59: 'Febrero', 90: 'Marzo', 120: 'Abril', 151: 'Mayo', 
      181: 'Junio', 212: 'Julio', 243: 'Agosto', 273: 'Septiembre', 
      304: 'Octubre', 334: 'Noviembre', 365: 'Diciembre'
    };

    let targetMonth = 'Enero';
    let targetDay = 1;
    let accumulated = 0;
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    for (let i = 0; i < 12; i++) {
      if (accumulated + diasPorMes[i] >= diasTrabajadosParaEstado) {
        targetMonth = nombresMeses[i];
        targetDay = diasTrabajadosParaEstado - accumulated;
        break;
      }
      accumulated += diasPorMes[i];
    }

    return {
      jubilacion,
      obraSocial,
      totalCargasSociales,
      impuestoGanancias,
      totalImpuestosConsumo,
      totalPatrimoniales,
      totalImpuestosMensuales,
      totalRecibidoRealNeto,
      porcentajeCargaFiscal: Math.min(95, Math.max(10, porcentajeCargaFiscal)),
      diasTrabajadosParaEstado,
      fiscalIndependenceDay: `${targetDay} de ${targetMonth}`
    };
  }, [salarioBruto, perfilConsumo, autoSujeto, propietario, comunaSujeta]);

  return (
    <div className="space-y-8 py-4 text-left" id="calculadora-fiscal-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Calculadora de Presión Fiscal Individual</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Simulá cuál es el impacto fiscal global real sobre tu ingreso mensual. Esta herramienta estima tus impuestos directos, 
          indirectos agregados y cargas previsionales para calcular cuántos días del año trabajás exclusivamente para sostener el Estado.
        </p>
      </div>

      {/* WARNING DISCLAIMER HEADER */}
      <div className="bg-amber-950/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-400 tracking-wide uppercase">METODOLOGÍA DE ESTIMACIÓN CIENTÍFICA</span>
          <p>
            Este resultado es una estimación científica simplificada. Puede variar de acuerdo a tus deducciones personales cargadas en AFIP, 
            el comportamiento real de tu canasta de consumo particular, la tasa de reinversión comercial y regulaciones locales específicas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUT FORM PANEL (Left - 5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-white text-sm pb-3 border-b border-slate-850 tracking-tight">Parametrización del Perfil</h3>

          {/* Monthly Gross Salary Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Sueldo Bruto Mensual (ARS)</span>
              <span className="font-bold text-white">${salarioBruto.toLocaleString('es-AR')}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="4000000"
              step="50000"
              value={salarioBruto}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$100 mil</span>
              <span>$4 Millones</span>
            </div>
          </div>

          {/* Consumption Tier Select */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Nivel de Consumo y Canasta Básica</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bajo', label: 'Bajo', desc: 'Canasta de supervivencia, alimentos básicos' },
                { id: 'medio', label: 'Medio', desc: 'Bienes nacionales, servicios corrientes' },
                { id: 'alto', label: 'Alto', desc: 'Bienes importados, electrónica, salidas' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setPerfilConsumo(tier.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col justify-between h-[75px] cursor-pointer ${
                    perfilConsumo === tier.id
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tier.label}</span>
                  <span className="text-[9px] text-slate-500 font-normal leading-tight block text-left truncate-2-lines">{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regional Jurisdiction selector */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Jurisdicción de Residencia</label>
            <select
              value={comunaSujeta}
              onChange={(e) => setComunaSujeta(e.target.value)}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="caba">Ciudad Autónoma de Buenos Aires (CABA)</option>
              <option value="pba">Provincia de Buenos Aires (PBA / Conurbano)</option>
              <option value="santa_fe">Provincia de Santa Fe</option>
              <option value="cordoba">Provincia de Córdoba</option>
            </select>
          </div>

          {/* Patrimonial elements checkboxes */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Bienes Registrados Activos</span>
            
            <label className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={autoSujeto}
                onChange={(e) => setAutoSujeto(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded border-slate-850 focus:ring-0"
              />
              <div className="text-xs text-left">
                <span className="font-bold text-slate-300 block">Tengo Automóvil Patentado</span>
                <span className="text-[10px] text-slate-500 block font-mono">Sujeto a Patentes Provinciales</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={propietario}
                onChange={(e) => setPropietario(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded border-slate-850 focus:ring-0"
              />
              <div className="text-xs text-left">
                <span className="font-bold text-slate-300 block">Soy Propietario de Inmueble</span>
                <span className="text-[10px] text-slate-500 block font-mono">Sujeto a Tasas Generales (ABL / Inmobiliario)</span>
              </div>
            </label>
          </div>
        </div>

        {/* CALCULATION VISUAL RESULTS PANEL (Right - 7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl">
          <div className="text-center space-y-3 pb-6 border-b border-slate-850">
            <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest leading-none">DÍA DE LA INDEPENDENCIA FISCAL ESTIMADO</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{fiscalResults.fiscalIndependenceDay}</h2>
            
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Hasta esta fecha calendario, todos tus ingresos generados se destinan teóricamente a cubrir tu porción impositiva del Estado. 
              A partir de este día, tus ingresos son 100% de disposición neta privada.
            </p>
          </div>

          {/* Linear Meter Progress Representation */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-end text-xs font-mono">
              <span className="text-slate-500">Distribución de tu Ingreso Anual</span>
              <span className="font-bold text-emerald-400">{fiscalResults.porcentajeCargaFiscal.toFixed(1)}% Estado / {(100 - fiscalResults.porcentajeCargaFiscal).toFixed(1)}% Privado</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden flex border border-slate-900">
              <div
                className="bg-emerald-500/85 h-full transition-all duration-500"
                style={{ width: `${fiscalResults.porcentajeCargaFiscal}%` }}
                title="Para impuestos y cargas estatales"
              />
              <div
                className="bg-slate-800 h-full flex-1 transition-all duration-500"
                title="Sueldo neto disponible"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Trabajo para el Estado ({fiscalResults.diasTrabajadosParaEstado} días / año)</span>
              <span>Propio disponible</span>
            </div>
          </div>

          {/* Detailed Taxes Breakdown List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5 uppercase font-mono">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Desglose de Descuentos Fiscales del Mes</span>
            </h4>

            <div className="divide-y divide-slate-850 font-sans text-xs">
              {/* Box 1: Previsional */}
              <div className="py-3 flex justify-between items-center">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200">Cargas Laborales y Seguridad Social</span>
                  <span className="text-[10px] text-slate-500 block">Jubilación, PAMI, obra social (17% del bruto)</span>
                </div>
                <span className="font-mono text-slate-300 font-bold">${fiscalResults.totalCargasSociales.toLocaleString('es-AR')}</span>
              </div>

              {/* Box 2: Direct Tax */}
              <div className="py-3 flex justify-between items-center">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200">Ganancias e Ingresos Directos</span>
                  <span className="text-[10px] text-slate-500 block">Escala simplificada tributaria sobre excedente</span>
                </div>
                <span className={`font-mono font-bold ${fiscalResults.impuestoGanancias > 0 ? 'text-slate-300' : 'text-slate-500'}`}>
                  {fiscalResults.impuestoGanancias > 0 ? `$${fiscalResults.impuestoGanancias.toLocaleString('es-AR')}` : 'No alcanza piso impositivo'}
                </span>
              </div>

              {/* Box 3: Indirect Taxes (Consumo cumulative) */}
              <div className="py-3 flex justify-between items-center">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200">Impuestos Indirectos al Consumo</span>
                  <span className="text-[10px] text-slate-500 block">IVA promedio, IIBB acumulado en góndolas, combustibles</span>
                </div>
                <span className="font-mono text-slate-300 font-bold">${Math.round(fiscalResults.totalImpuestosConsumo).toLocaleString('es-AR')}</span>
              </div>

              {/* Box 4: Property local taxes */}
              <div className="py-3 flex justify-between items-center">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200">Tasas Patrimoniales y Tasas Locales</span>
                  <span className="text-[10px] text-slate-500 block">Patentes estimadas + ABL/Inmueble según seleccionados</span>
                </div>
                <span className="font-mono text-slate-300 font-bold">${fiscalResults.totalPatrimoniales.toLocaleString('es-AR')}</span>
              </div>

              {/* Box Total Summary */}
              <div className="py-4 flex justify-between items-center border-t border-slate-800 font-semibold bg-slate-950/20 px-3 rounded-xl mt-3">
                <div className="space-y-0.5 text-left">
                  <span className="font-black text-emerald-400">Total Descuento Fiscal</span>
                  <span className="text-[10px] text-slate-500 block">Suma mensual agregada estimada sobre ingresos</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-400 font-heavy text-base block">${Math.round(fiscalResults.totalImpuestosMensuales).toLocaleString('es-AR')}</span>
                  <span className="text-[10px] text-slate-500 block">{fiscalResults.porcentajeCargaFiscal.toFixed(1)}% de tu bruto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
