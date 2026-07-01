/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Calendar, Info, Clock } from 'lucide-react';
import { EvidenceLevel } from '../types';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  dateString?: string;
  hash?: string;
  sourceName?: string;
  interactive?: boolean;
}

export default function EvidenceBadge({
  level,
  dateString,
  hash,
  sourceName,
  interactive = true
}: EvidenceBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const config = {
    A: {
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
      label: 'Nivel A — Oficial Primaria',
      desc: 'Boletín Oficial, estatuto legal, ordenanza aprobada, decreto del ejecutivo u informe presupuestario oficial certificado.'
    },
    B: {
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
      label: 'Nivel B — Oficial Secundaria',
      desc: 'Portales de gobierno consolidados, gacetilla oficial, respuesta formal a solicitud de acceso a información pública o memorias contables.'
    },
    C: {
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
      label: 'Nivel C — Técnica Confiable',
      desc: 'Papeles académicos, informes de consultoras reputadas, mediciones de ONGs fiscales, estudios universitarios o auditorías sectoriales.'
    },
    D: {
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
      label: 'Nivel D — Pendiente',
      desc: 'Propuesta cargada por la comunidad de contribuyentes, pendiente de auditoría y validación documental de fuentes primarias.'
    }
  };

  const item = config[level] || config.D;

  return (
    <div className="relative inline-block" id={`ev-badge-${level}`}>
      <button
        type="button"
        onClick={() => {
          if (interactive) setShowTooltip(!showTooltip);
        }}
        onMouseEnter={() => {
          if (interactive) setShowTooltip(true);
        }}
        onMouseLeave={() => {
          if (interactive) setShowTooltip(false);
        }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${item.color}`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Evidencia {level}</span>
      </button>

      {/* Tooltip dialog overlay */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl text-left transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className={`p-1.5 rounded-lg border flex-shrink-0 ${item.color}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white mb-1">{item.label}</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-2.5">{item.desc}</p>
            </div>
          </div>

          {(sourceName || dateString || hash) && (
            <div className="pt-2.5 border-t border-slate-800 text-[11px] text-slate-500 font-mono space-y-1.5">
              {sourceName && (
                <div role="presentation" className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-500" />
                  <span className="truncate max-w-[220px]">F: {sourceName}</span>
                </div>
              )}
              {dateString && (
                <div role="presentation" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>Verif: {dateString}</span>
                </div>
              )}
              {hash && (
                <div role="presentation" className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="truncate max-w-[220px] text-[10px]">Hash: {hash.substring(0, 16)}...</span>
                </div>
              )}
            </div>
          )}

          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
