/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Módulo de Contraste: Narrativas Mediáticas/Políticas vs. Proceso Administrativo y Evidencia Oficial.
 * Regla editorial estricta:
 * - Evalúa con la misma vara afirmaciones del oficialismo, de la oposición y de coberturas mediáticas.
 * - Distingue entre: (1) Qué se intenta instalar o afirma desde cada sector, (2) Cómo funciona
 *   legal y contablemente el proceso administrativo en el Estado, (3) Qué actos administrativos
 *   y registros presupuestarios efectivos existen, y (4) Qué partes están verificadas, cuáles
 *   contradicen la documentación oficial y cuáles siguen sin evidencia pública concluyente.
 */

import { EpistemicStatus } from '../types/observatorio';

export interface NarrativeClaim {
  sector: string; // Ej: "Narrativa de sectores opositores / gremiales", "Narrativa de vocería oficialista", "Titulares mediáticos frecuentes"
  claimSummary: string;
  sourceContext: string;
  verificationOutcome: 'contradicho_por_norma_o_expediente' | 'parcialmente_cierto_con_omisiones' | 'respaldado_por_registro_oficial' | 'sin_evidencia_publica_concluyente';
  verificationExplanation: string;
}

export interface AdministrativeStepRecord {
  stepOrder: number;
  stageTitle: string;
  responsibleBody: string;
  legalBasis: string;
  howItActuallyWorks: string;
  recordedEvidenceInCase: string;
  sourceUrl: string;
}

export interface EvidenceVsNarrativeReport {
  id: string;
  slug: string;
  datePublished: string;
  lastVerified: string;
  title: string;
  category: 'Educación y Universidades' | 'Previsional y Seguridad Social' | 'Federalismo y Obra Pública' | 'Contrataciones y Administración' | 'Tributos y Política Fiscal';
  summary: string;
  epistemicStatus: EpistemicStatus;
  // Conexiones transversales hacia los distintos vértices de la plataforma
  relatedRoutes: {
    auditSlug?: string;
    dossierId?: string;
    comparisonId?: string;
    tab: string;
    label: string;
  }[];
  narrativesAnalyzed: NarrativeClaim[];
  administrativeProcess: AdministrativeStepRecord[];
  whatIsActuallyHappening: string[];
  pendingUnverifiedQuestions: string[];
  officialSources: {
    label: string;
    institution: string;
    url: string;
  }[];
}

export const EVIDENCE_VS_NARRATIVE_REPORTS: EvidenceVsNarrativeReport[] = [
  {
    id: 'contraste-universidades-auditorias-2024-2026',
    slug: 'universidades-publicas-auditorias-sigen-agn',
    datePublished: '2026-10-30',
    lastVerified: '2026-10-30',
    title: 'Universidades Nacionales: debate sobre cierre/privatización vs. régimen de auditorías contables (SIGEN/AGN) y ejecución presupuestaria',
    category: 'Educación y Universidades',
    summary: 'Contraste entre las afirmaciones sobre un supuesto cierre o arancelamiento de las universidades públicas, las afirmaciones sobre ausencia total de controles y lo que efectivamente registran la Constitución Nacional, las Leyes 24.156 y 24.521, el dictamen de la Procuración del Tesoro (octubre 2024) y las transferencias devengadas de la Secretaría de Educación.',
    epistemicStatus: 'verificado',
    relatedRoutes: [
      { tab: 'auditorias', auditSlug: 'universidades-publicas', label: 'Auditoría Temática: Universidades Nacionales' },
      { tab: 'gasto', label: 'Ejecución de Gasto Público Nacional' },
      { tab: 'observatorio', dossierId: 'dossier-conicet-ciencia', label: 'Expediente: Ciencia y Universidades' },
      { tab: 'consultas', label: 'Solicitar rendición Ley 27.275' }
    ],
    narrativesAnalyzed: [
      {
        sector: 'Narrativa instalada desde sectores opositores y conducciones universitarias',
        claimSummary: '«El Gobierno busca cerrar o privatizar/arancelar la universidad pública y vulnerar la autonomía universitaria mediante la intervención de la SIGEN.»',
        sourceContext: 'Debates parlamentarios por la Ley de Financiamiento Universitario (2024) y comunicados gremiales/rectorales.',
        verificationOutcome: 'contradicho_por_norma_o_expediente',
        verificationExplanation: 'No existe ningún proyecto de ley del Poder Ejecutivo, decreto ni resolución administrativa que proponga el cierre de universidades nacionales o la derogación de la gratuidad de los estudios de grado garantizada por el Art. 75 inc. 19 de la Constitución Nacional y el Art. 2 bis de la Ley 24.521. Las medidas administrativas emitidas se circunscriben al control contable de rendición de fondos transferidos por el Tesoro y a la discusión presupuestaria salarial.'
      },
      {
        sector: 'Narrativa instalada sobre ausencia absoluta de control o imposibilidad legal de auditar',
        claimSummary: '«Las universidades ya están auditadas al 100% en tiempo real» vs. «La autonomía impide que el Poder Ejecutivo audite el destino de las transferencias».',
        sourceContext: 'Cruces mediáticos sobre el alcance de la AGN y la SIGEN en las 61 universidades nacionales.',
        verificationOutcome: 'parcialmente_cierto_con_omisiones',
        verificationExplanation: 'Ambas afirmaciones extremas omiten el estado real del circuito jurídico y contable: (1) El Art. 59 de la Ley 24.521 establece expresamente que las universidades nacionales tienen autarquía económico-financiera que ejercerán «dentro del régimen de la Ley 24.156»; (2) En noviembre de 2022 (gestión Zannini), un dictamen de la Procuración del Tesoro (PTN) había restringido la actuación de la SIGEN, dejando sólo el control externo de la AGN (cuyo Plan de Acción Anual presenta rezagos plurianuales y cobertura fragmentaria); (3) El 15 de octubre de 2024 (gestión Barra), un nuevo dictamen de la PTN revirtió la doctrina de 2022 y habilitó a la SIGEN (Art. 98 Ley 24.156) a auditar la trazabilidad contable de los recursos públicos transferidos, sin injerencia en planes de estudio ni designación de cátedras.'
      },
      {
        sector: 'Narrativa oficialista sobre actualización plena del presupuesto universitario',
        claimSummary: '«El presupuesto universitario fue actualizado en un 270% y no registra pérdida real.»',
        sourceContext: 'Comunicados oficiales sobre las partidas de gastos de funcionamiento (2024).',
        verificationOutcome: 'parcialmente_cierto_con_omisiones',
        verificationExplanation: 'El incremento del 270% se aplicó sobre la partida de gastos de funcionamiento operativo (~10% del presupuesto universitario total), mientras que el ~85-90% restante corresponde a salarios docentes y no docentes, cuya evolución nominal en 2024 corrió por debajo de la inflación acumulada del período según datos de ejecución de la Subsecretaría de Políticas Universitarias (SPU) e INDEC.'
      }
    ],
    administrativeProcess: [
      {
        stepOrder: 1,
        stageTitle: 'Garantía constitucional de autonomía, autarquía y gratuidad de grado',
        responsibleBody: 'Congreso de la Nación / Constitución Nacional',
        legalBasis: 'Art. 75 inc. 19 CN y Ley 24.521 (Educación Superior)',
        howItActuallyWorks: 'Cualquier cierre, fusión, creación o arancelamiento de estudios de grado de una Universidad Nacional requiere obligatoriamente una ley formal sancionada por el Congreso de la Nación. El Poder Ejecutivo no tiene competencia legal para cerrar ni privatizar universidades por decreto ni resolución.',
        recordedEvidenceInCase: 'Vigencia plena de la Ley 24.521 y sus modificatorias; 0 proyectos ejecutivos de privatización o cierre presentados en el Boletín Oficial o en mesa de entradas del Congreso.',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25394/texact.htm'
      },
      {
        stepOrder: 2,
        stageTitle: 'Transferencia de fondos del Tesoro Nacional y rendición de cuentas (SITRARED)',
        responsibleBody: 'Secretaría de Educación (Subsecretaría de Políticas Universitarias)',
        legalBasis: 'Ley 24.156 de Administración Financiera y Resoluciones SPU',
        howItActuallyWorks: 'El Tesoro transfiere mensualmente fondos para salarios y gastos de funcionamiento. Las universidades deben rendir el uso de los fondos transferidos y las contrataciones/convenios con terceros. Cuando existen transferencias para programas específicos sin rendición documentada en término, la administración central registra observaciones contables.',
        recordedEvidenceInCase: 'Informes de transferencias a Universidades Nacionales publicados en Presupuesto Abierto y resoluciones de exigencia de rendición documentada de convenios.',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/datos-abiertos'
      },
      {
        stepOrder: 3,
        stageTitle: 'Control interno (SIGEN) y control externo (AGN)',
        responsibleBody: 'Sindicatura General de la Nación (SIGEN) y Auditoría General de la Nación (AGN)',
        legalBasis: 'Arts. 98 y 117 Ley 24.156; Art. 59 bis Ley 24.521; Dictamen PTN 2024',
        howItActuallyWorks: 'La AGN realiza control externo posterior dependiente del Congreso, mientras que la SIGEN audita procesos contables, compras, contrataciones directas y rendiciones de fondos públicos. Auditar la contabilidad verifica que el dinero llegue a aulas, laboratorios y salarios en lugar de desviarse en intermediaciones o gastos sin respaldo.',
        recordedEvidenceInCase: 'Habilitación jurídica de auditorías de SIGEN mediante Dictamen de la Procuración del Tesoro (octubre 2024) y litigios judiciales puntuales iniciados por rectorados que resistieron la competencia de SIGEN.',
        sourceUrl: 'https://www.argentina.gob.ar/sigen'
      }
    ],
    whatIsActuallyHappening: [
      'No existe ningún acto administrativo ni proyecto legislativo oficial para cerrar o privatizar universidades nacionales.',
      'El conflicto administrativo real gira en torno a dos ejes verificables: (a) la habilitación de auditorías contables de la SIGEN sobre el uso de fondos, compras directas y convenios con terceros en las universidades nacionales, y (b) la negociación salarial y presupuestaria de las partidas devengadas frente a la inflación.',
      'En materia de calidad y eficiencia terminal, los Anuarios Estadísticos Universitarios (SPU) muestran una brecha estructural de décadas: sobre más de 2,5 millones de estudiantes pregrado/grado, se gradúan alrededor de 145.000 por año, con marcadas asimetrías entre carreras y sin que el Estado publique un desglose unificado de costo por graduado ni de compras descentralizadas por facultad.'
    ],
    pendingUnverifiedQuestions: [
      'Publicación en datos abiertos del estado de rendición de cuentas individual de cada una de las 61 universidades nacionales en el sistema SITRARED.',
      'Detalle nominal y montos de los convenios de asistencia técnica firmados entre ministerios/organismos estatales y universidades nacionales entre 2015 y 2026.'
    ],
    officialSources: [
      { label: 'Ley 24.521 de Educación Superior (InfoLEG)', institution: 'Congreso de la Nación', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25394/texact.htm' },
      { label: 'Ley 24.156 de Administración Financiera y Sistemas de Control', institution: 'Congreso de la Nación', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/554/texact.htm' },
      { label: 'Sindicatura General de la Nación (SIGEN) — Informes y Normativa', institution: 'Presidencia de la Nación', url: 'https://www.argentina.gob.ar/sigen' },
      { label: 'Estadísticas Universitarias y Presupuesto (SPU)', institution: 'Secretaría de Educación', url: 'https://www.argentina.gob.ar/educacion/universidades/informacion' }
    ]
  },
  {
    id: 'contraste-sistema-previsional-moratorias-2008-2026',
    slug: 'sistema-previsional-aportes-moratorias-sostenibilidad',
    datePublished: '2026-10-30',
    lastVerified: '2026-10-30',
    title: 'Jubilaciones y Moratorias: discurso de «inclusión sin costo» vs. discurso de «eliminación de derechos» frente al balance actuarial de ANSES',
    category: 'Previsional y Seguridad Social',
    summary: 'Contraste técnico entre las narrativas políticas sobre las moratorias previsionales (Leyes 25.994, 26.970 y 27.705) y la finalización de su vigencia en marzo de 2025 frente a los registros contables y actuariales del SIPA.',
    epistemicStatus: 'verificado',
    relatedRoutes: [
      { tab: 'auditorias', auditSlug: 'jubilaciones-pensiones', label: 'Auditoría Temática: Jubilaciones y SIPA' },
      { tab: 'observatorio', dossierId: 'dossier-moratorias-previsionales', label: 'Expediente: Moratorias Previsionales' },
      { tab: 'observatorio', dossierId: 'dossier-previsional-2008', label: 'Expediente: Estatización AFJP (2008)' },
      { tab: 'responsabilidad-politica', label: 'Votación Nominal Ley 27.705' }
    ],
    narrativesAnalyzed: [
      {
        sector: 'Narrativa de impulsores de moratorias generalizadas (2005–2023)',
        claimSummary: '«Las moratorias se autofinancian con los descuentos de cuotas y no afectan el haber de quienes aportaron 30 años.»',
        sourceContext: 'Fundamentos parlamentarios de las Leyes 26.970 y 27.705.',
        verificationOutcome: 'contradicho_por_norma_o_expediente',
        verificationExplanation: 'Los boletines estadísticos de la Secretaría de Seguridad Social y los informes de la OPC demuestran que las cuotas descontadas representan una fracción menor de los años regularizados y que el SIPA requiere financiamiento tributario general (IVA, Ganancias, Combustibles, PAIS) superior al 40% de sus erogaciones totales, coexistiendo una relación activo/pasivo de ~1,45 aportantes por beneficio (cuando el equilibrio contributivo puro exige >3).'
      },
      {
        sector: 'Narrativa de sectores opositores ante el vencimiento de la Ley 27.705 (2025)',
        claimSummary: '«Quien no tiene 30 años de aportes registrados queda sin ninguna cobertura en la vejez.»',
        sourceContext: 'Coberturas mediáticas sobre el fin de la prórroga de la moratoria Ley 27.705 en marzo de 2025.',
        verificationOutcome: 'contradicho_por_norma_o_expediente',
        verificationExplanation: 'Continúa vigente por ley la Prestación Universal para el Adulto Mayor (PUAM, Ley 27.260 Art. 13), que otorga el 80% del haber mínimo a partir de los 65 años con actualización por movilidad (IPC mensual según DNU 274/2024).'
      }
    ],
    administrativeProcess: [
      {
        stepOrder: 1,
        stageTitle: 'Recaudación de aportes y contribuciones vs. recursos tributarios afectados',
        responsibleBody: 'ARCA (ex AFIP) y ANSES',
        legalBasis: 'Ley 24.241, Ley 26.425 y Ley 27.260',
        howItActuallyWorks: 'El SIPA no es una caja aislada financiada sólo por sueldos: como la informalidad laboral supera el 35% de la fuerza de trabajo desde hace décadas, los aportes patronales y personales no alcanzan a cubrir las prestaciones y el Tesoro transfiere impuestos generales al consumo y a la renta.',
        recordedEvidenceInCase: 'Boletín Estadístico de la Seguridad Social (BESS): más de 4,1 millones de beneficios vigentes provienen de moratorias previsionales.',
        sourceUrl: 'https://www.argentina.gob.ar/trabajo/seguridadsocial/bess'
      }
    ],
    whatIsActuallyHappening: [
      'El sistema previsional argentino duplica el número de beneficios de 2005 (~7,2 millones de beneficios), pero con una pirámide contributiva debilitada por décadas de empleo no registrado.',
      'El gasto previsional representa cerca del 45% del gasto primario nacional: cualquier incremento o bono sin contrapartida de formalización laboral impacta de forma directa en el equilibrio fiscal o en el valor real del haber medio.'
    ],
    pendingUnverifiedQuestions: [
      'Publicación oficial de una valuación actuarial de largo plazo (2026–2050) del SIPA y de los regímenes especiales por parte del Poder Ejecutivo y la AGN.'
    ],
    officialSources: [
      { label: 'Boletín Estadístico de la Seguridad Social (BESS)', institution: 'Ministerio de Capital Humano / ANSES', url: 'https://www.argentina.gob.ar/trabajo/seguridadsocial/bess' },
      { label: 'Ley 27.705 — Plan de Pago de Deuda Previsional', institution: 'InfoLEG', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/380000-384999/381054/norma.htm' }
    ]
  },
  {
    id: 'contraste-compras-publicas-contrataciones-2026',
    slug: 'contrataciones-publicas-comprar-auditoria-precios',
    datePublished: '2026-10-30',
    lastVerified: '2026-10-30',
    title: 'Compras Públicas y Licitaciones: denuncias mediáticas de sobreprecios vs. etapas reales del proceso en COMPR.AR y precios testigo SIGEN',
    category: 'Contrataciones y Administración',
    summary: 'Cómo distinguir en una licitación pública entre un pliego/convocatoria preliminar, una oferta presentada, una adjudicación firme con Orden de Compra y una auditoría de sobreprecio real.',
    epistemicStatus: 'verificado',
    relatedRoutes: [
      { tab: 'auditorias', auditSlug: 'compras-publicidad', label: 'Auditoría Temática: Compras y Publicidad' },
      { tab: 'gasto', label: 'Monitor de Compras Públicas (Gasto Público)' },
      { tab: 'observatorio', dossierId: 'dossier-compras-ign-2026', label: 'Expediente: Proceso COMPR.AR IGN' }
    ],
    narrativesAnalyzed: [
      {
        sector: 'Instalación frecuente en redes y coberturas periodísticas rápidas',
        claimSummary: '«El organismo X pagó tal monto con sobreprecio» tomando únicamente la carátula de apertura de un proceso en COMPR.AR o el presupuesto estimado del pliego.',
        sourceContext: 'Publicaciones virales sobre contrataciones estatales antes de la emisión del acto de adjudicación.',
        verificationOutcome: 'parcialmente_cierto_con_omisiones',
        verificationExplanation: 'En el régimen del Decreto 1023/2001 y Decreto 1030/2016, la apertura de un proceso o la cotización de un proveedor no implica pago ni adjudicación. Incluso un proceso iniciado puede declararse desierto, fracasado o dejarse sin efecto antes de emitir la Orden de Compra.'
      }
    ],
    administrativeProcess: [
      {
        stepOrder: 1,
        stageTitle: 'Convocatoria, Pliego y Apertura de Ofertas',
        responsibleBody: 'Unidad Operativa de Contrataciones (UOC) de cada jurisdicción',
        legalBasis: 'Decreto Delegado 1023/2001 y Decreto 1030/2016',
        howItActuallyWorks: 'Se publica el pliego de bases y condiciones particulares con especificaciones técnicas. En esta etapa aún no existe erogación ni proveedor adjudicado.',
        recordedEvidenceInCase: 'Pliegos públicos en el portal COMPR.AR.',
        sourceUrl: 'https://comprar.gob.ar/'
      },
      {
        stepOrder: 2,
        stageTitle: 'Dictamen de Evaluación, Adjudicación y Orden de Compra',
        responsibleBody: 'Comisión Evaluadora y Autoridad Competente',
        legalBasis: 'Decreto 1030/2016',
        howItActuallyWorks: 'Sólo cuando se firma el acto administrativo de adjudicación y se perfecciona la Orden de Compra nace el compromiso presupuestario. Para evaluar sobreprecio de forma rigurosa debe compararse el precio unitario adjudicado contra especificaciones idénticas (marca, plazo de pago, logística e impuestos) o Precio Testigo SIGEN.',
        recordedEvidenceInCase: 'Registro de Órdenes de Compra y ejecución devengada/pagada en SIDIF.',
        sourceUrl: 'https://www.argentina.gob.ar/jefatura/innovacion-publica/oficina-nacional-de-contrataciones'
      }
    ],
    whatIsActuallyHappening: [
      'El portal COMPR.AR permite verificar pliegos y actos de apertura, pero la confirmación de un gasto efectivo exige verificar la Orden de Compra perfeccionada y la etapa de devengado/pagado en el presupuesto.',
      'La plataforma clasifica preventivamente como «no concluyente» cualquier proceso en el que no estén publicados simultáneamente la especificación técnica exacta, la orden de compra adjudicada y una referencia de mercado homogénea.'
    ],
    pendingUnverifiedQuestions: [
      'Integración automática de órdenes de compra perfeccionadas de COMPR.AR con los pagos efectivos de la Tesorería General de la Nación.'
    ],
    officialSources: [
      { label: 'Portal Oficial de Compras Públicas (COMPR.AR)', institution: 'Oficina Nacional de Contrataciones', url: 'https://comprar.gob.ar/' },
      { label: 'Decreto 1023/2001 — Régimen de Contrataciones de la Administración Nacional', institution: 'InfoLEG', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/68396/texact.htm' }
    ]
  },
  {
    id: 'contraste-transferencias-provincias-coparticipacion-2024-2026',
    slug: 'coparticipacion-federal-vs-transferencias-discrecionales',
    datePublished: '2026-10-30',
    lastVerified: '2026-10-30',
    title: 'Fondos a Provincias: discurso de «corte de la coparticipación» vs. reducción de transferencias no automáticas (discrecionales)',
    category: 'Federalismo y Obra Pública',
    summary: 'Diferencia legal y contable entre los envíos automáticos por Coparticipación Federal de Impuestos (Ley 23.548, intangibles por el Poder Ejecutivo) y las transferencias no automáticas o discrecionales del Tesoro Nacional.',
    epistemicStatus: 'verificado',
    relatedRoutes: [
      { tab: 'gasto', label: 'Gasto Público por Jurisdicción' },
      { tab: 'mapa', label: 'Mapa Federal de las 24 Jurisdicciones' },
      { tab: 'transparencia', label: 'Transparencia Provincial' }
    ],
    narrativesAnalyzed: [
      {
        sector: 'Narrativa instalada en disputas entre gobernadores y Nación',
        claimSummary: '«El Gobierno Nacional retuvo o cortó la coparticipación que les corresponde por ley a las provincias.»',
        sourceContext: 'Declaraciones públicas provinciales ante la caída de ingresos fiscales o el recorte de transferencias presupuestarias.',
        verificationOutcome: 'parcialmente_cierto_con_omisiones',
        verificationExplanation: 'Las transferencias automáticas de Coparticipación Federal (Ley 23.548) son liquidadas diariamente de forma automática por el Banco de la Nación Argentina según coeficientes legales fijos; el Poder Ejecutivo no puede retenerlas discrecionalmente. Lo que sí se redujo de manera drástica (más del 75% real en 2024) fueron las transferencias no automáticas (discrecionales, ATN, convenios de obra y compensaciones tarifarias o previsionales), además del impacto que tuvo la baja o suba de impuestos coparticipables como Ganancias.'
      }
    ],
    administrativeProcess: [
      {
        stepOrder: 1,
        stageTitle: 'Giro diario automático de Coparticipación Federal',
        responsibleBody: 'ARCA y Banco de la Nación Argentina',
        legalBasis: 'Ley 23.548 Arts. 3, 4 y 6',
        howItActuallyWorks: 'El Banco Nación transfiere automáticamente cada día hábil a cada provincia su porcentaje legal sobre la masa coparticipable recaudada (IVA, Ganancias, Internos, etc.), sin intervención discrecional de funcionarios del Ministerio de Economía.',
        recordedEvidenceInCase: 'Planillas diarias de distribución de recursos fiscales de la Dirección Nacional de Asuntos Provinciales (DNAP).',
        sourceUrl: 'https://www.argentina.gob.ar/economia/asuntosprovinciales'
      },
      {
        stepOrder: 2,
        stageTitle: 'Transferencias no automáticas (discrecionales y convenios)',
        responsibleBody: 'Jefatura de Gabinete / Ministerio de Economía / Ministerios sectoriales',
        legalBasis: 'Ley de Presupuesto Anual y Ley 24.156',
        howItActuallyWorks: 'Son giros sujetos a decisión administrativa, ejecución de programas, Aportes del Tesoro Nacional (ATN) o asistencia a cajas provinciales no transferidas, donde sí existió una contracción severa y disputas judiciales ante la CSJN.',
        recordedEvidenceInCase: 'Informes de ejecución mensual de transferencias no automáticas en Presupuesto Abierto y demandas originarias ante la Corte Suprema.',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/datos-abiertos'
      }
    ],
    whatIsActuallyHappening: [
      'La Coparticipación Federal automática se gira diariamente por ley; su variación depende de cuánto se recaude de IVA y Ganancias en la economía.',
      'El ajuste fiscal federal se ejecutó sobre las transferencias discrecionales (no automáticas), convenios de obra pública nacional y litigios por las 13 cajas previsionales provinciales no transferidas a ANSES.'
    ],
    pendingUnverifiedQuestions: [
      'Auditoría definitiva de la ANSES y las 13 provincias con cajas previsionales propias sobre los déficits armonizados pendientes de conciliación.'
    ],
    officialSources: [
      { label: 'Dirección Nacional de Asuntos Provinciales (DNAP) — Transferencias a Provincias', institution: 'Ministerio de Economía', url: 'https://www.argentina.gob.ar/economia/asuntosprovinciales' },
      { label: 'Ley 23.548 — Coparticipación Federal de Recursos Fiscales', institution: 'InfoLEG', url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21108/texact.htm' }
    ]
  }
];
