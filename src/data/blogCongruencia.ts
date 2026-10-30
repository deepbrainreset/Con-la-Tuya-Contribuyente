/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Blog / Bitácora Diaria de Congruencia (Archivo de TV / YouTube vs. Accionar y Crítica Cruzada).
 * Examina con la misma vara a funcionarios actualmente en ejercicio de todos los signos políticos,
 * contrastando sus archivos audiovisuales (TN, LN+, C5N, Crónica TV, A24, Diputados TV, Senado TV)
 * contra sus propios votos nominales, firmas de decretos/resoluciones y críticas a terceros por
 * medidas equivalentes a las que ellos mismos ejecutaron o votaron.
 */

export type CongruencePatternType =
  | 'discurso_vs_voto_o_firma'
  | 'critica_a_terceros_por_medida_propia'
  | 'giro_intertemporal_180';

export interface TvYoutubeArchiveClip {
  id: string;
  channel: 'TN (Todo Noticias)' | 'LN+ (La Nación+)' | 'C5N' | 'Crónica TV' | 'A24' | 'Diputados TV' | 'Senado TV' | 'Casa Rosada / Archivo Oficial';
  programOrContext: string;
  broadcastDate: string;
  roleAtTime: string;
  exactQuoteOrPosition: string;
  youtubeArchiveUrl: string;
}

export interface DocumentedCounterAction {
  date: string;
  instrument: string; // Ej: "Ley 27.743 / Acta HCDN 5274", "Decreto 896/2001", "Ley Impositiva PBA 15.479"
  roleAtAction: string;
  whatTheyActuallyDid: string;
  officialDocumentUrl: string;
}

export interface CongruenceBlogEntry {
  id: string;
  slug: string;
  publishedAt: string;
  lastVerified: string;
  politicianId: string;
  politicianName: string;
  currentRole: string;
  currentParty: string;
  title: string;
  topic: 'Impuestos y Presión Fiscal' | 'Jubilaciones y Haberes' | 'Empresas Públicas y Tarifas' | 'Deuda, Déficit y Emisión' | 'Alianzas y Seguridad';
  congruencePattern: CongruencePatternType;
  tvYoutubeClips: TvYoutubeArchiveClip[];
  counterActions: DocumentedCounterAction[];
  crossCriticismAnalysis: string;
  institutionalContextAndDefense: string;
}

export const CONGRUENCE_PATTERN_LABELS: Record<
  CongruencePatternType,
  { label: string; badgeClass: string; description: string }
> = {
  discurso_vs_voto_o_firma: {
    label: 'Discurso en TV vs. Voto o Firma Propia',
    badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    description: 'El archivo televisivo registra una promesa o rechazo categórico que luego se contradice con un voto nominal, proyecto enviado o norma firmada por el mismo funcionario.'
  },
  critica_a_terceros_por_medida_propia: {
    label: 'Crítica a Terceros por Medida que Antes Ejecutó',
    badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    description: 'El funcionario cuestiona en canales de televisión o sesiones a otro gobierno por aplicar una medida fiscal, previsional o patrimonial que él mismo o su bloque votó o ejecutó.'
  },
  giro_intertemporal_180: {
    label: 'Giro de 180° en Posición Pública Documentada',
    badgeClass: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    description: 'Cambio sustancial entre la posición sostenida en archivos televisivos anteriores y la posición defendida en su cargo actual.'
  }
};

export const CONGRUENCE_BLOG_ENTRIES: CongruenceBlogEntry[] = [
  {
    id: 'congruencia-milei-ganancias-2023-2024',
    slug: 'javier-milei-promesa-impuestos-tv-vs-restitucion-ganancias-2024',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    politicianId: 'javier_milei',
    politicianName: 'Javier Gerardo Milei',
    currentRole: 'Presidente de la Nación',
    currentParty: 'La Libertad Avanza',
    title: 'Promesa televisiva de «no subir ni crear impuestos» y voto a favor de bajar Ganancias (2023) vs. restitución de Ganancias 4.ª Categoría (Ley 27.743)',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'discurso_vs_voto_o_firma',
    tvYoutubeClips: [
      {
        id: 'clip-milei-tv-impuestos-2021-2023',
        channel: 'LN+ (La Nación+)',
        programOrContext: 'Entrevistas de campaña legislativa y presidencial + Sesión HCDN en Diputados TV',
        broadcastDate: '2023-09-19',
        roleAtTime: 'Diputado Nacional (La Libertad Avanza)',
        exactQuoteOrPosition: 'Afirmó reiteradamente en televisión que «antes de subir un impuesto me corto un brazo» y en la sesión del 19/09/2023 votó afirmativamente la eliminación de la 4.ª categoría de Ganancias impulsada por Sergio Massa, sosteniendo que toda baja de impuestos debía acompañarse aunque proviniera del oficialismo de entonces.',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=Diputados+TV+sesion+19+septiembre+2023+Ganancias+Milei'
      }
    ],
    counterActions: [
      {
        date: '2024-07-08',
        instrument: 'Ley 27.743 (Título V) y Decreto 593/2024',
        roleAtAction: 'Presidente de la Nación',
        whatTheyActuallyDid: 'El Poder Ejecutivo Nacional remitió al Congreso el Paquete Fiscal restituyendo el Impuesto a las Ganancias de 4.ª categoría para trabajadores en relación de dependencia y promulgó la Ley 27.743 tras la insistencia de Diputados (Acta 5274).',
        officialDocumentUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708'
      }
    ],
    crossCriticismAnalysis: 'En septiembre de 2023 votó junto al bloque del Frente de Todos la reducción de la base de Ganancias argumentando que el Estado debía ajustar su gasto y nunca recomponer tributos sobre el salario; nueve meses después, desde la Presidencia, impulsó la restitución del mismo tributo para recomponer la masa coparticipable de las provincias y asegurar la sanción de la Ley Bases.',
    institutionalContextAndDefense: 'El Poder Ejecutivo argumentó públicamente que la reforma de septiembre de 2023 había desfinanciado en ~0,8% del PIB a las provincias y que los gobernadores condicionaron su apoyo legislativo al Paquete Fiscal a la restitución de Ganancias coparticipable, prometiendo que la suba sería transitoria una vez consolidado el superávit.'
  },
  {
    id: 'congruencia-kicillof-impuestos-ypf-2012-2026',
    slug: 'axel-kicillof-discurso-alivio-fiscal-y-costo-ypf-vs-subas-impositivas-pba',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    politicianId: 'axel_kicillof',
    politicianName: 'Axel Kicillof',
    currentRole: 'Gobernador de la Provincia de Buenos Aires',
    currentParty: 'Unión por la Patria',
    title: 'Críticas en C5N/TV al ajuste y presión sobre la clase media vs. subas de hasta 200% en Ley Impositiva PBA y declaración en Senado TV sobre el costo de expropiar YPF',
    topic: 'Empresas Públicas y Tarifas',
    congruencePattern: 'critica_a_terceros_por_medida_propia',
    tvYoutubeClips: [
      {
        id: 'clip-kicillof-senado-tv-2012',
        channel: 'Senado TV',
        programOrContext: 'Plenario de Comisiones del Senado de la Nación por el proyecto de expropiación del 51% de YPF',
        broadcastDate: '2012-04-17',
        roleAtTime: 'Secretario de Política Económica y Viceministro de Economía',
        exactQuoteOrPosition: '«Los tarados son los que piensan que el Estado tiene que ser estúpido y comprar todo según el estatuto de YPF, respetando a rajatabla las condiciones leoninas... Costará lo que determine el Tribunal de Tasación.»',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=Senado+TV+Axel+Kicillof+17+abril+2012+estatuto+YPF'
      },
      {
        id: 'clip-kicillof-c5n-impuestos-2024',
        channel: 'C5N',
        programOrContext: 'Entrevistas televisivas y conferencias sobre el impacto de impuestos y tarifas en los hogares bonaerenses',
        broadcastDate: '2024-03-15',
        roleAtTime: 'Gobernador de la Provincia de Buenos Aires',
        exactQuoteOrPosition: 'Cuestionó al Gobierno Nacional por «asfixiar los ingresos de las familias y pymes con subas desmedidas».',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=C5N+Axel+Kicillof+impuestos+tarifas+2024'
      }
    ],
    counterActions: [
      {
        date: '2014-05-08',
        instrument: 'Ley 26.932 (Convenio de Indemnización Repsol) + Sentencia SDNY 2023',
        roleAtAction: 'Ministro de Economía (2014) / Ex interventor YPF',
        whatTheyActuallyDid: 'En 2014 el Estado nacional emitió USD 5.000 millones en bonos soberanos para indemnizar a Repsol y en septiembre de 2023 el Juzgado del Distrito Sur de Nueva York condenó a la República Argentina a pagar USD 16.100 millones por incumplimiento del artículo 7 del estatuto de YPF al no formular oferta pública de adquisición (OPA) al resto de los accionistas.',
        officialDocumentUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm'
      },
      {
        date: '2024-01-02',
        instrument: 'Ley Impositiva PBA 15.479 (Ejercicio 2024)',
        roleAtAction: 'Gobernador de la Provincia de Buenos Aires',
        whatTheyActuallyDid: 'Impulsó y promulgó la Ley Impositiva 15.479 que aplicó topes de actualización de hasta 200% (y más en tramos superiores sin tope) en el Impuesto Inmobiliario Urbano, Rural y Automotor de ARBA, además de un anticipo extraordinario de Ingresos Brutos a grandes contribuyentes.',
        officialDocumentUrl: 'https://normas.gba.gob.ar/documentos/B3wX9i3x.html'
      }
    ],
    crossCriticismAnalysis: 'Mientras en entrevistas en C5N y actos oficiales critica el impacto fiscal nacional sobre hogares y comercios, la Provincia de Buenos Aires aplicó incrementos de hasta el 200%+ en impuestos patrimoniales y alícuotas de Ingresos Brutos que gravan en cascada la producción y el consumo bonaerense.',
    institutionalContextAndDefense: 'El Ejecutivo bonaerense sostuvo que la actualización de la Ley Impositiva 15.479 buscó compensar la inflación acumulada de 2023 y la reducción de transferencias no automáticas por parte de la Nación.'
  },
  {
    id: 'congruencia-maximo-kirchner-impuestos-moratorias',
    slug: 'maximo-kirchner-criticas-ajuste-vs-voto-impuesto-pais-y-moratorias',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    politicianId: 'maximo_kirchner',
    politicianName: 'Máximo Carlos Kirchner',
    currentRole: 'Diputado Nacional (Buenos Aires)',
    currentParty: 'Unión por la Patria',
    title: 'Críticas televisivas y parlamentarias por pérdida del poder adquisitivo jubilatorio e impositivo vs. votación del Impuesto PAIS, fórmula Ley 27.609 y prórrogas de emergencia',
    topic: 'Jubilaciones y Haberes',
    congruencePattern: 'critica_a_terceros_por_medida_propia',
    tvYoutubeClips: [
      {
        id: 'clip-maximo-diputados-tv-2024',
        channel: 'Diputados TV',
        programOrContext: 'Intervenciones en el recinto de la HCDN y entrevistas en C5N sobre haberes jubilatorios e impuestos al consumo',
        broadcastDate: '2024-06-04',
        roleAtTime: 'Diputado Nacional (Unión por la Patria)',
        exactQuoteOrPosition: 'Cuestionó al oficialismo actual por el deterioro de los haberes previsionales y la carga impositiva sobre los sectores medios y bajos.',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=Diputados+TV+Maximo+Kirchner+jubilaciones+impuestos+2024'
      }
    ],
    counterActions: [
      {
        date: '2019-12-20',
        instrument: 'Ley 27.541 (Solidaridad Social y Reactivación Productiva) y Ley 27.609 (Movilidad Previsional 2020)',
        roleAtAction: 'Presidente del Bloque Frente de Todos en Diputados',
        whatTheyActuallyDid: 'Impulsó y votó afirmativamente la suspensión de la movilidad previsional por 180 días (Ley 27.541 Art. 55), la creación del Impuesto PAIS del 30% y posteriormente la fórmula de movilidad de la Ley 27.609 (sin cláusula de indexación automática por inflación), bajo la cual el haber mínimo perdió poder adquisitivo real entre 2021 y 2023 ante la aceleración del IPC del 50,9% al 211,4% anual.',
        officialDocumentUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm'
      }
    ],
    crossCriticismAnalysis: 'Reclama en 2024–2026 recomposiciones automáticas por inflación y cuestiona tributos de emergencia, habiendo votado como jefe de bloque oficialista la suspensión de la movilidad indexada por IPC en diciembre de 2019 y la prórroga hasta 2027 de los impuestos de emergencia (Ganancias, Bienes Personales y Cheque).',
    institutionalContextAndDefense: 'El bloque del Frente de Todos argumentó en 2019–2020 que la fórmula anterior era impagable en un contexto de recesión y renegociación de deuda, y que se otorgaron bonos discrecionales para compensar parcialmente los haberes mínimos.'
  },
  {
    id: 'congruencia-bullrich-milei-recorte-2001-2024',
    slug: 'patricia-bullrich-cruces-tv-2023-y-decreto-896-2001-vs-gabinete-actual',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    politicianId: 'patricia_bullrich',
    politicianName: 'Patricia Bullrich',
    currentRole: 'Ministra de Seguridad de la Nación',
    currentParty: 'La Libertad Avanza / ex PRO',
    title: 'Cruces televisivos en TN / Debates 2023 contra el programa de La Libertad Avanza vs. integración al Gabinete y antecedente del Decreto 896/2001 (Déficit Cero)',
    topic: 'Alianzas y Seguridad',
    congruencePattern: 'giro_intertemporal_180',
    tvYoutubeClips: [
      {
        id: 'clip-bullrich-tn-debate-2023',
        channel: 'TN (Todo Noticias)',
        programOrContext: 'Debate Presidencial Oficial 2023 y entrevistas en A Dos Voces (TN) y LN+',
        broadcastDate: '2023-10-08',
        roleAtTime: 'Candidata a Presidenta (Juntos por el Cambio)',
        exactQuoteOrPosition: 'En el debate presidencial y en TN cuestionó las propuestas económicas, de libre portación y de reforma previsional de Javier Milei, mientras que Milei la cuestionó por su pasado político; pocos días después de la primera vuelta (25/10/2023) anunció en conferencia de prensa su apoyo incondicional y asumió como Ministra de Seguridad.',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=TN+Patricia+Bullrich+Javier+Milei+debate+2023'
      }
    ],
    counterActions: [
      {
        date: '2023-12-10',
        instrument: 'Decreto 8/2023 (Designación Ministra de Seguridad) y Decreto 896/2001 (Antecedente histórico)',
        roleAtAction: 'Ministra de Seguridad (2023–presente) / Ministra de Trabajo y Seguridad Social (2001)',
        whatTheyActuallyDid: 'Asumió como Ministra de Seguridad del Gobierno de Javier Milei (Decreto 8/2023) y pasó a integrar el espacio oficialista. En su trayectoria ejecutiva previa consta la refrenda del Decreto 896/2001 (13% de recorte a haberes estatales y jubilaciones durante la ley de Déficit Cero de 2001) y su voto negativo como diputada a la estatización de AFJP (2008) y de YPF (2012).',
        officialDocumentUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/300733/20231211'
      }
    ],
    crossCriticismAnalysis: 'Los archivos televisivos de TN y LN+ entre julio y octubre de 2023 muestran acusaciones recíprocas severas entre ambos espacios sobre gobernabilidad, economía y seguridad, que se revirtieron en 72 horas tras la primera vuelta electoral.',
    institutionalContextAndDefense: 'Ambos dirigentes explicaron públicamente que ante el balotaje presidencial de noviembre de 2023 priorizaron los puntos de coincidencia antikirchnerista y de orden fiscal/seguridad por encima de las diferencias de campaña.'
  },
  {
    id: 'congruencia-ritondo-ganancias-2023-2024',
    slug: 'cristian-ritondo-discurso-baja-impuestos-tv-vs-voto-restitucion-ganancias',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    politicianId: 'cristian_ritondo',
    politicianName: 'Cristian Ritondo',
    currentRole: 'Diputado Nacional (Buenos Aires) — Presidente Bloque PRO',
    currentParty: 'PRO',
    title: 'Discurso televisivo contra la suba de impuestos al trabajo en TN/LN+ (2020–2023) vs. voto afirmativo para restituir el Impuesto a las Ganancias (Acta HCDN 5274)',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'discurso_vs_voto_o_firma',
    tvYoutubeClips: [
      {
        id: 'clip-ritondo-tn-impuestos',
        channel: 'TN (Todo Noticias)',
        programOrContext: 'Entrevistas en TN (A Dos Voces / Desde el Llano) y LN+ sobre el compromiso legislativo de Juntos por el Cambio de no votar subas ni restituciones de impuestos',
        broadcastDate: '2021-11-10',
        roleAtTime: 'Diputado Nacional — Presidente del Bloque PRO',
        exactQuoteOrPosition: 'Sostuvo en televisión que el bloque PRO no acompañaría la creación ni el aumento de impuestos sobre los contribuyentes y el sector privado.',
        youtubeArchiveUrl: 'https://www.youtube.com/results?search_query=TN+Cristian+Ritondo+no+vamos+a+votar+suba+de+impuestos'
      }
    ],
    counterActions: [
      {
        date: '2024-06-28',
        instrument: 'Acta de Votación Nominal HCDN Nº 5274 (Ley 27.743 Título V)',
        roleAtAction: 'Diputado Nacional — Presidente del Bloque PRO',
        whatTheyActuallyDid: 'Votó AFIRMATIVO en la insistencia de la Cámara de Diputados para restituir el Impuesto a las Ganancias de 4.ª categoría, incorporando nuevamente a ~800.000 trabajadores asalariados al tributo.',
        officialDocumentUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    crossCriticismAnalysis: 'En septiembre de 2023 votó en contra de la baja de Ganancias calificando la medida de electoralista y sin financiamiento, y en junio de 2024 votó a favor de restituir el gravamen sobre los trabajadores en relación de dependencia pese al compromiso televisivo de no aumentar la presión impositiva.',
    institutionalContextAndDefense: 'El bloque PRO sostuvo que su voto de 2023 y su voto de 2024 respondieron al mismo criterio de responsabilidad fiscal y defensa de los recursos coparticipables de las provincias gobernadas por Juntos por el Cambio.'
  }
];
