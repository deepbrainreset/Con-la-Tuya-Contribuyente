/**
 * Registro auditable de gasto público.
 * Ningún dato se considera comparable si no hay fuente y período explícitos.
 */

export type SpendingLevel = 'Nación' | 'Provincia' | 'Municipio';
export type ComparisonStatus = 'comparable' | 'no_concluyente' | 'sin_referencia';

export interface SpendingSource {
  label: string;
  url: string;
  official: boolean;
  retrievedAt: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number | null;
  share: number | null;
  description: string;
  sourceUrl: string;
  sourceLabel: string;
  period: string;
}

export interface SpendingJurisdiction {
  id: string;
  name: string;
  level: SpendingLevel;
  period: string;
  approvedBudget: number | null;
  executedBudget: number | null;
  executedAsOf?: string;
  categories: SpendingCategory[];
  sources: SpendingSource[];
  evidenceNote: string;
}

export interface PublicPurchase {
  id: string;
  jurisdictionId: string;
  agency: string;
  processNumber: string;
  fileNumber: string;
  description: string;
  date: string;
  officialUrl: string;
  item: string;
  specification: string;
  quantity: number | null;
  awardedUnitPrice: number | null;
  awardedTotal: number | null;
  supplier?: string;
  privateReferenceUnitPrice: number | null;
  privateReferenceUrl?: string;
  privateReferenceLabel?: string;
  comparisonStatus: ComparisonStatus;
  comparisonNote: string;
}

const NATIONAL_TOTAL_2026 = 148_069_293_526_549;

export const SPENDING_JURISDICTIONS: SpendingJurisdiction[] = [
  {
    id: 'nacion',
    name: 'Administración Nacional',
    level: 'Nación',
    period: '2026',
    approvedBudget: NATIONAL_TOTAL_2026,
    executedBudget: null,
    executedAsOf: '26/08/2026',
    evidenceNote: 'El presupuesto aprobado proviene de la Ley 27.798. La ejecución debe consultarse en Presupuesto Abierto/eSidif y no se replica como cifra estática hasta cargar un corte verificable.',
    sources: [
      {
        label: 'Ley 27.798 — Presupuesto Administración Nacional 2026',
        url: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        official: true,
        retrievedAt: '2026-09-13'
      },
      {
        label: 'Presupuesto Abierto — ejecución y visualizaciones',
        url: 'https://www.presupuestoabierto.gob.ar/',
        official: true,
        retrievedAt: '2026-09-13'
      },
      {
        label: 'Presupuesto Ciudadano 2026 — datos abiertos',
        url: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/datos-abiertos',
        official: true,
        retrievedAt: '2026-09-13'
      }
    ],
    categories: [
      {
        id: 'servicios-sociales',
        name: 'Servicios sociales',
        amount: 106_521_648_374_775,
        share: 71.94,
        description: 'Incluye seguridad social, salud, educación y cultura, asistencia social, ciencia, trabajo, vivienda y agua/saneamiento.',
        sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        sourceLabel: 'Ley 27.798, art. 1 y planillas',
        period: '2026'
      },
      {
        id: 'deuda-publica',
        name: 'Deuda pública',
        amount: 14_119_847_249_890,
        share: 9.54,
        description: 'Servicio de la deuda pública según clasificación por finalidad de la Ley 27.798.',
        sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        sourceLabel: 'Ley 27.798, art. 1',
        period: '2026'
      },
      {
        id: 'servicios-economicos',
        name: 'Servicios económicos',
        amount: 11_457_503_006_150,
        share: 7.74,
        description: 'Energía, combustibles, minería, transporte, comunicaciones, agricultura, industria, turismo y otras funciones económicas.',
        sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        sourceLabel: 'Ley 27.798, art. 1',
        period: '2026'
      },
      {
        id: 'administracion-gubernamental',
        name: 'Administración gubernamental',
        amount: 8_859_071_552_843,
        share: 5.98,
        description: 'Administración general, relaciones interiores y exteriores, justicia, conducción ejecutiva y otras funciones gubernamentales.',
        sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        sourceLabel: 'Ley 27.798, art. 1',
        period: '2026'
      },
      {
        id: 'defensa-seguridad',
        name: 'Defensa y seguridad',
        amount: 7_111_223_342_891,
        share: 4.80,
        description: 'Defensa, seguridad interior, sistema penal e inteligencia.',
        sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto',
        sourceLabel: 'Ley 27.798, art. 1',
        period: '2026'
      },
      {
        id: 'seguridad-social',
        name: 'Seguridad social',
        amount: 83_443_724_700_000,
        share: 56.35,
        description: 'Jubilaciones, pensiones y demás políticas de seguridad social. Importe del Presupuesto Ciudadano 2026, expresado originalmente en millones de pesos.',
        sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf',
        sourceLabel: 'Presupuesto Ciudadano 2026',
        period: '2026'
      },
      {
        id: 'salud',
        name: 'Salud',
        amount: 8_822_143_600_000,
        share: 5.96,
        description: 'Programas y prestaciones de salud financiados por la Administración Nacional.',
        sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf',
        sourceLabel: 'Presupuesto Ciudadano 2026',
        period: '2026'
      },
      {
        id: 'educacion-cultura',
        name: 'Educación y cultura',
        amount: 7_742_689_000_000,
        share: 5.23,
        description: 'Universidades, alfabetización, becas, comedores escolares, vouchers y otras políticas educativas/culturales.',
        sourceUrl: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/educacion',
        sourceLabel: 'Presupuesto Ciudadano 2026 — Educación',
        period: '2026'
      },
      {
        id: 'energia',
        name: 'Energía, combustibles y minería',
        amount: 6_453_085_000_000,
        share: 4.36,
        description: 'Políticas energéticas, combustibles y minería.',
        sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf',
        sourceLabel: 'Presupuesto Ciudadano 2026',
        period: '2026'
      },
      {
        id: 'pauta',
        name: 'Pauta / publicidad oficial',
        amount: null,
        share: null,
        description: 'La plataforma todavía no cargó un total homogéneo y verificable de pauta para 2026. Debe separarse por organismo, campaña, medio, proveedor y período.',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/visualizacion-en-que-se-gasta',
        sourceLabel: 'Presupuesto Abierto — gasto por objeto',
        period: '2026'
      }
    ]
  },
  {
    id: 'provincias',
    name: 'Provincias — cobertura federal',
    level: 'Provincia',
    period: 'Último dato oficial disponible',
    approvedBudget: null,
    executedBudget: null,
    evidenceNote: 'La estructura está preparada para cada provincia. Los datos deben incorporarse desde presupuesto/ejecución provincial o la Dirección Nacional de Asuntos Provinciales; no se extrapola el presupuesto nacional.',
    sources: [
      {
        label: 'Ejecución presupuestaria provincial — gastos por finalidad y función',
        url: 'https://www.argentina.gob.ar/economia/sechacienda/coordinacion-fiscal-provincial/ejecucion-presupuestaria-provincial/gastos-por',
        official: true,
        retrievedAt: '2026-09-13'
      }
    ],
    categories: []
  },
  {
    id: 'municipios',
    name: 'Municipios — cobertura local',
    level: 'Municipio',
    period: 'Último dato oficial disponible',
    approvedBudget: null,
    executedBudget: null,
    evidenceNote: 'Cada municipio debe vincularse con su presupuesto, ejecución, boletín oficial y portal de compras. Si la fuente local no publica el dato, se informa como faltante.',
    sources: [],
    categories: []
  }
];

export const PUBLIC_PURCHASES: PublicPurchase[] = [
  {
    id: 'ign-libreria-2026-cuaderno-a4',
    jurisdictionId: 'nacion',
    agency: 'Instituto Geográfico Nacional — División Compras y Contrataciones',
    processNumber: '41-0009-CDI26',
    fileNumber: 'EX-2026-40939692-APN-DGAYRRHH#IGN',
    description: 'Adquisición de artículos de librería',
    date: '2026-08-12',
    officialUrl: 'https://comprar.gob.ar/PLIEGO/VistaPreviaPliegoCiudadano.aspx?qs=BQoBkoMoEhzQUm15E1kOs0uAK%2F64cBtwt6RDLvIDTkhMOf6sx%7C3zLMqNMrMNA7JF64kUjiyM00mM35pOVWNYTg%3D%3D',
    item: 'Cuaderno / papeles encuadernados A4, 80 hojas, espiralado',
    specification: 'Renglones 1 y 2: A4, 80 hojas, espiralado cuadriculado/rayado. Cantidades: 150 y 100 unidades.',
    quantity: 250,
    awardedUnitPrice: null,
    awardedTotal: null,
    privateReferenceUnitPrice: 2800,
    privateReferenceUrl: 'https://origamilibreria.mitiendanube.com/productos/cuaderno-espiralado-a4-asamblea-80-hojas-rayadas-coleccion-ciudades-del-mundo-1gjvn/',
    privateReferenceLabel: 'Referencia minorista visible: cuaderno A4 espiralado, 80 hojas rayadas — $2.800 (consulta 13/09/2026)',
    comparisonStatus: 'no_concluyente',
    comparisonNote: 'La referencia privada es orientativa y no alcanza para afirmar sobreprecio: falta asociar el precio unitario adjudicado del renglón y verificar equivalencia de tapa, gramaje, marca/calidad, volumen, entrega e impuestos. Hasta entonces el resultado permanece como comparación no concluyente.'
  }
];
