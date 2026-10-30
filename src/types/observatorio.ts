/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Modelo Canónico de Evidencia, Trazabilidad e Investigación Histórica (1946–Actualidad)
 * Conecta las 5 dimensiones centrales:
 * A. Origen del Dinero
 * B. Distribución y Gasto
 * C. Resultados
 * D. Responsables Públicos
 * E. Declaraciones y Rendición de Cuentas
 */

import type { EvidenceLevel } from '../types';

export type EpistemicStatus =
  | 'verificado'
  | 'oficial_con_reserva'
  | 'estimacion'
  | 'interpretacion'
  | 'controversia'
  | 'desconocido';

export type HistoricalCurrencyCode =
  | 'MSN'             // Peso Moneda Nacional (1881–1969)
  | 'PESO_LEY'        // Peso Ley 18.188 (1970–1983)
  | 'PESO_ARGENTINO'  // Peso Argentino (1983–1985)
  | 'AUSTRAL'         // Austral (1985–1991)
  | 'ARS'             // Peso Convertible / Peso (1992–actualidad)
  | 'USD'             // Dólar estadounidense (para deuda externa / litigios internacionales)
  | 'PCT_PIB';        // Porcentaje del PIB (para series históricas comparables 1946–actualidad)

export type BudgetExecutionStage =
  | 'recaudado'
  | 'credito_inicial'
  | 'credito_vigente'
  | 'comprometido'
  | 'devengado'
  | 'pagado'
  | 'ejecutado_cuenta_inversion'
  | 'no_presupuestario_estimado';

export type PrimarySourceCategory =
  | 'boletin_oficial'
  | 'infoleg'
  | 'presupuesto_abierto_onp'
  | 'cuenta_inversion_cgn'
  | 'arca_afip'
  | 'anses_bess'
  | 'hcdn_acta'
  | 'senado_acta'
  | 'comprar_contratar'
  | 'indec_bcra'
  | 'agn_sigen'
  | 'conicet_sicytar'
  | 'spu_universidades'
  | 'justicia_cij_pjn'
  | 'secundaria_contexto';

export interface CanonicalSourceRecord {
  id: string;
  title: string;
  issuer: string;
  category: PrimarySourceCategory;
  url: string;
  archiveUrl?: string;
  publicationDate: string;
  retrievedAt: string;
  validityPeriod: string;
  relevantExcerpt?: string;
  sha256?: string;
  evidenceLevel: EvidenceLevel;
  epistemicStatus: EpistemicStatus;
  extractionMethod: 'api_oficial' | 'documento_oficial_pdf' | 'acta_parlamentaria' | 'serie_estadistica_oficial' | 'revision_documental_manual';
}

export interface HistoricalMonetaryAmount {
  nominalAmount: number | null;
  currency: HistoricalCurrencyCode;
  period: string;
  budgetStage: BudgetExecutionStage;
  isIntergovernmentalTransfer: boolean;
  consolidationRuleNote?: string;
  realAdjustedAmount?: number | null;
  adjustmentMethodology?: string;
  epistemicStatus: EpistemicStatus;
  sourceId: string;
  sourceUrl: string;
}

export type PublicInterventionRole =
  | 'autor_proyecto'
  | 'coautor_proyecto'
  | 'miembro_informante'
  | 'voto_afirmativo'
  | 'voto_negativo'
  | 'abstencion'
  | 'ausente'
  | 'promulgacion_ejecutiva'
  | 'firmante_decreto_resolucion'
  | 'autoridad_adjudicante'
  | 'responsable_ejecucion'
  | 'organismo_pagador';

export interface DocumentedIntervention {
  id: string;
  officialId: string;
  officialName: string;
  roleAtEvent: string;
  partyOrCoalitionAtEvent: string;
  interventionType: PublicInterventionRole;
  date: string;
  normOrActNumber: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  epistemicStatus: EpistemicStatus;
}

export interface PresidentialPeriodRecord {
  id: string;
  periodLabel: string;
  startYear: number;
  endYear: number;
  headOfState: string;
  politicalForce: string;
  constitutionalRegime: 'constitucional' | 'de_facto' | 'transicion_constitucional';
  dominantCurrency: HistoricalCurrencyCode;
  keyFiscalMilestones: string[];
  publicSpendingPctGdpRange: string;
  taxPressurePctGdpRange: string;
  epistemicStatus: EpistemicStatus;
  primarySources: Array<{ label: string; url: string }>;
}

export interface FiscalFlowSeriesPoint {
  year: number;
  presidencyId: string;
  currency: HistoricalCurrencyCode;
  taxPressureConsolidatedPctGdp: number | null;
  nationalTaxRevenuePctGdp: number | null;
  provincialAutoTransferPctGdp: number | null;
  primarySpendingNationalPctGdp: number | null;
  financialResultPctGdp: number | null;
  budgetStage: BudgetExecutionStage;
  intergovernmentalEliminationApplied: boolean;
  epistemicStatus: EpistemicStatus;
  methodologyNote: string;
  sourceName: string;
  sourceUrl: string;
}

export interface DossierOutcomeIndicator {
  id: string;
  metricName: string;
  period: string;
  observedValue: string;
  expectedTargetOrBaseline?: string;
  epistemicStatus: EpistemicStatus;
  measurementLimitation: string;
  sourceUrl: string;
  sourceName: string;
}

export interface HistoricalDossier {
  id: string;
  code: string;
  title: string;
  category: 'previsional' | 'empresas_publicas' | 'tributario' | 'contrataciones' | 'cientifico_universitario' | 'deuda_monetario';
  periodCovered: string;
  jurisdiction: string;
  normativeFramework: Array<{
    normNumber: string;
    normType: 'Ley' | 'Decreto' | 'Resolución' | 'Proceso COMPR.AR' | 'Fallo Judicial';
    sanctionOrIssueDate: string;
    title: string;
    officialUrl: string;
  }>;
  summaryNeutral: string;
  originOfFunds: string;
  destinationAndBeneficiaries: string;
  monetaryRecords: HistoricalMonetaryAmount[];
  documentedInterventions: DocumentedIntervention[];
  outcomesAndResults: DossierOutcomeIndicator[];
  controversiesAndArguments: Array<{
    perspectiveLabel: string;
    argumentSummary: string;
    supportingSourceUrl: string;
  }>;
  epistemicStatus: EpistemicStatus;
  lastVerified: string;
}

export interface PublicStatementRecord {
  id: string;
  officialId: string;
  officialName: string;
  roleAtStatement: string;
  partyOrCoalitionAtStatement: string;
  date: string;
  topic: 'presion_tributaria' | 'sistema_previsional' | 'empresas_publicas' | 'emision_inflacion' | 'coparticipacion_provincias' | 'gasto_publico';
  topicLabel: string;
  exactQuote: string;
  contextNote: string;
  mediaType: 'acta_taquigrafica' | 'entrevista_audiovisual' | 'discurso_oficial' | 'documento_publico';
  sourceName: string;
  sourceUrl: string;
  timestampOrPageRef?: string;
  epistemicStatus: EpistemicStatus;
}

export interface StatementComparisonDossier {
  id: string;
  title: string;
  topic: PublicStatementRecord['topic'];
  officialName: string;
  partyOrCoalitionHistory: string;
  statementA: PublicStatementRecord;
  statementB?: PublicStatementRecord;
  relatedPublicAct?: {
    date: string;
    actType: PublicInterventionRole;
    normNumber: string;
    description: string;
    sourceUrl: string;
  };
  institutionalContextComparison: string;
  documentedPublicExplanations: string;
  editorialComplianceNote: string;
  reviewStatus: 'verificado_documentalmente' | 'en_revision';
}

export interface ThematicAuditRecord {
  id: string;
  slug: 'jubilaciones-pensiones' | 'universidades-publicas' | 'ciencia-conicet' | 'educacion-salud' | 'subsidios-infraestructura' | 'compras-publicidad';
  title: string;
  sector: string;
  historicalCoverage: string;
  governingNorms: string[];
  responsibleOrganisms: string[];
  financialSummary: HistoricalMonetaryAmount[];
  physicalAndPerformanceMetrics: Array<{
    label: string;
    value: string;
    period: string;
    sourceName: string;
    sourceUrl: string;
    epistemicStatus: EpistemicStatus;
  }>;
  measurementLimitations: string[];
  auditReportsCited: Array<{
    issuer: 'AGN' | 'SIGEN' | 'SPU' | 'CONICET' | 'ANSES' | 'MECON' | 'JGM';
    title: string;
    year: number;
    url: string;
  }>;
  relatedDossierIds: string[];
}

export interface CitizenInquiryTemplate {
  id: string;
  dossierId: string;
  targetOrganism: string;
  legalBasis: string;
  subjectTemplate: string;
  questionsList: string[];
  submissionChannelName: string;
  submissionChannelUrl: string;
}

export interface CorrectionLogEntry {
  id: string;
  date: string;
  moduleAffected: string;
  entityId: string;
  previousStateSummary: string;
  correctedStateSummary: string;
  reasonAndEvidence: string;
  sourceUrl: string;
  verifiedBy: string;
}
