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
  handle?: string;
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

const verifiedAt = '2026-10-30';

export const POLITICAL_TRANSPARENCY: PoliticalTransparencyRecord[] = [
  {
    id: 'javier_milei',
    name: 'Javier Gerardo Milei',
    role: 'Presidente de la Nación',
    jurisdiction: 'República Argentina',
    level: 'Nacion',
    party: 'La Libertad Avanza',
    roleSource: { label: 'Presidencia de la Nación — autoridad vigente', url: 'https://www.argentina.gob.ar/presidencia', kind: 'official_role', verifiedAt },
    memberships: [
      { party: 'Partido Libertario / La Libertad Avanza', from: '2021', role: 'Diputado Nacional (2021–2023) y Presidente de la Nación (2023–presente)', source: { label: 'Presidencia de la Nación', url: 'https://www.argentina.gob.ar/presidencia', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/JMilei', handle: '@JMilei', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/JMilei', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/javiermilei/', handle: '@javiermilei', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/javiermilei/', kind: 'social', verifiedAt } },
      { network: 'Web', url: 'https://www.argentina.gob.ar/presidencia', handle: 'argentina.gob.ar/presidencia', source: { label: 'Portal oficial Presidencia', url: 'https://www.argentina.gob.ar/presidencia', kind: 'social', verifiedAt } }
    ],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin remuneración individual oficial verificada cargada. No se publica una cifra inferida ni periodística.' }],
    assets: [{ period: 'Consulta vigente', declaredTotalArs: null, note: 'La Oficina Anticorrupción dispone DDJJ patrimoniales del Poder Ejecutivo Nacional. La cifra total individual no se publica aquí hasta validar una declaración concreta y comparable.', source: { label: 'Oficina Anticorrupción — Declaraciones Juradas', url: 'https://www.argentina.gob.ar/anticorrupcion/transparencia-activa-oficina-anticorrupcion/declaraciones-juradas', kind: 'ddjj', verifiedAt } }],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. Esto no equivale a afirmar que no existan causas.',
    fiscalActions: [
      {
        title: 'Eliminación de 4.ª categoría del Impuesto a las Ganancias (Ley 27.725)',
        actionType: 'voto',
        date: '2023-09-19',
        role: 'Diputado Nacional',
        taxOrFee: 'Impuesto a las Ganancias',
        outcome: 'Votó AFIRMATIVO para eximir a ~800.000 trabajadores asalariados.',
        vote: 'AFIRMATIVO',
        source: { label: 'HCDN — Acta de votación nominal 4912', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/4912', kind: 'vote', verifiedAt }
      },
      {
        title: 'Incremento de alícuota del Impuesto PAIS del 7,5% al 17,5% para importaciones (Decreto 29/2023)',
        actionType: 'decreto',
        date: '2023-12-13',
        role: 'Presidente de la Nación',
        taxOrFee: 'Impuesto PAIS (Ley 27.541)',
        outcome: 'Firmó el Decreto 29/2023 elevando la alícuota sobre importaciones de bienes y fletes.',
        source: { label: 'Boletín Oficial — Decreto 29/2023', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/300809/20231213', kind: 'law', verifiedAt }
      },
      {
        title: 'Remisión y promulgación de la restitución del Impuesto a las Ganancias 4.ª categoría (Ley 27.743 Título V)',
        actionType: 'promulgacion',
        date: '2024-07-08',
        role: 'Presidente de la Nación',
        taxOrFee: 'Impuesto a las Ganancias',
        outcome: 'Promulgó la Ley 27.743 (Decreto 593/2024) restituyendo Ganancias sobre asalariados.',
        source: { label: 'Boletín Oficial — Ley 27.743', url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708', kind: 'law', verifiedAt }
      }
    ],
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
    memberships: [
      { party: 'Frente para la Victoria / Frente de Todos / Unión por la Patria', from: '2011', role: 'Viceministro y Ministro de Economía (2011–2015), Diputado Nacional (2015–2019), Gobernador PBA (2019–presente)', source: { label: 'Provincia de Buenos Aires', url: 'https://www.argentina.gob.ar/buenosaires', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/Kicillofok', handle: '@Kicillofok', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/Kicillofok', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/kicillofok/', handle: '@kicillofok', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/kicillofok/', kind: 'social', verifiedAt } },
      { network: 'Web', url: 'https://www.gba.gob.ar', handle: 'gba.gob.ar', source: { label: 'Portal oficial PBA', url: 'https://www.gba.gob.ar', kind: 'social', verifiedAt } }
    ],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin remuneración individual oficial verificada cargada para el período.' }],
    assets: [{ period: '2025', declaredTotalArs: null, note: 'La Provincia publica el sistema y nóminas de DDJJ patrimoniales. El patrimonio individual se mostrará sólo cuando se extraiga y valide la declaración correspondiente.', source: { label: 'Provincia de Buenos Aires — DDJJ patrimoniales', url: 'https://www.gba.gob.ar/justicia_y_ddhh/DDJJ', kind: 'ddjj', verifiedAt } }],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. No se infiere ausencia de causas.',
    fiscalActions: [
      {
        title: 'Intervención y Expropiación del 51% de YPF sin OPA estatutaria (Ley 26.741) y Convenio Repsol (Ley 26.932)',
        actionType: 'ley',
        date: '2012-05-03',
        role: 'Viceministro de Economía / Interventor de YPF (2012) y Ministro de Economía (2014)',
        taxOrFee: 'Deuda Soberana / Tesoro Nacional (USD 5.000 M en bonos + fallo SDNY USD 16.100 M)',
        outcome: 'Impulsó la expropiación sin ejecutar la OPA del Art. 7 del Estatuto de YPF y en 2014 firmó el pago de USD 5.000 millones en bonos a Repsol.',
        source: { label: 'InfoLEG — Ley 26.741 y Ley 26.932', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm', kind: 'law', verifiedAt }
      },
      {
        title: 'Ley Impositiva PBA 15.479 (Ejercicio 2024) y anticipo extraordinario de Ingresos Brutos',
        actionType: 'promulgacion',
        date: '2024-01-02',
        role: 'Gobernador de la Provincia de Buenos Aires',
        taxOrFee: 'Inmobiliario Urbano/Rural, Patentes ARBA e Ingresos Brutos',
        outcome: 'Promulgó subas de hasta 200% (y sin tope en tramos altos) en impuestos patrimoniales y anticipos extraordinarios de IIBB.',
        source: { label: 'Normas GBA — Ley Impositiva 15.479', url: 'https://normas.gba.gob.ar/documentos/B3wX9i3x.html', kind: 'law', verifiedAt }
      }
    ],
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
    memberships: [
      { party: 'PRO', from: '2005', role: 'Diputado PBA (2005–2011), Intendente Vicente López (2011–2021), Jefe de Gobierno CABA (2023–presente)', source: { label: 'GCBA — Jefatura de Gobierno', url: 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/jorgemacri', handle: '@jorgemacri', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/jorgemacri', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/jorgemacri/', handle: '@jorgemacri', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/jorgemacri/', kind: 'social', verifiedAt } },
      { network: 'Web', url: 'https://buenosaires.gob.ar', handle: 'buenosaires.gob.ar', source: { label: 'Portal oficial GCBA', url: 'https://buenosaires.gob.ar', kind: 'social', verifiedAt } }
    ],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin recibo o escala individual oficial 2026 cargada. La DDJJ no se usa como sustituto automático de sueldo mensual.' }],
    assets: [
      { period: '2024', declaredTotalArs: null, declaredIncomeArs: 81369174, cashArs: 299187500, depositsArs: 87013839, note: 'Valores visibles en la DDJJ de actualización 2024. No se calcula patrimonio total sin sumar y validar todos los rubros de la declaración.', source: { label: 'GCBA — DDJJ Jorge Macri, actualización 2024', url: 'https://buenosaires.gob.ar/sites/default/files/2025-07/45092-20173668814.pdf', kind: 'ddjj', verifiedAt } },
      { period: '2025', declaredTotalArs: null, note: 'Existe DDJJ de actualización 2025 publicada por GCBA. Pendiente extracción estructurada para comparación patrimonial homogénea.', source: { label: 'GCBA — Jefatura de Gobierno, DDJJ 2025', url: 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0', kind: 'ddjj', verifiedAt } }
    ],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. No se infiere ausencia de causas.',
    fiscalActions: [
      {
        title: 'Actualización mensual indexada de ABL con coeficientes zonales y liquidación de Patentes CABA (AGIP)',
        actionType: 'ley',
        date: '2024-12-12',
        role: 'Jefe de Gobierno de CABA',
        taxOrFee: 'Inmobiliario / ABL y Patentes Automotor (AGIP)',
        outcome: 'Aplicó actualización mensual por IPC con diferenciales geográficos en ABL y debió reliquidar boletas de Patentes 2024 tras reclamos por subas superiores al 100%.',
        source: { label: 'Boletín Oficial CABA — Leyes Tarifarias', url: 'https://boletinoficial.buenosaires.gob.ar', kind: 'law', verifiedAt }
      }
    ],
    profileStatus: 'partial'
  },
  {
    id: 'patricia_bullrich',
    name: 'Patricia Bullrich',
    role: 'Ministra de Seguridad de la Nación',
    jurisdiction: 'República Argentina',
    level: 'Nacion',
    party: 'La Libertad Avanza (ex PRO / Alianza / PJ)',
    roleSource: { label: 'Ministerio de Seguridad de la Nación', url: 'https://www.argentina.gob.ar/seguridad', kind: 'official_role', verifiedAt },
    memberships: [
      { party: 'Alianza para el Trabajo, la Justicia y la Educación', from: '1999', to: '2001', role: 'Ministra de Trabajo y Seguridad Social' },
      { party: 'Unión por Todos / Coalición Cívica / PRO', from: '2003', to: '2024', role: 'Diputada Nacional (2007–2015), Ministra de Seguridad (2015–2019), Presidenta del PRO (2020–2024)' },
      { party: 'La Libertad Avanza', from: '2024', role: 'Ministra de Seguridad de la Nación' }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/PatoBullrich', handle: '@PatoBullrich', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/PatoBullrich', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/patobullrich/', handle: '@patobullrich', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/patobullrich/', kind: 'social', verifiedAt } }
    ],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin recibo individual oficial verificado cargado.' }],
    assets: [],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado en esta ficha.',
    fiscalActions: [
      {
        title: 'Refrenda del Decreto 896/2001 (Recorte del 13% a haberes estatales y jubilaciones bajo Ley de Déficit Cero)',
        actionType: 'decreto',
        date: '2001-07-13',
        role: 'Ministra de Trabajo, Empleo y Formación de Recursos Humanos',
        taxOrFee: 'Haberes públicos y previsionales (Ley 25.453)',
        outcome: 'Firmó el Decreto 896/2001 que dispuso la reducción del 13% en haberes previsionales y salarios estatales superiores a $500.',
        source: { label: 'InfoLEG — Decreto 896/2001', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/67905/norma.htm', kind: 'law', verifiedAt }
      },
      {
        title: 'Votación Ley 26.425 (Estatización AFJP) y Ley 26.741 (Expropiación 51% YPF)',
        actionType: 'voto',
        date: '2008-11-06',
        role: 'Diputada Nacional (Coalición Cívica / Unión por Todos)',
        taxOrFee: 'Fondos Previsionales AFJP / YPF',
        outcome: 'Votó NEGATIVO en 2008 a la estatización de las AFJP y en 2012 a la expropiación de YPF sin tasación previa.',
        vote: 'NEGATIVO',
        source: { label: 'HCDN — Actas de votación nominal 2008 y 2012', url: 'https://votaciones.hcdn.gob.ar', kind: 'vote', verifiedAt }
      }
    ],
    profileStatus: 'partial'
  },
  {
    id: 'martin_lousteau',
    name: 'Martín Lousteau',
    role: 'Senador Nacional (CABA) y Presidente del Comité Nacional de la UCR',
    jurisdiction: 'Ciudad Autónoma de Buenos Aires / Senado de la Nación',
    level: 'Legislativo',
    party: 'Unión Cívica Radical (UCR)',
    roleSource: { label: 'Honorable Senado de la Nación — perfil institucional', url: 'https://www.senado.gob.ar/senadores/senador/493', kind: 'official_role', verifiedAt },
    memberships: [
      { party: 'Frente para la Victoria (Gestión PBA y Nación)', from: '2005', to: '2008', role: 'Ministro de Producción PBA, Presidente Banco Provincia y Ministro de Economía de la Nación' },
      { party: 'UNEN / ECO / Evolución Radical / UCR', from: '2013', role: 'Diputado Nacional (2013–2015, 2017–2019), Embajador en EE.UU. en gestión Cambiemos (2015–2017), Senador Nacional (2019–presente)' }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/GugaLusto', handle: '@GugaLusto', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/GugaLusto', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/gugalusto/', handle: '@gugalusto', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/gugalusto/', kind: 'social', verifiedAt } }
    ],
    salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Dieta senatorial sujeta a resoluciones del H. Senado de la Nación.' }],
    assets: [],
    judicial: [],
    judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado en esta ficha.',
    fiscalActions: [
      {
        title: 'Firma de la Resolución MEyP 125/2008 (Retenciones Móviles a las Exportaciones Agropecuarias)',
        actionType: 'resolucion',
        date: '2008-03-11',
        role: 'Ministro de Economía y Producción de la Nación',
        taxOrFee: 'Derechos de Exportación (Retenciones Móviles)',
        outcome: 'Firmó el esquema de retenciones móviles sobre soja, girasol, maíz y trigo que luego fue rechazado en el Senado (voto no positivo del 17/07/2008).',
        source: { label: 'InfoLEG — Resolución MEyP 125/2008', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/138567/norma.htm', kind: 'law', verifiedAt }
      }
    ],
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
    memberships: [
      { party: 'Avanza Libertad / Juntos por el Cambio / La Libertad Avanza', from: '2019', role: 'Diputado Nacional (2021–presente)', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/jlespert', handle: '@jlespert', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/jlespert', kind: 'social', verifiedAt } }
    ],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [{ title: 'Insistencia del Título V — Impuesto a las Ganancias', actionType: 'voto', date: '2024-06-28', role: 'Diputado nacional', taxOrFee: 'Impuesto a las Ganancias', outcome: 'Voto nominal afirmativo', vote: 'AFIRMATIVO', source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt } }],
    profileStatus: 'partial'
  },
  {
    id: 'cristian_ritondo_2024',
    name: 'Cristian Ritondo',
    role: 'Diputado nacional — Presidente del Bloque PRO',
    jurisdiction: 'Buenos Aires / Cámara de Diputados',
    level: 'Legislativo',
    party: 'PRO',
    roleSource: { label: 'HCDN — perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/critondo', kind: 'official_role', verifiedAt },
    memberships: [
      { party: 'Partido Justicialista (2003–2007) / PRO (2007–presente)', from: '2003', role: 'Diputado Nacional (2003–2007, 2019–presente), Legislador CABA (2007–2015), Ministro de Seguridad PBA (2015–2019)', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'X', url: 'https://x.com/cristianritondo', handle: '@cristianritondo', source: { label: 'Cuenta pública oficial verificada en X', url: 'https://x.com/cristianritondo', kind: 'social', verifiedAt } },
      { network: 'Instagram', url: 'https://www.instagram.com/cristianritondo/', handle: '@cristianritondo', source: { label: 'Cuenta pública oficial en Instagram', url: 'https://www.instagram.com/cristianritondo/', kind: 'social', verifiedAt } }
    ],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [{ title: 'Insistencia del Título V — Impuesto a las Ganancias', actionType: 'voto', date: '2024-06-28', role: 'Diputado nacional', taxOrFee: 'Impuesto a las Ganancias', outcome: 'Voto nominal afirmativo', vote: 'AFIRMATIVO', source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt } }],
    profileStatus: 'partial'
  },
  {
    id: 'maximo_kirchner_2024',
    name: 'Máximo Carlos Kirchner',
    role: 'Diputado nacional (Buenos Aires)',
    jurisdiction: 'Buenos Aires / Cámara de Diputados',
    level: 'Legislativo',
    party: 'Unión por la Patria',
    roleSource: { label: 'HCDN — perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html', kind: 'official_role', verifiedAt },
    memberships: [
      { party: 'Frente para la Victoria / Frente de Todos / Unión por la Patria (PJ)', from: '2015', role: 'Diputado Nacional (2015–presente) y Presidente del PJ Bonaerense', source: { label: 'HCDN — Acta 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'party', verifiedAt } }
    ],
    officialSocials: [
      { network: 'Web', url: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html', handle: 'HCDN Perfil Oficial', source: { label: 'HCDN — Perfil institucional', url: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html', kind: 'social', verifiedAt } },
      { network: 'X', url: 'https://x.com/Diputados_UxP', handle: '@Diputados_UxP', source: { label: 'Canal oficial en X del Bloque Unión por la Patria HCDN', url: 'https://x.com/Diputados_UxP', kind: 'social', verifiedAt } }
    ],
    salary: [], assets: [], judicial: [],
    judicialCoverageNote: 'No evaluado en esta ficha: registro creado para trazabilidad de voto fiscal.',
    fiscalActions: [
      {
        title: 'Creación del Impuesto PAIS (30%) y suspensión de movilidad previsional (Ley 27.541)',
        actionType: 'voto',
        date: '2019-12-20',
        role: 'Presidente del Bloque Frente de Todos en HCDN',
        taxOrFee: 'Impuesto PAIS y Movilidad Previsional SIPA',
        outcome: 'Voto nominal AFIRMATIVO.',
        vote: 'AFIRMATIVO',
        source: { label: 'InfoLEG — Ley 27.541', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm', kind: 'vote', verifiedAt }
      },
      {
        title: 'Insistencia del Título V — Impuesto a las Ganancias',
        actionType: 'voto',
        date: '2024-06-28',
        role: 'Diputado nacional',
        taxOrFee: 'Impuesto a las Ganancias',
        outcome: 'Voto nominal negativo',
        vote: 'NEGATIVO',
        source: { label: 'HCDN — Acta de votación 5274', url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274', kind: 'vote', verifiedAt }
      }
    ],
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
