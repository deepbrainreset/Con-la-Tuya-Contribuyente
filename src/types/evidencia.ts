/**
 * ARQUITECTURA DE EVIDENCIA INDEPENDIENTE DE URL
 * ==============================================
 * Una URL es una ubicación física o espejo temporal; NO es la evidencia en sí misma.
 * Cada documento, norma, votación nominal, serie presupuestaria, portada periodística
 * o registro audiovisual posee una identidad persistente interna (`EvidenceRecord`)
 * que sobrevive a caídas de portales, cambios de rutas o eliminaciones de enlaces.
 */

export type ProbativeNatureType =
  | 'acta_parlamentaria'
  | 'ley_decreto_norma'
  | 'registro_presupuestario'
  | 'fallo_judicial_auditoria'
  | 'declaracion_audiovisual'
  | 'portada_periodistica'
  | 'encuesta_metodologica'
  | 'manifestacion_publica';

export type EvidenceType =
  | 'LAW_OR_DECREE'
  | 'ROLL_CALL_ACT'
  | 'BUDGET_EXECUTION_SERIES'
  | 'COURT_RULING_OR_AUDIT'
  | 'AUDIOVISUAL_BROADCAST'
  | 'SOCIAL_MEDIA_POST'
  | 'NEWSPAPER_FRONT_PAGE'
  | 'PUBLIC_OPINION_SURVEY'
  | 'SOCIAL_MOBILIZATION_RECORD';

export type VerificationStatusCode =
  | 'VERIFIED_AVAILABLE'
  | 'AVAILABLE_UNVERIFIED'
  | 'REDIRECTED_VALID'
  | 'CONTENT_MISMATCH'
  | 'BROKEN'
  | 'REMOVED'
  | 'PRIVATE_OR_RESTRICTED'
  | 'AUTH_REQUIRED'
  | 'RATE_LIMITED'
  | 'TEMPORARILY_UNAVAILABLE'
  | 'UNKNOWN';

export type LocationTier =
  | 'PRIMARY_OFFICIAL'
  | 'SECONDARY_MIRROR'
  | 'INSTITUTIONAL_REPOSITORY'
  | 'WAYBACK_ARCHIVE';

/**
 * 1. EvidenceRecord: Identidad persistente del documento o registro probatorio
 */
export interface EvidenceRecord {
  id: string;
  evidenceType: EvidenceType;
  probativeNature: ProbativeNatureType;
  probativeNatureLabel: string;
  probativeWarning: string;
  title: string;
  subtitle?: string;
  issuingInstitution: string;
  jurisdiction: 'Nación' | 'PBA' | 'CABA' | 'Provincias' | 'Municipios' | 'Internacional';
  publicationDate: string; // YYYY-MM-DD
  historicalPeriod: string;
  presidentAtTime: string;
  normNumberOrExpediente?: string;
  authorsOrSignatories: string[];
  summary: string;
  verbatimExcerpt: string;
  sha256Fingerprint: string;
  overallStatus: VerificationStatusCode;
  lastVerifiedAt: string;
  tags: string[];
}

/**
 * 2. EvidenceLocation: Ubicación verificable asociada a un EvidenceRecord (1:N)
 */
export interface EvidenceLocation {
  id: string;
  evidenceId: string;
  tier: LocationTier;
  tierLabel: string;
  providerName: string;
  url: string;
  archiveUrl?: string;
  mimeType: 'text/html' | 'application/pdf' | 'text/csv' | 'video/mp4';
  status: VerificationStatusCode;
  httpStatusCode: number;
  lastCheckedAt: string;
  notes?: string;
}

/**
 * 3. EvidenceClaim: Afirmación fáctica específica dentro de la plataforma respaldada por un EvidenceRecord
 */
export interface EvidenceClaim {
  id: string;
  evidenceId: string;
  moduleOrigin: string;
  subjectEntity: string;
  claimStatement: string;
  probativeClassification: 'HECHO_NORMATIVO_O_CONTABLE' | 'VOTACION_OFICIAL' | 'DICHO_O_DISCURSO' | 'COBERTURA_MEDIATICA_O_CLIMA';
  verificationSummary: string;
  verifiedByRole: string;
  verifiedAt: string;
}

/**
 * 4. EvidenceVerification: Registro técnico de auditoría de integridad de una ubicación
 */
export interface EvidenceVerification {
  id: string;
  evidenceId: string;
  locationId: string;
  checkedAt: string;
  httpStatus: number;
  responseTimeMs: number;
  statusResult: VerificationStatusCode;
  resolvedFinalUrl: string;
  contentHashMatched: boolean;
  diagnosticNote: string;
}

/**
 * 5. EvidenceRevision: Historial inmutable de cambios o sustituciones de espejos
 */
export interface EvidenceRevision {
  id: string;
  evidenceId: string;
  revisedAt: string;
  actionType: 'INITIAL_REGISTRATION' | 'MIRROR_ADDED' | 'BROKEN_URL_REPLACED' | 'METADATA_ENRICHED';
  previousValue?: string;
  newValue: string;
  reason: string;
}

/**
 * ARQUITECTURA DE LÍNEA DE TIEMPO HISTÓRICA UNIFICADA (1946–ACTUALIDAD)
 * =====================================================================
 */
export type HistoricalRelationType =
  | 'CAUSA_PRECEDENTE'
  | 'RESPUESTA_NORMATIVA'
  | 'IMPACTO_PRESUPUESTARIO'
  | 'REACCION_SOCIAL'
  | 'CONTRADICCION_DISCURSIVA'
  | 'REFORMA_POSTERIOR';

export interface HistoricalEventRelation {
  id: string;
  sourceEventId: string;
  targetEventId: string;
  relationType: HistoricalRelationType;
  relationLabel: string;
  description: string;
  supportingEvidenceIds: string[];
}

export interface PressFrontPageRecord {
  id: string;
  newspaperName: 'Clarín' | 'La Nación' | 'Página/12' | 'Ámbito Financiero' | 'Crónica' | 'Perfil' | 'Boletín Oficial RA';
  editionDate: string;
  mainHeadline: string;
  subHeadline: string;
  permittedBriefQuote: string;
  editorialFramingNote: string;
  archiveSourceName: string;
  archiveCollectionRef: string;
  verificationUrl: string;
  waybackFallbackUrl: string;
  rightsNotice: string;
  evidenceRecordId: string;
}

export interface PublicOpinionSurveySnapshot {
  id: string;
  pollsterOrInstitution: string;
  fieldworkDate: string;
  sampleSizeAndScope: string;
  methodologyNote: string;
  keyFindingSummary: string;
  primarySocialConcern: string;
  inflationOrEconomyApprovalNote: string;
  sourceUrl: string;
  evidenceRecordId: string;
}

export interface SocialRepercussionSnapshot {
  id: string;
  date: string;
  eventCategory: 'Paro General' | 'Movilización Ciudadana' | 'Cacerolazo / Protesta' | 'Debate Público / Audiencia' | 'Repercusión Institucional';
  organizersOrSectors: string[];
  geographicScope: string;
  documentedDescription: string;
  institutionalResponse: string;
  evidenceRecordId: string;
}

export interface BeforeAfterActionComparison {
  id: string;
  actorName: string;
  actorRoleAndCoalition: string;
  beforeStatement: {
    date: string;
    channelOrForum: string;
    verbatimQuote: string;
    evidenceRecordId: string;
  };
  afterStatement: {
    date: string;
    channelOrForum: string;
    verbatimQuote: string;
    evidenceRecordId: string;
  };
  institutionalAction: {
    date: string;
    instrumentOrVote: string;
    documentedOutcome: string;
    evidenceRecordId: string;
  };
  contextAndPublicExplanation: string;
}

export interface HistoricalEvent {
  id: string;
  slug: string;
  date: string; // YYYY-MM-DD
  year: number;
  periodLabel: string;
  president: string;
  governingCoalition: string;
  ministerOfEconomy: string;
  jurisdiction: 'Nación' | 'PBA' | 'CABA' | 'Federal / Coparticipación';
  thematicAxis:
    | 'Régimen Monetario y Cambiario'
    | 'Sistema Tributario y Coparticipación'
    | 'Sistema Previsional y Seguridad Social'
    | 'Empresas Públicas, Privatizaciones y Estatizaciones'
    | 'Deuda Pública y Crisis Fiscales'
    | 'Tarifas, Subsidios y Energía';
  title: string;
  institutionalSummary: string;
  normativeInstruments: {
    normLabel: string;
    organismo: string;
    probativeNature: ProbativeNatureType;
    evidenceRecordId: string;
  }[];
  economicAndFiscalImpact: {
    inflationAnnualPct: string;
    fiscalBalancePctGdp: string;
    publicSpendingPctGdp: string;
    taxPressureNote: string;
    purchasingPowerAndTariffsImpact: string;
    sourceEvidenceRecordId: string;
  };
  keyOfficialsInvolved: {
    name: string;
    role: string;
    actionTaken: string;
  }[];
  pressFrontPages: PressFrontPageRecord[];
  opinionAndSurveys: PublicOpinionSurveySnapshot[];
  socialRepercussions: SocialRepercussionSnapshot[];
  beforeAfterComparisons: BeforeAfterActionComparison[];
  evidenceRecordIds: string[];
}
