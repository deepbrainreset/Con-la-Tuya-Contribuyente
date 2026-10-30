/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, Heart, Github, Mail } from 'lucide-react';

import Navbar from './components/Navbar';
import Landing from './views/Landing';
const MapaNacional = lazy(() => import('./views/MapaNacional'));
const RegistroTributosAuditado = lazy(() => import('./views/RegistroTributosAuditado'));
const CalculadoraFiscal = lazy(() => import('./views/CalculadoraFiscal'));
const SimuladorPrecios = lazy(() => import('./views/SimuladorPrecios'));
const RegistroPolitico = lazy(() => import('./views/RegistroPolitico'));
const IntegridadPartidaria = lazy(() => import('./views/IntegridadPartidaria'));
const GastoPublico = lazy(() => import('./views/GastoPublico'));
const TransparenciaEstado = lazy(() => import('./views/TransparenciaEstado'));
const MethodologyPage = lazy(() => import('./views/MethodologyPage'));
const Donaciones = lazy(() => import('./views/Donaciones'));
const PropuestasContribucion = lazy(() => import('./views/PropuestasContribucion'));
const MapaTributarioDashboard = lazy(() => import('./views/MapaTributarioDashboard'));
const Inflacion = lazy(() => import('./views/Inflacion'));
const ResponsabilidadPolitica = lazy(() => import('./views/ResponsabilidadPolitica'));
const ObservatorioHistorico = lazy(() => import('./views/ObservatorioHistorico'));
const DeclaracionesComparador = lazy(() => import('./views/DeclaracionesComparador'));
const AuditoriasTematicas = lazy(() => import('./views/AuditoriasTematicas'));
const ContrasteEvidencia = lazy(() => import('./views/ContrasteEvidencia'));
const BlogCongruencia = lazy(() => import('./views/BlogCongruencia'));
const FacturasServiciosSubsidios = lazy(() => import('./views/FacturasServiciosSubsidios'));

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string | undefined>('nacion');
  const [_selectedPoliticianId, setSelectedPoliticianId] = useState<string | undefined>('axel_kicillof');
  const [selectedDossierId, setSelectedDossierId] = useState<string | undefined>(undefined);
  const [selectedAuditSlug, setSelectedAuditSlug] = useState<string | undefined>(undefined);
  const [selectedContrastSlug, setSelectedContrastSlug] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visits, setVisits] = useState<number | null>(null);

  React.useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem('visited_session');
    const fetchVisits = async () => {
      try {
        const endpoint = hasVisitedThisSession ? '/api/visits' : '/api/visits/increment';
        const response = await fetch(endpoint, {
          method: hasVisitedThisSession ? 'GET' : 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data && typeof data.views === 'number') {
          setVisits(data.views);
          if (!hasVisitedThisSession) sessionStorage.setItem('visited_session', 'true');
        }
      } catch (error) {
        console.error('Error fetching state from counter API:', error);
      }
    };
    fetchVisits();
  }, []);

  const currentTab = location.pathname === '/' || location.pathname === '' ? 'landing' : location.pathname.substring(1);

  React.useEffect(() => {
    let title = 'Impuestos y gasto público en Argentina | Con La Tuya, Contribuyente';
    let description = 'Observatorio histórico, fiscal y político de Argentina (1946–actualidad): recaudación, impuestos, presupuestos, gastos, votaciones nominales, declaraciones públicas y auditoría ciudadana.';
    const path = location.pathname;
    if (path.startsWith('/mapa-tributario')) {
      title = 'Mapa Tributario | Con La Tuya, Contribuyente';
      description = 'Explorador del mapa tributario argentino por jurisdicción, normas legales, alícuotas y trazabilidad política verificada.';
    } else if (path === '/observatorio' || path === '/expedientes') {
      title = 'Observatorio Histórico (1946–2026) | Con La Tuya, Contribuyente';
      description = 'Línea temporal fiscal y política 1946–2026, regímenes monetarios históricos y expedientes interactivos auditados con fuentes primarias.';
    } else if (path === '/declaraciones') {
      title = 'Archivo de Declaraciones y Comparador | Con La Tuya, Contribuyente';
      description = 'Comparador contextual de declaraciones históricas de funcionarios públicos argentinos contrastadas con leyes, decretos y votaciones nominales.';
    } else if (path === '/congruencia') {
      title = 'Blog de Congruencia: Archivo TV/YouTube vs. Votos y Actos | Con La Tuya, Contribuyente';
      description = 'Escrutinio multipardidario diario de archivos televisivos y de YouTube (TN, LN+, C5N, Diputados TV, Senado TV) frente a votos nominales, firmas y críticas cruzadas.';
    } else if (path === '/auditorias') {
      title = 'Auditorías Temáticas Sectoriales | Con La Tuya, Contribuyente';
      description = 'Auditorías sectoriales de jubilaciones (SIPA), universidades nacionales, ciencia y CONICET, educación, salud, subsidios y contrataciones públicas.';
    } else if (path === '/evidencia-vs-relato') {
      title = 'Relato Mediático vs. Proceso Administrativo y Evidencia | Con La Tuya, Contribuyente';
      description = 'Contraste diario independiente entre narrativas instaladas en medios o discursos políticos y el proceso legal, contable y administrativo real del Estado argentino.';
    } else if (path === '/mapa') {
      title = 'Mapa Nacional | Con La Tuya, Contribuyente';
      description = 'Mapa interactivo de las 24 jurisdicciones provinciales, localidades censales y municipios con geometrías oficiales IGN/Georef.';
    } else if (path === '/tributos') {
      title = 'Registro Tributario | Con La Tuya, Contribuyente';
      description = 'Registro auditado de impuestos nacionales, provinciales y tasas municipales con norma de creación y enlaces oficiales.';
    } else if (path === '/inflacion') {
      title = 'Inflación Histórica | Con La Tuya, Contribuyente';
      description = 'Serie histórica de inflación en Argentina desde 1983 hasta la actualidad con fuentes del INDEC y BCRA.';
    } else if (path === '/responsabilidad-politica') {
      title = 'Responsabilidad Política | Con La Tuya, Contribuyente';
      description = 'Trazabilidad parlamentaria y ejecutiva: quién propuso, quién votó nominalmente y quién promulgó cada reforma fiscal y previsional.';
    } else if (path === '/calculadora') {
      title = 'Calculadora de Presión Fiscal | Con La Tuya, Contribuyente';
      description = 'Simulador de carga tributaria directa, previsional e indirecta sobre el ingreso mensual con referencias normativas verificadas.';
    } else if (path === '/simulador') {
      title = 'Simulador de Precio Final y Boletas | Con La Tuya, Contribuyente';
      description = 'Desglose de impuestos nacionales, provinciales y tasas municipales contenidos en bienes de consumo y boletas de servicios en Argentina.';
    } else if (path === '/boletas-y-subsidios') {
      title = 'Boletas de Luz, Agua, ABL, Cascada IIBB y Subsidios | Con La Tuya, Contribuyente';
      description = 'Radiografía de facturas de servicios públicos, efecto cascada de Ingresos Brutos e Impuesto al Cheque y subsidios históricos AMBA vs. Interior (2001–2026).';
    } else if (path === '/politicos') {
      title = 'Registro Político y Patrimonial | Con La Tuya, Contribuyente';
      description = 'Fichas de autoridades ejecutivas y legislativas de las 24 jurisdicciones con fuentes oficiales, patrimonio y acciones fiscales.';
    } else if (path === '/partidos') {
      title = 'Integridad Partidaria desde 1983 | Con La Tuya, Contribuyente';
      description = 'Registro de partidos y coaliciones políticas desde 1983 con resoluciones judiciales firmes y cobertura metodológica.';
    } else if (path === '/gasto') {
      title = 'Gasto Público | Con La Tuya, Contribuyente';
      description = 'Análisis de presupuesto aprobado vs. gasto ejecutado por jurisdicción, finalidad, compras públicas COMPR.AR y publicidad oficial.';
    } else if (path === '/transparencia') {
      title = 'Transparencia del Estado | Con La Tuya, Contribuyente';
      description = 'Índice de disponibilidad documental verificada en Nación, las 23 provincias, CABA y municipios.';
    } else if (path === '/metodologia') {
      title = 'Metodología | Con La Tuya, Contribuyente';
      description = 'Manual de neutralidad partidaria, niveles de evidencia, taxonomía epistémica y reglas de verificación documental.';
    } else if (path === '/contribucion' || path === '/consultas') {
      title = 'Consultas Ciudadanas y Gobernanza | Con La Tuya, Contribuyente';
      description = 'Generador de solicitudes de acceso a la información pública (Ley 27.275), propuestas de evidencia y bitácora pública de correcciones.';
    } else if (path === '/donacion') {
      title = 'Sostener la Plataforma | Con La Tuya, Contribuyente';
      description = 'Información para colaborar con el mantenimiento de servidores y preservación documental de Con La Tuya, Contribuyente.';
    }
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const cleanPath = path === '/' ? '' : `/#${path}`;
      canonical.setAttribute('href', `https://conlatuyacontribuyente.com${cleanPath}`);
    }
  }, [location.pathname]);

  const handleNavigate = (tab: string, param?: string) => {
    navigate(tab === 'landing' ? '/' : `/${tab}`);
    if (param) {
      if (tab === 'politicos' || tab === 'congruencia') setSelectedPoliticianId(param);
      else if (tab === 'observatorio' || tab === 'expedientes') setSelectedDossierId(param);
      else if (tab === 'auditorias') setSelectedAuditSlug(param);
      else if (tab === 'evidencia-vs-relato') setSelectedContrastSlug(param);
      else setSelectedJurisdictionId(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased" id="main-layout-root">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-emerald-500 focus:text-slate-950 focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} visits={visits} />

      <main id="main-content" className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-6">
          <Suspense fallback={<p role="status" className="text-slate-300 py-8">Cargando sección…</p>}>
          <Routes>
            <Route path="/" element={<Landing onNavigate={handleNavigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/observatorio" element={<ObservatorioHistorico onNavigate={handleNavigate} initialDossierId={selectedDossierId} />} />
            <Route path="/expedientes" element={<ObservatorioHistorico onNavigate={handleNavigate} initialDossierId={selectedDossierId} />} />
            <Route path="/declaraciones" element={<DeclaracionesComparador onNavigate={handleNavigate} />} />
            <Route path="/congruencia" element={<BlogCongruencia onNavigate={handleNavigate} initialPoliticianId={_selectedPoliticianId} />} />
            <Route path="/auditorias" element={<AuditoriasTematicas onNavigate={handleNavigate} initialSlug={selectedAuditSlug} />} />
            <Route path="/evidencia-vs-relato" element={<ContrasteEvidencia onNavigate={handleNavigate} initialSlug={selectedContrastSlug} />} />
            <Route path="/mapa" element={<MapaNacional onNavigate={handleNavigate} selectedJurisdictionId={selectedJurisdictionId} setSelectedJurisdictionId={setSelectedJurisdictionId} />} />
            <Route path="/tributos" element={<RegistroTributosAuditado searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/inflacion" element={<Inflacion />} />
            <Route path="/responsabilidad-politica" element={<ResponsabilidadPolitica />} />
            <Route path="/calculadora" element={<CalculadoraFiscal />} />
            <Route path="/simulador" element={<SimuladorPrecios />} />
            <Route path="/boletas-y-subsidios" element={<FacturasServiciosSubsidios />} />
            <Route path="/politicos" element={<RegistroPolitico onNavigate={handleNavigate} initialPoliticianId={_selectedPoliticianId} />} />
            <Route path="/partidos" element={<IntegridadPartidaria />} />
            <Route path="/mapa-tributario" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/buscador" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/tributo/:id" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/jurisdicciones" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/responsabilidad-politica" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/rankings" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/fuentes" element={<MapaTributarioDashboard />} />
            <Route path="/mapa-tributario/metodologia" element={<MapaTributarioDashboard />} />
            <Route path="/admin/mapa-tributario" element={<MapaTributarioDashboard />} />
            <Route path="/gasto" element={<GastoPublico />} />
            <Route path="/transparencia" element={<TransparenciaEstado />} />
            <Route path="/metodologia" element={<MethodologyPage />} />
            <Route path="/contribucion" element={<PropuestasContribucion />} />
            <Route path="/consultas" element={<PropuestasContribucion />} />
            <Route path="/donacion" element={<Donaciones />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 text-slate-500 mt-16" id="global-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-white tracking-tight">Con La Tuya Contribuyente</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">Observatorio histórico, cívico y fiscal independiente (1946–actualidad) para el libre acceso e interpretación de recursos, gastos y decisiones públicas en Argentina.</p>
            <p className="text-[10px] text-slate-500 font-mono">Fase Actual: v0.2.0 — Observatorio Histórico 1946–2026</p>
            {visits !== null && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 w-fit">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                <span>{visits.toLocaleString()} visitas públicas</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[10px]">Aviso Legal de Garantías</span>
            <p className="text-slate-400 leading-relaxed">La plataforma recopila información normativa pública, series estadísticas y estimaciones con fines educativos y de auditoría. No sustituye asesoramiento legal ni contable. Las atribuciones políticas, patrimoniales y judiciales se publican sólo cuando existe documentación verificable y se distingue entre propuesta, promulgación, voto nominal, denuncia, procesamiento y sentencia.</p>
          </div>

          <div className="space-y-3 font-mono text-[11px]">
            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">Políticas y Gobernanza</span>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleNavigate('observatorio')} className="hover:text-white transition text-left cursor-pointer">Observatorio Histórico (1946–2026)</button>
              <button onClick={() => handleNavigate('declaraciones')} className="hover:text-white transition text-left cursor-pointer">Comparador de Declaraciones</button>
              <button onClick={() => handleNavigate('auditorias')} className="hover:text-white transition text-left cursor-pointer">Auditorías Sectoriales (CONICET, SPU, SIPA)</button>
              <button onClick={() => handleNavigate('metodologia')} className="hover:text-white transition text-left cursor-pointer">Manual de Neutralidad Partidaria</button>
              <button onClick={() => handleNavigate('contribucion')} className="hover:text-white transition text-left cursor-pointer">Consultas Ley 27.275 y Correcciones</button>
              <button onClick={() => handleNavigate('donacion')} className="flex items-center gap-1.5 hover:text-white transition text-left cursor-pointer text-emerald-400"><Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" /><span>Donar para Servidores</span></button>
            </div>
            <div className="pt-3 border-t border-slate-900/60 flex items-center gap-4 text-slate-600">
              <a href="https://github.com/deepbrainreset/Con-la-Tuya-Contribuyente" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition" aria-label="Github link"><Github className="w-4 h-4" /></a>
              <a href="mailto:deepsynapsis@gmail.com" className="hover:text-slate-400 transition" aria-label="Mail link"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-mono">
          <span>&copy; {new Date().getFullYear()} Con La Tuya Contribuyente. Licencia MIT de Código Libre.</span>
          <span>Desarrollado con fines pedagógicos y de auditoría pública.</span>
        </div>
      </footer>
    </div>
  );
}
