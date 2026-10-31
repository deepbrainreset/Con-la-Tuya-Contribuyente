/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Blog / Bitácora Diaria de Congruencia (Archivos 2003–2026: X / Twitter, Diarios, TV y YouTube
 * vs. Votos Nominales, Firmas y Crítica Cruzada + Contador de Contradicciones e Interpelación Ciudadana).
 *
 * Examina con la misma vara a funcionarios actualmente en ejercicio de todos los signos políticos,
 * contrastando sus archivos de X/Twitter, diarios nacionales, versiones taquigráficas y canales de TV/YouTube
 * desde 2003 hasta la actualidad contra sus propios votos nominales, firmas de decretos/leyes y
 * contabilizando cuántas veces invirtieron su postura dentro de un mismo planteo.
 */

export type CongruencePatternType =
  | 'discurso_vs_voto_o_firma'
  | 'critica_a_terceros_por_medida_propia'
  | 'giro_intertemporal_180';

export interface TvYoutubeArchiveClip {
  id: string;
  channel:
    | 'TN (Todo Noticias)'
    | 'LN+ (La Nación+)'
    | 'C5N'
    | 'Crónica TV'
    | 'A24'
    | 'Diputados TV'
    | 'Senado TV'
    | 'Casa Rosada / Archivo Oficial';
  programOrContext: string;
  broadcastDate: string;
  roleAtTime: string;
  exactQuoteOrPosition: string;
  youtubeArchiveUrl: string;
}

export interface XTwitterAndPressArchiveItem {
  id: string;
  medium: 'X / Twitter' | 'Diario / Prensa Escrita' | 'Versión Taquigráfica / Archivo Oficial';
  sourceOrHandle: string; // Ej: "@JMilei en X (Twitter)", "Diario La Nación / Clarín", "@Kicillofok en X"
  publishedDate: string; // Cobertura histórica 2003–2026
  roleAtTime: string;
  exactPostOrQuote: string;
  socialCommentsAndCommunityContext: string; // Qué señalaron los comentarios ciudadanos / notas de la comunidad con evidencia
  archiveUrl: string;
}

export interface PositionShiftStep {
  stepNumber: number;
  yearOrDate: string;
  stageLabel:
    | 'Postura Inicial Documentada'
    | 'Contradicción / Giro #1'
    | 'Contradicción / Giro #2'
    | 'Contradicción / Giro #3'
    | 'Contradicción / Giro #4';
  medium: 'X / Twitter' | 'Diario / Prensa' | 'TV / YouTube' | 'Voto / Ley / Decreto Oficial';
  summaryOfStanceOrAct: string;
  sourceUrl: string;
}

export interface CitizenPublicInquiryTemplate {
  id: string;
  officialHandle: string;
  officialSocialUrl: string;
  networkLabel: 'X (Twitter)' | 'Instagram' | 'Canal Institucional';
  questionTitle: string;
  preDraftedVerifiedMessage: string;
  evidenceNormOrAct: string;
  evidenceOfficialUrl: string;
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
  historicalSpanCovered: string; // Ej: "2016–2026" o "2003–2026"
  politicianId: string;
  politicianName: string;
  currentRole: string;
  currentParty: string;
  verifiedSocialHandles: {
    xHandle?: string;
    xUrl?: string;
    instagramUrl?: string;
    officialWebUrl: string;
  };
  title: string;
  topic:
    | 'Impuestos y Presión Fiscal'
    | 'Jubilaciones y Haberes'
    | 'Empresas Públicas y Tarifas'
    | 'Deuda, Déficit y Emisión'
    | 'Alianzas y Seguridad';
  congruencePattern: CongruencePatternType;
  contradictionsCount: number; // Cantidad de contradicciones / vueltas de campana documentadas en este planteo
  positionShiftsChain: PositionShiftStep[];
  xTwitterAndPressArchives: XTwitterAndPressArchiveItem[];
  tvYoutubeClips: TvYoutubeArchiveClip[];
  counterActions: DocumentedCounterAction[];
  citizenPublicInquiries: CitizenPublicInquiryTemplate[];
  crossCriticismAnalysis: string;
  institutionalContextAndDefense: string;
}

export const CONGRUENCE_PATTERN_LABELS: Record<
  CongruencePatternType,
  { label: string; badgeClass: string; description: string }
> = {
  discurso_vs_voto_o_firma: {
    label: 'Dichos en X/TV/Prensa vs. Voto o Firma Propia',
    badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    description:
      'El archivo de X/Twitter, prensa o TV registra una promesa o rechazo categórico que luego se contradice con un voto nominal, proyecto enviado o norma firmada por el mismo funcionario.'
  },
  critica_a_terceros_por_medida_propia: {
    label: 'Crítica a Terceros por Medida que Antes Ejecutó',
    badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    description:
      'El funcionario cuestiona en X/Twitter, diarios o televisión a otro gobierno por aplicar una medida fiscal, previsional o tarifaria que él mismo o su bloque votó o ejecutó.'
  },
  giro_intertemporal_180: {
    label: 'Idas y Vueltas Sucesivas (Múltiples Giros de 180°)',
    badgeClass: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    description:
      'El funcionario sostuvo una postura, luego la invirtió y posteriormente volvió a cambiar de posición según ocupara el oficialismo o la oposición.'
  }
};

export const CONGRUENCE_BLOG_ENTRIES: CongruenceBlogEntry[] = [
  {
    id: 'congruencia-milei-ganancias-2023-2024',
    slug: 'javier-milei-promesa-impuestos-tv-x-vs-restitucion-ganancias-2024',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2016–2026',
    politicianId: 'javier_milei',
    politicianName: 'Javier Gerardo Milei',
    currentRole: 'Presidente de la Nación',
    currentParty: 'La Libertad Avanza',
    verifiedSocialHandles: {
      xHandle: '@JMilei',
      xUrl: 'https://x.com/JMilei',
      instagramUrl: 'https://www.instagram.com/javiermilei/',
      officialWebUrl: 'https://www.argentina.gob.ar/presidencia'
    },
    title:
      'Posteos en X (@JMilei) y TV prometiendo «cortarse un brazo antes de subir un impuesto» y voto a favor de bajar Ganancias (2023) vs. suba de Impuesto PAIS y restitución de Ganancias 4.ª Categoría (Ley 27.743)',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'discurso_vs_voto_o_firma',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '2016–2021',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'En su cuenta @JMilei y columnas en diarios califica a todo impuesto como «un robo a mano armada» y promete que jamás votaría ni firmaría una suba impositiva.',
        sourceUrl: 'https://x.com/JMilei'
      },
      {
        stepNumber: 2,
        yearOrDate: '19/09/2023',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Como diputado vota AFIRMATIVO junto al bloque de Unión por la Patria la eliminación de la 4.ª categoría de Ganancias (Acta HCDN 4912), rechazando la advertencia sobre el desfinanciamiento provincial.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/4912'
      },
      {
        stepNumber: 3,
        yearOrDate: '13/12/2023',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'A los tres días de asumir la Presidencia firma el Decreto 29/2023 elevando la alícuota del Impuesto PAIS del 7,5% al 17,5% sobre importaciones de bienes y fletes.',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/300809/20231213'
      },
      {
        stepNumber: 4,
        yearOrDate: '08/07/2024',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Remite al Congreso y promulga el Título V de la Ley 27.743 restituyendo el Impuesto a las Ganancias sobre ~800.000 trabajadores asalariados que él mismo había votado eximir 9 meses antes.',
        sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-milei-impuestos-2021-2023',
        medium: 'X / Twitter',
        sourceOrHandle: '@JMilei en X (Twitter) y archivo de diarios (La Nación / Infobae)',
        publishedDate: '2021-09-12',
        roleAtTime: 'Candidato a Diputado Nacional / Diputado Nacional',
        exactPostOrQuote:
          'Reiteró en X y prensa que «los impuestos son una rémora de la esclavitud» y se comprometió por escrito a no votar ni impulsar aumentos ni restituciones de impuestos existentes.',
        socialCommentsAndCommunityContext:
          'Usuarios y notas de contexto en X adjuntaron el Acta HCDN 4912 (donde votó quitar Ganancias en septiembre de 2023) frente al Decreto 29/2023 y al Decreto 593/2024 que promulgó la restitución de Ganancias.',
        archiveUrl: 'https://x.com/search?q=from%3AJMilei%20impuestos'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-milei-tv-impuestos-2021-2023',
        channel: 'LN+ (La Nación+)',
        programOrContext:
          'Entrevistas de campaña legislativa y presidencial + Sesión HCDN en Diputados TV',
        broadcastDate: '2023-09-19',
        roleAtTime: 'Diputado Nacional (La Libertad Avanza)',
        exactQuoteOrPosition:
          'Afirmó en televisión que «antes de subir un impuesto me corto un brazo» y en la sesión del 19/09/2023 votó afirmativamente la eliminación de la 4.ª categoría de Ganancias impulsada por Sergio Massa.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=Diputados+TV+sesion+19+septiembre+2023+Ganancias+Milei'
      }
    ],
    counterActions: [
      {
        date: '2023-12-13',
        instrument: 'Decreto 29/2023 (B.O. 13/12/2023)',
        roleAtAction: 'Presidente de la Nación',
        whatTheyActuallyDid:
          'Incrementó la alícuota del Impuesto PAIS para importaciones de bienes y servicios de flete del 7,5% al 17,5% (vigente durante todo 2024 hasta el vencimiento legal del tributo en diciembre de 2024).',
        officialDocumentUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/300809/20231213'
      },
      {
        date: '2024-07-08',
        instrument: 'Ley 27.743 (Título V) y Decreto 593/2024',
        roleAtAction: 'Presidente de la Nación',
        whatTheyActuallyDid:
          'El Poder Ejecutivo Nacional remitió al Congreso el Paquete Fiscal restituyendo el Impuesto a las Ganancias de 4.ª categoría para trabajadores en relación de dependencia y promulgó la Ley 27.743 tras la insistencia de Diputados (Acta 5274).',
        officialDocumentUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-milei-ganancias',
        officialHandle: '@JMilei',
        officialSocialUrl: 'https://x.com/JMilei',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por restitución de Ganancias (Ley 27.743)',
        preDraftedVerifiedMessage:
          '@JMilei: El 19/09/2023 votó eximir a los asalariados de Ganancias (Acta HCDN 4912), pero el 08/07/2024 promulgó la Ley 27.743 restituyendo ese mismo impuesto (B.O. 310293). ¿En qué fecha enviará su derogación prometida? Fuente oficial: https://votaciones.hcdn.gob.ar/pdf/acta/4912',
        evidenceNormOrAct: 'Acta HCDN 4912 (2023) vs. Ley 27.743 / Decreto 593/2024',
        evidenceOfficialUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/310293/20240708'
      }
    ],
    crossCriticismAnalysis:
      'Se contabilizan 3 giros documentados sobre el mismo eje: de declarar que todo impuesto es un robo y votar en septiembre de 2023 la baja de Ganancias con el argumento de que jamás se debe financiar al fisco con impuestos sobre el salario, pasó a subir el Impuesto PAIS en diciembre de 2023 y a restituir Ganancias sobre asalariados en julio de 2024.',
    institutionalContextAndDefense:
      'El Poder Ejecutivo argumentó públicamente que la reforma de septiembre de 2023 había desfinanciado en ~0,8% del PIB a las provincias, que los gobernadores condicionaron la aprobación de la Ley Bases a la restitución de Ganancias coparticipable y que el Impuesto PAIS dejó de regir el 23/12/2024.'
  },
  {
    id: 'congruencia-kicillof-impuestos-ypf-2012-2026',
    slug: 'axel-kicillof-discurso-alivio-fiscal-y-costo-ypf-vs-subas-impositivas-pba',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2003–2026',
    politicianId: 'axel_kicillof',
    politicianName: 'Axel Kicillof',
    currentRole: 'Gobernador de la Provincia de Buenos Aires',
    currentParty: 'Unión por la Patria',
    verifiedSocialHandles: {
      xHandle: '@Kicillofok',
      xUrl: 'https://x.com/Kicillofok',
      instagramUrl: 'https://www.instagram.com/kicillofok/',
      officialWebUrl: 'https://www.gba.gob.ar'
    },
    title:
      'Idas y vueltas sobre YPF (1992–2007–2012–2014) y posteos en X (@Kicillofok) contra el ajuste fiscal vs. subas de hasta 200%+ en Ley Impositiva PBA 15.479 e Ingresos Brutos',
    topic: 'Empresas Públicas y Tarifas',
    congruencePattern: 'critica_a_terceros_por_medida_propia',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '2003–2007',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'Diario / Prensa',
        summaryOfStanceOrAct:
          'Tras la privatización de YPF impulsada por el PJ en 1992 (Ley 24.145), entre 2003 y 2007 el gobierno nacional avala la gestión privada de Repsol y celebra en diciembre de 2007 el ingreso del Grupo Petersen como «argentinización privada de YPF».',
        sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/540/norma.htm'
      },
      {
        stepNumber: 2,
        yearOrDate: '17/04/2012',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'TV / YouTube',
        summaryOfStanceOrAct:
          'En el Senado, Kicillof afirma que «los tarados son los que piensan que el Estado tiene que ser estúpido y comprar todo según el estatuto de YPF» y sostiene que Repsol no debía cobrar sino pagar pasivos ambientales.',
        sourceUrl:
          'https://www.youtube.com/results?search_query=Senado+TV+Axel+Kicillof+17+abril+2012+estatuto+YPF'
      },
      {
        stepNumber: 3,
        yearOrDate: '08/05/2014',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Como Ministro de Economía impulsa y ejecuta la Ley 26.932 pagándole a Repsol USD 5.000 millones en bonos soberanos; además, haber omitido la OPA del Art. 7 del Estatuto deriva en el fallo SDNY de USD 16.100 millones contra la Argentina.',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm'
      },
      {
        stepNumber: 4,
        yearOrDate: 'Enero–Marzo 2024',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'En @Kicillofok cuestiona la presión impositiva y tarifaria sobre familias y pymes mientras promulga la Ley Impositiva PBA 15.479 con subas de hasta 200%+ en Inmobiliario y Patentes (ARBA) y un anticipo extraordinario de Ingresos Brutos.',
        sourceUrl: 'https://normas.gba.gob.ar/documentos/B3wX9i3x.html'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-kicillof-impuestos-ypf-2012-2024',
        medium: 'X / Twitter',
        sourceOrHandle: '@Kicillofok en X (Twitter) y archivo Página/12, Clarín y La Nación (2012–2024)',
        publishedDate: '2024-02-14',
        roleAtTime: 'Gobernador de la Provincia de Buenos Aires',
        exactPostOrQuote:
          'Publicó en @Kicillofok críticas al impacto del ajuste nacional en el bolsillo de la clase media y defendió la estatización de YPF calificándola de soberanía sin costo desmedido.',
        socialCommentsAndCommunityContext:
          'En las respuestas de X los contribuyentes adjuntaron las boletas de ARBA emitidas bajo la Ley 15.479 (con incrementos del 200% al 300% en Inmobiliario y Patentes), la retención en cascada de IIBB y el texto de la Ley 26.932 (pago de USD 5.000 M a Repsol).',
        archiveUrl: 'https://x.com/search?q=from%3AKicillofok%20impuestos%20OR%20YPF'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-kicillof-senado-tv-2012',
        channel: 'Senado TV',
        programOrContext:
          'Plenario de Comisiones del Senado de la Nación por el proyecto de expropiación del 51% de YPF',
        broadcastDate: '2012-04-17',
        roleAtTime: 'Secretario de Política Económica y Viceministro de Economía',
        exactQuoteOrPosition:
          '«Los tarados son los que piensan que el Estado tiene que ser estúpido y comprar todo según el estatuto de YPF, respetando a rajatabla las condiciones leoninas... Costará lo que determine el Tribunal de Tasación.»',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=Senado+TV+Axel+Kicillof+17+abril+2012+estatuto+YPF'
      },
      {
        id: 'clip-kicillof-c5n-impuestos-2024',
        channel: 'C5N',
        programOrContext:
          'Entrevistas televisivas y conferencias sobre el impacto de impuestos y tarifas en los hogares bonaerenses',
        broadcastDate: '2024-03-15',
        roleAtTime: 'Gobernador de la Provincia de Buenos Aires',
        exactQuoteOrPosition:
          'Cuestionó al Gobierno Nacional por «asfixiar los ingresos de las familias y pymes con subas desmedidas».',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=C5N+Axel+Kicillof+impuestos+tarifas+2024'
      }
    ],
    counterActions: [
      {
        date: '2014-05-08',
        instrument: 'Ley 26.932 (Convenio de Indemnización Repsol) + Sentencia SDNY 2023',
        roleAtAction: 'Ministro de Economía (2014) / Ex interventor YPF',
        whatTheyActuallyDid:
          'En 2014 el Estado nacional emitió USD 5.000 millones en bonos soberanos para indemnizar a Repsol y en septiembre de 2023 el Juzgado del Distrito Sur de Nueva York condenó a la República Argentina a pagar USD 16.100 millones por incumplimiento del artículo 7 del estatuto de YPF.',
        officialDocumentUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm'
      },
      {
        date: '2024-01-02',
        instrument: 'Ley Impositiva PBA 15.479 (Ejercicio 2024)',
        roleAtAction: 'Gobernador de la Provincia de Buenos Aires',
        whatTheyActuallyDid:
          'Impulsó y promulgó la Ley Impositiva 15.479 que aplicó topes de actualización de hasta 200% (y más en tramos superiores sin tope) en el Impuesto Inmobiliario Urbano, Rural y Automotor de ARBA, además de un anticipo extraordinario de Ingresos Brutos.',
        officialDocumentUrl: 'https://normas.gba.gob.ar/documentos/B3wX9i3x.html'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-kicillof-iibb-arba',
        officialHandle: '@Kicillofok',
        officialSocialUrl: 'https://x.com/Kicillofok',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por subas de ARBA (Ley 15.479) y cascada de IIBB',
        preDraftedVerifiedMessage:
          '@Kicillofok: En X cuestiona la presión sobre las familias, pero promulgó la Ley Impositiva PBA 15.479 con subas de hasta 200%+ en ARBA y mantiene Ingresos Brutos del 4%–5% en cascada sobre alimentos y luz. ¿Cuándo reducirá IIBB? Fuente: https://normas.gba.gob.ar/documentos/B3wX9i3x.html',
        evidenceNormOrAct: 'Ley Impositiva PBA 15.479 (B.O. PBA 02/01/2024)',
        evidenceOfficialUrl: 'https://normas.gba.gob.ar/documentos/B3wX9i3x.html'
      },
      {
        id: 'inq-kicillof-ypf-estatuto',
        officialHandle: '@Kicillofok',
        officialSocialUrl: 'https://x.com/Kicillofok',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por declaración de 2012 sobre el Estatuto de YPF',
        preDraftedVerifiedMessage:
          '@Kicillofok: El 17/04/2012 declaró en el Senado que respetar el Art. 7 del Estatuto de YPF era absurdo y que no se pagaría ese costo; en 2014 se pagaron USD 5.000 M (Ley 26.932) y el fallo SDNY sumó USD 16.100 M. ¿Qué autocrítica técnica realiza? Fuente: https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm',
        evidenceNormOrAct: 'Versión Taquigráfica HSN 17/04/2012 y Ley 26.932',
        evidenceOfficialUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/225000-229999/229709/norma.htm'
      }
    ],
    crossCriticismAnalysis:
      'Registra 3 contradicciones troncales: (1) del aval oficial a la privatización/ingreso de Petersen (1992–2007) a declarar en 2012 que Repsol no cobraría y que respetar el estatuto era «de tarados»; (2) terminar pagando USD 5.000 M en bonos en 2014 (Ley 26.932) y dejar un litigio de USD 16.100 M por omitir el estatuto; y (3) denunciar en X el peso de los impuestos nacionales mientras aplica subas del 200%+ en ARBA e Ingresos Brutos en cascada.',
    institutionalContextAndDefense:
      'El Ejecutivo bonaerense sostuvo que la actualización de la Ley Impositiva 15.479 buscó compensar la inflación acumulada de 2023 y el recorte de transferencias no automáticas nacionales, y que la expropiación de YPF permitió recuperar el control de Vaca Muerta.'
  },
  {
    id: 'congruencia-maximo-kirchner-impuestos-moratorias',
    slug: 'maximo-kirchner-criticas-ajuste-vs-voto-impuesto-pais-82-movil-y-moratorias',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2003–2026',
    politicianId: 'maximo_kirchner',
    politicianName: 'Máximo Carlos Kirchner',
    currentRole: 'Diputado Nacional (Buenos Aires)',
    currentParty: 'Unión por la Patria',
    verifiedSocialHandles: {
      xHandle: '@Diputados_UxP',
      xUrl: 'https://x.com/Diputados_UxP',
      officialWebUrl: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html'
    },
    title:
      'Giros previsionales e impositivos (2003–2026): del veto al 82% móvil (Decreto 1482/2010) y la suspensión de movilidad de 2019 (Ley 27.541) a reclamar en X y TV indexación por inflación',
    topic: 'Jubilaciones y Haberes',
    congruencePattern: 'critica_a_terceros_por_medida_propia',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '2003–2008',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Entre 2003 y 2007 se mantuvo el régimen mixto con libre opción (Ley 26.222) y en noviembre de 2008 se estatizaron las AFJP (Ley 26.425) asegurando en diarios y recinto que los fondos garantizarían haberes equivalentes al 82%.',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm'
      },
      {
        stepNumber: 2,
        yearOrDate: '14/10/2010',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Cuando el Congreso sanciona la Ley 26.649 del 82% móvil para jubilados, el Poder Ejecutivo Nacional la veta totalmente mediante el Decreto 1482/2010 calificándola de «ley de quiebra del Estado».',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/170000-174999/173609/norma.htm'
      },
      {
        stepNumber: 3,
        yearOrDate: '20/12/2019 y 29/12/2020',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Tras criticar en 2017 la fórmula indexada por inflación, como jefe de bloque vota suspender la movilidad por 180 días (Ley 27.541), crear el Impuesto PAIS (30%) y sancionar la Ley 27.609 sin cláusula de inflación, provocando caída real de haberes con IPC del 211,4% en 2023.',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm'
      },
      {
        stepNumber: 4,
        yearOrDate: 'Junio 2024–2026',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Ya en la oposición, reclama en X (@Diputados_UxP) y Diputados TV la indexación mensual por IPC y cuestiona el veto presidencial a la suba jubilatoria, omitiendo el veto del Decreto 1482/2010 y la desindexación de 2019–2020.',
        sourceUrl: 'https://x.com/Diputados_UxP'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-maximo-previsional-2017-2024',
        medium: 'X / Twitter',
        sourceOrHandle: '@Diputados_UxP en X y archivo Clarín / Página/12 / La Nación (2010–2024)',
        publishedDate: '2024-06-05',
        roleAtTime: 'Diputado Nacional (Unión por la Patria)',
        exactPostOrQuote:
          'El bloque difundió en X que «no se puede ajustar a los jubilados ni negarles la actualización frente a la inflación».',
        socialCommentsAndCommunityContext:
          'En los comentarios de X los usuarios adjuntaron el Boletín Oficial del Decreto 1482/2010 (veto total al 82% móvil), el artículo 55 de la Ley 27.541 (suspensión de movilidad votada en diciembre de 2019) y la prórroga de impuestos como el Cheque hasta 2027.',
        archiveUrl: 'https://x.com/Diputados_UxP'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-maximo-diputados-tv-2024',
        channel: 'Diputados TV',
        programOrContext:
          'Intervenciones en el recinto de la HCDN y entrevistas en C5N sobre haberes jubilatorios e impuestos al consumo',
        broadcastDate: '2024-06-04',
        roleAtTime: 'Diputado Nacional (Unión por la Patria)',
        exactQuoteOrPosition:
          'Cuestionó al oficialismo actual por el deterioro de los haberes previsionales y la carga impositiva sobre los sectores medios y bajos.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=Diputados+TV+Maximo+Kirchner+jubilaciones+impuestos+2024'
      }
    ],
    counterActions: [
      {
        date: '2010-10-14',
        instrument: 'Decreto 1482/2010 (Veto total a la Ley 26.649 del 82% Móvil)',
        roleAtAction: 'Oficialismo Nacional (Frente para la Victoria)',
        whatTheyActuallyDid:
          'Vetó en forma total la Ley 26.649 sancionada por el Congreso que establecía el 82% móvil sobre el Salario Mínimo Vital y Móvil.',
        officialDocumentUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/170000-174999/173609/norma.htm'
      },
      {
        date: '2019-12-20',
        instrument:
          'Ley 27.541 (Solidaridad Social) y Ley 27.609 (Movilidad Previsional 2020)',
        roleAtAction: 'Presidente del Bloque Frente de Todos en Diputados',
        whatTheyActuallyDid:
          'Impulsó y votó afirmativamente la suspensión de la movilidad previsional por 180 días (Ley 27.541 Art. 55), la creación del Impuesto PAIS del 30% y la fórmula de la Ley 27.609 sin cláusula de inflación.',
        officialDocumentUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-maximo-movilidad-27541',
        officialHandle: '@Diputados_UxP',
        officialSocialUrl: 'https://x.com/Diputados_UxP',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por suspensión de movilidad (Ley 27.541) y Ley 27.609',
        preDraftedVerifiedMessage:
          '@Diputados_UxP (Dip. Máximo Kirchner): Hoy reclaman movilidad indexada por IPC, pero el 20/12/2019 votaron suspender la fórmula por IPC (Ley 27.541 Art. 55) y en 2020 quitaron la cláusula de inflación (Ley 27.609). ¿Por qué la quitaron cuando gobernaban? Fuente: https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm',
        evidenceNormOrAct: 'Ley 27.541 Art. 55 (2019) y Ley 27.609 (2020)',
        evidenceOfficialUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm'
      }
    ],
    crossCriticismAnalysis:
      'Se contabilizan 3 giros documentados entre 2008 y 2024: estatizar las AFJP en 2008 invocando el fortalecimiento de los haberes, vetar el 82% móvil en 2010 (Decreto 1482/2010), suspender la movilidad indexada por IPC en diciembre de 2019 (Ley 27.541) y luego exigir en 2024 desde la oposición la misma indexación por IPC que habían derogado.',
    institutionalContextAndDefense:
      'El bloque de Unión por la Patria argumentó que en 2019–2020 la fórmula anterior era fiscalmente insostenible en medio de la renegociación de la deuda y que se otorgaron bonos compensatorios a los haberes mínimos e inclusión vía moratorias (Ley 27.705).'
  },
  {
    id: 'congruencia-bullrich-milei-recorte-2001-2024',
    slug: 'patricia-bullrich-cruces-x-tv-2023-y-decreto-896-2001-vs-gabinete-actual',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2001–2026',
    politicianId: 'patricia_bullrich',
    politicianName: 'Patricia Bullrich',
    currentRole: 'Ministra de Seguridad de la Nación',
    currentParty: 'La Libertad Avanza / ex PRO',
    verifiedSocialHandles: {
      xHandle: '@PatoBullrich',
      xUrl: 'https://x.com/PatoBullrich',
      instagramUrl: 'https://www.instagram.com/patobullrich/',
      officialWebUrl: 'https://www.argentina.gob.ar/seguridad'
    },
    title:
      'Cuatro cambios de bloque y postura (2001–2026): del Decreto 896/2001 (recorte 13%) y los posteos en X (@PatoBullrich) contra Milei en 2023 a integrar su Gabinete y afiliarse a LLA',
    topic: 'Alianzas y Seguridad',
    congruencePattern: 'giro_intertemporal_180',
    contradictionsCount: 4,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '13/07/2001',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Como Ministra de Trabajo de la Alianza refrenda el Decreto 896/2001 aplicando el recorte del 13% a haberes estatales y jubilaciones bajo la Ley de Déficit Cero.',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/67905/norma.htm'
      },
      {
        stepNumber: 2,
        yearOrDate: '2007–2015',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Desde la Coalición Cívica y luego Unión por Todos / PRO cuestiona en X (@PatoBullrich) y en el Congreso el uso de fondos previsionales y la suba de impuestos, votando contra las leyes 26.425 (AFJP) y 26.741 (YPF).',
        sourceUrl: 'https://x.com/PatoBullrich'
      },
      {
        stepNumber: 3,
        yearOrDate: 'Agosto–Octubre 2023',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Como candidata presidencial de Juntos por el Cambio publica en @PatoBullrich y declara en TN y el Debate Presidencial que las propuestas económicas y de seguridad de Javier Milei «son un salto al vacío y un peligro para los jubilados y la educación».',
        sourceUrl:
          'https://www.youtube.com/results?search_query=TN+Patricia+Bullrich+Javier+Milei+debate+2023'
      },
      {
        stepNumber: 4,
        yearOrDate: '25/10/2023 a 2024–2026',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'A las 72 horas de la elección general se alía con Javier Milei, asume como Ministra de Seguridad (Decreto 8/2023), rompe con la conducción del PRO y se afilia a La Libertad Avanza defendiendo en X el programa que había impugnado.',
        sourceUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/300733/20231211'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-bullrich-milei-2023',
        medium: 'X / Twitter',
        sourceOrHandle: '@PatoBullrich en X (Twitter) y archivo La Nación / Clarín (2001–2024)',
        publishedDate: '2023-10-09',
        roleAtTime: 'Candidata a Presidenta de la Nación (Juntos por el Cambio)',
        exactPostOrQuote:
          'Publicó en @PatoBullrich tras el debate presidencial que las ideas de su adversario de La Libertad Avanza eran «inviables, peligrosas y pactadas con la casta sindical».',
        socialCommentsAndCommunityContext:
          'Tres semanas después, los usuarios en X citaron esos mismos tuits frente a su foto de acuerdo político y su designación por Decreto 8/2023.',
        archiveUrl: 'https://x.com/search?q=from%3APatoBullrich%20Milei'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-bullrich-tn-debate-2023',
        channel: 'TN (Todo Noticias)',
        programOrContext:
          'Debate Presidencial Oficial 2023 y entrevistas en A Dos Voces (TN) y LN+',
        broadcastDate: '2023-10-08',
        roleAtTime: 'Candidata a Presidenta (Juntos por el Cambio)',
        exactQuoteOrPosition:
          'En el debate presidencial y en TN cuestionó las propuestas económicas, de libre portación y de reforma previsional de Javier Milei; pocos días después de la primera vuelta anunció su apoyo incondicional y asumió como Ministra de Seguridad.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=TN+Patricia+Bullrich+Javier+Milei+debate+2023'
      }
    ],
    counterActions: [
      {
        date: '2023-12-10',
        instrument:
          'Decreto 8/2023 (Designación Ministra de Seguridad) y Decreto 896/2001 (Antecedente histórico)',
        roleAtAction:
          'Ministra de Seguridad (2023–presente) / Ministra de Trabajo y Seguridad Social (2001)',
        whatTheyActuallyDid:
          'Asumió como Ministra de Seguridad del Gobierno de Javier Milei (Decreto 8/2023) e integró su espacio político, tras haber firmado en 2001 el Decreto 896/2001 y haber pasado por cuatro sellos partidarios distintos desde 1999.',
        officialDocumentUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/300733/20231211'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-bullrich-decreto-896-y-giro-2023',
        officialHandle: '@PatoBullrich',
        officialSocialUrl: 'https://x.com/PatoBullrich',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por Decreto 896/2001 y giro político de octubre 2023',
        preDraftedVerifiedMessage:
          '@PatoBullrich: En octubre de 2023 cuestionó en X y en el Debate Presidencial el programa fiscal y previsional de LLA, y en diciembre asumió por Decreto 8/2023 defendiéndolo, tras haber refrendado en 2001 el Decreto 896/2001 (-13%). ¿Qué cambió en 72 horas? Fuente: https://www.boletinoficial.gob.ar/detalleAviso/primera/300733/20231211',
        evidenceNormOrAct: 'Decreto 896/2001 y Decreto 8/2023',
        evidenceOfficialUrl:
          'https://www.boletinoficial.gob.ar/detalleAviso/primera/300733/20231211'
      }
    ],
    crossCriticismAnalysis:
      'Registra 4 giros documentados en su trayectoria ejecutiva y parlamentaria (Alianza → Coalición Cívica → PRO → La Libertad Avanza), incluyendo la inversión en 72 horas de todas las críticas formuladas en X y televisión durante la campaña presidencial de 2023.',
    institutionalContextAndDefense:
      'Ambos dirigentes explicaron públicamente que ante el balotaje presidencial de noviembre de 2023 priorizaron la coincidencia en seguridad interior y equilibrio fiscal por encima de las acusaciones de campaña.'
  },
  {
    id: 'congruencia-ritondo-ganancias-2023-2024',
    slug: 'cristian-ritondo-discurso-baja-impuestos-x-tv-vs-voto-restitucion-ganancias',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2003–2026',
    politicianId: 'cristian_ritondo',
    politicianName: 'Cristian Ritondo',
    currentRole: 'Diputado Nacional (Buenos Aires) — Presidente Bloque PRO',
    currentParty: 'PRO',
    verifiedSocialHandles: {
      xHandle: '@cristianritondo',
      xUrl: 'https://x.com/cristianritondo',
      instagramUrl: 'https://www.instagram.com/cristianritondo/',
      officialWebUrl: 'https://www.hcdn.gob.ar/diputados/critondo'
    },
    title:
      'Compromiso en X (@cristianritondo) y TV de «no votar jamás una suba de impuestos» vs. voto negativo a bajar Ganancias (2023) y voto afirmativo para restituirlo (Acta HCDN 5274)',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'discurso_vs_voto_o_firma',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '2003–2007',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Como diputado nacional del bloque justicialista (2003–2007) acompaña prórrogas de impuestos de emergencia (Ganancias, Cheque y Bienes Personales) antes de pasar al PRO.',
        sourceUrl: 'https://www.hcdn.gob.ar/diputados/critondo'
      },
      {
        stepNumber: 2,
        yearOrDate: '2020–2021',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Firma y publica en @cristianritondo el compromiso público de Juntos por el Cambio de «no votar aumentos de impuestos ni crear nuevos tributos sobre el trabajo y la producción».',
        sourceUrl: 'https://x.com/cristianritondo'
      },
      {
        stepNumber: 3,
        yearOrDate: '19/09/2023',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'En la sesión de la Cámara de Diputados (Acta HCDN 4912) vota NEGATIVO al proyecto que eliminaba el Impuesto a las Ganancias de 4.ª categoría para los trabajadores asalariados.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/4912'
      },
      {
        stepNumber: 4,
        yearOrDate: '28/06/2024',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'En el Acta HCDN 5274 vota AFIRMATIVO para insistir con el Título V de la Ley 27.743 y restituir el Impuesto a las Ganancias sobre ~800.000 trabajadores.',
        sourceUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-ritondo-impuestos-2021',
        medium: 'X / Twitter',
        sourceOrHandle: '@cristianritondo en X (Twitter) y archivo Clarín / La Nación (2021–2024)',
        publishedDate: '2021-11-08',
        roleAtTime: 'Diputado Nacional — Presidente del Bloque PRO',
        exactPostOrQuote:
          'Publicó en @cristianritondo que «los argentinos no dan más de pagar impuestos; desde nuestro bloque nos comprometemos a no votar ninguna suba impositiva».',
        socialCommentsAndCommunityContext:
          'Tras la sesión del 28/06/2024, usuarios en X respondieron a sus publicaciones adjuntando la captura oficial del Acta HCDN 5274 donde figura su voto AFIRMATIVO para restituir Ganancias.',
        archiveUrl: 'https://x.com/search?q=from%3Acristianritondo%20impuestos'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-ritondo-tn-impuestos',
        channel: 'TN (Todo Noticias)',
        programOrContext:
          'Entrevistas en TN (A Dos Voces / Desde el Llano) y LN+ sobre el compromiso legislativo de no votar subas ni restituciones de impuestos',
        broadcastDate: '2021-11-10',
        roleAtTime: 'Diputado Nacional — Presidente del Bloque PRO',
        exactQuoteOrPosition:
          'Sostuvo en televisión que el bloque PRO no acompañaría la creación ni el aumento de impuestos sobre los contribuyentes y el sector privado.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=TN+Cristian+Ritondo+no+vamos+a+votar+suba+de+impuestos'
      }
    ],
    counterActions: [
      {
        date: '2024-06-28',
        instrument: 'Acta de Votación Nominal HCDN Nº 5274 (Ley 27.743 Título V)',
        roleAtAction: 'Diputado Nacional — Presidente del Bloque PRO',
        whatTheyActuallyDid:
          'Votó AFIRMATIVO en la insistencia de la Cámara de Diputados para restituir el Impuesto a las Ganancias de 4.ª categoría, incorporando nuevamente a ~800.000 trabajadores asalariados al tributo.',
        officialDocumentUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-ritondo-acta-5274',
        officialHandle: '@cristianritondo',
        officialSocialUrl: 'https://x.com/cristianritondo',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por voto afirmativo a restituir Ganancias (Acta 5274)',
        preDraftedVerifiedMessage:
          '@cristianritondo: En X se comprometió a no votar subas de impuestos, pero el 19/09/2023 votó contra bajar Ganancias (Acta 4912) y el 28/06/2024 votó AFIRMATIVO para restituirlo sobre 800.000 asalariados (Acta 5274). ¿Por qué incumplió ese compromiso? Fuente: https://votaciones.hcdn.gob.ar/pdf/acta/5274',
        evidenceNormOrAct: 'Acta HCDN 4912 (2023) y Acta HCDN 5274 (2024)',
        evidenceOfficialUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
      }
    ],
    crossCriticismAnalysis:
      'Se contabilizan 3 contradicciones documentadas entre sus compromisos públicos en X/TV de no aumentar impuestos al trabajo y sus dos votaciones nominales consecutivas en la Cámara de Diputados (Actas 4912 y 5274) para mantener y restituir el Impuesto a las Ganancias sobre salarios.',
    institutionalContextAndDefense:
      'El bloque PRO sostuvo que tanto su voto de 2023 como el de 2024 buscaron preservar el equilibrio fiscal y la masa coparticipable de las provincias.'
  },
  {
    id: 'congruencia-jorge-macri-abl-patentes-caba',
    slug: 'jorge-macri-alivio-fiscal-x-tv-vs-subas-abl-y-reliquidacion-patentes-caba',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2011–2026',
    politicianId: 'jorge_macri',
    politicianName: 'Jorge Macri',
    currentRole: 'Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires',
    currentParty: 'PRO',
    verifiedSocialHandles: {
      xHandle: '@jorgemacri',
      xUrl: 'https://x.com/jorgemacri',
      instagramUrl: 'https://www.instagram.com/jorgemacri/',
      officialWebUrl: 'https://buenosaires.gob.ar'
    },
    title:
      'Promesas de alivio fiscal en X (@jorgemacri) y LN+ vs. indexación mensual de ABL con recargo zonal y boletas de Patentes que debieron reliquidarse',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'discurso_vs_voto_o_firma',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '2011–2021',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Como Intendente de Vicente López cuestiona en @jorgemacri y diarios la presión impositiva provincial y nacional, mientras el municipio aplica tasas de Seguridad e Higiene y ABL actualizadas sobre comercios y frentistas.',
        sourceUrl: 'https://x.com/jorgemacri'
      },
      {
        stepNumber: 2,
        yearOrDate: '2023 (Campaña CABA)',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Durante la campaña a Jefe de Gobierno promete en @jorgemacri reducir el peso de ABL, Patentes e Ingresos Brutos sobre la clase media porteña.',
        sourceUrl: 'https://x.com/jorgemacri'
      },
      {
        stepNumber: 3,
        yearOrDate: 'Febrero 2024',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'TV / YouTube',
        summaryOfStanceOrAct:
          'AGIP emite boletas de Patentes con subas superiores al 100%–150%; ante la ola de reclamos con capturas en X, sale en LN+ a pedirle a los vecinos «no pagar todavía la boleta» emitida por su propia gestión.',
        sourceUrl:
          'https://www.youtube.com/results?search_query=LN%2B+Jorge+Macri+patentes+ABL+Trebucq'
      },
      {
        stepNumber: 4,
        yearOrDate: 'Diciembre 2024–2025',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Impulsa en la Legislatura porteña el esquema de actualización de ABL con coeficientes geográficos diferenciales que superan el IPC en corredores de zona Norte y Centro.',
        sourceUrl: 'https://boletinoficial.buenosaires.gob.ar'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-jorge-macri-abl-patentes-2023-2024',
        medium: 'X / Twitter',
        sourceOrHandle: '@jorgemacri en X (Twitter) y archivo La Nación / Clarín (2023–2025)',
        publishedDate: '2024-02-19',
        roleAtTime: 'Jefe de Gobierno de CABA',
        exactPostOrQuote:
          'Publicó en @jorgemacri anuncios de alivio fiscal para comerciantes y vecinos porteños.',
        socialCommentsAndCommunityContext:
          'Vecinos de CABA respondieron en X adjuntando las liquidaciones de AGIP de Patentes y las boletas mensuales indexadas de Inmobiliario/ABL.',
        archiveUrl: 'https://x.com/search?q=from%3Ajorgemacri%20impuestos%20OR%20patentes%20OR%20ABL'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-jorge-macri-lnmas-patentes',
        channel: 'LN+ (La Nación+)',
        programOrContext:
          'Entrevistas en LN+ (con Esteban Trebucq) y TN sobre presión impositiva porteña, Patentes y ABL',
        broadcastDate: '2024-02-20',
        roleAtTime: 'Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires',
        exactQuoteOrPosition:
          'Ante la emisión de boletas de Patentes con subas superiores al 100% por cambios en valuaciones de AGIP, recomendó en vivo en LN+ a los contribuyentes «no pagar la boleta» hasta que el propio Ejecutivo porteño corrigiera el tope.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=LN%2B+Jorge+Macri+patentes+ABL+Trebucq'
      }
    ],
    counterActions: [
      {
        date: '2024-12-12',
        instrument: 'Leyes Tarifarias y Presupuesto CABA 2024–2025 (AGIP)',
        roleAtAction: 'Jefe de Gobierno de CABA',
        whatTheyActuallyDid:
          'Impulsó el esquema de actualización mensual indexada de ABL con coeficientes geográficos diferenciales y liquidaciones de Patentes automotor sobre valuaciones actualizadas que requirieron rectificación administrativa.',
        officialDocumentUrl: 'https://boletinoficial.buenosaires.gob.ar'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-jorge-macri-abl-patentes',
        officialHandle: '@jorgemacri',
        officialSocialUrl: 'https://x.com/jorgemacri',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por subas de ABL, Patentes e IIBB en CABA',
        preDraftedVerifiedMessage:
          '@jorgemacri: En campaña prometió en X aliviar la carga fiscal en CABA, pero la Ley Tarifaria mantiene indexación mensual de ABL con adicionales por zona e Ingresos Brutos en cascada sobre servicios. ¿Cuándo eliminará el recargo zonal del ABL? Fuente: https://boletinoficial.buenosaires.gob.ar',
        evidenceNormOrAct: 'Ley Tarifaria CABA 2024–2025 (AGIP / BOCBA)',
        evidenceOfficialUrl: 'https://boletinoficial.buenosaires.gob.ar'
      }
    ],
    crossCriticismAnalysis:
      'Registra 3 contradicciones documentadas entre el discurso de baja de impuestos en redes/TV y la emisión efectiva de liquidaciones de ABL y Patentes por parte de AGIP.',
    institutionalContextAndDefense:
      'El Gobierno de CABA atribuyó el salto en las boletas de Patentes a la tabla de valuaciones de ACARA/DNRPA, aplicó un tope equivalente a la inflación e instrumentó exenciones de Ingresos Brutos para tramos iniciales de monotributistas.'
  },
  {
    id: 'congruencia-martin-lousteau-125-impuestos-2005-2026',
    slug: 'martin-lousteau-resolucion-125-kirchnerismo-cambiemos-ucr-2005-2026',
    publishedAt: '2026-10-30',
    lastVerified: '2026-10-30',
    historicalSpanCovered: '2005–2026',
    politicianId: 'martin_lousteau',
    politicianName: 'Martín Lousteau',
    currentRole: 'Senador Nacional (CABA) y Presidente de la UCR',
    currentParty: 'Unión Cívica Radical (UCR)',
    verifiedSocialHandles: {
      xHandle: '@GugaLusto',
      xUrl: 'https://x.com/GugaLusto',
      instagramUrl: 'https://www.instagram.com/gugalusto/',
      officialWebUrl: 'https://www.senado.gob.ar/senadores/senador/493'
    },
    title:
      'De firmar las retenciones móviles de la Resolución 125/2008 en el gobierno kirchnerista a ser embajador de Macri y criticar en X (@GugaLusto) la presión impositiva desde la UCR',
    topic: 'Impuestos y Presión Fiscal',
    congruencePattern: 'giro_intertemporal_180',
    contradictionsCount: 3,
    positionShiftsChain: [
      {
        stepNumber: 1,
        yearOrDate: '11/03/2008',
        stageLabel: 'Postura Inicial Documentada',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Como Ministro de Economía de Cristina Fernández de Kirchner firma la Resolución MEyP 125/2008 creando las retenciones móviles a la exportación de granos (con alícuotas marginales de hasta el 95%).',
        sourceUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/138567/norma.htm'
      },
      {
        stepNumber: 2,
        yearOrDate: '2013–2015',
        stageLabel: 'Contradicción / Giro #1',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Desde UNEN/ECO pasa a la oposición antikirchnerista y critica en @GugaLusto, diarios y TV la asfixia impositiva y las retenciones del gobierno que había integrado.',
        sourceUrl: 'https://x.com/GugaLusto'
      },
      {
        stepNumber: 3,
        yearOrDate: '2015–2017',
        stageLabel: 'Contradicción / Giro #2',
        medium: 'Voto / Ley / Decreto Oficial',
        summaryOfStanceOrAct:
          'Asume como Embajador en EE.UU. designado por Mauricio Macri (Decreto 200/2015), renuncia en 2017 para competir contra el PRO en CABA criticando su política económica y en 2019 vuelve a integrarse a la boleta de Juntos por el Cambio como candidato a Senador.',
        sourceUrl: 'https://www.senado.gob.ar/senadores/senador/493'
      },
      {
        stepNumber: 4,
        yearOrDate: '2024–2026',
        stageLabel: 'Contradicción / Giro #3',
        medium: 'X / Twitter',
        summaryOfStanceOrAct:
          'Como Presidente de la UCR cuestiona en @GugaLusto y en Senado TV la carga impositiva sobre la producción y la clase media, mientras los comentarios en X le recuerdan su firma en la Resolución 125/2008 y su voto en el Senado por la actualización de dietas a mano alzada (abril 2024).',
        sourceUrl: 'https://x.com/GugaLusto'
      }
    ],
    xTwitterAndPressArchives: [
      {
        id: 'x-lousteau-125-y-dietas-2008-2024',
        medium: 'X / Twitter',
        sourceOrHandle: '@GugaLusto en X (Twitter) y archivo Clarín / La Nación / Página/12 (2008–2024)',
        publishedDate: '2024-04-18',
        roleAtTime: 'Senador Nacional (UCR)',
        exactPostOrQuote:
          'Publicó en @GugaLusto críticas al ajuste sobre universidades y jubilados y reclamó alivio fiscal para las pymes.',
        socialCommentsAndCommunityContext:
          'Usuarios y notas de la comunidad en X adjuntaron el texto oficial de la Resolución MEyP 125/2008 firmada de su puño y letra el 11/03/2008 y el video de Senado TV del 18/04/2024 donde acompañó a mano alzada la resolución de actualización de dietas senatoriales.',
        archiveUrl: 'https://x.com/search?q=from%3AGugaLusto%20impuestos%20OR%20125'
      }
    ],
    tvYoutubeClips: [
      {
        id: 'clip-lousteau-senado-tv-2024',
        channel: 'Senado TV',
        programOrContext:
          'Sesiones del H. Senado de la Nación (abril–junio 2024) y entrevistas en TN / LN+ sobre la Resolución 125 y la Ley Bases',
        broadcastDate: '2024-04-18',
        roleAtTime: 'Senador Nacional (UCR)',
        exactQuoteOrPosition:
          'Cuestionó en el recinto la política fiscal del Ejecutivo y el mismo día acompañó sin objeción en el recinto la votación a mano alzada del proyecto 615/24 de incremento de dietas en el Senado.',
        youtubeArchiveUrl:
          'https://www.youtube.com/results?search_query=Senado+TV+18+abril+2024+votacion+dietas+Lousteau'
      }
    ],
    counterActions: [
      {
        date: '2008-03-11',
        instrument: 'Resolución MEyP 125/2008 (Retenciones Móviles)',
        roleAtAction: 'Ministro de Economía y Producción de la Nación',
        whatTheyActuallyDid:
          'Firmó e implementó el régimen de retenciones móviles a las exportaciones agropecuarias sin pasar por el Congreso (pese al Art. 75 inc. 1 de la Constitución Nacional), desencadenando el conflicto agropecuario de 2008.',
        officialDocumentUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/138567/norma.htm'
      }
    ],
    citizenPublicInquiries: [
      {
        id: 'inq-lousteau-res-125',
        officialHandle: '@GugaLusto',
        officialSocialUrl: 'https://x.com/GugaLusto',
        networkLabel: 'X (Twitter)',
        questionTitle: 'Consulta documentada por firma de la Resolución 125/2008 y presión tributaria',
        preDraftedVerifiedMessage:
          '@GugaLusto: En X cuestiona los impuestos a la producción y el uso de decretos, pero el 11/03/2008 firmó por resolución ministerial las retenciones móviles de la Res. 125/2008 sin pasar por el Congreso. ¿Reconoce que violaba el Art. 75 inc. 1 CN? Fuente: https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/138567/norma.htm',
        evidenceNormOrAct: 'Resolución MEyP 125/2008 (11/03/2008)',
        evidenceOfficialUrl:
          'https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/138567/norma.htm'
      }
    ],
    crossCriticismAnalysis:
      'Registra 3 giros mayores entre 2005 y 2026: de Ministro de Economía firmante de las retenciones móviles por resolución administrativa (Res. 125/2008) en el gobierno kirchnerista, a opositor en UNEN, funcionario/aliado de Mauricio Macri en Cambiemos y luego crítico de su propio interbloque desde la presidencia de la UCR.',
    institutionalContextAndDefense:
      'Lousteau sostuvo en libros y entrevistas posteriores que la Resolución 125 buscaba desacoplar precios internacionales récord en 2008 y que renunció al Ministerio de Economía en abril de 2008 por desacuerdos con la estrategia de confrontación oficial.'
  }
];
