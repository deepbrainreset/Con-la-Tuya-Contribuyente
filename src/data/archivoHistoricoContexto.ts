import { HistoricalEvent, HistoricalEventRelation } from '../types/evidencia';

export interface HemerotecaArchiveSource {
  id: string;
  institutionName: string;
  coveragePeriod: string;
  collectionsIncluded: string[];
  accessType: 'Acceso Público / Consulta Presencial y Catálogo Digital' | 'Acceso Digital Abierto' | 'Archivo Institucional';
  officialUrl: string;
  waybackUrl: string;
  legalNote: string;
}

export const HEMEROTECA_ARCHIVAL_SOURCES: HemerotecaArchiveSource[] = [
  {
    id: 'HEM-BNMM',
    institutionName: 'Biblioteca Nacional Mariano Moreno (BNMM) — Hemeroteca Nacional',
    coveragePeriod: '1810–Actualidad (Colección completa 1946–2026)',
    collectionsIncluded: ['Clarín', 'La Nación', 'Crónica', 'Página/12', 'Ámbito Financiero', 'Perfil', 'La Prensa', 'La Razón'],
    accessType: 'Acceso Público / Consulta Presencial y Catálogo Digital',
    officialUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
    waybackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
    legalNote: 'Repositorio legal de depósito obligatorio (Ley 11.723). Metadatos y citas breves reproducidos bajo el Art. 10 de la Ley 11.723.'
  },
  {
    id: 'HEM-BORA',
    institutionName: 'Boletín Oficial de la República Argentina (BORA) — Archivo Histórico',
    coveragePeriod: '1893–Actualidad',
    collectionsIncluded: ['Primera Sección (Legislación y Avisos Oficiales)', 'Suplementos Normativos Extraordinarios'],
    accessType: 'Acceso Digital Abierto',
    officialUrl: 'https://www.boletinoficial.gob.ar/busquedaAvanzada/primera',
    waybackUrl: 'https://web.archive.org/web/*/https://www.boletinoficial.gob.ar/',
    legalNote: 'Publicación oficial de dominio público normativo de la República Argentina.'
  },
  {
    id: 'HEM-AGN',
    institutionName: 'Archivo General de la Nación (AGN) — Acervo Gráfico y Audiovisual',
    coveragePeriod: '1900–Actualidad',
    collectionsIncluded: ['Noticieros Históricos Sucesos Argentinos', 'Archivo Fotográfico Presidencial', 'Documentos de Estado'],
    accessType: 'Archivo Institucional',
    officialUrl: 'https://www.argentina.gob.ar/interior/archivo-general-de-la-nacion',
    waybackUrl: 'https://web.archive.org/web/*/https://www.argentina.gob.ar/interior/archivo-general-de-la-nacion',
    legalNote: 'Fondos documentales públicos bajo custodia del Ministerio del Interior.'
  },
  {
    id: 'HEM-BCN',
    institutionName: 'Biblioteca del Congreso de la Nación (BCN) — Hemeroteca y Diarios de Sesiones',
    coveragePeriod: '1854–Actualidad',
    collectionsIncluded: ['Diarios de Sesiones HCDN y HSN', 'Hemeroteca Parlamentaria Federal', 'Recortes de Debates Legislativos'],
    accessType: 'Acceso Digital Abierto',
    officialUrl: 'https://bcn.gob.ar/',
    waybackUrl: 'https://web.archive.org/web/*/https://bcn.gob.ar/',
    legalNote: 'Registros parlamentarios taquigráficos oficiales de acceso ciudadano irrestricto.'
  }
];

export const HISTORICAL_EVENTS_1946_2026: HistoricalEvent[] = [
  {
    id: 'evt-1946-bcra-iapi',
    slug: '1946-nacionalizacion-bcra-creacion-iapi',
    date: '1946-03-25',
    year: 1946,
    periodLabel: '1946–1955 (Primer Peronismo)',
    president: 'Edelmiro J. Farrell / Juan Domingo Perón',
    governingCoalition: 'Partido Laborista / Partido Peronista',
    ministerOfEconomy: 'Miguel Miranda (BCRA / IAPI) / Ramón Cereijo (Hacienda)',
    jurisdiction: 'Nación',
    thematicAxis: 'Régimen Monetario y Cambiario',
    title: 'Nacionalización del BCRA, Garantía de Depósitos y Creación del IAPI (1946)',
    institutionalSummary:
      'Reforma estructural del régimen monetario y comercial argentino: el Estado nacionaliza el Banco Central (Decreto-Ley 8.503/46), toma control del crédito bancario mediante redescuentos y crea el Instituto Argentino de Promoción del Intercambio (IAPI, Decreto-Ley 15.350/46) para monopolizar la compra de granos e impulsar transferencias intersectoriales hacia la industria y el gasto público.',
    normativeInstruments: [
      {
        normLabel: 'Decreto-Ley 8.503/1946 y Decreto-Ley 15.350/1946 (Ratificados por Ley 12.962)',
        organismo: 'Poder Ejecutivo Nacional / BCRA',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '17,7% en 1946 → pico del 38,8% en 1952 (previo al Plan de Estabilización de Gómez Morales)',
      fiscalBalancePctGdp: 'Déficit consolidado creciente entre -4,2% y -8,5% del PBI financiado con redescuentos del BCRA y cajas previsionales',
      publicSpendingPctGdp: 'Expansión del gasto público consolidado del ~16% al ~29% del PBI (1946–1950)',
      taxPressureNote: 'Creación del diferencial cambiario implícito vía IAPI sobre exportaciones agropecuarias y colocación de títulos en Cajas de Jubilaciones.',
      purchasingPowerAndTariffsImpact: 'Fuerte aumento inicial del salario real (1946–1949) seguido por congelamiento tarifario de empresas nacionalizadas y ajuste ortodoxo en 1952.',
      sourceEvidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
    },
    keyOfficialsInvolved: [
      {
        name: 'Juan Domingo Perón',
        role: 'Presidente electo / Impulsor del Primer Plan Quinquenal',
        actionTaken: 'Institucionalizó el régimen de redescuentos del BCRA y el monopolio comercial del IAPI.'
      },
      {
        name: 'Miguel Miranda',
        role: 'Presidente del BCRA y del IAPI',
        actionTaken: 'Diseñó la nacionalización de depósitos y la fijación de precios internos de compra de cosechas.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-1946-LN',
        newspaperName: 'La Nación',
        editionDate: '1946-03-26',
        mainHeadline: 'Fue nacionalizado por decreto del Poder Ejecutivo el Banco Central de la República',
        subHeadline: 'El Gobierno dio a conocer el decreto-ley que modifica sustancialmente el régimen bancario y monetario creado en 1935.',
        permittedBriefQuote: '«El directorio estará integrado exclusivamente por representantes oficiales y de los bancos nacionales...»',
        editorialFramingNote: 'Cobertura institucional enfocada en la pérdida de autonomía técnica del BCRA respecto de la Ley 12.155 de 1935.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Microfilmada La Nación — Marzo 1946',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-1946-CL',
        newspaperName: 'Clarín',
        editionDate: '1946-03-26',
        mainHeadline: 'El Estado asume el control total del Banco Central y orientará el crédito hacia la producción',
        subHeadline: 'Trascendental medida económica adoptada en acuerdo general de ministros.',
        permittedBriefQuote: '«La reforma financiera pone los resortes del crédito al servicio de la industrialización nacional.»',
        editorialFramingNote: 'Destaca el impacto sobre el crédito industrial y la reactivación de posguerra.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín Año I — Marzo 1946',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-1946-01',
        pollsterOrInstitution: 'Registros Electorales e Informes Socioeconómicos Históricos (INDEC / Dirección Nacional de Investigaciones)',
        fieldworkDate: '1946-02-24',
        sampleSizeAndScope: 'Padrón Nacional Electoral y Censos Industriales 1946–1947',
        methodologyNote: 'En 1946 no existían encuestas muestrales modernas de opinión; el indicador cuantitativo primario es el resultado electoral (52,84%) y la tasa de sindicalización urbana.',
        keyFindingSummary: 'Alta adhesión obrera urbana al programa de redistribución salarial y aguinaldo (Decreto 33.302/45), con fuerte resistencia de entidades agropecuarias (SRA y CRA) al monopolio del IAPI.',
        primarySocialConcern: 'Salario real, vivienda urbana y abastecimiento de posguerra.',
        inflationOrEconomyApprovalNote: 'Ciclo expansivo 1946–1948 seguido por restricción externa y plan de austeridad en 1952.',
        sourceUrl: 'https://www.indec.gob.ar/',
        evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-1946-01',
        date: '1946-06-04',
        eventCategory: 'Movilización Ciudadana',
        organizersOrSectors: ['Confederación General del Trabajo (CGT)', 'Sindicatos Industriales y Ferroviarios'],
        geographicScope: 'Plaza de Mayo (CABA) y centros industriales del Gran Buenos Aires y Rosario',
        documentedDescription: 'Movilizaciones sindicales en respaldo a la nacionalización del BCRA, de los ferrocarriles y a la implementación del Primer Plan Quinquenal.',
        institutionalResponse: 'Ratificación parlamentaria de todos los decretos-leyes económicos mediante la Ley Ómnibus 12.962 en 1947.',
        evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-1946-01',
        actorName: 'Conducción Económica del Primer Peronismo (Miguel Miranda → Alfredo Gómez Morales)',
        actorRoleAndCoalition: 'Equipo Económico PEN (1946–1952)',
        beforeStatement: {
          date: '1946-05-28',
          channelOrForum: 'Presentación del IAPI y política de expansión crediticia',
          verbatimQuote: '«Con el control del Banco Central y del comercio exterior financiamos la industrialización sin depender de capitales externos ni restringir el consumo popular.»',
          evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
        },
        afterStatement: {
          date: '1952-02-18',
          channelOrForum: 'Anuncio del Plan Económico de Emergencia y Austeridad de 1952',
          verbatimQuote: '«Debemos producir más y consumir menos; la inflación erosiona los salarios si el gasto y el crédito crecen por encima de la producción física y las divisas.»',
          evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
        },
        institutionalAction: {
          date: '1952-03-01',
          instrumentOrVote: 'Plan de Estabilización de 1952 (Ministro Alfredo Gómez Morales)',
          documentedOutcome: 'Congelamiento de convenios colectivos por 2 años, restricción del redescuento del BCRA y precios estímulo al agro para revertir el déficit del IAPI, bajando la inflación del 38,8% (1952) al 4,0% (1953).',
          evidenceRecordId: 'EVD-1946-DEC-8503-BCRA'
        },
        contextAndPublicExplanation:
          'El agotamiento de las reservas acumuladas en la Segunda Guerra Mundial y las sequías de 1950–1951 obligaron al propio gobierno a reemplazar la doctrina de emisión expansiva de Miranda por el programa ortodoxo de estabilización de Gómez Morales en 1952.'
      }
    ],
    evidenceRecordIds: ['EVD-1946-DEC-8503-BCRA', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-1975-rodrigazo',
    slug: '1975-el-rodrigazo-shock-inflacionario-y-paro-cgt',
    date: '1975-06-04',
    year: 1975,
    periodLabel: '1973–1976 (Tercer Peronismo)',
    president: 'María Estela Martínez de Perón',
    governingCoalition: 'Frente Justicialista de Liberación (FREJULI)',
    ministerOfEconomy: 'Celestino Rodrigo',
    jurisdiction: 'Nación',
    thematicAxis: 'Deuda Pública y Crisis Fiscales',
    title: '«El Rodrigazo»: Devaluación, Tarifazo y Quiebre del Pacto Social (Junio 1975)',
    institutionalSummary:
      'Tras dos años de controles de precios («Inflación Cero» de José Ber Gelbard), atraso tarifario y déficit fiscal superior al 12% del PBI financiado con emisión monetaria, el ministro Celestino Rodrigo dispuso el 4 de junio de 1975 una devaluación del 160% en el dólar comercial, subas del 175% en naftas y 75% en electricidad, intentando limitar las paritarias al 45%, lo que desató la primera huelga general de la CGT contra un gobierno peronista y un régimen de alta inflación crónica.',
    normativeInstruments: [
      {
        normLabel: 'Resoluciones Ministerio de Economía del 04/06/1975 y Leyes Tributarias 20.628 / 20.631',
        organismo: 'Ministerio de Economía / BCRA / INDEC',
        probativeNature: 'registro_presupuestario',
        evidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: 'Salto del 24,2% anual (1974) al 182,8% en 1975 y 444,0% en 1976 (Serie IPC INDEC)',
      fiscalBalancePctGdp: 'Déficit fiscal consolidado del -15,1% del PBI en 1975',
      publicSpendingPctGdp: '32,4% del PBI con fuerte licuación de ingresos tributarios reales (Efecto Olivera-Tanzi)',
      taxPressureNote: 'El año anterior (enero 1974) había entrado en vigencia el IVA (Ley 20.631) al 13%, pero la aceleración inflacionaria pulverizó la recaudación real.',
      purchasingPowerAndTariffsImpact: 'Aumento de 175% en combustibles y homologación de paritarias de hasta 130%–160% que retroalimentaron la espiral precios-salarios.',
      sourceEvidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
    },
    keyOfficialsInvolved: [
      {
        name: 'Celestino Rodrigo',
        role: 'Ministro de Economía (Junio–Julio 1975)',
        actionTaken: 'Ejecutó el shock devaluatorio y tarifario del 4 de junio de 1975; renunció el 21 de julio tras la huelga general.'
      },
      {
        name: 'Casildo Herreras / Lorenzo Miguel',
        role: 'Conducción de la CGT y las 62 Organizaciones (UOM)',
        actionTaken: 'Convocaron al paro general de 48 horas (7 y 8 de julio de 1975) que forzó la homologación de las paritarias libres.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-1975-CL',
        newspaperName: 'Clarín',
        editionDate: '1975-06-05',
        mainHeadline: 'Drástico reajuste cambiario y tarifario anunció el ministro Rodrigo',
        subHeadline: 'La nafta aumenta hasta un 175 por ciento y el dólar comercial pasa de 10 a 26 pesos.',
        permittedBriefQuote: '«El titular del Palacio de Hacienda afirmó que es indispensable sincerar las variables distorsionadas para eliminar el desabastecimiento.»',
        editorialFramingNote: 'Refleja la magnitud sin precedentes del ajuste sobre los precios regulados.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Junio 1975',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-1975-CR',
        newspaperName: 'Crónica',
        editionDate: '1975-07-08',
        mainHeadline: 'Paro total de la CGT por 48 horas en todo el país por la homologación de los convenios',
        subHeadline: 'Paralización absoluta de industrias, transporte y comercio tras la anulación oficial de los acuerdos salariales.',
        permittedBriefQuote: '«El movimiento obrero exige la vigencia plena de la Ley 14.250 sin topes oficiales.»',
        editorialFramingNote: 'Cobertura de alto impacto popular centrada en el conflicto entre la CGT y el entorno ministerial.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Crónica — Julio 1975',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-1975-01',
        pollsterOrInstitution: 'Relevamientos de Canasta Familiar y Conflictividad Laboral (INDEC / Ministerio de Trabajo)',
        fieldworkDate: '1975-07-15',
        sampleSizeAndScope: 'Área Metropolitana de Buenos Aires y grandes aglomerados urbanos',
        methodologyNote: 'Medición de variación mensual del costo de vida (IPC +21,2% en junio y +34,7% en julio de 1975) y horas-hombre perdidas por huelgas.',
        keyFindingSummary: 'Desplome abrupto de la confianza en la moneda nacional, inicio de la indexación contractual generalizada y dolarización del ahorro urbano.',
        primarySocialConcern: 'Inflación mensual de dos dígitos, desabastecimiento y pérdida del poder adquisitivo salarial.',
        inflationOrEconomyApprovalNote: 'Rechazo sindical y ciudadano masivo que provocó la caída de Celestino Rodrigo y José López Rega en julio de 1975.',
        sourceUrl: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31',
        evidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-1975-01',
        date: '1975-07-07',
        eventCategory: 'Paro General',
        organizersOrSectors: ['Confederación General del Trabajo (CGT)', '62 Organizaciones Gremiales'],
        geographicScope: 'Alcance Nacional',
        documentedDescription: 'Primer paro general de 48 horas de la CGT contra una administración peronista, precedido por movilizaciones masivas a Plaza de Mayo el 27 de junio.',
        institutionalResponse: 'El Poder Ejecutivo cedió, homologó los convenios colectivos con aumentos superiores al 100% y aceptó las renuncias de López Rega y Celestino Rodrigo.',
        evidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-1975-01',
        actorName: 'Ministerio de Economía (Pacto Social 1973–1974 vs. Shock Junio 1975)',
        actorRoleAndCoalition: 'Conducción Económica FREJULI',
        beforeStatement: {
          date: '1973-06-08',
          channelOrForum: 'Firma del Acta de Compromiso Nacional (Pacto Social)',
          verbatimQuote: '«La estabilidad de precios y tarifas está garantizada por el acuerdo entre Estado, empresarios y trabajadores sin necesidad de devaluaciones recesivas.»',
          evidenceRecordId: 'EVD-1973-LEY-20628-GANANCIAS-IVA'
        },
        afterStatement: {
          date: '1975-06-04',
          channelOrForum: 'Cadena Nacional del Ministro Celestino Rodrigo',
          verbatimQuote: '«Mantener precios y tarifas artificiales mediante subsidios y emisión nos ha llevado al agotamiento de las reservas y al mercado negro.»',
          evidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
        },
        institutionalAction: {
          date: '1975-06-04',
          instrumentOrVote: 'Resoluciones MECON de devaluación (160%) y ajuste tarifario (hasta 175%)',
          documentedOutcome: 'Ruptura definitiva del Pacto Social, salto inflacionario al 182,8% anual y comienzo de 16 años consecutivos de inflación superior al 100% anual (1975–1991).',
          evidenceRecordId: 'EVD-1975-RES-RODRIGAZO-BORA'
        },
        contextAndPublicExplanation:
          'El atraso cambiario y tarifario acumulado durante 1973–1974 bajo controles administrativos rígidos estalló cuando se agotaron las reservas del BCRA tras la crisis petrolera internacional.'
      }
    ],
    evidenceRecordIds: ['EVD-1973-LEY-20628-GANANCIAS-IVA', 'EVD-1975-RES-RODRIGAZO-BORA', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-1985-plan-austral',
    slug: '1985-plan-austral-y-coparticipacion-1988',
    date: '1985-06-14',
    year: 1985,
    periodLabel: '1983–1989 (Retorno Democrático — Raúl Alfonsín)',
    president: 'Raúl Ricardo Alfonsín',
    governingCoalition: 'Unión Cívica Radical (UCR)',
    ministerOfEconomy: 'Juan Vital Sourrouille',
    jurisdiction: 'Nación',
    thematicAxis: 'Régimen Monetario y Cambiario',
    title: 'Plan Austral (Decreto 1096/85) y Ley de Coparticipación Federal 23.548 (1985–1988)',
    institutionalSummary:
      'Para frenar una inflación que superaba el 30% mensual en el primer semestre de 1985, el presidente Raúl Alfonsín y el ministro Juan Sourrouille lanzaron el Plan Austral (Decreto 1096/85): cambio de moneda (quita de tres ceros), tabla de desagio, congelamiento de precios y tarifas, y compromiso de no emitir dinero para financiar al Tesoro. En enero de 1988 se sancionó la Ley 23.548 de Coparticipación Federal, pero el deterioro fiscal cuasifiscal y la falta de financiamiento externo desembocaron en la hiperinflación de 1989.',
    normativeInstruments: [
      {
        normLabel: 'Decreto 1.096/1985 (Creación del Austral y Desagio)',
        organismo: 'Poder Ejecutivo Nacional',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
      },
      {
        normLabel: 'Ley 23.548 — Régimen Transitorio de Coparticipación Federal (1988)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-1988-LEY-23548-COPARTICIPACION'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '672,2% en 1985 → baja inicial al 90,1% en 1986 → hiperinflación del 3.079,5% en 1989',
      fiscalBalancePctGdp: 'Reducción inicial del déficit del -10,5% al -3,2% del PBI en 1985–1986; posterior deterioro del déficit cuasifiscal del BCRA',
      publicSpendingPctGdp: '31,8% del PBI consolidado Nación + Provincias',
      taxPressureNote: 'Ahorro Forzoso (Leyes 23.256 y 23.549), retenciones transitorias y sanción de la Ley 23.548 que fijó el 54,66% de coparticipación automática a provincias.',
      purchasingPowerAndTariffsImpact: 'Recuperación inmediata del poder adquisitivo en el segundo semestre de 1985 (victoria electoral legislativa de noviembre 1985), seguida de erosión salarial en 1988–1989.',
      sourceEvidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
    },
    keyOfficialsInvolved: [
      {
        name: 'Raúl Ricardo Alfonsín',
        role: 'Presidente de la Nación (1983–1989)',
        actionTaken: 'Anunció la «Economía de Guerra» en Plaza de Mayo y firmó el Decreto 1096/85 del Plan Austral.'
      },
      {
        name: 'Juan Vital Sourrouille',
        role: 'Ministro de Economía (1985–1989)',
        actionTaken: 'Diseñó e implementó el Plan Austral (1985) y el posterior Plan Primavera (1988).'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-1985-CL',
        newspaperName: 'Clarín',
        editionDate: '1985-06-15',
        mainHeadline: 'Crean una nueva moneda, el Austral, y congelan precios, tarifas y salarios',
        subHeadline: 'Alfonsín y Sourrouille anunciaron un drástico plan antiinflacionario; hoy es feriado bancario y cambiario.',
        permittedBriefQuote: '«El Gobierno se compromete a no emitir moneda sin respaldo para financiar el déficit del Tesoro.»',
        editorialFramingNote: 'Destaca el factor sorpresa del shock heterodoxo y el respaldo ciudadano inicial.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Junio 1985',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-1985-AF',
        newspaperName: 'Ámbito Financiero',
        editionDate: '1985-06-17',
        mainHeadline: 'Debuta el Austral con tabla de desagio y fuerte baja en las tasas nominales de interés',
        subHeadline: 'El éxito del programa dependerá de sostener la disciplina fiscal en las empresas públicas y provincias.',
        permittedBriefQuote: '«La tabla de conversión diaria busca evitar transferencias arbitrarias de riqueza entre deudores y acreedores.»',
        editorialFramingNote: 'Análisis técnico centrado en el mecanismo de desagio y el déficit cuasifiscal del BCRA.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Ámbito Financiero — Junio 1985',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-1985-01',
        pollsterOrInstitution: 'Estudios de Opinión Pública SOCMERC (Mora y Araujo, Noguera y Asociados) / Elecciones Legislativas Noviembre 1985',
        fieldworkDate: '1985-08-20',
        sampleSizeAndScope: 'Muestra urbana nacional (1.200 casos) y resultado electoral nacional del 03/11/1985',
        methodologyNote: 'Encuestas domiciliarias urbanas y cómputo oficial de la Cámara Nacional Electoral.',
        keyFindingSummary: 'Más del 70% de aprobación inicial al Plan Austral entre julio y octubre de 1985, reflejado en el triunfo oficialista del 43,2% en las elecciones legislativas de noviembre de 1985.',
        primarySocialConcern: 'Freno a la inflación mensual (que cayó del 30,5% en junio al 3,1% en agosto de 1985).',
        inflationOrEconomyApprovalNote: 'El apoyo cayó drásticamente a partir de 1987–1988 con el rebrote inflacionario y los cortes de suministro eléctrico.',
        sourceUrl: 'https://www.electoral.gob.ar/',
        evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-1985-01',
        date: '1985-08-29',
        eventCategory: 'Paro General',
        organizersOrSectors: ['Confederación General del Trabajo (CGT) — Saúl Ubaldini'],
        geographicScope: 'Alcance Nacional',
        documentedDescription: 'Tercer paro general de los 13 realizados por la CGT durante la presidencia de Raúl Alfonsín, en reclamo de recomposición salarial frente al congelamiento del Plan Austral.',
        institutionalResponse: 'Flexibilización gradual de pautas salariales y precios administrados a partir de abril de 1986.',
        evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-1985-01',
        actorName: 'Administración Raúl Alfonsín (Bernardo Grinspun 1983–85 → Juan Sourrouille 1985)',
        actorRoleAndCoalition: 'Poder Ejecutivo Nacional (UCR)',
        beforeStatement: {
          date: '1984-01-15',
          channelOrForum: 'Lineamientos iniciales de política económica (Gestión Grinspun)',
          verbatimQuote: '«No aplicaremos recetas recesivas ni ajustes ortodoxos; la reactivación salarial gradual financiará el crecimiento.»',
          evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
        },
        afterStatement: {
          date: '1985-04-26',
          channelOrForum: 'Discurso de Raúl Alfonsín en Plaza de Mayo («Economía de Guerra»)',
          verbatimQuote: '«Hemos llegado a una situación límite que nos exige encarar una verdadera economía de guerra y contener el gasto público.»',
          evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
        },
        institutionalAction: {
          date: '1985-06-14',
          instrumentOrVote: 'Decreto 1096/1985 (Plan Austral)',
          documentedOutcome: 'Reemplazo del gradualismo inicial por un shock de estabilización con ajuste tarifario previo, creación del Austral y prohibición de emisión monetaria para el Tesoro.',
          evidenceRecordId: 'EVD-1985-DEC-1096-AUSTRAL'
        },
        contextAndPublicExplanation:
          'La aceleración inflacionaria superior al 1.000% anualizado a mediados de 1985 llevó al gobierno a adoptar un programa de estabilización de emergencia mediante DNU.'
      }
    ],
    evidenceRecordIds: ['EVD-1985-DEC-1096-AUSTRAL', 'EVD-1988-LEY-23548-COPARTICIPACION', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-1991-convertibilidad-privatizaciones',
    slug: '1991-convertibilidad-privatizaciones-y-reforma-del-estado',
    date: '1991-03-27',
    year: 1991,
    periodLabel: '1989–1999 (Presidencia de Carlos Saúl Menem)',
    president: 'Carlos Saúl Menem',
    governingCoalition: 'Partido Justicialista (FREJUPO)',
    ministerOfEconomy: 'Domingo Felipe Cavallo',
    jurisdiction: 'Nación',
    thematicAxis: 'Empresas Públicas, Privatizaciones y Estatizaciones',
    title: 'Ley de Convertibilidad (23.928), Reforma del Estado (23.696) y Privatizaciones (1989–1999)',
    institutionalSummary:
      'Tras las hiperinflaciones de 1989 y 1990 y el Plan Bonex (Decreto 36/90), el Congreso sancionó la Ley 23.928 de Convertibilidad (1 Peso = 1 Dólar con respaldo de reservas del BCRA y prohibición de indexación), articulada con las Leyes 23.696 (Reforma del Estado) y 24.241 (creación del sistema mixto de jubilación con AFJP). El programa eliminó la inflación pero acumuló endeudamiento externo, déficit fiscal provincial y desempleo estructural tras los shocks externos de 1995 y 1998.',
    normativeInstruments: [
      {
        normLabel: 'Ley 23.928 (Convertibilidad) y Ley 23.696 (Reforma del Estado y Privatizaciones)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: 'Caída del 2.314% (1990) al 84% (1991), 17,5% (1992), 3,9% (1994) y -1,2% en 1999',
      fiscalBalancePctGdp: 'Equilibrio en 1992–1993 con ingresos de privatizaciones; déficit creciente del -1,5% al -4,1% (1995–1999) tras la transición previsional a las AFJP',
      publicSpendingPctGdp: '27,5% al 30,8% del PBI consolidado',
      taxPressureNote: 'Elevación de la alícuota general del IVA del 13% gradualmente hasta el 21% en marzo de 1995 (Efecto Tequila).',
      purchasingPowerAndTariffsImpact: 'Estabilidad monetaria y reaparición del crédito hipotecario en dólares, contrarrestada por el aumento de la desocupación abierta del 6,9% (1991) al 18,4% (mayo 1995).',
      sourceEvidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
    },
    keyOfficialsInvolved: [
      {
        name: 'Carlos Saúl Menem',
        role: 'Presidente de la Nación (1989–1999)',
        actionTaken: 'Impulsó las Leyes de Reforma del Estado, Emergencia Económica, Privatizaciones y Convertibilidad.'
      },
      {
        name: 'Domingo Felipe Cavallo',
        role: 'Ministro de Economía (1991–1996)',
        actionTaken: 'Autor del proyecto de Ley de Convertibilidad 23.928 y de la reforma tributaria e impositiva de los años 90.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-1991-LN',
        newspaperName: 'La Nación',
        editionDate: '1991-03-28',
        mainHeadline: 'El Congreso sancionó la ley de libre convertibilidad del austral',
        subHeadline: 'A partir del 1 de abril diez mil australes equivaldrán a un dólar y quedan prohibidas las cláusulas indexatorias.',
        permittedBriefQuote: '«El Banco Central sólo podrá emitir moneda contra compra de divisas en el mercado libre de cambios.»',
        editorialFramingNote: 'Subraya la restricción legal impuesta a la emisión monetaria sin respaldo de divisas.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección La Nación — Marzo 1991',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-1991-P12',
        newspaperName: 'Página/12',
        editionDate: '1991-03-21',
        mainHeadline: 'El plan de Cavallo ata el austral al dólar por ley del Congreso',
        subHeadline: 'Fuerte apuesta del ministro para frenar la corrida cambiaria antes de las elecciones de otoño.',
        permittedBriefQuote: '«El esquema fija un chaleco de fuerza monetario mientras acelera el cronograma de venta de empresas estatales.»',
        editorialFramingNote: 'Enfoque crítico sobre el impacto industrial del tipo de cambio fijo y las privatizaciones.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Página/12 — Marzo 1991',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-1995-01',
        pollsterOrInstitution: 'EPH INDEC / Estudios Centro de Estudios Unión para la Nueva Mayoría y Elecciones Presidenciales Mayo 1995',
        fieldworkDate: '1995-05-14',
        sampleSizeAndScope: 'EPH 28 aglomerados urbanos y Elección Presidencial Nacional (14/05/1995)',
        methodologyNote: 'Encuesta Permanente de Hogares (INDEC) y escrutinio definitivo CNE.',
        keyFindingSummary: 'A pesar de alcanzar un récord de desocupación del 18,4% en mayo de 1995, el temor al retorno de la hiperinflación y las cuotas en dólares otorgaron la reelección con el 49,94% de los votos.',
        primarySocialConcern: 'Transición de la inflación (1989–1991) hacia la desocupación y el endeudamiento como principal preocupación ciudadana desde 1995.',
        inflationOrEconomyApprovalNote: 'Respaldo mayoritario a la paridad 1 a 1 incluso entre votantes opositores hasta fines de 2001.',
        sourceUrl: 'https://www.indec.gob.ar/',
        evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-1991-01',
        date: '1996-06-20',
        eventCategory: 'Cacerolazo / Protesta',
        organizersOrSectors: ['Trabajadores desocupados de YPF en Cutral Có y Plaza Huincul (Neuquén)', 'CTA y MTA'],
        geographicScope: 'Cutral Có / General Mosconi y paros nacionales de mediados de los años 90',
        documentedDescription: 'Surgimiento de cortes de ruta en enclaves petroleros y ferroviarios tras la privatización y reestructuración de empresas estatales.',
        institutionalResponse: 'Creación de los primeros programas focalizados de empleo transitorio (Plan Trabajar).',
        evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-1991-01',
        actorName: 'Carlos Saúl Menem (Campaña Presidencial 1989 vs. Reforma del Estado 1989–1991)',
        actorRoleAndCoalition: 'Presidente de la Nación (Partido Justicialista)',
        beforeStatement: {
          date: '1989-04-15',
          channelOrForum: 'Campaña Electoral Presidencial FREJUPO',
          verbatimQuote: '«Impulsaremos el salariazo y la revolución productiva defendiendo el patrimonio de las empresas nacionales del Estado.»',
          evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
        },
        afterStatement: {
          date: '1989-07-10',
          channelOrForum: 'Mensaje Presidencial de Asunción y envío de la Ley 23.696',
          verbatimQuote: '«Todo aquello que puedan hacer los particulares por sí mismos no lo hará el Estado; cirugía mayor sin anestesia.»',
          evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
        },
        institutionalAction: {
          date: '1989-08-17',
          instrumentOrVote: 'Sanción de la Ley 23.696 (Reforma del Estado) y Ley 23.928 (Convertibilidad)',
          documentedOutcome: 'Privatización de ENTel, Aerolíneas Argentinas, SEGBA, Gas del Estado, SOMISA e YPF, y fijación del tipo de cambio convertible.',
          evidenceRecordId: 'EVD-1991-LEY-23928-CONVERTIBILIDAD'
        },
        contextAndPublicExplanation:
          'El estallido hiperinflacionario de mayo-julio de 1989 y la quiebra operativa de las empresas estatales llevaron al Ejecutivo a adoptar un programa de privatizaciones y apertura económica opuesto a la plataforma electoral tradicional.'
      }
    ],
    evidenceRecordIds: ['EVD-1991-LEY-23928-CONVERTIBILIDAD', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2001-crisis-deficit-cero',
    slug: '2001-impuesto-al-cheque-deficit-cero-y-corralito',
    date: '2001-07-30',
    year: 2001,
    periodLabel: '1999–2001 (Presidencia de Fernando de la Rúa — La Alianza)',
    president: 'Fernando de la Rúa',
    governingCoalition: 'Alianza para el Trabajo, la Justicia y la Educación (UCR - FREPASO)',
    ministerOfEconomy: 'José Luis Machinea / Ricardo López Murphy / Domingo Felipe Cavallo',
    jurisdiction: 'Nación',
    thematicAxis: 'Deuda Pública y Crisis Fiscales',
    title: 'Impuesto al Cheque (Ley 25.413), Ley de Déficit Cero (25.453) y Corralito Bancario (2001)',
    institutionalSummary:
      'En el tercer año de recesión consecutiva y cierre del crédito internacional, el Congreso sancionó en marzo de 2001 la Ley 25.413 creando el Impuesto a los Débitos y Créditos Bancarios («Impuesto al Cheque», prometido como temporal hasta diciembre de 2002) y en julio la Ley 25.453 de Déficit Cero que aplicó un recorte del 13% sobre haberes estatales y jubilaciones mayores a $500. La fuga de depósitos culminó con el Decreto 1570/2001 (Corralito) el 1 de diciembre y la crisis institucional del 19 y 20 de diciembre de 2001.',
    normativeInstruments: [
      {
        normLabel: 'Ley 25.413 (Impuesto al Cheque), Ley 25.453 (Déficit Cero) y Decreto 1570/2001 (Corralito)',
        organismo: 'Honorable Congreso de la Nación / Poder Ejecutivo Nacional',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: 'Deflación del -1,1% en 2001 → salto inflacionario al 40,9% en 2002 tras la salida de la Convertibilidad (Ley 25.561)',
      fiscalBalancePctGdp: 'Déficit consolidado Nación + Provincias del -5,9% del PBI en 2001 por caída vertical de la recaudación e intereses de deuda',
      publicSpendingPctGdp: '30,2% del PBI con emisión de cuasimonedas provinciales (Patacón, LECOP, Lecor)',
      taxPressureNote: 'El Impuesto al Cheque (Ley 25.413) recaudó de forma inmediata sobre toda transacción formal y jamás fue derogado por ninguno de los 7 gobiernos posteriores.',
      purchasingPowerAndTariffsImpact: 'Recorte nominal del 13% a estatales y jubilados en julio de 2001, inmovilización de depósitos en diciembre y pesificación asimétrica en enero de 2002.',
      sourceEvidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
    },
    keyOfficialsInvolved: [
      {
        name: 'Fernando de la Rúa',
        role: 'Presidente de la Nación (1999–2001)',
        actionTaken: 'Promulgó las Leyes 25.413 y 25.453 y firmó el Decreto 1570/2001; renunció el 20 de diciembre de 2001.'
      },
      {
        name: 'Domingo Felipe Cavallo / Patricia Bullrich',
        role: 'Ministro de Economía y Ministra de Trabajo (2001)',
        actionTaken: 'Implementaron la regla de Déficit Cero, el recorte del 13% y las restricciones bancarias del Decreto 1570/01.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2001-CL',
        newspaperName: 'Clarín',
        editionDate: '2001-12-02',
        mainHeadline: 'Duras restricciones para sacar plata de los bancos y girar divisas al exterior',
        subHeadline: 'Sólo se podrán retirar 250 pesos o dólares en efectivo por semana de las cuentas bancarias por 90 días.',
        permittedBriefQuote: '«Cavallo aseguró que las medidas buscan frenar el ataque especulativo contra los depósitos y defender el uno a uno.»',
        editorialFramingNote: 'Documenta el inicio del Corralito bancario y el límite semanal de extracción.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Diciembre 2001',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2001-LN',
        newspaperName: 'La Nación',
        editionDate: '2001-07-30',
        mainHeadline: 'El Senado convirtió en ley el proyecto oficial de déficit cero',
        subHeadline: 'Rige el recorte del 13 por ciento para los sueldos estatales y haberes jubilatorios superiores a 500 pesos.',
        permittedBriefQuote: '«El Gobierno sólo podrá gastar cada mes el equivalente exacto a lo que recaude en efectivo.»',
        editorialFramingNote: 'Registra la sanción parlamentaria de la Ley 25.453 en medio de una tensa negociación con gobernadores.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección La Nación — Julio 2001',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2001-01',
        pollsterOrInstitution: 'EPH INDEC y Cómputos Cámara Nacional Electoral (Elecciones Legislativas Octubre 2001 — «Voto Bronca»)',
        fieldworkDate: '2001-10-14',
        sampleSizeAndScope: 'Padrón Nacional Electoral y 28 aglomerados urbanos EPH',
        methodologyNote: 'Escrutinio definitivo CNE (votos en blanco y nulos superaron el 24% en distritos clave) y serie de pobreza/desempleo INDEC.',
        keyFindingSummary: 'Crisis aguda de representación política («Que se vayan todos»), desocupación del 18,3% en octubre de 2001 y pobreza en ascenso hacia el 54% en mayo de 2002.',
        primarySocialConcern: 'Desempleo, recesión económica, recorte salarial/previsional e inmovilización de ahorros bancarios.',
        inflationOrEconomyApprovalNote: 'Desaprobación superior al 80% de la gestión económica en diciembre de 2001.',
        sourceUrl: 'https://www.electoral.gob.ar/',
        evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2001-01',
        date: '2001-12-19',
        eventCategory: 'Cacerolazo / Protesta',
        organizersOrSectors: ['Ahorristas, sectores medios urbanos, centrales sindicales y movimientos de desocupados'],
        geographicScope: 'Plaza de Mayo (CABA) y principales ciudades de todas las provincias argentinas',
        documentedDescription: 'Cacerolazos masivos espontáneos la noche del 19 de diciembre de 2001 tras la declaración del Estado de Sitio, seguidos por la renuncia de Domingo Cavallo y del presidente Fernando de la Rúa el 20 de diciembre.',
        institutionalResponse: 'Sucesión presidencial legislativa (Puerta → Rodríguez Saá → Camaño → Duhalde), declaración del default de deuda externa y sanción de la Ley 25.561 de Emergencia Pública.',
        evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2001-01',
        actorName: 'Congreso Nacional y Poder Ejecutivo (Sanción de la Ley 25.413 — Impuesto al Cheque)',
        actorRoleAndCoalition: 'Ejecutivo y Mayorías Parlamentarias (2001–2026)',
        beforeStatement: {
          date: '2001-03-24',
          channelOrForum: 'Artículo 7° original de la Ley 25.413 de Competitividad',
          verbatimQuote: '«El impuesto establecido por la presente ley regirá con carácter de emergencia y transitorio hasta el 31 de diciembre de 2002.»',
          evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
        },
        afterStatement: {
          date: '2022-11-16',
          channelOrForum: 'Prórrogas plurianuales sucesivas en el Congreso (hasta Ley 27.702 con vigencia hasta fines de 2027)',
          verbatimQuote: '«Prorrógase hasta el 31 de diciembre de 2027 la vigencia del Impuesto sobre los Créditos y Débitos en Cuentas Bancarias y Otras Operatorias.»',
          evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
        },
        institutionalAction: {
          date: '2002-12-15',
          instrumentOrVote: 'Leyes de prórroga ininterrumpida (2002, 2004, 2006, 2009, 2011, 2013, 2015, 2017, 2022)',
          documentedOutcome: 'Un tributo distorsivo votado por 21 meses como emergencia excepcional lleva más de 25 años de vigencia ininterrumpida bajo gobiernos de todos los signos políticos.',
          evidenceRecordId: 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO'
        },
        contextAndPublicExplanation:
          'Su facilidad de recaudación automática mediante retención bancaria (representando cerca del 1,6% del PBI) llevó a todas las administraciones posteriores a prorrogarlo.'
      }
    ],
    evidenceRecordIds: ['EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2008-res125-afjp',
    slug: '2008-resolucion-125-retenciones-moviles-y-estatizacion-afjp',
    date: '2008-07-17',
    year: 2008,
    periodLabel: '2007–2015 (Presidencia de Cristina Fernández de Kirchner)',
    president: 'Cristina Fernández de Kirchner',
    governingCoalition: 'Frente para la Victoria (FPV - PJ)',
    ministerOfEconomy: 'Martín Lousteau (Dic 2007–Abr 2008) / Carlos Fernández',
    jurisdiction: 'Nación',
    thematicAxis: 'Sistema Previsional y Seguridad Social',
    title: 'Conflicto por la Resolución 125 (Retenciones Móviles) y Estatización de las AFJP (Ley 26.425)',
    institutionalSummary:
      'El 11 de marzo de 2008 el ministro de Economía Martín Lousteau anunció la Resolución 125/2008 que fijaba derechos de exportación móviles para soja y girasol (con alícuotas marginales superiores al 44%–95% según precio internacional). Tras 129 días de conflicto agropecuario, la madrugada del 17 de julio de 2008 el Senado empató 36 a 36 y el vicepresidente Julio Cobos desempató en contra («mi voto no es positivo»). Tres meses después, para compensar el frente fiscal y financiero ante la crisis subprime global, el Ejecutivo impulsó la Ley 26.425 que estatizó las AFJP y transfirió el stock acumulado (~USD 30.000 millones) al FGS de ANSES.',
    normativeInstruments: [
      {
        normLabel: 'Resolución MECON 125/2008 y Acta de Votación Nominal del Senado (17/07/2008)',
        organismo: 'Ministerio de Economía / Honorable Senado de la Nación',
        probativeNature: 'acta_parlamentaria',
        evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
      },
      {
        normLabel: 'Ley 26.425 — Creación del SIPA y eliminación del régimen de capitalización (AFJP)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '7,2% reportado por el IPC-GBA intervenido vs. ~23,0% medido por direcciones provinciales de estadística (IPC-7 Provincias)',
      fiscalBalancePctGdp: 'Paso del superávit primario consolidado (+3,1% en 2008, sostenido con flujos del SIPA) al déficit fiscal primario desde 2011',
      publicSpendingPctGdp: 'Aumento estructural del gasto público consolidado del ~29% (2006) al ~41% del PBI hacia 2014',
      taxPressureNote: 'Las retenciones a la soja quedaron en el 35% fijo previo a la Res. 125, mientras los aportes personales jubilatorios pasaron íntegramente como ingreso corriente de ANSES.',
      purchasingPowerAndTariffsImpact: 'Congelamiento tarifario en el AMBA financiado con crecientes subsidios energéticos y de transporte (que pasaron del 0,7% al 4,2% del PBI entre 2006 y 2014).',
      sourceEvidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
    },
    keyOfficialsInvolved: [
      {
        name: 'Cristina Fernández de Kirchner',
        role: 'Presidenta de la Nación (2007–2015)',
        actionTaken: 'Envió al Congreso la ratificación de la Resolución 125 y promulgó la Ley 26.425 de estatización previsional.'
      },
      {
        name: 'Martín Lousteau',
        role: 'Ministro de Economía y Producción (Dic 2007–Abr 2008)',
        actionTaken: 'Firmó y anunció la Resolución MECON 125/2008 de retenciones móviles el 11 de marzo de 2008.'
      },
      {
        name: 'Julio César Cleto Cobos',
        role: 'Vicepresidente de la Nación y Presidente del Senado',
        actionTaken: 'Emitió el voto de desempate negativo (36 a 36) a las 04:25 hs del 17 de julio de 2008.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2008-CL',
        newspaperName: 'Clarín',
        editionDate: '2008-07-17',
        mainHeadline: 'Histórico: Cobos desempató en contra del Gobierno y cayó el proyecto oficial de retenciones',
        subHeadline: 'La votación en el Senado había terminado 36 a 36 tras más de 18 horas de dramático debate parlamentario.',
        permittedBriefQuote: '«Que la historia me juzgue: mi voto no es positivo, mi voto es en contra, anunció el vicepresidente.»',
        editorialFramingNote: 'Edición histórica posterior a la sesión de madrugada del 17 de julio de 2008.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Julio 2008',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2008-P12',
        newspaperName: 'Página/12',
        editionDate: '2008-11-21',
        mainHeadline: 'El Senado convirtió en ley el fin de las AFJP y la vuelta al sistema previsional estatal',
        subHeadline: 'Fue aprobado por 46 votos a favor y 18 en contra; los fondos pasan a la órbita de la ANSES.',
        permittedBriefQuote: '«Se cierra el ciclo de jubilación privada iniciado en 1994 durante el gobierno de Carlos Menem.»',
        editorialFramingNote: 'Destaca la amplia mayoría parlamentaria que aprobó la Ley 26.425.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Página/12 — Noviembre 2008',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2008-01',
        pollsterOrInstitution: 'Índice de Confianza en el Gobierno (ICG — Universidad Torcuato Di Tella) y Poliarquía Consultores',
        fieldworkDate: '2008-07-25',
        sampleSizeAndScope: 'Muestra nacional de 1.000 casos en 40 localidades (ICG-UTDT)',
        methodologyNote: 'Serie mensual continua de la Escuela de Gobierno de la Universidad Torcuato Di Tella.',
        keyFindingSummary: 'El Índice de Confianza en el Gobierno cayó un 38% entre febrero y julio de 2008 durante el conflicto por la Resolución 125, anticipando el resultado adverso del oficialismo en las legislativas de junio de 2009.',
        primarySocialConcern: 'Conflicto agropecuario, desabastecimiento en rutas e inflación de alimentos.',
        inflationOrEconomyApprovalNote: 'Polarización territorial marcada entre el interior productivo (Pampa Húmeda) y el conurbano bonaerense.',
        sourceUrl: 'https://www.utdt.edu/ver_contenido.php?id_contenido=1351&id_item_menu=2970',
        evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2008-01',
        date: '2008-07-15',
        eventCategory: 'Movilización Ciudadana',
        organizersOrSectors: ['Mesa de Enlace Agropecuaria (SRA, CRA, CONINAGRO, FAA) en Palermo', 'Frente para la Victoria en Plaza de los Dos Congresos'],
        geographicScope: 'Monumento de los Españoles / Plaza Congreso (CABA) y más de 300 cruces de rutas nacionales',
        documentedDescription: 'Movilizaciones simultáneas de signo opuesto de más de 200.000 personas cada una en la Ciudad de Buenos Aires en la previa de la votación nominal del Senado.',
        institutionalResponse: 'El Poder Ejecutivo dejó sin efecto la Resolución 125 mediante el Decreto 1176/2008 al día siguiente del rechazo senatorial.',
        evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2008-01',
        actorName: 'Martín Lousteau (Autor de la Resolución 125 en 2008 vs. Posicionamiento Opositor Posterior)',
        actorRoleAndCoalition: 'Ministro de Economía (2008) → Senador Nacional (UCR)',
        beforeStatement: {
          date: '2008-03-11',
          channelOrForum: 'Anuncio Oficial en el Ministerio de Economía de la Resolución 125/2008',
          verbatimQuote: '«Establecemos un esquema de retenciones móviles para desacoplar los precios internos de los alimentos de las subas internacionales extraordinarias.»',
          evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
        },
        afterStatement: {
          date: '2019-12-18',
          channelOrForum: 'Debate Parlamentario y declaraciones públicas como legislador opositor',
          verbatimQuote: '«El gobierno recurre una vez más al atajo recaudatorio de subir impuestos y retenciones a la producción en lugar de ordenar el Estado.»',
          evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
        },
        institutionalAction: {
          date: '2008-03-10',
          instrumentOrVote: 'Firma de la Resolución MECON 125/2008 vs. Votos opositores en 2019 y 2024',
          documentedOutcome: 'Firmó como ministro la mayor alícuota marginal de retenciones móviles de la historia reciente (Res. 125) y años después cuestionó desde la oposición las subas de derechos de exportación.',
          evidenceRecordId: 'EVD-2008-ACTA-RES125-LEY-26425-AFJP'
        },
        contextAndPublicExplanation:
          'Lousteau explicó en publicaciones posteriores (*Otra vuelta a la economía*) que existían desacuerdos internos sobre la calibración e instrumentación política de la medida con la Secretaría de Comercio Interior.'
      }
    ],
    evidenceRecordIds: ['EVD-2008-ACTA-RES125-LEY-26425-AFJP', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2012-ypf-cepo',
    slug: '2012-expropiacion-ypf-y-controles-cambiarios',
    date: '2012-05-03',
    year: 2012,
    periodLabel: '2011–2015 (Segundo mandato de Cristina Fernández de Kirchner)',
    president: 'Cristina Fernández de Kirchner',
    governingCoalition: 'Frente para la Victoria (FPV - PJ)',
    ministerOfEconomy: 'Hernán Lorenzino / Axel Kicillof (Viceministro y luego Ministro)',
    jurisdiction: 'Nación',
    thematicAxis: 'Empresas Públicas, Privatizaciones y Estatizaciones',
    title: 'Expropiación del 51% de YPF (Ley 26.741) y Consolidación del Cepo Cambiario (2011–2015)',
    institutionalSummary:
      'Ante el déficit de la balanza energética (que pasó de un superávit de USD 6.000 millones en 2006 a un déficit de USD 3.000 millones en 2011 por el congelamiento de precios en boca de pozo y el auge de subsidios), el Gobierno instauró controles cambiarios de la AFIP en octubre de 2011 y en mayo de 2012 sancionó la Ley 26.741 que expropió el 51% de las acciones de YPF S.A. en manos de Repsol. En 2014 el Estado indemnizó a Repsol con USD 5.000 millones en bonos y en 2023 enfrentó una sentencia adversa de primera instancia en Nueva York por USD 16.100 millones por omitir la Oferta Pública de Adquisición (OPA) prevista en el estatuto.',
    normativeInstruments: [
      {
        normLabel: 'Ley 26.741 — Soberanía Hidrocarburífera y Expropiación del 51% de YPF S.A.',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '10,8% oficial (INDEC intervenido) vs. 25,6% IPC Congreso / Direcciones Provinciales en 2012 (38,5% en 2014)',
      fiscalBalancePctGdp: 'Déficit financiero consolidado del -2,8% en 2012 al -5,4% del PBI en 2015 financiado con adelantos transitorios del BCRA',
      publicSpendingPctGdp: '38,9% al 41,5% del PBI consolidado',
      taxPressureNote: 'No actualización del mínimo no imponible ni de las escalas del Impuesto a las Ganancias, haciendo que el porcentaje de asalariados alcanzados pasara del 9% al 28% entre 2007 y 2013.',
      purchasingPowerAndTariffsImpact: 'Brecha cambiaria superior al 60%–80% entre el dólar oficial y el paralelo, con subsidios a energía y transporte que absorbieron más del 4% del PBI.',
      sourceEvidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
    },
    keyOfficialsInvolved: [
      {
        name: 'Cristina Fernández de Kirchner',
        role: 'Presidenta de la Nación',
        actionTaken: 'Anunció por cadena nacional el envío del proyecto de expropiación del 51% de YPF el 16 de abril de 2012.'
      },
      {
        name: 'Axel Kicillof',
        role: 'Secretario de Política Económica y Subinterventor de YPF (luego Ministro de Economía)',
        actionTaken: 'Expuso en el Senado los fundamentos de la no aplicación del estatuto societario y negoció en 2014 el pago de USD 5.000 millones a Repsol.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2012-P12',
        newspaperName: 'Página/12',
        editionDate: '2012-05-04',
        mainHeadline: 'YPF vuelve a manos del Estado con una abrumadora mayoría en el Congreso',
        subHeadline: 'Diputados convirtió en ley la expropiación del 51 por ciento de la petrolera por 208 votos a favor y 32 en contra.',
        permittedBriefQuote: '«La iniciativa cosechó el respaldo del oficialismo, el radicalismo, el FAP y bloques provinciales.»',
        editorialFramingNote: 'Resalta el amplio consenso multipartidario obtenido en el recinto.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Página/12 — Mayo 2012',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2012-LN',
        newspaperName: 'La Nación',
        editionDate: '2012-05-04',
        mainHeadline: 'El Gobierno ya tiene la ley de expropiación de YPF y designó a Galuccio al frente',
        subHeadline: 'Advertencias de especialistas por el costo indemnizatorio y las demandas internacionales de accionistas minoritarios.',
        permittedBriefQuote: '«El texto aprobado excluye la aplicación de la cláusula estatutaria que obligaba a ofertar por el 100% del paquete accionario.»',
        editorialFramingNote: 'Advierte tempranamente sobre la contingencia judicial internacional en los tribunales de Nueva York.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección La Nación — Mayo 2012',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2012-01',
        pollsterOrInstitution: 'ICG Universidad Torcuato Di Tella y Poliarquía Consultores (Mayo–Noviembre 2012)',
        fieldworkDate: '2012-09-15',
        sampleSizeAndScope: '1.000 casos nacionales urbanos',
        methodologyNote: 'Encuesta telefónica y presencial estratificada por región y nivel socioeconómico.',
        keyFindingSummary: 'Mientras la estatización de YPF contó inicialmente con más del 60% de opinión favorable, las restricciones para la compra de dólares (Cepo) y el impacto de Ganancias sobre los salarios provocaron una caída de 18 puntos en la aprobación gubernamental hacia fines de 2012.',
        primarySocialConcern: 'Inflación no reconocida en estadísticas oficiales, Impuesto a las Ganancias en sueldos e inseguridad.',
        inflationOrEconomyApprovalNote: 'Desencadenó las movilizaciones urbanas del 13S y 8N de 2012 y el primer paro conjunto de las 5 centrales sindicales en noviembre de 2012.',
        sourceUrl: 'https://www.utdt.edu/',
        evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2012-01',
        date: '2012-11-08',
        eventCategory: 'Cacerolazo / Protesta',
        organizersOrSectors: ['Ciudadanos autoconvocados por redes sociales (8N) y Paro General CGT/CTA (20/11/2012)'],
        geographicScope: 'Obelisco (CABA), Olivos, Rosario, Córdoba, Mendoza y Tucumán',
        documentedDescription: 'Masiva movilización ciudadana del 8 de noviembre de 2012 contra la inflación, la presión tributaria y los controles cambiarios, seguida el 20 de noviembre por un paro nacional convocado por Hugo Moyano y Pablo Micheli en reclamo de la suba del mínimo no imponible de Ganancias.',
        institutionalResponse: 'Subas parciales y escalonadas del mínimo no imponible por decreto en 2013.',
        evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2012-01',
        actorName: 'Axel Kicillof (Debate en el Senado 2012 vs. Convenio de Indemnización a Repsol 2014)',
        actorRoleAndCoalition: 'Viceministro (2012) → Ministro de Economía (2014) — Frente para la Victoria',
        beforeStatement: {
          date: '2012-04-17',
          channelOrForum: 'Exposición en el Plenario de Comisiones del Senado de la Nación',
          verbatimQuote: '«Los tarados son los que piensan que el Estado tiene que ser estúpido y comprar todo según el estatuto de YPF; primero haremos la auditoría ambiental y de vaciamiento.»',
          evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
        },
        afterStatement: {
          date: '2014-02-27',
          channelOrForum: 'Anuncio del Convenio de Solución Amigable y Avenimiento de Expropiación con Repsol (Ley 26.932)',
          verbatimQuote: '«Cerramos un acuerdo definitivo por 5.000 millones de dólares en bonos soberanos con renuncia recíproca a reclamos para destrabar las inversiones en Vaca Muerta.»',
          evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
        },
        institutionalAction: {
          date: '2014-04-23',
          instrumentOrVote: 'Sanción de la Ley 26.932 (Aprobación del pago de USD 5.000 millones en BONAR a Repsol)',
          documentedOutcome: 'El Estado abonó USD 5.000 millones en títulos públicos a Repsol y la omisión de la OPA estatutaria de 2012 derivó en el fallo judicial de Nueva York (2023) por USD 16.100 millones adicionales.',
          evidenceRecordId: 'EVD-2012-LEY-26741-YPF-EXPROPIACION'
        },
        contextAndPublicExplanation:
          'El Ejecutivo argumentó en 2014 que el acuerdo con Repsol era indispensable para atraer inversiones de compañías internacionales (como Chevron) hacia la formación no convencional de Vaca Muerta.'
      }
    ],
    evidenceRecordIds: ['EVD-2012-LEY-26741-YPF-EXPROPIACION', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2017-reforma-previsional',
    slug: '2017-reforma-previsional-consenso-fiscal-y-fmi-2018',
    date: '2017-12-19',
    year: 2017,
    periodLabel: '2015–2019 (Presidencia de Mauricio Macri — Cambiemos)',
    president: 'Mauricio Macri',
    governingCoalition: 'Cambiemos (PRO - UCR - Coalición Cívica)',
    ministerOfEconomy: 'Alfonso Prat-Gay / Nicolás Dujovne / Hernán Lacunza',
    jurisdiction: 'Nación',
    thematicAxis: 'Sistema Previsional y Seguridad Social',
    title: 'Reforma Previsional (Ley 27.426), Consenso Fiscal (Ley 27.429) y Crisis Cambiaria / Acuerdo FMI (2017–2019)',
    institutionalSummary:
      'Tras ganar las elecciones legislativas de octubre de 2017, la administración de Mauricio Macri impulsó el Consenso Fiscal con 23 provincias (Ley 27.429, para reducir gradualmente Ingresos Brutos y Sellos) y la Reforma Previsional (Ley 27.426), que modificó la fórmula de movilidad a 70% inflación (IPC) + 30% salarios (RIPTE). Sancionada el 19 de diciembre de 2017 en medio de graves incidentes frente al Congreso, fue seguida diez días después por la conferencia del 28 de diciembre (28D) que relajó las metas de inflación del BCRA, preludio de la corrida cambiaria de abril de 2018 y del acuerdo Stand-By con el FMI por USD 57.000 millones (desembolsados ~USD 44.500 millones).',
    normativeInstruments: [
      {
        normLabel: 'Ley 27.426 (Reforma Previsional) y Ley 27.429 (Consenso Fiscal Federal 2017)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '24,8% en 2017 (con INDEC normalizado desde 2016) → salto al 47,6% en 2018 y 53,8% en 2019',
      fiscalBalancePctGdp: 'Reducción del déficit primario del -3,8% (2017) al -0,4% (2019), pero con fuerte suba del peso de intereses de deuda por devaluación',
      publicSpendingPctGdp: 'Reducción del gasto primario consolidado del 41,5% al 37,8% del PBI entre 2015 y 2019',
      taxPressureNote: 'Aunque en 2015 se habían eliminado o reducido las retenciones agropecuarias, en septiembre de 2018 (Decreto 793/18) se restablecieron derechos de exportación de $3 y $4 por dólar a todas las exportaciones.',
      purchasingPowerAndTariffsImpact: 'Recomposición tarifaria eléctrica y de gas (2016–2018) y caída del salario real y haberes previsionales por el desfase trimestral de la fórmula ante la aceleración inflacionaria de 2018–2019.',
      sourceEvidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
    },
    keyOfficialsInvolved: [
      {
        name: 'Mauricio Macri',
        role: 'Presidente de la Nación (2015–2019)',
        actionTaken: 'Promulgó la Ley 27.426, el Consenso Fiscal y en septiembre de 2018 reimpuso retenciones y controles cambiarios (2019).'
      },
      {
        name: 'Nicolás Dujovne / Marcos Peña',
        role: 'Ministro de Hacienda y Jefe de Gabinete de Ministros',
        actionTaken: 'Negociaron el Consenso Fiscal con los gobernadores, encabezaron la conferencia del 28D de 2017 y firmaron el programa con el FMI en junio de 2018.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2017-CL',
        newspaperName: 'Clarín',
        editionDate: '2017-12-19',
        mainHeadline: 'En medio de una batalla campal afuera del Congreso, el Gobierno logró aprobar la reforma jubilatoria',
        subHeadline: 'Tras doce horas de debate en Diputados y cacerolazos por la noche, se convirtió en ley por 127 votos a 117.',
        permittedBriefQuote: '«El respaldo de diputados que responden a gobernadores peronistas fue decisivo para alcanzar el quórum y la votación.»',
        editorialFramingNote: 'Crónica de la sesión parlamentaria y de los disturbios en la Plaza de los Dos Congresos.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Diciembre 2017',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2017-PE',
        newspaperName: 'Perfil',
        editionDate: '2017-12-30',
        mainHeadline: 'El Gobierno recalibra las metas de inflación para 2018 y el dólar salta a un récord',
        subHeadline: 'Peña, Dujovne, Caputo y Sturzenegger anunciaron que la pauta oficial pasa del 10 al 15 por ciento.',
        permittedBriefQuote: '«El mercado leyó la conferencia de prensa en Casa Rosada como un avance de la jefatura de Gabinete sobre la autonomía del Banco Central.»',
        editorialFramingNote: 'Analiza el impacto institucional del 28D sobre las expectativas de inflación y riesgo país.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Perfil — Diciembre 2017',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2017-01',
        pollsterOrInstitution: 'ICG Universidad Torcuato Di Tella y Synopsis Consultores',
        fieldworkDate: '2018-01-20',
        sampleSizeAndScope: '1.000 casos nacionales urbanos',
        methodologyNote: 'Medición mensual del Índice de Confianza en el Gobierno (UTDT).',
        keyFindingSummary: 'Tras alcanzar su pico de gestión en noviembre de 2017 luego de ganar las legislativas, la confianza en el Gobierno cayó 19 puntos en diciembre de 2017 tras la sanción de la reforma previsional y continuó descendiendo con la devaluación de 2018.',
        primarySocialConcern: 'Tarifas de servicios públicos, inflación y haberes jubilatorios.',
        inflationOrEconomyApprovalNote: 'Marcó el punto de inflexión político de la administración Cambiemos.',
        sourceUrl: 'https://www.utdt.edu/',
        evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2017-01',
        date: '2017-12-18',
        eventCategory: 'Movilización Ciudadana',
        organizersOrSectors: ['CGT, ambas CTA, organizaciones sociales y partidos de oposición en Plaza Congreso; cacerolazos nocturnos en CABA'],
        geographicScope: 'Plaza de los Dos Congresos y barrios de CABA y Gran Buenos Aires',
        documentedDescription: 'Masiva movilización sindical y opositora con graves enfrentamientos con fuerzas de seguridad durante el tratamiento en Diputados el 14 y 18 de diciembre de 2017, seguida por cacerolazos nocturnos.',
        institutionalResponse: 'El Ejecutivo otorgó por Decreto 1058/2017 un bono compensatorio extraordinario de empalme por única vez en marzo de 2018.',
        evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2017-01',
        actorName: 'Mauricio Macri (Promesas sobre Ganancias y Retenciones 2015 vs. Medidas Fiscales 2018–2019)',
        actorRoleAndCoalition: 'Presidente de la Nación (Cambiemos)',
        beforeStatement: {
          date: '2015-10-08',
          channelOrForum: 'Spot oficial de campaña presidencial y acto en Pergamino',
          verbatimQuote: '«En mi gobierno ningún trabajador va a pagar Impuesto a las Ganancias y las retenciones son un impuesto distorsivo que vamos a eliminar.»',
          evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
        },
        afterStatement: {
          date: '2018-09-03',
          channelOrForum: 'Mensaje Presidencial anunciando el Decreto 793/2018',
          verbatimQuote: '«Sé que es un impuesto malo, malísimo, que va en contra de lo que queremos, pero les pido a quienes exportan que hagan un aporte de emergencia.»',
          evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
        },
        institutionalAction: {
          date: '2018-09-03',
          instrumentOrVote: 'Decreto 793/2018 (Retenciones generales) y Decreto 609/2019 (Restablecimiento del Cepo Cambiario)',
          documentedOutcome: 'La cantidad de trabajadores alcanzados por Ganancias creció de 1,2 millones (2015) a más de 2,1 millones (2019), se reimplantaron retenciones a todas las exportaciones en 2018 y el control de cambios en septiembre de 2019.',
          evidenceRecordId: 'EVD-2017-LEY-27426-REFORMA-PREVISIONAL'
        },
        contextAndPublicExplanation:
          'El cierre abrupto del financiamiento voluntario externo en abril de 2018 y las exigencias de Déficit Primario Cero del acuerdo con el FMI llevaron al Ejecutivo a recurrir a retenciones y control de cambios.'
      }
    ],
    evidenceRecordIds: ['EVD-2017-LEY-27426-REFORMA-PREVISIONAL', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2019-solidaridad-impuesto-pais',
    slug: '2019-ley-solidaridad-social-impuesto-pais-y-suspension-movilidad',
    date: '2019-12-23',
    year: 2019,
    periodLabel: '2019–2023 (Presidencia de Alberto Fernández — Frente de Todos)',
    president: 'Alberto Ángel Fernández',
    governingCoalition: 'Frente de Todos / Unión por la Patria',
    ministerOfEconomy: 'Martín Guzmán (2019–2022) / Silvina Batakis / Sergio Tomás Massa (2022–2023)',
    jurisdiction: 'Nación',
    thematicAxis: 'Sistema Tributario y Coparticipación',
    title: 'Ley 27.541 de Solidaridad Social, Creación del Impuesto PAIS y Emisión Monetaria (2019–2023)',
    institutionalSummary:
      'A trece días de asumir, el Congreso sancionó la Ley 27.541 de Solidaridad Social y Reactivación Productiva: creó el Impuesto PAIS (30% sobre compra de divisas y consumos en moneda extranjera por cinco períodos fiscales), incrementó alícuotas de Bienes Personales y retenciones, y suspendió la fórmula de movilidad previsional 27.426 (que justamente hubiera otorgado aumentos superiores por indexar con la inflación de 2019). Entre 2020 y 2023 la asistencia monetaria del BCRA al Tesoro, la quita de coparticipación a CABA (Decreto 735/20) y la sequía de 2023 elevaron la inflación anual del 53,8% (2019) al 211,4% (2023).',
    normativeInstruments: [
      {
        normLabel: 'Ley 27.541 — Solidaridad Social y Reactivación Productiva en el Marco de la Emergencia Pública',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
      },
      {
        normLabel: 'Ley 27.725 — Eliminación de 4ta Categoría de Ganancias (Septiembre 2023)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'acta_parlamentaria',
        evidenceRecordId: 'EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: '36,1% en 2020 (congelamiento pandemia) → 50,9% (2021) → 94,8% (2022) → 211,4% en 2023',
      fiscalBalancePctGdp: 'Déficit financiero consolidado del -8,5% en 2020 y -4,6% a -6,1% en 2022–2023, más pasivos remunerados del BCRA (LELIQ/Pases)',
      publicSpendingPctGdp: '39,2% al 41,8% del PBI consolidado',
      taxPressureNote: 'Creación o ampliación de más de 25 tributos, percepciones cambiarias a cuenta de Ganancias/Bienes Personales (que llevaron el recargo sobre el dólar tarjeta hasta el 155% en 2023) y el Aporte Solidario Extraordinario (Ley 27.605).',
      purchasingPowerAndTariffsImpact: 'Caída acumulada real superior al 32% en los haberes jubilatorios sobre el mínimo entre 2019 y 2023 tras el reemplazo de la fórmula indexada por inflación.',
      sourceEvidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
    },
    keyOfficialsInvolved: [
      {
        name: 'Alberto Ángel Fernández',
        role: 'Presidente de la Nación (2019–2023)',
        actionTaken: 'Promulgó la Ley 27.541, suspendió la movilidad de la Ley 27.426 y dispuso por Decreto 735/2020 la quita de coparticipación a CABA.'
      },
      {
        name: 'Martín Guzmán / Sergio Tomás Massa',
        role: 'Ministros de Economía (2019–2022 y 2022–2023)',
        actionTaken: 'Guzmán diseñó la Ley 27.541 y la reestructuración de deuda (2020–2022); Massa implementó los esquemas de «Dólar Soja» e impulsó la Ley 27.725 de Ganancias en la campaña 2023.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2019-AF',
        newspaperName: 'Ámbito Financiero',
        editionDate: '2019-12-23',
        mainHeadline: 'Rige desde hoy la Ley de Emergencia con el recargo del 30% al dólar ahorro y turismo',
        subHeadline: 'El Gobierno publicó en edición suplementaria del Boletín Oficial la Ley 27.541 aprobada por el Senado.',
        permittedBriefQuote: '«Se suspende por 180 días la fórmula de movilidad jubilatoria y el Ejecutivo dará aumentos trimestrales por decreto.»',
        editorialFramingNote: 'Detalla la entrada en vigencia inmediata del Impuesto PAIS y de las facultades delegadas.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Ámbito Financiero — Diciembre 2019',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2019-LN',
        newspaperName: 'La Nación',
        editionDate: '2019-12-22',
        mainHeadline: 'El Congreso aprobó el ajuste impositivo y el congelamiento de la fórmula jubilatoria',
        subHeadline: 'Fuerte impacto sobre la clase media, el ahorro en divisas, Bienes Personales y las retenciones al campo.',
        permittedBriefQuote: '«Quienes en diciembre de 2017 rechazaron en las calles la fórmula atada a la inflación votaron ahora su suspensión justo cuando debía pagar el pico inflacionario de 2019.»',
        editorialFramingNote: 'Subraya la paradoja legislativa en torno a la fórmula de movilidad previsional 27.426.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección La Nación — Diciembre 2019',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2023-01',
        pollsterOrInstitution: 'ICG Universidad Torcuato Di Tella y EPH INDEC (Segundo Semestre 2023)',
        fieldworkDate: '2023-10-15',
        sampleSizeAndScope: '1.000 casos nacionales (ICG-UTDT) y 31 aglomerados urbanos (EPH INDEC)',
        methodologyNote: 'Serie continua ICG-UTDT y medición oficial de pobreza e inflación INDEC.',
        keyFindingSummary: 'Con una inflación interanual del 211,4% al cierre de 2023 y una pobreza del 41,7% (segundo semestre 2023), el Índice de Confianza en el Gobierno marcó su mínimo en 20 años (1,08 sobre 5), explicando el giro electoral presidencial de noviembre de 2023.',
        primarySocialConcern: 'Inflación por encima del 12% mensual y pérdida de poder adquisitivo de salarios e ingresos informales.',
        inflationOrEconomyApprovalNote: 'El 84% de los encuestados identificó a la inflación como el principal problema del país.',
        sourceUrl: 'https://www.indec.gob.ar/',
        evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2020-01',
        date: '2020-08-17',
        eventCategory: 'Movilización Ciudadana',
        organizersOrSectors: ['Comerciantes, productores agropecuarios y sectores medios urbanos (17A)'],
        geographicScope: 'Obelisco (CABA), Córdoba, Santa Fe, Mendoza y Mar del Plata',
        documentedDescription: 'Banderazos y caravanas vehiculares en protesta por la extensión de las restricciones sanitarias sobre la actividad comercial, la presión impositiva y la reforma judicial.',
        institutionalResponse: 'El Gobierno dejó sin efecto el intento de expropiación de Vicentin (Decreto 522/20) pero mantuvo la quita de coparticipación a CABA (luego revertida por fallo cautelar de la CSJN en diciembre de 2022).',
        evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2019-01',
        actorName: 'Alberto Fernández y Bloque Frente de Todos (Promesa sobre LELIQ y Jubilados 2019 vs. Ley 27.541)',
        actorRoleAndCoalition: 'Presidente y Mayoría Parlamentaria (Frente de Todos)',
        beforeStatement: {
          date: '2019-07-31',
          channelOrForum: 'Entrevista en televisión y actos de campaña presidencial',
          verbatimQuote: '«Entre los bancos y los jubilados, elijo a los jubilados: con diez días de intereses de las LELIQ les aumentamos un 20% a todos los jubilados el 10 de diciembre.»',
          evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
        },
        afterStatement: {
          date: '2019-12-17',
          channelOrForum: 'Fundamentos del Proyecto de Ley 27.541 enviado al Congreso',
          verbatimQuote: '«La fórmula de movilidad sancionada en 2017 es fiscalmente impagable e indexatoria, por lo que corresponde suspender su aplicación por 180 días.»',
          evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
        },
        institutionalAction: {
          date: '2019-12-23',
          instrumentOrVote: 'Sanción del Art. 55 de la Ley 27.541 y posterior Ley 27.609 (fórmula sin cláusula de inflación)',
          documentedOutcome: 'Se suspendió la fórmula 70% IPC + 30% RIPTE cuando debía otorgar el rezago inflacionario de 2019 y se la reemplazó por la Ley 27.609 (recaudación + salarios), que ante una inflación del 211% en 2023 produjo una caída real superior al 30% en los haberes.',
          evidenceRecordId: 'EVD-2019-LEY-27541-IMPUESTO-PAIS'
        },
        contextAndPublicExplanation:
          'El ministro Martín Guzmán sostuvo que desindexar el gasto previsional de la inflación pasada era una condición técnica necesaria para la sostenibilidad de la deuda pública.'
      }
    ],
    evidenceRecordIds: ['EVD-2019-LEY-27541-IMPUESTO-PAIS', 'EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION', 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO']
  },
  {
    id: 'evt-2023-2026-ley-bases-ganancias',
    slug: '2024-2026-ajuste-fiscal-ley-bases-restitucion-ganancias-y-quita-subsidios',
    date: '2024-07-08',
    year: 2024,
    periodLabel: '2023–Actualidad (Presidencia de Javier Milei — La Libertad Avanza)',
    president: 'Javier Gerardo Milei',
    governingCoalition: 'La Libertad Avanza (con apoyo parlamentario de PRO y sectores dialoguistas)',
    ministerOfEconomy: 'Luis Andrés Caputo',
    jurisdiction: 'Nación',
    thematicAxis: 'Sistema Tributario y Coparticipación',
    title: 'Superávit Fiscal, Ley Bases (27.742), Paquete Fiscal (27.743 — Restitución de Ganancias) y Quita de Subsidios (2024–2026)',
    institutionalSummary:
      'Desde diciembre de 2023 la administración de Javier Milei aplicó un ajuste fiscal de ~5 puntos del PBI para alcanzar superávit financiero en el primer año de mandato y reducir la emisión monetaria. En el plano tributario y tarifario se registraron contrastes documentados: tras haber votado como diputado la eliminación de Ganancias de 4ta categoría en septiembre de 2023 (Ley 27.725), el Ejecutivo promovió y promulgó su restitución en julio de 2024 mediante la Ley 27.743 (Paquete Fiscal, acompañado de la Ley Bases 27.742 y la baja de Bienes Personales); elevó transitoriamente el Impuesto PAIS del 7,5% al 17,5% hasta su vencimiento legal el 22 de diciembre de 2024; y redujo drásticamente los subsidios a la energía (Resoluciones SE 7/24 y 90/24) y al transporte automotor del interior.',
    normativeInstruments: [
      {
        normLabel: 'Ley 27.742 (Ley Bases y RIGI) y Ley 27.743 (Paquete Fiscal — Restitución Ganancias 4ta Categoría)',
        organismo: 'Honorable Congreso de la Nación',
        probativeNature: 'ley_decreto_norma',
        evidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
      },
      {
        normLabel: 'Resoluciones SE 7/2024 y 90/2024 / Informes de Subsidios OPC (2024–2026)',
        organismo: 'Secretaría de Energía / ENRE / Oficina de Presupuesto del Congreso (OPC)',
        probativeNature: 'registro_presupuestario',
        evidenceRecordId: 'EVD-2024-RES-ENRE-ENARGAS-QUITA-SUBSIDIOS'
      }
    ],
    economicAndFiscalImpact: {
      inflationAnnualPct: 'Pico mensual del 25,5% en diciembre 2023 → desaceleración al 117,8% anual en 2024 y sendero de un dígito bajo mensual en 2025–2026',
      fiscalBalancePctGdp: 'Paso de un déficit financiero de -4,6% del PBI (2023) a un superávit primario de +1,8% y financiero de +0,3% del PBI desde 2024',
      publicSpendingPctGdp: 'Reducción del gasto primario nacional de ~27% en términos reales en 2024 (obra pública, transferencias discrecionales a provincias y subsidios económicos)',
      taxPressureNote: 'Eliminación por vencimiento legal del Impuesto PAIS en diciembre de 2024 y baja de Bienes Personales, compensadas por la restitución de Ganancias de 4ta categoría (Ley 27.743) y actualización del Impuesto a los Combustibles Líquidos.',
      purchasingPowerAndTariffsImpact: 'Sinceramiento tarifario: los usuarios N1 y comercios pasaron a cubrir entre el 85% y el 100% del costo monómico eléctrico (CAMMESA), mientras provincias y municipios mantuvieron recargos de IIBB y tasas municipales sobre las facturas.',
      sourceEvidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
    },
    keyOfficialsInvolved: [
      {
        name: 'Javier Gerardo Milei',
        role: 'Presidente de la Nación (2023–Actualidad)',
        actionTaken: 'Promulgó las Leyes 27.742 y 27.743, sostuvo la regla de déficit financiero cero y vetó leyes sin fuente de financiamiento.'
      },
      {
        name: 'Luis Andrés Caputo / Guillermo Francos',
        role: 'Ministro de Economía y Jefe de Gabinete de Ministros',
        actionTaken: 'Negociaron con los gobernadores provinciales la inclusión de la restitución de Ganancias (coparticipable) en la Ley 27.743.'
      }
    ],
    pressFrontPages: [
      {
        id: 'PF-2024-LN',
        newspaperName: 'La Nación',
        editionDate: '2024-06-28',
        mainHeadline: 'El Gobierno consiguió sus dos primeras leyes: se aprobaron la Ley Bases y el paquete fiscal con la vuelta de Ganancias',
        subHeadline: 'Diputados insistió con la redacción original en Ganancias y Bienes Personales y dio sanción definitiva al RIGI.',
        permittedBriefQuote: '«Alrededor de 800.000 trabajadores volverán a tributar la cuarta categoría del Impuesto a las Ganancias.»',
        editorialFramingNote: 'Registra la sanción definitiva de las Leyes 27.742 y 27.743 tras seis meses de debate parlamentario.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección La Nación — Junio 2024',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      },
      {
        id: 'PF-2024-CL',
        newspaperName: 'Clarín',
        editionDate: '2024-12-23',
        mainHeadline: 'Dejó de existir el Impuesto PAIS tras cinco años de vigencia y baja un 30% el dólar tarjeta',
        subHeadline: 'El Gobierno decidió no prorrogar el tributo creado en diciembre de 2019, aunque mantiene la percepción del 30% a cuenta de Ganancias.',
        permittedBriefQuote: '«Fue el primer impuesto nacional de emergencia en expirar en la fecha prevista por su ley de creación en más de dos décadas.»',
        editorialFramingNote: 'Documenta la finalización del Impuesto PAIS el 22 de diciembre de 2024 y la continuidad de las percepciones de ARCA.',
        archiveSourceName: 'Hemeroteca Biblioteca Nacional Mariano Moreno (BNMM)',
        archiveCollectionRef: 'Colección Clarín — Diciembre 2024',
        verificationUrl: 'https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        waybackFallbackUrl: 'https://web.archive.org/web/*/https://www.bn.gov.ar/micrositios/servicios-y-consultas/hemeroteca',
        rightsNotice: 'Metadatos hemerográficos y cita breve conforme Art. 10 Ley 11.723.',
        evidenceRecordId: 'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
      }
    ],
    opinionAndSurveys: [
      {
        id: 'SUR-2024-01',
        pollsterOrInstitution: 'ICG Universidad Torcuato Di Tella e Informes de Coyuntura OPC / INDEC (2024–2026)',
        fieldworkDate: '2025-11-15',
        sampleSizeAndScope: '1.000 casos nacionales (ICG-UTDT) y 31 aglomerados urbanos (INDEC)',
        methodologyNote: 'Serie mensual ICG-UTDT y encuestas nacionales de percepción económica.',
        keyFindingSummary: 'La desaceleración de la inflación mensual sostuvo niveles de aprobación cercanos al 48%–52%, mientras que el costo de las tarifas de servicios públicos, los alquileres y el nivel de actividad/empleo pasaron al primer lugar de las preocupaciones cotidianas de los hogares.',
        primarySocialConcern: 'Transición de la inflación aguda (2023) hacia el peso de las facturas de luz, gas, agua, transporte e ingresos reales.',
        inflationOrEconomyApprovalNote: 'Valoración positiva de la estabilidad cambiaria y la baja inflacionaria frente a reclamos por haberes jubilatorios y financiamiento universitario.',
        sourceUrl: 'https://www.utdt.edu/',
        evidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
      }
    ],
    socialRepercussions: [
      {
        id: 'SOC-2024-01',
        date: '2024-04-23',
        eventCategory: 'Movilización Ciudadana',
        organizersOrSectors: ['Consejo Interuniversitario Nacional (CIN), federaciones estudiantiles (FUA), gremios docentes y centrales sindicales'],
        geographicScope: 'Plaza de Mayo (CABA) y ciudades con universidades nacionales en las 24 jurisdicciones',
        documentedDescription: 'Masiva Marcha Federal Universitaria del 23 de abril de 2024 en reclamo por la actualización por inflación de las partidas de funcionamiento y salarios universitarios, además de dos paros generales de la CGT (24/01/2024 y 09/05/2024).',
        institutionalResponse: 'Actualización de las partidas de gastos de funcionamiento universitario, impulso de auditorías de la SIGEN y la AGN sobre convenios y rendiciones, y veto presidencial a la ley de financiamiento sin partida específica.',
        evidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
      }
    ],
    beforeAfterComparisons: [
      {
        id: 'BAC-2024-01',
        actorName: 'Javier Gerardo Milei (Voto contra Ganancias en 2023 y promesa impositiva vs. Ley 27.743 en 2024)',
        actorRoleAndCoalition: 'Diputado Nacional (2023) → Presidente de la Nación (2024) — La Libertad Avanza',
        beforeStatement: {
          date: '2023-09-19',
          channelOrForum: 'Sesión de la Cámara de Diputados (Voto afirmativo a la Ley 27.725) y entrevista televisiva',
          verbatimQuote: '«Antes de subir un impuesto me corto un brazo; el Estado es una organización criminal que vive del robo llamado impuestos y por eso voto siempre a favor de bajar impuestos.»',
          evidenceRecordId: 'EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION'
        },
        afterStatement: {
          date: '2024-01-23',
          channelOrForum: 'Mensaje del Poder Ejecutivo enviando el Paquete Fiscal al Congreso',
          verbatimQuote: '«Para consolidar el equilibrio fiscal de la Nación y de las provincias resulta necesario reestructurar el Impuesto a los Ingresos Personales (Ganancias de cuarta categoría).»',
          evidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
        },
        institutionalAction: {
          date: '2024-07-08',
          instrumentOrVote: 'Promulgación de la Ley 27.743 (Título V — Restitución de Ganancias de 4ta categoría) y Decreto 29/2023 (suba temporal del Impuesto PAIS al 17,5%)',
          documentedOutcome: 'Tras votar la eliminación de Ganancias de 4ta categoría en septiembre de 2023 como diputado, nueve meses después como presidente impulsó y promulgó su restitución mediante la Ley 27.743, además de subir temporalmente el Impuesto PAIS hasta su vencimiento en diciembre de 2024.',
          evidenceRecordId: 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL'
        },
        contextAndPublicExplanation:
          'El Poder Ejecutivo explicó que la restitución de Ganancias fue una condición exigida por los gobernadores provinciales para acompañar la Ley Bases (dado que Ganancias es coparticipable en un 54,66% según la Ley 23.548) y para evitar financiar el déficit con emisión monetaria.'
      }
    ],
    evidenceRecordIds: [
      'EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION',
      'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL',
      'EVD-2024-RES-ENRE-ENARGAS-QUITA-SUBSIDIOS',
      'EVD-HEMEROTECA-BNMM-CATALOGO-HISTORICO'
    ]
  }
];

export const HISTORICAL_EVENT_RELATIONS: HistoricalEventRelation[] = [
  {
    id: 'REL-01',
    sourceEventId: 'evt-1946-bcra-iapi',
    targetEventId: 'evt-1975-rodrigazo',
    relationType: 'CAUSA_PRECEDENTE',
    relationLabel: 'Financiamiento Monetario del Déficit y Controles de Precios',
    description:
      'El esquema de financiamiento del Tesoro vía redescuentos del BCRA y fijación administrativa de precios y tipos de cambio inaugurado en 1946 encontró su primer estallido hiperinflacionario de tres dígitos en el Rodrigazo de junio de 1975.',
    supportingEvidenceIds: ['EVD-1946-DEC-8503-BCRA', 'EVD-1975-RES-RODRIGAZO-BORA']
  },
  {
    id: 'REL-02',
    sourceEventId: 'evt-1975-rodrigazo',
    targetEventId: 'evt-1985-plan-austral',
    relationType: 'RESPUESTA_NORMATIVA',
    relationLabel: 'Diez años de Inflación Crónica → Reforma Monetaria Austral',
    description:
      'Una década de inflación superior al 100% anual iniciada en 1975 obligó en junio de 1985 a reemplazar el signo monetario y aplicar el mecanismo de desagio contractual mediante el Decreto 1096/85.',
    supportingEvidenceIds: ['EVD-1975-RES-RODRIGAZO-BORA', 'EVD-1985-DEC-1096-AUSTRAL']
  },
  {
    id: 'REL-03',
    sourceEventId: 'evt-1985-plan-austral',
    targetEventId: 'evt-1991-convertibilidad-privatizaciones',
    relationType: 'REFORMA_POSTERIOR',
    relationLabel: 'Agotamiento del Austral (Hiperinflación 1989) → Convertibilidad 1991',
    description:
      'El colapso fiscal del Plan Austral en la hiperinflación de 1989–1990 condujo a la sanción de la Ley 23.928 de Convertibilidad que ató por ley la emisión monetaria al respaldo de reservas en dólares.',
    supportingEvidenceIds: ['EVD-1985-DEC-1096-AUSTRAL', 'EVD-1991-LEY-23928-CONVERTIBILIDAD']
  },
  {
    id: 'REL-04',
    sourceEventId: 'evt-1991-convertibilidad-privatizaciones',
    targetEventId: 'evt-2001-crisis-deficit-cero',
    relationType: 'IMPACTO_PRESUPUESTARIO',
    relationLabel: 'Rigidez Cambiaria + Endeudamiento → Impuesto al Cheque y Déficit Cero (2001)',
    description:
      'Ante la imposibilidad de emitir moneda bajo la Ley 23.928 y el cierre del crédito externo, el Estado creó el Impuesto al Cheque (Ley 25.413) y sancionó la Ley 25.453 de Déficit Cero antes del colapso de la Convertibilidad.',
    supportingEvidenceIds: ['EVD-1991-LEY-23928-CONVERTIBILIDAD', 'EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO']
  },
  {
    id: 'REL-05',
    sourceEventId: 'evt-1991-convertibilidad-privatizaciones',
    targetEventId: 'evt-2008-res125-afjp',
    relationType: 'REFORMA_POSTERIOR',
    relationLabel: 'Creación de las AFJP (1994) → Estatización del SIPA (Ley 26.425 en 2008)',
    description:
      'El régimen de capitalización individual creado en los años 90 fue estatizado en noviembre de 2008 mediante la Ley 26.425 tras el rechazo parlamentario de las retenciones móviles de la Resolución 125.',
    supportingEvidenceIds: ['EVD-1991-LEY-23928-CONVERTIBILIDAD', 'EVD-2008-ACTA-RES125-LEY-26425-AFJP']
  },
  {
    id: 'REL-06',
    sourceEventId: 'evt-2017-reforma-previsional',
    targetEventId: 'evt-2019-solidaridad-impuesto-pais',
    relationType: 'CONTRADICCION_DISCURSIVA',
    relationLabel: 'Fórmula Previsional 27.426 (70% IPC) Rechazada en 2017 y Suspendida en 2019',
    description:
      'La fórmula de movilidad atada en un 70% a la inflación sancionada en diciembre de 2017 fue suspendida en diciembre de 2019 por la Ley 27.541 justo cuando el rezago inflacionario de 2019 debía recomponer los haberes en términos reales.',
    supportingEvidenceIds: ['EVD-2017-LEY-27426-REFORMA-PREVISIONAL', 'EVD-2019-LEY-27541-IMPUESTO-PAIS']
  },
  {
    id: 'REL-07',
    sourceEventId: 'evt-2019-solidaridad-impuesto-pais',
    targetEventId: 'evt-2023-2026-ley-bases-ganancias',
    relationType: 'CONTRADICCION_DISCURSIVA',
    relationLabel: 'Eliminación de Ganancias 4ta Cat. (Sep 2023) → Restitución en Paquete Fiscal (Jul 2024)',
    description:
      'En septiembre de 2023 la Ley 27.725 eliminó Ganancias de 4ta categoría con votos del oficialismo y de La Libertad Avanza; en julio de 2024 la Ley 27.743 restituyó el tributo para sostener el equilibrio fiscal y la coparticipación provincial.',
    supportingEvidenceIds: ['EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION', 'EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL']
  }
];
