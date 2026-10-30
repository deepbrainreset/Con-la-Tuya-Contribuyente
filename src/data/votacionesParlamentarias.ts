/**
 * Registro parlamentario conservador: sólo publica nombres contrastados de forma
 * individual contra actas oficiales. Para el padrón completo se enlaza el acta.
 * No inferir votos por bloque/partido.
 */
export interface ParliamentaryVoter {
  id: string;
  name: string;
  role: string;
  block: string;
  district: string;
  vote: 'afirmativo' | 'negativo' | 'abstencion' | 'ausente';
}

export interface ParliamentaryVotingSession {
  traceId: string;
  title: string;
  chamber: string;
  date: string;
  summary: string;
  votos_favor: number;
  votos_contra: number;
  votos_neutral_ausente: number;
  url: string;
  voters: ParliamentaryVoter[];
}

export const VOTING_SESSIONS: ParliamentaryVotingSession[] = [
  {
    traceId: 'trace_ganancias_2024',
    title: 'Ley 27.743 (Título V) — Impuesto a las Ganancias: insistencia de la Cámara de Diputados',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2024-06-28',
    summary: 'Votación nominal oficial (O.D. 157, Acta Nº 3). El acta completa informa 136 votos afirmativos, 116 negativos, 3 abstenciones y 1 ausente. Esta base interna muestra sólo los nombres ya contrastados individualmente; el padrón completo debe consultarse en el acta oficial enlazada.',
    votos_favor: 136,
    votos_contra: 116,
    votos_neutral_ausente: 4,
    url: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274',
    voters: [
      {
        id: 'ganancias-2024-espert',
        name: 'José Luis Espert',
        role: 'Diputado Nacional',
        block: 'La Libertad Avanza',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'ganancias-2024-ritondo',
        name: 'Cristian Ritondo',
        role: 'Diputado Nacional',
        block: 'PRO',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'ganancias-2024-kirchner',
        name: 'Máximo Carlos Kirchner',
        role: 'Diputado Nacional',
        block: 'Unión por la Patria',
        district: 'Buenos Aires',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_ley_bases_2024',
    title: 'Ley 27.742 — Ley de Bases y Puntos de Partida para la Libertad de los Argentinos (Votación General)',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2024-04-30',
    summary: 'Votación nominal en general de la Ley de Bases (facultades delegadas, reforma del Estado, RIGI y privatizaciones habilitadas). Resultado oficial: 142 afirmativos, 106 negativos, 5 abstenciones y 4 ausentes.',
    votos_favor: 142,
    votos_contra: 106,
    votos_neutral_ausente: 9,
    url: 'https://votaciones.hcdn.gob.ar',
    voters: [
      {
        id: 'bases-2024-espert',
        name: 'José Luis Espert',
        role: 'Diputado Nacional',
        block: 'La Libertad Avanza',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'bases-2024-ritondo',
        name: 'Cristian Ritondo',
        role: 'Diputado Nacional',
        block: 'PRO',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'bases-2024-kirchner',
        name: 'Máximo Carlos Kirchner',
        role: 'Diputado Nacional',
        block: 'Unión por la Patria',
        district: 'Buenos Aires',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_ganancias_2023_eliminacion',
    title: 'Ley 27.725 — Modificación del Impuesto a las Ganancias (Régimen Cedular de Mayores Ingresos)',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2023-09-19',
    summary: 'Votación nominal del proyecto enviado por el Ministerio de Economía para elevar el mínimo no imponible a 15 SMVM. Resultado oficial en HCDN: 135 afirmativos, 103 negativos y 19 ausentes.',
    votos_favor: 135,
    votos_contra: 103,
    votos_neutral_ausente: 19,
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/390000-394999/391792/norma.htm',
    voters: [
      {
        id: 'ganancias-2023-milei',
        name: 'Javier Gerardo Milei',
        role: 'Diputado Nacional',
        block: 'La Libertad Avanza',
        district: 'CABA',
        vote: 'afirmativo'
      },
      {
        id: 'ganancias-2023-kirchner',
        name: 'Máximo Carlos Kirchner',
        role: 'Diputado Nacional',
        block: 'Frente de Todos',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'ganancias-2023-ritondo',
        name: 'Cristian Ritondo',
        role: 'Diputado Nacional',
        block: 'PRO',
        district: 'Buenos Aires',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_moratoria_2023',
    title: 'Ley 27.705 — Plan de Pago de Deuda Previsional (Moratoria Previsional 2023)',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2023-02-28',
    summary: 'Votación nominal para la creación de la Unidad de Pago de Deuda Previsional en el ámbito de ANSES. Resultado oficial: 134 afirmativos, 107 negativos y 16 ausentes.',
    votos_favor: 134,
    votos_contra: 107,
    votos_neutral_ausente: 16,
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/380000-384999/381054/norma.htm',
    voters: [
      {
        id: 'moratoria-2023-kirchner',
        name: 'Máximo Carlos Kirchner',
        role: 'Diputado Nacional',
        block: 'Frente de Todos',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'moratoria-2023-milei',
        name: 'Javier Gerardo Milei',
        role: 'Diputado Nacional',
        block: 'La Libertad Avanza',
        district: 'CABA',
        vote: 'negativo'
      },
      {
        id: 'moratoria-2023-espert',
        name: 'José Luis Espert',
        role: 'Diputado Nacional',
        block: 'Avanza Libertad',
        district: 'Buenos Aires',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_solidaridad_pais_2019',
    title: 'Ley 27.541 — Solidaridad Social y Reactivación Productiva (Creación del Impuesto PAIS)',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2019-12-20',
    summary: 'Votación nominal de la ley de emergencia pública que creó el Impuesto Para una Argentina Inclusiva y Solidaria (PAIS) y modificó alícuotas de Bienes Personales y Derechos de Exportación. Resultado: 134 afirmativos, 110 negativos y 13 ausentes.',
    votos_favor: 134,
    votos_contra: 110,
    votos_neutral_ausente: 13,
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/norma.htm',
    voters: [
      {
        id: 'pais-2019-kirchner',
        name: 'Máximo Carlos Kirchner',
        role: 'Diputado Nacional',
        block: 'Frente de Todos',
        district: 'Buenos Aires',
        vote: 'afirmativo'
      },
      {
        id: 'pais-2019-ritondo',
        name: 'Cristian Ritondo',
        role: 'Diputado Nacional',
        block: 'PRO',
        district: 'Buenos Aires',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_ypf_expropiacion_2012',
    title: 'Ley 26.741 — Soberanía Hidrocarburífera y Expropiación del 51% del Patrimonio de YPF S.A.',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2012-05-03',
    summary: 'Votación nominal de la ley que declaró de utilidad pública y sujeto a expropiación el 51% del patrimonio de YPF S.A. Resultado oficial en Diputados: 208 afirmativos, 32 negativos, 6 abstenciones y 11 ausentes.',
    votos_favor: 208,
    votos_contra: 32,
    votos_neutral_ausente: 17,
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/196894/norma.htm',
    voters: [
      {
        id: 'ypf-2012-bullrich',
        name: 'Patricia Bullrich',
        role: 'Diputada Nacional',
        block: 'Unión Por Todos',
        district: 'CABA',
        vote: 'negativo'
      }
    ]
  },
  {
    traceId: 'trace_sipa_afjp_2008',
    title: 'Ley 26.425 — Creación del Sistema Integrado Previsional Argentino (SIPA) y Eliminación de AFJP',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2008-11-06',
    summary: 'Votación nominal para la unificación del Sistema Integrado de Jubilaciones y Pensiones en un único régimen público de reparto (SIPA). Resultado oficial en Diputados: 162 afirmativos, 75 negativos y 20 abstenciones/ausentes.',
    votos_favor: 162,
    votos_contra: 75,
    votos_neutral_ausente: 20,
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/148141/norma.htm',
    voters: [
      {
        id: 'sipa-2008-rossi',
        name: 'Agustín Oscar Rossi',
        role: 'Diputado Nacional',
        block: 'Frente para la Victoria - PJ',
        district: 'Santa Fe',
        vote: 'afirmativo'
      },
      {
        id: 'sipa-2008-bullrich',
        name: 'Patricia Bullrich',
        role: 'Diputada Nacional',
        block: 'Coalición Cívica',
        district: 'CABA',
        vote: 'negativo'
      }
    ]
  }
];
