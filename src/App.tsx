/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, Scale, ShieldAlert, Heart, Github, Mail, HelpCircle, ExternalLink } from 'lucide-react';

import Navbar from './components/Navbar';
import Landing from './views/Landing';
import MapaNacional from './views/MapaNacional';
import RegistroTributos from './views/RegistroTributos';
import CalculadoraFiscal from './views/CalculadoraFiscal';
import SimuladorPrecios from './views/SimuladorPrecios';
import PerfilPolitico from './views/PerfilPolitico';
import GastoPublico from './views/GastoPublico';
import MethodologyPage from './views/MethodologyPage';
import Donaciones from './views/Donaciones';
import PropuestasContribucion from './views/PropuestasContribucion';
import MapaTributarioDashboard from './views/MapaTributarioDashboard';

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string | undefined>('nacion');
  const [selectedPoliticianId, setSelectedPoliticianId] = useState<string | undefined>('axel_kicillof');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [visits, setVisits] = useState<number | null>(null);

  React.useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem('visited_session');
    const fetchVisits = async () => {
      try {
        const endpoint = hasVisitedThisSession ? '/api/visits' : '/api/visits/increment';
        const response = await fetch(endpoint, {
          method: hasVisitedThisSession ? 'GET' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && typeof data.views === 'number') {
          setVisits(data.views);
          if (!hasVisitedThisSession) {
            sessionStorage.setItem('visited_session', 'true');
          }
        }
      } catch (error) {
        console.error('Error fetching state from counter API:', error);
      }
    };
    fetchVisits();
  }, []);

  const currentTab = location.pathname === '/' || location.pathname === '' ? 'landing' : location.pathname.substring(1);

  React.useEffect(() => {
    let title = 'Con La Tuya, Contribuyente';
    const path = location.pathname;
    if (path.startsWith('/mapa-tributario')) {
      title = 'Mapa Tributario | Con La Tuya, Contribuyente';
    } else if (path === '/mapa') {
      title = 'Mapa Nacional | Con La Tuya, Contribuyente';
    } else if (path === '/tributos') {
      title = 'Registro Tributario | Con La Tuya, Contribuyente';
    } else if (path === '/calculadora') {
      title = 'Calculadora de Presión Fiscal | Con La Tuya, Contribuyente';
    } else if (path === '/simulador') {
      title = 'Simulador de Precio Final | Con La Tuya, Contribuyente';
    } else if (path === '/politicos') {
      title = 'Perfil de Políticos | Con La Tuya, Contribuyente';
    } else if (path === '/gasto') {
      title = 'Gasto Público | Con La Tuya, Contribuyente';
    } else if (path === '/metodologia') {
      title = 'Metodología | Con La Tuya, Contribuyente';
    } else if (path === '/contribucion') {
      title = 'Propuestas y Gobernanza | Con La Tuya, Contribuyente';
    } else if (path === '/donacion') {
      title = 'Sostener la Plataforma | Con La Tuya, Contribuyente';
    }
    document.title = title;
  }, [location.pathname]);

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'landing') {
      navigate('/');
    } else {
      navigate(`/${tab}`);
    }

    if (param) {
      if (tab === 'politicos') {
        setSelectedPoliticianId(param);
      } else {
        setSelectedJurisdictionId(param);
      }
    }
    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased" id="main-layout-root">
      {/* Dynamic Header navbar */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} visits={visits} />

      {/* Main Container Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-6">
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  onNavigate={handleNavigate}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              }
            />
            <Route
              path="/mapa"
              element={
                <MapaNacional
                  onNavigate={handleNavigate}
                  selectedJurisdictionId={selectedJurisdictionId}
                  setSelectedJurisdictionId={setSelectedJurisdictionId}
                />
              }
            />
            <Route
              path="/tributos"
              element={
                <RegistroTributos
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              }
            />
            <Route path="/calculadora" element={<CalculadoraFiscal />} />
            <Route path="/simulador" element={<SimuladorPrecios />} />
            <Route
              path="/politicos"
              element={
                <PerfilPolitico
                  selectedPolId={selectedPoliticianId}
                  setSelectedPolId={setSelectedPoliticianId}
                />
              }
            />
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
            <Route path="/metodologia" element={<MethodologyPage />} />
            <Route path="/contribucion" element={<PropuestasContribucion />} />
            <Route path="/donacion" element={<Donaciones />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Modern, high-trust Footer and Disclaimers */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 text-slate-500 mt-16" id="global-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-left">
          {/* Col 1: Platform Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-white tracking-tight">Con La Tuya Contribuyente</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Portal cívico, fiscal e independiente para el libre acceso e interpretación de datos impositivos en Argentina. 
              Sostenido por aportes ciudadanos voluntarios.
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Fase Actual: MVP 1.2 — Transparencia Radical Nacional
            </p>
            {visits !== null && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{visits.toLocaleString()} visitas públicas</span>
              </div>
            )}
          </div>

          {/* Col 2: Legal Disclaimers */}
          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[10px]">Aviso Legal de Garantías</span>
            <p className="text-slate-405 leading-relaxed text-slate-400">
              La plataforma recopila únicamente información normativa pública y estimaciones con fines educativos. 
              No sustituye el asesoramiento legal ni contable. Ante acusaciones de carácter penal, la plataforma se limita 
              a transcribir resoluciones judiciales firmes con links oficiales a los juzgados de origen.
            </p>
          </div>

          {/* Col 3: Links and support */}
          <div className="space-y-3 font-mono text-[11px]">
            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">Políticas y Gobernanza</span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigate('metodologia')}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Manual de Neutralidad Partidaria
              </button>
              <button
                onClick={() => handleNavigate('contribucion')}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Gobernanza y Envío de Propuestas
              </button>
              <button
                onClick={() => handleNavigate('donacion')}
                className="flex items-center gap-1.5 hover:text-white transition text-left cursor-pointer text-emerald-400"
              >
                <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>Donar para Servidores</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-900/60 flex items-center gap-4 text-slate-600">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition" aria-label="Github link">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:deepsynapsis@gmail.com" className="hover:text-slate-400 transition" aria-label="Mail link">
                <Mail className="w-4 h-4" />
              </a>
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
