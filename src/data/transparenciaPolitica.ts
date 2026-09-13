export type VerificationStatus = 'verified' | 'partial' | 'missing';

export interface SourceRef {
  label: string;
  url: string;
  kind: 'official_role' | 'salary' | 'ddjj' | 'judicial' | 'law' | 'vote' | 'party' | 'photo' | 'social' | 'other';
  verifiedAt: string;
}

export interface SalaryRecord {
  period: string;
  grossMonthlyArs: number | null;
  netMonthlyArs: number | null;
  note: string;
  source?: SourceRef;
}

export interface AssetSnapshot {
  period: string;
  declaredTotalArs: number | null;
  declaredIncomeArs?: number | null;
  cashArs?: number | null;
  depositsArs?: number | null;
  note: string;
  source: SourceRef;
}

export interface JudicialRecord {
  title: string;
  status: string;
  courtOrBody: string;
  caseNumber?: string;
  date: string;
  note: string;
  source: SourceRef;
}

export interface FiscalAction {
  title: string;
  actionType: 'decreto' | 'ley' | 'proyecto' | 'promulgacion' | 'voto' | 'ordenanza' | 'resolucion';
  date: string;
  role: string;
  taxOrFee: string;
  outcome: string;
  source: SourceRef;
  vote?: 'AFIRMATIVO' | 'NEGATIVO' | 'ABSTENCION' | 'AUSENTE';
}

export interface PartyMembership {
  party: string;
  from?: string;
  to?: string;
  role?: string;
  source?: SourceRef;
}

export interface OfficialSocialLink {
  network: 'X' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube' | 'Web';
  url: string;
  source?: SourceRef;
}

export interface PoliticalTransparencyRecord {
  id: string;
  name: string;
  role: string;
  jurisdiction: string;
  level: 'Nacion' | 'Provincia' | 'CABA' | 'Municipio' | 'Legislativo';
  party: string;
  roleSource: SourceRef;
  partySource?: SourceRef;
  photoUrl?: string;
  photoSource?: SourceRef;
  officialSocials?: OfficialSocialLink[];
  memberships?: PartyMembership[];
  salary: SalaryRecord[];
  assets: AssetSnapshot[];
  judicial: JudicialRecord[];
  judicialCoverageNote: string;
  fiscalActions: FiscalAction[];
  profileStatus: VerificationStatus;
}

const verifiedAt = '2026-09-13';

export const POLITICAL_TRANSPARENCY: PoliticalTransparencyRecord[] = [
  {
    id: 'javier_milei',
    name: 'Javier Gerardo Milei',
    role: 'Presidente de la Nación',
    jurisdiction: 'República Argentina',
    level: 'Nacion',
    party: 'La Libertad Avanza',
    roleSource: { label: 'Presidencia de la Nación — autoridad vigente', url: 'https://www.argentina.gob.ar/presidencia', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'La Libertad Avanza', role: 'Dirigente / Presidente de la Nación', source: { label: 'Presidencia de la Nación', url: 'https://www.argentina.gob.ar/presidencia', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin remuneración individual oficial verificada cargada. No se publica una cifra inferida ni periodística.' }],
    assets: [{ period: 'Consulta vigente', declaredTotalArs: null, note: 'La Oficina Anticorrupción dispone DDJJ patrimoniales del Poder Ejecutivo Nacional. La cifra total individual no se publica aquí hasta validar una declaración concreta y comparable.', source: { label: 'Oficina Anticorrupción — Declaraciones Juradas', url: 'https://www.argentina.gob.ar/anticorrupcion/transparencia-activa-oficina-anticorrupcion/declaraciones-juradas', kind: 'ddjj', verifiedAt } }],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. Esto no equivale a afirmar que no existan causas.',
    fiscalActions: [],
    profileStatus: 'partial'
  },
  {
    id: 'axel_kicillof',
    name: 'Axel Kicillof',
    role: 'Gobernador de la Provincia de Buenos Aires',
    jurisdiction: 'Provincia de Buenos Aires',
    level: 'Provincia',
    party: 'Unión por la Patria',
    roleSource: { label: 'Argentina.gob.ar — Provincia de Buenos Aires', url: 'https://www.argentina.gob.ar/buenosaires', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'Unión por la Patria', role: 'Gobernador', source: { label: 'Provincia de Buenos Aires', url: 'https://www.argentina.gob.ar/buenosaires', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin remuneración individual oficial verificada cargada para el período.' }],
    assets: [{ period: '2025', declaredTotalArs: null, note: 'La Provincia publica el sistema y nóminas de DDJJ patrimoniales. El patrimonio individual se mostrará sólo cuando se extraiga y valide la declaración correspondiente.', source: { label: 'Provincia de Buenos Aires — DDJJ patrimoniales', url: 'https://www.gba.gob.ar/justicia_y_ddhh/DDJJ', kind: 'ddjj', verifiedAt } }],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. No se infiere ausencia de causas.',
    fiscalActions: [],
    profileStatus: 'partial'
  },
  {
    id: 'jorge_macri',
    name: 'Jorge Macri',
    role: 'Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires',
    jurisdiction: 'Ciudad Autónoma de Buenos Aires',
    level: 'CABA',
    party: 'PRO',
    roleSource: { label: 'GCBA — Jefatura de Gobierno / DDJJ', url: 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'PRO', role: 'Jefe de Gobierno', source: { label: 'GCBA — Jefatura de Gobierno', url: 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin recibo o escala individual oficial 2026 cargada. La DDJJ no se usa como sustituto automático de sueldo mensual.' }],
    assets: [
      { period: '2024', declaredTotalArs: null, declaredIncomeArs: 81369174, cashArs: 299187500, depositsArs: 87013839, note: 'Valores visibles en la DDJJ de actualización 2024. No se calcula patrimonio total sin sumar y validar todos los rubros de la declaración.', source: { label: 'GCBA — DDJJ Jorge Macri, actualización 2024', url: 'https://buenosaires.gob.ar/sites/default/files/2025-07/45092-20173668814.pdf', kind: 'ddjj', verifiedAt } },
      { period: '2025', declaredTotalArs: null, note: 'Existe DDJJ de actualización 2025 publicada por GCBA. Pendiente extracción estructurada para comparación patrimonial homogénea.', source: { label: 'GCBA — Jefatura de Gobierno, DDJJ 2025', url: 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0', kind: 'ddjj', verifiedAt } }
    ],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. No se infiere ausencia de causas.',
    fiscalActions: [],
    profileStatus: 'partial'
  },
  {
    id: 'jose_luis_espert_2024',
    name: 'José Luis Espert',
    role: 'Diputado nacional al momento de la votación',
    jurisdiction: 'Buenos Aires / Cámara de Diputados',
    level: 'Legislativo',
    party: 'La Libertad Avanza (bloque al momento de la votación)',
    roleSource: { label: 'HCDN — perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/jespert', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'La Libertad Avanza', role: 'Bloque al momento de la votación', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [{ title: 'Insistencia del Título V — Impuesto a las Ganancias', actionType: 'voto', date: '2024-06-28', role: 'Diputado nacional', taxOrFee: 'Impuesto a las Ganancias', outcome: 'Voto nominal afirmativo', vote: 'AFIRMATIVO', source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt } }],
    profileStatus: 'partial'
  },
  {
    id: 'cristian_ritondo_2024',
    name: 'Cristian Ritondo',
    role: 'Diputado nacional al momento de la votación',
    jurisdiction: 'Buenos Aires / Cámara de Diputados',
    level: 'Legislativo',
    party: 'PRO',
    roleSource: { label: 'HCDN — perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/critondo', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'PRO', role: 'Diputado nacional', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [{ title: 'Insistencia del Título V — Impuesto a las Ganancias', actionType: 'voto', date: '2024-06-28', role: 'Diputado nacional', taxOrFee: 'Impuesto a las Ganancias', outcome: 'Voto nominal afirmativo', vote: 'AFIRMATIVO', source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt } }],
    profileStatus: 'partial'
  },
  {
    id: 'maximo_kirchner_2024',
    name: 'Máximo Carlos Kirchner',
    role: 'Diputado nacional al momento de la votación',
    jurisdiction: 'Buenos Aires / Cámara de Diputados',
    level: 'Legislativo',
    party: 'Unión por la Patria',
    roleSource: { label: 'HCDN — perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html', kind: 'official_role', verifiedAt },
    memberships: [{ party: 'Unión por la Patria', role: 'Diputado nacional', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }],
    officialSocials: [],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [{ title: 'Insistencia del Título V — Impuesto a las Ganancias', actionType: 'voto', date: '2024-06-28', role: 'Diputado nacional', taxOrFee: 'Impuesto a las Ganancias', outcome: 'Voto nominal negativo', vote: 'NEGATIVO', source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt } }],
    profileStatus: 'partial'
  }
];

export function calculateAssetChange(record: PoliticalTransparencyRecord) {
  const comparable = record.assets.filter(a => typeof a.declaredTotalArs === 'number') as Array<AssetSnapshot & { declaredTotalArs: number }>;
  if (comparable.length < 2) return null;
  const first = comparable[0].declaredTotalArs;
  const last = comparable[comparable.length - 1].declaredTotalArs;
  return {
    absoluteArs: last - first,
    percent: first !== 0 ? ((last - first) / first) * 100 : null,
    from: comparable[0].period,
    to: comparable[comparable.length - 1].period
  };
}
