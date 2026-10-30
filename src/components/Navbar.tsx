/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Menu,
  X,
  Landmark,
  FileText,
  Calculator,
  ShoppingCart,
  Users,
  Award,
  BookOpen,
  Heart,
  TrendingUp,
  Layers,
  LineChart,
  Vote,
  Scale,
  ShieldCheck,
  History,
  MessageSquareQuote,
  Microscope,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  visits?: number | null;
}

interface NavSubItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  param?: string;
}

interface NavPillar {
  id: string;
  label: string;
  defaultTab: string;
  items: NavSubItem[];
}

export const NAVIGATION_PILLARS: NavPillar[] = [
  {
    id: 'pilar-dinero',
    label: '1. Dinero Público',
    defaultTab: 'tributos',
    items: [
      { id: 'tributos', label: 'Recaudación e Impuestos', description: 'Tributos nacionales, provinciales y tasas municipales', icon: FileText },
      { id: 'mapa-tributario', label: 'Mapa Tributario Auditado', description: 'Explorador de normas, alícuotas y hechos imponibles', icon: Layers },
      { id: 'gasto', label: 'Presupuesto, Gasto y Compras', description: 'Ejecución presupuestaria, contrataciones y pauta', icon: TrendingUp },
      { id: 'mapa', label: 'Distribución Territorial', description: 'Mapa nacional de jurisdicciones y presupuestos', icon: Award },
      { id: 'calculadora', label: 'Calculadora de Presión Fiscal', description: 'Estimación de carga tributaria sobre ingresos', icon: Calculator },
      { id: 'simulador', label: 'Simulador de Precio Final', description: 'Incidencia de impuestos en bienes y servicios', icon: ShoppingCart }
    ]
  },
  {
    id: 'pilar-observatorio',
    label: '2. Observatorio Histórico',
    defaultTab: 'observatorio',
    items: [
      { id: 'observatorio', label: 'Línea Temporal y Series (1946–2026)', description: 'Gobiernos, presión fiscal, monedas y coparticipación', icon: History },
      { id: 'observatorio', param: 'dossier-previsional-2008', label: 'Expedientes Interactivos', description: 'SIPA 2008, YPF 1992/2012, Moratorias, Ganancias 2024', icon: FileText },
      { id: 'evidencia-vs-relato', label: 'Relato Mediático vs. Proceso Estatal', description: 'Qué se intenta instalar vs. actos administrativos reales', icon: ShieldCheck },
      { id: 'inflacion', label: 'Inflación Histórica (1983–2026)', description: 'Serie anual y mensual del IPC oficial y alternativo', icon: LineChart }
    ]
  },
  {
    id: 'pilar-responsables',
    label: '3. Responsables Públicos',
    defaultTab: 'politicos',
    items: [
      { id: 'politicos', label: 'Funcionarios y Mandatos', description: 'Fichas históricas, cargos, DDJJ y patrimonio', icon: Users },
      { id: 'congruencia', label: 'Blog de Congruencia (TV / YouTube)', description: 'Archivos de TN, LN+, C5N, Diputados TV vs. votos y firmas', icon: MessageSquareQuote },
      { id: 'responsabilidad-politica', label: 'Votaciones Nominales', description: 'Trazabilidad de quién propuso, votó y promulgó', icon: Vote },
      { id: 'partidos', label: 'Partidos y Alianzas', description: 'Registro CNE, coaliciones y cobertura desde 1983', icon: Scale },
      { id: 'declaraciones', label: 'Declaraciones y Comparador', description: 'Contraste documental de posiciones históricas', icon: MessageSquareQuote },
      { id: 'evidencia-vs-relato', label: 'Dichos en Medios vs. Expediente Real', description: 'Contraste diario entre discursos y normas/auditorías', icon: ShieldCheck }
    ]
  },
  {
    id: 'pilar-auditorias',
    label: '4. Auditorías Temáticas',
    defaultTab: 'auditorias',
    items: [
      { id: 'evidencia-vs-relato', label: 'Relato vs. Proceso Administrativo', description: 'Informes de contraste entre narrativas y auditorías SIGEN/AGN', icon: ShieldCheck },
      { id: 'auditorias', param: 'jubilaciones-pensiones', label: 'Jubilaciones y Sistema Previsional', description: 'SIPA, FGS, moratorias y sostenibilidad', icon: Landmark },
      { id: 'auditorias', param: 'universidades-publicas', label: 'Universidades Públicas', description: 'Transferencias SPU, matrícula, egresados y AGN', icon: BookOpen },
      { id: 'auditorias', param: 'ciencia-conicet', label: 'Ciencia y CONICET (1958–2026)', description: 'Investigadores, becas, proyectos y repositorio abierto', icon: Microscope },
      { id: 'auditorias', param: 'subsidios-infraestructura', label: 'Subsidios, Salud y Educación', description: 'Energía, transporte y servicios transferidos', icon: TrendingUp },
      { id: 'auditorias', param: 'compras-publicidad', label: 'Compras Públicas y Pauta Oficial', description: 'Procesos COMPR.AR y distribución de publicidad', icon: FileText }
    ]
  },
  {
    id: 'pilar-participacion',
    label: '5. Participación y Transparencia',
    defaultTab: 'contribucion',
    items: [
      { id: 'contribucion', label: 'Consultas Ciudadanas y Correcciones', description: 'Solicitudes Ley 27.275, propuestas y bitácora', icon: ShieldCheck },
      { id: 'transparencia', label: 'Índice de Transparencia Estatal', description: 'Evaluación en 12 dimensiones por jurisdicción', icon: ShieldCheck },
      { id: 'metodologia', label: 'Metodología, Fuentes y Neutralidad', description: 'Reglas editoriales y escala de evidencia A–D', icon: BookOpen },
      { id: 'donacion', label: 'Sostener la Plataforma', description: 'Financiamiento ciudadano independiente', icon: Heart }
    ]
  }
];

export default function Navbar({ currentTab, onNavigate, visits }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPillarId, setOpenPillarId] = useState<string | null>(null);

  const handleNavClick = (id: string, param?: string) => {
    onNavigate(id, param);
    setMobileOpen(false);
    setOpenPillarId(null);
  };

  const isTabInPillar = (pillar: NavPillar) =>
    pillar.items.some(item => currentTab === item.id || currentTab.startsWith(item.id + '/'));

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800" id="global-navbar" aria-label="Navegación principal del observatorio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              aria-current={currentTab === 'landing' ? 'page' : undefined}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Landmark className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight block text-base leading-none">Con La Tuya</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase">Contribuyente</span>
              </div>
            </button>

            {visits !== undefined && visits !== null && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/5 rounded-full border border-emerald-500/10 text-[10px] text-emerald-400 font-mono font-medium leading-none shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>{visits.toLocaleString()} visitas públicas</span>
              </div>
            )}
          </div>

          {/* Navegación Desktop Agrupada en 5 Pilares */}
          <div className="hidden xl:flex items-center gap-1">
            <button
              id="nav-item-landing"
              onClick={() => handleNavClick('landing')}
              aria-current={currentTab === 'landing' ? 'page' : undefined}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentTab === 'landing'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Inicio
            </button>

            {NAVIGATION_PILLARS.map(pillar => {
              const active = isTabInPillar(pillar);
              const isOpen = openPillarId === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className="relative"
                  onMouseEnter={() => setOpenPillarId(pillar.id)}
                  onMouseLeave={() => setOpenPillarId(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => handleNavClick(pillar.defaultTab)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                        : 'text-slate-300 border border-transparent hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{pillar.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-75" />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-80 z-50">
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1">
                        {pillar.items.map((item, idx) => {
                          const Icon = item.icon;
                          const itemActive = currentTab === item.id || currentTab.startsWith(item.id + '/');
                          return (
                            <button
                              key={`${item.id}-${idx}`}
                              id={`nav-item-${item.id}`}
                              type="button"
                              aria-current={itemActive ? 'page' : undefined}
                              onClick={() => handleNavClick(item.id, item.param)}
                              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition cursor-pointer ${
                                itemActive
                                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                  : 'hover:bg-slate-900 text-slate-200'
                              }`}
                            >
                              <Icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold leading-tight">{item.label}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{item.description}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="xl:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navegación Móvil Agrupada en las 5 Secciones */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-900 bg-slate-950 px-3 pt-3 pb-6 space-y-4 max-h-[82vh] overflow-y-auto text-left">
          {NAVIGATION_PILLARS.map(pillar => (
            <div key={pillar.id} className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                {pillar.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {pillar.items.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id || currentTab.startsWith(item.id + '/');
                  return (
                    <button
                      key={`${item.id}-mob-${idx}`}
                      onClick={() => handleNavClick(item.id, item.param)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
