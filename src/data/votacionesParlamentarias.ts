/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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
    title: 'Ley 27.743 - Medidas Fiscales Paliativas (Restitución del Impuesto a las Ganancias 4° Categoría - 2024)',
    chamber: 'Cámara de Diputados de la Nación (Sanción Definitiva tras Insistencia)',
    date: '2024-06-27',
    summary: 'Restauración del impuesto sobre los ingresos de trabajadores en relación de dependencia con mínimas bases imponibles de $1,8M para solteros y $2,2M para casados, votada nominalmente en artículo específico.',
    votos_favor: 136,
    votos_contra: 116,
    votos_neutral_ausente: 4,
    url: 'https://votaciones.hcdn.gob.ar/votacion/4885',
    voters: [
      { id: 'v1', name: 'José Luis Espert', role: 'Diputado Nacional', block: 'La Libertad Avanza', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v2', name: 'María Eugenia Vidal', role: 'Diputada Nacional', block: 'Frente PRO', district: 'CABA', vote: 'afirmativo' },
      { id: 'v3', name: 'Cristian Ritondo', role: 'Diputado Nacional', block: 'Frente PRO', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v4', name: 'Rodrigo de Loredo', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'Córdoba', vote: 'afirmativo' },
      { id: 'v5', name: 'Silvia Lospennato', role: 'Diputada Nacional', block: 'Frente PRO', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v6', name: 'Gabriel Bornoroni', role: 'Diputado Nacional', block: 'La Libertad Avanza', district: 'Córdoba', vote: 'afirmativo' },
      { id: 'v7', name: 'Karina Banfi', role: 'Diputada Nacional', block: 'Unión Cívica Radical', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v8', name: 'Damián Arabia', role: 'Diputado Nacional', block: 'Frente PRO', district: 'CABA', vote: 'afirmativo' },
      { id: 'v9', name: 'Miguel Ángel Pichetto', role: 'Diputado Nacional', block: 'Encuentro Federal', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v10', name: 'Emilio Monzó', role: 'Diputado Nacional', block: 'Encuentro Federal', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v11', name: 'Nicolás Mayoraz', role: 'Diputado Nacional', block: 'La Libertad Avanza', district: 'Santa Fe', vote: 'afirmativo' },
      { id: 'v12', name: 'Juliana Santillán', role: 'Diputada Nacional', block: 'La Libertad Avanza', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v13', name: 'Bertie Benegas Lynch', role: 'Diputado Nacional', block: 'La Libertad Avanza', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v14', name: 'Marcela Pagano', role: 'Diputada Nacional', block: 'La Libertad Avanza', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v15', name: 'Martín Menem', role: 'Diputado Nacional', block: 'La Libertad Avanza', district: 'La Rioja', vote: 'afirmativo' },
      { id: 'v16', name: 'Alejandro Finocchiaro', role: 'Diputado Nacional', block: 'Frente PRO', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v17', name: 'Hernán Lombardi', role: 'Diputado Nacional', block: 'Frente PRO', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v18', name: 'Diego Santilli', role: 'Diputado Nacional', block: 'Frente PRO', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'v19', name: 'Ricardo López Murphy', role: 'Diputado Nacional', block: 'Encuentro Federal', district: 'CABA', vote: 'afirmativo' },
      { id: 'v20', name: 'Lisandro Nieri', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'Mendoza', vote: 'afirmativo' },
      { id: 'v21', name: 'Pamela Verasay', role: 'Diputada Nacional', block: 'Unión Cívica Radical', district: 'Mendoza', vote: 'afirmativo' },
      { id: 'v22', name: 'Julio Cobos', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'Mendoza', vote: 'afirmativo' },
      { id: 'v23', name: 'Soledad Carrizo', role: 'Diputada Nacional', block: 'Unión Cívica Radical', district: 'Córdoba', vote: 'afirmativo' },
      { id: 'v24', name: 'Santiago Kovadloff', role: 'Diputado Nacional', block: 'Frente PRO', district: 'CABA', vote: 'afirmativo' },
      { id: 'v25', name: 'Diana Mondino', role: 'Diputada Nacional', block: 'La Libertad Avanza', district: 'CABA', vote: 'afirmativo' },
      { id: 'v26', name: 'Luis Picat', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'Córdoba', vote: 'afirmativo' },
      { id: 'v27', name: 'Martín Tetaz', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'CABA', vote: 'afirmativo' },
      { id: 'v28', name: 'Sabrina Ajmechet', role: 'Diputada Nacional', block: 'Frente PRO', district: 'CABA', vote: 'afirmativo' },
      
      { id: 'v50', name: 'Máximo Kirchner', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v51', name: 'Santiago Cafiero', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v52', name: 'Victoria Tolosa Paz', role: 'Diputada Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v53', name: 'Carlos Heller', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'CABA', vote: 'negativo' },
      { id: 'v54', name: 'Leandro Santoro', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'CABA', vote: 'negativo' },
      { id: 'v55', name: 'Nicolás del Caño', role: 'Diputado Nacional', block: 'Frente de Izquierda Unidad', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v56', name: 'Myriam Bregman', role: 'Diputada Nacional', block: 'Frente de Izquierda Unidad', district: 'CABA', vote: 'negativo' },
      { id: 'v57', name: 'Christian Castillo', role: 'Diputado Nacional', block: 'Frente de Izquierda Unidad', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v58', name: 'Germán Martínez', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Santa Fe', vote: 'negativo' },
      { id: 'v59', name: 'Julia Strada', role: 'Diputada Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v60', name: 'Daniel Arroyo', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v61', name: 'Hugo Yasky', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v62', name: 'Natalia Zaracho', role: 'Diputada Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v63', name: 'Florencia Carignano', role: 'Diputada Nacional', block: 'Unión por la Patria', district: 'Santa Fe', vote: 'negativo' },
      { id: 'v64', name: 'Itai Hagman', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'CABA', vote: 'negativo' },
      { id: 'v65', name: 'Sergio Palazzo', role: 'Diputado Nacional', block: 'Unión por la Patria', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'v66', name: 'Margarita Stolbizer', role: 'Diputada Nacional', block: 'Encuentro Federal', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      
      { id: 'v90', name: 'Facundo Manes', role: 'Diputado Nacional', block: 'Unión Cívica Radical', district: 'Provincia de Buenos Aires', vote: 'abstencion' },
      { id: 'v91', name: 'Natalia de la Sota', role: 'Diputada Nacional', block: 'Encuentro Federal', district: 'Córdoba', vote: 'abstencion' },
      { id: 'v92', name: 'Carolina Píparo', role: 'Diputada Nacional', block: 'Buenos Aires Libre', district: 'Provincia de Buenos Aires', vote: 'ausente' },
      { id: 'v93', name: 'Álvaro González', role: 'Diputado Nacional', block: 'Frente PRO', district: 'CABA', vote: 'ausente' }
    ]
  },
  {
    traceId: 'trace_pais',
    title: 'Ley 27.541 - Ley de Solidaridad Social y Reactivación Productiva (Establecimiento del Impuesto PAIS Solidario - 2019)',
    chamber: 'Honorable Cámara de Diputados de la Nación (Sanción Ley)',
    date: '2019-12-19',
    summary: 'Aprobación del impuesto del 30% ("Para una Argentina Inclusiva y Solidaria") sobre consumos en divisas, turismo exterior y compra de dólares para ahorro, sancionada de urgencia al inicio de la gestión nacional saliente.',
    votos_favor: 134,
    votos_contra: 110,
    votos_neutral_ausente: 12,
    url: 'https://votaciones.hcdn.gob.ar/votacion/4090',
    voters: [
      { id: 'p1', name: 'Carlos Heller', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'CABA', vote: 'afirmativo' },
      { id: 'p2', name: 'Máximo Kirchner', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p3', name: 'Leandro Santoro', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'CABA', vote: 'afirmativo' },
      { id: 'p4', name: 'Hugo Yasky', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p5', name: 'Daniel Arroyo', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p6', name: 'Victoria Tolosa Paz', role: 'Diputada Nacional', block: 'Frente de Todos', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p7', name: 'Gabriela Estévez', role: 'Diputada Nacional', block: 'Frente de Todos', district: 'Córdoba', vote: 'afirmativo' },
      { id: 'p8', name: 'Eduardo Valdés', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'CABA', vote: 'afirmativo' },
      { id: 'p9', name: 'Wado de Pedro', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p10', name: 'Cecilia Moreau', role: 'Diputada Nacional', block: 'Frente de Todos (Frente Renovador)', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p11', name: 'José Luis Gioja', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'San Juan', vote: 'afirmativo' },
      { id: 'p12', name: 'Leonardo Grosso', role: 'Diputado Nacional', block: 'Frente de Todos (Mov. Evita)', district: 'Provincia de Buenos Aires', vote: 'afirmativo' },
      { id: 'p13', name: 'Blanca Osuna', role: 'Diputada Nacional', block: 'Frente de Todos', district: 'Entre Ríos', vote: 'afirmativo' },
      { id: 'p14', name: 'Itai Hagman', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'CABA', vote: 'afirmativo' },
      { id: 'p15', name: 'Aldo Leiva', role: 'Diputado Nacional', block: 'Frente de Todos', district: 'Chaco', vote: 'afirmativo' },
      
      { id: 'p30', name: 'Cristian Ritondo', role: 'Diputado Nacional', block: 'Frente PRO (Juntos por el Cambio)', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'p31', name: 'María Eugenia Vidal', role: 'Diputada Nacional', block: 'Frente PRO (Juntos por el Cambio)', district: 'CABA', vote: 'negativo' },
      { id: 'p32', name: 'Mario Negri', role: 'Diputado Nacional', block: 'Unión Cívica Radical (JxC)', district: 'Córdoba', vote: 'negativo' },
      { id: 'p33', name: 'Silvia Lospennato', role: 'Diputada Nacional', block: 'Frente PRO (Juntos por el Cambio)', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'p34', name: 'Karina Banfi', role: 'Diputada Nacional', block: 'Unión Cívica Radical (JxC)', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'p35', name: 'Alfredo Cornejo', role: 'Diputado Nacional', block: 'Unión Cívica Radical (JxC)', district: 'Mendoza', vote: 'negativo' },
      { id: 'p36', name: 'Martín Lousteau', role: 'Senador Nacional (referencia)', block: 'Unión Cívica Radical', district: 'CABA', vote: 'negativo' },
      { id: 'p37', name: 'Nicolás del Caño', role: 'Diputado Nacional', block: 'Frente de Izquierda', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'p38', name: 'Myriam Bregman', role: 'Diputada Nacional', block: 'Frente de Izquierda', district: 'CABA', vote: 'negativo' },
      { id: 'p39', name: 'Waldo Wolff', role: 'Diputado Nacional', block: 'Frente PRO (Juntos por el Cambio)', district: 'Provincia de Buenos Aires', vote: 'negativo' },
      { id: 'p40', name: 'Fernando Iglesias', role: 'Diputado Nacional', block: 'Frente PRO (Juntos por el Cambio)', district: 'CABA', vote: 'negativo' },
      
      { id: 'p60', name: 'Graciela Camaño', role: 'Diputada Nacional', block: 'Consenso Federal', district: 'Provincia de Buenos Aires', vote: 'abstencion' },
      { id: 'p61', name: 'Margarita Stolbizer', role: 'Diputada Nacional', block: 'GEN', district: 'Provincia de Buenos Aires', vote: 'ausente' }
    ]
  },
  {
    traceId: 'trace_vial_vte_lopez_2024',
    title: 'Ordenanza Fiscal y Tarifaria 2024 - Creación de la Tasa Vial local al Despacho de Combustible Líquido',
    chamber: 'Honorable Concejo Deliberante del Municipio de Vicente López',
    date: '2023-11-20',
    summary: 'Aprobación de la tasa municipal indirecta del 2% por litro de combustible en estaciones de servicio ubicadas dentro del distrito para costear obras de bacheo vial y semaforización local.',
    votos_favor: 14,
    votos_contra: 9,
    votos_neutral_ausente: 1,
    url: 'https://www.vicentelopez.gov.ar/boletines-oficiales',
    voters: [
      { id: 'm1', name: 'Mariana Colela', role: 'Concejala Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm2', name: 'Veronica Barbieri', role: 'Concejala Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm3', name: 'Luis Gonzalez', role: 'Concejal Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm4', name: 'Ignacio Cabello', role: 'Concejal Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm5', name: 'Laura Carrizo', role: 'Concejala Municipal', block: 'Unión Cívica Radical local', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm6', name: 'Oscar Ruiz', role: 'Concejal Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm7', name: 'Andrés Petrillo', role: 'Concejal Municipal', block: 'Frente PRO Alianza', district: 'Vicente López', vote: 'afirmativo' },
      { id: 'm8', name: 'Daniel Szurek', role: 'Concejal Municipal', block: 'PRO Vicente López', district: 'Vicente López', vote: 'afirmativo' },
      
      { id: 'm15', name: 'Lucas Boyanovsky', role: 'Concejal Municipal', block: 'Unión por la Patria local', district: 'Vicente López', vote: 'negativo' },
      { id: 'm16', name: 'Laura Braiza', role: 'Concejala Municipal', block: 'Unión por la Patria local', district: 'Vicente López', vote: 'negativo' },
      { id: 'm17', name: 'Roberto Algañaraz', role: 'Concejal Municipal', block: 'La Libertad Avanza local', district: 'Vicente López', vote: 'negativo' },
      { id: 'm18', name: 'Marta Rodriguez', role: 'Concejala Municipal', block: 'Frente de Izquierda local', district: 'Vicente López', vote: 'negativo' },
      
      { id: 'm23', name: 'Federico Ponce', role: 'Concejal Municipal', block: 'Interbloque Federal local', district: 'Vicente López', vote: 'ausente' }
    ]
  }
];
