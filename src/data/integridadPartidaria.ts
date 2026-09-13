import { POLITICAL_TRANSPARENCY, PoliticalTransparencyRecord } from './transparenciaPolitica';

export type JudicialBucket = 'condena_firme' | 'condena_no_firme' | 'procesamiento' | 'juicio' | 'sobreseimiento' | 'absolucion' | 'otro';

export interface PartyRegistryEntry {
  id: string;
  name: string;
  aliases: string[];
  nationalOrder?: number;
  status: 'vigente_nacional' | 'historico' | 'alianza' | 'pendiente';
  sourceUrl: string;
  sourceLabel: string;
  coverageFrom: number;
  coverageTo: number;
  coverageNote: string;
}

export interface PartyIntegrityStats {
  partyId: string;
  peopleCovered: number;
  judicialRecords: number;
  finalConvictions: number;
  nonFinalConvictions: number;
  prosecutions: number;
  trials: number;
  acquittalsOrDismissals: number;
  denominatorReliable: boolean;
}

export const PARTY_REGISTRY_SOURCES = {
  cneCurrent: 'https://www.electoral.gob.ar/nuevo/paginas/btn/ap.php',
  nationalCharters: 'https://www.argentina.gob.ar/partidos-politicos/cartas-organicas',
  affiliationLaw: 'https://www.argentina.gob.ar/normativa/nacional/161453/actualizacion',
  corruptionCases: 'https://www.cij.gov.ar/causas-de-corrupcion.html',
  judicialDecisions: 'https://www.cij.gov.ar/es/sentencias.html',
  pjnCaseSearch: 'https://servicios.pjn.gov.ar/V_2/PF/consultas_expedientes.php'
};

/**
 * Registro inicial de entidades con carta orgánica publicada por el Estado.
 * La CNE es la fuente de vigencia: al 30/04/2026 informaba 44 partidos nacionales.
 * Como la página de cartas orgánicas contiene más entradas, cada una queda en estado
 * "pendiente" hasta cotejarla individualmente con el listado vigente de la CNE.
 */
export const PARTY_REGISTRY: PartyRegistryEntry[] = [
  ['mid','Movimiento de Integración y Desarrollo (MID)',1],
  ['pj','Partido Justicialista',2],
  ['ucr','Unión Cívica Radical',3],
  ['pdc','Partido Demócrata Cristiano',5],
  ['pi','Partido Intransigente',6],
  ['pf','Partido Federal',8],
  ['pdp','Partido Demócrata Progresista',9],
  ['pc','Partido Comunista',12],
  ['mas','Movimiento al Socialismo',13],
  ['pcp','Partido Conservador Popular',19],
  ['up','Unión Popular',23],
  ['unir','Unir',33],
  ['pan','Partido Autonomista Nacional',36],
  ['mst','Movimiento Socialista de los Trabajadores (MST)',38],
  ['libres_sur','Movimiento Libres del Sur',40],
  ['frente_grande','Partido Frente Grande',41],
  ['cc_ari','Coalición Cívica - Afirmación Para Una República Igualitaria (ARI)',47],
  ['ps','Partido Socialista',50],
  ['partido_victoria','Partido de la Victoria',54],
  ['mav','Movimiento de Acción Vecinal',57],
  ['izq_opcion_socialista','Izquierda por una Opción Socialista',61],
  ['pro','Pro-Propuesta Republicana',64],
  ['solidario','Partido Solidario',66],
  ['kolina','Kolina',67],
  ['nueva_izquierda','Nueva Izquierda',68],
  ['gen','Gen',69],
  ['pts','Partido de Trabajadores por el Socialismo',70],
  ['partido_obrero_71','Partido del Obrero',71],
  ['unidad_popular','Instrumento Electoral por la Unidad Popular',72],
  ['ede','Encuentro por la Democracia y la Equidad',73],
  ['ptp','Partido del Trabajo y del Pueblo',74],
  ['forja','Partido de la Concertación Forja',75],
  ['cultura_educacion_trabajo','Partido de la Cultura la Educación y el Trabajo',76],
  ['fe','Partido Fe',77],
  ['p3p','Partido Tercera Posición P3P',78],
  ['renovador_federal','Partido Renovador Federal',79],
  ['compromiso_federal','Compromiso Federal',82],
  ['proyecto_sur','Movimiento Político, Social y Cultural Proyecto Sur',83],
  ['pte','Partido del Trabajo y la Equidad',84],
  ['democrata','Partido Demócrata',85],
  ['fra','Frente Renovador Auténtico',86],
  ['unite','Unite por la Libertad y la Dignidad',87],
  ['dignidad_popular','Partido Dignidad Popular',88],
  ['partido_obrero_89','Partido Obrero',89],
  ['mijd','Movimiento Izquierda Juventud Dignidad',90]
].map(([id, name, nationalOrder]) => ({
  id: String(id),
  name: String(name),
  aliases: [],
  nationalOrder: Number(nationalOrder),
  status: 'pendiente' as const,
  sourceUrl: PARTY_REGISTRY_SOURCES.nationalCharters,
  sourceLabel: 'Argentina.gob.ar — cartas orgánicas de partidos de orden nacional',
  coverageFrom: 1983,
  coverageTo: 2026,
  coverageNote: 'Carta orgánica publicada. La vigencia nacional 2026 debe cotejarse individualmente con el listado de agrupaciones vigentes de la Cámara Nacional Electoral. La nómina histórica de personas desde 1983 se completa sólo con fuentes oficiales.'
}));

export const HISTORICAL_PARTY_FAMILIES: PartyRegistryEntry[] = [
  { id: 'lla', name: 'La Libertad Avanza', aliases: ['LLA'], status: 'alianza', sourceUrl: PARTY_REGISTRY_SOURCES.cneCurrent, sourceLabel: 'Cámara Nacional Electoral', coverageFrom: 2021, coverageTo: 2026, coverageNote: 'Cobertura histórica parcial; se registran sólo personas con pertenencia/candidatura verificable.' },
  { id: 'uxp', name: 'Unión por la Patria', aliases: ['UxP'], status: 'alianza', sourceUrl: PARTY_REGISTRY_SOURCES.cneCurrent, sourceLabel: 'Cámara Nacional Electoral', coverageFrom: 2023, coverageTo: 2026, coverageNote: 'Alianza electoral; no debe confundirse automáticamente con afiliación al PJ u otro partido integrante.' },
  { id: 'fdt', name: 'Frente de Todos', aliases: ['FdT'], status: 'historico', sourceUrl: PARTY_REGISTRY_SOURCES.cneCurrent, sourceLabel: 'Cámara Nacional Electoral / registros electorales', coverageFrom: 2019, coverageTo: 2023, coverageNote: 'Alianza electoral histórica.' },
  { id: 'cambiemos', name: 'Cambiemos / Juntos por el Cambio', aliases: ['JxC'], status: 'historico', sourceUrl: PARTY_REGISTRY_SOURCES.cneCurrent, sourceLabel: 'Cámara Nacional Electoral / registros electorales', coverageFrom: 2015, coverageTo: 2023, coverageNote: 'Familia de alianzas electorales; la pertenencia individual se registra por elección/período.' }
];

export const ALL_PARTY_ENTITIES = [...PARTY_REGISTRY, ...HISTORICAL_PARTY_FAMILIES];

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function peopleForParty(party: PartyRegistryEntry): PoliticalTransparencyRecord[] {
  const names = [party.name, ...party.aliases].map(normalize);
  return POLITICAL_TRANSPARENCY.filter(person => {
    const memberships = person.memberships || [];
    const values = [person.party, ...memberships.map(m => m.party)].map(normalize);
    return values.some(value => names.some(name => value.includes(name) || name.includes(value)));
  });
}

function bucketJudicialStatus(status: string): JudicialBucket {
  const s = normalize(status);
  if (s.includes('condena firme') || s.includes('firme')) return 'condena_firme';
  if (s.includes('condena')) return 'condena_no_firme';
  if (s.includes('proces')) return 'procesamiento';
  if (s.includes('juicio') || s.includes('elevacion')) return 'juicio';
  if (s.includes('sobresei')) return 'sobreseimiento';
  if (s.includes('absol')) return 'absolucion';
  return 'otro';
}

export function integrityStats(party: PartyRegistryEntry): PartyIntegrityStats {
  const people = peopleForParty(party);
  const buckets = people.flatMap(p => p.judicial.map(j => bucketJudicialStatus(j.status)));
  return {
    partyId: party.id,
    peopleCovered: people.length,
    judicialRecords: buckets.length,
    finalConvictions: buckets.filter(b => b === 'condena_firme').length,
    nonFinalConvictions: buckets.filter(b => b === 'condena_no_firme').length,
    prosecutions: buckets.filter(b => b === 'procesamiento').length,
    trials: buckets.filter(b => b === 'juicio').length,
    acquittalsOrDismissals: buckets.filter(b => b === 'absolucion' || b === 'sobreseimiento').length,
    denominatorReliable: false
  };
}

export const PARTY_INTEGRITY_METHOD = {
  title: 'Metodología de integridad partidaria',
  notes: [
    'La afiliación privada no se publica ni se reconstruye. La ley restringe el acceso de terceros a la situación individual de afiliación; sólo se indexan autoridades partidarias, candidatos y funcionarios cuya pertenencia sea pública y verificable.',
    'Una denuncia no equivale a culpabilidad. Los estados judiciales se reproducen según resolución/expediente oficial y se distinguen procesamiento, juicio, condena, absolución y sobreseimiento.',
    'No se publica un ranking de “partidos más corruptos” por conteo bruto. Un partido más antiguo o numeroso tendría más exposición. Sólo se muestran tasas cuando el denominador histórico de personas cubiertas es suficientemente completo y comparable.',
    'La base de causas de corrupción del CIJ es una fuente primaria útil para causas federales/nacionales, pero no agota causas provinciales ni toda la historia desde 1983.'
  ]
};
