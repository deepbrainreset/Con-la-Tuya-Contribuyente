/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, ShieldCheck, Scale, AlertTriangle, CheckCircle, HelpCircle, HardDrive } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="space-y-8 py-4 text-left" id="metodologia-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Manual Cívico de Metodología y Neutralidad</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Nuestros principios y estándares de verificación de datos públicos. Conocé cómo recopilamos la información impositiva, 
          qué fuentes acreditamos técnicamente y cómo evitamos sesgos o difamación partidaria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* TEXT MANUAL COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Core Ideal */}
          <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
            <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>1. Neutralidad Radical No Partidaria</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              No somos un órgano partidario, de oposición ni de campaña oficial. El propósito primordial de
              <span className="text-white font-semibold"> Con La Tuya Contribuyente</span> es proveer transparencia e información 
              de libre acceso estructurada para el ciudadano de a pie. 
              Denunciamos y prohibimos explícitamente el uso de adjetivos denigrantes sin sentencia firme. 
              Nos amparamos exclusivamente en documentos oficiales para señalar la trazabilidad de impuestos y deudas.
            </p>
          </div>

          {/* Section 2: Fuentes Aceptables vs No Aceptables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aceptables */}
            <div className="p-5 bg-emerald-500/[0.02] border border-emerald-500/15 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Fuentes Aceptadas</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-450 leading-relaxed list-inside list-disc">
                <li>Boletines Oficiales (Nación, Provincias o Municipios).</li>
                <li>Leyes, Ordenanzas Tarifarias y Decretos numerados oficiales.</li>
                <li>Actas de sesiones legislativas y planillas de votación en comisiones.</li>
                <li>Plataformas gubernamentales de Datos Abiertos consolidadas.</li>
                <li>Informes estadísticos de universidades y ONGs reputadas (ej. IARAF).</li>
              </ul>
            </div>

            {/* No Aceptables */}
            <div className="p-5 bg-rose-500/[0.02] border border-rose-500/15 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-rose-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Fuentes Rechazadas</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-450 leading-relaxed list-inside list-disc text-slate-400">
                <li>Tuits, posteos de redes sociales u opiniones de referentes políticos.</li>
                <li>Gacetillas de prensa de partidos sin respaldo documental legislativo.</li>
                <li>Artículos periodísticos de opinión sin facsímil ni cita de fuente oficial.</li>
                <li>Blogs anónimos o rumores informales de pasillo municipal.</li>
                <li>Declaraciones testimoniales informales desprovistas de expediente.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Inferencia estadística */}
          <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-3 text-left">
            <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>3. Tratamiento Científico de Inferencias y Estimaciones</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Dado que es estadísticamente impracticable conocer la canasta de consumo exacta o las deducciones particulares 
              de cada contribuyente de la Nación de forma unánime, todas las calculadoras y simuladores de precios aplican 
              coeficientes promedio ponderados. 
              Rotulamos explícitamente estas herramientas como **Estimaciones científicas**. Las fórmulas y orígenes matemáticos 
              están explicitados de forma abierta para auditar sus orígenes. No pretendemos sustituir el asesoramiento calificado de contadores ni asesores tributarios.
            </p>
          </div>

          {/* Section 4: Corrección de Errores */}
          <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-3 text-left">
            <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-emerald-400" />
              <span>4. Política de Enmiendas y Corrección de Datos</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
              Cualquier ciudadano tiene el derecho soberano de enmendar o señalar inconsistencias en nuestra plataforma. 
              Para tal fin, habilitamos un sistema descentralizado de propuestas de contribución donde se exige acompañarla 
              de un enlace fehaciente (URL de gacetas, boletín o foto verificada de la ordenanza fiscal). 
              La propuesta es de visualización pública inmediata en estado de revisión y ningún dato oficial consolidado 
              es sustituido sin la anuencia de los abogados verificadores del sistema.
            </p>
          </div>
        </div>

        {/* POLICY BOXES COLUMN (Right - 4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-850 tracking-tight">Estándares de Protección Legal</h3>
          
          <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white">Neutralidad contra la Difamación</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Está estrictamente prohibido utilizar calificativos ofensivos de cualquier índole política en cargados de la comunidad. 
              La gobernanza depura automáticamente aportes sesgados para proteger el derecho cívico al dato aséptico.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white">Declaración Jurada y Ética</h4>
            <p className="text-[11px] text-slate-450 leading-relaxed text-slate-400">
              La recopilación de declaraciones patrimoniales de políticos responde a las normativas de éticas públicas nacionales y provinciales. 
              No especulamos con valuaciones inmobiliarias privadas de mercado; reportamos el valor oficial fiscal declarado.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white">Uso Educativo Libre</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Toda nuestra base de datos, JSONs públicos de provincias y simuladores matemáticos se publican bajo licencias abiertas de código libre. 
              Sostené y descargá de forma transparente para replicar en tus proyectos pedagógicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
