import { PoliticalTransparencyRecord } from './transparenciaPolitica';

const verifiedAt = '2026-09-13';

const mk = (id: string, name: string, role: string, jurisdiction: string, level: 'Nacion' | 'Provincia' | 'CABA', party: string, url: string): PoliticalTransparencyRecord => ({
  id,
  name,
  role,
  jurisdiction,
  level,
  party,
  roleSource: { label: 'Argentina.gob.ar — autoridad jurisdiccional vigente', url, kind: 'official_role', verifiedAt },
  salary: [{ period: '2026', grossMonthlyArs: null, netMonthlyArs: null, note: 'Sin remuneración individual oficial 2026 verificada cargada. No se publica una cifra estimada ni periodística.' }],
  assets: [],
  judicial: [],
  judicialCoverageNote: 'Sin expediente judicial oficial individual verificado cargado. Esto no equivale a afirmar que no existan causas.',
  fiscalActions: [],
  profileStatus: 'partial'
});

export const EXECUTIVE_AUTHORITIES_2026: PoliticalTransparencyRecord[] = [
  mk('javier_milei_exec', 'Javier Gerardo Milei', 'Presidente de la Nación', 'República Argentina', 'Nacion', 'La Libertad Avanza', 'https://www.argentina.gob.ar/presidencia'),
  mk('axel_kicillof_exec', 'Axel Kicillof', 'Gobernador', 'Provincia de Buenos Aires', 'Provincia', 'Unión por la Patria', 'https://www.argentina.gob.ar/buenosaires'),
  mk('jorge_macri_exec', 'Jorge Macri', 'Jefe de Gobierno', 'Ciudad Autónoma de Buenos Aires', 'CABA', 'PRO', 'https://buenosaires.gob.ar/gcaba_historico/jefatura-de-gobierno-0'),
  mk('raul_jalil', 'Raúl Alejandro Jalil', 'Gobernador', 'Catamarca', 'Provincia', 'Unión por la Patria / PJ', 'https://www.argentina.gob.ar/catamarca'),
  mk('leandro_zdero', 'Leandro César Zdero', 'Gobernador', 'Chaco', 'Provincia', 'UCR / Chaco Cambia', 'https://www.argentina.gob.ar/chaco'),
  mk('ignacio_torres', 'Ignacio Agustín Torres', 'Gobernador', 'Chubut', 'Provincia', 'PRO / Despierta Chubut', 'https://www.argentina.gob.ar/chubut'),
  mk('martin_llaryora', 'Martín Miguel Llaryora', 'Gobernador', 'Córdoba', 'Provincia', 'Hacemos Unidos por Córdoba', 'https://www.argentina.gob.ar/cordoba'),
  mk('juan_pablo_valdes', 'Juan Pablo Valdés', 'Gobernador', 'Corrientes', 'Provincia', 'Vamos Corrientes / UCR', 'https://www.argentina.gob.ar/corrientes'),
  mk('rogelio_frigerio', 'Rogelio Frigerio', 'Gobernador', 'Entre Ríos', 'Provincia', 'PRO / Juntos por Entre Ríos', 'https://www.argentina.gob.ar/entre-rios'),
  mk('gildo_insfran', 'Gildo Insfrán', 'Gobernador', 'Formosa', 'Provincia', 'Partido Justicialista', 'https://www.argentina.gob.ar/formosa'),
  mk('carlos_sadir', 'Carlos Sadir', 'Gobernador', 'Jujuy', 'Provincia', 'UCR / Frente Cambia Jujuy', 'https://www.argentina.gob.ar/jujuy'),
  mk('sergio_ziliotto', 'Sergio Ziliotto', 'Gobernador', 'La Pampa', 'Provincia', 'Partido Justicialista / FREJUPA', 'https://www.argentina.gob.ar/lapampa'),
  mk('ricardo_quintela', 'Ricardo Clemente Quintela', 'Gobernador', 'La Rioja', 'Provincia', 'Partido Justicialista / Unión por la Patria', 'https://www.argentina.gob.ar/la-rioja'),
  mk('alfredo_cornejo', 'Alfredo Víctor Cornejo', 'Gobernador', 'Mendoza', 'Provincia', 'UCR / Cambia Mendoza', 'https://www.argentina.gob.ar/mendoza'),
  mk('hugo_passalacqua', 'Hugo Mario Passalacqua', 'Gobernador', 'Misiones', 'Provincia', 'Frente Renovador de la Concordia', 'https://www.argentina.gob.ar/node/194595'),
  mk('rolando_figueroa', 'Rolando Ceferino Figueroa', 'Gobernador', 'Neuquén', 'Provincia', 'Comunidad', 'https://www.argentina.gob.ar/node/204309'),
  mk('alberto_weretilneck', 'Alberto Edgardo Weretilneck', 'Gobernador', 'Río Negro', 'Provincia', 'Juntos Somos Río Negro', 'https://www.argentina.gob.ar/rionegro'),
  mk('gustavo_saenz', 'Gustavo Adolfo Ruberto Sáenz', 'Gobernador', 'Salta', 'Provincia', 'Alianza Gustavo Gobernador', 'https://www.argentina.gob.ar/salta'),
  mk('marcelo_orrego', 'Humberto Marcelo Orrego', 'Gobernador', 'San Juan', 'Provincia', 'Producción y Trabajo', 'https://www.argentina.gob.ar/sanjuan'),
  mk('claudio_poggi', 'Claudio Javier Poggi', 'Gobernador', 'San Luis', 'Provincia', 'Avanzar / Cambia San Luis', 'https://www.argentina.gob.ar/sanluis'),
  mk('claudio_vidal', 'Claudio Vidal', 'Gobernador', 'Santa Cruz', 'Provincia', 'SER Santa Cruz / Por Santa Cruz', 'https://www.argentina.gob.ar/santacruz'),
  mk('maximiliano_pullaro', 'Maximiliano Nicolás Pullaro', 'Gobernador', 'Santa Fe', 'Provincia', 'UCR / Unidos para Cambiar Santa Fe', 'https://www.argentina.gob.ar/santafe'),
  mk('elias_suarez', 'Elías Suárez', 'Gobernador', 'Santiago del Estero', 'Provincia', 'Frente Cívico por Santiago', 'https://www.argentina.gob.ar/santiago'),
  mk('gustavo_melella', 'Gustavo Adrián Melella', 'Gobernador', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', 'Provincia', 'Concertación FORJA', 'https://www.argentina.gob.ar/node/193843'),
  mk('osvaldo_jaldo', 'Osvaldo Francisco Jaldo', 'Gobernador', 'Tucumán', 'Provincia', 'Partido Justicialista', 'https://www.argentina.gob.ar/tucuman')
];
