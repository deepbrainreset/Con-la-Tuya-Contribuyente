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
    title: 'Título V — Impuesto a las Ganancias: insistencia de la Cámara de Diputados',
    chamber: 'Honorable Cámara de Diputados de la Nación',
    date: '2024-06-28',
    summary: 'Votación nominal oficial. El acta completa informa 136 votos afirmativos, 116 negativos, 3 abstenciones y 1 ausente. Esta base interna muestra sólo los nombres ya contrastados individualmente; el padrón completo debe consultarse en el acta oficial enlazada.',
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
  }
];
