/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductSustance } from '../types';

export const PRODUCTS: ProductSustance[] = [
  {
    id: 'leche',
    name: 'Leche Entera en Sachet (1L)',
    basePrice: 512,
    logistics: 135,
    taxNational: 115, // IVA al 10.5% + tasas nacionales de SENASA e industriales
    taxProvincial: 48, // IIBB acumulado en la cadena (aprox 4.5%)
    taxMunicipal: 25, // TISH y tasas bromatológicas en los municipios (aprox 1.5% a 2%)
    margin: 215,
    isBaseDemo: false
  },
  {
    id: 'pan',
    name: 'Pan de Mesa Tipo Lactal (Familiar)',
    basePrice: 940,
    logistics: 210,
    taxNational: 105, // IVA exento o reducido en primer nivel + aportes
    taxProvincial: 110, // IIBB acumulado (trigo -> harinera -> panificadora -> retail)
    taxMunicipal: 45, // TISH municipal e inspección
    margin: 390,
    isBaseDemo: false
  },
  {
    id: 'combustible',
    name: 'Nafta Súper (1 Litro, CABA/AMBA promedio)',
    basePrice: 420,
    logistics: 80,
    taxNational: 335, // Impuesto sobre los Combustibles Líquidos (ICL) + Dióxido de Carbono (IDC) + IVA
    taxProvincial: 38, // IIBB local
    taxMunicipal: 12, // Tasa Vial de combustibles que aplican más de 40 municipios de Buenos Aires!
    margin: 115,
    isBaseDemo: false
  },
  {
    id: 'celular',
    name: 'Celular de Gama Media (Ensamblado Nacional)',
    basePrice: 160000,
    logistics: 12000,
    taxNational: 61500, // Impuestos Internos Tecnológicos + IVA 21% + Impuesto al cheque
    taxProvincial: 14500, // IIBB acumulado en distribución y retail
    taxMunicipal: 4500, // TISH en locación de venta
    margin: 47500,
    isBaseDemo: false
  },
  {
    id: 'auto',
    name: 'Automóvil de Entrada (Sedan Urbano standard)',
    basePrice: 10200000,
    logistics: 650000,
    taxNational: 4320000, // IVA 21% + Tasa de Importación de piezas + Impuesto al Lujo (Escala 1 si excede)
    taxProvincial: 820000, // Sellos en patentamiento nacional + IIBB acumulado
    taxMunicipal: 180000, // Inscripción municipal en patentes + Tasas administrativas locales
    margin: 2330000,
    isBaseDemo: false
  },
  {
    id: 'alquiler',
    name: 'Alquiler de Departamento de 2 Ambientes (Mensual promedio)',
    basePrice: 210000,
    logistics: 0,
    taxNational: 25000, // Impuesto a las Ganancias (declarado voluntario) + Monotributo equivalente
    taxProvincial: 19500, // Impuesto de Sellos sobre el contrato + IIBB si es renta multihabitacional
    taxMunicipal: 11500, // ABL / Tasa General de Inmuebles a cargo directo del inquilino u propietario
    margin: 84000,
    isBaseDemo: false
  },
  {
    id: 'servicios',
    name: 'Factura de Energía Eléctrica (Suministro Residencial T1)',
    basePrice: 18500,
    logistics: 1800,
    taxNational: 4400, // IVA al 21% + Contribución Ley 24.065
    taxProvincial: 2100, // Fondos Provinciales acumulados (ej. Ley 11.769 PBA o Ley 23.681)
    taxMunicipal: 1400, // Tasa de Alumbrado Público cobrada directo en la factura de la luz!
    margin: 3800,
    isBaseDemo: false
  }
];
