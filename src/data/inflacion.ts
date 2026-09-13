export type InflationEvidence = 'oficial' | 'oficial_con_reserva' | 'alternativa' | 'referencia';

export interface InflationPoint {
  year: number;
  official: number | null;
  alternative: number | null;
  officialLabel: string;
  alternativeLabel?: string;
  evidence: InflationEvidence;
  note?: string;
  officialSource: string;
  alternativeSource?: string;
}

/**
 * Variaciones anuales (diciembre contra diciembre) cuando existe una serie anual
 * razonablemente comparable. La serie NO debe interpretarse como un único IPC
 * homogéneo 2003-presente: INDEC cambió bases, cobertura y metodología.
 *
 * 2007-2015: INDEC advierte expresamente que sus series publicadas deben
 * considerarse con reservas, salvo series revisadas posteriormente.
 * 2016: año de transición; no se publica como una observación nacional anual
 * homogénea en esta visualización.
 * 2026: año incompleto; se muestra por separado en la UI.
 */
export const INFLATION_SERIES: InflationPoint[] = [
  { year: 2003, official: 3.7, alternative: null, officialLabel: 'IPC GBA — INDEC', evidence: 'oficial', officialSource: 'https://biblioteca.indec.gob.ar/bases/minde/ipc_03_04.pdf' },
  { year: 2004, official: 6.1, alternative: null, officialLabel: 'IPC GBA — INDEC', evidence: 'oficial', officialSource: 'https://biblioteca.indec.gob.ar/bases/minde/ipc_04_05.pdf' },
  { year: 2005, official: 12.3, alternative: null, officialLabel: 'IPC GBA — INDEC', evidence: 'oficial', officialSource: 'https://biblioteca.indec.gob.ar/bases/minde/IPC_QUINT_04_06.pdf' },
  { year: 2006, official: 9.8, alternative: null, officialLabel: 'IPC GBA — INDEC', evidence: 'oficial', officialSource: 'https://biblioteca.indec.gob.ar/bases/minde/ipc_01_07.pdf' },

  { year: 2007, official: 8.5, alternative: 9.8, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC alternativo citado por Banco Mundial', evidence: 'oficial_con_reserva', note: 'INDEC advierte que las series publicadas entre enero de 2007 y diciembre de 2015 deben considerarse con reservas.', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://documents1.worldbank.org/curated/en/821761468000270036/pdf/Barreras0sobre0es0de0su0eliminaci0n.pdf' },
  { year: 2008, official: 7.2, alternative: 26.0, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso / medición alternativa', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://documents1.worldbank.org/curated/en/821761468000270036/pdf/Barreras0sobre0es0de0su0eliminaci0n.pdf' },
  { year: 2009, official: 7.7, alternative: 15.0, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso / medición alternativa', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://documents1.worldbank.org/curated/en/821761468000270036/pdf/Barreras0sobre0es0de0su0eliminaci0n.pdf' },
  { year: 2010, official: 10.9, alternative: 25.1, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso / medición alternativa', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://documents1.worldbank.org/curated/en/821761468000270036/pdf/Barreras0sobre0es0de0su0eliminaci0n.pdf' },
  { year: 2011, official: 9.5, alternative: 22.8, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },
  { year: 2012, official: 10.8, alternative: 25.6, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },
  { year: 2013, official: 10.9, alternative: 28.38, officialLabel: 'IPC GBA publicado — INDEC', alternativeLabel: 'IPC Congreso', evidence: 'oficial_con_reserva', officialSource: 'https://sitioanterior.indec.gob.ar/informesdeprensa_anteriores.asp?id_tema_1=3&id_tema_2=5&id_tema_3=31', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },
  { year: 2014, official: 23.9, alternative: 38.53, officialLabel: 'Serie publicada — INDEC (con reserva)', alternativeLabel: 'IPC Congreso', evidence: 'oficial_con_reserva', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },
  { year: 2015, official: 27.5, alternative: 27.5, officialLabel: 'Referencia histórica publicada (con reserva)', alternativeLabel: 'IPC Congreso', evidence: 'oficial_con_reserva', note: 'La coincidencia numérica no implica equivalencia metodológica. El período tiene discontinuidades y debe leerse junto con las notas de INDEC.', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },

  { year: 2016, official: null, alternative: 40.9, officialLabel: 'Año de transición — sin serie nacional anual homogénea', alternativeLabel: 'Referencia anual compilada', evidence: 'referencia', note: 'INDEC recomienda utilizar indicadores de CABA y San Luis para el tramo discontinuado noviembre 2015-abril 2016. No se dibuja un dato oficial anual nacional para evitar un empalme engañoso.', officialSource: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-PreguntasFrecuentes', alternativeSource: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content' },

  { year: 2017, official: 24.8, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2018, official: 47.6, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2019, official: 53.8, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2020, official: 36.1, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2021, official: 50.9, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2022, official: 94.8, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2023, official: 211.4, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31' },
  { year: 2024, official: 117.8, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_2517A7124C09.pdf' },
  { year: 2025, official: 31.5, alternative: null, officialLabel: 'IPC — INDEC', evidence: 'oficial', officialSource: 'https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_266741F036E8.pdf' }
];

export const CURRENT_INFLATION_2026 = {
  year: 2026,
  lastMonth: 'mayo',
  lastMonthlyRate: 2.1,
  status: 'Año en curso: no existe todavía una inflación anual 2026 cerrada.',
  source: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31',
  verifiedAt: '2026-06-11'
};

export const INFLATION_METHODOLOGY_LINKS = {
  indecHistoricalWarning: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-InformacionDeArchivo-7',
  indecFaq: 'https://www.indec.gob.ar/indec/web/Institucional-Indec-PreguntasFrecuentes',
  indecCurrent: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31',
  privateReference2011_2016: 'https://rephip.unr.edu.ar/server/api/core/bitstreams/514a51d7-29e7-4007-b16a-f0621995bd16/content'
};
