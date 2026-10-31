/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  ChevronRight,
  Home,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  visits?: number | null;
}

interface NavSubItem {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  param?: string;
}

interface NavPillar {
  id: string;
  label: string;
  shortLabel: string;
  mobileDockLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultTab: string;
  items: NavSubItem[];
}

export const NAVIGATION_PILLARS: NavPillar[] = [
  {
    id: 'pilar-dinero',
    label: '1. Dinero Público',
    shortLabel: '1. Dinero',
    mobileDockLabel: 'Dinero',
    icon: Landmark,
    defaultTab: 'tributos',
    items: [
      { id: 'tributos', label: 'Recaudación e Impuestos', shortLabel: 'Impuestos', description: 'Tributos nacionales, provinciales y tasas municipales', icon: FileText },
      { id: 'boletas-y-subsidios', label: 'Boletas de Luz, Agua, ABL y Cascada IIBB', shortLabel: 'Boletas y Subsidios', description: 'Costo real, cuántas veces te cobran IIBB y subsidios', icon: Layers },
      { id: 'mapa-tributario', label: 'Mapa Tributario Auditado', shortLabel: 'Mapa Tributario', description: 'Explorador de normas, alícuotas y hechos imponibles', icon: Layers },
      { id: 'gasto', label: 'Presupuesto, Gasto y Compras', shortLabel: 'Gasto y Compras', description: 'Ejecución presupuestaria, contrataciones y pauta', icon: TrendingUp },
      { id: 'mapa', label: 'Distribución Territorial', shortLabel: 'Mapa Nacional', description: 'Mapa nacional de jurisdicciones y presupuestos', icon: Award },
      { id: 'calculadora', label: 'Calculadora de Presión Fiscal', shortLabel: 'Calculadora Fiscal', description: 'Estimación de carga tributaria sobre ingresos', icon: Calculator },
      { id: 'simulador', label: 'Simulador de Precio Final', shortLabel: 'Simulador Precios', description: 'Incidencia de impuestos en bienes y servicios', icon: ShoppingCart }
    ]
  },
  {
    id: 'pilar-observatorio',
    label: '2. Observatorio Histórico',
    shortLabel: '2. Histórico',
    mobileDockLabel: 'Histórico',
    icon: History,
    defaultTab: 'observatorio',
    items: [
      { id: 'observatorio', label: 'Línea Temporal y Series (1946–2026)', shortLabel: 'Series 1946–2026', description: 'Gobiernos, presión fiscal, monedas y coparticipación', icon: History },
      { id: 'observatorio', param: 'dossier-previsional-2008', label: 'Expedientes Interactivos', shortLabel: 'Expedientes', description: 'SIPA 2008, YPF 1992/2012, Moratorias, Ganancias 2024', icon: FileText },
      { id: 'evidencia-vs-relato', label: 'Relato Mediático vs. Proceso Estatal', shortLabel: 'Evidencia vs. Relato', description: 'Qué se intenta instalar vs. actos administrativos reales', icon: ShieldCheck },
      { id: 'inflacion', label: 'Inflación Histórica (1983–2026)', shortLabel: 'Inflación 1983–2026', description: 'Serie anual y mensual del IPC oficial y alternativo', icon: LineChart }
    ]
  },
  {
    id: 'pilar-responsables',
    label: '3. Responsables Públicos',
    shortLabel: '3. Responsables',
    mobileDockLabel: 'Políticos',
    icon: Users,
    defaultTab: 'politicos',
    items: [
      { id: 'politicos', label: 'Funcionarios y Mandatos', shortLabel: 'Funcionarios', description: 'Fichas históricas, cargos, DDJJ y patrimonio', icon: Users },
      { id: 'congruencia', label: 'Blog de Congruencia (TV / YouTube)', shortLabel: 'Congruencia TV/YT', description: 'Archivos de TN, LN+, C5N, Diputados TV vs. votos y firmas', icon: MessageSquareQuote },
      { id: 'responsabilidad-politica', label: 'Votaciones Nominales', shortLabel: 'Votaciones Congreso', description: 'Trazabilidad de quién propuso, votó y promulgó', icon: Vote },
      { id: 'partidos', label: 'Partidos y Alianzas', shortLabel: 'Partidos (1983+)', description: 'Registro CNE, coaliciones y cobertura desde 1983', icon: Scale },
      { id: 'declaraciones', label: 'Declaraciones y Comparador', shortLabel: 'Comparador Dichos', description: 'Contraste documental de posiciones históricas', icon: MessageSquareQuote },
      { id: 'evidencia-vs-relato', label: 'Dichos en Medios vs. Expediente Real', shortLabel: 'Dichos vs. Expediente', description: 'Contraste diario entre discursos y normas/auditorías', icon: ShieldCheck }
    ]
  },
  {
    id: 'pilar-auditorias',
    label: '4. Auditorías Temáticas',
    shortLabel: '4. Auditorías',
    mobileDockLabel: 'Auditorías',
    icon: Microscope,
    defaultTab: 'auditorias',
    items: [
      { id: 'evidencia-vs-relato', label: 'Relato vs. Proceso Administrativo', shortLabel: 'Evidencia vs. Relato', description: 'Informes de contraste entre narrativas y auditorías SIGEN/AGN', icon: ShieldCheck },
      { id: 'boletas-y-subsidios', label: 'Servicios (Luz/Agua/ABL) y Subsidios', shortLabel: 'Boletas y Subsidios', description: 'Costo real, múltiple imposición y subsidios AMBA vs. Interior', icon: TrendingUp },
      { id: 'auditorias', param: 'jubilaciones-pensiones', label: 'Jubilaciones y Sistema Previsional', shortLabel: 'Jubilaciones (SIPA)', description: 'SIPA, FGS, moratorias y sostenibilidad', icon: Landmark },
      { id: 'auditorias', param: 'universidades-publicas', label: 'Universidades Públicas', shortLabel: 'Universidades', description: 'Transferencias SPU, matrícula, egresados y AGN', icon: BookOpen },
      { id: 'auditorias', param: 'ciencia-conicet', label: 'Ciencia y CONICET (1958–2026)', shortLabel: 'CONICET', description: 'Investigadores, becas, proyectos y repositorio abierto', icon: Microscope },
      { id: 'auditorias', param: 'subsidios-infraestructura', label: 'Subsidios, Salud y Educación', shortLabel: 'Salud y Subsidios', description: 'Energía, transporte y servicios transferidos', icon: TrendingUp },
      { id: 'auditorias', param: 'compras-publicidad', label: 'Compras Públicas y Pauta Oficial', shortLabel: 'Compras y Pauta', description: 'Procesos COMPR.AR y distribución de publicidad', icon: FileText }
    ]
  },
  {
    id: 'pilar-participacion',
    label: '5. Participación y Transparencia',
    shortLabel: '5. Transparencia',
    mobileDockLabel: 'Transparencia',
    icon: ShieldCheck,
    defaultTab: 'contribucion',
    items: [
      { id: 'contribucion', label: 'Consultas Ciudadanas y Correcciones', shortLabel: 'Consultas Ley 27.275', description: 'Solicitudes Ley 27.275, propuestas y bitácora', icon: ShieldCheck },
      { id: 'transparencia', label: 'Índice de Transparencia Estatal', shortLabel: 'Índice Transparencia', description: 'Evaluación en 12 dimensiones por jurisdicción', icon: ShieldCheck },
      { id: 'metodologia', label: 'Metodología, Fuentes y Neutralidad', shortLabel: 'Metodología', description: 'Reglas editoriales y escala de evidencia A–D', icon: BookOpen },
      { id: 'donacion', label: 'Sostener la Plataforma', shortLabel: 'Donaciones', description: 'Financiamiento ciudadano independiente', icon: Heart }
    ]
  }
];

export default function Navbar({ currentTab, onNavigate, visits }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPillarId, setOpenPillarId] = useState<string | null>(null);
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const isTabInPillar = (pillar: NavPillar) =>
    pillar.items.some(item => currentTab === item.id || currentTab.startsWith(item.id + '/'));

  const activePillar =
    NAVIGATION_PILLARS.find(pillar => isTabInPillar(pillar)) || NAVIGATION_PILLARS[0];

  // Sincronizar acordeón móvil con el pilar activo al abrir el menú
  useEffect(() => {
    if (mobileOpen) {
      const current = NAVIGATION_PILLARS.find(p => isTabInPillar(p));
      setExpandedMobilePillar(current ? current.id : NAVIGATION_PILLARS[0].id);
    }
  }, [mobileOpen, currentTab]);

  // Cerrar menús desplegables al hacer clic fuera o presionar Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenPillarId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPillarId(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (id: string, param?: string) => {
    onNavigate(id, param);
    setMobileOpen(false);
    setOpenPillarId(null);
  };

  // Deduplicar ítems hermanos dentro de la barra contextual secundaria
  const uniqueActivePillarItems = activePillar.items.filter(
    (item, idx, arr) =>
      arr.findIndex(x => x.id === item.id && x.param === item.param) === idx
  );

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800"
        id="global-navbar"
        aria-label="Navegación principal del observatorio"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Marca + Contador de Visitas */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => handleNavClick('landing')}
                aria-current={currentTab === 'landing' ? 'page' : undefined}
                className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
              >
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <Landmark className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="font-extrabold text-white tracking-tight block text-sm sm:text-base leading-none">
                    Con La Tuya
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase">
                    Contribuyente
                  </span>
                </div>
              </button>

              {visits !== undefined && visits !== null && (
                <div className="hidden md:flex xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/5 rounded-full border border-emerald-500/10 text-[10px] text-emerald-400 font-mono font-medium leading-none shadow-sm shrink-0">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>{visits.toLocaleString()} visitas</span>
                </div>
              )}
            </div>

            {/* Navegación PC y Laptops / Tablets Horizontales (lg: ≥1024px) */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                id="nav-item-landing"
                onClick={() => handleNavClick('landing')}
                aria-current={currentTab === 'landing' ? 'page' : undefined}
                className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentTab === 'landing'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Inicio
              </button>

              {NAVIGATION_PILLARS.map((pillar, pillarIndex) => {
                const active = isTabInPillar(pillar);
                const isOpen = openPillarId === pillar.id;
                const alignRight = pillarIndex >= 3; // Evita desborde derecho en pantallas de 1024px–1366px
                return (
                  <div
                    key={pillar.id}
                    className="relative"
                    onMouseEnter={() => setOpenPillarId(pillar.id)}
                    onMouseLeave={() => setOpenPillarId(null)}
                  >
                    <div className="flex items-center">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => {
                          // En dispositivos táctiles o primer clic abre el menú; si ya está abierto navega al defaultTab
                          if (isOpen) {
                            handleNavClick(pillar.defaultTab);
                          } else {
                            setOpenPillarId(pillar.id);
                          }
                        }}
                        className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                            : 'text-slate-300 border border-transparent hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <span className="hidden xl:inline">{pillar.label}</span>
                        <span className="xl:hidden">{pillar.shortLabel}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-75 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-emerald-400' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div
                        className={`absolute top-full pt-1.5 w-80 z-50 ${
                          alignRight ? 'right-0' : 'left-0'
                        }`}
                      >
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1">
                          <div className="px-2.5 py-1.5 border-b border-slate-900 flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                              {pillar.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleNavClick(pillar.defaultTab)}
                              className="text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
                            >
                              Ir a principal →
                            </button>
                          </div>
                          {pillar.items.map((item, idx) => {
                            const Icon = item.icon;
                            const itemActive =
                              currentTab === item.id || currentTab.startsWith(item.id + '/');
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
                                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                    {item.description}
                                  </div>
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

            {/* Controles Rápidos en Móvil y Tablet (<1024px) */}
            <div className="lg:hidden flex items-center gap-2">
              {currentTab !== 'landing' && (
                <button
                  type="button"
                  onClick={() => handleNavClick('landing')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Volver al inicio"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xs:inline">Inicio</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/30 focus:outline-none cursor-pointer"
                aria-label="Abrir menú de secciones"
              >
                {mobileOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5 text-emerald-400" />}
                <span className="text-xs font-bold">{mobileOpen ? 'Cerrar' : 'Secciones'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra Contextual de Navegación Rápida (Visible en PC, Tablet y Móvil cuando se está dentro de una sección) */}
        {currentTab !== 'landing' && (
          <div className="bg-slate-900/80 border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => handleNavClick('landing')}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer"
              >
                <Home className="w-3 h-3 text-emerald-400" />
                <span>Inicio</span>
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

              <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                {activePillar.shortLabel}
              </span>

              <div className="flex items-center gap-1.5 pl-1">
                {uniqueActivePillarItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive =
                    currentTab === item.id || currentTab.startsWith(item.id + '/');
                  return (
                    <button
                      key={`${item.id}-subbar-${idx}`}
                      type="button"
                      onClick={() => handleNavClick(item.id, item.param)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-950/90 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                      <span>{item.shortLabel || item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cajón Desplegable Móvil y Tablet (<1024px) con Acordeones por Pilar y Accesos Directos */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-3 pt-3 pb-24 space-y-3 max-h-[84vh] overflow-y-auto text-left shadow-2xl">
            {/* Accesos Directos Más Consultados */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Accesos Directos Rápidos
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { id: 'boletas-y-subsidios', label: 'Boletas y Subsidios', icon: Layers },
                  { id: 'evidencia-vs-relato', label: 'Evidencia vs. Relato', icon: ShieldCheck },
                  { id: 'congruencia', label: 'Congruencia TV/YT', icon: MessageSquareQuote },
                  { id: 'observatorio', label: 'Histórico 1946–2026', icon: History },
                  { id: 'calculadora', label: 'Calculadora Fiscal', icon: Calculator },
                  { id: 'mapa', label: 'Mapa Nacional', icon: Award }
                ].map(quick => {
                  const QuickIcon = quick.icon;
                  const active = currentTab === quick.id;
                  return (
                    <button
                      key={quick.id}
                      type="button"
                      onClick={() => handleNavClick(quick.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <QuickIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{quick.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5 Pilares en Acordeón Cómodo para Pulgar */}
            <div className="space-y-2">
              {NAVIGATION_PILLARS.map(pillar => {
                const PillarIcon = pillar.icon;
                const isExpanded = expandedMobilePillar === pillar.id;
                const activeInPillar = isTabInPillar(pillar);
                return (
                  <div
                    key={pillar.id}
                    className={`rounded-2xl border overflow-hidden transition ${
                      activeInPillar
                        ? 'border-emerald-500/30 bg-slate-900/60'
                        : 'border-slate-800 bg-slate-900/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobilePillar(isExpanded ? null : pillar.id)
                      }
                      aria-expanded={isExpanded}
                      className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <PillarIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-extrabold text-white">
                          {pillar.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-2.5 pb-3 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-slate-800/70">
                        {pillar.items.map((item, idx) => {
                          const Icon = item.icon;
                          const isActive =
                            currentTab === item.id || currentTab.startsWith(item.id + '/');
                          return (
                            <button
                              key={`${item.id}-mob-${idx}`}
                              type="button"
                              onClick={() => handleNavClick(item.id, item.param)}
                              aria-current={isActive ? 'page' : undefined}
                              className={`flex items-start gap-2.5 w-full p-2.5 rounded-xl text-left transition cursor-pointer ${
                                isActive
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-950/80 text-slate-200 hover:bg-slate-900 border border-slate-800/60'
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                              <div className="min-w-0">
                                <div className="text-xs font-bold leading-snug">{item.label}</div>
                                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                                  {item.description}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Barra Inferior Fija para Móviles y Tablets (<1024px) — Navegación con una sola mano */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-1.5 py-1.5 shadow-2xl"
        aria-label="Barra de acceso rápido móvil"
      >
        <div className="max-w-lg mx-auto grid grid-cols-6 gap-1">
          <button
            type="button"
            onClick={() => handleNavClick('landing')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
              currentTab === 'landing' && !mobileOpen
                ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 leading-none">Inicio</span>
          </button>

          {NAVIGATION_PILLARS.slice(0, 4).map(pillar => {
            const Icon = pillar.icon;
            const active = isTabInPillar(pillar) && !mobileOpen;
            return (
              <button
                key={`dock-${pillar.id}`}
                type="button"
                onClick={() => handleNavClick(pillar.defaultTab)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] mt-0.5 leading-none truncate max-w-full">
                  {pillar.mobileDockLabel}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
              mobileOpen
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-emerald-400" />}
            <span className="text-[10px] mt-0.5 leading-none">{mobileOpen ? 'Cerrar' : 'Más'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
