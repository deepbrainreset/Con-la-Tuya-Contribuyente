/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Auditorías Temáticas Sectoriales (1946–Actualidad)
 * Conecta costos presupuestarios, normas, organismos responsables, indicadores físicos documentados
 * y limitaciones explícitas de medición ("ausencia de impacto medido != impacto inexistente").
 */

import type { ThematicAuditRecord } from '../types/observatorio';

export const THEMATIC_AUDITS: ThematicAuditRecord[] = [
  {
    id: 'audit-previsional',
    slug: 'jubilaciones-pensiones',
    title: 'Observatorio del Sistema Previsional y sus Reformas (1946–2026)',
    sector: 'Seguridad Social y Previsión',
    historicalCoverage: '1946 (Expansión Cajas Gremiales) → 1968 (Leyes 18.037/18.038) → 1993 (Ley 24.241 AFJP) → 2008 (Ley 26.425 SIPA) → 2026',
    governingNorms: [
      'Ley 14.370 (1954)',
      'Leyes 18.037 y 18.038 (1968)',
      'Ley 24.241 (1993 — SIJP)',
      'Ley 26.425 (2008 — SIPA)',
      'Leyes de Moratoria 24.476, 25.994, 26.970 y 27.705',
      'Ley 27.426 (2017), Ley 27.609 (2020) y DNU 274/2024 (Movilidad por IPC)'
    ],
    responsibleOrganisms: [
      'ANSES (Administración Nacional de la Seguridad Social)',
      'Secretaría de Trabajo, Empleo y Seguridad Social',
      'Cajas Previsionales Provinciales no transferidas (13 provincias)',
      'Fondo de Garantía de Sustentabilidad (FGS)'
    ],
    financialSummary: [
      {
        nominalAmount: 83_443_724_700_000,
        currency: 'ARS',
        period: '2026',
        budgetStage: 'credito_inicial',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Partida Seguridad Social en el Presupuesto Nacional Ley 27.798 (representa el 56,35% del gasto total aprobado de la Administración Nacional).',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-LEY-27798',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Participación en el Presupuesto Nacional 2026 (Ley 27.798)',
        value: '56,35% del gasto total aprobado ($83,44 billones ARS)',
        period: '2026',
        sourceName: 'Boletín Oficial — Ley 27.798',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Cobertura previsional de adultos mayores en edad jubilatoria',
        value: '> 92% de la población en edad pasiva (SIPA + Cajas Provinciales + PUAM)',
        period: '2024–2025',
        sourceName: 'ANSES — Boletín Estadístico de la Seguridad Social (BESS)',
        sourceUrl: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Proporción de beneficios SIPA con intervención de moratoria previsional',
        value: '~66% – 69% sobre el total de jubilaciones del régimen general',
        period: '2024–2025',
        sourceName: 'ANSES — Estadísticas de la Seguridad Social',
        sourceUrl: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Relación aportantes activos / beneficiarios pasivos (SIPA)',
        value: '~1,5 a 1,6 aportantes efectivos por cada beneficiario (frente al óptimo teórico de 3 a 4)',
        period: '2024–2025',
        sourceName: 'BESS / Oficina de Presupuesto del Congreso (OPC)',
        sourceUrl: 'https://www.opc.gob.ar/',
        epistemicStatus: 'oficial_con_reserva'
      }
    ],
    measurementLimitations: [
      'El sistema previsional argentino es de financiamiento mixto (aportes y contribuciones sobre el salario + impuestos nacionales coparticipables y de asignación específica), por lo que el "déficit puro contributivo" difiere del resultado financiero consolidado de ANSES.',
      'Existen 13 cajas previsionales provinciales no transferidas a la Nación cuyas transferencias para cubrir déficits armonizados han sido objeto de controversias judiciales ante la Corte Suprema de Justicia de la Nación.'
    ],
    auditReportsCited: [
      {
        issuer: 'ANSES',
        title: 'Boletín Estadístico de la Seguridad Social (BESS) — Series históricas',
        year: 2025,
        url: 'https://www.anses.gob.ar/informacion/estadisticas-de-la-seguridad-social'
      },
      {
        issuer: 'AGN',
        title: 'Informes de Auditoría sobre el Fondo de Garantía de Sustentabilidad (FGS)',
        year: 2024,
        url: 'https://www.agn.gob.ar/'
      }
    ],
    relatedDossierIds: ['dossier-previsional-2008', 'dossier-moratorias-previsionales']
  },
  {
    id: 'audit-universidades',
    slug: 'universidades-publicas',
    title: 'Auditoría de Universidades Públicas Nacionales',
    sector: 'Educación Superior Universitaria',
    historicalCoverage: '1949 (Gratuidad universitaria Decreto 29.337/49) → 1995 (Ley 24.521) → 2026',
    governingNorms: [
      'Constitución Nacional Art. 75 inc. 19 (Autonomía y autarquía universitaria)',
      'Decreto 29.337/1949 (Supresión de aranceles universitarios)',
      'Ley 24.521 de Educación Superior (Arts. 58 y 59 bis sobre control de AGN)',
      'Ley 24.156 de Administración Financiera y de los Sistemas de Control del Sector Público Nacional'
    ],
    responsibleOrganisms: [
      'Subsecretaría de Políticas Universitarias (ex SPU — Ministerio de Capital Humano)',
      'Consejo Interuniversitario Nacional (CIN) — 57+ Universidades Nacionales e Institutos Universitarios',
      'Auditoría General de la Nación (AGN — control externo constitucional)',
      'Sindicatura General de la Nación (SIGEN — controversia jurídica sobre control interno)'
    ],
    financialSummary: [
      {
        nominalAmount: null,
        currency: 'PCT_PIB',
        period: '2015–2025',
        budgetStage: 'devengado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Las transferencias del Tesoro Nacional a las Universidades Nacionales oscilaron históricamente entre el 0,55% y el 0,85% del PIB anual según Presupuesto Abierto y Anuarios SPU. Aproximadamente el 85%–90% del crédito se destina a salarios docentes y no docentes (Inciso 1) y el 10%–15% a gastos de funcionamiento, becas, hospitales escuela e infraestructura.',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-SPU-ANUARIO',
        sourceUrl: 'https://www.argentina.gob.ar/educacion/universidades/informacion/publicaciones/anuarios'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Matrícula total de pregrado, grado y posgrado en Universidades Nacionales de gestión estatal',
        value: '~2.160.000 a 2.500.000 estudiantes (aprox. 80% de la matrícula universitaria total del país)',
        period: 'Anuario Estadístico SPU 2022–2024',
        sourceName: 'Subsecretaría de Políticas Universitarias — Anuario de Estadísticas Universitarias',
        sourceUrl: 'https://www.argentina.gob.ar/educacion/universidades/informacion/publicaciones/anuarios',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Composición media del gasto universitario por objeto',
        value: '~88% Salarios docentes y no docentes / ~8% Funcionamiento y servicios / ~4% Becas, ciencia y extensión',
        period: '2023–2025',
        sourceName: 'Presupuesto Abierto — Programa 26 (Desarrollo de la Educación Superior)',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Rendición de fondos ante la Subsecretaría de Políticas Universitarias',
        value: 'Rendición mensual/anual de asignaciones salariales (SIU-RHUO) y gastos de funcionamiento',
        period: 'Vigente',
        sourceName: 'SPU / AGN',
        sourceUrl: 'https://www.agn.gob.ar/',
        epistemicStatus: 'oficial_con_reserva'
      }
    ],
    measurementLimitations: [
      'REGLA EDITORIAL: Rendición administrativa de transferencias ante la SPU y auditoría externa de estados contables/gestión por parte de la AGN son mecanismos distintos. La cobertura histórica de auditorías integrales de la AGN no abarcó simultáneamente a todas las universidades en cada ejercicio anual, por lo que en 2024–2026 se amplió el Plan de Acción Anual de la AGN sobre universidades nacionales.',
      'Los indicadores de tasa de graduación bruta deben leerse considerando que la mayoría de las universidades públicas no aplica cupos de ingreso eliminatorios y registra alta proporción de estudiantes que trabajan a tiempo parcial o completo.'
    ],
    auditReportsCited: [
      {
        issuer: 'SPU',
        title: 'Anuario de Estadísticas Universitarias Argentinas — Tablas por institución, matrícula, nuevos inscriptos, egresados y presupuesto',
        year: 2024,
        url: 'https://www.argentina.gob.ar/educacion/universidades/informacion/publicaciones/anuarios'
      },
      {
        issuer: 'AGN',
        title: 'Informes de Auditoría sobre Universidades Nacionales (Art. 59 bis Ley 24.521)',
        year: 2025,
        url: 'https://www.agn.gob.ar/'
      }
    ],
    relatedDossierIds: ['dossier-conicet-ciencia']
  },
  {
    id: 'audit-ciencia-conicet',
    slug: 'ciencia-conicet',
    title: 'Auditoría de Proyectos, Publicaciones y Financiamiento Científico (CONICET 1958–2026)',
    sector: 'Ciencia, Tecnología e Innovación',
    historicalCoverage: '1958 (Creación del CONICET) – 2026',
    governingNorms: [
      'Decreto-Ley 1.291/1958 (Creación del CONICET)',
      'Ley 25.467 (Marco de Ciencia, Tecnología e Innovación)',
      'Ley 26.899 (Repositorios Digitales Institucionales de Acceso Abierto)',
      'Ley 27.614 (Financiamiento del Sistema Nacional de Ciencia, Tecnología e Innovación)'
    ],
    responsibleOrganisms: [
      'CONICET (Consejo Nacional de Investigaciones Científicas y Técnicas)',
      'Agencia Nacional de Promoción de la Investigación, el Desarrollo Tecnológico y la Innovación (Agencia I+D+i)',
      'Secretaría de Innovación, Ciencia y Tecnología',
      'CNEA, INTA, INTI, CONAE, ANLIS-Malbrán'
    ],
    financialSummary: [
      {
        nominalAmount: null,
        currency: 'PCT_PIB',
        period: '2021–2026',
        budgetStage: 'devengado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Función Ciencia y Técnica de la Administración Nacional: más del 90% del presupuesto directo del CONICET corresponde al Inciso 1 (Gastos en Personal de investigadores y personal de apoyo) e Inciso 3/5 (Becas de formación doctoral y posdoctoral).',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-CONICET-CIFRAS',
        sourceUrl: 'https://www.conicet.gov.ar/conicet-en-cifras/'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Dotación del CONICET por estamento',
        value: '~11.800 Investigadores (CIC), ~10.300 Becarios doctorales/posdoctorales, ~2.900 Personal de Apoyo (CPA)',
        period: 'Serie CONICET en Cifras 2023–2025',
        sourceName: 'CONICET en Cifras — Indicadores Oficiales',
        sourceUrl: 'https://cifras.conicet.gov.ar/publica/',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Distribución por grandes áreas del conocimiento',
        value: '~26% Cs. Biológicas y de la Salud, ~24% Cs. Exactas y Naturales, ~23% Cs. Agrarias, de la Ingeniería y Materiales, ~22% Cs. Sociales y Humanidades, ~5% Tecnología',
        period: '2023–2025',
        sourceName: 'CONICET en Cifras',
        sourceUrl: 'https://cifras.conicet.gov.ar/publica/',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Producción verificable en acceso abierto',
        value: 'Repositorio CONICET Digital (ri.conicet.gov.ar) con trazabilidad por autor, unidad ejecutora y línea de investigación',
        period: 'Ley 26.899 vigente',
        sourceName: 'CONICET Digital',
        sourceUrl: 'https://ri.conicet.gov.ar/',
        epistemicStatus: 'verificado'
      }
    ],
    measurementLimitations: [
      'REGLA EDITORIAL: No debe juzgarse el rigor o la utilidad de un proyecto científico únicamente por el título de un artículo individual sacado de contexto sin leer el proyecto plurianual (PIP/PICT), la evaluación de pares y la producción completa de la unidad ejecutora.',
      'La atribución presupuestaria por paper no es lineal porque la infraestructura edilicia suele pertenecer a Universidades Nacionales de doble dependencia y los subsidios provienen de múltiples fuentes nacionales e internacionales.'
    ],
    auditReportsCited: [
      {
        issuer: 'CONICET',
        title: 'Portal Público CONICET en Cifras y Buscador de Institutos, Recursos Humanos y Producción',
        year: 2025,
        url: 'https://cifras.conicet.gov.ar/publica/'
      },
      {
        issuer: 'CONICET',
        title: 'Repositorio Institucional CONICET Digital (Ley 26.899)',
        year: 2026,
        url: 'https://ri.conicet.gov.ar/'
      }
    ],
    relatedDossierIds: ['dossier-conicet-ciencia']
  },
  {
    id: 'audit-educacion-salud',
    slug: 'educacion-salud',
    title: 'Auditoría de Educación Básica, Salud y Descentralización Federal (1978 / 1992 – 2026)',
    sector: 'Servicios Sociales Transferidos a Provincias y Programas Nacionales',
    historicalCoverage: '1978 (Descentralización primaria) → 1992 (Ley 24.049) → 2006 (Ley 26.075) → 2026',
    governingNorms: [
      'Ley 24.049 (1992 — Transferencia de servicios educativos secundarios y hospitales nacionales a las provincias y CABA)',
      'Ley 26.075 (2005 — Ley de Financiamiento Educativo, meta del 6% del PIB consolidado)',
      'Ley 26.206 de Educación Nacional'
    ],
    responsibleOrganisms: [
      'Ministerios de Educación y de Salud de las 23 Provincias y CABA (ejecución directa de escuelas y hospitales)',
      'Secretaría de Educación de la Nación y Ministerio de Salud de la Nación (política rectora, vacunas, alta complejidad y programas nacionales)'
    ],
    financialSummary: [
      {
        nominalAmount: 106_521_648_374_775,
        currency: 'ARS',
        period: '2026',
        budgetStage: 'credito_inicial',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Finalidad Servicios Sociales en el Presupuesto Nacional Ley 27.798 (71,94% del total nacional, que incluye Seguridad Social, Educación y Cultura, Salud y Promoción y Asistencia Social). El gasto escolar y hospitalario directo recae mayoritariamente en los presupuestos provinciales.',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-LEY-27798',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Responsabilidad jurisdiccional sobre establecimientos educativos (Inicial, Primaria y Secundaria)',
        value: '> 98% bajo administración provincial y de CABA tras las transferencias de 1978 y Ley 24.049 (1992)',
        period: '1992–2026',
        sourceName: 'InfoLEG — Ley 24.049',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/448/norma.htm',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Evaluación nacional de aprendizajes (Operativo Aprender)',
        value: 'Series de desempeño en Lengua y Matemática en nivel primario y secundario',
        period: '2016–2025',
        sourceName: 'Secretaría de Evaluación e Información Educativa',
        sourceUrl: 'https://www.argentina.gob.ar/educacion/evaluacion-e-informacion-educativa/aprender',
        epistemicStatus: 'verificado'
      }
    ],
    measurementLimitations: [
      'Para evaluar el gasto total argentino en Educación y Salud es obligatorio consolidar Nación + 23 Provincias + CABA + Municipios eliminando las transferencias intergubernamentales (ej. programas nacionales transferidos a carteras provinciales), ya que analizar solo el presupuesto nacional subestima más del 75% del gasto educativo y sanitario efectivo.'
    ],
    auditReportsCited: [
      {
        issuer: 'MECON',
        title: 'Serie de Gasto Público Consolidado por Finalidad y Función (Nación, Provincias y Municipios)',
        year: 2025,
        url: 'https://www.argentina.gob.ar/economia/politicaeconomica/macroeconomia/gasto-publico-consolidado'
      }
    ],
    relatedDossierIds: []
  },
  {
    id: 'audit-subsidios-infraestructura',
    slug: 'subsidios-infraestructura',
    title: 'Auditoría de Subsidios Económicos (Energía y Transporte) e Infraestructura',
    sector: 'Servicios Económicos e Inversión Real Directa',
    historicalCoverage: '2002 (Congelamiento tarifario Ley 25.561) – 2026 (Esquema de segmentación y reestructuración)',
    governingNorms: [
      'Ley 24.065 (Marco Regulatorio Eléctrico — CAMMESA) y Ley 24.076 (Gas Natural)',
      'Ley 25.561 (Emergencia Pública 2002)',
      'Decreto 332/2022 y normas subsiguientes de Segmentación de Subsidios Energéticos (RASE)',
      'Ley 27.798 (Presupuesto 2026 — Finalidad Servicios Económicos)'
    ],
    responsibleOrganisms: [
      'Secretaría de Energía (Transferencias a CAMMESA y ENARSA)',
      'Secretaría de Transporte (Fondo Fiduciario del Sistema de Infraestructura del Transporte / SUBE)',
      'Secretaría de Obras Públicas / Dirección Nacional de Vialidad'
    ],
    financialSummary: [
      {
        nominalAmount: 11_457_503_006_150,
        currency: 'ARS',
        period: '2026',
        budgetStage: 'credito_inicial',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Finalidad Servicios Económicos en el Presupuesto Nacional 2026 (Ley 27.798): $11,46 billones ARS (7,74% del total aprobado).',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-LEY-27798',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/336966/20251230'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Peso histórico de los subsidios económicos (Energía + Transporte) en el PIB',
        value: 'Pasó de < 0,3% del PIB en 2003 a picos de ~3,5% – 4,0% del PIB entre 2014 y 2015, ~2,5% en 2022 y reducción hacia ~1,0% – 1,4% del PIB en 2024–2026',
        period: '2003–2026',
        sourceName: 'Oficina Nacional de Presupuesto / Informes OPC',
        sourceUrl: 'https://www.presupuestoabierto.gob.ar/sici/',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Cobertura del costo mayorista eléctrico por tarifa abonada por los usuarios (CAMMESA)',
        value: 'Varió desde un mínimo de ~15%–20% en 2015/2022 hasta > 65%–80% según categoría residencial/comercial en 2025–2026',
        period: '2015–2026',
        sourceName: 'CAMMESA — Informe Anual y Mensual del MEM',
        sourceUrl: 'https://cammesaweb.cammesa.com/',
        epistemicStatus: 'verificado'
      }
    ],
    measurementLimitations: [
      'La reducción presupuestaria de transferencias de capital (obra pública nacional) mejora el resultado financiero de caja en el corto plazo, pero no contabiliza en la contabilidad de base caja la depreciación física del stock de infraestructura vial, ferroviaria o hídrica.'
    ],
    auditReportsCited: [
      {
        issuer: 'AGN',
        title: 'Auditorías sobre compensaciones tarifarias al transporte público automotor y ferroviario y transferencias a CAMMESA',
        year: 2024,
        url: 'https://www.agn.gob.ar/'
      }
    ],
    relatedDossierIds: ['dossier-ypf-1992-2012']
  },
  {
    id: 'audit-compras-publicidad',
    slug: 'compras-publicidad',
    title: 'Auditoría de Compras Públicas (COMPR.AR) y Publicidad Oficial',
    sector: 'Contrataciones Estatales y Comunicación Pública',
    historicalCoverage: '2016 (Implementación COMPR.AR) – 2026',
    governingNorms: [
      'Decreto Delegado 1.023/2001 (Régimen de Contrataciones de la Administración Nacional)',
      'Decreto 1.300/2016 (Sistema Electrónico de Contrataciones COMPR.AR)',
      'Resolución 57/2025 y normativas de suspensión/regulación de pauta publicitaria oficial nacional'
    ],
    responsibleOrganisms: [
      'Oficina Nacional de Contrataciones (ONC)',
      'Secretaría de Comunicación y Medios de la Presidencia de la Nación',
      'Ministerios de Comunicación provinciales y municipales'
    ],
    financialSummary: [
      {
        nominalAmount: 818_894_391,
        currency: 'ARS',
        period: '2021-09 a 2022-04',
        budgetStage: 'devengado',
        isIntergovernmentalTransfer: false,
        consolidationRuleNote: 'Suma de las 7 principales partidas televisivas del informe oficial de distribución de pauta nacional 01/09/2021–30/04/2022 publicado en Argentina.gob.ar.',
        epistemicStatus: 'verificado',
        sourceId: 'SRC-PAUTA-2021-2022',
        sourceUrl: 'https://www.argentina.gob.ar/jefatura/medios-y-comunicacion-publica/publicidad-oficial'
      }
    ],
    physicalAndPerformanceMetrics: [
      {
        label: 'Publicidad oficial nacional (Ejercicio 2026)',
        value: 'Pauta de Presidencia/Administración Central suspendida (Res. 57/2025); se monitorean por separado empresas con participación estatal (ej. YPF S.A., Banco Nación)',
        period: '2024–2026',
        sourceName: 'Boletín Oficial — Resolución 57/2025',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/320693/20250206',
        epistemicStatus: 'verificado'
      },
      {
        label: 'Publicidad oficial provincial (Provincia de Buenos Aires)',
        value: 'Registro Oficial de Medios y tarifarios publicados; sin consolidado abierto anual por medio receptor al cierre de la revisión',
        period: '2026',
        sourceName: 'Ministerio de Comunicación Pública PBA',
        sourceUrl: 'https://www.gba.gob.ar/comunicacion_publica/registro_oficial_de_medios',
        epistemicStatus: 'oficial_con_reserva'
      }
    ],
    measurementLimitations: [
      'REGLA EDITORIAL: En compras públicas debe distinguirse entre precio estimado en pliego, oferta presentada, adjudicación firme y orden de compra efectivamente pagada.',
      'En publicidad oficial, la suspensión de pauta de la Administración Central no implica ausencia de gasto publicitario en sociedades anónimas con participación estatal mayoritaria ni en provincias y municipios.'
    ],
    auditReportsCited: [
      {
        issuer: 'JGM',
        title: 'Informes históricos de distribución de Publicidad Oficial por medio y proveedor',
        year: 2023,
        url: 'https://www.argentina.gob.ar/jefatura/medios-y-comunicacion-publica/publicidad-oficial'
      }
    ],
    relatedDossierIds: ['dossier-compras-ign-2026']
  }
];
