/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Search, Calculator, ArrowRight, BookOpen, Scale, Coins, AlertCircle } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { TRIBUTOS } from '../data/tributos';
import { POLITICAL_TRANSPARENCY } from '../data/transparenciaPolitica';
import { EXECUTIVE_AUTHORITIES_2026 } from '../data/autoridadesEjecutivas2026';

const HERO_IMAGE = 'https://res.cloudinary.com/dw4k14vmn/image/upload/v1785234604/file_000000004ae0820e906b8ffaf57779d9_kvjwew.png';

const ALL_POLITICAL_RECORDS = [
  ...POLITICAL_TRANSPARENCY,
  ...EXECUTIVE_AUTHORITIES_2026.filter(
    executive => !POLITICAL_TRANSPARENCY.some(base => base.name === executive.name)
  )
];

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

  const matchingJurisdictions = query.length >= 2
    ? JURISDICTIONS.filter(j =>
        j.name.toLowerCase().includes(query) ||
        (j.summary && j.summary.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const matchingTributos = query.length >= 2
    ? TRIBUTOS.filter(t =>
        t.name.toLowerCase().includes(query) ||
        (t.normaCreacion && t.normaCreacion.toLowerCase().includes(query)) ||
        (t.authorityCobradora && t.authorityCobradora.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const matchingPoliticians = query.length >= 2
    ? ALL_POLITICAL_RECORDS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.party.toLowerCase().includes(query) ||
        p.jurisdiction.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const hasMatches = matchingJurisdictions.length > 0 || matchingTributos.length > 0 || matchingPoliticians.length > 0;

  return (
    <div className="space-y-16 py-6 sm:py-8" id="landing-view">
      <section className="relative max-w-6xl mx-auto px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">
          <img
            src={HERO_IMAGE}
            alt="Con La Tuya Contribuyente — auditoría cívica y fiscal de Argentina"
            className="block w-full h-auto max-h-[640px] object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-8 sm:mt-10">
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

          <div className="max-w-2xl mx-auto relative mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-900">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar provincia, municipio, tributo, partido o autoridad..."
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

            {query.length >= 2 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-left font-sans text-xs max-h-[380px] overflow-y-auto space-y-4">
                {!hasMatches ? (
                  <div className="text-slate-500 text-center py-4 font-mono text-[11px]">
                    No se encontraron coincidencias directas para “{searchQuery}”. Presioná Buscar todo para ver el registro completo.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block font-bold border-b border-slate-800 pb-1">
                      Resultados coincidentes
                    </span>

                    {matchingJurisdictions.length > 0 && (
                      <SearchGroup title="Jurisdicciones" tone="emerald">
                        {matchingJurisdictions.map(j => (
                          <ResultButton
                            key={j.id}
                            title={j.name}
                            subtitle={j.summary || 'Ver ficha territorial.'}
                            action="Ir al mapa"
                            tone="emerald"
                            onClick={() => onNavigate('mapa', j.id)}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingTributos.length > 0 && (
                      <SearchGroup title="Leyes e impuestos" tone="blue">
                        {matchingTributos.map(t => (
                          <ResultButton
                            key={t.id}
                            title={t.name}
                            subtitle={`${t.normaCreacion || 'Norma local'} · ${t.authorityCobradora}`}
                            action="Ver historial"
                            tone="blue"
                            onClick={() => {
                              setSearchQuery(t.name);
                              onNavigate('tributos');
                            }}
                          />
                        ))}
                      </SearchGroup>
                    )}

                    {matchingPoliticians.length > 0 && (
                      <SearchGroup title="Autoridades e historial fiscal" tone="purple">
                        {matchingPoliticians.map(p => (
                          <ResultButton
                            key={p.id}
                            title={p.name}
                            subtitle={`${p.role} · ${p.party}`}
                            action="Ver legajo"
                            tone="purple"
                            onClick={() => onNavigate('politicos', p.id)}
                          />
                        ))}
                      </SearchGroup>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Sugeridos:</span>
            {['La Matanza', 'IVA', 'Tasa Vial', 'Córdoba', 'Vicente López', 'Ganancias'].map(term => (
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
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-amber-950/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left">
            <h4 className="text-sm font-semibold text-amber-400 tracking-wide">AVISO DE SEGURIDAD LEGAL Y NEUTRALIDAD</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La plataforma reorganiza información pública oficial y estimaciones metodológicas con fines educativos y de auditoría.
              Las responsabilidades políticas, judiciales y fiscales se muestran únicamente cuando existe evidencia trazable y se distingue
              entre propuesta, voto, promulgación, denuncia, procesamiento, sentencia, absolución y sobreseimiento.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard icon={<Coins className="w-5 h-5" />} tone="emerald" title="1. Transparencia Radical">
          Unificamos boletines, leyes, decretos y ordenanzas fiscales nacionales, provinciales y municipales en un registro consultable y trazable.
        </FeatureCard>
        <FeatureCard icon={<Scale className="w-5 h-5" />} tone="blue" title="2. Auditoría de Responsabilidad">
          Identificamos qué autoridades, legisladores y espacios institucionales participaron de la creación, aprobación, modificación o ejecución de cada tributo.
        </FeatureCard>
        <FeatureCard icon={<Calculator className="w-5 h-5" />} tone="purple" title="3. Impacto Económico">
          Mostramos cómo la carga nacional, provincial y municipal puede modificar el precio final y diferenciamos datos observados de estimaciones.
        </FeatureCard>
      </section>

      <section className="bg-slate-900/40 border-y border-slate-900 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8 text-left">
          <h2 className="text-xl font-bold text-white tracking-tight border-l-2 border-emerald-500 pl-3">
            Trazabilidad de la información y niveles de evidencia
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
            Cada afirmación debe poder volver a su fuente. Si un dato no está verificado, la plataforma lo indica explícitamente en lugar de completarlo por inferencia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EvidenceCard level="A" title="Oficial primaria" note="Leyes, decretos, boletines oficiales, actas de votación, resoluciones y documentos emitidos por el organismo competente." />
            <EvidenceCard level="B" title="Oficial secundaria" note="Portales de transparencia, datasets gubernamentales y documentación institucional derivada de fuentes primarias." />
            <EvidenceCard level="C" title="Técnica confiable" note="Estudios académicos, instituciones fiscales especializadas y reconstrucciones metodológicas con fuente identificada." />
            <EvidenceCard level="D" title="Pendiente de verificación" note="Dato incompleto o todavía no contrastado. No debe interpretarse como hecho probado." />
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchGroup({ title, tone, children }: { title: string; tone: 'emerald' | 'blue' | 'purple'; children: React.ReactNode }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400' : tone === 'blue' ? 'text-blue-400' : 'text-purple-400';
  return (
    <div className="space-y-2">
      <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${toneClass}`}>{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ResultButton({ title, subtitle, action, tone, onClick }: { key?: React.Key; title: string; subtitle: string; action: string; tone: 'emerald' | 'blue' | 'purple'; onClick: () => void }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400 border-emerald-500/25' : tone === 'blue' ? 'text-blue-400 border-blue-500/25' : 'text-purple-400 border-purple-500/25';
  return (
    <button onClick={onClick} className="w-full p-2.5 bg-slate-950/60 hover:bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center transition text-left cursor-pointer group">
      <div className="truncate pr-4">
        <span className="font-bold text-slate-200 block text-xs">{title}</span>
        <span className="text-[10px] text-slate-500 truncate block">{subtitle}</span>
      </div>
      <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded uppercase shrink-0 ${toneClass}`}>{action}</span>
    </button>
  );
}

function FeatureCard({ icon, tone, title, children }: { icon: React.ReactNode; tone: 'emerald' | 'blue' | 'purple'; title: string; children: React.ReactNode }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10' : tone === 'blue' ? 'text-blue-400 bg-blue-500/10 border-blue-500/10' : 'text-purple-400 bg-purple-500/10 border-purple-500/10';
  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left hover:border-slate-700 transition">
      <div className={`p-2.5 border rounded-xl inline-block mb-4 ${toneClass}`}>{icon}</div>
      <h3 className="text-base font-bold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{children}</p>
    </div>
  );
}

function EvidenceCard({ level, title, note }: { level: 'A' | 'B' | 'C' | 'D'; title: string; note: string }) {
  const classes = {
    A: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    B: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    C: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    D: 'text-purple-400 border-purple-500/20 bg-purple-500/5'
  }[level];
  return (
    <div className={`p-4 rounded-xl border ${classes}`}>
      <div className="font-mono text-xs font-extrabold uppercase tracking-wider">Nivel {level} — {title}</div>
      <p className="text-xs text-slate-300 leading-relaxed mt-2">{note}</p>
    </div>
  );
}
