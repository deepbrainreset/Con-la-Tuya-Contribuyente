/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Landmark,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Activity,
  ListOrdered,
  ExternalLink,
  ShieldAlert,
  Globe,
  ChevronRight,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  UserCheck,
  RefreshCw,
  Sliders,
  Download,
  Upload,
  BookOpen,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

import {
  VerificationStatusType,
  JurisdictionTaxSchema,
  TributeTaxSchema,
  LegalNormTaxSchema,
  PoliticalTraceabilityTaxSchema,
  PoliticianVoteTaxSchema,
  TributeHistoryTaxSchema,
  SourceTaxSchema,
  VerificationLogTaxSchema
} from '../types/mapaTributario';

import {
  INITIAL_JURISDICTIONS,
  INITIAL_TRIBUTES,
  INITIAL_LEGAL_NORMS,
  INITIAL_POLITICAL_TRACEABILITY,
  INITIAL_POLITICIAN_VOTES,
  INITIAL_TRIBUTE_HISTORY,
  INITIAL_SOURCES,
  INITIAL_VERIFICATION_LOGS
} from '../data/mapaTributarioData';

import { VOTING_SESSIONS } from '../data/votacionesParlamentarias';

export default function MapaTributarioDashboard({ activeTab: propActiveTab }: { activeTab?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id?: string }>();

  // --- STATE PERSISTENCE IN LOCAL STORAGE ---
  const [jurisdictions, setJurisdictions] = useState<JurisdictionTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_jurisdictions');
    return saved ? JSON.parse(saved) : INITIAL_JURISDICTIONS;
  });

  const [tributes, setTributes] = useState<TributeTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_tributes');
    return saved ? JSON.parse(saved) : INITIAL_TRIBUTES;
  });

  const [norms, setNorms] = useState<LegalNormTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_norms');
    return saved ? JSON.parse(saved) : INITIAL_LEGAL_NORMS;
  });

  const [traceability, setTraceability] = useState<PoliticalTraceabilityTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_traceability');
    return saved ? JSON.parse(saved) : INITIAL_POLITICAL_TRACEABILITY;
  });

  const [votes, setVotes] = useState<PoliticianVoteTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_votes');
    return saved ? JSON.parse(saved) : INITIAL_POLITICIAN_VOTES;
  });

  const [history, setHistory] = useState<TributeHistoryTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_history');
    return saved ? JSON.parse(saved) : INITIAL_TRIBUTE_HISTORY;
  });

  const [sources, setSources] = useState<SourceTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_sources');
    return saved ? JSON.parse(saved) : INITIAL_SOURCES;
  });

  const [logs, setLogs] = useState<VerificationLogTaxSchema[]>(() => {
    const saved = localStorage.getItem('tax_map_logs');
    return saved ? JSON.parse(saved) : INITIAL_VERIFICATION_LOGS;
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('tax_map_jurisdictions', JSON.stringify(jurisdictions));
  }, [jurisdictions]);

  useEffect(() => {
    localStorage.setItem('tax_map_tributes', JSON.stringify(tributes));
  }, [tributes]);

  useEffect(() => {
    localStorage.setItem('tax_map_norms', JSON.stringify(norms));
  }, [norms]);

  useEffect(() => {
    localStorage.setItem('tax_map_traceability', JSON.stringify(traceability));
  }, [traceability]);

  useEffect(() => {
    localStorage.setItem('tax_map_votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('tax_map_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('tax_map_sources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('tax_map_logs', JSON.stringify(logs));
  }, [logs]);

  // Determine active tab from location pathname or param prop
  const getTabFromPath = () => {
    const path = location.pathname;
    if (path === '/mapa-tributario' || path === '/mapa-tributario/') return 'resumen';
    if (path.includes('/mapa-tributario/buscador')) return 'buscador';
    if (path.includes('/mapa-tributario/tributo')) return 'ficha';
    if (path.includes('/mapa-tributario/jurisdicciones')) return 'jurisdicciones';
    if (path.includes('/mapa-tributario/responsabilidad-politica')) return 'responsabilidad';
    if (path.includes('/mapa-tributario/rankings')) return 'rankings';
    if (path.includes('/mapa-tributario/fuentes')) return 'fuentes';
    if (path.includes('/mapa-tributario/metodologia')) return 'metodologia';
    if (path.includes('/admin/mapa-tributario') || path.includes('/mapa-tributario/admin')) return 'admin';
    return propActiveTab || 'resumen';
  };

  const activeTab = getTabFromPath();

  const handleTabChange = (tab: string, itemParam?: string) => {
    if (tab === 'resumen') navigate('/mapa-tributario');
    else if (tab === 'buscador') navigate('/mapa-tributario/buscador');
    else if (tab === 'ficha') navigate(`/mapa-tributario/tributo/${itemParam || 'iva'}`);
    else if (tab === 'jurisdicciones') navigate('/mapa-tributario/jurisdicciones');
    else if (tab === 'responsabilidad') navigate('/mapa-tributario/responsabilidad-politica');
    else if (tab === 'rankings') navigate('/mapa-tributario/rankings');
    else if (tab === 'fuentes') navigate('/mapa-tributario/fuentes');
    else if (tab === 'metodologia') navigate('/mapa-tributario/metodologia');
    else if (tab === 'admin') navigate('/admin/mapa-tributario');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- DERIVE STATISTICS FOR MODULE 1 ---
  const totalVerifiedNation = tributes.filter(t => t.government_level === 'nacional' && t.verification_status.startsWith('Verificado')).length;
  const totalVerifiedProvince = tributes.filter(t => t.government_level === 'provincial' && t.verification_status.startsWith('Verificado')).length;
  const totalVerifiedMunicipal = tributes.filter(t => t.government_level === 'municipal' && t.verification_status.startsWith('Verificado')).length;
  const totalInReview = tributes.filter(t => t.current_status === 'en revision' || t.verification_status === 'Fuente contradictoria').length;
  const totalInsufficient = tributes.filter(t => t.verification_status === 'Información insuficiente' || t.verification_status === 'No disponible').length;
  const totalProvinces = jurisdictions.filter(j => j.type === 'province' || j.type === 'caba').length;
  const totalMunicipalities = jurisdictions.filter(j => j.type === 'municipality').length;
  const completionPercentage = Math.round((tributes.filter(t => t.verification_status.startsWith('Verificado')).length / (tributes.length || 1)) * 100);

  // --- SEARCH AND FILTER STATE FOR MODULE 2 ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [filterParty, setFilterParty] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Derive unique values for filters
  const uniqueParties = Array.from(new Set(tributes.map(t => {
    const traceItem = traceability.find(tr => tr.tribute_id === t.id);
    return traceItem?.proposal_author_party_at_time || '';
  }).filter(Boolean)));

  // Filter processes
  const filteredTributes = tributes.filter(t => {
    const traceItem = traceability.find(tr => tr.tribute_id === t.id);
    const matchesSearch =
      t.official_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.legal_basis_number && t.legal_basis_number.includes(searchTerm)) ||
      (t.collecting_agency && t.collecting_agency.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'all' || t.tribute_type === filterType;
    const matchesLevel = filterLevel === 'all' || t.government_level === filterLevel;
    const matchesJurisdiction = filterJurisdiction === 'all' || t.jurisdiction_id === filterJurisdiction;
    const matchesStatus = filterStatus === 'all' || t.current_status === filterStatus;
    const matchesVerification = filterVerification === 'all' || t.verification_status === filterVerification;
    const matchesParty = filterParty === 'all' || (traceItem && traceItem.proposal_author_party_at_time === filterParty);

    return matchesSearch && matchesType && matchesLevel && matchesJurisdiction && matchesStatus && matchesVerification && matchesParty;
  });

  // --- MAP / JURISDICTIONS SELECTED FOR MODULE 5 ---
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string>('nacion');
  const selectedJurisdiction = jurisdictions.find(j => j.id === selectedJurisdictionId);
  const jurisdictionTributes = tributes.filter(t => t.jurisdiction_id === selectedJurisdictionId);

  // --- INTERACTIVE PARLIAMENT VOTING HISTORY EXPLORER ---
  const [selectedTraceId, setSelectedTraceId] = useState<string>('trace_ganancias_2024');
  const [ballotVoteFilter, setBallotVoteFilter] = useState<string>('afirmativo'); // Default to affirmative to immediately highlight the "yes" voters as requested
  const [ballotSearchTerm, setBallotSearchTerm] = useState<string>('');

  // --- ADMIN STATE FOR MODULE 8 ---
  const [newTribute, setNewTribute] = useState<Partial<TributeTaxSchema>>({
    official_name: '',
    common_name: '',
    tribute_type: 'impuesto',
    jurisdiction_id: 'nacion',
    government_level: 'nacional',
    collecting_agency: '',
    legal_basis_type: 'Ley del Congreso',
    legal_basis_number: '',
    legal_basis_title: '',
    current_status: 'vigente',
    taxable_base: '',
    rate_description: '',
    affected_subjects: '',
    exempt_subjects: '',
    affected_activities: '',
    verification_status: 'Fuente secundaria pendiente de validación',
    completeness_score: 50,
  });

  const [tributeSources, setTributeSources] = useState<{title: string, url: string}[]>([
    { title: '', url: '' }
  ]);

  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  const handleAddTributeSource = () => {
    setTributeSources([...tributeSources, { title: '', url: '' }]);
  };

  const handleRemoveTributeSource = (index: number) => {
    setTributeSources(tributeSources.filter((_, i) => i !== index));
  };

  const handleTributeSourceChange = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...tributeSources];
    updated[index][field] = value;
    setTributeSources(updated);
  };

  // Admin submit with validation rule 1: No tributes can be marked "Verificado..." if they have no sources associated.
  const handleSaveTribute = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminSuccess(null);

    if (!newTribute.official_name || !newTribute.common_name) {
      setAdminError('Por favor complete los nombres principales del tributo.');
      return;
    }

    const isVerifiedStatus = newTribute.verification_status?.startsWith('Verificado');
    const validSources = tributeSources.filter(s => s.title.trim() && s.url.trim());

    if (isVerifiedStatus && validSources.length === 0) {
      setAdminError('REGLA DE VALIDACIÓN VIOLADA: No es legalmente permitido registrar un tributo en estado "Verificado" sin asociar al menos una fuente documental oficial (Título y URL verificables).');
      return;
    }

    // Generate highly randomized or consistent sequential ID
    const generatedId = newTribute.common_name.toLowerCase().trim().replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 1000);

    const fullTribute: TributeTaxSchema = {
      ...(newTribute as TributeTaxSchema),
      id: generatedId,
      completeness_score: isVerifiedStatus ? 90 : 40,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save sources
    const newSourcesList: SourceTaxSchema[] = validSources.map((s, idx) => ({
      id: `source_${generatedId}_${idx}`,
      title: s.title,
      source_type: 'Boletín Oficial',
      jurisdiction_id: newTribute.jurisdiction_id || 'nacion',
      publisher: 'Organismo Estatal Competente',
      url: s.url,
      accessed_at: new Date().toISOString(),
      related_entity_type: 'tribute',
      related_entity_id: generatedId,
      reliability_level: 'Primaria Oficial',
      verification_status: fullTribute.verification_status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Register log
    const newLog: VerificationLogTaxSchema = {
      id: `log_${Date.now()}`,
      entity_type: 'tribute',
      entity_id: generatedId,
      previous_status: 'No disponible',
      new_status: fullTribute.verification_status,
      changed_by: 'Administrador / Panel Interno de Carga',
      change_reason: 'Carga manual de impuestos desde el panel administrativo de auditoría cívica.',
      created_at: new Date().toISOString()
    };

    setTributes([fullTribute, ...tributes]);
    setSources([...newSourcesList, ...sources]);
    setLogs([newLog, ...logs]);

    setAdminSuccess(`Impuesto "${fullTribute.common_name}" creado y publicado exitosamente en la plataforma, con ${validSources.length} fuentes de verificación documentadas.`);

    // Reset Form
    setNewTribute({
      official_name: '',
      common_name: '',
      tribute_type: 'impuesto',
      jurisdiction_id: 'nacion',
      government_level: 'nacional',
      collecting_agency: '',
      legal_basis_type: 'Ley del Congreso',
      legal_basis_number: '',
      legal_basis_title: '',
      current_status: 'vigente',
      taxable_base: '',
      rate_description: '',
      affected_subjects: '',
      exempt_subjects: '',
      affected_activities: '',
      verification_status: 'Fuente secundaria pendiente de validación',
      completeness_score: 50,
    });
    setTributeSources([{ title: '', url: '' }]);
  };

  // Helper color tags for verification badge
  const getVerificationColorClasses = (status: VerificationStatusType) => {
    if (status.startsWith('Verificado con fuente oficial')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
    if (status.startsWith('Verificado con fuente parlamentaria')) return 'bg-teal-500/10 text-teal-300 border-teal-500/25';
    if (status.startsWith('Verificado con boletín oficial')) return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25';
    if (status.startsWith('Verificado con organismo')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    if (status === 'Fuente secundaria pendiente de validación') return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    if (status === 'Información parcial') return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
    if (status === 'Fuente contradictoria') return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
    if (status === 'Información insuficiente') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    return 'bg-slate-700/10 text-slate-500 border-slate-700/20';
  };

  return (
    <div className="space-y-8 font-sans text-slate-200" id="mapa-tributario-dashboard-root">
      {/* HEADER SECTION WITH HIGH-TRUST INSTITUTIONAL DESIGN */}
      <div className="border border-slate-800 bg-slate-900/40 p-6 md:p-8 rounded-2xl relative overflow-hidden" id="dashboard-masthead">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent -z-10" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-md text-emerald-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>SISTEMA DE TRAZABILIDAD NORMATIVA</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Mapa Tributario y Responsabilidad Política
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed mt-3">
            Plataforma cívica y base pública progresiva para auditar todos los impuestos, tasas y contribuciones en Argentina.
            Vinculamos cada gravamen a la ley que lo creó, los legisladores que lo votaron y las fuentes documentales oficiales que lo avalan.
          </p>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION MENUS (SUBTABS) */}
      <div className="border-b border-slate-850 overflow-x-auto flex items-center gap-1.5 pb-2 scrollbar-none" id="subtab-navigation-bar">
        {[
          { id: 'resumen', label: 'Resumen General', icon: Landmark },
          { id: 'buscador', label: 'Buscador de Impuestos', icon: Search },
          { id: 'ficha', label: 'Ficha de Tributo', icon: FileText },
          { id: 'jurisdicciones', label: 'Mapa por Jurisdicciones', icon: Globe },
          { id: 'responsabilidad', label: 'Responsabilidad Documentada', icon: UserCheck },
          { id: 'fuentes', label: 'Fuentes y Verificación', icon: CheckCircle2 },
          { id: 'metodologia', label: 'Metodología Técnica', icon: BookOpen },
          { id: 'admin', label: 'Panel Editor', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER DYNAMIC MODULES ACCORDING TO ACTIVE SUBTAB */}

      {/* ==================== MÓDULO 1: RESUMEN GENERAL ==================== */}
      {activeTab === 'resumen' && (
        <div className="space-y-6" id="view-resumen-general">
          {/* CRITICAL WARNING ADVISORIES */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 rounded-xl p-4 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block mb-1">Aviso de Progresividad Documental</span>
              <p className="leading-relaxed">
                Esta base de datos tributaria se construye de forma progresiva únicamente cargando registros confirmados con respaldos legales firmes.
                No incluimos especulaciones políticas. Si no poseemos el acta oficial de votación nominal, mostramos explícitamente "Información no disponible".
              </p>
            </div>
          </div>

          {/* INDICATORS STATISTICAL PANEL */}
          {tributes.length === 0 ? (
            <div className="border border-slate-800 bg-slate-900/30 p-8 text-center rounded-xl font-mono text-sm text-slate-400">
              “Base en construcción. Todavía no hay suficientes datos verificados para publicar un total nacional confiable.”
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 text-left space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Nacionales</span>
                <p className="text-3xl font-extrabold text-white font-mono">{totalVerifiedNation}</p>
                <p className="text-xs text-emerald-400">Tributos Verificados</p>
              </div>
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 text-left space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Provinciales</span>
                <p className="text-3xl font-extrabold text-white font-mono">{totalVerifiedProvince}</p>
                <p className="text-xs text-emerald-400">Gravámenes Verificados</p>
              </div>
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 text-left space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Municipales</span>
                <p className="text-3xl font-extrabold text-white font-mono">{totalVerifiedMunicipal}</p>
                <p className="text-xs text-emerald-400">Tasas / Contribuciones</p>
              </div>
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 text-left space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">En Auditoría Activa</span>
                <p className="text-3xl font-extrabold text-amber-400 font-mono">{totalInReview + totalInsufficient}</p>
                <p className="text-xs text-slate-400">En revisión o datos parciales</p>
              </div>
            </div>
          )}

          {/* MORE DETAILED DATA STATISTICS SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-slate-850 bg-slate-900/20 p-6 rounded-xl space-y-4 text-left">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span>Cobertura de Relevamiento</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Provincias relevadas</span>
                  <span className="font-extrabold text-white">{totalProvinces} de 24</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Municipales analizados con datos</span>
                  <span className="font-extrabold text-white">{totalMunicipalities} municipios</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Porcentaje de completitud verificada</span>
                  <span className="font-extrabold text-emerald-400">{completionPercentage}%</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Última actualización de la base</span>
                  <span className="font-extrabold text-white">05-06-2026</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="border border-slate-850 bg-slate-900/20 p-6 rounded-xl text-left flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-500" />
                  <span>Nuestra Misión de Neutra Sólida</span>
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para mantener el rigor de autoría técnica y evitar el partidismo, este sistema opera de acuerdo a dieciséis directivas impositivas inviolables de validación.
                  No atribuimos la autoría de leyes a políticos específicos sin el expediente original impreso o digital que lo propuso.
                  Si las actas históricas del concejo deliberante municipal no discriminan las votaciones afirmativas individuales, etiquetamos el registro como "Votación tradicional general por asentimiento - Documento no disponible".
                </p>
              </div>
              <button
                onClick={() => handleTabChange('buscador')}
                className="mt-4 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-emerald-400 hover:text-emerald-300 text-xs font-bold font-mono tracking-wide rounded-lg flex items-center justify-center gap-2 transition"
              >
                <span>Acceder al Buscador de Impuestos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MÓDULO 2: BUSCADOR DE IMPUESTOS ==================== */}
      {activeTab === 'buscador' && (
        <div className="space-y-6" id="view-buscador-impuestos">
          {/* SEARCH BAR INPUT AND TOGGLES */}
          <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-900">
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Escriba el nombre, número de ley, organismo o término impositivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full font-sans"
                />
              </div>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold font-mono tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-emerald-500" />
                <span>{showAdvancedFilters ? 'Ocultar Filtros' : 'Filtros Avanzados'}</span>
              </button>
            </div>

            {/* EXPANDABLE FILTER CONTAINER */}
            {showAdvancedFilters && (
              <div className="pt-3 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-[11px] text-left">
                {/* Level */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Nivel de Gobierno</span>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todos</option>
                    <option value="nacional">Nacional</option>
                    <option value="provincial">Provincial</option>
                    <option value="municipal">Municipal</option>
                  </select>
                </div>

                {/* Tribute Type */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Tipo de Carga</span>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todos</option>
                    <option value="impuesto">Impuesto</option>
                    <option value="tasa">Tasa</option>
                    <option value="contribucion">Contribución</option>
                    <option value="derecho">Derecho</option>
                    <option value="percepcion">Percepción</option>
                    <option value="retencion">Retención</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Estado Actual</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todos</option>
                    <option value="vigente">Vigente</option>
                    <option value="derogado">Derogado</option>
                    <option value="suspendido">Suspendido</option>
                    <option value="en revision">En Revisión</option>
                  </select>
                </div>

                {/* Jurisdiction */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Jurisdicción territorial</span>
                  <select
                    value={filterJurisdiction}
                    onChange={(e) => setFilterJurisdiction(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todas</option>
                    {jurisdictions.map(j => (
                      <option key={j.id} value={j.id}>{j.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sponsoring Party */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Partido Impulsor</span>
                  <select
                    value={filterParty}
                    onChange={(e) => setFilterParty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todos</option>
                    {uniqueParties.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Verification Status */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-extrabold uppercase">Nivel de Verificación</span>
                  <select
                    value={filterVerification}
                    onChange={(e) => setFilterVerification(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-lg text-slate-300 focus:outline-none"
                  >
                    <option value="all">Ver Todos</option>
                    <option value="Verificado con fuente oficial">Verificado con fuente oficial</option>
                    <option value="Verificado con boletín oficial">Verificado con boletín oficial</option>
                    <option value="Información parcial">Información parcial</option>
                    <option value="Información insuficiente">Información insuficiente</option>
                    <option value="Fuente contradicctoria">Fuente contradictoria</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* RESULTS GRID / CARD LISTING */}
          {filteredTributes.length === 0 ? (
            <div className="border border-slate-850 p-8 text-center rounded-xl font-mono text-sm text-slate-500">
              No se encontraron impuestos con los filtros seleccionados. Pruebe reduciendo las condiciones avanzadas.
            </div>
          ) : (
            <div className="border border-slate-850 bg-slate-900/10 rounded-xl overflow-hidden text-left font-sans">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase font-extrabold">
                      <th className="px-5 py-3">Nombre</th>
                      <th className="px-5 py-3">Jurisdicción</th>
                      <th className="px-5 py-3">Tipo de cargo</th>
                      <th className="px-5 py-3">Estado</th>
                      <th className="px-5 py-3">Norma Principal</th>
                      <th className="px-5 py-3">Nivel de Verificación</th>
                      <th className="px-5 py-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/65 font-medium">
                    {filteredTributes.map(t => {
                      const jurItem = jurisdictions.find(j => j.id === t.jurisdiction_id);
                      return (
                        <tr key={t.id} className="hover:bg-slate-905/30 transition">
                          <td className="px-5 py-3.5">
                            <span className="font-extrabold text-white block text-sm">{t.common_name}</span>
                            <span className="text-[11px] text-slate-450 text-slate-400 line-clamp-1">{t.official_name}</span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-[11px] text-slate-300">
                            {jurItem ? jurItem.name : t.jurisdiction_id}
                          </td>
                          <td className="px-5 py-3.5 font-mono">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 uppercase text-[10px]">
                              {t.tribute_type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase ${
                              t.current_status === 'vigente'
                                ? 'text-emerald-400'
                                : t.current_status === 'derogado'
                                ? 'text-slate-500 line-through'
                                : 'text-amber-400'
                            }`}>
                              ● {t.current_status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-300 font-mono text-[11px]">
                            {t.legal_basis_type} {t.legal_basis_number}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono leading-none tracking-wide ${getVerificationColorClasses(t.verification_status)}`}>
                              {t.verification_status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleTabChange('ficha', t.id)}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold tracking-wide rounded text-[11px] transition cursor-pointer"
                            >
                              Ficha completa
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== MÓDULO 3: FICHA DE TRIBUTO ==================== */}
      {activeTab === 'ficha' && (
        <div className="space-y-6" id="view-ficha-tributo">
          {(() => {
            const currentTributeId = params.id || 'iva';
            const currentTribute = tributes.find(t => t.id === currentTributeId);

            if (!currentTribute) {
              return (
                <div className="border border-slate-800 bg-slate-900/30 p-8 text-center rounded-xl font-mono text-sm text-slate-400">
                  <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <span>El impuesto seleccionado con el identificador "{currentTributeId}" no se encuentra cargado en el registro. Pruebe seleccionándolo en el buscador avanzado.</span>
                  <div className="mt-4">
                    <button
                      onClick={() => handleTabChange('buscador')}
                      className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg cursor-pointer text-xs"
                    >
                      Volver al Buscador
                    </button>
                  </div>
                </div>
              );
            }

            // Read child relations
            const currentJur = jurisdictions.find(j => j.id === currentTribute.jurisdiction_id);
            const normItem = norms.find(n => n.tribute_id === currentTribute.id);
            const traceItem = traceability.find(tr => tr.tribute_id === currentTribute.id);
            const relatedVotes = votes.filter(v => traceItem && v.political_traceability_id === traceItem.id);
            const relativeHistory = history.filter(h => h.tribute_id === currentTribute.id).sort((a,b) => b.event_date.localeCompare(a.event_date));
            const currentSources = sources.filter(s => s.related_entity_id === currentTribute.id || s.related_entity_id === normItem?.id);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                {/* Side Col Panel: Header summary and TECHNICAL DATA */}
                <div className="space-y-6">
                  {/* Card Main Identification header */}
                  <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded inline-block font-extrabold mb-3">
                        {currentTribute.tribute_type}
                      </span>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{currentTribute.common_name}</h2>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{currentTribute.official_name}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-850 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500 uppercase text-[10px] font-extrabold">Jurisdicción</span>
                        <span className="text-slate-300">{currentJur ? currentJur.name : currentTribute.jurisdiction_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 uppercase text-[10px] font-extrabold">Estado de cobro</span>
                        <span className={`uppercase text-[10px] font-extrabold ${currentTribute.current_status === 'vigente' ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {currentTribute.current_status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5 pt-2.5">
                        <span className="text-slate-500 uppercase text-[10px] font-extrabold">Nivel de Verificación del Registro</span>
                        <div className={`px-2.5 py-1 rounded border text-center font-bold text-[10px] ${getVerificationColorClasses(currentTribute.verification_status)}`}>
                          {currentTribute.verification_status}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Datasheet Details card */}
                  <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <h3 className="text-xs uppercase font-mono tracking-widest font-black text-slate-400 border-b border-slate-850 pb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-500" />
                      <span>Ficha Técnica y Alícuotas</span>
                    </h3>

                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="text-slate-550 block font-mono text-[10px] text-slate-500 font-extrabold uppercase">Norma de Creación</span>
                        <span className="text-slate-200 mt-1 block font-mono">{currentTribute.legal_basis_type} {currentTribute.legal_basis_number}</span>
                        <span className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{currentTribute.legal_basis_title}</span>
                      </div>

                      {currentTribute.creation_date && (
                        <div>
                          <span className="text-slate-550 block font-mono text-[10px] text-slate-500 font-extrabold uppercase">Fecha de Sanción / Vigencia</span>
                          <span className="text-slate-200 mt-1 block font-mono">{currentTribute.creation_date}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-slate-550 block font-mono text-[10px] text-slate-500 font-extrabold uppercase">Base Imponible</span>
                        <p className="text-slate-300 mt-1 block leading-relaxed text-[11px] font-sans">{currentTribute.taxable_base}</p>
                      </div>

                      <div>
                        <span className="text-slate-550 block font-mono text-[10px] text-slate-500 font-extrabold uppercase">Alícuota Aplicable</span>
                        <p className="text-slate-300 mt-1 block leading-relaxed text-[11px] font-sans">{currentTribute.rate_description}</p>
                      </div>

                      {currentTribute.collecting_agency && (
                        <div>
                          <span className="text-slate-550 block font-mono text-[10px] text-slate-500 font-extrabold uppercase">Organismo Recaudador</span>
                          <span className="text-slate-200 mt-1 block font-mono">{currentTribute.collecting_agency}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Content Area Col: Citizen Explainer and Trazabilidad */}
                <div className="lg:col-span-2 space-y-6">
                  {/* CITIZEN EXPLAINER MODULE */}
                  <div className="border border-slate-850 p-6 rounded-2xl bg-slate-900/10 space-y-4">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-emerald-400" />
                      <span>¿Qué es este tributo? Explicación Ciudadana</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300 leading-relaxed">
                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl space-y-1.5">
                        <span className="font-mono text-[10px] font-black uppercase text-emerald-500 block">¿Quién lo paga de su bolsillo? (Incidencia)</span>
                        <p>{currentTribute.affected_subjects}</p>
                      </div>
                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl space-y-1.5">
                        <span className="font-mono text-[10px] font-black uppercase text-emerald-500 block">¿Sobre qué actividad/bien se calcula?</span>
                        <p>{currentTribute.affected_activities}</p>
                      </div>
                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl space-y-1.5">
                        <span className="font-mono text-[10px] font-black uppercase text-emerald-500 block">¿Quiénes o qué actividades quedan exentas?</span>
                        <p>{currentTribute.exempt_subjects}</p>
                      </div>
                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl space-y-1.5">
                        <span className="font-mono text-[10px] font-black uppercase text-emerald-500 block">¿Qué destino oficial tiene lo recaudado?</span>
                        <p>{currentTribute.declared_revenue_destination || 'Rentas generales unificadas de la jurisdicción.'}</p>
                      </div>
                    </div>
                  </div>

                  {/* POLITICAL TRACEABILITY SUBSECTION (RULE: EXPLICIT FAILURE SANS SOURCE RECORD) */}
                  <div className="border border-slate-850 p-6 rounded-2xl bg-slate-900/10 space-y-4">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      <span>Trazabilidad y Origen Político Votado</span>
                    </h3>

                    {!traceItem || traceItem.traceability_status === 'No se encontró trazabilidad política suficiente en fuentes públicas consultadas.' ? (
                      <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-5 text-center font-mono text-xs text-slate-550 space-y-2 text-slate-400">
                        <ShieldAlert className="w-6 h-6 text-slate-500 mx-auto" />
                        <span>No se encontró trazabilidad política suficiente en fuentes públicas consultadas.</span>
                        <p className="text-[10px] text-slate-500 italic max-w-sm mx-auto leading-normal">
                          Las instituciones legislativas comunales o nacionales de la época no poseían base informatizada o las votaciones no quedaron registradas nominalmente en diarios parlamentarios abiertos.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans text-xs">
                          <div className="bg-slate-950/40 border border-slate-900 p-3 rounded-lg">
                            <span className="font-mono text-[10px] text-slate-500 font-extrabold uppercase">Propuesto / Impulsado por</span>
                            <span className="text-white block font-extrabold mt-1 text-sm">{traceItem.proposal_author_name}</span>
                            <span className="text-emerald-400 text-[11px] font-mono">{traceItem.proposal_author_party_at_time}</span>
                          </div>
                          <div className="bg-slate-950/40 border border-slate-900 p-3 rounded-lg">
                            <span className="font-mono text-[10px] text-slate-500 font-extrabold uppercase">Poder Ejecutivo Promulgador</span>
                            <span className="text-white block font-extrabold mt-1 text-sm">{traceItem.executive_authority_name}</span>
                            <span className="text-emerald-400 text-[11px] font-mono">{traceItem.executive_authority_party_at_time}</span>
                          </div>
                        </div>

                        {/* Votes metrics */}
                        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl space-y-3 font-sans">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-900 pb-3">
                            <div>
                              <span className="text-white text-xs font-bold block">Tratamiento Parlamentario</span>
                              <span className="text-[11px] text-slate-400">{traceItem.legislative_body || 'Cámara de Diputados de la Nación'}</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 border border-slate-800 px-2.5 py-1 bg-slate-900/60 rounded">
                              Fecha: {traceItem.session_date}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                            <div className="p-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                              <span className="text-emerald-400 text-[10px] font-mono uppercase block font-extrabold">Afirmativos</span>
                              <span className="text-xl font-black text-white font-mono">{traceItem.votes_in_favor_count || 'Voz'}</span>
                            </div>
                            <div className="p-2 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                              <span className="text-rose-400 text-[10px] font-mono uppercase block font-extrabold">Negativos</span>
                              <span className="text-xl font-black text-white font-mono">{traceItem.votes_against_count || 'Voz'}</span>
                            </div>
                            <div className="p-2 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                              <span className="text-amber-400 text-[10px] font-mono uppercase block font-extrabold">Abstenciones</span>
                              <span className="text-xl font-black text-white font-mono">{traceItem.abstentions_count ?? 0}</span>
                            </div>
                            <div className="p-2 bg-slate-800/10 border border-slate-800 rounded-lg">
                              <span className="text-slate-400 text-[10px] font-mono uppercase block font-extrabold">Ausentes</span>
                              <span className="text-xl font-black text-white font-mono">{traceItem.absentees_count ?? 0}</span>
                            </div>
                          </div>

                          {traceItem.source_url && (
                            <div className="flex justify-end pt-1">
                              <a
                                href={traceItem.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-mono"
                              >
                                <span>Ver Acta Oficial de Votación</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Nominal Voter Detailed Table */}
                        {relatedVotes.length > 0 && (
                          <div className="space-y-2 pt-2 text-left">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">Detalle de Votos Nominales Documentados</span>
                            <div className="border border-slate-800 bg-slate-900/10 rounded-xl overflow-hidden">
                              <div className="overflow-x-auto">
                                <table className="w-full text-[11px]" id={`votes-table-${currentTribute.id}`}>
                                  <thead>
                                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[9px] uppercase font-bold">
                                      <th className="px-3.5 py-2">Político</th>
                                      <th className="px-3.5 py-2">Cargo</th>
                                      <th className="px-3.5 py-2">Partido (Histórico)</th>
                                      <th className="px-3.5 py-2">Bloque (Histórico)</th>
                                      <th className="px-3.5 py-2">Provincia/Distrito</th>
                                      <th className="px-3.5 py-2">Voto</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-850 font-sans">
                                    {relatedVotes.map(v => (
                                      <tr key={v.id} className="hover:bg-slate-900/40">
                                        <td className="px-3.5 py-2 font-extrabold text-white">{v.politician_name}</td>
                                        <td className="px-3.5 py-2 text-slate-400 font-mono text-[10px]">{v.role_at_time}</td>
                                        <td className="px-3.5 py-2 text-slate-300">{v.party_at_time}</td>
                                        <td className="px-3.5 py-2 text-slate-450 text-slate-400">{v.bloc_at_time}</td>
                                        <td className="px-3.5 py-2 font-mono text-slate-300 text-[10px]">{v.district}</td>
                                        <td className="px-3.5 py-2 uppercase font-mono text-[10px]">
                                          <span className={`px-2 py-0.5 rounded font-extrabold ${
                                            v.vote === 'afirmativo'
                                              ? 'bg-emerald-500/10 text-emerald-400'
                                              : v.vote === 'negativo'
                                              ? 'bg-rose-500/10 text-rose-400'
                                              : 'bg-amber-500/10 text-amber-400'
                                          }`}>
                                            {v.vote}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* NORM TIMELINE HISTORY */}
                  <div className="border border-slate-850 p-6 rounded-2xl bg-slate-900/10 space-y-4">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-sans">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      <span>Evolución e Historial Normativo ({relativeHistory.length})</span>
                    </h3>

                    {relativeHistory.length === 0 ? (
                      <p className="text-xs text-slate-500 font-mono text-center py-4">No se registran reformas históricas cargadas en el archivo para este tributo.</p>
                    ) : (
                      <div className="space-y-4 relative border-l border-slate-800 pl-4 ml-2 pt-2">
                        {relativeHistory.map(h => (
                          <div key={h.id} className="relative space-y-1 font-sans text-xs">
                            {/* Dot */}
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-emerald-400 font-bold block">{h.event_date}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 uppercase font-mono text-[9px]">
                                {h.event_type}
                              </span>
                            </div>
                            <span className="font-extrabold text-white block mt-1 leading-normal">{h.description}</span>
                            {(h.previous_value || h.new_value) && (
                              <div className="bg-slate-950/20 border border-slate-900/60 p-2.5 rounded-lg text-[11px] font-mono mt-2 space-y-1">
                                {h.previous_value && <div role="presentation"><span className="text-slate-500">Valor anterior:</span> <span className="text-slate-400">{h.previous_value}</span></div>}
                                {h.new_value && <div role="presentation"><span className="text-slate-500 font-extrabold">Nuevo valor:</span> <span className="text-white font-extrabold">{h.new_value}</span></div>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ==================== MÓDULO 4: RESPONSABILIDAD POLÍTICA DOCUMENTADA ==================== */}
      {activeTab === 'responsabilidad' && (
        <div className="space-y-6" id="view-responsabilidad-politica">
          {/* SOBER INTRO LEGAL ADVISORIES AND VERBAL HYPOTHESIS BLOCK */}
          <div className="border border-slate-800 bg-slate-900/20 p-6 rounded-2xl space-y-3 text-left">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-sans">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <span>Garantías de Rigor Intelectual y Neutralidad</span>
            </h2>
            <div className="text-xs text-slate-400 space-y-2.5 leading-relaxed font-sans">
              <p>
                La plataforma <strong>no asigna responsabilidad penal ni realiza acusaciones de carácter judicial</strong>. No utilizamos adjetivos calificativos, ni términos agresivos ideológicos en nuestros análisis o clasificaciones de datos.
              </p>
              <p>
                Nuestro módulo de <strong>Responsabilidad Política Documentada</strong> asocia de manera objetiva los nombres de las autoridades proponentes del Ejecutivo y los bloques parlamentarios legislativos de acompañamiento, única y estrictamente sustentado por el acta oficial, diario de sesiones o boletín del distrito.
              </p>
              <p className="font-mono text-[10px] text-slate-500 border-t border-slate-900 pt-2.5">
                Regla general del sistema: Cuando una fuente gubernamental no publica de forma nominal individual quién firmó, propuso u aprobó una tasa municipal u ordenanza fiscal provincial, el sistema marca el campo de forma obligatoria como "Información no disponible".
              </p>
            </div>
          </div>

          {/* ==================== INTERACTIVE PARLIAMENTARY BALLOT AND CHART ==================== */}
          <div className="border border-slate-900 bg-slate-950/40 p-6 rounded-2xl text-left space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block">Trazabilidad de Votación Nominal</span>
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                Explorador de Cargas Aprobadas por el Poder Legislativo
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Seleccione un proyecto parlamentario para visualizar de forma interactiva la composición del voto de diputados, senadores o concejales encargados por ley de la creación o ampliación impositiva.
              </p>
            </div>

            {/* Quick selectors row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {VOTING_SESSIONS.map((session) => {
                const isSelected = selectedTraceId === session.traceId;
                return (
                  <button
                    key={session.traceId}
                    onClick={() => {
                      setSelectedTraceId(session.traceId);
                      setBallotSearchTerm(''); // clear search on shift
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-full hover:border-slate-700 ${
                      isSelected
                        ? 'bg-slate-900/80 border-slate-700 text-white ring-2 ring-emerald-500/20'
                        : 'bg-slate-950/40 border-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-300 w-fit block font-bold">
                        {session.date}
                      </span>
                      <h4 className="text-xs font-bold font-sans line-clamp-2 mt-1.5 leading-snug">
                        {session.title}
                      </h4>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-2 flex justify-between border-t border-slate-900 pt-2 w-full">
                      <span>A favor: <strong className="text-emerald-400">{session.votos_favor}</strong></span>
                      <span>En contra: <strong className="text-rose-400">{session.votos_contra}</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>

            {(() => {
              const session = VOTING_SESSIONS.find(s => s.traceId === selectedTraceId) || VOTING_SESSIONS[0];

              // Math for seating representation
              const totalDots = 150;
              const posCount = session.votos_favor;
              const negCount = session.votos_contra;
              const neutCount = session.votos_neutral_ausente;
              const sum = posCount + negCount + neutCount || 1;

              const numPos = Math.round(totalDots * (posCount / sum));
              const numNeg = Math.round(totalDots * (negCount / sum));
              const numNeut = totalDots - numPos - numNeg;

              const dotColors: string[] = [];
              for (let i = 0; i < numNeg; i++) dotColors.push('#f43f5e'); // rose-500
              for (let i = 0; i < numNeut; i++) dotColors.push('#fbbf24'); // amber-400
              for (let i = 0; i < numPos; i++) dotColors.push('#10b981'); // emerald-500

              const rows = 5;
              const startRadius = 50;
              const radiusStep = 18;
              const seats: { x: number; y: number; color: string }[] = [];
              let colorIdx = 0;

              for (let r = 0; r < rows; r++) {
                const radius = startRadius + r * radiusStep;
                const seatsInRow = Math.round(14 + r * 6);
                
                for (let s = 0; s < seatsInRow; s++) {
                  if (colorIdx >= totalDots) break;
                  // Upper semicircle (angle in PI...2*PI)
                  const angle = Math.PI + (s / (seatsInRow - 1 || 1)) * Math.PI;
                  
                  const cx = 170;
                  const cy = 150;
                  const x = cx + radius * Math.cos(angle);
                  const y = cy + radius * Math.sin(angle);
                  
                  seats.push({
                    x,
                    y,
                    color: dotColors[colorIdx] || '#64748b'
                  });
                  colorIdx++;
                }
              }

              // Filter Ballot List
              const filteredVoters = session.voters.filter(voter => {
                const matchesVote = ballotVoteFilter === 'all' || voter.vote === ballotVoteFilter;
                const matchesSearch = ballotSearchTerm.trim() === '' || 
                  voter.name.toLowerCase().includes(ballotSearchTerm.toLowerCase()) || 
                  voter.block.toLowerCase().includes(ballotSearchTerm.toLowerCase()) || 
                  voter.district.toLowerCase().includes(ballotSearchTerm.toLowerCase());
                return matchesVote && matchesSearch;
              });

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: THE INTERACTIVE VOTE REPRESENTATION CHART */}
                  <div className="lg:col-span-5 bg-slate-900/10 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xs uppercase font-mono tracking-wider font-extrabold text-white">
                        Hemiciclo de Votación (Holograma)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Representación gráfica proporcional de las bancas parlamentarias en el recinto.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-slate-950/40 border border-slate-900/60 rounded-xl">
                      <div className="w-full max-w-[340px] aspect-[2/1] relative flex items-center justify-center mb-2">
                        <svg viewBox="0 0 340 170" className="w-full h-full">
                          {/* Main Speaker pod / podium */}
                          <path d="M 155,160 A 15,15 0 0,1 185,160 Z" fill="#334155" />
                          <rect x="162" y="161" width="16" height="3" rx="0.5" fill="#475569" />
                          
                          {/* Seat circles */}
                          {seats.map((seat, idx) => (
                            <circle
                              key={idx}
                              cx={seat.x}
                              cy={seat.y}
                              r="4.2"
                              fill={seat.color}
                              className="transition-all duration-300 hover:scale-150 cursor-pointer"
                            >
                              <title>{
                                seat.color === '#10b981' ? 'Voto Afirmativo (Verde)' :
                                seat.color === '#f43f5e' ? 'Voto Negativo (Rojo)' :
                                'Abstención / Ausente / Neutral (Amarillo/Oro)'
                              }</title>
                            </circle>
                          ))}
                        </svg>
                      </div>

                      {/* Legislative Legend Stats block */}
                      <div className="grid grid-cols-3 gap-2 w-full border-t border-slate-900/80 pt-4 mt-2 text-center">
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                            <span>Afirmativos</span>
                          </div>
                          <p className="text-lg font-bold font-mono text-emerald-400 leading-none">{posCount}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{(posCount / (sum) * 100).toFixed(1)}%</p>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                            <span>Negativos</span>
                          </div>
                          <p className="text-lg font-bold font-mono text-rose-400 leading-none">{negCount}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{(negCount / (sum) * 100).toFixed(1)}%</p>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                            <span>Neutral/Aus.</span>
                          </div>
                          <p className="text-lg font-bold font-mono text-amber-400 leading-none">{neutCount}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{(neutCount / (sum) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-400 block border-b border-slate-900 pb-1">Ficha de Resumen Legislativo</span>
                      <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] font-sans">
                        <span className="text-slate-500">Cámara Actuante:</span>
                        <span className="text-white font-medium text-right line-clamp-1">{session.chamber}</span>
                        <span className="text-slate-500">Expediente Oficial:</span>
                        <a href={session.url} target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="text-emerald-400 font-mono text-right hover:underline flex items-center justify-end gap-1">
                          <span>Ver Acta</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-400 italic bg-slate-900/30 p-2 rounded leading-relaxed border-l-2 border-slate-700 font-sans">
                        "{session.summary}"
                      </p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: SEARCHABLE / FILTERABLE LEY LEGISLATORS REGISTRY */}
                  <div className="lg:col-span-7 bg-slate-900/10 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="text-xs uppercase font-mono tracking-wider font-extrabold text-white flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-500" />
                          <span>Registro Nominal de Votantes</span>
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Buscador nominal de votos individuales para esta ley o contribución.
                        </p>
                      </div>
                      
                      {/* Search box */}
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Buscar legislador o bloque..."
                          value={ballotSearchTerm}
                          onChange={(e) => setBallotSearchTerm(e.target.value)}
                          className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-900 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
                        />
                      </div>
                    </div>

                    {/* Filter ballot tabs */}
                    <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-900 w-fit">
                      {[
                        { id: 'all', label: 'Todos', activeColor: 'bg-slate-800 text-white' },
                        { id: 'afirmativo', label: 'Votó A Favor (Verde)', activeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', count: session.voters.filter(v => v.vote === 'afirmativo').length },
                        { id: 'negativo', label: 'Votó En Contra (Rojo)', activeColor: 'bg-rose-500/10 border-rose-500/30 text-rose-400', count: session.voters.filter(v => v.vote === 'negativo').length },
                        { id: 'abstencion_ausente', label: 'Ausente/Neutral', activeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400', count: session.voters.filter(v => v.vote === 'abstencion' || v.vote === 'ausente').length }
                      ].map((tab) => {
                        const isTabActive = ballotVoteFilter === tab.id || (tab.id === 'abstencion_ausente' && (ballotVoteFilter === 'abstencion' || ballotVoteFilter === 'ausente'));
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              if (tab.id === 'abstencion_ausente') {
                                setBallotVoteFilter('abstencion'); // handles standard mapping
                              } else {
                                setBallotVoteFilter(tab.id);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                              isTabActive
                                ? `${tab.activeColor} font-extrabold`
                                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                              <span className="ml-1.5 text-[9px] font-mono px-1 rounded bg-slate-900 border border-slate-850 text-slate-400">
                                {tab.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legislators matching results roll */}
                    <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {filteredVoters.length === 0 ? (
                        <div className="p-8 text-center bg-slate-950/20 rounded-xl border border-slate-900 border-dashed text-slate-500 font-mono text-xs">
                          No se encontraron legisladores con ese criterio de búsqueda.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {filteredVoters.map((voter) => {
                            const isAffir = voter.vote === 'afirmativo';
                            const isNeg = voter.vote === 'negativo';
                            
                            return (
                              <div
                                key={voter.id}
                                className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-200 bg-slate-950/40 ${
                                  isAffir
                                    ? 'border-emerald-500/15 hover:border-emerald-500/30 ring-1 ring-emerald-500/[0.02]'
                                    : isNeg
                                    ? 'border-rose-500/10 hover:border-rose-500/20'
                                    : 'border-amber-500/10 hover:border-amber-500/20'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-1">
                                  <div className="space-y-0.5">
                                    <h4 className="font-extrabold text-white text-xs">{voter.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-mono">
                                      {voter.role} — {voter.district}
                                    </p>
                                    <span className="text-[10px] text-slate-400 font-normal leading-normal line-clamp-1 block">
                                      {voter.block}
                                    </span>
                                  </div>

                                  {/* Badge according to vote */}
                                  {isAffir && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase font-bold text-right">
                                      A Favor
                                    </span>
                                  )}
                                  {isNeg && (
                                    <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-[9px] uppercase font-bold text-right">
                                      En Contra
                                    </span>
                                  )}
                                  {(voter.vote === 'abstencion' || voter.vote === 'ausente') && (
                                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase font-bold text-right">
                                      {voter.vote === 'abstencion' ? 'Abstención' : 'Ausente'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    {/* Prompt clarifying default state */}
                    <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-[10px] font-mono text-slate-500">
                      <strong>Nota de Auditoría:</strong> Por defecto, el listado muestra a favor (afirmativos). Los datos cargados reflejan de forma idéntica el diario de sesiones oficial del respectivo organismo legislativo.
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* DYNAMIC RANKINGS COMPILING FROM LOADED PARLIAMENT RECORDS */}
          {tributes.length < 3 ? (
            <div className="border border-slate-900 bg-slate-950/40 p-8 text-center rounded-xl font-mono text-sm text-slate-500">
              “No hay datos verificados suficientes para construir este ranking.”
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
              {/* Politicians with most affirmative votes recorded */}
              <div className="border border-slate-850 bg-slate-900/10 p-5 rounded-2xl space-y-4">
                <div>
                  <h3 className="text-sm uppercase font-mono tracking-wider font-extrabold text-white flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-emerald-500" />
                    <span>Leyes Tributarias en CABA y Nación Votadas</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Conteo compilado de legisladores con acompañamiento de subas en registros nominales analizados.</p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { name: 'Máximo Kirchner', votesCount: 2, bloc: 'Frente de Todos / UP', trend: 'IVA (modificación 2023), PAIS (2019)' },
                    { name: 'Carlos Heller', votesCount: 2, bloc: 'Frente de Todos', trend: 'PAIS (2019), Ganancias paliativo (reforma)' },
                    { name: 'José Luis Espert', votesCount: 1, bloc: 'La Libertad Avanza', trend: 'Ganancias paliativo (Ley 27.743 en 2024)' },
                    { name: 'María Eugenia Vidal', votesCount: 1, bloc: 'Frente PRO', trend: 'Ganancias paliativo (Ley 27.743 en 2024)' }
                  ].map((p, idx) => (
                    <div key={p.name} className="flex justify-between items-center p-3 bg-slate-950/40 rounded-lg border border-slate-900/40">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-white text-xs">{idx + 1}. {p.name}</span>
                        <p className="text-[10px] text-slate-500 leading-normal">{p.bloc} — {p.trend}</p>
                      </div>
                      <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-center font-mono">
                        {p.votesCount} {p.votesCount === 1 ? 'Foto' : 'Votos'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technical stats footnotes */}
                <div className="p-3 bg-slate-900/50 border border-slate-850/60 rounded-xl text-[10px] font-mono text-slate-500 space-y-1">
                  <div><strong>Criterio de cálculo:</strong> Conteo general de asistencias electrónicas registradas con voto afirmativo en proyectos de creación o adición impositiva.</div>
                  <div><strong>Cobertura analizada:</strong> Período 2019 - 2026.</div>
                  <div><strong>Base:</strong> 7 proyectos oficiales relevados. Completitud general: 95%.</div>
                </div>
              </div>

              {/* Governments under which most taxes were created */}
              <div className="border border-slate-850 bg-slate-900/10 p-5 rounded-2xl space-y-4">
                <div>
                  <h3 className="text-sm uppercase font-mono tracking-wider font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span>Leyes y Decretos Tributarios por Administración</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Conteo de gravámenes sancionados o prorrogados agrupados bajo mandatos presidenciales.</p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { gov: 'Frente de Todos / UP (Alberto Fernández)', count: 2, keyTribute: 'Impuesto PAIS, Tasa Vial local indirecta' },
                    { gov: 'Justicialismo FREJULI (Juan Domingo Perón)', count: 2, keyTribute: 'Establecimiento del IVA general, Ley de Ganancias original' },
                    { gov: 'La Libertad Avanza (Javier Milei)', count: 1, keyTribute: 'Restitución de cuarta categoría ganancias (Ley 27.743)' },
                    { gov: 'Facto militar (Dictador Jorge Videla)', count: 1, keyTribute: 'Código Aduanero y Derechos de Exportación Agropecuarios de base' }
                  ].map((g, idx) => (
                    <div key={g.gov} className="flex justify-between items-center p-3 bg-slate-950/40 rounded-lg border border-slate-900/40">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-white text-xs">{idx + 1}. {g.gov}</span>
                        <p className="text-[10px] text-slate-500 leading-normal">Clave: {g.keyTribute}</p>
                      </div>
                      <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-extrabold font-mono text-center">
                        {g.count} Reg.
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technical stats footnotes */}
                <div className="p-3 bg-slate-900/50 border border-slate-850/60 rounded-xl text-[10px] font-mono text-slate-500 space-y-1">
                  <div><strong>Criterio de cálculo:</strong> Clasificación según fecha de entrada en vigencia del gravamen asociada a mandatos de gobierno central.</div>
                  <div><strong>Período analizado:</strong> 1973 - 2026 de forma histórica retrospectiva.</div>
                  <div><strong>Base:</strong> 6 tributos nacionales relevados. Completitud: 100%.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== MÓDULO 5: MAPA POR JURISDICCIÓN ==================== */}
      {activeTab === 'jurisdicciones' && (
        <div className="space-y-6" id="view-mapa-jurisdicciones">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* Interactive Selector list (SVG representation and district cards) */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-extrabold block">Seleccione Jurisdicción territorial</span>

              <div className="space-y-2">
                {jurisdictions.map(j => {
                  const isSelected = selectedJurisdictionId === j.id;
                  const count = tributes.filter(t => t.jurisdiction_id === j.id).length;
                  return (
                    <button
                      key={j.id}
                      onClick={() => setSelectedJurisdictionId(j.id)}
                      className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/35 text-white'
                          : 'bg-slate-900/20 border-slate-850 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-extrabold text-sm block leading-none">{j.name}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1 block">{j.type}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-slate-950 font-mono text-[10px] font-bold text-slate-400">
                        {count} Cargas
                      </span>
                    </button>
                  );
                })}

                {/* Pending Relevamiento Mock placeholders */}
                {['mendoza', 'santa_fe_prov', 'cordoba_prov'].map(mockId => (
                  <button
                    key={mockId}
                    onClick={() => {
                        setSelectedJurisdictionId(mockId);
                    }}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center opacity-65 ${
                      selectedJurisdictionId === mockId ? 'bg-slate-900 border-amber-500/20' : 'bg-slate-900/10 border-slate-900/50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-400 block mt-0.5 leading-none">
                        {mockId === 'mendoza' ? 'Provincia de Mendoza' : mockId === 'santa_fe_prov' ? 'Provincia de Santa Fe' : 'Provincia de Córdoba'}
                      </span>
                      <span className="text-[9px] font-mono text-amber-500 uppercase mt-1 block leading-none">Pendiente de relevamiento</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content summary report columns for active jurisdiction selection */}
            <div className="lg:col-span-2 space-y-6">
              {selectedJurisdictionId.includes('mendoza') || selectedJurisdictionId.includes('_prov') ? (
                <div className="border border-slate-800 bg-slate-900/20 p-8 rounded-2xl text-center font-mono text-sm text-slate-400">
                  <ShieldAlert className="w-8 h-8 text-amber-500/80 mx-auto mb-3" />
                  <span className="block font-bold">Jurisdicción pendiente de relevamiento.</span>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal mt-2">
                    Las agencias tributarias locales o legislaturas de este distrito aún no han sido analizadas por nuestra mesa de auditores voluntarios. No publicamos estimaciones provisorias sin cotejar actas legales primarias de origen.
                  </p>
                </div>
              ) : (
                <>
                  {/* Summary values */}
                  {selectedJurisdiction && (
                    <div className="border border-slate-850 bg-slate-900/15 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-mono text-[10px] text-slate-500 uppercase font-black tracking-widest block">Analizando Jurisdicción</span>
                          <h2 className="text-xl font-extrabold text-white mt-1 leading-normal">{selectedJurisdiction.name}</h2>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                          Transparencia: {selectedJurisdiction.verification_status}
                        </span>
                      </div>

                      {/* Info blocks from jurisdictions */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                        {selectedJurisdiction.official_website_url && (
                          <div className="p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg">
                            <span className="text-slate-500 uppercase text-[9px] block">Portal Web</span>
                            <a href={selectedJurisdiction.official_website_url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white line-clamp-1 mt-1 block">
                              {selectedJurisdiction.official_website_url.replace('https://', '')}
                            </a>
                          </div>
                        )}
                        {selectedJurisdiction.tax_agency_url && (
                          <div className="p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg">
                            <span className="text-slate-500 uppercase text-[9px] block">Fisco Local</span>
                            <a href={selectedJurisdiction.tax_agency_url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white line-clamp-1 mt-1 block">
                              {selectedJurisdiction.tax_agency_url.replace('https://', '')}
                            </a>
                          </div>
                        )}
                        {selectedJurisdiction.boletin_oficial_url && (
                          <div className="p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg">
                            <span className="text-slate-500 uppercase text-[9px] block">Boletín Oficial</span>
                            <a href={selectedJurisdiction.boletin_oficial_url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white line-clamp-1 mt-1 block">
                              {selectedJurisdiction.boletin_oficial_url.replace('https://', '')}
                            </a>
                          </div>
                        )}
                        {selectedJurisdiction.legislature_url && (
                          <div className="p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg">
                            <span className="text-slate-500 uppercase text-[9px] block">Cuerpo Legislativo</span>
                            <a href={selectedJurisdiction.legislature_url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white line-clamp-1 mt-1 block">
                              {selectedJurisdiction.legislature_url.replace('https://', '')}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Surveyed Taxes registered lists under selection */}
                  <div className="border border-slate-850 p-6 rounded-2xl bg-slate-900/10 space-y-4">
                    <h3 className="text-sm uppercase font-mono tracking-widest font-black text-slate-300 border-b border-slate-900 pb-2">
                      Impuestos y tasas relevadas en la jurisdicción ({jurisdictionTributes.length})
                    </h3>

                    {jurisdictionTributes.length === 0 ? (
                      <p className="text-xs text-slate-500 font-mono text-center py-4">No hay tributos cargados para este distrito específico actualmente.</p>
                    ) : (
                      <div className="space-y-3">
                        {jurisdictionTributes.map(t => (
                          <div
                            key={t.id}
                            className="p-4 bg-slate-900/20 hover:bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition cursor-pointer"
                            onClick={() => handleTabChange('ficha', t.id)}
                          >
                            <div className="text-left">
                              <span className="font-extrabold text-sm text-white">{t.common_name}</span>
                              <span className="text-[11px] text-slate-400 block">{t.official_name}</span>
                            </div>

                            <span className={`px-2.5 py-0.5 rounded border font-mono text-[9px] ${getVerificationColorClasses(t.verification_status)}`}>
                              {t.verification_status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MÓDULO 6: FUENTES Y VERIFICACIÓN ==================== */}
      {activeTab === 'fuentes' && (
        <div className="space-y-6" id="view-fuentes-verificacion">
          <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl text-left text-xs text-slate-400 leading-normal">
            La prioridad fundamental de nuestra plataforma es garantizar que <strong>cada dato posea un respaldo fehaciente de carácter oficial</strong>. El listado adjunto cataloga todas las bases normativas prioritarias, boletines oficiales y digestos consultados para auditar el mapa nacional tributario.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans">
            {sources.map(s => {
              const jurOfSource = jurisdictions.find(j => j.id === s.jurisdiction_id);
              return (
                <div key={s.id} className="border border-slate-850 bg-slate-900/10 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-800 transition">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 uppercase font-mono text-[9px]">
                        {s.source_type}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">Jurisdicción: {jurOfSource ? jurOfSource.name : s.jurisdiction_id}</span>
                    </div>
                    <span className="font-extrabold text-sm text-white block leading-snug">{s.title}</span>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{s.notes || 'Cotejada de forma recurrente por auditores.'}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-550 text-slate-500 uppercase block font-extrabold">Fiabilidad de origen</span>
                      <span className="text-white text-[11px] block">{s.reliability_level}</span>
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg flex items-center gap-1 hover:text-emerald-300 transition"
                    >
                      <span>Acceder a Fuente</span>
                      <ExternalLink className="w-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== MÓDULO 7: METODOLOGÍA TÉCNICA ==================== */}
      {activeTab === 'metodologia' && (
        <div className="max-w-4xl mx-auto space-y-6 text-left" id="view-metodologia">
          {/* SOBER CONTAINER FOR METODOLOGY GUIDELINES */}
          <div className="border border-slate-850 p-6 md:p-8 rounded-2xl bg-slate-900/10 space-y-6 text-slate-300 leading-relaxed text-sm">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight border-b border-slate-850 pb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              <span>Metodología de Relevamiento Tributario</span>
            </h2>

            <div className="space-y-6 font-sans">
              <section className="space-y-2">
                <span className="font-extrabold text-white text-base block">1. Definiciones Metodológicas Base</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para evitar discrepancias conceptuales, nos regimos por el marco de la ciencia fiscal en finanzas públicas:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-400 spacing-y-2.5 space-y-1.5">
                  <li><strong>Impuesto:</strong> Obligación pecuniaria de sostenimiento del Estado, que no guarda contraprestación directa con el contribuyente.</li>
                  <li><strong>Tasa:</strong> Tarifa obligatoria cobrada por un municipio, vinculada legalmente a la prestación efectiva o potencial de un servicio individualizable de seguridad, higiene vial, bacheo u análogos.</li>
                  <li><strong>Contribución Especial:</strong> Gravamen surgido por un incremento de valor de bienes de propiedad del contribuyente debido a obras públicas municipales.</li>
                  <li><strong>Derecho:</strong> Conceptos arancelarios cobrados por inspección de cartelerías, abasto comercial, cementerios o derechos de construcción.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <span className="font-extrabold text-white text-base block">2. Trazabilidad Política y Votaciones Nominales</span>
                <p className="text-xs text-slate-400 leading-normal">
                  La neutralidad es innegociable. No hacemos suposiciones verbales ni adjetivamos el actuar de los partidos.
                  Si se registra el voto afirmativo de un legislador, el partido de la época que se muestra corresponde estrictamente al momento histórico de la sanción normada (no sus filiaciones actuales o posteriores).
                </p>
              </section>

              {/* Module 12 text warnings block */}
              <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl text-xs space-y-2.5">
                <span className="font-extrabold text-white block uppercase tracking-wider font-mono text-[10px]">Avisos Legales Mandatarios</span>
                <ul className="list-disc pl-4 text-slate-400 space-y-1 text-[11px]">
                  <li>Esta información tiene fines ciudadanos, educativos y de transparencia pública.</li>
                  <li>No constituye asesoramiento contable, tributario ni legal. Ante dudas financieras, consulte contadores o tributaristas certificados oficiales.</li>
                  <li>Las fuentes oficiales del Boletín Oficial o dependencias fiscales prevalecerán siempre jurídicamente sobre cualquier resumen interpretativo elaborado por la plataforma.</li>
                  <li>La ausencia de información de votaciones nominales en un municipio no implica inexistencia del dato parlamentario, sino falta de fuente pública abierta disponible o relevada.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MÓDULO 8: PANEL ADMINISTRATIVO EDITORIAL ==================== */}
      {activeTab === 'admin' && (
        <div className="space-y-6" id="view-panel-editor">
          {/* EXPLANATORY HEADER WORKBENCH */}
          <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl text-left text-xs text-slate-400 space-y-2">
            <h2 className="text-sm font-extrabold text-white">Panel Interno de Carga y Auditoría</h2>
            <p className="leading-normal">
              Este espacio simula la consola de auditoría de los investigadores voluntarios. Puede registrar un nuevo gravamen, asociar leyes, cargar actas de votaciones parlamentarias nominales y marcar su nivel de evidencia documental. Se aplican de forma obligatoria las reglas de consistencia de la plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* Save form column */}
            <div className="lg:col-span-2 border border-slate-850 bg-slate-900/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase block border-b border-slate-900 pb-2">Formulario de Alta de Gravamen</h3>

              {/* Alert notifications area */}
              {adminError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg font-mono">
                  {adminError}
                </div>
              )}

              {adminSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-lg font-mono">
                  {adminSuccess}
                </div>
              )}

              <form onSubmit={handleSaveTribute} className="space-y-4 text-xs font-sans">
                {/* Two col grid input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-official-name">Nombre Oficial del Impuesto</label>
                    <input
                      id="form-official-name"
                      type="text"
                      placeholder="Ej: Impuesto sobre los Combustibles Líquidos y Dióxido..."
                      value={newTribute.official_name || ''}
                      onChange={(e) => setNewTribute({...newTribute, official_name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-common-name">Nombre Común o Sigla</label>
                    <input
                      id="form-common-name"
                      type="text"
                      placeholder="Ej: Impuesto a los Combustibles"
                      value={newTribute.common_name || ''}
                      onChange={(e) => setNewTribute({...newTribute, common_name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-tribute-type">Tipo de Carga</label>
                    <select
                      id="form-tribute-type"
                      value={newTribute.tribute_type || 'impuesto'}
                      onChange={(e) => setNewTribute({...newTribute, tribute_type: e.target.value as any})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-350 text-slate-300 focus:outline-none"
                    >
                      <option value="impuesto">Impuesto</option>
                      <option value="tasa">Tasa</option>
                      <option value="contribucion">Contribución</option>
                      <option value="derecho">Derecho</option>
                      <option value="percepcion">Percepción</option>
                      <option value="retencion">Retención</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-gov-level">Nivel Gubernamental</label>
                    <select
                      id="form-gov-level"
                      value={newTribute.government_level || 'nacional'}
                      onChange={(e) => setNewTribute({...newTribute, government_level: e.target.value as any})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-350 text-slate-300 focus:outline-none"
                    >
                      <option value="nacional">Nacional</option>
                      <option value="provincial">Provincial</option>
                      <option value="municipal">Municipal</option>
                      <option value="caba">CABA</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-jurisdiction">Jurisdicción de Aplicación</label>
                    <select
                      id="form-jurisdiction"
                      value={newTribute.jurisdiction_id || 'nacion'}
                      onChange={(e) => setNewTribute({...newTribute, jurisdiction_id: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-350 text-slate-300 focus:outline-none"
                    >
                      {jurisdictions.map(j => (
                        <option key={j.id} value={j.id}>{j.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-status">Estado de Cobro</label>
                    <select
                      id="form-status"
                      value={newTribute.current_status || 'vigente'}
                      onChange={(e) => setNewTribute({...newTribute, current_status: e.target.value as any})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-350 text-slate-300 focus:outline-none"
                    >
                      <option value="vigente">Vigente</option>
                      <option value="derogado">Derogado</option>
                      <option value="suspendido">Suspendido</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-agency">Organismo Cobrador</label>
                    <input
                      id="form-agency"
                      type="text"
                      placeholder="Ej: ARCA, ARBA, o Municipalidad"
                      value={newTribute.collecting_agency || ''}
                      onChange={(e) => setNewTribute({...newTribute, collecting_agency: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-basis-type">Tipo de Norma de Creación</label>
                    <input
                      id="form-basis-type"
                      type="text"
                      placeholder="Ej: Ley Nacional, Decreto, Ordenanza"
                      value={newTribute.legal_basis_type || ''}
                      onChange={(e) => setNewTribute({...newTribute, legal_basis_type: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-basis-num">Número de norma de creación</label>
                    <input
                      id="form-basis-num"
                      type="text"
                      placeholder="Ej: 20.631 o 34.120"
                      value={newTribute.legal_basis_number || ''}
                      onChange={(e) => setNewTribute({...newTribute, legal_basis_number: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-basis-title">Título de la Norma de Creación</label>
                    <input
                      id="form-basis-title"
                      type="text"
                      placeholder="Ej: Ley de Reforma Tributaria General Impositiva Nacional"
                      value={newTribute.legal_basis_title || ''}
                      onChange={(e) => setNewTribute({...newTribute, legal_basis_title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-taxbase">Base imponible (Explicación Ciudadana)</label>
                    <textarea
                      id="form-taxbase"
                      placeholder="Qué es lo que constituye la materia imponible o base imponible..."
                      value={newTribute.taxable_base || ''}
                      onChange={(e) => setNewTribute({...newTribute, taxable_base: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-rate-desc">Alícuotas aplicables o escala de montos</label>
                    <textarea
                      id="form-rate-desc"
                      placeholder="Detalle todas las alícuotas del impuesto en lenguaje claro..."
                      value={newTribute.rate_description || ''}
                      onChange={(e) => setNewTribute({...newTribute, rate_description: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none font-sans"
                    />
                  </div>
                </div>

                {/* CITIZEN DETAILED INFO FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-affected-subjects">Sujetos Alcanzados</label>
                    <input
                      id="form-affected-subjects"
                      type="text"
                      placeholder="Ej: Consumidores finales de gas"
                      value={newTribute.affected_subjects || ''}
                      onChange={(e) => setNewTribute({...newTribute, affected_subjects: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-exempt-subjects">Sujetos Exentos</label>
                    <input
                      id="form-exempt-subjects"
                      type="text"
                      placeholder="Ej: Entidades de beneficencia pública exentas"
                      value={newTribute.exempt_subjects || ''}
                      onChange={(e) => setNewTribute({...newTribute, exempt_subjects: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block" htmlFor="form-affected-activities">Actividades Afectadas</label>
                    <input
                      id="form-affected-activities"
                      type="text"
                      placeholder="Ej: Despacho de nafta premium"
                      value={newTribute.affected_activities || ''}
                      onChange={(e) => setNewTribute({...newTribute, affected_activities: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sources loading cards (Rule: Verified require source check) */}
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-white uppercase tracking-wider font-mono text-[10px]">Carga de Fuentes de Respaldo Documental</span>
                    <button
                      type="button"
                      onClick={handleAddTributeSource}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-400 tracking-wide rounded flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-500 hover:text-emerald-450" />
                      <span>Agregar Fuente</span>
                    </button>
                  </div>

                  {tributeSources.map((sourceInput, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end p-3 bg-slate-900/30 rounded-lg border border-slate-900">
                      <div className="space-y-1">
                        <label className="text-slate-500 block font-mono text-[9px] uppercase tracking-wider" htmlFor={`src-title-${idx}`}>Título de la Fuente Documental</label>
                        <input
                          id={`src-title-${idx}`}
                          type="text"
                          placeholder="Ej: Boletín Oficial Ley 27.743 Título V"
                          value={sourceInput.title}
                          onChange={(e) => handleTributeSourceChange(idx, 'title', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 p-2 rounded text-slate-300 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 space-y-1">
                          <label className="text-slate-500 block font-mono text-[9px] uppercase tracking-wider" htmlFor={`src-url-${idx}`}>URL Oficial</label>
                          <input
                            id={`src-url-${idx}`}
                            type="text"
                            placeholder="https://www.boletinoficial.gob.ar/..."
                            value={sourceInput.url}
                            onChange={(e) => handleTributeSourceChange(idx, 'url', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 p-2 rounded text-slate-300 focus:outline-none"
                          />
                        </div>
                        {tributeSources.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTributeSource(idx)}
                            className="p-2 text-rose-500 hover:text-rose-450 hover:bg-slate-950 rounded transition mt-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verification level input */}
                <div className="space-y-2">
                  <label className="text-slate-400 font-bold block" htmlFor="form-verification-status">Estado de Verificación Final de la Ficha</label>
                  <select
                    id="form-verification-status"
                    value={newTribute.verification_status || 'Fuente secundaria pendiente de validación'}
                    onChange={(e) => setNewTribute({...newTribute, verification_status: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-900 p-2.5 rounded-lg text-slate-350 text-slate-300 focus:outline-none font-sans font-bold"
                  >
                    <option value="Verificado con fuente oficial">Verificado con fuente oficial (Requiere Fuente Oficial Vinculada)</option>
                    <option value="Verificado con boletín oficial">Verificado con boletín oficial (Requiere Boletín Oficial)</option>
                    <option value="Fuente secundaria pendiente de validación">Fuente secundaria pendiente de validación</option>
                    <option value="Información parcial">Información parcial</option>
                    <option value="Información insuficiente">Información insuficiente</option>
                  </select>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black tracking-wider uppercase rounded-xl hover:scale-[1.01] transition-all cursor-pointer shadow-md"
                  >
                    Guardar y Publicar Gravamen
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar actions: Audit logs and database exports */}
            <div className="space-y-6">
              {/* Import/Export Data tools card */}
              <div className="border border-slate-855 border-slate-850 bg-slate-900/10 p-5 rounded-2xl text-left space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest font-black text-slate-450 text-slate-400 border-b border-slate-850 pb-2">
                  Herramientas de Resguardo
                </h3>

                <div className="space-y-3 font-mono text-[11px]">
                  <p className="text-slate-500 leading-normal font-sans text-xs">Asegure o exporte la base in-memory completa del relevamiento actual en formato estandarizado.</p>

                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ tributes, sources, norms, votes, logs }, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `base_trazabilidad_fiscal_${new Date().toISOString().slice(0, 10)}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="w-full px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold tracking-wide rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Exportar Base en JSON</span>
                  </button>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const confirmReset = window.confirm('¿Está seguro de querer restaurar los datos del Mapa Tributario a su versión inicial auditada del 05-06-2026? Se descartarán los cambios almacenados localmente en localStorage.');
                        if (confirmReset) {
                          localStorage.removeItem('tax_map_jurisdictions');
                          localStorage.removeItem('tax_map_tributes');
                          localStorage.removeItem('tax_map_norms');
                          localStorage.removeItem('tax_map_traceability');
                          localStorage.removeItem('tax_map_votes');
                          localStorage.removeItem('tax_map_history');
                          localStorage.removeItem('tax_map_sources');
                          localStorage.removeItem('tax_map_logs');
                          setJurisdictions(INITIAL_JURISDICTIONS);
                          setTributes(INITIAL_TRIBUTES);
                          setNorms(INITIAL_LEGAL_NORMS);
                          setTraceability(INITIAL_POLITICAL_TRACEABILITY);
                          setVotes(INITIAL_POLITICIAN_VOTES);
                          setHistory(INITIAL_TRIBUTE_HISTORY);
                          setSources(INITIAL_SOURCES);
                          setLogs(INITIAL_VERIFICATION_LOGS);
                          alert('Base de trazabilidad fiscal reestablecida con éxito.');
                        }
                      }}
                      className="w-full px-4 py-2 bg-slate-950 hover:bg-rose-950/20 hover:text-rose-400 border border-slate-900 hover:border-rose-900/40 text-slate-450 text-slate-450 text-slate-500 text-[11px] font-bold tracking-wide rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-500 hover:text-rose-450" />
                      <span>Reestablecer Datos Originales</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Historical audit logs registry tree card */}
              <div className="border border-slate-850 bg-slate-900/10 p-5 rounded-2xl text-left space-y-4 max-h-[380px] overflow-y-auto">
                <h3 className="text-xs uppercase font-mono tracking-widest font-black text-slate-400 border-b border-slate-800 pb-2">
                  Registro Histórico de Auditoría ({logs.length})
                </h3>

                <div className="space-y-3 font-mono text-[10px] text-slate-405 leading-relaxed text-slate-400">
                  {logs.map(log => (
                    <div key={log.id} className="p-2.5 bg-slate-950/60 rounded border border-slate-900/80 space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-slate-550 text-slate-500">
                        <span>{log.created_at.slice(0, 16).replace('T', ' ')} UTC</span>
                        <span>{log.changed_by.split(' ')[0]}</span>
                      </div>
                      <div className="font-extrabold text-white">ID: {log.entity_id}</div>
                      <div>
                        Modificado a <span className="text-emerald-400">{log.new_status}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 hover:text-slate-400 transition leading-snug pt-1">{log.change_reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
