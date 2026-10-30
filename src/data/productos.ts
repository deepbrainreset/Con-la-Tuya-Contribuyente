/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Desglose pedagógico estimativo de incidencia tributaria en bienes y servicios de consumo.
 * REGLA EDITORIAL: Los importes base en ARS son valores de referencia modelados para el simulador
 * (el usuario puede ingresar el precio actual de góndola en tiempo real) y su estado epistémico
 * es 'estimacion' basada en las alícuotas legales vigentes en InfoLEG / ARBA / AGIP.
 */

import { ProductSustance } from '../types';

export const PRODUCTS_METHODOLOGY_NOTE = {
  epistemicStatus: 'estimacion' as const,
  currency: 'ARS' as const,
  referencePeriod: 'Base de modelado proporcional (ajustable en vivo por el usuario)',
  lastVerified: '2026-10-29',
  explanation:
    'Los componentes de cada producto expresan la estructura proporcional de incidencia impositiva acumulada (Nacional, Provincial en cascada y Municipal) conforme a la legislación tributaria vigente. En el simulador, el ciudadano puede reemplazar el precio final por el valor exacto de su ticket o factura actual.'
};

export const PRODUCTS: ProductSustance[] = [
  {
    id: 'leche',
    name: 'Leche Entera en Sachet (1L)',
    basePrice: 512,
    logistics: 135,
    taxNational: 115, // IVA + Impuesto al Cheque (Ley 25.413) + Contribuciones patronales en la cadena
    taxProvincial: 48, // IIBB acumulado en las etapas primaria, industrial y mayorista (Ley 10.397 PBA)
    taxMunicipal: 25, // TISH y tasas de abasto/inspección municipal
    margin: 215,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/42701/texact.htm'
  },
  {
    id: 'pan',
    name: 'Pan de Mesa Tipo Lactal (Familiar)',
    basePrice: 940,
    logistics: 210,
    taxNational: 105, // IVA + Impuesto a los Débitos/Créditos + Cargas sobre nómina e insumos
    taxProvincial: 110, // IIBB acumulado en cascada (agro -> molienda -> panificadora -> comercio)
    taxMunicipal: 45, // TISH municipal en planta y punto de venta
    margin: 390,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/42701/texact.htm'
  },
  {
    id: 'combustible',
    name: 'Nafta Súper (1 Litro, CABA/AMBA promedio)',
    basePrice: 420,
    logistics: 80,
    taxNational: 335, // Impuesto sobre los Combustibles Líquidos (ICL) + Dióxido de Carbono (IDC, Ley 23.966 Tít. III) + IVA
    taxProvincial: 38, // IIBB sobre refinación y expendio
    taxMunicipal: 12, // Tasa Vial municipal sobre expendio de combustibles
    margin: 115,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/365/texact.htm'
  },
  {
    id: 'celular',
    name: 'Celular de Gama Media (Ensamblado Nacional)',
    basePrice: 160000,
    logistics: 12000,
    taxNational: 61500, // Impuestos Internos (Ley 24.674) + IVA 21% + Impuesto al Cheque + Aranceles de insumos
    taxProvincial: 14500, // IIBB acumulado en distribución mayorista y retail
    taxMunicipal: 4500, // TISH en centro logístico y local comercial
    margin: 47500,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/38624/texact.htm'
  },
  {
    id: 'auto',
    name: 'Automóvil de Entrada (Sedan Urbano standard)',
    basePrice: 10200000,
    logistics: 650000,
    taxNational: 4320000, // IVA 21% + Arancel Externo Común / autopartes + Impuestos Internos + Ganancias/Cheque
    taxProvincial: 820000, // Impuesto de Sellos en inscripción inicial + IIBB terminal y concesionaria
    taxMunicipal: 180000, // Tasas de radicación y TISH concesionaria
    margin: 2330000,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/38624/texact.htm'
  },
  {
    id: 'alquiler',
    name: 'Alquiler de Departamento de 2 Ambientes (Mensual promedio)',
    basePrice: 210000,
    logistics: 0,
    taxNational: 25000, // Monotributo / Impuesto a las Ganancias + Bienes Personales sobre el inmueble
    taxProvincial: 19500, // Impuesto Inmobiliario Provincial + IIBB/Sellos según jurisdicción
    taxMunicipal: 11500, // Tasa de Servicios Generales / ABL municipal
    margin: 84000,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16718/texact.htm'
  },
  {
    id: 'servicios',
    name: 'Factura de Energía Eléctrica (Suministro Residencial T1)',
    basePrice: 18500,
    logistics: 1800,
    taxNational: 4400, // IVA 21% (Ley 20.631) + Fondo Nacional de la Energía Eléctrica (Ley 24.065)
    taxProvincial: 2100, // Impuestos y fondos provinciales sobre el consumo eléctrico (ej. Ley 11.769 PBA)
    taxMunicipal: 1400, // Contribución municipal y tasa de alumbrado público
    margin: 3800,
    isBaseDemo: false,
    referencePeriod: 'Estructura proporcional vigente 2025–2026',
    currency: 'ARS',
    epistemicStatus: 'estimacion',
    lastVerified: '2026-10-29',
    normativeSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/464/texact.htm'
  }
];
