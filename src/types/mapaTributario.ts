/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VerificationStatusType =
  | "Verificado con fuente oficial"
  | "Verificado con fuente parlamentaria"
  | "Verificado con boletín oficial"
  | "Verificado con organismo recaudador"
  | "Fuente secundaria pendiente de validación"
  | "Información parcial"
  | "Información insuficiente"
  | "Fuente contradictoria"
  | "No disponible";

export interface JurisdictionTaxSchema {
  id: string;
  name: string;
  type: "nation" | "province" | "caba" | "municipality" | "city";
  parent_jurisdiction_id?: string;
  official_website_url?: string;
  boletin_oficial_url?: string;
  legislature_url?: string;
  tax_agency_url?: string;
  verification_status: VerificationStatusType;
  created_at?: string;
  updated_at?: string;
}

export interface TributeTaxSchema {
  id: string;
  official_name: string;
  common_name: string;
  tribute_type: "impuesto" | "tasa" | "contribucion" | "derecho" | "percepcion" | "retencion" | "aporte de seguridad social" | "regimen informativo con costo operativo";
  jurisdiction_id: string;
  government_level: "nacional" | "provincial" | "municipal" | "caba";
  collecting_agency: string;
  legal_basis_type: string;
  legal_basis_number: string;
  legal_basis_title: string;
  creation_date?: string;
  sanction_date?: string;
  promulgation_date?: string;
  publication_date?: string;
  effective_date?: string;
  current_status: "vigente" | "derogado" | "suspendido" | "modificado" | "en revision";
  taxable_base: string;
  rate_description: string;
  fixed_amount_description?: string;
  affected_subjects: string;
  exempt_subjects: string;
  affected_activities: string;
  declared_revenue_destination?: string;
  last_modified_date?: string;
  verification_status: VerificationStatusType;
  completeness_score: number; // 0 to 100
  public_notes?: string;
  internal_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LegalNormTaxSchema {
  id: string;
  tribute_id: string;
  norm_type: string;
  norm_number: string;
  norm_title: string;
  jurisdiction_id: string;
  publication_date?: string;
  source_url?: string;
  official_text_url?: string;
  summary: string;
  verification_status: VerificationStatusType;
  created_at?: string;
  updated_at?: string;
}

export interface PoliticalTraceabilityTaxSchema {
  id: string;
  tribute_id: string;
  norm_id?: string;
  proposal_author_name?: string;
  proposal_author_role?: string;
  proposal_author_party_at_time?: string;
  executive_authority_name?: string;
  executive_authority_party_at_time?: string;
  legislative_body?: string;
  bill_number?: string;
  expediente_number?: string;
  session_date?: string;
  vote_result?: string;
  required_majority?: string;
  obtained_majority?: string;
  votes_in_favor_count?: number;
  votes_against_count?: number;
  abstentions_count?: number;
  absentees_count?: number;
  traceability_status: "No se encontró trazabilidad política suficiente en fuentes públicas consultadas." | "Información disponible" | "Información parcial";
  source_url?: string;
  public_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PoliticianVoteTaxSchema {
  id: string;
  political_traceability_id: string;
  politician_name: string;
  role_at_time: string;
  party_at_time: string;
  bloc_at_time: string;
  district: string;
  vote: "afirmativo" | "negativo" | "abstención" | "ausente";
  session_date: string;
  source_url: string;
  verification_status: VerificationStatusType;
  created_at?: string;
  updated_at?: string;
}

export interface TributeHistoryTaxSchema {
  id: string;
  tribute_id: string;
  event_date: string;
  event_type: "Creación" | "Modificación" | "Aumento" | "Reducción" | "Derogación parcial" | "Derogación total" | "Suspensión" | "Reinstalación" | "Reforma" | "Cambio de alícuota" | "Cambio de base imponible" | "Cambio de organismo recaudador";
  modifying_norm_id?: string;
  description: string;
  previous_value?: string;
  new_value?: string;
  political_traceability_id?: string;
  source_url?: string;
  verification_status: VerificationStatusType;
  created_at?: string;
  updated_at?: string;
}

export interface SourceTaxSchema {
  id: string;
  title: string;
  source_type: "Boletín Oficial" | "Biblioteca Digital" | "Infoleg / Portal Normativo" | "Sitio Web Recaudador" | "Cámara Legislativa" | "Portal de Datos Abiertos" | "Otro";
  jurisdiction_id: string;
  publisher: string;
  url: string;
  archived_url?: string;
  publication_date?: string;
  accessed_at: string;
  related_entity_type?: "tribute" | "jurisdiction" | "norm" | "voting";
  related_entity_id?: string;
  reliability_level: "Primaria Oficial" | "Secundaria Oficial" | "Secundaria Coherente" | "Terciaria / Pendiente";
  verification_status: VerificationStatusType;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VerificationLogTaxSchema {
  id: string;
  entity_type: "tribute" | "voting" | "norm" | "source";
  entity_id: string;
  previous_status: VerificationStatusType;
  new_status: VerificationStatusType;
  changed_by: string; // Editor username/user role
  change_reason: string;
  source_id?: string;
  created_at?: string;
}
