/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';

export interface VerifiedData<T> {
  value: T;
  source_url: string;      // URL oficial
  source_name: string;     // Ej: "Boletín Oficial de la Nación"
  retrieved_at: string;    // ISO Date
  evidence_hash?: string;  // SHA-256 opcional
  confidence: 'high' | 'medium' | 'low';
}

export type JurisdictionLevel = 'nation' | 'province' | 'city_autonoma' | 'municipality' | 'comuna';

export interface Jurisdiction {
  id: string;
  name: string;
  level: JurisdictionLevel;
  parentId?: string;
  authorityName: string;
  authorityParty: string;
  authorityPeriod: string;
  budgetAvailable?: number; // En pesos
  debtAmount?: number;     // En pesos
  publicEmployeesCount?: number;
  activeTaxesCount: number;
  sources: string[];
  confidenceLevel: EvidenceLevel;
  summary: string;
  isBaseDemo?: boolean; // true para datos de ejemplo, false para datos probados
}

export type TributoType = 'impuesto' | 'tasa' | 'contribucion' | 'derecho' | 'percepcion' | 'retencion';
export type TributoStatus = 'vigente' | 'derogado' | 'pendiente_verificacion';

export interface Tributo {
  id: string;
  name: string;
  type: TributoType;
  jurisdictionId: string;
  level: 'Nación' | 'Provincia' | 'Municipio';
  authorityCobradora: string;
  normaCreacion: string;
  fechaCreacion: string;
  propuestoPor: string;
  propuestoPorPartido: string;
  aprobadoPor: string;
  promulgadoPor: string;
  ejecutadoPor: string;
  status: TributoStatus;
  sourceUrl: string;
  evidenceHash?: string;
  lastVerified: string;
  evidenceLevel: EvidenceLevel;
  isBaseDemo?: boolean;
}

export interface PoliticianRole {
  role: string;
  period: string;
  party: string;
  jurisdiction: string;
}

export interface PoliticianCausa {
  causa: string;
  estado: string; // "denuncia" | "procesamiento" | "condena" | "absolucion"
  fuente: string;
}

export interface Politician {
  id: string;
  name: string;
  imageUrl?: string;
  currentRole: string;
  currentParty: string;
  previousRoles: PoliticianRole[];
  decisionesFiscales: string[];
  leyesDecretosAsociados: string[];
  ddjjSource?: string;
  ddjjSummary?: string;
  causasJudiciales?: PoliticianCausa[];
  evidenceLevel: EvidenceLevel;
}

export interface ProductSustance {
  id: string;
  name: string;
  basePrice: number;
  logistics: number;
  taxNational: number; // e.g. IVA, Imp. Internos
  taxProvincial: number; // e.g. IIBB
  taxMunicipal: number; // e.g. TISH
  margin: number;
  isBaseDemo?: boolean;
}

export interface ContributionProposal {
  id: string;
  scope: 'jurisdiccion' | 'tributo' | 'politico';
  targetName: string;
  proposedChange: string;
  evidenceUrl: string;
  contributorName: string;
  contributorEmail: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  createdAt: string;
  auditLog: string[];
}
