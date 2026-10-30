/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Archivo de Declaraciones Públicas y Comparador Contextual Histórico
 * REGLA EDITORIAL ESTRICTA:
 * - Solo se publican fragmentos respaldados por versión taquigráfica, documento oficial o registro audiovisual verificable.
 * - No se formulan calificaciones morales ni veredictos globales sobre personas o partidos.
 * - Toda comparación expone el contexto institucional de cada fecha y las explicaciones públicas documentadas.
 */

import type { PublicStatementRecord, StatementComparisonDossier } from '../types/observatorio';

export const PUBLIC_STATEMENTS_ARCHIVE: PublicStatementRecord[] = [
  {
    id: 'stmt-ganancias-2023-debate',
    officialId: 'javier_milei',
    officialName: 'Javier Milei',
    roleAtStatement: 'Diputado Nacional (La Libertad Avanza) — Sesión Especial HCDN 19/09/2023',
    partyOrCoalitionAtStatement: 'La Libertad Avanza',
    date: '2023-09-19',
    topic: 'presion_tributaria',
    topicLabel: 'Impuesto a las Ganancias sobre salarios (Cuarta Categoría)',
    exactQuote:
      'Nosotros siempre vamos a votar a favor de bajar impuestos; el Estado es una organización criminal que vive de una fuente coactiva de ingresos llamada impuestos.',
    contextNote:
      'Intervención y fundamentación durante el tratamiento en la Cámara de Diputados del proyecto de modificación del Impuesto a las Ganancias (sancionado como Ley 27.725 en septiembre de 2023), donde los diputados de La Libertad Avanza votaron afirmativamente la suba del mínimo no imponible.',
    mediaType: 'acta_taquigrafica',
    sourceName: 'Honorable Cámara de Diputados de la Nación — Período 141, Reunión 11, Sesión Especial 19/09/2023',
    sourceUrl: 'https://www.hcdn.gob.ar/secparl/dselectronicos/taquigraficas/',
    timestampOrPageRef: 'Orden del Día 769 / Ley 27.725',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-ganancias-2024-mensaje',
    officialId: 'javier_milei',
    officialName: 'Poder Ejecutivo Nacional (Presidencia Javier Milei / Ministerio de Economía)',
    roleAtStatement: 'Presidente de la Nación — Remisión del Proyecto de Medidas Fiscales Paliativas y Relevantes',
    partyOrCoalitionAtStatement: 'La Libertad Avanza',
    date: '2024-04-10',
    topic: 'presion_tributaria',
    topicLabel: 'Impuesto a las Ganancias sobre salarios (Cuarta Categoría)',
    exactQuote:
      'Se propone adecuar el Impuesto a las Ganancias para los ingresos personales con escalas progresivas, en línea con los estándares internacionales de tributación directa y con el objetivo de consolidar el equilibrio fiscal de la Nación y de las jurisdicciones provinciales.',
    contextNote:
      'Fundamentos del Mensaje del Poder Ejecutivo para el Título V de la Ley 27.743 (Impuesto a los Ingresos Personales), aprobado finalmente por insistencia de la Cámara de Diputados el 28/06/2024 (Acta 5274).',
    mediaType: 'documento_publico',
    sourceName: 'Boletín Oficial / HCDN — Mensaje PEN y Ley 27.743 Título V',
    sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310186/20240708',
    timestampOrPageRef: 'Título V, Arts. 68 a 84',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-ypf-1992-debate',
    officialId: 'bloque_pj_1992',
    officialName: 'Poder Ejecutivo Nacional y Miembros Informantes Oficialistas (1992)',
    roleAtStatement: 'Mensaje de Elevación y Debate Parlamentario de la Ley 24.145',
    partyOrCoalitionAtStatement: 'Partido Justicialista',
    date: '1992-09-24',
    topic: 'empresas_publicas',
    topicLabel: 'Régimen societario y propiedad accionaria de YPF S.A.',
    exactQuote:
      'La transformación empresaria de YPF Sociedad Anónima y la apertura de su capital al sector privado permitirán capitalizar la compañía, cancelar deuda previsional con los jubilados y reconocer las acreencias por regalías de las provincias productoras.',
    contextNote:
      'Fundamentación oficial de la Ley 24.145 de Federalización de Hidrocarburos y Privatización de YPF S.A. sancionada en septiembre de 1992.',
    mediaType: 'acta_taquigrafica',
    sourceName: 'InfoLEG / Diario de Sesiones del Congreso Nacional — Ley 24.145',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/540/texact.htm',
    timestampOrPageRef: 'Ley 24.145 Arts. 1 a 23',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-ypf-2012-mensaje',
    officialId: 'axel_kicillof',
    officialName: 'Axel Kicillof (Secretario de Política Económica e Interventor en YPF en 2012)',
    roleAtStatement: 'Exposición ante el Plenario de Comisiones del Senado de la Nación (17/04/2012)',
    partyOrCoalitionAtStatement: 'Frente para la Victoria (PJ)',
    date: '2012-04-17',
    topic: 'empresas_publicas',
    topicLabel: 'Expropiación del 51% de YPF S.A. y estatuto societario',
    exactQuote:
      'La recuperación del control de YPF por parte del Estado Nacional y de las provincias productoras responde al interés público de alcanzar el autoabastecimiento energético; el Estado aplica la Ley de Expropiaciones y no las cláusulas leoninas del estatuto privado.',
    contextNote:
      'Exposición oficial en el Senado de la Nación durante el tratamiento del proyecto que se convirtió en la Ley 26.741 de Soberanía Hidrocarburífera (sancionada el 03/05/2012). En 2014 el Congreso aprobó por Ley 26.932 la indemnización a Repsol S.A. por USD 5.000 millones en bonos.',
    mediaType: 'acta_taquigrafica',
    sourceName: 'Honorable Senado de la Nación — Versión Taquigráfica Plenario de Comisiones (Abril 2012) y Ley 26.741',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm',
    timestampOrPageRef: 'Antecedentes Parlamentarios Ley 26.741',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-sipa-1993-ley24241',
    officialId: 'ejecutivo_1993_sijp',
    officialName: 'Mensaje del Poder Ejecutivo Nacional — Creación del SIJP (Ley 24.241)',
    roleAtStatement: 'Poder Ejecutivo Nacional / Ministerio de Economía (1993)',
    partyOrCoalitionAtStatement: 'Partido Justicialista',
    date: '1993-09-23',
    topic: 'sistema_previsional',
    topicLabel: 'Organización del Sistema Previsional (Capitalización vs. Reparto)',
    exactQuote:
      'La incorporación de un régimen de capitalización individual complementario al régimen público vinculará directamente el esfuerzo contributivo de cada trabajador con su haber futuro y fortalecerá el mercado de capitales nacional.',
    contextNote:
      'Fundamentos del Sistema Integrado de Jubilaciones y Pensiones (SIJP) sancionado por Ley 24.241 en septiembre de 1993.',
    mediaType: 'documento_publico',
    sourceName: 'InfoLEG — Ley 24.241 Sistema Integrado de Jubilaciones y Pensiones',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm',
    timestampOrPageRef: 'Libro I, Título I y III',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-sipa-2008-ley26425',
    officialId: 'ejecutivo_2008_sipa',
    officialName: 'Mensaje del Poder Ejecutivo Nacional 1732/2008 — Creación del SIPA (Ley 26.425)',
    roleAtStatement: 'Poder Ejecutivo Nacional / ANSES (2008)',
    partyOrCoalitionAtStatement: 'Frente para la Victoria (PJ)',
    date: '2008-10-21',
    topic: 'sistema_previsional',
    topicLabel: 'Organización del Sistema Previsional (Capitalización vs. Reparto)',
    exactQuote:
      'El régimen de capitalización ha demostrado su incapacidad para brindar cobertura previsional suficiente sin el auxilio permanente del Estado, que ya financia más del setenta y siete por ciento de las prestaciones de las administradoras privadas.',
    contextNote:
      'Fundamentos del Mensaje 1732/2008 que dio origen a la Ley 26.425, sancionada el 20/11/2008, que unificó el sistema en el régimen público SIPA y transfirió los activos al FGS.',
    mediaType: 'documento_publico',
    sourceName: 'InfoLEG — Ley 26.425 Sistema Integrado Previsional Argentino',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm',
    timestampOrPageRef: 'Mensaje 1732/08 y Arts. 1 a 8',
    epistemicStatus: 'verificado'
  },
  {
    id: 'stmt-cheque-2001-transitorio',
    officialId: 'domingo_cavallo_2001',
    officialName: 'Ministerio de Economía / Mensaje Ley 25.413 (2001)',
    roleAtStatement: 'Ministro de Economía — Presentación de la Ley de Competitividad 25.413',
    partyOrCoalitionAtStatement: 'Alianza / Acción por la República',
    date: '2001-03-24',
    topic: 'presion_tributaria',
    topicLabel: 'Vigencia temporal del Impuesto a los Débitos y Créditos Bancarios',
    exactQuote:
      'Se establece un impuesto sobre los créditos y débitos en cuenta corriente bancaria con carácter de emergencia y vigencia transitoria hasta el 31 de diciembre de 2002, computable como pago a cuenta de otros tributos.',
    contextNote:
      'El artículo 7 original de la Ley 25.413 preveía su vigencia hasta el 31/12/2002. Sucesivas prórrogas parlamentarias impulsadas por todos los gobiernos posteriores entre 2002 y 2026 mantuvieron vigente el tributo durante más de 25 años.',
    mediaType: 'documento_publico',
    sourceName: 'InfoLEG — Ley 25.413 (Texto original y normas modificatorias)',
    sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/66428/texact.htm',
    timestampOrPageRef: 'Art. 1 y Art. 7 (prórrogas sucesivas)',
    epistemicStatus: 'verificado'
  }
];

export const STATEMENT_COMPARISONS: StatementComparisonDossier[] = [
  {
    id: 'comp-ganancias-2023-2024',
    title: 'Impuesto a las Ganancias (4.ª Categoría): Votación de reducción (09/2023) vs. Restitución (06/2024)',
    topic: 'presion_tributaria',
    officialName: 'Javier Milei / Bloque La Libertad Avanza',
    partyOrCoalitionHistory: 'La Libertad Avanza (Oposición parlamentaria en 2023 → Poder Ejecutivo en 2024)',
    statementA: PUBLIC_STATEMENTS_ARCHIVE[0],
    statementB: PUBLIC_STATEMENTS_ARCHIVE[1],
    relatedPublicAct: {
      date: '2024-06-28',
      actType: 'voto_afirmativo',
      normNumber: 'Ley 27.743 Título V (Acta HCDN 5274)',
      description: 'Insistencia parlamentaria y promulgación de la restitución del Impuesto a las Ganancias sobre ingresos personales.',
      sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
    },
    institutionalContextComparison:
      'En septiembre de 2023, desde la oposición legislativa, el bloque acompañó la reducción del tributo (Ley 27.725) sin que se aprobara una reducción simultánea de gastos. En abril–junio de 2024, ya en ejercicio del Poder Ejecutivo Nacional y en negociación con los gobernadores provinciales por la caída de recursos coparticipables, envió y promulgó la restitución del gravamen (Ley 27.743 Título V).',
    documentedPublicExplanations:
      'El Poder Ejecutivo explicó públicamente que la baja sancionada en septiembre de 2023 no contó con financiamiento genuino y afectó en un 60% la masa coparticipable de las provincias, por lo que consideró necesaria su restitución para sostener la meta de déficit financiero cero y acordar la Ley Bases con las provincias.',
    editorialComplianceNote:
      'Comparación estrictamente documental entre una votación parlamentaria en carácter de diputado (19/09/2023) y un proyecto remitido y promulgado como Presidente de la Nación (28/06/2024). Se exponen ambas fuentes primarias y la explicación oficial dada.',
    reviewStatus: 'verificado_documentalmente'
  },
  {
    id: 'comp-ypf-1992-2012',
    title: 'Propiedad Estatal vs. Privada de YPF S.A. (Ley 24.145 de 1992 vs. Ley 26.741 de 2012)',
    topic: 'empresas_publicas',
    officialName: 'Bloques Parlamentarios del Partido Justicialista / Frente para la Victoria y Provincias de la OFEPHI',
    partyOrCoalitionHistory: 'Partido Justicialista (1992) / Frente para la Victoria — PJ (2012)',
    statementA: PUBLIC_STATEMENTS_ARCHIVE[2],
    statementB: PUBLIC_STATEMENTS_ARCHIVE[3],
    relatedPublicAct: {
      date: '2012-05-03',
      actType: 'voto_afirmativo',
      normNumber: 'Ley 26.741 (y Ley 26.932 de 2014)',
      description: 'Expropiación del 51% de las acciones Clase D de YPF S.A. y posterior convenio indemnizatorio de USD 5.000 millones en bonos.',
      sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm'
    },
    institutionalContextComparison:
      'En 1992 el Poder Ejecutivo y las provincias petroleras impulsaron la privatización de YPF bajo un contexto de reestructuración de deuda pública y previsional (Ley 24.145). Veinte años más tarde, en 2012, ante la pérdida del autoabastecimiento energético y el déficit comercial de combustibles, el Congreso aprobó por amplia mayoría la expropiación del 51% del paquete accionario (Ley 26.741).',
    documentedPublicExplanations:
      'Quienes acompañaron ambas normas en distintas décadas argumentaron que en 1992 el Estado carecía de capital de inversión y necesitaba saldar deudas con jubilados y provincias, mientras que hacia 2011–2012 la política de distribución de dividendos de la controlante privada (Repsol) había reducido la exploración y las reservas comprobadas.',
    editorialComplianceNote:
      'Se contrastan los fundamentos normativos oficiales de las Leyes 24.145, 26.741 y 26.932 en InfoLEG sin atribuir intencionalidades no documentadas.',
    reviewStatus: 'verificado_documentalmente'
  },
  {
    id: 'comp-previsional-1993-2008',
    title: 'Régimen Previsional Argentino: Creación de las AFJP (Ley 24.241 de 1993) vs. Estatización en el SIPA (Ley 26.425 de 2008)',
    topic: 'sistema_previsional',
    officialName: 'Poder Ejecutivo Nacional y Mayorías Parlamentarias (1993 y 2008)',
    partyOrCoalitionHistory: 'Partido Justicialista (1993) / Frente para la Victoria — PJ (2008)',
    statementA: PUBLIC_STATEMENTS_ARCHIVE[4],
    statementB: PUBLIC_STATEMENTS_ARCHIVE[5],
    relatedPublicAct: {
      date: '2008-11-20',
      actType: 'promulgacion_ejecutiva',
      normNumber: 'Ley 26.425',
      description: 'Absorción del régimen de capitalización en el SIPA y transferencia de activos al FGS.',
      sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm'
    },
    institutionalContextComparison:
      'En 1993 la reforma previsional introdujo cuentas de capitalización individual administradas por AFJP privadas como solución estructural al déficit de las cajas de reparto. Quince años después, en el contexto de la crisis financiera internacional de 2008, el Estado reabsorbió las cuentas individuales en un sistema único de reparto público.',
    documentedPublicExplanations:
      'En 2008 se fundamentó el cambio en que el costo fiscal de transición (el Estado dejó de percibir los aportes de quienes optaron por las AFJP pero siguió pagando a los jubilados existentes) había financiado gran parte del déficit fiscal de los años noventa, y que más del 77% de los beneficios abonados por las AFJP ya dependían de complementos estatales.',
    editorialComplianceNote:
      'Comparación institucional de los Mensajes de Elevación de las Leyes 24.241 y 26.425 publicados en InfoLEG.',
    reviewStatus: 'verificado_documentalmente'
  },
  {
    id: 'comp-cheque-emergencia-permanente',
    title: 'Impuesto al Cheque (Ley 25.413): Promesa de transitoriedad por 21 meses (2001) vs. 25 años de prórrogas (2001–2026)',
    topic: 'presion_tributaria',
    officialName: 'Poder Ejecutivo y Congreso de la Nación (Sucesivas administraciones 2001–2026)',
    partyOrCoalitionHistory: 'Alianza (2001) → PJ/FPV (2002–2015) → Cambiemos (2015–2019) → FdT (2019–2023) → LLA (2023–2026)',
    statementA: PUBLIC_STATEMENTS_ARCHIVE[6],
    relatedPublicAct: {
      date: '2025-12-30',
      actType: 'promulgacion_ejecutiva',
      normNumber: 'Prórrogas sucesivas de la Ley 25.413 (16 normas modificatorias documentadas en InfoLEG)',
      description: 'Mantenimiento de la vigencia del Impuesto a los Créditos y Débitos Bancarios como uno de los tres tributos de mayor recaudación nacional.',
      sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/66428/texact.htm'
    },
    institutionalContextComparison:
      'Creado en marzo de 2001 con fecha de caducidad expresa el 31 de diciembre de 2002, el tributo fue prorrogado por todas las coaliciones políticas que gobernaron el país desde entonces debido a su alta recaudación inmediata y bajo nivel de evasión bancaria.',
    documentedPublicExplanations:
      'Los distintos Ministerios de Economía argumentaron en cada ley de prórroga que la eliminación inmediata del tributo sin reemplazo equivalente comprometería el financiamiento del Tesoro Nacional y de la ANSES, optando en algunos períodos por habilitar cómputos parciales como pago a cuenta de Ganancias para PyMEs.',
    editorialComplianceNote:
      'Evidencia empírica del fenómeno de "impuestos transitorios de emergencia" que se vuelven estructurales en la matriz tributaria argentina.',
    reviewStatus: 'verificado_documentalmente'
  }
];
