/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Award, Hammer, Scale, ClipboardList, ShieldCheck, AlertCircle, Sparkles, AlertOctagon } from 'lucide-react';
import { POLITICIANS } from '../data/politicos';
import { Politician } from '../types';
import EvidenceBadge from '../components/EvidenceBadge';

interface PerfilPoliticoProps {
  selectedPolId?: string;
  setSelectedPolId?: (id: string) => void;
}

export default function PerfilPolitico({ selectedPolId, setSelectedPolId }: PerfilPoliticoProps = {}) {
  const [localPolId, setLocalPolId] = useState<string>(POLITICIANS[0].id);

  const activePolId = selectedPolId || localPolId;
  const changePolId = setSelectedPolId || setLocalPolId;

  const selectedPol = POLITICIANS.find(p => p.id === activePolId) || POLITICIANS[0];

  return (
    <div className="space-y-8 py-4 text-left" id="perfil-politico-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Registro de Autoridades y Historial Fiscal</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Auditoría de antecedentes de funcionarios públicos. Hojas de vida presupuestaria, declaraciones juradas informadas 
          e implicancias en causas judiciales basadas estrictamente en gacetillas de tribunales y fuentes oficiales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Politicians selector list (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase pl-1">Funcionarios Analizados</span>
          
          <div className="space-y-2">
            {POLITICIANS.map((pol) => {
              const isActive = pol.id === activePolId;
              return (
                <button
                  key={pol.id}
                  onClick={() => changePolId(pol.id)}
                  className={`w-full flex items-center gap-3.5 p-3.5 text-left rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white shadow-md'
                      : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm tracking-widest ${
                    isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/25' : 'bg-slate-950 text-slate-500 border-slate-900'
                  }`}>
                    {pol.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-100 block">{pol.name}</h3>
                    <p className="text-[10px] text-slate-500 truncate max-w-[210px]">{pol.currentRole}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantía de Imparcialidad</span>
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              La plataforma no evalúa gestiones subjetivamente ni introduce adjetivos no contemplados en documentos probados. 
              Si contás con gacetas parlamentarias o fallos para enriquecer estos perfiles, utilizá la pestaña de Gobernanza.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Politician Profile Details (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl">
          {/* Profile Header Block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl tracking-tight">
                {selectedPol.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedPol.name}</h2>
                <p className="text-xs text-slate-300 font-semibold">{selectedPol.currentRole}</p>
                <p className="text-[10px] text-slate-500">{selectedPol.currentParty}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <EvidenceBadge
                level={selectedPol.evidenceLevel}
                sourceName="Oficina de Integridad Financiera"
                dateString="2026-05-15"
              />
            </div>
          </div>

          {/* Previous Positions Timeline */}
          <div className="space-y-3 text-left">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">Trayectoria Pública de Mandatos</h3>
            <div className="relative border-l border-slate-800 pl-4 py-1 ml-2.5 space-y-4">
              {/* Current Role depicted as top of timeline */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/10" />
                <div className="text-xs text-left">
                  <span className="text-[10px] text-emerald-400 font-mono">Presente</span>
                  <p className="font-bold text-slate-200">{selectedPol.currentRole}</p>
                  <p className="text-[11px] text-slate-500">{selectedPol.currentParty}</p>
                </div>
              </div>

              {/* Historical Roles */}
              {selectedPol.previousRoles.map((role, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="text-xs text-left">
                    <span className="text-[10px] text-slate-500 font-mono">{role.period}</span>
                    <p className="font-bold text-slate-300">{role.role}</p>
                    <p className="text-[11px] text-slate-500">{role.party} — Jurisdicción: {role.jurisdiction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fiscal Decisions Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl space-y-3 text-left">
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <Hammer className="w-4 h-4 text-emerald-400" />
                <span>Medidas Fiscales Respaldadas</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-400 leading-relaxed list-inside list-disc">
                {selectedPol.decisionesFiscales.map((dec, idx) => (
                  <li key={idx}>
                    {dec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl space-y-3 text-left">
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-emerald-400" />
                <span>Normas de Autoría / Decretos Firme</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-400 leading-relaxed list-inside list-disc">
                {selectedPol.leyesDecretosAsociados.map((ley, idx) => (
                  <li key={idx}>
                    {ley}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* asset declaration (ddjj) summary */}
          {selectedPol.ddjjSummary && (
            <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl text-left space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white tracking-tight">Síntesis Informativa de Declaración de Bienes</h4>
                <span className="text-[9px] text-slate-500 font-mono uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  Transparencia Pública
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{selectedPol.ddjjSummary}</p>
              <div className="text-[9px] text-slate-500 font-mono">
                Registrado oficialmente ante: <span className="text-slate-400">{selectedPol.ddjjSource}</span>
              </div>
            </div>
          )}

          {/* Judicial Case status with verified badge */}
          <div className="space-y-3 text-left">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-rose-400" />
              <span>Situación y Causas Judiciales Registradas</span>
            </h3>

            {(!selectedPol.causasJudiciales || selectedPol.causasJudiciales.length === 0) ? (
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-slate-400">
                Al día de la fecha de verificación, no se registran procesamientos firmes ni condenas judiciales pendientes 
                con fuente oficial reportada para este funcionario.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedPol.causasJudiciales.map((causa, idx) => (
                  <div key={idx} className="p-4 bg-rose-950/5 border border-rose-500/15 rounded-xl space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-xs text-rose-400 block">{causa.causa}</span>
                      <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-mono rounded uppercase">
                        {causa.estado}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Estatus del expediente reportado ante tribunales. Esta mención se ajusta a las normativas de presunción 
                      así como a fallos definitivos.
                    </div>
                    <div className="pt-2 border-t border-slate-850 text-[10px] text-slate-500 font-mono truncate">
                      Fuente Judicial: {causa.fuente}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
