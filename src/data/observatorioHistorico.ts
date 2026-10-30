/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Observatorio Histórico Fiscal y Político (1946–Actualidad)
 * Todas las cifras indican moneda, período, etapa presupuestaria y fuente oficial.
 */

import type {
  PresidentialPeriodRecord,
  FiscalFlowSeriesPoint,
  HistoricalDossier,
  CitizenInquiryTemplate,
  CorrectionLogEntry
} from '../types/observatorio';

export const MONETARY_REGIMES_ARGENTINA = [
  {
    code: 'MSN' as const,
    name: 'Peso Moneda Nacional (m$n)',
    validPeriod: '1881 – 31/12/1969',
    legalBasis: 'Ley 1.130',
    conversionRule: 'Base histórica inicial del período 1946–1969',
    sourceUrl: 'https://www.bcra.gob.ar/MediosPago/Emisiones_anteriores.asp'
  },
  {
    code: 'PESO_LEY' as const,
    name: 'Peso Ley 18.188 ($ley)',
    validPeriod: '01/01/1970 – 31/05/1983',
    legalBasis: 'Ley 18.188',
    conversionRule: '1 Peso Ley = 100 Pesos Moneda Nacional (quita de 2 ceros)',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21291/norma.htm'
  },
  {
    code: 'PESO_ARGENTINO' as const,
    name: 'Peso Argentino ($a)',
    validPeriod: '01/06/1983 – 14/06/1985',
    legalBasis: 'Ley 22.707',
    conversionRule: '1 Peso Argentino = 10.000 Pesos Ley (quita de 4 ceros)',
    sourceUrl: 'https://www.bcra.gob.ar/MediosPago/Emisiones_anteriores.asp'
  },
  {
    code: 'AUSTRAL' as const,
    name: 'Austral (₳)',
    validPeriod: '15/06/1985 – 31/12/1991',
    legalBasis: 'Decreto 1.096/1985',
    conversionRule: '1 Austral = 1.000 Pesos Argentinos (quita de 3 ceros)',
    sourceUrl: 'https://www.bcra.gob.ar/MediosPago/Emisiones_anteriores.asp'
  },
  {
    code: 'ARS' as const,
    name: 'Peso Convertible / Peso ($)',
    validPeriod: '01/01/1992 – Actualidad',
    legalBasis: 'Ley 23.928 y Decreto 2.128/1991 (modif. Ley 25.561 en 2002)',
    conversionRule: '1 Peso = 10.000 Australes (quita de 4 ceros; total acumulado: 13 ceros desde m$n)',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/328/texact.htm'
  }
];

export const PRESIDENTIAL_PERIODS_1946_2026: PresidentialPeriodRecord[] = [
  {
    id: 'peron_1946_1955',
    periodLabel: '1946–1955',
    startYear: 1946,
    endYear: 1955,
    headOfState: 'Juan Domingo Perón (I y II mandato)',
    politicalForce: 'Partido Peronista / Partido Justicialista',
    constitutionalRegime: 'constitucional',
    dominantCurrency: 'MSN',
    keyFiscalMilestones: [
      'Nacionalización del BCRA y de los depósitos bancarios (Decreto-Ley 8.503/1946)',
      'Creación del IAPI para comercio exterior y transferencia intersectorial',
      'Expansión de cajas nacionales de previsión social (Ley 14.370 de 1954)',
      'Unificación de impuestos internos y régimen de coparticipación (Ley 14.390)'
    ],
    publicSpendingPctGdpRange: '16% – 29% del PIB (consolidado estimado según serie Ferreres/MECON)',
    taxPressurePctGdpRange: '11% – 17% del PIB (incluyendo aportes previsionales)',
    epistemicStatus: 'oficial_con_reserva',
    primarySources: [
      { label: 'BCRA — Historia normativa monetaria', url: 'https://www.bcra.gob.ar/Institucional/Historia.asp' },
      { label: 'InfoLEG — Ley 14.370 Previsión Social', url: 'https://servicios.infoleg.gob.ar/' }
    ]
  },
  {
    id: 'alternancia_1955_1973',
    periodLabel: '1955–1973',
    startYear: 1955,
    endYear: 1973,
    headOfState: 'Aramburu / Frondizi / Guido / Illia / Onganía / Levingston / Lanusse',
    politicalForce: 'UCRI / UCRP / Regímenes de facto (Revolución Libertadora y Revolución Argentina)',
    constitutionalRegime: 'transicion_constitucional',
    dominantCurrency: 'MSN',
    keyFiscalMilestones: [
      'Creación del CONICET por Decreto-Ley 1.291/1958 (05/02/1958)',
      'Unificación de las Cajas Nacionales de Previsión en 3 cajas (Ley 17.575 de 1967) y régimen Ley 18.037/18.038 (1968)',
      'Reforma monetaria Ley 18.188 (1970): creación del Peso Ley con quita de dos ceros',
      'Sanción en 1973 del paquete tributario base moderno: Ley 20.631 (IVA) y Ley 20.628 (Impuesto a las Ganancias)'
    ],
    publicSpendingPctGdpRange: '18% – 25% del PIB',
    taxPressurePctGdpRange: '12% – 16% del PIB',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'CONICET — Decreto-Ley 1291/58', url: 'https://www.conicet.gov.ar/historia/' },
      { label: 'InfoLEG — Ley 20.631 (IVA) y Ley 20.628 (Ganancias)', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20965/texact.htm' }
    ]
  },
  {
    id: 'peronismo_dictadura_1973_1983',
    periodLabel: '1973–1983',
    startYear: 1973,
    endYear: 1983,
    headOfState: 'Cámpora / Lastiri / Perón (III) / M. E. Martínez de Perón / Junta Militar (1976–1983)',
    politicalForce: 'FREJULI (1973–1976) / Proceso de Reorganización Nacional (de facto, 1976–1983)',
    constitutionalRegime: 'de_facto',
    dominantCurrency: 'PESO_LEY',
    keyFiscalMilestones: [
      'Entrada en vigencia efectiva del IVA (01/01/1975, Ley 20.631)',
      'Transferencia de escuelas primarias y hospitales nacionales a provincias sin recursos coparticipables equivalentes (1978)',
      'Sanción del Código Aduanero Ley 22.415 (1981)',
      'Estatización de deuda externa privada mediante seguros de cambio del BCRA (1981–1982) y cambio monetario a Peso Argentino (Ley 22.707 de 1983)'
    ],
    publicSpendingPctGdpRange: '24% – 34% del PIB',
    taxPressurePctGdpRange: '13% – 19% del PIB',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'InfoLEG — Ley 22.415 Código Aduanero', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16550/texact.htm' },
      { label: 'MECON — Series históricas de Gasto Público Consolidado', url: 'https://www.argentina.gob.ar/economia/politicaeconomica/macroeconomia/gasto-publico-consolidado' }
    ]
  },
  {
    id: 'alfonsin_1983_1989',
    periodLabel: '1983–1989',
    startYear: 1983,
    endYear: 1989,
    headOfState: 'Raúl Ricardo Alfonsín',
    politicalForce: 'Unión Cívica Radical (UCR)',
    constitutionalRegime: 'constitucional',
    dominantCurrency: 'AUSTRAL',
    keyFiscalMilestones: [
      'Plan Austral (Decreto 1.096/1985) y creación del signo monetario Austral',
      'Sanción de la Ley 23.548 de Coparticipación Federal de Recursos Fiscales (1988), aún vigente como régimen transitorio',
      'Crisis hiperinflacionaria de 1989 (IPC anual oficial INDEC: 4.923,3%)'
    ],
    publicSpendingPctGdpRange: '26% – 31% del PIB',
    taxPressurePctGdpRange: '14% – 18% del PIB',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'InfoLEG — Ley 23.548 Coparticipación Federal', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21108/texact.htm' },
      { label: 'INDEC — Serie histórica IPC', url: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' }
    ]
  },
  {
    id: 'menem_delarua_1989_2001',
    periodLabel: '1989–2001',
    startYear: 1989,
    endYear: 2001,
    headOfState: 'Carlos Saúl Menem (I y II) / Fernando de la Rúa',
    politicalForce: 'Partido Justicialista (1989–1999) / Alianza UCR-FREPASO (1999–2001)',
    constitutionalRegime: 'constitucional',
    dominantCurrency: 'ARS',
    keyFiscalMilestones: [
      'Ley 23.696 de Reforma del Estado (1989) y Ley 23.928 de Convertibilidad (1991)',
      'Creación del Impuesto sobre los Bienes Personales (Ley 23.966 de 1991)',
      'Federalización de hidrocarburos y privatización de YPF (Ley 24.145 de 1992)',
      'Creación del Sistema Integrado de Jubilaciones y Pensiones mixto — reparto y AFJP (Ley 24.241 de 1993)',
      'Incremento de la alícuota general del IVA al 21% en abril de 1995 (Ley 24.468)',
      'Creación del Impuesto a los Débitos y Créditos Bancarios (Ley 25.413 en marzo de 2001)'
    ],
    publicSpendingPctGdpRange: '24% – 30% del PIB Consolidado',
    taxPressurePctGdpRange: '17% – 21,5% del PIB Consolidado',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'InfoLEG — Ley 23.966 y Ley 24.241', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm' },
      { label: 'InfoLEG — Ley 25.413 Impuesto al Cheque', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/66428/texact.htm' }
    ]
  },
  {
    id: 'duhalde_kirchner_fernandez_2002_2015',
    periodLabel: '2002–2015',
    startYear: 2002,
    endYear: 2015,
    headOfState: 'Eduardo Duhalde / Néstor Kirchner / Cristina Fernández de Kirchner (I y II)',
    politicalForce: 'Partido Justicialista / Frente para la Victoria (FPV)',
    constitutionalRegime: 'constitucional',
    dominantCurrency: 'ARS',
    keyFiscalMilestones: [
      'Ley 25.561 de Emergencia Pública (2002) y restablecimiento de derechos de exportación generalizados',
      'Moratorias previsionales Ley 25.994 (2004), ampliación Ley 24.476 y Ley 26.970 (2014)',
      'Estatización de los fondos de las AFJP y creación del SIPA y del FGS (Ley 26.425 de noviembre de 2008)',
      'Expropiación del 51% del paquete accionario de YPF S.A. (Ley 26.741 de mayo de 2012)',
      'Intervención metodológica del INDEC entre 2007 y 2015 (advertida en series con IPC alternativo)'
    ],
    publicSpendingPctGdpRange: '26% (2003) a 41,5% (2015) del PIB Consolidado',
    taxPressurePctGdpRange: '21,2% (2002) a 31,5% (2015) del PIB Consolidado',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'InfoLEG — Ley 26.425 Creación del SIPA', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm' },
      { label: 'InfoLEG — Ley 26.741 Soberanía Hidrocarburífera (YPF)', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm' }
    ]
  },
  {
    id: 'macri_fernandez_milei_2015_2026',
    periodLabel: '2015–2026',
    startYear: 2015,
    endYear: 2026,
    headOfState: 'Mauricio Macri (2015–2019) / Alberto Fernández (2019–2023) / Javier Milei (2023–2026)',
    politicalForce: 'Cambiemos (2015–2019) / Frente de Todos (2019–2023) / La Libertad Avanza (2023–2026)',
    constitutionalRegime: 'constitucional',
    dominantCurrency: 'ARS',
    keyFiscalMilestones: [
      'Consenso Fiscal 2017 y Reforma Previsional Ley 27.426 (diciembre 2017)',
      'Creación del Impuesto PAIS por Ley 27.541 (diciembre 2019) y finalización de su vigencia en diciembre de 2024',
      'Aporte Solidario Extraordinario (Ley 27.605 de 2020) y Moratoria Previsional Ley 27.705 (2023)',
      'Ley 27.742 Bases y Ley 27.743 Medidas Fiscales (junio 2024): restitución de Ganancias 4ta categoría (Acta HCDN 5274)',
      'Presupuesto Nacional 2026 aprobado por Ley 27.798 ($148,07 billones de crédito aprobado)'
    ],
    publicSpendingPctGdpRange: '32% – 42% del PIB Consolidado',
    taxPressurePctGdpRange: '28% – 31% del PIB Consolidado',
    epistemicStatus: 'verificado',
    primarySources: [
      { label: 'Boletín Oficial — Ley 27.743 y Ley 27.798', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230' },
      { label: 'DNiaF MECON — Presión Tributaria Efectiva', url: 'https://www.argentina.gob.ar/economia/ingresos-publicos/presion-tributaria' }
    ]
  }
];

/**
 * Serie histórica documentada de presión tributaria, transferencias y gasto primario (% del PIB).
 * REGLA METODOLÓGICA: `intergovernmentalEliminationApplied: true` indica que las transferencias
 * automáticas de Nación a Provincias no se suman dos veces al calcular el gasto consolidado.
 */
export const HISTORICAL_FISCAL_SERIES: FiscalFlowSeriesPoint[] = [
  {
    year: 1950,
    presidencyId: 'peron_1946_1955',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 15.4,
    nationalTaxRevenuePctGdp: 13.1,
    provincialAutoTransferPctGdp: 2.4,
    primarySpendingNationalPctGdp: 17.8,
    financialResultPctGdp: -3.2,
    budgetStage: 'ejecutado_cuenta_inversion',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'oficial_con_reserva',
    methodologyNote: 'Serie histórica empalmada MECON / Cuentas Nacionales BCRA 1950.',
    sourceName: 'MECON — Serie histórica de Sector Público Argentino',
    sourceUrl: 'https://www.argentina.gob.ar/economia/politicaeconomica/macroeconomia/gasto-publico-consolidado'
  },
  {
    year: 1960,
    presidencyId: 'alternancia_1955_1973',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 14.2,
    nationalTaxRevenuePctGdp: 11.9,
    provincialAutoTransferPctGdp: 2.8,
    primarySpendingNationalPctGdp: 15.6,
    financialResultPctGdp: -2.1,
    budgetStage: 'ejecutado_cuenta_inversion',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'oficial_con_reserva',
    methodologyNote: 'Ejecución de Administración Nacional y Cajas de Previsión sin duplicar coparticipación Ley 14.390.',
    sourceName: 'MECON — Serie histórica de Sector Público Argentino',
    sourceUrl: 'https://www.argentina.gob.ar/economia/politicaeconomica/macroeconomia/gasto-publico-consolidado'
  },
  {
    year: 1975,
    presidencyId: 'peronismo_dictadura_1973_1983',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 13.6,
    nationalTaxRevenuePctGdp: 11.2,
    provincialAutoTransferPctGdp: 3.1,
    primarySpendingNationalPctGdp: 22.9,
    financialResultPctGdp: -11.4,
    budgetStage: 'ejecutado_cuenta_inversion',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Primer año de vigencia efectiva de la Ley 20.631 (IVA). Fuerte deterioro fiscal por shock inflacionario de 1975.',
    sourceName: 'MECON — Dirección Nacional de Investigaciones y Análisis Fiscal',
    sourceUrl: 'https://www.argentina.gob.ar/economia/ingresos-publicos'
  },
  {
    year: 1985,
    presidencyId: 'alfonsin_1983_1989',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 18.1,
    nationalTaxRevenuePctGdp: 15.3,
    provincialAutoTransferPctGdp: 3.9,
    primarySpendingNationalPctGdp: 19.4,
    financialResultPctGdp: -4.1,
    budgetStage: 'ejecutado_cuenta_inversion',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Año de lanzamiento del Plan Austral (junio 1985). Régimen transitorio previo a la Ley 23.548.',
    sourceName: 'MECON — Estadísticas Tributarias y Gasto Público Consolidado',
    sourceUrl: 'https://www.argentina.gob.ar/economia/politicaeconomica/macroeconomia/gasto-publico-consolidado'
  },
  {
    year: 1995,
    presidencyId: 'menem_delarua_1989_2001',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 20.3,
    nationalTaxRevenuePctGdp: 16.6,
    provincialAutoTransferPctGdp: 4.8,
    primarySpendingNationalPctGdp: 17.9,
    financialResultPctGdp: -1.4,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Incluye incremento de la alícuota general del IVA del 18% al 21% (Ley 24.468) y pérdida de aportes personales derivados a las AFJP (Ley 24.241).',
    sourceName: 'DNiaF MECON — Presión Tributaria Consolidada',
    sourceUrl: 'https://www.argentina.gob.ar/economia/ingresos-publicos/presion-tributaria'
  },
  {
    year: 2004,
    presidencyId: 'duhalde_kirchner_fernandez_2002_2015',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 25.1,
    nationalTaxRevenuePctGdp: 21.3,
    provincialAutoTransferPctGdp: 5.4,
    primarySpendingNationalPctGdp: 17.2,
    financialResultPctGdp: 2.6,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Superávit primario y financiero con incidencia plena de Derechos de Exportación e Impuesto al Cheque (no coparticipados en su totalidad).',
    sourceName: 'DNiaF MECON / Oficina Nacional de Presupuesto',
    sourceUrl: 'https://www.argentina.gob.ar/economia/ingresos-publicos/presion-tributaria'
  },
  {
    year: 2009,
    presidencyId: 'duhalde_kirchner_fernandez_2002_2015',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 28.9,
    nationalTaxRevenuePctGdp: 24.4,
    provincialAutoTransferPctGdp: 5.9,
    primarySpendingNationalPctGdp: 22.8,
    financialResultPctGdp: -0.6,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Primer ejercicio completo tras la Ley 26.425 (estatización de AFJP e incorporación de flujos de aportes personales al SIPA).',
    sourceName: 'DNiaF MECON / Cuenta de Inversión CGN 2009',
    sourceUrl: 'https://www.argentina.gob.ar/economia/hacienda/cgn/cuenta-de-inversion'
  },
  {
    year: 2015,
    presidencyId: 'duhalde_kirchner_fernandez_2002_2015',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 31.5,
    nationalTaxRevenuePctGdp: 26.1,
    provincialAutoTransferPctGdp: 6.5,
    primarySpendingNationalPctGdp: 26.8,
    financialResultPctGdp: -5.1,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Máximo histórico de presión tributaria consolidada y de gasto primario nacional previo al fallo CSJN sobre detracción del 15% de coparticipación.',
    sourceName: 'DNiaF MECON — Presión Tributaria Consolidada',
    sourceUrl: 'https://www.argentina.gob.ar/economia/ingresos-publicos/presion-tributaria'
  },
  {
    year: 2019,
    presidencyId: 'macri_fernandez_milei_2015_2026',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 28.4,
    nationalTaxRevenuePctGdp: 23.2,
    provincialAutoTransferPctGdp: 6.9,
    primarySpendingNationalPctGdp: 20.9,
    financialResultPctGdp: -3.8,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Restitución gradual del 15% de coparticipación a provincias y sanción de la Ley 27.541 en diciembre de 2019.',
    sourceName: 'DNiaF MECON / Presupuesto Abierto',
    sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/'
  },
  {
    year: 2023,
    presidencyId: 'macri_fernandez_milei_2015_2026',
    currency: 'PCT_PIB',
    taxPressureConsolidatedPctGdp: 27.8,
    nationalTaxRevenuePctGdp: 22.5,
    provincialAutoTransferPctGdp: 6.4,
    primarySpendingNationalPctGdp: 21.8,
    financialResultPctGdp: -4.4,
    budgetStage: 'devengado',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Impacto de la sequía en derechos de exportación y modificación del mínimo no imponible de Ganancias en el cuarto trimestre.',
    sourceName: 'DNiaF MECON / Cuenta de Inversión 2023',
    sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/'
  },
  {
    year: 2026,
    presidencyId: 'macri_fernandez_milei_2015_2026',
    currency: 'ARS',
    taxPressureConsolidatedPctGdp: null,
    nationalTaxRevenuePctGdp: null,
    provincialAutoTransferPctGdp: null,
    primarySpendingNationalPctGdp: null,
    financialResultPctGdp: null,
    budgetStage: 'credito_inicial',
    intergovernmentalEliminationApplied: true,
    epistemicStatus: 'verificado',
    methodologyNote: 'Ejercicio 2026 en curso: se publica el crédito aprobado por Ley 27.798 ($148.069.293.526.549 ARS). No se imputa porcentaje de PIB devengado anual hasta el cierre de la Cuenta de Inversión.',
    sourceName: 'Boletín Oficial — Ley 27.798 Presupuesto General 2026',
    sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230'
  }
];

export const HISTORICAL_DOSSIERS: HistoricalDossier[] = [
  {
    id: 'dossier-previsional-2008',
    code: 'EXP-HIST-2008-SIPA',
    title: 'Reforma Previsional de 2008: Eliminación de las AFJP y Creación del SIPA (Ley 26.425)',
    category: 'previsional',
    periodCovered: '1994 – 2008 – Actualidad',
    jurisdiction: 'Nación Argentina (ANSES / SIPA)',
    normativeFramework: [
      {
        normNumber: 'Ley 24.241',
        normType: 'Ley',
        sanctionOrIssueDate: '1993-09-23',
        title: 'Creación del Sistema Integrado de Jubilaciones y Pensiones (SIJP: Reparto + Capitalización AFJP)',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm'
      },
      {
        normNumber: 'Ley 26.425',
        normType: 'Ley',
        sanctionOrIssueDate: '2008-11-20',
        title: 'Unificación del Sistema Integrado de Jubilaciones y Pensiones en el Sistema Integrado Previsional Argentino (SIPA)',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm'
      },
      {
        normNumber: 'Decreto 897/2007 y Ley 26.425 Art. 7',
        normType: 'Decreto',
        sanctionOrIssueDate: '2007-07-12',
        title: 'Creación e integración del Fondo de Garantía de Sustentabilidad (FGS) en la órbita de ANSES',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/130000-134999/130093/norma.htm'
      }
    ],
    summaryNeutral:
      'En noviembre de 2008 el Congreso Nacional sancionó la Ley 26.425, que dispuso la absorción y sustitución del régimen de capitalización individual administrado por las AFJP (creado en 1993 por Ley 24.241) en un único régimen público de reparto asistido administrado por ANSES (SIPA). Los activos acumulados en las cuentas de capitalización fueron transferidos en especie al Fondo de Garantía de Sustentabilidad (FGS), mientras que el Estado Nacional asumió el flujo corriente de aportes personales y las obligaciones futuras de pago de beneficios.',
    originOfFunds:
      'Stock acumulado en las cuentas de capitalización individual de los afiliados a las AFJP transferido al FGS + flujo mensual de aportes personales (11%) que pasaron a ingresar directamente a ANSES, sumados a contribuciones patronales e impuestos con asignación específica (IVA, Ganancias, Combustibles, Monotributo).',
    destinationAndBeneficiaries:
      'Financiamiento de prestaciones del SIPA (jubilaciones y pensiones ordinarias y por moratoria) y constitución de la cartera de inversiones del FGS (títulos públicos nacionales, acciones de empresas privadas e infraestructura).',
    monetaryRecords: [
      {
        nominalAmount: 98_224_000_000,
        currency: 'ARS',
        period: '2008-12',
        budgetStage: 'recaudado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Valuación oficial de cartera transferida de las AFJP al FGS al momento del traspaso (diciembre 2008).',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-ANSES-FGS-2008',
        sourceUrl: 'https://www.anses.gob.ar/transparencia/fondo-de-garantia-de-sustentabilidad'
      },
      {
        nominalAmount: 83_443_724_700_000,
        currency: 'ARS',
        period: '2026',
        budgetStage: 'credito_inicial',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Crédito aprobado para Seguridad Social en la Ley 27.798 (56,35% del gasto primario nacional aprobado).',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-LEY-27798',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-sipa-ejecutivo',
        officialId: 'cristina_fernandez',
        officialName: 'Cristina Fernández de Kirchner / Amado Boudou (ANSES)',
        roleAtEvent: 'Presidenta de la Nación / Director Ejecutivo de ANSES',
        partyOrCoalitionAtEvent: 'Frente para la Victoria (PJ)',
        interventionType: 'autor_proyecto',
        date: '2008-10-21',
        normOrActNumber: 'Mensaje PEN 1732/2008 (Ley 26.425)',
        summary: 'Remisión del proyecto de ley del Poder Ejecutivo Nacional e informe técnico de ANSES al Congreso.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm',
        sourceName: 'InfoLEG — Antecedentes Ley 26.425',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-sipa-hcdn',
        officialId: 'plenario_hcdn_2008',
        officialName: 'Cámara de Diputados de la Nación (Sesión 06/11/2008)',
        roleAtEvent: 'Cámara de Origen',
        partyOrCoalitionAtEvent: 'Plenario HCDN (162 afirmativos, 75 negativos)',
        interventionType: 'voto_afirmativo',
        date: '2008-11-06',
        normOrActNumber: 'Media sanción Expte. 0023-PE-2008',
        summary: 'Aprobación en general por 162 votos afirmativos contra 75 negativos.',
        sourceUrl: 'https://www.hcdn.gob.ar/secparl/dselectronicos/actas/',
        sourceName: 'HCDN — Actas de Votación Nominal 2008',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-sipa-senado',
        officialId: 'plenario_hsn_2008',
        officialName: 'Senado de la Nación (Sesión 20/11/2008)',
        roleAtEvent: 'Cámara Revisora',
        partyOrCoalitionAtEvent: 'Plenario HSN (46 afirmativos, 18 negativos, 1 abstención)',
        interventionType: 'voto_afirmativo',
        date: '2008-11-20',
        normOrActNumber: 'Sanción definitiva Ley 26.425',
        summary: 'Sanción definitiva con 46 votos afirmativos, 18 negativos y 1 abstención.',
        sourceUrl: 'https://www.senado.gob.ar/parlamentario/sesiones/busqueda',
        sourceName: 'Honorable Senado de la Nación — Diario de Sesiones',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-sipa-1',
        metricName: 'Unificación de afiliados y eliminación de comisiones de administración',
        period: '2008–2009',
        observedValue: 'Traspaso de ~9,5 millones de cuentas de capitalización al SIPA',
        expectedTargetOrBaseline: 'Unificación total del padrón de aportantes activos en ANSES',
        epistemicStatus: 'verificado',
        measurementLimitation: 'La ley garantizó el cómputo de los años aportados al régimen de capitalización como servicios del SIPA, pero el reconocimiento de aportes voluntarios/excedentes dio lugar a litigios judiciales posteriores (ej. fallo CSJN "Villarreal").',
        sourceUrl: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social',
        sourceName: 'ANSES — Boletín Estadístico de la Seguridad Social (BESS)'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Fundamento oficial del proyecto (Mensaje PEN 1732/08)',
        argumentSummary: 'Sostuvo que el sistema de AFJP generaba altas comisiones administrativas, baja cobertura futura por densidad incompleta de aportes, exposición a crisis financieras globales y déficit transicional crónico para el Estado, que pagaba las prestaciones actuales sin recibir los aportes derivados a las administradoras.',
        supportingSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm'
      },
      {
        perspectiveLabel: 'Objeciones parlamentarias y judiciales documentadas en el debate y fallos CSJN',
        argumentSummary: 'Legisladores opositores e informes de auditoría señalaron que la transferencia transformó ahorros individualizados en recursos generales sin calcular el pasivo actuarial de largo plazo del SIPA, y que una proporción creciente del FGS se alocó en títulos de deuda del propio Tesoro Nacional.',
        supportingSourceUrl: 'https://www.agn.gob.ar/informes/fondo-de-garantia-de-sustentabilidad'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  },
  {
    id: 'dossier-ypf-1992-2012',
    code: 'EXP-HIST-YPF-1992-2012',
    title: 'YPF S.A.: Privatización (1992), Expropiación del 51% (2012) y Litigios Internacionales',
    category: 'empresas_publicas',
    periodCovered: '1992 – 2012 – 2026',
    jurisdiction: 'Nación Argentina y Provincias Productoras de Hidrocarburos',
    normativeFramework: [
      {
        normNumber: 'Ley 24.145',
        normType: 'Ley',
        sanctionOrIssueDate: '1992-09-24',
        title: 'Federalización de Hidrocarburos y Transformación Empresaria y Privatización del Capital de YPF S.A.',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/540/texact.htm'
      },
      {
        normNumber: 'Ley 26.741',
        normType: 'Ley',
        sanctionOrIssueDate: '2012-05-03',
        title: 'Soberanía Hidrocarburífera — Declaración de utilidad pública y sujeto a expropiación del 51% del patrimonio de YPF S.A.',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm'
      },
      {
        normNumber: 'Ley 26.932',
        normType: 'Ley',
        sanctionOrIssueDate: '2014-04-23',
        title: 'Aprobación del Convenio de Solución Amigable y Avenimiento de Expropiación entre la República Argentina y Repsol S.A.',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229346/norma.htm'
      }
    ],
    summaryNeutral:
      'Este expediente reconstruye las dos grandes transformaciones societarias de YPF en el período contemporáneo: (1) su transformación en sociedad anónima y privatización entre 1992 y 1999 bajo la Ley 24.145 (incluyendo la reforma del artículo 7 de su estatuto social sobre oferta pública de adquisición obligatoria), y (2) la expropiación del 51% de las acciones Clase D en mayo de 2012 mediante la Ley 26.741, el posterior acuerdo indemnizatorio con Repsol S.A. en 2014 (Ley 26.932) y el litigio abierto en los tribunales del Distrito Sur de Nueva York (caso Petersen/Eton Park) por la aplicación del estatuto social.',
    originOfFunds:
      'En 1992–1999: ingresos por venta de paquetes accionarios aplicados a cancelación de deuda pública y deudas previsionales provinciales. En 2014: emisión de títulos públicos soberanos (BONAR) aprobada por Ley 26.932 por valor nominal de USD 5.000 millones para indemnizar a Repsol S.A.',
    destinationAndBeneficiaries:
      'El 51% de las acciones expropiadas por Ley 26.741 se distribuyó en un 51% para el Estado Nacional y un 49% para las provincias integrantes de la Organización Federal de Estados Productores de Hidrocarburos (OFEPHI).',
    monetaryRecords: [
      {
        nominalAmount: 5_000_000_000,
        currency: 'USD',
        period: '2014-04',
        budgetStage: 'pagado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Reconocimiento de deuda e indemnización en títulos públicos a Repsol S.A. aprobado por Ley 26.932.',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-LEY-26932',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229346/norma.htm'
      },
      {
        nominalAmount: 16_099_000_000,
        currency: 'USD',
        period: '2023-09',
        budgetStage: 'no_presupuestario_estimado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Monto de sentencia de primera instancia del tribunal del Distrito Sur de Nueva York (SDNY, septiembre 2023), actualmente apelada por la República Argentina y sin pago presupuestario firme ejecutado.',
        epistemicStatus: 'controversia',
        sourceId: 'SRC-PROCURACION-YPF',
        sourceUrl: 'https://www.argentina.gob.ar/procuraciondeltesoro'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-ypf-1992',
        officialId: 'menem_cavallo_1992',
        officialName: 'Carlos S. Menem / Domingo F. Cavallo / Congreso Nacional 1992',
        roleAtEvent: 'Poder Ejecutivo y Congreso Nacional',
        partyOrCoalitionAtEvent: 'Partido Justicialista y aliados parlamentarios',
        interventionType: 'promulgacion_ejecutiva',
        date: '1992-09-24',
        normOrActNumber: 'Ley 24.145',
        summary: 'Sanción y promulgación de la Ley 24.145 de Federalización de Hidrocarburos y privatización de YPF.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/540/texact.htm',
        sourceName: 'InfoLEG — Ley 24.145',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-ypf-2012-hcdn',
        officialId: 'plenario_hcdn_2012',
        officialName: 'Cámara de Diputados de la Nación (Sesión 03/05/2012) y Senado (25/04/2012)',
        roleAtEvent: 'Poder Legislativo Nacional',
        partyOrCoalitionAtEvent: 'Transversal (Senado: 63 afirmativos, 3 negativos; Diputados: 208 afirmativos, 32 negativos, 5 abstenciones)',
        interventionType: 'voto_afirmativo',
        date: '2012-05-03',
        normOrActNumber: 'Ley 26.741',
        summary: 'Aprobación parlamentaria de la declaración de utilidad pública y expropiación del 51% de YPF S.A.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm',
        sourceName: 'InfoLEG / Actas HCDN y HSN — Ley 26.741',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-ypf-1',
        metricName: 'Desarrollo no convencional en Vaca Muerta y producción hidrocarburífera',
        period: '2012–2026',
        observedValue: 'Incremento de producción shale oil y shale gas en la Cuenca Neuquina reportado por la Secretaría de Energía',
        expectedTargetOrBaseline: 'Autoabastecimiento energético establecido en el Art. 1 de la Ley 26.741',
        epistemicStatus: 'verificado',
        measurementLimitation: 'La evaluación financiera neta requiere contrastar el valor de mercado de la participación estatal y los flujos de inversión/exportación contra el costo financiero de los bonos emitidos en 2014 y la contingencia judicial internacional en apelación.',
        sourceUrl: 'https://www.argentina.gob.ar/economia/energia/hidrocarburos',
        sourceName: 'Secretaría de Energía de la Nación — Estadísticas de Producción'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Posición estatal en 2012 (Fundamentos de la Ley 26.741)',
        argumentSummary: 'Argumentó que la caída de reservas y producción de gas y petróleo había generado un déficit energético comercial superior a USD 3.000 millones en 2011 y que una ley de expropiación de orden público constitucional prevalecía sobre las cláusulas de oferta pública (OPA) del estatuto societario privado.',
        supportingSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm'
      },
      {
        perspectiveLabel: 'Cuestionamientos sobre el procedimiento expropiatorio y litigio SDNY',
        argumentSummary: 'Legisladores que votaron en contra o advirtieron sobre el artículo 7 del estatuto y posteriormente el fallo de primera instancia en Nueva York sostuvieron que la toma de control sin formular una Oferta Pública de Adquisición al 100% de los accionistas generó responsabilidad contractual bajo las normas de cotización en la Bolsa de Nueva York (SEC).',
        supportingSourceUrl: 'https://www.argentina.gob.ar/procuraciondeltesoro'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  },
  {
    id: 'dossier-moratorias-previsionales',
    code: 'EXP-HIST-MORATORIAS-2004-2025',
    title: 'Moratorias Previsionales y Planes de Pago de Deuda Previsional (2004–2025)',
    category: 'previsional',
    periodCovered: '2004 – 2025',
    jurisdiction: 'Nación Argentina (ANSES)',
    normativeFramework: [
      {
        normNumber: 'Ley 24.476 (y Decreto 1454/2005)',
        normType: 'Ley',
        sanctionOrIssueDate: '1995-11-22',
        title: 'Régimen permanente de regularización voluntaria de deuda autónoma (ampliado en 2005)',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/30389/texact.htm'
      },
      {
        normNumber: 'Ley 25.994',
        normType: 'Ley',
        sanctionOrIssueDate: '2004-12-16',
        title: 'Prestación Previsional Anticipada y Moratoria Previsional',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/100000-104999/102724/norma.htm'
      },
      {
        normNumber: 'Ley 26.970',
        normType: 'Ley',
        sanctionOrIssueDate: '2014-08-27',
        title: 'Régimen Especial de Regularización de Deudas Previsionales',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/230000-234999/234824/norma.htm'
      },
      {
        normNumber: 'Ley 27.705',
        normType: 'Ley',
        sanctionOrIssueDate: '2023-02-28',
        title: 'Plan de Pago de Deuda Previsional',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/380000-384999/380597/norma.htm'
      }
    ],
    summaryNeutral:
      'Entre 2005 y 2025 sucesivas normas (Decreto 1.454/05 sobre Ley 24.476, Ley 25.994, Ley 26.970 y Ley 27.705) permitieron que personas en edad jubilatoria que no contaban con los 30 años de aportes registrados accedieran a una prestación del SIPA descontando en cuotas mensuales los períodos regularizados. Estas medidas elevaron la cobertura previsional por encima del 90% de la población mayor, a la vez que incrementaron la proporción de beneficios con moratoria dentro del total de prestaciones del SIPA.',
    originOfFunds:
      'Recursos contributivos e impositivos del SIPA (ANSES) neto de las cuotas de moratoria descontadas de los haberes mensuales otorgados.',
    destinationAndBeneficiaries:
      'Adultos mayores en edad jubilatoria sin los 30 años de servicios con aportes registrados requeridos por el artículo 19 de la Ley 24.241.',
    monetaryRecords: [
      {
        nominalAmount: null,
        currency: 'PCT_PIB',
        period: '2005–2025',
        budgetStage: 'devengado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'El BESS de ANSES discrimina la cantidad de beneficios con y sin moratoria. Según informes de la Oficina de Presupuesto del Congreso (OPC), el gasto asociado a prestaciones con moratoria representó en torno a 3,5%–4,2% del PIB bruto (antes de descontar cuotas y menor gasto en PUAM/pensiones no contributivas).',
        epistemicStatus: 'oficial_con_reserva',
        sourceId: 'SRC-ANSES-BESS',
        sourceUrl: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-moratoria-26970',
        officialId: 'congreso_2014_26970',
        officialName: 'Congreso de la Nación — Sanción Ley 26.970',
        roleAtEvent: 'Poder Legislativo Nacional',
        partyOrCoalitionAtEvent: 'Frente para la Victoria y bloques acompañantes',
        interventionType: 'voto_afirmativo',
        date: '2014-08-27',
        normOrActNumber: 'Ley 26.970',
        summary: 'Sanción de la segunda etapa de regularización previsional con evaluación socioeconómica.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/230000-234999/234824/norma.htm',
        sourceName: 'InfoLEG — Ley 26.970',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-moratoria-27705',
        officialId: 'congreso_2023_27705',
        officialName: 'Congreso de la Nación — Sanción Ley 27.705 (HCDN 28/02/2023: 134 afirmativos, 107 negativos)',
        roleAtEvent: 'Poder Legislativo Nacional',
        partyOrCoalitionAtEvent: 'Frente de Todos y bloques provinciales / federales',
        interventionType: 'voto_afirmativo',
        date: '2023-02-28',
        normOrActNumber: 'Ley 27.705',
        summary: 'Sanción del Plan de Pago de Deuda Previsional por dos años.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/380000-384999/380597/norma.htm',
        sourceName: 'InfoLEG / HCDN — Ley 27.705',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-moratorias-1',
        metricName: 'Participación de beneficios con moratoria sobre el total de jubilaciones SIPA',
        period: '2024–2025 (BESS ANSES)',
        observedValue: '~66% a 69% de las jubilaciones vigentes del régimen general SIPA tuvieron intervención de alguna moratoria',
        expectedTargetOrBaseline: 'Cobertura universal de ingresos en la vejez',
        epistemicStatus: 'verificado',
        measurementLimitation: 'Tener moratoria no implica necesariamente 0 años de aportes previos: muchos beneficiarios contaban con entre 10 y 25 años de aportes y completaron el faltante con moratoria. ANSES no publica en serie abierta el promedio exacto de años aportados previos de cada cohorte.',
        sourceUrl: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social',
        sourceName: 'ANSES — Boletín Estadístico de la Seguridad Social (BESS)'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Argumento de inclusión frente a la informalidad laboral estructural',
        argumentSummary: 'Quienes impulsaron las leyes sostuvieron que exigir 30 años completos en un mercado laboral con 35%–45% de informalidad histórica excluía a millones de trabajadores y mujeres con tareas de cuidado no remuneradas.',
        supportingSourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/380000-384999/380597/norma.htm'
      },
      {
        perspectiveLabel: 'Argumento de sostenibilidad actuarial y equidad contributiva',
        argumentSummary: 'Quienes se opusieron o propusieron sustituirlas por la PUAM (Ley 27.260) sostuvieron que las moratorias achataron la pirámide previsional en perjuicio de quienes aportaron 30 o más años y agravaron el déficit contributivo sin distinguir proporcionalmente los años efectivamente aportados.',
        supportingSourceUrl: 'https://www.opc.gob.ar/'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  },
  {
    id: 'dossier-ganancias-2024',
    code: 'EXP-HIST-GANANCIAS-2024',
    title: 'Reforma del Impuesto a las Ganancias de Cuarta Categoría (Ley 27.743 Título V)',
    category: 'tributario',
    periodCovered: '2023 – 2026',
    jurisdiction: 'Nación Argentina y 23 Provincias + CABA (Impuesto Coparticipable)',
    normativeFramework: [
      {
        normNumber: 'Ley 27.725',
        normType: 'Ley',
        sanctionOrIssueDate: '2023-09-28',
        title: 'Creación del Impuesto Cedular sobre los Mayores Ingresos del trabajo en relación de dependencia',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/390000-394999/391544/norma.htm'
      },
      {
        normNumber: 'Ley 27.743 (Título V)',
        normType: 'Ley',
        sanctionOrIssueDate: '2024-06-28',
        title: 'Medidas Fiscales Paliativas y Relevantes — Impuesto a los Ingresos Personales (Restitución 4ta categoría)',
        officialUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310186/20240708'
      }
    ],
    summaryNeutral:
      'En septiembre de 2023 el Congreso sancionó la Ley 27.725 elevando el piso del impuesto sobre salarios a 15 salarios mínimos. Nueve meses después, el 28 de junio de 2024, la Cámara de Diputados insistió sobre el Título V de la Ley 27.743 (Acta N.º 5274: 136 votos afirmativos, 116 negativos y 4 ausentes/abstenciones), restituyendo el esquema progresivo sobre la cuarta categoría para recomponer la masa coparticipable de Nación y provincias.',
    originOfFunds:
      'Retenciones mensuales sobre remuneraciones de trabajadores en relación de dependencia y jubilaciones alcanzadas por el mínimo no imponible y deducciones del Título V de la Ley 27.743.',
    destinationAndBeneficiaries:
      'Masa coparticipable federal distribuida conforme a la Ley 23.548 entre el Tesoro Nacional y las 23 provincias más CABA.',
    monetaryRecords: [
      {
        nominalAmount: null,
        currency: 'PCT_PIB',
        period: '2024–2025',
        budgetStage: 'recaudado',
        isIntergovernmentalTransfer: true,
        consolidationRuleNote: 'Recaudación coparticipable estimada por la OPC en ~0,4% a 0,5% del PIB anual distribuido entre Nación y Provincias.',
        epistemicStatus: 'estimacion',
        sourceId: 'SRC-HCDN-ACTA-5274',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-gan-2024-espert',
        officialId: 'jose_luis_espert_2024',
        officialName: 'José Luis Espert (Presidente Comisión de Presupuesto y Hacienda)',
        roleAtEvent: 'Diputado Nacional (Buenos Aires)',
        partyOrCoalitionAtEvent: 'La Libertad Avanza',
        interventionType: 'voto_afirmativo',
        date: '2024-06-28',
        normOrActNumber: 'Acta HCDN N.º 3 (ID 5274) — O.D. 157 Título V',
        summary: 'Voto nominal AFIRMATIVO en la insistencia del Título V de la Ley 27.743.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
        sourceName: 'HCDN — Acta nominal 5274',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-gan-2024-ritondo',
        officialId: 'cristian_ritondo_2024',
        officialName: 'Cristian A. Ritondo',
        roleAtEvent: 'Diputado Nacional (Buenos Aires)',
        partyOrCoalitionAtEvent: 'PRO',
        interventionType: 'voto_afirmativo',
        date: '2024-06-28',
        normOrActNumber: 'Acta HCDN N.º 3 (ID 5274) — O.D. 157 Título V',
        summary: 'Voto nominal AFIRMATIVO en la insistencia del Título V de la Ley 27.743.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
        sourceName: 'HCDN — Acta nominal 5274',
        epistemicStatus: 'verificado'
      },
      {
        id: 'int-gan-2024-kirchner',
        officialId: 'maximo_kirchner_2024',
        officialName: 'Máximo Carlos Kirchner',
        roleAtEvent: 'Diputado Nacional (Buenos Aires)',
        partyOrCoalitionAtEvent: 'Unión por la Patria',
        interventionType: 'voto_negativo',
        date: '2024-06-28',
        normOrActNumber: 'Acta HCDN N.º 3 (ID 5274) — O.D. 157 Título V',
        summary: 'Voto nominal NEGATIVO en la insistencia del Título V de la Ley 27.743.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
        sourceName: 'HCDN — Acta nominal 5274',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-gan-2024',
        metricName: 'Votación nominal en Cámara de Diputados (Insistencia O.D. 157)',
        period: '28/06/2024 01:34 hs',
        observedValue: '136 votos afirmativos, 116 negativos, 3 abstenciones/ausentes',
        expectedTargetOrBaseline: 'Mayoría simple para insistir como Cámara de Origen',
        epistemicStatus: 'verificado',
        measurementLimitation: 'El acta nominal oficial (ID 5274) acredita el voto individual de cada diputado presente.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
        sourceName: 'HCDN — Acta Oficial 5274'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Fundamento de equilibrio fiscal y financiamiento provincial',
        argumentSummary: 'El Poder Ejecutivo y gobernadores provinciales sostuvieron que la rebaja de 2023 había desfinanciado las arcas provinciales sin recorte equivalente de gastos y que los impuestos sobre ingresos altos son progresivos en comparación con el IVA o el impuesto inflacionario.',
        supportingSourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310186/20240708'
      },
      {
        perspectiveLabel: 'Objeción sobre carga salarial y cambios de posición legislativa',
        argumentSummary: 'Legisladores opositores y sindicatos señalaron que alcanzaba nuevamente a trabajadores asalariados que habían dejado de tributar en 2023 y que varios funcionarios que impulsaron la restitución en 2024 habían votado a favor de la eliminación en septiembre de 2023.',
        supportingSourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  },
  {
    id: 'dossier-conicet-ciencia',
    code: 'EXP-HIST-CONICET-1958-2026',
    title: 'CONICET y Sistema Científico Nacional (1958–Actualidad)',
    category: 'cientifico_universitario',
    periodCovered: '1958 – 2026',
    jurisdiction: 'Nación Argentina (CONICET — Organismo Descentralizado)',
    normativeFramework: [
      {
        normNumber: 'Decreto-Ley 1.291/1958',
        normType: 'Decreto',
        sanctionOrIssueDate: '1958-02-05',
        title: 'Creación del Consejo Nacional de Investigaciones Científicas y Técnicas (CONICET) bajo la presidencia inaugural de Bernardo Houssay',
        officialUrl: 'https://www.conicet.gov.ar/historia/'
      },
      {
        normNumber: 'Ley 25.467',
        normType: 'Ley',
        sanctionOrIssueDate: '2001-09-26',
        title: 'Ley Marco de Ciencia, Tecnología e Innovación',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/69045/norma.htm'
      },
      {
        normNumber: 'Ley 27.614',
        normType: 'Ley',
        sanctionOrIssueDate: '2021-02-24',
        title: 'Ley de Financiamiento del Sistema Nacional de Ciencia, Tecnología e Innovación',
        officialUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/345000-349999/346095/norma.htm'
      }
    ],
    summaryNeutral:
      'Creado el 5 de febrero de 1958 e impulsado inicialmente por el Premio Nobel Bernardo Houssay, el CONICET es el principal organismo dedicado a la promoción y ejecución de actividades científicas y tecnológicas en Argentina. Su presupuesto financia mayoritariamente salarios de la Carrera del Investigador Científico y Tecnológico (CIC), Carrera del Personal de Apoyo (CPA), becas doctorales y posdoctorales, institutos de doble dependencia con universidades públicas y Proyectos de Investigación Plurianuales (PIP).',
    originOfFunds:
      'Tesoro Nacional (Jurisdicción/Entidad 103 — CONICET en el Presupuesto General de la Administración Nacional) más financiamiento externo y convenios de transferencia tecnológica.',
    destinationAndBeneficiaries:
      'Más de 11.000 investigadores de carrera, ~10.000 becarios doctorales y posdoctorales, personal de apoyo y más de 300 unidades ejecutoras en todo el país (en su mayoría de doble dependencia con Universidades Nacionales).',
    monetaryRecords: [
      {
        nominalAmount: null,
        currency: 'PCT_PIB',
        period: '2021–2026',
        budgetStage: 'devengado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'La Ley 27.614 fijó metas crecientes de inversión en la Función Ciencia y Técnica del Presupuesto Nacional (0,31% del PIB en 2022 hacia 1% en 2032). La ejecución real verificada por informes del sector y Presupuesto Abierto se ubicó por debajo de las metas plurianuales en 2024–2026.',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-PRESUPUESTO-CYT',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-conicet-1958',
        officialId: 'bernardo_houssay_1958',
        officialName: 'Bernardo A. Houssay (Primer Presidente del Directorio CONICET)',
        roleAtEvent: 'Presidente del Directorio (1958–1971)',
        partyOrCoalitionAtEvent: 'Organismo técnico-científico autárquico',
        interventionType: 'responsable_ejecucion',
        date: '1958-02-05',
        normOrActNumber: 'Decreto-Ley 1.291/1958',
        summary: 'Organización fundacional de la Carrera del Investigador Científico y del sistema de becas y subsidios por evaluación de pares.',
        sourceUrl: 'https://www.conicet.gov.ar/historia/',
        sourceName: 'CONICET — Archivo Histórico',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-conicet-digital',
        metricName: 'Producción científica abierta en el Repositorio Institucional CONICET Digital (Ley 26.899)',
        period: '1958–2026',
        observedValue: 'Decenas de miles de artículos arbitrados, patentes, informes técnicos y tesis de acceso abierto en ri.conicet.gov.ar',
        expectedTargetOrBaseline: 'Depósito obligatorio de producción financiada con fondos públicos (Ley 26.899)',
        epistemicStatus: 'verificado',
        measurementLimitation: 'REGLA METODOLÓGICA: No es posible vincular mecánicamente cada artículo publicado con una partida presupuestaria anual aislada, ya que los proyectos son plurianuales y cofinanciados con universidades públicas y agencias internacionales. Ausencia de retorno comercial inmediato en ciencia básica no equivale a ausencia de impacto científico.',
        sourceUrl: 'https://ri.conicet.gov.ar/',
        sourceName: 'CONICET Digital — Repositorio Institucional'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Debate sobre asignación entre ciencia básica, transferencia tecnológica y ciencias sociales',
        argumentSummary: 'En el debate público se contraponen posturas que reclaman priorizar desarrollos aplicados con retorno productivo directo frente a la posición institucional de que la ciencia básica y todas las grandes áreas del conocimiento (exactas, biológicas, agrarias/ingenierías y sociales/humanidades) son indispensables para la capacidad soberana de innovación.',
        supportingSourceUrl: 'https://www.conicet.gov.ar/conicet-en-cifras/'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  },
  {
    id: 'dossier-compras-ign-2026',
    code: 'EXP-COMPRAR-41-0009-CDI26',
    title: 'Trazabilidad de Contratación Pública: Proceso COMPR.AR 41-0009-CDI26 (IGN)',
    category: 'contrataciones',
    periodCovered: 'Agosto 2026',
    jurisdiction: 'Nación Argentina (Instituto Geográfico Nacional — IGN)',
    normativeFramework: [
      {
        normNumber: 'Proceso 41-0009-CDI26',
        normType: 'Proceso COMPR.AR',
        sanctionOrIssueDate: '2026-08-12',
        title: 'Contratación Directa por Compulsa Abreviada — Adquisición de artículos de librería (Renglón 1: Cuadernos A4)',
        officialUrl: 'https://comprar.gob.ar/PLIEGO/VistaPreviaPliegoCiudadano.aspx?qs=BQoBkoMoEhyF315%7C4K668L45fL2n4W8b1l09r4B2h5n5I1T3g7U9w4s0Q2r0A1w3v2f1t2B0s0E0t2u1F1A3L2k1i3l1l1h1Z3s0v0p0C1J0f2B1H2l3h0A2w2v0E0n3F2l1l0v0v2z0f1W1N2Q1Z1m0n3F3B3A%3D%3D'
      }
    ],
    summaryNeutral:
      'Caso testigo metodológico sobre cómo auditar contrataciones públicas en el portal COMPR.AR distinguiendo rigurosamente cada etapa administrativa: (1) Pliego y llamado, (2) Apertura de ofertas, (3) Dictamen de evaluación, (4) Acto de adjudicación y (5) Orden de compra / pago devengado. En este proceso se verificó el pliego por 20 cuadernos A4 tapa dura 84 hojas, pero sin acto de adjudicación con precio unitario firme publicado al cierre de la verificación, por lo que el sobreprecio no se da por probado.',
    originOfFunds:
      'Crédito presupuestario de la Entidad 450 (Instituto Geográfico Nacional — Ministerio de Defensa), Inciso 2 (Bienes de Consumo).',
    destinationAndBeneficiaries:
      'Insumos de librería para dependencias operativas del Instituto Geográfico Nacional.',
    monetaryRecords: [
      {
        nominalAmount: null,
        currency: 'ARS',
        period: '2026-08',
        budgetStage: 'credito_vigente',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Sin precio unitario adjudicado verificado en la vista pública del pliego. Referencia minorista privada relevada: $2.800 ARS/unidad.',
        epistemicStatus: 'desconocido',
        sourceId: 'SRC-COMPRAR-IGN',
        sourceUrl: 'https://comprar.gob.ar/'
      }
    ],
    documentedInterventions: [
      {
        id: 'int-comprar-ign',
        officialId: 'unidad_operativa_contrataciones_ign',
        officialName: 'Unidad Operativa de Contrataciones 41 (Instituto Geográfico Nacional)',
        roleAtEvent: 'Organismo Contratante',
        partyOrCoalitionAtEvent: 'Administración Pública Nacional',
        interventionType: 'responsable_ejecucion',
        date: '2026-08-12',
        normOrActNumber: 'Proceso 41-0009-CDI26',
        summary: 'Publicación del pliego y acto de apertura de ofertas en COMPR.AR.',
        sourceUrl: 'https://comprar.gob.ar/',
        sourceName: 'Portal COMPR.AR',
        epistemicStatus: 'verificado'
      }
    ],
    outcomesAndResults: [
      {
        id: 'out-comprar-1',
        metricName: 'Diferencial entre precio estatal adjudicado y precio testigo minorista',
        period: '2026-08',
        observedValue: 'No concluyente (falta orden de compra adjudicada en vista pública)',
        expectedTargetOrBaseline: 'Paridad o descuento por volumen respecto del precio minorista ($2.800/u)',
        epistemicStatus: 'desconocido',
        measurementLimitation: 'REGLA EDITORIAL: Nunca equiparar un llamado a licitación o un presupuesto estimado con un pago ejecutado o un sobreprecio consumado.',
        sourceUrl: 'https://comprar.gob.ar/',
        sourceName: 'COMPR.AR — Estado de Proceso'
      }
    ],
    controversiesAndArguments: [
      {
        perspectiveLabel: 'Por qué se incluye como expediente metodológico',
        argumentSummary: 'Muestra en la práctica el estándar de prueba de la plataforma: cuando el documento oficial prueba la existencia del expediente pero aún no exhibe la orden de compra pagada, el sistema bloquea cualquier acusación automática de sobreprecio.',
        supportingSourceUrl: 'https://comprar.gob.ar/'
      }
    ],
    epistemicStatus: 'verificado',
    lastVerified: '2026-10-29'
  }
];

export const CITIZEN_INQUIRY_TEMPLATES: CitizenInquiryTemplate[] = [
  {
    id: 'inq-sipa-fgs',
    dossierId: 'dossier-previsional-2008',
    targetOrganism: 'ANSES — Subdirección Ejecutiva de Operación del Fondo de Garantía de Sustentabilidad',
    legalBasis: 'Ley 27.275 de Derecho de Acceso a la Información Pública (Arts. 1, 4 y 13)',
    subjectTemplate: 'Solicitud de Acceso a la Información Pública — Composición actualizada y valuación técnica del FGS (Ley 26.425)',
    questionsList: [
      'Detalle desagregado de la cartera de inversiones del Fondo de Garantía de Sustentabilidad (FGS) al último trimestre cerrado, distinguiendo títulos públicos nacionales, acciones, obligaciones negociables y proyectos productivos.',
      'Proporción de haberes previsionales del SIPA financiados en el último ejercicio mediante recursos tributarios de asignación específica frente a aportes y contribuciones sobre la nómina salarial.',
      'Cantidad de beneficiarios vigentes del SIPA desagregados por tramo de años de servicio con aportes efectivos previos a la adhesión a planes de regularización (Leyes 24.476, 25.994, 26.970 y 27.705).'
    ],
    submissionChannelName: 'Trámites a Distancia (TAD) — Solicitud de Información Pública Ley 27.275',
    submissionChannelUrl: 'https://www.argentina.gob.ar/solicitar-informacion-publica'
  },
  {
    id: 'inq-comprar-adjudicacion',
    dossierId: 'dossier-compras-ign-2026',
    targetOrganism: 'Instituto Geográfico Nacional (IGN) — Unidad Operativa de Contrataciones 41',
    legalBasis: 'Ley 27.275 de Derecho de Acceso a la Información Pública y Decreto 1023/2001',
    subjectTemplate: 'Solicitud de Acceso a la Información Pública — Estado de adjudicación y orden de compra del Proceso 41-0009-CDI26',
    questionsList: [
      'Copia del Cuadro Comparativo de Ofertas, Dictamen de Evaluación y Acto Administrativo de Adjudicación (o declaración de fracasado/desierto) correspondiente al proceso COMPR.AR 41-0009-CDI26.',
      'En caso de haberse perfeccionado Orden de Compra, informar precio unitario adjudicado para el Renglón 1, proveedor adjudicatario (CUIT y razón social) y fecha de recepción definitiva y pago.'
    ],
    submissionChannelName: 'Trámites a Distancia (TAD) — Solicitud de Información Pública Ley 27.275',
    submissionChannelUrl: 'https://www.argentina.gob.ar/solicitar-informacion-publica'
  },
  {
    id: 'inq-ejecucion-presupuestaria',
    dossierId: 'dossier-ganancias-2024',
    targetOrganism: 'Ministerio de Economía — Subsecretaría de Presupuesto / DNAP',
    legalBasis: 'Ley 27.275 de Derecho de Acceso a la Información Pública y Ley 24.156 de Administración Financiera',
    subjectTemplate: 'Solicitud de Información Pública — Recaudación efectiva y distribución por provincia del Título V de la Ley 27.743',
    questionsList: [
      'Serie mensual de recaudación efectiva ingresada por el Impuesto a las Ganancias sobre la cuarta categoría desde la entrada en vigencia del Título V de la Ley 27.743.',
      'Montos mensuales transferidos automáticamente a cada una de las 23 provincias y a la Ciudad Autónoma de Buenos Aires en concepto de coparticipación federal originada en dicho tributo.'
    ],
    submissionChannelName: 'Trámites a Distancia (TAD) — Solicitud de Información Pública Ley 27.275',
    submissionChannelUrl: 'https://www.argentina.gob.ar/solicitar-informacion-publica'
  }
];

export const CORRECTION_LOG_HISTORY: CorrectionLogEntry[] = [
  {
    id: 'corr-2026-01',
    date: '2026-09-13',
    moduleAffected: 'Responsabilidad Política / Votaciones Nominales',
    entityId: 'trace_ganancias_2024',
    previousStateSummary: 'El prototipo inicial contenía nombres de legisladores cargados manualmente sin enlace individualizado al acta oficial.',
    correctedStateSummary: 'Se depuró la base para exhibir exclusivamente votos contrastados con el Acta Oficial HCDN N.º 3 (ID 5274) del 28/06/2024.',
    reasonAndEvidence: 'Cumplimiento estricto de la regla editorial de no inferir votos por bloque partidario sin acta nominal verificada.',
    sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
    verifiedBy: 'Auditoría Interna de Datos — Con La Tuya Contribuyente'
  },
  {
    id: 'corr-2026-02',
    date: '2026-10-16',
    moduleAffected: 'Inflación Histórica (IPC)',
    entityId: 'ipc_2016',
    previousStateSummary: 'Riesgo de empalme automático en el año 2016 durante la reorganización del IPC Nacional del INDEC.',
    correctedStateSummary: 'Se estableció `official: null` para el total anual nacional oficial 2016 y se incorporó como referencia metodológica explícita el IPC Congreso (40,3%) sin presentarlo como serie oficial homogénea del INDEC.',
    reasonAndEvidence: 'El INDEC retomó la difusión del IPC GBA en mayo de 2016 y la serie nacional completa en 2017; nunca se deben inventar datos para completar períodos en transición.',
    sourceUrl: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31',
    verifiedBy: 'Auditoría Interna de Datos — Con La Tuya Contribuyente'
  },
  {
    id: 'corr-2026-03',
    date: '2026-10-30',
    moduleAffected: 'Simulador de Precios y Calculadora Fiscal',
    entityId: 'productos_y_calculadora',
    previousStateSummary: 'Los precios de referencia de los 7 productos y los parámetros de la calculadora fiscal no exhibían metadato estructurado de período de referencia ni nota de estimación en el modelo de tipos.',
    correctedStateSummary: 'Se incorporó trazabilidad explícita de período de referencia, estado epistémico (`estimacion`) y fuentes normativas de alícuotas nacionales, provinciales y municipales.',
    reasonAndEvidence: 'Alineación con el estándar de evidencia de la Fase 1 de la Instrucción Maestra.',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20965/texact.htm',
    verifiedBy: 'Auditoría Técnica — Fase 1'
  }
];
