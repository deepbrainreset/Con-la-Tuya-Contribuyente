/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, FileText, ChevronDown, ChevronUp, Link, Calendar, Scale, ClipboardList, AlertCircle, RefreshCw } from 'lucide-react';
import { TRIBUTOS } from '../data/tributos';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Tributo, TributoType, TributoStatus, EvidenceLevel } from '../types';
import EvidenceBadge from '../components/EvidenceBadge';

interface RegistroTributosProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function RegistroTributos({ searchQuery, setSearchQuery }: RegistroTributosProps) {
  // Filters
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEvidence, setFilterEvidence] = useState<string>('all');

  // Expanded rows
  const [expandedTaxId, setExpandedTaxId] = useState<string | null>(null);

  // Memoized filter list
  const filteredTaxes = useMemo(() => {
    return TRIBUTOS.filter((tax) => {
      // Text Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        tax.name.toLowerCase().includes(searchLower) ||
        tax.normaCreacion.toLowerCase().includes(searchLower) ||
        (tax.propuestoPor || '').toLowerCase().includes(searchLower) ||
        tax.authorityCobradora.toLowerCase().includes(searchLower);

      // Jurisdictional Level
      const matchesLevel = filterLevel === 'all' || tax.level.toLowerCase() === filterLevel.toLowerCase();

      // Tax Type
      const matchesType = filterType === 'all' || tax.type === filterType;

      // Status
      const matchesStatus = filterStatus === 'all' || tax.status === filterStatus;

      // Evidence Score
      const matchesEvidence = filterEvidence === 'all' || tax.evidenceLevel === filterEvidence;

      return matchesSearch && matchesLevel && matchesType && matchesStatus && matchesEvidence;
    });
  }, [searchQuery, filterLevel, filterType, filterStatus, filterEvidence]);

  const toggleExpand = (id: string) => {
    if (expandedTaxId === id) {
      setExpandedTaxId(null);
    } else {
      setExpandedTaxId(id);
    }
  };

  const getJurisdictionName = (jurisdictionId: string) => {
    const juris = JURISDICTIONS.find(j => j.id === jurisdictionId);
    return juris ? juris.name : 'Jurisdicción no disponible';
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterLevel('all');
    setFilterType('all');
    setFilterStatus('all');
    setFilterEvidence('all');
  };

  return (
    <div className="space-y-8 py-4 text-left" id="registro-tributos-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Registro Tributario de la República Argentina</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Buscador nacional unificado de tributos. Consultá qué impuestos provinciales, tasas municipales y cargos nacionales rigen 
          sobre la actividad económica, quién redactó el proyecto de ley y cómo verificar su autenticidad normativa con hashes de control.
        </p>
      </div>

      {/* SEARCH AND INTERACTIVE FILTERS CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Main Search Input */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl w-full">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, norma, intendente, proponente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          <button
            onClick={handleResetFilters}
            className="w-full md:w-auto px-4 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Filtros</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Level Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Nivel del Estado</label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="all">Soberanía / Nivel (Todos)</option>
              <option value="nación">Nación Argentina</option>
              <option value="provincia">Provincia</option>
              <option value="municipio">Municipio</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Tipo de Tributo</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="all">Tipo (Todos)</option>
              <option value="impuesto">Impuestos</option>
              <option value="tasa">Tasas Municipales</option>
              <option value="contribucion">Contribuciones</option>
              <option value="derecho">Derechos de Exportación / Regulación</option>
              <option value="percepcion">Percepciones</option>
              <option value="retencion">Retenciones</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Estado de Vigencia</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="all">Vigencia (Todos)</option>
              <option value="vigente">Vigente y Activo</option>
              <option value="derogado">Derogado / Suspendido</option>
              <option value="pendiente_verificacion">Pendiente de Verificación</option>
            </select>
          </div>

          {/* Evidence Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Calidad de Evidencia</label>
            <select
              value={filterEvidence}
              onChange={(e) => setFilterEvidence(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="all">Nivel de Evidencia (Todos)</option>
              <option value="A">Nivel A — Oficial Primaria</option>
              <option value="B">Nivel B — Oficial Secundaria</option>
              <option value="C">Nivel C — Técnica Confiable</option>
              <option value="D">Nivel D — Pendiente</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTER RESULT STATISTICS */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>Mostrando {filteredTaxes.length} de {TRIBUTOS.length} tributos indexados</span>
        {searchQuery && (
          <span>Búsqueda activa: &ldquo;{searchQuery}&rdquo;</span>
        )}
      </div>

      {/* TABLE DATA LISTING */}
      <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl">
        {filteredTaxes.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-400">No encontramos resultados para tu búsqueda.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Comprobá la ortografía de los filtros elegidos o realizá una sugerencia de carga si sabés que existe este impuesto.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  <th className="p-4 pl-6">Nombre del Tributo</th>
                  <th className="p-4">Jurisdicción</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Norma Origen</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 pr-6 text-center">Evidencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredTaxes.map((tax) => {
                  const isExpanded = expandedTaxId === tax.id;
                  
                  return (
                    <React.Fragment key={tax.id}>
                      {/* Main Row */}
                      <tr
                        onClick={() => toggleExpand(tax.id)}
                        className={`hover:bg-slate-850/50 transition cursor-pointer select-none ${
                          isExpanded ? 'bg-slate-850/30' : ''
                        }`}
                      >
                        {/* Name Cell */}
                        <td className="p-4 pl-6 text-xs text-slate-200">
                          <div className="flex items-center gap-2">
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                            <div className="space-y-0.5">
                              <span className="font-bold text-white block">{tax.name}</span>
                              {tax.isBaseDemo && (
                                <span className="inline-block px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-mono font-black uppercase rounded">
                                  Dato de Ejemplo
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Jurisdiction Cell */}
                        <td className="p-4 text-xs text-slate-300">
                          <div className="space-y-0.5">
                            <span className="font-semibold block">{getJurisdictionName(tax.jurisdictionId)}</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">{tax.level}</span>
                          </div>
                        </td>

                        {/* Type Cell */}
                        <td className="p-4 text-xs">
                          <span className="px-2 py-0.5 bg-slate-950 border border-slate-850 font-mono text-[10px] text-slate-400 capitalize rounded">
                            {tax.type}
                          </span>
                        </td>

                        {/* Rule Origin Cell */}
                        <td className="p-4 text-xs text-slate-400 max-w-[180px] truncate">
                          {tax.normaCreacion}
                        </td>

                        {/* Status Cell */}
                        <td className="p-4 text-xs">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${
                              tax.status === 'vigente'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : tax.status === 'derogado'
                                  ? 'bg-rose-500/10 text-rose-400'
                                  : 'bg-purple-500/10 text-purple-400'
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${
                              tax.status === 'vigente'
                                ? 'bg-emerald-400'
                                : tax.status === 'derogado'
                                  ? 'bg-rose-400'
                                  : 'bg-purple-400'
                            }`} />
                            <span>{tax.status === 'pendiente_verificacion' ? 'Pendiente' : tax.status}</span>
                          </span>
                        </td>

                        {/* Evidence Badge Cell */}
                        <td className="p-4 pr-6 text-center">
                          <EvidenceBadge
                            level={tax.evidenceLevel}
                            dateString={tax.lastVerified}
                            hash={tax.evidenceHash}
                            sourceName={tax.authorityCobradora}
                            interactive={false} // Tooltips enabled in full panel below
                          />
                        </td>
                      </tr>

                      {/* RESPONSIVEL RESPONSIBIILITY TIMELINE EXPANSION DRAWER */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-slate-950/65 p-6 border-l-2 border-emerald-500 shadow-inner">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                              {/* Left detail card */}
                              <div className="lg:col-span-5 space-y-4">
                                <div>
                                  <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">Ente Recaudador y Ejecutor</span>
                                  <p className="text-xs text-slate-300 font-bold">{tax.authorityCobradora}</p>
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">Normativa Vigente</span>
                                  <p className="text-xs text-slate-400 italic mb-2">{tax.normaCreacion} — Fecha: {tax.fechaCreacion}</p>
                                  
                                  <a
                                    href={tax.sourceUrl}
                                    target="_blank"
                                    rel="noreferrer referrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                                  >
                                    <Link className="w-3.5 h-3.5" />
                                    <span>Acceder a Fuente Oficial / Norma Completa</span>
                                  </a>
                                </div>

                                {tax.evidenceHash && (
                                  <div className="p-3 bg-slate-900 border border-slate-850/80 rounded-xl space-y-0.5">
                                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wide block">Firma de Registro Digital (Hash de Control)</span>
                                    <span className="block text-[10px] font-mono text-slate-400 truncate">{tax.evidenceHash}</span>
                                  </div>
                                )}
                              </div>

                              {/* Right Responsibility Flow Timeline "Quién Lo Hizo Posible" */}
                              <div className="lg:col-span-7 space-y-4">
                                <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                                  <Scale className="w-4 h-4 text-emerald-400" />
                                  <span>Trazabilidad de Responsabilidad Política y Técnica</span>
                                </h4>
                                
                                <p className="text-[11px] text-slate-400 mb-4">
                                  Línea de tiempo de los actores y espacios institucionales que hicieron posible este tributo:
                                </p>

                                {/* Vertical Timeline steps */}
                                <div className="relative border-l border-slate-800 ml-3.5 pl-6 space-y-6">
                                  
                                  {/* Step 1: Redacción / Proposición */}
                                  <div className="relative">
                                    <span className="absolute -left-[30px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">1</span>
                                    <div className="text-left">
                                      <p className="text-xs font-bold text-slate-300">Redacción y Redacción de Anteproyecto</p>
                                      <p className="text-xs text-slate-400">
                                        Propuesto por <span className="text-emerald-400 font-semibold">{tax.propuestoPor}</span> ({tax.propuestoPorPartido}) No hay debate cívico que no empiece en el proponente original.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 2: Aprobación */}
                                  <div className="relative">
                                    <span className="absolute -left-[30px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">2</span>
                                    <div className="text-left">
                                      <p className="text-xs font-bold text-slate-300">Aprobación Legislativa</p>
                                      <p className="text-xs text-slate-400">
                                        Tratado, votado y sancionado por <span className="text-slate-300 font-semibold">{tax.aprobadoPor}</span> mediante sesiones y debates legislativos correspondientes.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 3: Promulgación */}
                                  <div className="relative">
                                    <span className="absolute -left-[30px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">3</span>
                                    <div className="text-left">
                                      <p className="text-xs font-bold text-slate-300">Promulgación Ejecutiva</p>
                                      <p className="text-xs text-slate-400">
                                        Firmado, publicado en boletín oficial y promulgado bajo el período de mandato de <span className="text-slate-200 font-semibold">{tax.promulgadoPor}</span>.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 4: Ejecución / Cobro */}
                                  <div className="relative">
                                    <span className="absolute -left-[30px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">4</span>
                                    <div className="text-left">
                                      <p className="text-xs font-bold text-slate-300">Administración y Ejecución Fiscal</p>
                                      <p className="text-xs text-slate-400">
                                        Cobrado, fiscalizado y auditado activamente hoy por <span className="text-slate-200 font-semibold">{tax.ejecutadoPor}</span> para sostener el presupuesto público.
                                      </p>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
