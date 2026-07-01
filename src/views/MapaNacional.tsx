/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Landmark, DollarSign, Users, ShieldAlert, ArrowRight, TrendingDown, BookOpen, AlertCircle, Eye, Grid } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { TRIBUTOS } from '../data/tributos';
import { Jurisdiction, Tributo } from '../types';
import EvidenceBadge from '../components/EvidenceBadge';

// Leaflet imports
import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip, useMap, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface HeatPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  burdenScore: number; // 0 to 10 scale
  burdenLabel: string; // e.g. "Extrema", "Alta", "Media", "Baja"
  compositeTaxBurden: string; // descriptive percentage
  color: string; // bordeaux red gradient
  description: string;
}

// Coordinate mapping database for all detailed Buenos Aires and AMBA Municipalities
const MUNICIPALITY_COORDS: Record<string, { lat: number; lng: number }> = {
  la_matanza: { lat: -34.75, lng: -58.62 },
  vicente_lopez: { lat: -34.52, lng: -58.49 },
  san_isidro: { lat: -34.47, lng: -58.53 },
  san_fernando: { lat: -34.44, lng: -58.58 },
  tigre: { lat: -34.41, lng: -58.63 },
  pilar: { lat: -34.46, lng: -58.91 },
  san_martin: { lat: -34.57, lng: -58.54 },
  avellaneda: { lat: -34.66, lng: -58.37 },
  lanus: { lat: -34.71, lng: -58.39 },
  quilmes: { lat: -34.72, lng: -58.27 },
  lomas_de_zamora: { lat: -34.76, lng: -58.40 },
  almirante_brown: { lat: -34.80, lng: -58.39 },
  berazategui: { lat: -34.76, lng: -58.21 },
  florencio_varela: { lat: -34.80, lng: -58.28 },
  moron: { lat: -34.65, lng: -58.62 },
  tres_de_febrero: { lat: -34.61, lng: -58.56 },
  ituzingo: { lat: -34.66, lng: -58.67 },
  hurlingham: { lat: -34.59, lng: -58.63 },
  merlo: { lat: -34.67, lng: -58.73 },
  moreno: { lat: -34.65, lng: -58.79 },
  san_miguel: { lat: -34.54, lng: -58.71 },
  jose_c_paz: { lat: -34.52, lng: -58.77 },
  malvinas_argentinas: { lat: -34.50, lng: -58.69 },
  la_plata: { lat: -34.92, lng: -57.95 },
  mar_del_plata: { lat: -38.01, lng: -57.54 },
  bahia_blanca: { lat: -38.72, lng: -62.27 },
  tandil: { lat: -37.32, lng: -59.13 },
  san_nicolas: { lat: -33.33, lng: -60.21 },
  junin: { lat: -34.58, lng: -60.94 }
};

// Polygons representing the visual silhouettes of all 24 Argentine jurisdictions
const PROVINCE_POLYGONS: Record<string, [number, number][]> = {
  pba: [
    [-33.25, -60.3], [-34.3, -58.5], [-34.9, -57.9], [-35.7, -57.3], [-36.3, -56.7], 
    [-37.5, -57.1], [-38.1, -57.5], [-38.9, -60.1], [-39.0, -62.1], [-41.0, -62.8], 
    [-41.0, -63.0], [-39.0, -63.3], [-35.0, -63.3], [-34.2, -63.4], [-34.2, -61.0], 
    [-33.25, -60.3]
  ],
  caba: [
    [-34.53, -58.48], [-34.53, -58.37], [-34.63, -58.35], [-34.67, -58.41], 
    [-34.70, -58.53], [-34.64, -58.53]
  ],
  tucuman: [
    [-26.2, -65.2], [-26.5, -64.5], [-27.5, -64.5], [-28.0, -65.2], 
    [-27.3, -66.1], [-26.3, -66.0]
  ],
  misiones: [
    [-27.3, -55.9], [-26.2, -55.8], [-25.5, -54.6], [-25.6, -53.6], 
    [-26.4, -53.6], [-27.4, -54.3], [-28.2, -55.6], [-28.1, -55.7]
  ],
  cordoba: [
    [-29.6, -65.1], [-29.6, -64.4], [-30.0, -62.5], [-31.5, -62.1], 
    [-34.4, -62.5], [-35.0, -63.1], [-35.0, -65.0], [-31.8, -65.0], 
    [-31.8, -65.3], [-29.6, -65.4]
  ],
  santa_fe: [
    [-28.0, -59.0], [-29.0, -59.6], [-31.5, -60.2], [-32.5, -60.7], 
    [-33.3, -60.2], [-34.2, -61.0], [-34.4, -62.5], [-31.5, -62.1], 
    [-30.0, -61.8], [-28.0, -61.8]
  ],
  entre_rios: [
    [-30.1, -59.6], [-30.1, -57.6], [-31.3, -58.0], [-32.4, -58.1], 
    [-33.2, -58.4], [-34.0, -58.7], [-34.2, -58.7], [-32.8, -60.6], 
    [-31.8, -60.7], [-31.1, -59.9]
  ],
  rio_negro: [
    [-37.5, -68.0], [-38.4, -63.3], [-38.4, -62.8], [-41.0, -62.8], 
    [-41.5, -64.8], [-42.0, -65.0], [-42.0, -71.5], [-41.0, -71.8]
  ],
  salta: [
    [-22.0, -64.5], [-22.0, -62.4], [-24.0, -62.4], [-25.5, -64.3], 
    [-26.0, -64.8], [-26.3, -66.5], [-25.2, -68.4], [-24.2, -67.2], 
    [-24.0, -66.8], [-22.5, -66.1]
  ],
  neuquen: [
    [-36.0, -70.5], [-37.5, -68.0], [-41.0, -71.8], [-39.0, -71.4], 
    [-36.8, -70.8]
  ],
  la_pampa: [
    [-35.0, -68.0], [-35.0, -65.0], [-35.0, -63.3], [-39.0, -63.3], 
    [-39.0, -68.0]
  ],
  mendoza: [
    [-32.1, -68.5], [-32.1, -67.1], [-34.0, -67.1], [-36.0, -67.1], 
    [-36.2, -69.8], [-35.3, -70.4], [-32.8, -70.3]
  ],
  chubut: [
    [-42.0, -71.5], [-42.0, -65.0], [-42.2, -64.0], [-43.5, -65.0], 
    [-46.0, -66.0], [-46.0, -72.0], [-42.0, -71.8]
  ],
  san_juan: [
    [-28.4, -69.8], [-30.0, -67.5], [-32.0, -67.0], [-32.5, -68.5], 
    [-32.5, -70.3], [-30.2, -70.3]
  ],
  jujuy: [
    [-21.8, -65.6], [-22.1, -65.2], [-22.5, -65.1], [-23.8, -64.6], 
    [-24.3, -65.3], [-24.2, -67.1], [-22.5, -66.9]
  ],
  santa_cruz: [
    [-46.0, -72.0], [-46.0, -66.0], [-47.8, -65.5], [-50.0, -68.0], 
    [-52.2, -68.0], [-52.2, -72.3], [-50.0, -72.5]
  ],
  san_luis: [
    [-31.8, -66.8], [-31.8, -65.0], [-35.0, -65.0], [-36.0, -65.0], 
    [-36.0, -66.8], [-34.0, -66.8]
  ],
  catamarca: [
    [-25.2, -68.4], [-25.5, -67.8], [-26.3, -66.1], [-27.5, -65.1], 
    [-30.0, -65.4], [-30.0, -66.5], [-28.4, -69.2], [-27.3, -69.2]
  ],
  la_rioja: [
    [-28.0, -69.3], [-28.0, -65.7], [-30.0, -65.5], [-31.6, -66.1], 
    [-31.5, -69.3]
  ],
  chaco: [
    [-24.0, -62.3], [-24.0, -61.5], [-25.5, -59.5], [-26.8, -58.5], 
    [-27.4, -58.8], [-28.0, -59.0], [-28.0, -61.5], [-28.0, -61.8]
  ],
  corrientes: [
    [-27.3, -58.6], [-27.2, -57.5], [-27.5, -55.9], [-28.1, -55.7], 
    [-28.2, -55.6], [-30.1, -57.6], [-30.1, -59.6], [-29.5, -59.7], 
    [-28.4, -59.0], [-27.5, -58.8]
  ],
  santiago_estero: [
    [-25.5, -64.3], [-25.5, -61.7], [-28.0, -61.7], [-30.0, -61.7], 
    [-30.0, -62.5], [-30.0, -65.0], [-27.5, -65.1], [-26.0, -64.3]
  ],
  formosa: [
    [-22.3, -62.4], [-23.8, -60.5], [-25.2, -57.7], [-25.5, -57.6], 
    [-26.3, -58.4], [-26.8, -58.5], [-25.5, -59.5], [-24.0, -62.0]
  ],
  tierra_fuego: [
    [-52.5, -68.6], [-52.5, -65.0], [-55.0, -63.8], [-55.0, -68.6]
  ]
};

// Coordinate database mapping Argentine provinces with beautiful distinct RGB colors
const HEAT_POINTS: HeatPoint[] = [
  {
    id: 'pba',
    name: 'Provincia de Buenos Aires',
    lat: -36.6,
    lng: -60.5,
    burdenScore: 9.8,
    burdenLabel: 'Crítica / Extrema',
    compositeTaxBurden: '9.8%',
    color: '#0284c7', // Sky Blue
    description: 'Elevada alícuota en Ingresos Brutos (promedio superior al 4.5% en eslabones comerciales) sumada a tasas de seguridad e higiene municipales duplicadas.'
  },
  {
    id: 'tucuman',
    name: 'Tucumán',
    lat: -26.9,
    lng: -65.3,
    burdenScore: 9.2,
    burdenLabel: 'Crítica / Muy Alta',
    compositeTaxBurden: '9.2%',
    color: '#e11d48', // Rose Red
    description: 'Mantiene regímenes de retención y percepción agresivos sobre compras de no residentes y un alto nivel de tasas municipales generales.'
  },
  {
    id: 'misiones',
    name: 'Misiones',
    lat: -26.8,
    lng: -54.6,
    burdenScore: 9.0,
    burdenLabel: 'Muy Alta',
    compositeTaxBurden: '9.0%',
    color: '#ec4899', // Bright Pink
    description: 'La aduana interna "puesto El Centinela" cobra retenciones adelantadas sobre todo insumo físico o mercadería de consumo que entra a la provincia.'
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    lat: -31.9,
    lng: -63.8,
    burdenScore: 8.5,
    burdenLabel: 'Alta',
    compositeTaxBurden: '8.5%',
    color: '#f59e0b', // Amber
    description: 'Posee tributación simplificada en Monotributo, pero mantiene tasas altas en Ingresos Brutos sobre intermediación y un extendido Impuesto de Sellos.'
  },
  {
    id: 'caba',
    name: 'CABA',
    lat: -34.6,
    lng: -58.4,
    burdenScore: 8.2,
    burdenLabel: 'Alta',
    compositeTaxBurden: '8.2%',
    color: '#8b5cf6', // Violet
    description: 'Elevada tributación propia concentrada vía AGIP en el sector servicios, financiero e inmobiliario comercial, paliada por una ágil gestión digital.'
  },
  {
    id: 'santa_fe',
    name: 'Santa Fe',
    lat: -31.4,
    lng: -61.0,
    burdenScore: 7.2,
    burdenLabel: 'Media-Alta',
    compositeTaxBurden: '7.2%',
    color: '#10b981', // Emerald Green
    description: 'Alícuotas impositivas intermedias en actividades industriales. Exenciones viales primarias pecuarias, pero fricción alta en comercio minorista por la API.'
  },
  {
    id: 'entre_rios',
    name: 'Entre Ríos',
    lat: -31.9,
    lng: -59.3,
    burdenScore: 7.0,
    burdenLabel: 'Media-Alta',
    compositeTaxBurden: '7.0%',
    color: '#06b6d4', // Cyan
    description: 'Presión patente, sellos de contratos y tasas municipales adicionales que gravan directamente consumos esenciales de servicios y energía.'
  },
  {
    id: 'rio_negro',
    name: 'Río Negro',
    lat: -40.3,
    lng: -67.2,
    burdenScore: 6.9,
    burdenLabel: 'Media',
    compositeTaxBurden: '6.9%',
    color: '#0ea5e9', // Light Blue Leaning Cyan
    description: 'Presión fiscal de nivel nacional promedio. Regulaciones específicas viales y aduaneras menores matizadas por fomento ganadero y frutícola.'
  },
  {
    id: 'salta',
    name: 'Salta',
    lat: -24.8,
    lng: -64.4,
    burdenScore: 6.8,
    burdenLabel: 'Media',
    compositeTaxBurden: '6.8%',
    color: '#6366f1', // Indigo
    description: 'Alícuotas generales en rango medio. Gravámenes sobre minería mediante regalías locales compensados con incentivos comerciales específicos.'
  },
  {
    id: 'neuquen',
    name: 'Neuquén',
    lat: -38.6,
    lng: -69.8,
    burdenScore: 6.5,
    burdenLabel: 'Media',
    compositeTaxBurden: '6.5%',
    color: '#14b8a6', // Teal
    description: 'Fuertes ingresos vía regalías por gas y petróleo que alivian la tributación directa comercial, aunque las tasas de servicios municipales escalaron.'
  },
  {
    id: 'la_pampa',
    name: 'La Pampa',
    lat: -36.8,
    lng: -64.8,
    burdenScore: 6.2,
    burdenLabel: 'Media',
    compositeTaxBurden: '6.2%',
    color: '#f97316', // Orange
    description: 'Impuestos de sellos equilibrados e Ingresos Brutos agropecuarios estables en el agro primario, con controles sobre depósitos bancarios locales.'
  },
  {
    id: 'mendoza',
    name: 'Mendoza',
    lat: -34.6,
    lng: -68.4,
    burdenScore: 5.8,
    burdenLabel: 'Media-Baja',
    compositeTaxBurden: '5.8%',
    color: '#a855f7', // Purple
    description: 'Política sostenida de reducción gradual de alícuotas del impuesto sobre los ingresos brutos, combinada con incentivos de devolución de capital.'
  },
  {
    id: 'chubut',
    name: 'Chubut',
    lat: -43.8,
    lng: -68.5,
    burdenScore: 5.5,
    burdenLabel: 'Media-Baja',
    compositeTaxBurden: '5.5%',
    color: '#3b82f6', // Bright Blue
    description: 'Régimen patagónico con incentivos industriales y alícuotas de baja densidad relativa para proteger las economías regionales pesqueras e industriales.'
  },
  {
    id: 'san_juan',
    name: 'San Juan',
    lat: -30.9,
    lng: -68.9,
    burdenScore: 5.4,
    burdenLabel: 'Media-Baja',
    compositeTaxBurden: '5.4%',
    color: '#d946ef', // Fuchsia
    description: 'Focos de fomento a la vitivinicultura y minería con rebaja en sellos inmobiliarios rurales, sosteniendo tasas comunales estables.'
  },
  {
    id: 'jujuy',
    name: 'Jujuy',
    lat: -23.1,
    lng: -65.3,
    burdenScore: 5.2,
    burdenLabel: 'Media-Baja',
    compositeTaxBurden: '5.2%',
    color: '#f43f5e', // Crimson Rose
    description: 'Zonas francas e incentivos para energías renovables y minería de litio que reducen la carga fiscal efectiva del sector primario regional.'
  },
  {
    id: 'santa_cruz',
    name: 'Santa Cruz',
    lat: -48.8,
    lng: -70.0,
    burdenScore: 5.1,
    burdenLabel: 'Media-Baja',
    compositeTaxBurden: '5.1%',
    color: '#2563eb', // Indigo Blue
    description: 'Estructura tributaria con regalías mineras e hidrocarburíferas directas significativamente altas, reduciendo la fricción impositiva en pequeños comercios.'
  },
  {
    id: 'san_luis',
    name: 'San Luis',
    lat: -33.7,
    lng: -66.0,
    burdenScore: 4.9,
    burdenLabel: 'Baja-Moderada',
    compositeTaxBurden: '4.9%',
    color: '#84cc16', // Lime Green
    description: 'Herencia de promoción industrial que deviene en una administración ágil de Ingresos Brutos simplificados y un cobro unificado de tasas.'
  },
  {
    id: 'catamarca',
    name: 'Catamarca',
    lat: -27.3,
    lng: -66.9,
    burdenScore: 3.8,
    burdenLabel: 'Baja',
    compositeTaxBurden: '3.8%',
    color: '#eab308', // Yellow
    description: 'Baja presión impositiva local dado su alto grado de asignación del presupuesto nacional mediante transferencias de coparticipación directa.'
  },
  {
    id: 'la_rioja',
    name: 'La Rioja',
    lat: -29.6,
    lng: -67.4,
    burdenScore: 4.2,
    burdenLabel: 'Baja',
    compositeTaxBurden: '4.2%',
    color: '#fbbf24', // Gold
    description: 'Dependencia crítica del fondo de coparticipación nacional. Tasas locales enfocadas marginalmente sobre el sector olivícola y energético.'
  },
  {
    id: 'chaco',
    name: 'Chaco',
    lat: -26.3,
    lng: -60.8,
    burdenScore: 4.1,
    burdenLabel: 'Baja',
    compositeTaxBurden: '4.1%',
    color: '#22c55e', // Grass Green
    description: 'Financiamiento local en más de un 90% de aportes federales. Baja imposición directa sobre producción algodonera, forestal y agropecuaria.'
  },
  {
    id: 'corrientes',
    name: 'Corrientes',
    lat: -28.4,
    lng: -57.8,
    burdenScore: 4.0,
    burdenLabel: 'Baja',
    compositeTaxBurden: '4.0%',
    color: '#10b981', // Forest Green
    description: 'Firme exención a la cadena foresto-industrial y ganadera directa en un intento provincial de ofrecer competitividad a inversiones regionales.'
  },
  {
    id: 'santiago_estero',
    name: 'Santiago del Estero',
    lat: -27.7,
    lng: -64.2,
    burdenScore: 3.5,
    burdenLabel: 'Baja / Amortiguada',
    compositeTaxBurden: '3.5%',
    color: '#f97316', // Burnt Orange
    description: 'Máximo nivel de coparticipación en el NOA (93%). Recaudación propia muy atomizada con bajísima presión impositiva real para comercios comunes.'
  },
  {
    id: 'formosa',
    name: 'Formosa',
    lat: -24.8,
    lng: -59.9,
    burdenScore: 3.2,
    burdenLabel: 'Baja / Amortiguada',
    compositeTaxBurden: '3.2%',
    color: '#ea580c', // Bright Orange-Red
    description: 'Estructura tributaria local prácticamente simbólica, sustentándose financieramente en aportes directos del Tesoro Federal y subsidios.'
  },
  {
    id: 'tierra_fuego',
    name: 'Tierra del Fuego',
    lat: -54.1,
    lng: -67.9,
    burdenScore: 2.8,
    burdenLabel: 'Baja / Régimen Exento',
    compositeTaxBurden: '2.8%',
    color: '#38bdf8', // Ice Blue
    description: 'Gozan de exenciones impositivas masivas mediante la ley nacional de promoción 19.640, deprimiendo la carga mercantil de radicación.'
  }
];

interface MapaNacionalProps {
  onNavigate: (tab: string, param?: string) => void;
  selectedJurisdictionId?: string;
  setSelectedJurisdictionId: (id: string | undefined) => void;
}

// MapResizeTrigger ensures Leaflet handles size realignment when maps are switched in dynamic tabs
function MapResizeTrigger() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// MapController changes the map's viewport dynamically based on selection
function MapController({ selectedId, pbaFocus }: { selectedId: string | undefined; pbaFocus: 'pba' | 'amba' }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    
    const isMun = MUNICIPALITY_COORDS[selectedId];
    
    if (selectedId === 'pba') {
      if (pbaFocus === 'amba') {
        map.setView([-34.64, -58.55], 9, { animate: true });
      } else {
        map.setView([-36.6, -60.5], 6, { animate: true });
      }
    } else if (isMun) {
      map.setView([isMun.lat, isMun.lng], 10, { animate: true });
    } else if (selectedId === 'caba') {
      map.setView([-34.6037, -58.3816], 11, { animate: true });
    } else if (selectedId === 'nacion') {
      map.setView([-38.4161, -63.6167], 4, { animate: true });
    } else {
      const hp = HEAT_POINTS.find(p => p.id === selectedId);
      if (hp) {
        map.setView([hp.lat, hp.lng], 6, { animate: true });
      }
    }
  }, [selectedId, pbaFocus, map]);
  return null;
}

export default function MapaNacional({ onNavigate, selectedJurisdictionId, setSelectedJurisdictionId }: MapaNacionalProps) {
  const [mapView, setMapView] = useState<'leaflet' | 'schematic'>('leaflet');
  const [minBurdenFilter, setMinBurdenFilter] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pbaFocus, setPbaFocus] = useState<'pba' | 'amba'>('amba');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);
  
  // Find currently selected jurisdiction
  const selectedJuris = JURISDICTIONS.find(j => j.id === (selectedJurisdictionId || 'nacion'));

  // Get children (if province, find municipalities; if nation, find provinces)
  const childJurisdictions = JURISDICTIONS.filter(j => {
    if (selectedJuris?.level === 'nation') {
      return j.level === 'province' || j.level === 'city_autonoma';
    }
    if (selectedJuris?.level === 'province' || selectedJuris?.level === 'city_autonoma') {
      return j.parentId === selectedJuris.id && j.level === 'municipality';
    }
    return false;
  });

  // Get active taxes for this jurisdiction with high-fidelity synthesis for municipalities
  const activeTaxes = (() => {
    const base = TRIBUTOS.filter(t => t.jurisdictionId === selectedJuris?.id);
    if (base.length > 0 || !selectedJuris || selectedJuris.level !== 'municipality') {
      return base;
    }
    
    const munName = selectedJuris.name.replace(' (Capital)', '');
    
    const syntheticTaxes: Tributo[] = [
      {
        id: `tish_${selectedJuris.id}`,
        name: `Tasa por Inspección de Seguridad e Higiene (TISH - ${munName})`,
        type: 'tasa',
        jurisdictionId: selectedJuris.id,
        level: 'Municipio',
        authorityCobradora: `Dirección de Rentas de ${munName}`,
        normaCreacion: `Ordenanza Fiscal Impositiva de ${munName}`,
        fechaCreacion: '2004-12-15',
        propuestoPor: 'Poder Ejecutivo Municipal',
        propuestoPorPartido: selectedJuris.authorityParty,
        aprobadoPor: `Concejo Deliberante de ${munName}`,
        promulgadoPor: `${selectedJuris.authorityName} (Intendente)`,
        ejecutadoPor: `Secretaría de Economía y Hacienda de ${munName}`,
        status: 'vigente',
        sourceUrl: `https://www.${selectedJuris.id}.gov.ar`,
        lastVerified: '2026-05-20',
        evidenceLevel: 'C',
        isBaseDemo: true
      },
      {
        id: `abl_${selectedJuris.id}`,
        name: selectedJuris.id === 'san_isidro' || selectedJuris.id === 'vicente_lopez'
          ? `Tasa de Alumbrado, Limpieza y Conservación de la Vía Pública (ALC - ${munName})`
          : `Tasa por Servicios Generales (TSG / ABL - ${munName})`,
        type: 'tasa',
        jurisdictionId: selectedJuris.id,
        level: 'Municipio',
        authorityCobradora: `Dirección de Rentas de ${munName}`,
        normaCreacion: `Ordenanza Impositiva Municipal de ${munName}`,
        fechaCreacion: '1999-11-10',
        propuestoPor: 'Poder Ejecutivo Local',
        propuestoPorPartido: selectedJuris.authorityParty,
        aprobadoPor: `Concejo Deliberante de ${munName}`,
        promulgadoPor: `${selectedJuris.authorityName} (Intendente)`,
        ejecutadoPor: `Dirección General de Ingresos Públicos de ${munName}`,
        status: 'vigente',
        sourceUrl: `https://www.${selectedJuris.id}.gov.ar`,
        lastVerified: '2026-05-18',
        evidenceLevel: 'C',
        isBaseDemo: true
      }
    ];

    // Add extra specific taxes to make it extremely detailed for certain cities!
    if (['vicente_lopez', 'mar_del_plata', 'san_fernando', 'tigre', 'pilar', 'san_isidro'].includes(selectedJuris.id)) {
      syntheticTaxes.push({
        id: `tasa_publicidad_${selectedJuris.id}`,
        name: `Derechos de Publicidad y Propaganda (${munName})`,
        type: 'derecho',
        jurisdictionId: selectedJuris.id,
        level: 'Municipio',
        authorityCobradora: `Dirección General de Inspección de Comercio`,
        normaCreacion: `Código Tributario de ${munName}`,
        fechaCreacion: '2011-04-05',
        propuestoPor: 'Bloque Justicialista o Cambiemos Municipal',
        propuestoPorPartido: 'Local',
        aprobadoPor: 'Concejo Deliberante',
        promulgadoPor: 'Intendente Municipal',
        ejecutadoPor: `Rentas Municipales ${munName}`,
        status: 'vigente',
        sourceUrl: `https://www.${selectedJuris.id}.gov.ar`,
        lastVerified: '2026-05-15',
        evidenceLevel: 'C',
        isBaseDemo: true
      });
    }

    if (['san_fernando', 'tigre'].includes(selectedJuris.id)) {
      syntheticTaxes.push({
        id: `tasa_islas_${selectedJuris.id}`,
        name: `Tasa Especial por Servicios de Embarque y Conservación del Delta (${munName})`,
        type: 'tasa',
        jurisdictionId: selectedJuris.id,
        level: 'Municipio',
        authorityCobradora: `Dirección de Transporte Náutico y Rentas`,
        normaCreacion: `Ordenanza Especial Delta N° 4514`,
        fechaCreacion: '2015-08-10',
        propuestoPor: 'Gabinete Municipal',
        propuestoPorPartido: 'UP',
        aprobadoPor: 'Concejo Deliberante',
        promulgadoPor: 'Intendente de turno',
        ejecutadoPor: `Dirección de Islas de ${munName}`,
        status: 'vigente',
        sourceUrl: `https://www.${selectedJuris.id}.gov.ar`,
        lastVerified: '2026-05-22',
        evidenceLevel: 'C',
        isBaseDemo: true
      });
    }

    return syntheticTaxes;
  })();

  // Provinces database for the SVG schematic layout
  const PROVINCE_GRID = [
    { id: 'jujuy', name: 'Jujuy', gridPos: 'col-start-2 row-start-1', status: 'mock' },
    { id: 'salta', name: 'Salta', gridPos: 'col-start-3 row-start-1', status: 'mock' },
    { id: 'formosa', name: 'Formosa', gridPos: 'col-start-4 row-start-1', status: 'mock' },
    
    { id: 'tucuman', name: 'Tucumán', gridPos: 'col-start-2 row-start-2', status: 'mock' },
    { id: 'santiago_estero', name: 'Santiago del Estero', gridPos: 'col-start-3 row-start-2', status: 'verified', badge: 'Verificada' },
    { id: 'chaco', name: 'Chaco', gridPos: 'col-start-4 row-start-2', status: 'mock' },
    { id: 'misiones', name: 'Misiones', gridPos: 'col-start-5 row-start-2', status: 'mock' },
    
    { id: 'catamarca', name: 'Catamarca', gridPos: 'col-start-1 row-start-3', status: 'mock' },
    { id: 'la_rioja', name: 'La Rioja', gridPos: 'col-start-2 row-start-3', status: 'mock' },
    { id: 'cordoba', name: 'Córdoba', gridPos: 'col-start-3 row-start-3', status: 'verified', badge: 'Verificada' },
    { id: 'santa_fe', name: 'Santa Fe', gridPos: 'col-start-4 row-start-3', status: 'verified', badge: 'Verificada' },
    { id: 'corrientes', name: 'Corrientes', gridPos: 'col-start-5 row-start-3', status: 'mock' },
    
    { id: 'san_juan', name: 'San Juan', gridPos: 'col-start-1 row-start-4', status: 'mock' },
    { id: 'san_luis', name: 'San Luis', gridPos: 'col-start-2 row-start-4', status: 'mock' },
    { id: 'pba', name: 'PBA (Buenos Aires)', gridPos: 'col-start-3 row-start-4', status: 'verified', badge: 'Verificada' },
    { id: 'caba', name: 'CABA', gridPos: 'col-start-4 row-start-4', status: 'verified', badge: 'Cdad Autónoma' },
    { id: 'entre_rios', name: 'Entre Ríos', gridPos: 'col-start-5 row-start-4', status: 'mock' },
    
    { id: 'mendoza', name: 'Mendoza', gridPos: 'col-start-1 row-start-5', status: 'mock' },
    { id: 'la_pampa', name: 'La Pampa', gridPos: 'col-start-2 row-start-5', status: 'mock' },
    { id: 'neuquen', name: 'Neuquén', gridPos: 'col-start-2 row-start-6', status: 'mock' },
    { id: 'rio_negro', name: 'Río Negro', gridPos: 'col-start-3 row-start-6', status: 'mock' },
    
    { id: 'chubut', name: 'Chubut', gridPos: 'col-start-2 row-start-7', status: 'mock' },
    { id: 'santa_cruz', name: 'Santa Cruz', gridPos: 'col-start-2 row-start-8', status: 'mock' },
    { id: 'tierra_fuego', name: 'Tierra del Fuego', gridPos: 'col-start-3 row-start-9', status: 'mock' }
  ];

  const handleSelectJurisdiction = (id: string, customName?: string) => {
    const found = JURISDICTIONS.find(j => j.id === id);
    if (found) {
      setSelectedJurisdictionId(id);
    } else {
      const gridName = PROVINCE_GRID.find(p => p.id === id)?.name;
      const heatPoint = HEAT_POINTS.find(p => p.id === id);
      const name = customName || heatPoint?.name || gridName || id;

      const tempJuris: Jurisdiction = {
        id: id,
        name: name.startsWith('Provincia de') || name === 'CABA' ? name : `Provincia de ${name}`,
        level: id === 'caba' ? 'city_autonoma' : 'province',
        authorityName: 'Autoridad local en carga',
        authorityParty: 'Alianza o Partido Local',
        authorityPeriod: '2023 - 2027',
        budgetAvailable: undefined,
        debtAmount: undefined,
        publicEmployeesCount: undefined,
        activeTaxesCount: 0,
        sources: heatPoint ? [`Índice de Presión Fiscal: ${heatPoint.compositeTaxBurden}`] : [],
        confidenceLevel: 'D',
        summary: heatPoint?.description || `Ficha provisoria del distrito de ${name}. La carga de ordenanzas tributarias completas está siendo verificada por nuestro equipo de gobernanza ciudadana de manera aséptica.`,
        isBaseDemo: true
      };
      
      setSelectedJurisdictionId(id);
      setToastMessage(`Ficha provisoria cargada con datos de ejemplo para ${name}.`);
      
      const existsInBase = JURISDICTIONS.some(j => j.id === id);
      if (!existsInBase) {
        JURISDICTIONS.push(tempJuris);
      }
    }
  };

  const formatCurrency = (val?: number) => {
    if (!val) return 'Sin dato verificado';
    if (val >= 1000000000000) return `$${(val / 1000000000000).toFixed(2)} Billones`;
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)} MM.`;
    return `$${val.toLocaleString('es-AR')}`;
  };

  const filteredHeatPoints = HEAT_POINTS.filter(p => p.burdenScore >= minBurdenFilter);

  return (
    <div className="space-y-8 py-4 text-left animate-fade-in" id="mapa-nacional-view">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/30 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-sans text-xs text-emerald-300 max-w-sm">
          <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Embedded style tag to turn Leaflet tooltips into beautiful dark themes */}
      <style>{`
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-tooltip.custom-dark-tooltip {
          background: #020617 !important;
          border: 1px solid #1e293b !important;
          border-radius: 0.75rem !important;
          padding: 0 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4) !important;
          color: #f1f5f9 !important;
        }
        .leaflet-tooltip-top.custom-dark-tooltip:before {
          border-top-color: #1e293b !important;
        }
      `}</style>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mapa Nacional de Gobernanza y Tributos</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Navegá de manera interactiva por los distintos niveles del Estado argentino. Hace clic en cualquier jurisdicción 
          para auditar su presupuesto actual, autoridades de gobierno en mandato, deudas oficiales y el registro de tributos locales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAP COLUMN (Left - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
                  <span>Visor Geopolítico de Argentina</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  {mapView === 'leaflet' 
                    ? 'Mapa de calor fiscal: gradiente de naranja (baja fricción) a burdeos (alta presión)' 
                    : 'Esquema interactivo federal con casillas y estados de auditoría rápida'}
                </p>
              </div>

              {/* Toggle tabs and Nations filter */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setMapView('leaflet')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      mapView === 'leaflet'
                        ? 'bg-slate-850 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Termografía Fiscal</span>
                  </button>
                  <button
                    onClick={() => setMapView('schematic')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      mapView === 'schematic'
                        ? 'bg-slate-850 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Grilla</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSelectJurisdiction('nacion')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer grow md:grow-0 ${
                    selectedJurisdictionId === 'nacion'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-white'
                  }`}
                >
                  Nación entera
                </button>
              </div>
            </div>

            {/* LEAFLET INTERACTIVE MAP VIEW */}
            {mapView === 'leaflet' && (
              <div className="space-y-4">
                {/* Heatmap settings */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-850 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Auditar por Grado Impositivo:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setMinBurdenFilter(0)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                          minBurdenFilter === 0
                            ? 'bg-slate-800 text-slate-200 border border-slate-700'
                            : 'text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setMinBurdenFilter(5.0)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                          minBurdenFilter === 5.0
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        Media (≥ 5.0)
                      </button>
                      <button
                        onClick={() => setMinBurdenFilter(8.0)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                          minBurdenFilter === 8.0
                            ? 'bg-red-500/10 text-rose-400 border border-rose-500/25'
                            : 'text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        Alta / Burdeos (≥ 8.0)
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Mostrando <span className="text-white font-bold">{filteredHeatPoints.length}</span> de 24 distritos
                  </div>
                </div>

                {/* Leaflet Container Wrapper */}
                <div style={{ height: '480px' }} className="w-full relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 shadow-inner z-0">
                  
                  {/* Floating Enfoque controls for PBA / conurbano exploration */}
                  {(selectedJurisdictionId === 'pba' || (selectedJuris && selectedJuris.parentId === 'pba') || selectedJurisdictionId === 'caba') && (
                    <div className="absolute top-3 left-3 z-50 bg-slate-950/90 border border-slate-800 p-2 rounded-xl flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                      <span className="text-[10px] font-mono font-bold text-slate-400 px-1 ml-0.5 uppercase">Lente PBA:</span>
                      <button
                        onClick={() => {
                          setPbaFocus('amba');
                          setSelectedJurisdictionId('pba');
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                          pbaFocus === 'amba'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-850'
                        }`}
                      >
                        🔍 Conurbano / AMBA
                      </button>
                      <button
                        onClick={() => {
                          setPbaFocus('pba');
                          setSelectedJurisdictionId('pba');
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                          pbaFocus === 'pba'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-850'
                        }`}
                      >
                        🗺️ Provincia Completa
                      </button>
                    </div>
                  )}

                  <MapContainer 
                    center={[-38.4161, -63.6167]} 
                    zoom={4} 
                    zoomControl={true} 
                    style={{ height: '100%', width: '100%' }}
                    minZoom={3}
                    maxZoom={12}
                  >
                    <MapResizeTrigger />
                    <MapController selectedId={selectedJurisdictionId} pbaFocus={pbaFocus} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {/* Render elegant, solid, splotchy polygons for each province to satisfy paint constraints */}
                    {filteredHeatPoints.map((point) => {
                      const isSelected = selectedJurisdictionId === point.id;
                      const hasPolygon = !!PROVINCE_POLYGONS[point.id];

                      return (
                        <React.Fragment key={point.id}>
                          {hasPolygon ? (
                            <Polygon
                              positions={PROVINCE_POLYGONS[point.id]}
                              pathOptions={{
                                fillColor: point.color,
                                fillOpacity: isSelected ? 0.70 : 0.45,
                                color: isSelected ? '#34d399' : '#1e293b',
                                weight: isSelected ? 3.0 : 1.2,
                              }}
                              eventHandlers={{
                                click: () => {
                                  handleSelectJurisdiction(point.id, point.name);
                                }
                              }}
                            >
                              <Tooltip
                                direction="top"
                                opacity={1.0}
                                className="custom-dark-tooltip"
                                sticky={true}
                              >
                                <div className="p-3 font-sans text-xs space-y-1 my-0.5 text-left" style={{ textShadow: 'none' }}>
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="font-extrabold text-slate-100 text-xs block">{point.name}</span>
                                    <span 
                                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold" 
                                      style={{ backgroundColor: `${point.color}22`, color: point.color, border: `1px solid ${point.color}44` }}
                                    >
                                      Presión: {point.compositeTaxBurden}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    Nivel: <span className="font-bold uppercase" style={{ color: point.color }}>{point.burdenLabel}</span>
                                  </p>
                                  <p className="text-[10px] leading-relaxed text-slate-300 max-w-[215px] whitespace-normal pt-1 border-t border-slate-800/80 mt-1">
                                    {point.description}
                                  </p>
                                  <div className="text-[9px] font-mono text-emerald-400 font-bold pt-1.5 flex items-center justify-between">
                                    <span>Ver datos y tasas locales</span>
                                    <span>→</span>
                                  </div>
                                </div>
                              </Tooltip>
                            </Polygon>
                          ) : (
                            /* Fallback to marker if no polygon is configured */
                            <CircleMarker
                              center={[point.lat, point.lng]}
                              radius={isSelected ? 11 : 8}
                              pathOptions={{
                                fillColor: point.color,
                                color: isSelected ? '#34d399' : '#1e293b',
                                weight: isSelected ? 2.5 : 1.5,
                                fillOpacity: 0.95
                              }}
                              eventHandlers={{
                                click: () => {
                                  handleSelectJurisdiction(point.id, point.name);
                                }
                              }}
                            >
                              <Tooltip
                                direction="top"
                                offset={[0, -10]}
                                opacity={1.0}
                                className="custom-dark-tooltip"
                                sticky={true}
                              >
                                <div className="p-3 font-sans text-xs space-y-1 my-0.5 text-left" style={{ textShadow: 'none' }}>
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="font-extrabold text-slate-100 text-xs block">{point.name}</span>
                                    <span 
                                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold" 
                                      style={{ backgroundColor: `${point.color}22`, color: point.color, border: `1px solid ${point.color}44` }}
                                    >
                                      Burden: {point.compositeTaxBurden}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    Presión: <span className="font-bold uppercase" style={{ color: point.color }}>{point.burdenLabel}</span>
                                  </p>
                                  <p className="text-[10px] leading-relaxed text-slate-300 max-w-[215px] whitespace-normal pt-1 border-t border-slate-800/80 mt-1">
                                    {point.description}
                                  </p>
                                </div>
                              </Tooltip>
                            </CircleMarker>
                          )}

                          {/* An elegant central indicator pulse dot representing the capital city of each province */}
                          <CircleMarker
                            center={[point.lat, point.lng]}
                            radius={4}
                            pathOptions={{
                              fillColor: '#ffffff',
                              color: '#0f172a',
                              weight: 1.0,
                              fillOpacity: 1.0,
                              interactive: false
                            }}
                          />
                        </React.Fragment>
                      );
                    })}

                    {/* Buenos Aires Municipalities & AMBA nodes layer */}
                    {Object.entries(MUNICIPALITY_COORDS).map(([munId, coord]) => {
                      const juris = JURISDICTIONS.find(j => j.id === munId);
                      if (!juris) return null;
                      
                      const isSelected = selectedJurisdictionId === munId;
                      const isCaba = juris.id === 'caba';
                      
                      // Node style
                      const nodeColor = isCaba ? '#c084fc' : '#34d399'; // purple for CABA, emerald for PBA municipal
                      
                      return (
                        <CircleMarker
                          key={munId}
                          center={[coord.lat, coord.lng]}
                          radius={isSelected ? 10 : 5.5}
                          pathOptions={{
                            fillColor: nodeColor,
                            color: isSelected ? '#ffffff' : '#020617',
                            weight: isSelected ? 2.5 : 1.2,
                            fillOpacity: 0.95
                          }}
                          eventHandlers={{
                            click: (e) => {
                              L.DomEvent.stopPropagation(e as any); // prevent bundling to provincial click
                              handleSelectJurisdiction(munId, juris.name);
                            }
                          }}
                        >
                          <Tooltip
                            direction="top"
                            offset={[0, -6]}
                            opacity={1.0}
                            className="custom-dark-tooltip"
                          >
                            <div className="p-3 font-sans text-xs space-y-1 my-0.5 text-left" style={{ textShadow: 'none' }}>
                              <div className="flex items-center justify-between gap-3 leading-tight border-b border-slate-800 pb-1 mb-1">
                                <span className="font-extrabold text-slate-100 text-xs block">{juris.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[8px] font-mono font-bold uppercase shrink-0">
                                  {isCaba ? 'CABA' : 'MUNICIPIO'}
                                </span>
                              </div>
                              
                              <div className="text-[10px] text-slate-400 space-y-0.5 font-mono">
                                <p>Gobierno: <span className="font-bold text-slate-200">{juris.authorityName}</span> <span className="text-[9px] text-slate-500">({juris.authorityParty})</span></p>
                                <p>Presupuesto: <span className="font-bold text-slate-300">{formatCurrency(juris.budgetAvailable)}</span></p>
                                <p>Tasas Comunales: <span className="font-bold text-slate-300">{juris.activeTaxesCount}</span></p>
                                <p>Empleados Públicos: <span className="font-bold text-slate-200">{juris.publicEmployeesCount?.toLocaleString('es-AR') || 'N/C'}</span></p>
                              </div>
                              
                              <div className="text-[9px] font-mono text-emerald-400 font-bold pt-1.5 border-t border-slate-800/80 mt-1 flex items-center justify-between">
                                <span>Clic para auditar detalles</span>
                                <span>→</span>
                              </div>
                            </div>
                          </Tooltip>
                        </CircleMarker>
                      );
                    })}
                  </MapContainer>
                </div>

                {/* Geopolitical Legend */}
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-2 text-xs">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">Identificación y Navegación Geopolítica</div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    Cada provincia está pintada de manera integral con un <span className="text-emerald-400 font-semibold font-mono">color único diferenciado</span> del espectro RGB para facilitar su ubicación visual y contraste en el mapa. Haz clic sobre cualquier provincia o nodo de AMBA para desplegar su ficha de auditoría y revisar sus tasas locales, presupuesto y dotación.
                  </p>
                </div>
              </div>
            )}

            {/* SCHEMATIC GRID VIEW */}
            {mapView === 'schematic' && (
              <div className="relative p-2 bg-slate-950/60 rounded-xl border border-slate-900 overflow-hidden">
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 p-2 bg-slate-900/90 border border-slate-850 rounded-lg text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-500"></span>
                    <span>Datos Verificados</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-slate-700"></span>
                    <span>En Proceso de Carga</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3 max-w-md mx-auto aspect-[3/4] p-4 text-center">
                  {PROVINCE_GRID.map((prov) => {
                    const isSelected = selectedJurisdictionId === prov.id;
                    const isVerified = prov.status === 'verified';
                    
                    return (
                      <button
                        key={prov.id}
                        onClick={() => {
                          if (isVerified) {
                            handleSelectJurisdiction(prov.id);
                          } else {
                            handleSelectJurisdiction(prov.id);
                          }
                        }}
                        className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-[11px] font-semibold transition-all duration-300 min-h-[60px] cursor-pointer ${prov.gridPos} ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)] z-10 scale-105'
                            : isVerified
                              ? 'bg-emerald-500/5 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40'
                              : 'bg-slate-900/30 text-slate-500 border-slate-850 hover:bg-slate-800/40 hover:text-slate-300'
                        }`}
                      >
                        <span className="block truncate max-w-full text-[10px] leading-tight">{prov.name}</span>
                        {isVerified && (
                          <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {mapView === 'schematic' && (
              <p className="text-[10px] text-slate-500 text-center mt-3 font-mono">
                Esquema representativo de distribución geopolítica argentina. Seleccioná una casilla con punto verde para auditar.
              </p>
            )}
          </div>

          {/* Drill Down Children List (Municipalities / Local Governments) */}
          {selectedJuris && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white text-sm mb-4 tracking-tight">
                Gobiernos Locales dependientes de: <span className="text-emerald-400">{selectedJuris.name}</span>
              </h3>
              
              {childJurisdictions.length === 0 ? (
                <div className="p-6 bg-slate-950/40 border border-slate-850 rounded-xl text-center">
                  <p className="text-xs text-slate-500">
                    No hay municipios asociados o cargados todavía en esta vista de mapa para {selectedJuris.name}. 
                    {selectedJuris.level === 'nation' && ' Seleccioná una provincia de mapa para ver sus municipios.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {childJurisdictions.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleSelectJurisdiction(child.id, child.name)}
                      className={`flex flex-col text-left p-4 bg-slate-950/60 border border-slate-850 rounded-xl hover:border-slate-700 transition cursor-pointer hover:bg-slate-900 ${
                        selectedJurisdictionId === child.id ? 'ring-1 ring-emerald-500/45 border-emerald-500/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-200 text-xs">{child.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[9px] font-mono text-slate-500 capitalize">{child.level}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">Intendencia: {child.authorityName}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-3">
                        <span>Tributos: {child.activeTaxesCount}</span>
                        <span className="text-emerald-400 font-bold">Auditar →</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AUDIT DETAILS COLUMN (Right - 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedJuris ? (
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6 sticky top-20">
              {/* Header Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {selectedJuris.isBaseDemo ? (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold uppercase rounded">
                      Dato de Ejemplo
                    </span>
                  ) : (
                    <EvidenceBadge
                      level={selectedJuris.confidenceLevel}
                      sourceName={selectedJuris.sources[0]}
                      dateString="2026-05-15"
                    />
                  )}
                  
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono tracking-wider rounded uppercase">
                    {selectedJuris.level === 'nation' ? 'Nivel Nacional' : selectedJuris.level === 'province' || selectedJuris.level === 'city_autonoma' ? 'Nivel Provincial' : 'Nivel Municipal'}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedJuris.name}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{selectedJuris.summary}</p>
              </div>

              {/* Authority Info */}
              <div className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl space-y-2.5">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Autoridad Ejecutiva Activa</span>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center justify-center font-bold text-sm tracking-wide shrink-0">
                    {selectedJuris.authorityName.charAt(0)}
                  </div>
                  <div className="space-y-0.5 text-xs text-left">
                    <p className="font-bold text-slate-200">{selectedJuris.authorityName}</p>
                    <p className="text-slate-400">{selectedJuris.authorityParty}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Mandato: {selectedJuris.authorityPeriod}</p>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wide">Presupuesto anual</span>
                  </div>
                  <p className="text-xs font-black text-white">{formatCurrency(selectedJuris.budgetAvailable)}</p>
                </div>

                <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wide">Empleo Público</span>
                  </div>
                  <p className="text-xs font-black text-white">
                    {selectedJuris.publicEmployeesCount ? selectedJuris.publicEmployeesCount.toLocaleString('es-AR') : 'Sin dato verificado'}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl col-span-2">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wide">Deuda Pública Declarada</span>
                  </div>
                  <p className="text-xs font-black text-white">{formatCurrency(selectedJuris.debtAmount)}</p>
                </div>
              </div>

              {/* Active Levies Count & Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-850">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Tributos Activos Audiados:</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {activeTaxes.length} Registrados
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeTaxes.length === 0 ? (
                    <div className="text-[11px] text-slate-500 italic p-2 bg-slate-950/40 rounded border border-slate-850">
                      No hay registros fiscales detallados en esta muestra rápida de mapa. Utilizá el Registro de Tributos global.
                    </div>
                  ) : (
                    activeTaxes.map(tax => (
                      <div key={tax.id} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-850/80 text-[11px]">
                        <span className="text-slate-200 truncate pr-3">{tax.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-400 rounded capitalize">{tax.type}</span>
                          <button
                            onClick={() => onNavigate('tributos')}
                            className="text-[10px] text-emerald-400 font-bold hover:underline"
                          >
                            Ver
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Fuentes Oficiales Utilizadas:</h4>
                  <div className="flex flex-col gap-1">
                    {selectedJuris.sources.length === 0 ? (
                      <span className="text-[11px] text-slate-500 font-mono">Sin fuente oficial registrada</span>
                    ) : (
                      selectedJuris.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src}
                          target="_blank"
                          rel="noreferrer referrer"
                          className="text-[10px] text-emerald-400 font-mono hover:underline truncate block"
                        >
                          {src}
                        </a>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('contribucion')}
                  className="w-full py-2.5 mt-2 bg-slate-950 hover:bg-slate-900 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition text-center"
                >
                  ¿Encontraste un error? Sugerí modificación con evidencia
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-slate-900 border border-slate-850 rounded-2xl text-center text-slate-500">
              Seleccioná una jurisdicción del mapa nacional para auditar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
