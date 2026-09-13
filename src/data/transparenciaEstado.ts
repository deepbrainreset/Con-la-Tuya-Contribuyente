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

const CHECKED_AT = '2026-09-13';
const PROV_EXECUTION = 'https://www.argentina.gob.ar/economia/sechacienda/coordinacion-fiscal-provincial/ejecucion-presupuestaria-provincial/ejecuciones';
const PROV_FUNCTION = 'https://www.argentina.gob.ar/economia/sechacienda/coordinacion-fiscal-provincial/ejecucion-presupuestaria-provincial/gastos-por';
const PROV_OBJECT = 'https://www.argentina.gob.ar/interior/subsecretaria-de-relaciones-con-provincias/informacion-presupuestaria';
const PBA_BUDGET_2026 = 'https://www.argentina.gob.ar/normativa/provincial/ley-15557-123456789-0abc-defg-755-5100bvorpyel/actualizacion';
const PBA_EXECUTION_2026 = 'https://www.gba.gob.ar/economia/direccion_provincial_de_presupuesto_publico/ejecucion_presupuestaria';
const PBA_CONTRACTS = 'https://www.gba.gob.ar/node/49316';
const PBA_MEDIA_REGISTRY = 'https://www.gba.gob.ar/comunicacion_publica/registro_oficial_de_medios_publicitarios';

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
    { dimensionId: 'budget', status: 'published', sourceUrl: 'https://www.argentina.gob.ar/economia/onp/presupuesto-ciudadano-2026/datos-abiertos', sourceLabel: 'Presupuesto Ciudadano / datos abiertos', checkedAt: CHECKED_AT, note: 'Existe publicación oficial del presupuesto y sus clasificaciones.' },
    { dimensionId: 'execution', status: 'published', sourceUrl: 'https://www.presupuestoabierto.gob.ar/', sourceLabel: 'Presupuesto Abierto', checkedAt: CHECKED_AT, note: 'La ejecución puede consultarse por distintas clasificaciones presupuestarias.' },
    { dimensionId: 'functional', status: 'published', sourceUrl: 'https://www.presupuestoabierto.gob.ar/', sourceLabel: 'Presupuesto Abierto', checkedAt: CHECKED_AT, note: 'Disponible por finalidad y función.' },
    { dimensionId: 'object', status: 'published', sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/visualizacion-en-que-se-gasta', sourceLabel: 'Presupuesto Abierto — en qué se gasta', checkedAt: CHECKED_AT, note: 'Disponible por objeto del gasto.' },
    { dimensionId: 'procurement', status: 'published', sourceUrl: 'https://comprar.gob.ar/', sourceLabel: 'COMPR.AR', checkedAt: CHECKED_AT, note: 'Compras y contrataciones nacionales accesibles mediante el portal oficial.' },
    { dimensionId: 'advertising', status: 'partial', sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/norma-422032/normas-modificadas', sourceLabel: 'Resolución 57/2025 — suspensión de campañas onerosas', checkedAt: CHECKED_AT, note: 'La Administración Central mantiene suspendidas las campañas institucionales onerosas durante 2026. La plataforma conserva además series históricas oficiales por medio; la suspensión no se extrapola automáticamente a todo el sector público nacional.' },
    ...['payroll','suppliers','public-works','transfers','debt','open-data'].map(dimensionId => ({ dimensionId, status: 'not_found' as const, checkedAt: CHECKED_AT, note: 'La plataforma todavía no completó la verificación específica de esta dimensión. No se afirma que la Nación no la publique.' }))
  ]
};

function pendingEvidence(dimensionId: string, jurisdictionName: string, sourceUrl?: string): TransparencyEvidence {
  const dimension = TRANSPARENCY_DIMENSIONS.find(item => item.id === dimensionId);
  return {
    dimensionId,
    status: 'not_found',
    sourceUrl,
    sourceLabel: sourceUrl ? `Portal/fuente oficial de ${jurisdictionName}` : undefined,
    checkedAt: CHECKED_AT,
    note: `La plataforma aún no completó la verificación de «${dimension?.name || dimensionId}» para ${jurisdictionName}. Este estado no implica que la jurisdicción no publique el dato.`
  };
}

export function makeProvincialTransparencyProfile(jurisdictionId: string, jurisdictionName: string): StateTransparencyProfile {
  const evidence = TRANSPARENCY_DIMENSIONS.map(dimension => pendingEvidence(dimension.id, jurisdictionName));
  const set = (item: TransparencyEvidence) => {
    const index = evidence.findIndex(current => current.dimensionId === item.dimensionId);
    if (index >= 0) evidence[index] = item;
  };

  set({ dimensionId: 'execution', status: 'published', sourceUrl: PROV_EXECUTION, sourceLabel: 'Secretaría de Hacienda — ejecuciones provinciales', checkedAt: CHECKED_AT, note: 'La fuente federal publica ejecución presupuestaria 2026 desagregada para las 24 jurisdicciones.' });
  set({ dimensionId: 'functional', status: 'published', sourceUrl: PROV_FUNCTION, sourceLabel: 'Secretaría de Hacienda — gastos por finalidad y función', checkedAt: CHECKED_AT, note: 'Existe serie 2026 por jurisdicción y clasificación homogénea por finalidad y función.' });
  set({ dimensionId: 'object', status: 'published', sourceUrl: PROV_OBJECT, sourceLabel: 'Información Presupuestaria Provincial', checkedAt: CHECKED_AT, note: 'La fuente oficial publica ejecuciones provinciales acumuladas por clasificación económica y por objeto del gasto.' });

  if (jurisdictionId === 'buenos_aires') {
    set({ dimensionId: 'budget', status: 'published', sourceUrl: PBA_BUDGET_2026, sourceLabel: 'Ley 15.557 — Presupuesto PBA 2026', checkedAt: CHECKED_AT, note: 'La Provincia de Buenos Aires tiene presupuesto 2026 publicado; la ley fija erogaciones corrientes y de capital por $43,021 billones.' });
    set({ dimensionId: 'execution', status: 'published', sourceUrl: PBA_EXECUTION_2026, sourceLabel: 'PBA — ejecución presupuestaria', checkedAt: CHECKED_AT, note: 'La Provincia publica informes de ejecución 2026 por trimestre; al momento de la revisión figuran I y II trimestre.' });
    set({ dimensionId: 'procurement', status: 'partial', sourceUrl: PBA_CONTRACTS, sourceLabel: 'PBA — contrataciones', checkedAt: CHECKED_AT, note: 'Existen portales oficiales de contrataciones de obra pública y bienes/servicios. La plataforma todavía no consolidó todos los organismos y adjudicaciones en un único dataset.' });
    set({ dimensionId: 'public-works', status: 'partial', sourceUrl: 'https://pbacontrataciones.minfra.gba.gob.ar/ComprasElectronicas.aspx', sourceLabel: 'PBA Contrataciones — Obra Pública', checkedAt: CHECKED_AT, note: 'El portal publica procesos de contratación de obra pública y documentación asociada.' });
    set({ dimensionId: 'advertising', status: 'partial', sourceUrl: PBA_MEDIA_REGISTRY, sourceLabel: 'Registro Oficial de Medios Publicitarios PBA', checkedAt: CHECKED_AT, note: 'La Provincia mantiene un registro oficial de medios y tarifarios. La plataforma todavía no localizó una publicación consolidada 2026 con monto efectivamente pagado a cada medio/canal; por eso no se marca como gasto por medio plenamente publicado.' });
  }

  return { jurisdictionId, jurisdictionName, level: 'Provincia', evidence };
}

export function makePendingTransparencyProfile(
  jurisdictionId: string,
  jurisdictionName: string,
  level: 'Provincia' | 'Municipio',
  sourceUrl?: string
): StateTransparencyProfile {
  if (level === 'Provincia') return makeProvincialTransparencyProfile(jurisdictionId, jurisdictionName);
  return {
    jurisdictionId,
    jurisdictionName,
    level,
    evidence: TRANSPARENCY_DIMENSIONS.map(dimension => pendingEvidence(dimension.id, jurisdictionName, sourceUrl))
  };
}

export function transparencyScore(profile: StateTransparencyProfile) {
  const weights: Record<TransparencyStatus, number> = { published: 1, partial: 0.5, not_found: 0, not_published_confirmed: 0 };
  const score = profile.evidence.reduce((sum, item) => sum + weights[item.status], 0);
  return Math.round((score / Math.max(1, TRANSPARENCY_DIMENSIONS.length)) * 100);
}
