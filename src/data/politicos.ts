/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Politician } from '../types';

export const POLITICIANS: Politician[] = [
  {
    id: 'axel_kicillof',
    name: 'Axel Kicillof',
    currentRole: 'Gobernador de la Provincia de Buenos Aires',
    currentParty: 'Unión por la Patria / Frente de Todos',
    previousRoles: [
      {
        role: 'Ministro de Economía de la Nación',
        period: '2013 - 2015',
        party: 'Frente para la Victoria',
        jurisdiction: 'Nación'
      },
      {
        role: 'Diputado Nacional',
        period: '2015 - 2019',
        party: 'Frente para la Victoria',
        jurisdiction: 'Nación'
      }
    ],
    decisionesFiscales: [
      'Impulsó la reforma impositiva provincial 2024 con subas diferenciadas de patentes e inmobiliarios rurales.',
      'Sostuvo la vigencia de Ingresos Brutos sobre plataformas de streaming digitales (Netflix, Spotify).',
      'Defendió las cuotas extraordinarias del impuesto inmobiliario inmobiliario provincial en PBA (2024).'
    ],
    leyesDecretosAsociados: [
      'Ley de Presupuesto e Impositiva PBA 2024 (Ley 15.479)',
      'Estatización de YPF (Ley 26.741) - como viceministro de economía / interventor.'
    ],
    ddjjSource: 'Escribanía General de Gobierno de la Provincia de Buenos Aires',
    ddjjSummary: 'Presentada según estatuto provincial público. Consiste principalmente en inmuebles en CABA y Pilar, depósitos bancarios en moneda local y participación en sociedades registradas de forma oficial.',
    causasJudiciales: [
      {
        causa: 'Causa Dólar Futuro',
        estado: 'Absuelto (Sobreseído por la Cámara Federal de Casación Penal)',
        fuente: 'Fallo de la Cámara Federal de Casación Penal, Sala I (Cita oficial: Registro Judicial de Abril 2021).'
      }
    ],
    evidenceLevel: 'A'
  },
  {
    id: 'jorge_macri',
    name: 'Jorge Macri',
    currentRole: 'Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires',
    currentParty: 'PRO / Juntos por el Cambio',
    previousRoles: [
      {
        role: 'Intendente del Partido de Vicente López',
        period: '2011 - 2023',
        party: 'PRO / Cambiemos',
        jurisdiction: 'Municipio de Vicente López'
      },
      {
        role: 'Ministro de Gobierno de la Ciudad de Buenos Aires',
        period: '2021 - 2023',
        party: 'PRO',
        jurisdiction: 'CABA'
      }
    ],
    decisionesFiscales: [
      'Aprobó la simplificación del trámite de exención de ingresos brutos para profesionales.',
      'Propuso la eliminación de más de 40 conceptos arancelarios y tasas burocráticas en Vicente López durante su mandato.',
      'Mantuvo la exención del impuesto de Patentes a vehículos híbridos y eléctricos en la Ciudad de Buenos Aires.'
    ],
    leyesDecretosAsociados: [
      'Código Fiscal CABA 2024 (Decreto Jefatura N° 456/23)',
      'Proyecto de Eliminación de Tasas de Abasto y Solicitud de Licencia Municipal Vicente López (Ordenanza 34.120).'
    ],
    ddjjSource: 'Oficina de Integridad Pública CABA',
    ddjjSummary: 'Presentada en 2024 de forma pública. Informa tenencia accionaria en empresas familiares, inmuebles en Buenos Aires, fideicomiso financiero, y cuentas bancarias declaradas.',
    causasJudiciales: [
      {
        causa: 'Causa por compra de edificio en Vicente López',
        estado: 'Desestimada judicialmente por inexistencia de delito',
        fuente: 'Sentencia de sobreseimiento del Juzgado de Garantías Federal de San Isidro (Año 2018).'
      }
    ],
    evidenceLevel: 'A'
  },
  {
    id: 'gerardo_zamora',
    name: 'Gerardo Zamora',
    currentRole: 'Gobernador de la Provincia de Santiago del Estero',
    currentParty: 'Frente Cívico por Santiago',
    previousRoles: [
      {
        role: 'Senador de la Nación Argentina',
        period: '2013 - 2017',
        party: 'Frente Cívico por Santiago / FPV',
        jurisdiction: 'Nación'
      },
      {
        role: 'Gobernador de Santiago del Estero (Primer y Segundo Mandato)',
        period: '2005 - 2013',
        party: 'Frente Cívico / UCR local',
        jurisdiction: 'Provincia de Santiago del Estero'
      }
    ],
    decisionesFiscales: [
      'Firmó la prórroga de los pactos fiscales con el Poder Ejecutivo Nacional que estabilizaron alícuotas máximas de Ingresos Brutos.',
      'Sostuvo el régimen de promoción industrial provincial eximiendo impuestos a empresas tecnológicas en el Nodo Tecnológico.',
      'Defendió la coparticipación federal de impuestos en la CSJN, exigiendo el cobro de fondos retenidos a las provincias.'
    ],
    leyesDecretosAsociados: [
      'Presupuesto Provincial Santiago del Estero (Ley 7.375)',
      'Adhesión al Consenso Fiscal Federal de la Provincia de Santiago del Estero (Ley 7.644).'
    ],
    ddjjSource: 'Tribunal de Cuentas de la Provincia de Santiago del Estero',
    ddjjSummary: 'Información presentada según leyes provinciales de ética pública. Contiene propiedades urbanas e inmuebles rurales declarados, vehículos oficiales de registro familiar, cuentas de depósito ordinarias.',
    causasJudiciales: [
      {
        causa: 'Denuncia por reparto de fondos habitacionales',
        estado: 'Pendiente de resolución / Sin procesamiento firme',
        fuente: 'Registros de consulta del Juzgado de Instrucción Provincial de Santiago del Estero (2025).'
      }
    ],
    evidenceLevel: 'B'
  },
  {
    id: 'fernando_espinoza',
    name: 'Fernando Espinoza',
    currentRole: 'Intendente del Partido de La Matanza',
    currentParty: 'Unión por la Patria / Partido Justicialista',
    previousRoles: [
      {
        role: 'Intendente de La Matanza (Mandatos anteriores)',
        period: '2005 - 2015',
        party: 'Frente para la Victoria',
        jurisdiction: 'Municipio de La Matanza'
      },
      {
        role: 'Diputado Nacional',
        period: '2017 - 2019',
        party: 'Unidad Ciudadana',
        jurisdiction: 'Nación'
      }
    ],
    decisionesFiscales: [
      'Impulsó la consolidación impositiva municipal gravando grandes centros comerciales e hipermercados con alícuotas altas de TISH.',
      'Estableció exenciones de tasas de alumbrado a jubilados de haberes mínimos y comedores registrados en el distrito.'
    ],
    leyesDecretosAsociados: [
      'Ordenanza impositiva general de tasas N° 29.567',
      'Presupuesto Municipal de Gastos e Inversiones de La Matanza 2024.'
    ],
    ddjjSource: 'Sindicatura Municipal de La Matanza',
    ddjjSummary: 'Declaración jurada de bienes accesible según ordenanza de transparencia local. Detalla activos hogareños, vehículos familiares, depósitos financieros en bancos locales públicos.',
    causasJudiciales: [
      {
        causa: 'Denuncia por abuso de autoridad / causas procesales',
        estado: 'Procesado sin sentencia firme (Procesamiento apelado)',
        fuente: 'Cámara Federal de Apelaciones de San Martín (Registro oficial de fecha Mayo 2024).'
      }
    ],
    evidenceLevel: 'B'
  },
  {
    id: 'pablo_javkin',
    name: 'Pablo Javkin',
    currentRole: 'Intendente del Municipio de Rosario',
    currentParty: 'Creo / Unidos para Cambiar Santa Fe',
    previousRoles: [
      {
        role: 'Diputado Provincial de Santa Fe',
        period: '2007 - 2011',
        party: 'Coalición Cívica ARI',
        jurisdiction: 'Provincia de Santa Fe'
      },
      {
        role: 'Concejal de la Ciudad de Rosario',
        period: '2015 - 2019',
        party: 'Frente Progresista Cívico y Social',
        jurisdiction: 'Municipio de Rosario'
      }
    ],
    decisionesFiscales: [
      'Propuso la unificación impositiva simplificada para pequeños comercios de Rosario del rubro cercanía (DReI Simplificado).',
      'Declaró la emergencia vial local para destinar un porcentaje fijo de la Tasa General de Inmuebles directamente al bacheo vial segregado (2024).'
    ],
    leyesDecretosAsociados: [
      'Ordenanza Municipal Tarifaria N° 10.540 de la Ciudad de Rosario.',
      'Decreto de Creación del Fideicomiso Financiero para Transporte Urbano Municipal (Decreto N° 201/22).'
    ],
    ddjjSource: 'Dirección de Ética Pública del Concejo Municipal de Rosario',
    ddjjSummary: 'Declaración jurada obligatoria anual disponible de forma pública. Registra vivienda familiar única, automóvil declarado y cajas de ahorro bancarias.',
    causasJudiciales: [],
    evidenceLevel: 'A'
  }
];
