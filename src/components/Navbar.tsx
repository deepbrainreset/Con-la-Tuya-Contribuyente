/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Landmark, FileText, Calculator, ShoppingCart, Users, Award, BookOpen, Heart, TrendingUp, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  visits?: number | null;
}

export default function Navbar({ currentTab, onNavigate, visits }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'landing', label: 'Inicio', icon: Landmark },
    { id: 'mapa-tributario', label: 'Mapa Tributario', icon: Layers },
    { id: 'mapa', label: 'Mapa Nacional', icon: Award },
    { id: 'tributos', label: 'Registro Tributario', icon: FileText },
    { id: 'calculadora', label: 'Calculadora Presión', icon: Calculator },
    { id: 'simulador', label: 'Precio Final', icon: ShoppingCart },
    { id: 'politicos', label: 'Políticos', icon: Users },
    { id: 'gasto', label: 'Gasto Público', icon: TrendingUp },
    { id: 'metodologia', label: 'Metodología', icon: BookOpen },
    { id: 'contribucion', label: 'Gobernanza', icon: Landmark },
    { id: 'donacion', label: 'Sostener', icon: Heart }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800" id="global-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Landmark className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight block text-base leading-none">
                  Con La Tuya
                </span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase">
                  Contribuyente
                </span>
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

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || currentTab.startsWith(item.id + '/');
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                      : 'text-slate-400 border border-transparent hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <div className="xl:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-900 bg-slate-950 px-2 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || currentTab.startsWith(item.id + '/');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          {visits !== undefined && visits !== null && (
            <div className="pt-3 px-4 border-t border-slate-900 mt-3 flex sm:hidden">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>{visits.toLocaleString()} visitas públicas</span>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
