/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Radiografía de Facturas de Servicios Públicos (Luz, Agua, Gas, ABL),
 * Efecto Cascada / Múltiple Imposición (IIBB, Cheque, Tasas Municipales)
 * y Subsidios Cruzados Históricos AMBA/CABA vs. Interior del País (2001–2026).
 */

export interface RepeatedTaxLayer {
  stageNumber: number;
  stageName: string;
  actor: string;
  taxApplied: string;
  statutoryRatePct: number;
  explanation: string;
}

export interface ServiceInvoiceLineItem {
  id: string;
  concept: string;
  jurisdictionLevel: 'Costo Real del Servicio' | 'Subsidio de Terceros (Tesoro Nacional)' | 'Nación' | 'Provincia' | 'Municipio';
  percentageOfNetBill: number;
  timesChargedInChain: number;
  legalNorm: string;
  constitutionalOrLegalNote: string;
}

export interface ConceptualServiceBill {
  id: 'electricidad' | 'agua' | 'gas' | 'abl_inmobiliario';
  serviceName: string;
  unitDescription: string;
  realFullMonthlyCostArs: number; // Costo económico real sin subsidio ni impuestos
  defaultNetBilledByRegionAndSegment: {
    caba: { n1: number; n2: number; n3: number };
    pba_conurbano: { n1: number; n2: number; n3: number };
    cordoba: { n1: number; n2: number; n3: number };
    santa_fe: { n1: number; n2: number; n3: number };
  };
  taxLinesByRegion: {
    caba: ServiceInvoiceLineItem[];
    pba_conurbano: ServiceInvoiceLineItem[];
    cordoba: ServiceInvoiceLineItem[];
    santa_fe: ServiceInvoiceLineItem[];
  };
  cascadeStages: RepeatedTaxLayer[];
  federalDisparitySummary: string;
  officialSources: { label: string; url: string }[];
}

export interface HistoricalSubsidyYearPoint {
  year: number;
  presidency: string;
  electricityUserPaidPct: number;
  electricitySubsidizedByThirdPartiesPct: number;
  aysaWaterSubsidizedByNationalTreasuryPct: number;
  historicalNote: string;
  sourceUrl: string;
}

export const HISTORICAL_SUBSIDY_SERIES_2001_2026: HistoricalSubsidyYearPoint[] = [
  {
    year: 2001,
    presidency: 'Fernando de la Rúa / Convertibilidad',
    electricityUserPaidPct: 100,
    electricitySubsidizedByThirdPartiesPct: 0,
    aysaWaterSubsidizedByNationalTreasuryPct: 0,
    historicalNote: 'Los usuarios abonaban el 100% del costo monómico de generación, transporte y distribución eléctrica. El servicio de agua en AMBA estaba concesionado (Aguas Argentinas) sin aportes corrientes del Tesoro Nacional.',
    sourceUrl: 'https://portalweb.cammesa.com/'
  },
  {
    year: 2005,
    presidency: 'Néstor Kirchner',
    electricityUserPaidPct: 58,
    electricitySubsidizedByThirdPartiesPct: 42,
    aysaWaterSubsidizedByNationalTreasuryPct: 25,
    historicalNote: 'Congelamiento de tarifas residenciales en el AMBA tras la pesificación asimétrica (Ley 25.561). El Tesoro Nacional comenzó a cubrir con impuestos generales la brecha entre el costo de generación en CAMMESA y el precio estacional facturado.',
    sourceUrl: 'https://portalweb.cammesa.com/'
  },
  {
    year: 2008,
    presidency: 'Cristina Fernández de Kirchner (1.º mandato)',
    electricityUserPaidPct: 42,
    electricitySubsidizedByThirdPartiesPct: 58,
    aysaWaterSubsidizedByNationalTreasuryPct: 52,
    historicalNote: 'Tras la creación de AySA (2006) como empresa estatal nacional para CABA y 26 partidos del GBA, las transferencias del Tesoro Nacional financiadas por las 24 jurisdicciones pasaron a cubrir más de la mitad del costo del agua del AMBA.',
    sourceUrl: 'https://www.argentina.gob.ar/economia/energia'
  },
  {
    year: 2014,
    presidency: 'Cristina Fernández de Kirchner (2.º mandato)',
    electricityUserPaidPct: 14,
    electricitySubsidizedByThirdPartiesPct: 86,
    aysaWaterSubsidizedByNationalTreasuryPct: 78,
    historicalNote: 'Pico histórico de distorsión tarifaria: las boletas residenciales en CABA y GBA cubrían apenas el 14% del costo real de generación eléctrica; el 86% restante lo pagaban terceros vía impuestos nacionales y emisión monetaria (subsidios energéticos > 2,8% del PIB).',
    sourceUrl: 'https://www.opc.gob.ar/'
  },
  {
    year: 2019,
    presidency: 'Mauricio Macri',
    electricityUserPaidPct: 53,
    electricitySubsidizedByThirdPartiesPct: 47,
    aysaWaterSubsidizedByNationalTreasuryPct: 44,
    historicalNote: 'Las revisiones tarifarias integrales (RTI 2016–2018) recompusieron parcialmente la cobertura del costo real hasta ~53%, reduciendo el subsidio cruzado, aunque las devaluaciones de 2018–2019 volvieron a ampliar la brecha dolarizada de generación.',
    sourceUrl: 'https://portalweb.cammesa.com/'
  },
  {
    year: 2022,
    presidency: 'Alberto Fernández',
    electricityUserPaidPct: 22,
    electricitySubsidizedByThirdPartiesPct: 78,
    aysaWaterSubsidizedByNationalTreasuryPct: 74,
    historicalNote: 'Nuevo congelamiento tarifario 2020–2022: un hogar de ingresos altos o medios en CABA/GBA volvió a pagar apenas el 22% del costo real de la electricidad y el 26% del costo de AySA, mientras las provincias del interior abonaban tarifas locales hasta 3 veces superiores.',
    sourceUrl: 'https://www.opc.gob.ar/'
  },
  {
    year: 2024,
    presidency: 'Javier Milei (Inicio recomposición)',
    electricityUserPaidPct: 59,
    electricitySubsidizedByThirdPartiesPct: 41,
    aysaWaterSubsidizedByNationalTreasuryPct: 28,
    historicalNote: 'Actualización del Precio Estacional (PEST), recorte de transferencias corrientes del Tesoro a AySA y quita del subsidio al segmento N1 (altos ingresos) y comercios, manteniendo bonificaciones con tope de consumo en N2 y N3.',
    sourceUrl: 'https://www.argentina.gob.ar/enre'
  },
  {
    year: 2026,
    presidency: 'Javier Milei (Esquema vigente)',
    electricityUserPaidPct: 76,
    electricitySubsidizedByThirdPartiesPct: 24,
    aysaWaterSubsidizedByNationalTreasuryPct: 12,
    historicalNote: 'Los usuarios N1 abonan cerca del 95–100% del costo monómico de generación; el promedio ponderado del sistema cubre ~76% del costo real, persistiendo bonificaciones focalizadas en hogares vulnerables (N2) y diferencias en el Valor Agregado de Distribución (VAD) entre AMBA y provincias.',
    sourceUrl: 'https://portalweb.cammesa.com/'
  }
];

export const CONCEPTUAL_SERVICE_BILLS: ConceptualServiceBill[] = [
  {
    id: 'electricidad',
    serviceName: 'Servicio de Energía Eléctrica (Consumo Residencial Típico 350 kWh/mes)',
    unitDescription: 'Hogar tipo (350 kWh mensuales): Generación (CAMMESA) + Transporte Alta Tensión (Transener) + Distribución (VAD)',
    realFullMonthlyCostArs: 58_000,
    defaultNetBilledByRegionAndSegment: {
      caba: { n1: 55_100, n2: 24_300, n3: 33_600 },
      pba_conurbano: { n1: 56_800, n2: 25_900, n3: 35_200 },
      cordoba: { n1: 72_400, n2: 41_500, n3: 51_800 },
      santa_fe: { n1: 69_900, n2: 39_800, n3: 49_500 }
    },
    taxLinesByRegion: {
      caba: [
        {
          id: 'iva-luz-caba',
          concept: 'IVA Nacional sobre el servicio eléctrico (Ley 20.631)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631 Art. 28 (21% residencial / 27% comercial)',
          constitutionalOrLegalNote: 'Se calcula sobre el subtotal que ya tiene incorporados en el precio mayorista los impuestos en cascada (IIBB y Cheque) de las etapas previas.'
        },
        {
          id: 'iibb-cascada-luz-caba',
          concept: 'Ingresos Brutos (IIBB) trasladado en cascada (Generación + Transporte + Distribución)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 6.8,
          timesChargedInChain: 3,
          legalNorm: 'Código Fiscal CABA (AGIP) + Convenio Multilateral en eslabones mayoristas',
          constitutionalOrLegalNote: 'Efecto piramidación: se cobra en la venta de gas a la central térmica, en la venta de energía a CAMMESA/Transportista y nuevamente en la facturación de la distribuidora.'
        },
        {
          id: 'cheque-cascada-luz-caba',
          concept: 'Impuesto a los Débitos y Créditos Bancarios («Impuesto al Cheque» acumulado)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 3.6,
          timesChargedInChain: 4,
          legalNorm: 'Ley 25.413 (1,2% por transacción bancaria en cada eslabón)',
          constitutionalOrLegalNote: 'Se aplica en cada giro: Usuario → Distribuidora → CAMMESA → Generadora → Productora de gas.'
        },
        {
          id: 'contribucion-municipal-caba',
          concept: 'Contribución Gobierno de CABA sobre facturación eléctrica + Tasa ENRE',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 6.5,
          timesChargedInChain: 2,
          legalNorm: 'Ley Tarifaria CABA y Ley 24.065 (Tasa de Fiscalización ENRE)',
          constitutionalOrLegalNote: 'Grava la misma base imponible que ya tributa IVA e Ingresos Brutos.'
        }
      ],
      pba_conurbano: [
        {
          id: 'iva-luz-pba',
          concept: 'IVA Nacional sobre el servicio eléctrico (Ley 20.631)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631 Art. 28',
          constitutionalOrLegalNote: 'Aplicado sobre el neto tarifario que ya incluye impuestos mayoristas trasladados.'
        },
        {
          id: 'leyes-provinciales-pba',
          concept: 'Leyes Provinciales PBA (Decreto-Ley 7290/67 y Ley 9038 — Fondos Eléctricos + IIBB ARBA)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 15.5,
          timesChargedInChain: 3,
          legalNorm: 'Decreto-Ley 7290/67 (10%), Ley 9038 (5,5%) e IIBB en cadena',
          constitutionalOrLegalNote: 'La Provincia de Buenos Aires adiciona un 15,5% directo en fondos especiales más el IIBB acumulado en las etapas de generación, transporte y distribución.'
        },
        {
          id: 'cheque-cascada-luz-pba',
          concept: 'Impuesto al Cheque acumulado en los 4 eslabones de la cadena eléctrica',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 3.6,
          timesChargedInChain: 4,
          legalNorm: 'Ley 25.413',
          constitutionalOrLegalNote: '4 cobros sucesivos del 1,2% en las transferencias bancarias de la cadena energética.'
        },
        {
          id: 'tasas-municipales-luz-pba',
          concept: 'Contribución Municipal Ley 11.769 (6,424%) + Tasa de Alumbrado / TISH trasladada',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 11.4,
          timesChargedInChain: 2,
          legalNorm: 'Ley PBA 11.769 Art. 75 y Ordenanzas Fiscales Municipales (cuestionadas por Res. 267/2024)',
          constitutionalOrLegalNote: 'Doble cobro frecuente: numerosos municipios del Conurbano cobraban la Tasa de Alumbrado Público adentro de la boleta de luz además de cobrar la Tasa de Servicios Generales (ABL) sobre el inmueble.'
        }
      ],
      cordoba: [
        {
          id: 'iva-luz-cba',
          concept: 'IVA Nacional sobre el servicio eléctrico',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Al ser más alto el VAD (costo de distribución) en el interior, el mismo 21% de IVA representa muchos más pesos por kWh que en CABA.'
        },
        {
          id: 'iibb-fodep-cba',
          concept: 'IIBB en cascada + FODEP (Fondo Desarrollo Energético Provincial 10%) + Tasa ERSeP',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 14.2,
          timesChargedInChain: 3,
          legalNorm: 'Código Tributario Córdoba y Ley Provincial de FODEP',
          constitutionalOrLegalNote: 'Incluye el efecto cascada de IIBB en las 3 etapas más el 10% del Fondo Provincial FODEP.'
        },
        {
          id: 'cheque-cascada-luz-cba',
          concept: 'Impuesto al Cheque acumulado en la cadena',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 3.6,
          timesChargedInChain: 4,
          legalNorm: 'Ley 25.413',
          constitutionalOrLegalNote: 'Múltiple imposición financiera a lo largo de la cadena de pagos.'
        },
        {
          id: 'contribucion-municipal-cba',
          concept: 'Contribución Municipal sobre la Energía (OIM ~9,9%–10%)',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 10.0,
          timesChargedInChain: 2,
          legalNorm: 'Ordenanzas Municipales Córdoba',
          constitutionalOrLegalNote: 'Recargo municipal directo sobre el consumo eléctrico neto.'
        }
      ],
      santa_fe: [
        {
          id: 'iva-luz-sf',
          concept: 'IVA Nacional sobre el servicio eléctrico',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Calculado sobre una tarifa base provincial superior a la del AMBA.'
        },
        {
          id: 'leyes-provinciales-sf',
          concept: 'IIBB en cascada + Leyes Provinciales Santa Fe (Ley 7797 / FER 6% + Energías Renovables)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 11.5,
          timesChargedInChain: 3,
          legalNorm: 'Ley Provincial 7797 y Código Fiscal Santa Fe (API)',
          constitutionalOrLegalNote: 'Acumulación de IIBB en los tres eslabones más fondos eléctricos provinciales.'
        },
        {
          id: 'cheque-cascada-luz-sf',
          concept: 'Impuesto al Cheque acumulado en la cadena',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 3.6,
          timesChargedInChain: 4,
          legalNorm: 'Ley 25.413',
          constitutionalOrLegalNote: 'Cobrado en cada transferencia bancaria del circuito mayorista y minorista.'
        },
        {
          id: 'cuota-alumbrado-municipal-sf',
          concept: 'Cuota Municipal (6% Ley 7797) + Cargo de Alumbrado Público Local',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 7.8,
          timesChargedInChain: 2,
          legalNorm: 'Ley 7797 y Ordenanzas Tributarias Municipales',
          constitutionalOrLegalNote: 'Superposición de tasas locales sobre la misma base imponible energética.'
        }
      ]
    },
    cascadeStages: [
      {
        stageNumber: 1,
        stageName: 'Extracción de Gas / Combustible para Generación Térmica',
        actor: 'Productora Hidrocarburífera (Cuenca Neuquina / Austral)',
        taxApplied: 'IIBB (1.ª vez) + Regalías + Impuesto al Cheque (1.ª vez)',
        statutoryRatePct: 4.2,
        explanation: 'La productora factura el gas a las centrales térmicas incorporando en su precio el primer cobro de Ingresos Brutos y el primer cobro del Impuesto al Cheque.'
      },
      {
        stageNumber: 2,
        stageName: 'Generación Eléctrica y Despacho Mayorista (MEM)',
        actor: 'Centrales Generadoras y CAMMESA',
        taxApplied: 'IIBB (2.ª vez sobre el precio que ya tenía IIBB) + Impuesto al Cheque (2.ª y 3.ª vez)',
        statutoryRatePct: 3.8,
        explanation: 'La generadora vende la electricidad en el Mercado Eléctrico Mayorista. Su base imponible incluye el impuesto de la etapa 1: se cobra impuesto sobre el impuesto.'
      },
      {
        stageNumber: 3,
        stageName: 'Transporte en Alta Tensión y Distribución Troncal',
        actor: 'Transener / Transportistas Regionales',
        taxApplied: 'IIBB (3.ª vez) + Tasa ENRE + Impuesto al Cheque (4.ª vez)',
        statutoryRatePct: 4.0,
        explanation: 'El peaje de transporte vuelve a tributar Ingresos Brutos por Convenio Multilateral y débitos/créditos bancarios.'
      },
      {
        stageNumber: 4,
        stageName: 'Distribución Minorista y Boleta Final al Hogar o Comercio',
        actor: 'Distribuidora (Edenor/Edesur/EPEC/EPE) + Fisco Nacional, Provincial y Municipal',
        taxApplied: 'IVA (21%/27%) + IIBB (4.ª vez) + Leyes Provinciales + Tasas Municipales (6% a 11%)',
        statutoryRatePct: 37.9,
        explanation: 'Sobre el subtotal acumulado se aplican simultáneamente el IVA nacional, los fondos provinciales y las contribuciones municipales. Un mismo servicio termina pagando 3 a 4 veces IIBB, 4 veces Cheque y doble tasa municipal.'
      }
    ],
    federalDisparitySummary: 'Un hogar de igual consumo (350 kWh/mes) en Córdoba o Santa Fe paga históricamente entre un 30% y un 80% más en su factura final que un hogar de CABA. Esto obedece a dos factores combinados: (1) el subsidio nacional al Precio Estacional (CAMMESA) y la regulación nacional de Edenor/Edesur que mantuvo congelado el VAD del AMBA durante años, y (2) los fondos provinciales y tasas municipales adicionales que las provincias y municipios cargan sobre la boleta.',
    officialSources: [
      { label: 'CAMMESA — Informes Mensuales de Precios Estacionales y Costo Monómico', url: 'https://portalweb.cammesa.com/' },
      { label: 'ENRE — Cuadros Tarifarios Edenor y Edesur', url: 'https://www.argentina.gob.ar/enre' },
      { label: 'Resolución 267/2024 (Prohibición de tasas municipales ajenas en boletas de servicios)', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/313698/20240911' }
    ]
  },
  {
    id: 'agua',
    serviceName: 'Servicio de Agua Potable y Desagües Cloacales (Hogar Residencial Tipo)',
    unitDescription: 'Provisión de agua potable y red cloacal (AySA en CABA/GBA vs. prestadores provinciales en el Interior)',
    realFullMonthlyCostArs: 36_000,
    defaultNetBilledByRegionAndSegment: {
      caba: { n1: 31_500, n2: 14_200, n3: 21_600 },
      pba_conurbano: { n1: 29_800, n2: 13_500, n3: 19_900 },
      cordoba: { n1: 36_000, n2: 28_500, n3: 36_000 },
      santa_fe: { n1: 35_200, n2: 27_900, n3: 35_200 }
    },
    taxLinesByRegion: {
      caba: [
        {
          id: 'iva-agua-caba',
          concept: 'IVA Nacional sobre Agua y Cloacas (Ley 20.631)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Grava un servicio esencial básico con la alícuota general del 21%.'
        },
        {
          id: 'iibb-insumos-agua-caba',
          concept: 'Ingresos Brutos en cascada (Energía eléctrica de bombeo + Insumos químicos + Concesión)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 5.4,
          timesChargedInChain: 3,
          legalNorm: 'Código Fiscal CABA / Convenio Multilateral',
          constitutionalOrLegalNote: 'La potabilización requiere uso intensivo de energía eléctrica y coagulantes químicos, cuyos proveedores ya trasladaron IIBB en las etapas previas.'
        },
        {
          id: 'eras-afer-caba',
          concept: 'Tasa de Regulación ERAS / APLA + Impuesto al Cheque en cadena',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 4.8,
          timesChargedInChain: 3,
          legalNorm: 'Marco Regulatorio Ley 26.221 (2,67% ERAS/APLA) + Ley 25.413',
          constitutionalOrLegalNote: 'Cargos regulatorios específicos adicionados antes y después de impuestos.'
        }
      ],
      pba_conurbano: [
        {
          id: 'iva-agua-pba',
          concept: 'IVA Nacional sobre Agua y Cloacas',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Alícuota general del 21% sobre consumo de agua residencial.'
        },
        {
          id: 'iibb-insumos-agua-pba',
          concept: 'Ingresos Brutos ARBA acumulado en insumos, bombeo y operación',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 6.2,
          timesChargedInChain: 3,
          legalNorm: 'Código Fiscal PBA (ARBA)',
          constitutionalOrLegalNote: 'Efecto piramidal de IIBB en proveedores de químicos, energía de bombeo y contratistas de red.'
        },
        {
          id: 'eras-cheque-pba',
          concept: 'Cargo Regulatorio ERAS/APLA (2,67%) + Impuesto al Cheque en cadena + Tasas Locales',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 6.5,
          timesChargedInChain: 3,
          legalNorm: 'Ley 26.221, Ley 25.413 y Ordenanzas Municipales',
          constitutionalOrLegalNote: 'Múltiple imposición sobre la facturación del servicio sanitario.'
        }
      ],
      cordoba: [
        {
          id: 'iva-agua-cba',
          concept: 'IVA Nacional (21%)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Calculado sobre tarifa plena sin subsidio del Tesoro Nacional.'
        },
        {
          id: 'iibb-ersep-cba',
          concept: 'IIBB en cascada + Tasa Regulación ERSeP',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 6.8,
          timesChargedInChain: 3,
          legalNorm: 'Código Tributario Córdoba',
          constitutionalOrLegalNote: 'Tres etapas de IIBB trasladadas al costo operativo de potabilización y distribución.'
        },
        {
          id: 'contribucion-municipal-agua-cba',
          concept: 'Contribución Municipal sobre el Servicio de Agua + Impuesto al Cheque',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 11.2,
          timesChargedInChain: 2,
          legalNorm: 'Ordenanza Municipal Córdoba + Ley 25.413',
          constitutionalOrLegalNote: 'Recargo municipal directo sobre la boleta de agua potable.'
        }
      ],
      santa_fe: [
        {
          id: 'iva-agua-sf',
          concept: 'IVA Nacional (21%)',
          jurisdictionLevel: 'Nación',
          percentageOfNetBill: 21.0,
          timesChargedInChain: 1,
          legalNorm: 'Ley 20.631',
          constitutionalOrLegalNote: 'Aplicado sobre el servicio de Aguas Santafesinas (ASSA).'
        },
        {
          id: 'iibb-enress-sf',
          concept: 'IIBB en cascada + Tasa Regulatoria ENRESS',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 6.5,
          timesChargedInChain: 3,
          legalNorm: 'Código Fiscal Santa Fe y Ley 11.220',
          constitutionalOrLegalNote: 'Traslación acumulada de Ingresos Brutos de insumos y energía.'
        },
        {
          id: 'tasas-locales-agua-sf',
          concept: 'Tasas Municipales e Impuesto al Cheque en cadena',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 5.5,
          timesChargedInChain: 2,
          legalNorm: 'Ordenanzas Municipales + Ley 25.413',
          constitutionalOrLegalNote: 'Superposición de cargos financieros y municipales.'
        }
      ]
    },
    cascadeStages: [
      {
        stageNumber: 1,
        stageName: 'Energía Eléctrica para Bombeo e Insumos Químicos (Sulfato de Aluminio / Cloro)',
        actor: 'Proveedores Industriales y Distribuidoras Eléctricas',
        taxApplied: 'IIBB (1.ª y 2.ª vez) + Impuesto al Cheque (1.ª y 2.ª vez)',
        statutoryRatePct: 4.5,
        explanation: 'El bombeo y la potabilización del agua tienen como principal insumo la electricidad industrial (que ya trae 3 capas de IIBB) y productos químicos gravados con IIBB.'
      },
      {
        stageNumber: 2,
        stageName: 'Operación de Red, Mantenimiento y Facturación al Usuario',
        actor: 'AySA / Aguas Cordobesas / ASSA',
        taxApplied: 'IVA (21%) + IIBB (3.ª vez) + Cargo Regulatorio (ERAS/ERSeP/ENRESS) + Tasas Municipales',
        statutoryRatePct: 31.2,
        explanation: 'Sobre el costo operativo que ya absorbió los impuestos de los insumos se aplica el 21% de IVA, la tasa del ente regulador y las contribuciones municipales.'
      }
    ],
    federalDisparitySummary: 'Durante casi dos décadas (2006–2023), AySA (que presta servicio únicamente en CABA y 26 municipios del Gran Buenos Aires) recibió miles de millones de dólares del Tesoro Nacional —formado con el IVA, Ganancias y Retenciones de las 23 provincias— para cubrir hasta el 78% de sus costos operativos y obras, mientras el resto de las provincias financiaba sus empresas de agua con recursos locales o tarifa plena.',
    officialSources: [
      { label: 'ERAS — Ente Regulador de Agua y Saneamiento (Cuadros Tarifarios AySA)', url: 'https://www.argentina.gob.ar/eras' },
      { label: 'Oficina de Presupuesto del Congreso (OPC) — Transferencias a Empresas Públicas', url: 'https://www.opc.gob.ar/' }
    ]
  },
  {
    id: 'abl_inmobiliario',
    serviceName: 'Tasa Municipal (ABL / TSG) + Impuesto Inmobiliario Provincial sobre la Misma Propiedad',
    unitDescription: 'Vivienda familiar urbana media: coexistencia de Impuesto Inmobiliario, Tasa de Servicios Generales (ABL) y cargos en boletas de servicios',
    realFullMonthlyCostArs: 24_000,
    defaultNetBilledByRegionAndSegment: {
      caba: { n1: 24_000, n2: 24_000, n3: 24_000 },
      pba_conurbano: { n1: 24_000, n2: 24_000, n3: 24_000 },
      cordoba: { n1: 24_000, n2: 24_000, n3: 24_000 },
      santa_fe: { n1: 24_000, n2: 24_000, n3: 24_000 }
    },
    taxLinesByRegion: {
      caba: [
        {
          id: 'inmobiliario-abl-unificado-caba',
          concept: 'Impuesto Inmobiliario + Tasa Retributiva de Alumbrado, Barrido y Limpieza (AGIP)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 28.0,
          timesChargedInChain: 2,
          legalNorm: 'Código Fiscal CABA (Actualización mensual IPC + coeficiente geográfico)',
          constitutionalOrLegalNote: 'En CABA la boleta unifica el Impuesto Inmobiliario (tributo patrimonial) con la tasa retributiva de ABL.'
        },
        {
          id: 'contribucion-alumbrado-boleta-luz-caba',
          concept: 'Contribución sobre el consumo eléctrico y cargos indirectos de contratistas de higiene urbana (IIBB + IVA)',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 14.5,
          timesChargedInChain: 3,
          legalNorm: 'Ley Tarifaria CABA + Ley 25.413',
          constitutionalOrLegalNote: 'Las empresas contratistas de recolección de residuos facturan al Gobierno de la Ciudad con IVA (21%), IIBB e Impuesto al Cheque, encareciendo el costo presupuestario que luego se traslada a la tasa de ABL.'
        }
      ],
      pba_conurbano: [
        {
          id: 'inmobiliario-arba-pba',
          concept: 'Impuesto Inmobiliario Urbano Provincial (ARBA — 1.º cobro sobre el mismo inmueble)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 32.0,
          timesChargedInChain: 2,
          legalNorm: 'Ley Impositiva PBA (ARBA)',
          constitutionalOrLegalNote: 'Grava la capacidad contributiva patrimonial del mismo inmueble que simultáneamente tributa TSG municipal y Bienes Personales nacional.'
        },
        {
          id: 'tsg-abl-municipal-pba',
          concept: 'Tasa por Servicios Generales (TSG / ABL Municipal — 2.º cobro sobre la misma valuación/frente)',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 25.0,
          timesChargedInChain: 3,
          legalNorm: 'Ordenanzas Fiscales Municipales (Conurbano PBA)',
          constitutionalOrLegalNote: 'Aunque jurídicamente es una «tasa» que exige contraprestación efectiva y proporcional al costo del servicio (CSJN), numerosos municipios la calculan como un porcentaje de la valuación fiscal del inmueble + recargos de seguridad, salud o vialidad.'
        },
        {
          id: 'doble-cobro-alumbrado-pba',
          concept: 'Tasa de Alumbrado Público cobrada por separado o en boleta de electricidad (3.º cobro sobre el mismo servicio)',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 15.0,
          timesChargedInChain: 3,
          legalNorm: 'Convenios Ley 10.740 PBA (restringidos por Resolución 267/2024)',
          constitutionalOrLegalNote: 'Doble imposición directa cuando el vecino abona simultáneamente la Tasa de Alumbrado, Barrido y Limpieza (ABL) al municipio y un cargo adicional por «Alumbrado Público» en la factura eléctrica.'
        }
      ],
      cordoba: [
        {
          id: 'inmobiliario-rentas-cba',
          concept: 'Impuesto Inmobiliario Provincial (Rentas Córdoba + Fondos Provinciales)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 30.0,
          timesChargedInChain: 2,
          legalNorm: 'Código Tributario Provincial Córdoba',
          constitutionalOrLegalNote: 'Primer gravamen sobre la propiedad raíz urbana.'
        },
        {
          id: 'contribucion-inmueble-municipal-cba',
          concept: 'Contribución Municipal que incide sobre los Inmuebles + Sobretasas',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 24.0,
          timesChargedInChain: 2,
          legalNorm: 'Código Tributario Municipal',
          constitutionalOrLegalNote: 'Segundo gravamen sobre la misma base catastral, más la contribución del 10% en la boleta de EPEC para alumbrado/infraestructura.'
        }
      ],
      santa_fe: [
        {
          id: 'inmobiliario-api-sf',
          concept: 'Impuesto Inmobiliario Provincial (API Santa Fe)',
          jurisdictionLevel: 'Provincia',
          percentageOfNetBill: 27.0,
          timesChargedInChain: 2,
          legalNorm: 'Ley Impositiva Santa Fe',
          constitutionalOrLegalNote: 'Primer gravamen patrimonial provincial sobre el inmueble.'
        },
        {
          id: 'tgi-municipal-sf',
          concept: 'Tasa General de Inmuebles (TGI Municipal) + Adicionales locales',
          jurisdictionLevel: 'Municipio',
          percentageOfNetBill: 26.0,
          timesChargedInChain: 2,
          legalNorm: 'Ordenanza General Impositiva Municipal',
          constitutionalOrLegalNote: 'Segundo gravamen sobre el mismo inmueble, coexistiendo con la cuota de alumbrado en la factura de la EPE.'
        }
      ]
    },
    cascadeStages: [
      {
        stageNumber: 1,
        stageName: 'Impuesto Nacional sobre Bienes Personales (cuando supera el mínimo)',
        actor: 'ARCA (Nación)',
        taxApplied: 'Bienes Personales (1.ª imposición sobre el patrimonio inmobiliario)',
        statutoryRatePct: 0.5,
        explanation: 'Grava la titularidad patrimonial del inmueble a nivel federal.'
      },
      {
        stageNumber: 2,
        stageName: 'Impuesto Inmobiliario Provincial',
        actor: 'ARBA / Rentas Córdoba / API Santa Fe / AGIP',
        taxApplied: 'Impuesto Inmobiliario (2.ª imposición sobre el mismo inmueble)',
        statutoryRatePct: 1.2,
        explanation: 'Grava anualmente la misma propiedad inmueble a nivel provincial.'
      },
      {
        stageNumber: 3,
        stageName: 'Tasa Municipal de Servicios Generales (ABL / TSG / TGI)',
        actor: 'Municipio Local',
        taxApplied: 'Tasa Municipal calculada por valuación fiscal + Recargos de Alumbrado en boleta eléctrica (3.ª y 4.ª imposición)',
        statutoryRatePct: 1.8,
        explanation: 'El municipio cobra la tasa de ABL sobre la valuación del inmueble y, en muchos distritos, vuelve a cobrar el alumbrado público como porcentaje de la boleta de luz.'
      }
    ],
    federalDisparitySummary: 'Un mismo inmueble urbano en Argentina puede ser gravado hasta 4 veces por distintos niveles del Estado: (1) Bienes Personales (Nación), (2) Impuesto Inmobiliario (Provincia), (3) Tasa de Servicios Generales / ABL (Municipio) y (4) Contribución por Alumbrado Público incluida dentro de la factura de electricidad.',
    officialSources: [
      { label: 'Ley 23.548 de Coparticipación Federal — Art. 9 inc. b) (Prohibición de doble imposición y requisito de tasas retributivas)', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21108/texact.htm' },
      { label: 'Resolución 267/2024 — Prohibición de incluir tasas municipales ajenas en boletas de servicios públicos', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/313698/20240911' }
    ]
  }
];
