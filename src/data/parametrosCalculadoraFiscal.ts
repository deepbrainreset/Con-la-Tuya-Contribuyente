/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Parámetros normativos y metodológicos para la Calculadora de Presión Fiscal Individual.
 * Separa alícuotas legales verificadas (SIPA, PAMI, Obra Social, IVA) de coeficientes
 * estimados de traslación de impuestos indirectos al consumo.
 */

import { EpistemicStatus } from '../types/observatorio';

export interface FiscalCalculatorParameter {
  id: string;
  label: string;
  rateOrAmount: number;
  unit: 'porcentaje' | 'ars_mensual';
  normativeReference: string;
  sourceUrl: string;
  lastVerified: string;
  epistemicStatus: EpistemicStatus;
  methodologyNote: string;
}

export const CALCULADORA_FISCAL_PARAMETERS = {
  referencePeriod: '2026-T3',
  currency: 'ARS' as const,
  lastVerified: '2026-10-30',
  jubilacionRate: 0.11,
  obraSocialRate: 0.03,
  pamiLey19032Rate: 0.03,
  gananciasMonthlyFloorArs: 1_800_000,
  gananciasMarginalEffectiveEstimate: 0.22,
  consumptionShareByTier: {
    bajo: 0.75,
    medio: 0.90,
    alto: 1.0
  },
  effectiveIndirectTaxRateByTier: {
    bajo: 0.22,
    medio: 0.31,
    alto: 0.40
  },
  patrimonialMonthlyEstimateArs: {
    automotor: 18_500,
    inmueble: 22_000
  }
};

export const CALCULADORA_NORMATIVE_SOURCES: FiscalCalculatorParameter[] = [
  {
    id: 'aporte-sipa-jubilacion',
    label: 'Aporte personal jubilatorio (SIPA)',
    rateOrAmount: 11,
    unit: 'porcentaje',
    normativeReference: 'Ley 24.241 Art. 11 y Ley 26.425',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm',
    lastVerified: '2026-10-30',
    epistemicStatus: 'verificado',
    methodologyNote: 'Alícuota legal obligatoria del 11% sobre remuneración bruta sujeta a aportes hasta el tope previsional.'
  },
  {
    id: 'aporte-inssjp-pami',
    label: 'Aporte personal INSSJP (PAMI)',
    rateOrAmount: 3,
    unit: 'porcentaje',
    normativeReference: 'Ley 19.032 Art. 8',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16085/texact.htm',
    lastVerified: '2026-10-30',
    epistemicStatus: 'verificado',
    methodologyNote: 'Alícuota legal obligatoria del 3% destinada al Instituto Nacional de Servicios Sociales para Jubilados y Pensionados.'
  },
  {
    id: 'aporte-obra-social',
    label: 'Aporte personal Obra Social Sindical / Nacional',
    rateOrAmount: 3,
    unit: 'porcentaje',
    normativeReference: 'Ley 23.660 Art. 16 inc. b)',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm',
    lastVerified: '2026-10-30',
    epistemicStatus: 'verificado',
    methodologyNote: 'Alícuota legal obligatoria del 3% sobre remuneración bruta para trabajadores en relación de dependencia.'
  },
  {
    id: 'impuesto-ganancias-4ta',
    label: 'Impuesto a las Ganancias — 4.ª Categoría (piso referencial y alícuota efectiva media)',
    rateOrAmount: 22,
    unit: 'porcentaje',
    normativeReference: 'Ley 27.743 Título V (Restitución 4.ª Categoría)',
    sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708',
    lastVerified: '2026-10-30',
    epistemicStatus: 'estimacion',
    methodologyNote: 'La escala legal del Art. 94 de la Ley de Impuesto a las Ganancias es progresiva (5% a 35%). El simulador aplica un piso referencial y tasa marginal promedio para ingresos sin cargas de familia declaradas en SIRADIG.'
  },
  {
    id: 'incidencia-indirectos-consumo',
    label: 'Incidencia acumulada de IVA (21% / 10,5%), IIBB en cascada, Impuestos Internos y Tasas Municipales',
    rateOrAmount: 31,
    unit: 'porcentaje',
    normativeReference: 'Ley 20.631 (IVA), Ley 24.674 (Internos) y Códigos Fiscales Provinciales',
    sourceUrl: 'https://www.argentina.gob.ar/economia/ingresos-publicos/tributaria',
    lastVerified: '2026-10-30',
    epistemicStatus: 'estimacion',
    methodologyNote: 'Estimación de incidencia tributaria indirecta según canasta de consumo: 22% en canasta alimentaria con bienes al 10,5% de IVA; 31% en canasta media; 40% en canasta con alta ponderación de combustibles, energía, servicios digitales e importados.'
  }
];
