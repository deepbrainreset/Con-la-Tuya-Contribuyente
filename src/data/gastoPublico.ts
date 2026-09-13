/**
 * Registro auditable de gasto público.
 * Ningún dato se considera comparable si no hay fuente y período explícitos.
 */

export type SpendingLevel = 'Nación' | 'Provincia' | 'Municipio';
export type ComparisonStatus = 'comparable' | 'no_concluyente' | 'sin_referencia';

export interface SpendingSource { label: string; url: string; official: boolean; retrievedAt: string; }
export interface SpendingCategory { id: string; name: string; amount: number | null; share: number | null; description: string; sourceUrl: string; sourceLabel: string; period: string; }
export interface SpendingJurisdiction { id: string; name: string; level: SpendingLevel; period: string; approvedBudget: number | null; executedBudget: number | null; executedAsOf?: string; categories: SpendingCategory[]; sources: SpendingSource[]; evidenceNote: string; }
export interface PublicPurchase { id: string; jurisdictionId: string; agency: string; processNumber: string; fileNumber: string; description: string; date: string; officialUrl: string; item: string; specification: string; quantity: number | null; awardedUnitPrice: number | null; awardedTotal: number | null; supplier?: string; privateReferenceUnitPrice: number | null; privateReferenceUrl?: string; privateReferenceLabel?: string; comparisonStatus: ComparisonStatus; comparisonNote: string; }
export interface PublicAdvertisingAllocation { id: string; jurisdictionId: string; mediumName: string; mediumType: 'TV abierta' | 'TV cable' | 'Radio' | 'Gráfica' | 'Web' | 'Redes' | 'Otro'; province: string; locality: string; period: string; amount: number; sourceUrl: string; sourceLabel: string; note?: string; }
export interface PublicAdvertisingStatus { jurisdictionId: string; period: string; status: 'published' | 'partial' | 'suspended' | 'not_verified'; summary: string; sourceUrl?: string; sourceLabel?: string; }

const NATIONAL_TOTAL_2026 = 148_069_293_526_549;

export const SPENDING_JURISDICTIONS: SpendingJurisdiction[] = [
  {
    id: 'nacion', name: 'Administración Nacional', level: 'Nación', period: '2026', approvedBudget: NATIONAL_TOTAL_2026, executedBudget: null, executedAsOf: '26/08/2026',
    evidenceNote: 'El presupuesto aprobado proviene de la Ley 27.798. La ejecución debe consultarse en Presupuesto Abierto/eSidif y no se replica como cifra estática hasta cargar un corte verificable.',
    sources: [
      { label: 'Ley 27.798 — Presupuesto Administración Nacional 2026', url: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', official: true, retrievedAt: '2026-09-13' },
      { label: 'Presupuesto Abierto — ejecución y visualizaciones', url: 'https://www.presupuestoabierto.gob.ar/', official: true, retrievedAt: '2026-09-13' },
      { label: 'Presupuesto Ciudadano 2026 — datos abiertos', url: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/datos-abiertos', official: true, retrievedAt: '2026-09-13' }
    ],
    categories: [
      { id: 'servicios-sociales', name: 'Servicios sociales', amount: 106_521_648_374_775, share: 71.94, description: 'Incluye seguridad social, salud, educación y cultura, asistencia social, ciencia, trabajo, vivienda y agua/saneamiento.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', sourceLabel: 'Ley 27.798, art. 1 y planillas', period: '2026' },
      { id: 'deuda-publica', name: 'Deuda pública', amount: 14_119_847_249_890, share: 9.54, description: 'Servicio de la deuda pública según clasificación por finalidad de la Ley 27.798.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', sourceLabel: 'Ley 27.798, art. 1', period: '2026' },
      { id: 'servicios-economicos', name: 'Servicios económicos', amount: 11_457_503_006_150, share: 7.74, description: 'Energía, combustibles, minería, transporte, comunicaciones, agricultura, industria, turismo y otras funciones económicas.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', sourceLabel: 'Ley 27.798, art. 1', period: '2026' },
      { id: 'administracion-gubernamental', name: 'Administración gubernamental', amount: 8_859_071_552_843, share: 5.98, description: 'Administración general, relaciones interiores y exteriores, justicia, conducción ejecutiva y otras funciones gubernamentales.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', sourceLabel: 'Ley 27.798, art. 1', period: '2026' },
      { id: 'defensa-seguridad', name: 'Defensa y seguridad', amount: 7_111_223_342_891, share: 4.80, description: 'Defensa, seguridad interior, sistema penal e inteligencia.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/---422000/texto', sourceLabel: 'Ley 27.798, art. 1', period: '2026' },
      { id: 'seguridad-social', name: 'Seguridad social', amount: 83_443_724_700_000, share: 56.35, description: 'Jubilaciones, pensiones y demás políticas de seguridad social. Importe del Presupuesto Ciudadano 2026.', sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf', sourceLabel: 'Presupuesto Ciudadano 2026', period: '2026' },
      { id: 'salud', name: 'Salud', amount: 8_822_143_600_000, share: 5.96, description: 'Programas y prestaciones de salud financiados por la Administración Nacional.', sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf', sourceLabel: 'Presupuesto Ciudadano 2026', period: '2026' },
      { id: 'educacion-cultura', name: 'Educación y cultura', amount: 7_742_689_000_000, share: 5.23, description: 'Universidades, alfabetización, becas, comedores escolares, vouchers y otras políticas educativas/culturales.', sourceUrl: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/educacion', sourceLabel: 'Presupuesto Ciudadano 2026 — Educación', period: '2026' },
      { id: 'energia', name: 'Energía, combustibles y minería', amount: 6_453_085_000_000, share: 4.36, description: 'Políticas energéticas, combustibles y minería.', sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/presupuesto_ciudadano2026.pdf', sourceLabel: 'Presupuesto Ciudadano 2026', period: '2026' },
      { id: 'pauta', name: 'Pauta / publicidad oficial', amount: null, share: null, description: 'La pauta se audita por período, organismo, campaña, medio y proveedor. Para 2026 la Administración Central mantiene suspendidas las campañas institucionales onerosas; la plataforma no extrapola esa suspensión a todo el sector público nacional.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/norma-422032/normas-modificadas', sourceLabel: 'Resolución 57/2025 — suspensión prorrogada durante 2026', period: '2026' }
    ]
  },
  {
    id: 'buenos_aires', name: 'Provincia de Buenos Aires', level: 'Provincia', period: '2026', approvedBudget: 43_021_244_867_935, executedBudget: null, executedAsOf: 'II trimestre 2026', categories: [],
    evidenceNote: 'El presupuesto 2026 surge de la Ley 15.557. La Provincia publica informes trimestrales de ejecución; los rubros individuales sólo se completan cuando la fuente permite asignarlos sin mezclar clasificaciones.',
    sources: [
      { label: 'Ley 15.557 — Presupuesto PBA 2026', url: 'https://www.argentina.gob.ar/normativa/provincial/ley-15557-123456789-0abc-defg-755-5100bvorpyel/actualizacion', official: true, retrievedAt: '2026-09-13' },
      { label: 'PBA — ejecución presupuestaria 2026', url: 'https://www.gba.gob.ar/economia/direccion_provincial_de_presupuesto_publico/ejecucion_presupuestaria', official: true, retrievedAt: '2026-09-13' }
    ]
  },
  {
    id: 'provincias', name: 'Provincias — cobertura federal', level: 'Provincia', period: 'Último dato oficial disponible', approvedBudget: null, executedBudget: null,
    evidenceNote: 'La estructura está preparada para cada provincia. Los datos deben incorporarse desde presupuesto/ejecución provincial o la Dirección Nacional de Asuntos Provinciales; no se extrapola el presupuesto nacional.',
    sources: [{ label: 'Ejecución presupuestaria provincial — gastos por finalidad y función', url: 'https://www.argentina.gob.ar/economia/sechacienda/coordinacion-fiscal-provincial/ejecucion-presupuestaria-provincial/gastos-por', official: true, retrievedAt: '2026-09-13' }], categories: []
  },
  {
    id: 'municipios', name: 'Municipios — cobertura local', level: 'Municipio', period: 'Último dato oficial disponible', approvedBudget: null, executedBudget: null,
    evidenceNote: 'Cada municipio debe vincularse con su presupuesto, ejecución, boletín oficial y portal de compras. Si la fuente local no publica el dato, se informa como faltante.', sources: [], categories: []
  }
];

export const PUBLIC_ADVERTISING_STATUS: PublicAdvertisingStatus[] = [
  { jurisdictionId: 'nacion', period: '2026', status: 'suspended', summary: 'La Administración Central mantiene suspendidas durante 2026 las campañas institucionales de publicidad y comunicación con carácter oneroso. La norma no debe interpretarse como gasto cero de todo el sector público nacional, porque su alcance institucional es específico.', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/norma-422032/normas-modificadas', sourceLabel: 'Resolución 57/2025' },
  { jurisdictionId: 'buenos_aires', period: '2026', status: 'partial', summary: 'La Provincia de Buenos Aires mantiene un Registro Oficial de Medios Publicitarios y exige tarifarios. La plataforma todavía no localizó una publicación consolidada 2026 con el monto efectivamente pagado a cada canal/medio.', sourceUrl: 'https://www.gba.gob.ar/comunicacion_publica/registro_oficial_de_medios_publicitarios', sourceLabel: 'Registro Oficial de Medios Publicitarios PBA' }
];

export const PUBLIC_ADVERTISING_ALLOCATIONS: PublicAdvertisingAllocation[] = [
  { id: 'nac-2021-22-telefe', jurisdictionId: 'nacion', mediumName: 'Canal 11 Telefe', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 162_578_625, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-artear', jurisdictionId: 'nacion', mediumName: 'Canal 13 ARTEAR', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 154_749_441, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-america', jurisdictionId: 'nacion', mediumName: 'Canal 2 América TV', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 131_288_025, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-canal9', jurisdictionId: 'nacion', mediumName: 'Canal 9 TELEARTE', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 75_556_332.5, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-nettv', jurisdictionId: 'nacion', mediumName: 'NET TV', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'CABA', period: '01/09/2021–30/04/2022', amount: 53_894_912.5, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-tvpublica', jurisdictionId: 'nacion', mediumName: 'Canal 7 TV Pública', mediumType: 'TV abierta', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 40_662_806.25, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' },
  { id: 'nac-2021-22-tn', jurisdictionId: 'nacion', mediumName: 'TN', mediumType: 'TV cable', province: 'Capital Federal', locality: 'Capital Federal', period: '01/09/2021–30/04/2022', amount: 200_164_250, sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/informe_inversion_al_30-5.pdf', sourceLabel: 'Publicidad Oficial — informe oficial 2021/22' }
];

export const PUBLIC_PURCHASES: PublicPurchase[] = [
  {
    id: 'ign-libreria-2026-cuaderno-a4', jurisdictionId: 'nacion', agency: 'Instituto Geográfico Nacional — División Compras y Contrataciones', processNumber: '41-0009-CDI26', fileNumber: 'EX-2026-40939692-APN-DGAYRRHH#IGN', description: 'Adquisición de artículos de librería', date: '2026-08-12',
    officialUrl: 'https://comprar.gob.ar/PLIEGO/VistaPreviaPliegoCiudadano.aspx?qs=BQoBkoMoEhzQUm15E1kOs0uAK%2F64cBtwt6RDLvIDTkhMOf6sx%7C3zLMqNMrMNA7JF64kUjiyM00mM35pOVWNYTg%3D%3D',
    item: 'Cuaderno / papeles encuadernados A4, 80 hojas, espiralado', specification: 'Renglones 1 y 2: A4, 80 hojas, espiralado cuadriculado/rayado. Cantidades: 150 y 100 unidades.', quantity: 250, awardedUnitPrice: null, awardedTotal: null,
    privateReferenceUnitPrice: 2800, privateReferenceUrl: 'https://origamilibreria.mitiendanube.com/productos/cuaderno-espiralado-a4-asamblea-80-hojas-rayadas-coleccion-ciudades-del-mundo-1gjvn/', privateReferenceLabel: 'Referencia minorista visible: cuaderno A4 espiralado, 80 hojas rayadas — $2.800 (consulta 13/09/2026)', comparisonStatus: 'no_concluyente',
    comparisonNote: 'La referencia privada es orientativa y no alcanza para afirmar sobreprecio: falta asociar el precio unitario adjudicado del renglón y verificar equivalencia de tapa, gramaje, marca/calidad, volumen, entrega e impuestos. Hasta entonces el resultado permanece como comparación no concluyente.'
  }
];
