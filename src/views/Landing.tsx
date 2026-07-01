/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Search, Landmark, Calculator, ArrowRight, BookOpen, AlertTriangle, Scale, Coins, AlertCircle } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { TRIBUTOS } from '../data/tributos';
import { POLITICIANS } from '../data/politicos';

interface LandingProps {
  onNavigate: (tab: string, param?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Landing({ onNavigate, searchQuery, setSearchQuery }: LandingProps) {
  
  const handleFeaturedSearch = (term: string) => {
    setSearchQuery(term);
    onNavigate('tributos');
  };

  const query = searchQuery.toLowerCase().trim();
  
  const matchingJurisdictions = query.length >= 2 ? JURISDICTIONS.filter(j => 
    j.name.toLowerCase().includes(query) || 
    (j.summary && j.summary.toLowerCase().includes(query))
  ).slice(0, 3) : [];

  const matchingTributos = query.length >= 2 ? TRIBUTOS.filter(t => 
    t.name.toLowerCase().includes(query) || 
    (t.normaCreacion && t.normaCreacion.toLowerCase().includes(query)) ||
    (t.authorityCobradora && t.authorityCobradora.toLowerCase().includes(query))
  ).slice(0, 3) : [];

  const matchingPoliticians = query.length >= 2 ? POLITICIANS.filter(p => 
    p.name.toLowerCase().includes(query) || 
    (p.currentRole && p.currentRole.toLowerCase().includes(query)) ||
    (p.currentParty && p.currentParty.toLowerCase().includes(query))
  ).slice(0, 3) : [];

  const hasMatches = matchingJurisdictions.length > 0 || matchingTributos.length > 0 || matchingPoliticians.length > 0;

  return (
    <div className="space-y-16 py-8" id="landing-view">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-center max-w-4xl mx-auto px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent)] rounded-3xl" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-xs font-mono mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>PROYECTO DE AUDITORÍA CÍVICA NEUTRA Y TRANSPARENTE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Seguí la ruta de tus <span className="text-emerald-400">impuestos</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Una plataforma de auditoría cívica y fiscal independiente para entender qué te cobra el Estado, 
          quién lo aprobó, quién lo ejecuta y qué evidencia documental lo respalda.
        </p>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-900">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar provincia, municipio, tributo o autoridad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full font-sans"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onNavigate('tributos');
                }}
              />
            </div>
            <button
              onClick={() => onNavigate('tributos')}
              className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide rounded-xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Buscar todo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* REAL-TIME GLOBAL SEARCH RESULTS DROPDOWN */}
          {query.length >= 2 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-left font-sans text-xs max-h-[380px] overflow-y-auto space-y-4">
              {!hasMatches ? (
                <div className="text-slate-500 text-center py-4 font-mono text-[11px]">
                  No se encontraron coincidencias directas para "{searchQuery}". Presioná Buscar todo para ver el listado completo.
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block font-bold border-b border-slate-800 pb-1">
                    Resultados de Auditoría Coincidentes
                  </span>

                  {/* JURISDICTIONS */}
                  {matchingJurisdictions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Mundo Federal (Fichas)</div>
                      <div className="space-y-1.5">
                        {matchingJurisdictions.map(j => (
                          <button
                            key={j.id}
                            onClick={() => onNavigate('mapa', j.id)}
                            className="w-full p-2.5 bg-slate-950/60 hover:bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center transition text-left cursor-pointer group"
                          >
                            <div className="truncate pr-4">
                              <span className="font-bold text-slate-200 block group-hover:text-emerald-400 text-xs">{j.name}</span>
                              <span className="text-[10px] text-slate-500 truncate block">{j.summary || 'Ver ficha presupuestaria de esta región.'}</span>
                            </div>
                            <span className="text-[9px] font-mono border border-emerald-500/25 px-1.5 py-0.5 rounded text-emerald-400 uppercase shrink-0">
                              Ir al Mapa
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TRIBUTOS */}
                  {matchingTributos.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider">Leyes e Impuestos vinculados</div>
                      <div className="space-y-1.5">
                        {matchingTributos.map(t => (
                          <button
                            key={t.id}
                            onClick={() => {
                              setSearchQuery(t.name);
                              onNavigate('tributos');
                            }}
                            className="w-full p-2.5 bg-slate-950/60 hover:bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center transition text-left cursor-pointer group"
                          >
                            <div className="truncate pr-4">
                              <span className="font-bold text-slate-200 block group-hover:text-blue-400 text-xs">{t.name}</span>
                              <span className="text-[10px] text-slate-500 truncate block">Creado por {t.normaCreacion || 'Decreto local'} • Percibe {t.authorityCobradora}</span>
                            </div>
                            <span className="text-[9px] font-mono border border-blue-500/25 px-1.5 py-0.5 rounded text-blue-400 uppercase shrink-0">
                              Ver Historial
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* POLITICIANS */}
                  {matchingPoliticians.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-wider">Autoridades e Historial Fiscal</div>
                      <div className="space-y-1.5">
                        {matchingPoliticians.map(p => (
                          <button
                            key={p.id}
                            onClick={() => onNavigate('politicos', p.id)}
                            className="w-full p-2.5 bg-slate-950/60 hover:bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center transition text-left cursor-pointer group"
                          >
                            <div className="truncate pr-4">
                              <span className="font-bold text-slate-200 block group-hover:text-purple-400 text-xs">{p.name}</span>
                              <span className="text-[10px] text-slate-500 truncate block">Rol: {p.currentRole} • {p.currentParty}</span>
                            </div>
                            <span className="text-[9px] font-mono border border-purple-500/25 px-1.5 py-0.5 rounded text-purple-400 uppercase shrink-0">
                              Ver Legajo
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Featured Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span>Sugeridos:</span>
          {['La Matanza', 'IVA', 'Tasa Vial', 'Zamora', 'Vicente López', 'Kicillof'].map((term) => (
            <button
              key={term}
              onClick={() => handleFeaturedSearch(term)}
              className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-300 rounded-md cursor-pointer transition-all duration-200"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onNavigate('mapa')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold text-sm tracking-wide rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all"
          >
            Explorar Mapa Nacional
          </button>
          <button
            onClick={() => onNavigate('metodologia')}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-slate-400 font-bold text-sm tracking-wide rounded-xl hover:text-white hover:bg-slate-900/40 cursor-pointer transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ver Metodología</span>
          </button>
        </div>
      </section>

      {/* Disclaimers & Confidence Standard Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-amber-950/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left">
            <h4 className="text-sm font-semibold text-amber-400 tracking-wide">AVISO DE SEGURIDAD LEGAL Y NEUTRALIDAD</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La plataforma re-organiza información pública oficial y estimaciones basadas en metodologías estadísticas con fines educativos.
              No constituye consejos legales, contables ni tributarios de carácter normativo. Las responsabilidades de aprobación 
              se muestran basándose estrictamente en actas legislativas y registros de decretos, sin valoraciones penales ni partidarias.
            </p>
          </div>
        </div>
      </div>

      {/* Triada de Problemas */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left hover:border-slate-700 transition" id="feature-1">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/10 rounded-xl inline-block mb-4 text-emerald-400">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 tracking-tight">1. Transparencia Radical</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unificamos las gacetas, boletines y decretos fiscales nacionales, provinciales y municipales en un solo registro. 
            Te mostramos de punta a punta qué impuestos pagás y a qué cuenta del Estado van.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left hover:border-slate-700 transition" id="feature-2">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/10 rounded-xl inline-block mb-4 text-blue-400">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 tracking-tight">2. Auditoría de Responsabilidad</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Identificamos de manera fehaciente qué legisladores, partidos de coalición y autoridades del poder ejecutivo 
            participaron de la redacción, tratamiento, aprobación y promulgación de cada tributo.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left hover:border-slate-700 transition" id="feature-3">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/10 rounded-xl inline-block mb-4 text-purple-400">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 tracking-tight">3. Estimaciones Científicas</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Calculá de forma estimada tu presión tributaria personal e inspeccioná el desglose impositivo de productos de 
            consumo masivo (como la leche o la nafta) bajo escenarios científicos con incertidumbre delimitada.
          </p>
        </div>
      </section>

      {/* Qué datos son oficiales vs estimación */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8 text-left">
          <h2 className="text-xl font-bold text-white tracking-tight border-l-2 border-emerald-500 pl-3">
            Trazabilidad de la Información & Niveles de Evidencia
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
            La neutralidad exige que el ciudadano conozca con precisión científica la calidad original de cada afirmación. 
            Nuestra plataforma asigna sellos de trazabilidad a toda nuestra base de datos según los siguientes grados:
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-850 rounded-xl">
              <div className="font-mono text-emerald-400 font-extrabold text-xs tracking-wider uppercase border-r border-slate-800/50 pr-4 flex items-center justify-between">
                <span>Nivel A - Oficial Primaria</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 text-[10px]">Verificado</span>
              </div>
              <div className="col-span-3 text-xs text-slate-300 leading-relaxed">
                Información probada directamente de boletines oficiales, leyes promulgadas con número de registro, 
                órdenes fiscales tarifarias locales, partidas presupuestarias o resoluciones públicas de AFIP/ARBA/AGIP.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-850 rounded-xl">
              <div className="font-mono text-blue-400 font-extrabold text-xs tracking-wider uppercase border-r border-slate-800/50 pr-4 flex items-center justify-between">
                <span>Nivel B - Oficial Secundaria</span>
                <span className="px-2 py-0.5 bg-blue-500/10 rounded border border-blue-500/20 text-[10px]">Confiable</span>
              </div>
              <div className="col-span-3 text-xs text-slate-300 leading-relaxed">
                Datos recolectados de plataformas de transparencia activa de gobiernos locales, gacetillas formales ministeriales 
                o respuestas institucionales a solicitudes de acceso formal a la información pública.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-850 rounded-xl">
              <div className="font-mono text-amber-400 font-extrabold text-xs tracking-wider uppercase border-r border-slate-800/50 pr-4 flex items-center justify-between">
                <span>Nivel C - Técnica Confiable</span>
                <span className="px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20 text-[10px]">Técnico</span>
              </div>
              <div className="col-span-3 text-xs text-slate-300 leading-relaxed">
                Datos e inferencias estadísticas provistos por laboratorios académicos universitarios de economía pública, 
                ONGs especializadas en temas fiscales (ej. IARAF, CIPPEC), o consultoras tributarias reconocidas.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-850 rounded-xl">
              <div className="font-mono text-purple-400 font-extrabold text-xs tracking-wider uppercase border-r border-slate-800/50 pr-4 flex items-center justify-between">
                <span>Nivel D - Dato Pendiente</span>
                <span className="px-2 py-0.5 bg-purple-500/10 rounded border border-purple-500/20 text-[10px]">Pendiente</span>
              </div>
              <div className="col-span-3 text-xs text-slate-300 leading-relaxed">
                Aportes realizados por usuarios de la comunidad de contribuyentes o estimaciones preliminares que aún se encuentran 
                en proceso de revisión documental por nuestros verificadores de datos y abogados redactores.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de datos reales vs ejemplos */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-white font-bold text-base tracking-tight">Aviso de Auditoría de Muestra</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              De acuerdo a nuestros ideales de transparencia, todos los datos en proceso de recolección legislativa cargados de forma 
              ejemplificadora llevan un cartel claro de <span className="text-amber-400 font-semibold font-mono">“Dato de ejemplo / Pendiente”</span>. 
              El registro con nivel A y B cuenta con el enlace normativo directo clickeable.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px] text-amber-400 font-mono font-bold tracking-wider uppercase">
              Badge: Dato de ejemplo
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
