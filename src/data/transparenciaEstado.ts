/**
 * Modelo de transparencia fiscal por jurisdicción.
 * Importante: ausencia en la plataforma no equivale automáticamente a ausencia de publicación oficial.
 */

export type TransparencyStatus = 'published' | 'partial' | 'not_found' | 'not_published_confirmed';

export interface TransparencyDimension {
  id: string;
  name: string;
  description: string;
}

export interface TransparencyEvidence {
  dimensionId: string;
  status: TransparencyStatus;
  sourceUrl?: string;
  sourceLabel?: string;
  checkedAt: string;
  note: string;
}

export interface StateTransparencyProfile {
  jurisdictionId: string;
  jurisdictionName: string;
  level: 'Nación' | 'Provincia' | 'Municipio';
  evidence: TransparencyEvidence[];
}

export const TRANSPARENCY_DIMENSIONS: TransparencyDimension[] = [
  { id: 'budget', name: 'Presupuesto aprobado', description: 'Presupuesto anual y modificaciones presupuestarias.' },
  { id: 'execution', name: 'Ejecución presupuestaria', description: 'Crédito vigente, compromiso, devengado y pagado con fecha de corte.' },
  { id: 'functional', name: 'Gasto por finalidad y función', description: 'Educación, salud, seguridad, servicios económicos y demás funciones.' },
  { id: 'object', name: 'Gasto por objeto', description: 'Personal, bienes de consumo, servicios, transferencias y obra/inversión.' },
  { id: 'payroll', name: 'Personal y salarios', description: 'Dotación, escalas salariales y gasto en personal.' },
  { id: 'procurement', name: 'Compras y contrataciones', description: 'Licitaciones, órdenes de compra, adjudicaciones y proveedores.' },
  { id: 'suppliers', name: 'Proveedores y beneficiarios', description: 'Proveedor, CUIT cuando corresponda, monto y objeto de contratación.' },
  { id: 'advertising', name: 'Pauta / publicidad oficial', description: 'Campaña, organismo, medio/proveedor, monto y período.' },
  { id: 'public-works', name: 'Obra pública', description: 'Proyecto, contratista, presupuesto, avance físico/financiero y modificaciones.' },
  { id: 'transfers', name: 'Subsidios y transferencias', description: 'Transferencias a otras jurisdicciones, empresas, ONG y beneficiarios.' },
  { id: 'debt', name: 'Deuda pública', description: 'Stock, vencimientos, intereses, acreedores e instrumentos.' },
  { id: 'open-data', name: 'Datos abiertos reutilizables', description: 'CSV/XLSX/JSON/API u otro formato estructurado y descargable.' }
];

export const NATIONAL_TRANSPARENCY_PROFILE: StateTransparencyProfile = {
  jurisdictionId: 'nacion',
  jurisdictionName: 'Administración Nacional',
  level: 'Nación',
  evidence: [
    {
      dimensionId: 'budget',
      status: 'published',
      sourceUrl: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/datos-abiertos',
      sourceLabel: 'Presupuesto Ciudadano / datos abiertos',
      checkedAt: '2026-09-13',
      note: 'Existe publicación oficial del presupuesto y sus clasificaciones.'
    },
    {
      dimensionId: 'execution',
      status: 'published',
      sourceUrl: 'https://www.presupuestoabierto.gob.ar/',
      sourceLabel: 'Presupuesto Abierto',
      checkedAt: '2026-09-13',
      note: 'La ejecución puede consultarse por distintas clasificaciones presupuestarias.'
    },
    {
      dimensionId: 'functional',
      status: 'published',
      sourceUrl: 'https://www.presupuestoabierto.gob.ar/',
      sourceLabel: 'Presupuesto Abierto',
      checkedAt: '2026-09-13',
      note: 'Disponible por finalidad y función.'
    },
    {
      dimensionId: 'object',
      status: 'published',
      sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/visualizacion-en-que-se-gasta',
      sourceLabel: 'Presupuesto Abierto — en qué se gasta',
      checkedAt: '2026-09-13',
      note: 'Disponible por objeto del gasto.'
    },
    {
      dimensionId: 'procurement',
      status: 'published',
      sourceUrl: 'https://comprar.gob.ar/',
      sourceLabel: 'COMPR.AR',
      checkedAt: '2026-09-13',
      note: 'Compras y contrataciones nacionales accesibles mediante el portal oficial.'
    },
    {
      dimensionId: 'advertising',
      status: 'partial',
      sourceUrl: 'https://www.argentina.gob.ar/node/3454',
      sourceLabel: 'Publicidad oficial — Argentina.gob.ar',
      checkedAt: '2026-09-13',
      note: 'Existe información oficial, pero la plataforma todavía no consolidó un dataset 2026 homogéneo por campaña, medio y organismo.'
    },
    ...['payroll','suppliers','public-works','transfers','debt','open-data'].map(dimensionId => ({
      dimensionId,
      status: 'not_found' as const,
      checkedAt: '2026-09-13',
      note: 'La plataforma todavía no completó la verificación específica de esta dimensión. No se afirma que la Nación no la publique.'
    }))
  ]
};

export function makePendingTransparencyProfile(
  jurisdictionId: string,
  jurisdictionName: string,
  level: 'Provincia' | 'Municipio',
  sourceUrl?: string
): StateTransparencyProfile {
  return {
    jurisdictionId,
    jurisdictionName,
    level,
    evidence: TRANSPARENCY_DIMENSIONS.map(dimension => ({
      dimensionId: dimension.id,
      status: 'not_found',
      sourceUrl,
      sourceLabel: sourceUrl ? `Portal oficial de ${jurisdictionName}` : undefined,
      checkedAt: '2026-09-13',
      note: `La plataforma aún no completó la verificación de «${dimension.name}» para ${jurisdictionName}. Este estado no implica que la jurisdicción no publique el dato.`
    }))
  };
}

export function transparencyScore(profile: StateTransparencyProfile) {
  const weights: Record<TransparencyStatus, number> = {
    published: 1,
    partial: 0.5,
    not_found: 0,
    not_published_confirmed: 0
  };
  const score = profile.evidence.reduce((sum, item) => sum + weights[item.status], 0);
  return Math.round((score / Math.max(1, TRANSPARENCY_DIMENSIONS.length)) * 100);
}
