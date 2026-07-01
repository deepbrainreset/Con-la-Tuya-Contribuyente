/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Check, AlertCircle, FileText, Send, Clock, User, HelpCircle, ShieldCheck, ClipboardList } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { ContributionProposal } from '../types';

export default function PropuestasContribucion() {
  // Preloaded active audit proposals for direct demonstration of work
  const [proposals, setProposals] = useState<ContributionProposal[]>([
    {
      id: 'prop-1',
      scope: 'tributos',
      targetName: 'Tasa Vial de San Vicente',
      proposedChange: 'La alícuota sobre el litro de nafta súper aumentó del 1.5% al 2.3% mediante decreto impositivo local.',
      evidenceUrl: 'https://boletinsanvicente.gob.ar/decretos/458-2026',
      contributorName: 'Mariángeles Ruiz',
      contributorEmail: 'mruiz@gmail.com',
      status: 'pendiente',
      createdAt: '2026-05-24',
      auditLog: [
        'Propuesta recibida en el sistema cívico.',
        'Asignado a verificador de actas de provincia de Buenos Aires.'
      ]
    },
    {
      id: 'prop-2',
      scope: 'jurisdiccion',
      targetName: 'Municipio de La Matanza',
      proposedChange: 'Actualizar plantilla presupuestaria general. El presupuesto ejecutado según portal oficial ascendió a 340 mil millones de pesos.',
      evidenceUrl: 'https://www.lamatanza.gov.ar/transparencia/presupuesto2025',
      contributorName: 'Esteban Altieri',
      contributorEmail: 'esteban.alt@outlook.com',
      status: 'aprobado',
      createdAt: '2026-05-12',
      auditLog: [
        'Propuesta enviada por consorcio cívico.',
        'Verificación de fuente oficial de nivel A completado de manera satisfactoria.',
        'La información consolidada fue actualizada en el mapa nacional principal.'
      ]
    },
    {
      id: 'prop-3',
      scope: 'politico',
      targetName: 'Fernando Espinoza',
      proposedChange: 'Registrar la formalización de apelación judicial de fecha Mayo de 2024 vinculada a sus expedientes.',
      evidenceUrl: 'https://pjn.gov.ar/consulta-de-causas/sentencias-camara-federal',
      contributorName: 'Guillermo Cáceres',
      contributorEmail: 'gcaceres_abg@speedy.com.ar',
      status: 'aprobado',
      createdAt: '2026-05-15',
      auditLog: [
        'Enviado con facsímil de fallo de Cámara Federal de Apelaciones.',
        'Contrastado con registro del CPJN. Aprobación unánime del tribunal de ética del proyecto.'
      ]
    }
  ]);

  // Form states
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [scope, setScope] = useState<'jurisdiccion' | 'tributo' | 'politico'>('tributo');
  const [targetName, setTargetName] = useState('');
  const [proposedChange, setProposedChange] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contributorName || !contributorEmail || !targetName || !proposedChange || !evidenceUrl) {
      setFormError('Por favor, completá todos los campos obligatorios.');
      return;
    }

    if (!evidenceUrl.startsWith('http://') && !evidenceUrl.startsWith('https://')) {
      setFormError('Por favor, ingresá una dirección de enlace (URL) oficial válida que comience con http:// o https://.');
      return;
    }

    const newProp: ContributionProposal = {
      id: `prop-${Date.now()}`,
      scope,
      targetName,
      proposedChange,
      evidenceUrl,
      contributorName,
      contributorEmail,
      status: 'pendiente',
      createdAt: new Date().toISOString().split('T')[0],
      auditLog: [
        'Sugerencia de contribución enviada por el ciudadano.',
        'Pendiente de análisis por el cuerpo de verificación legal de Con La Tuya Contribuyente.'
      ]
    };

    setProposals([newProp, ...proposals]);
    setFormSuccess(true);
    setFormError('');

    // Reset controls
    setScope('tributo');
    setTargetName('');
    setProposedChange('');
    setEvidenceUrl('');
  };

  return (
    <div className="space-y-8 py-4 text-left font-sans" id="contribucion-view">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Gobernanza Cívica y Sugerencia de Correcciones</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Tú poseés el control. La plataforma opera bajo un modelo transparente de curaduría ciudadana de datos públicos. 
          Si detectás un número desactualizado en una provincia o un impuesto municipal omitido, envianos tu corrección con evidencia obligatoria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUT FORM COLUMN (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-5">
          <h3 className="font-extrabold text-sm text-white pb-2 border-b border-slate-850 tracking-tight flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span>Sugerir Corrección / Enmienda</span>
          </h3>

          {formSuccess ? (
            <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3" id="proposal-success-box">
              <Check className="w-6 h-6 text-emerald-400" />
              <div className="text-xs">
                <span className="font-bold text-white block">Sugerencia Registrada con Éxito</span>
                <p className="text-slate-300 mt-1">
                  Tu propuesta fue añadida de manera temporal a la gacetilla pública en estado de revisión. 
                  Se enviará un aviso de resolución a tu correo registrado una vez que nuestros verificadores contrasten de forma fehaciente tu enlace de boletín oficial.
                </p>
              </div>
              <button
                onClick={() => setFormSuccess(false)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-semibold text-[10px] hover:text-white"
              >
                Cargar otra sugerencia
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/15 rounded-lg text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Informant identities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Tu Nombre / Pseudónimo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Eduardo Pérez"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Tu Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="Ej: edu@gmail.com"
                    value={contributorEmail}
                    onChange={(e) => setContributorEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500/40"
                  />
                </div>
              </div>

              {/* Scope selectors */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Área del Registro Afectado</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-emerald-500/40"
                >
                  <option value="tributo">Registro de Impuesto o Tasa Municipal</option>
                  <option value="jurisdiccion">Ficha de Provincia o Presupuesto de Municipio</option>
                  <option value="politico">Ficha / Antecedente Fiscal de Político</option>
                </select>
              </div>

              {/* Target name */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Nombre de la Jurisdicción o Registro a Editar</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Municipio de San Isidro u Alícuota del IVA"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              {/* Proposed description of changes */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Descripción del Cambio Sugerido</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Por favor, sé explícito en las cifras u antecedentes. Ej: El municipio derogó la tasa vial mediante la ordenanza fiscal 10.222."
                  value={proposedChange}
                  onChange={(e) => setProposedChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500/40 font-sans leading-normal"
                />
              </div>

              {/* REQUIRED EVIDENCE ENVIROMENT */}
              <div className="space-y-1.5 p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <label className="text-[10px] text-emerald-400 font-mono tracking-wider block uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Enlace de Evidencia Documental (Obligatorio)</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="Ej: https://boletinoficial.gob.ar/norma/detalles/..."
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500/40 font-mono text-[11px]"
                />
                <span className="text-[9px] text-slate-500 leading-normal block">
                  Cargá el link al boletín oficial, ley provista en InfoLeg, fallo de cámara judicial u ordenanza municipal certificada. 
                  No aceptamos redes sociales ni rumores.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-500 text-slate-950 font-bold tracking-wide rounded-xl hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Propuesta a Auditoría</span>
              </button>
            </form>
          )}
        </div>

        {/* FEED / AUDIT LOG QUEUE COLUMN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase pl-1">Propuestas Recientes en el Sistema</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">Auditoría en Vivo</span>
          </div>

          <div className="space-y-4">
            {proposals.map((prop) => (
              <div key={prop.id} className="p-5 bg-slate-900 border border-slate-850 rounded-2xl space-y-4 text-left">
                {/* Header item */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-800/60">
                  <div className="space-y-0.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-slate-950 border border-slate-850 text-[9px] text-slate-400 font-mono uppercase font-bold rounded">
                        {prop.scope}
                      </span>
                      <h4 className="font-bold text-xs text-white">{prop.targetName}</h4>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">Enviada el: {prop.createdAt} por {prop.contributorName}</span>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                    prop.status === 'pendiente'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                  }`}>
                    {prop.status === 'pendiente' ? 'Pendiente' : 'Verificado / Aprobado'}
                  </span>
                </div>

                {/* Body change */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Propuesta de Modificación</span>
                  <p className="text-slate-300 leading-normal font-sans bg-slate-950/40 p-3 rounded-xl border border-slate-950">
                    &ldquo;{prop.proposedChange}&rdquo;
                  </p>
                </div>

                {/* Evidence link provided */}
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Evidencia Documental Adjunta</span>
                  <a
                    href={prop.evidenceUrl}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="text-emerald-400 hover:underline font-mono text-[10px] block truncate"
                  >
                    {prop.evidenceUrl}
                  </a>
                </div>

                {/* Audit Log timeline trail */}
                <div className="space-y-2 pt-2 border-t border-slate-850 text-left">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Bitácora de Auditoría Interna (Audit Log)</span>
                  </span>

                  <div className="space-y-1.5 pl-2.5 border-l border-slate-800">
                    {prop.auditLog.map((log, lidx) => (
                      <div key={lidx} className="text-[10px] text-slate-400 font-sans flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-1 shrink-0">•</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
