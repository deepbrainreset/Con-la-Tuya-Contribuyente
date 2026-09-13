export type TaxImpactClass = 'cascada' | 'credito_fiscal' | 'monofasico' | 'costo_operativo' | 'renta';

export interface TaxPoliticalProfile {
  id: string;
  canonicalName: string;
  aliases: string[];
  level: 'Nación' | 'Provincia' | 'Municipio' | 'Mixto';
  impactClass: TaxImpactClass;
  legalOrigin: string;
  politicalOrigin: string;
  politicalContext: string;
  shelfImpact: string;
  repetitionRule: string;
  entrepreneurImpact: string;
  sourceUrl: string;
  evidenceNote: string;
}

export const TAX_POLITICAL_PROFILES: TaxPoliticalProfile[] = [
  {
    id: 'iva',
    canonicalName: 'Impuesto al Valor Agregado (IVA)',
    aliases: ['IVA', 'IVA final', 'IVA en venta final', 'IVA sobre insumos'],
    level: 'Nación',
    impactClass: 'credito_fiscal',
    legalOrigin: 'Ley 20.631, sancionada el 27/12/1973.',
    politicalOrigin: 'Congreso de la Nación durante la presidencia de Juan Domingo Perón (FREJULI).',
    politicalContext: 'La ley sustituyó el impuesto a las ventas y otros tributos análogos por un impuesto general al valor agregado.',
    shelfImpact: 'Aparece en múltiples facturas de la cadena, pero el sistema débito/crédito fiscal busca que la carga neta recaiga sobre el valor agregado y no como una cascada pura.',
    repetitionRule: 'Puede figurar en cada etapa gravada, aunque no corresponde sumar íntegramente cada débito sin descontar créditos fiscales.',
    entrepreneurImpact: 'Reduce caja y capital de trabajo por la mecánica de débitos, créditos, percepciones y saldos, pero no equivale automáticamente a una pérdida del margen bruto.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-20631-62459',
    evidenceNote: 'Origen legal nacional verificable; las alícuotas y tratamientos varían por bien y régimen.'
  },
  {
    id: 'iibb',
    canonicalName: 'Impuesto sobre los Ingresos Brutos (IIBB)',
    aliases: ['Ingresos Brutos', 'Ingresos Brutos minorista', 'IIBB', 'IIBB industria', 'IIBB distribución'],
    level: 'Provincia',
    impactClass: 'cascada',
    legalOrigin: 'Tributo provincial regulado por los códigos fiscales y leyes impositivas de cada jurisdicción.',
    politicalOrigin: 'No tiene un único creador nacional. Cada provincia define base, alícuotas, exenciones y regímenes; por eso la atribución política debe hacerse por jurisdicción y período.',
    politicalContext: 'Es una fuente central de recaudación provincial y ha sido objeto de sucesivos pactos y consensos fiscales orientados a reducir o armonizar alícuotas.',
    shelfImpact: 'Grava facturación bruta y puede repetirse en productor, industria, mayorista, logística y comercio minorista. Al no funcionar como IVA con crédito fiscal general, cada eslabón puede incorporar su costo al siguiente precio.',
    repetitionRule: 'Puede repetirse tantas veces como existan sujetos y actividades alcanzadas en la cadena, con alícuotas distintas según actividad y provincia.',
    entrepreneurImpact: 'Comprime margen sobre ventas de bajo mark-up y aumenta el precio necesario para conservar rentabilidad. El efecto es mayor cuanto más larga y fragmentada es la cadena.',
    sourceUrl: 'https://www.argentina.gob.ar/sites/default/files/comunicacion_reforma_tributaria_20171031_nd.pdf',
    evidenceNote: 'La incidencia exacta requiere conocer jurisdicción, actividad, exenciones y régimen de Convenio Multilateral.'
  },
  {
    id: 'tish',
    canonicalName: 'Tasa de Inspección, Seguridad e Higiene y tasas municipales equivalentes',
    aliases: ['TISH', 'Tasa de Seguridad e Higiene', 'Tasa de Seguridad e Higiene / comercio', 'TISH minorista', 'Tasas municipales logísticas', 'Tasas bromatológicas'],
    level: 'Municipio',
    impactClass: 'costo_operativo',
    legalOrigin: 'Ordenanzas fiscales y tarifarias municipales.',
    politicalOrigin: 'No existe un único autor nacional: cada intendencia y concejo deliberante define su estructura local.',
    politicalContext: 'Se justifican como tasas retributivas de servicios o inspección, aunque su base de cálculo puede estar vinculada a ingresos o parámetros del establecimiento.',
    shelfImpact: 'Puede afectar planta, depósito, centro logístico y local comercial en municipios distintos. El costo se incorpora a gastos operativos y puede trasladarse al precio.',
    repetitionRule: 'Puede aparecer en varios municipios o establecimientos de una misma cadena, pero no debe asumirse una repetición uniforme sin identificar cada ordenanza.',
    entrepreneurImpact: 'Eleva el punto de equilibrio operativo y reduce el margen bruto disponible para salarios, alquiler, financiación, reinversión y utilidad.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa',
    evidenceNote: 'Debe documentarse municipio por municipio antes de asignar una alícuota concreta.'
  },
  {
    id: 'cheque',
    canonicalName: 'Impuesto sobre los Débitos y Créditos Bancarios',
    aliases: ['Débitos y créditos bancarios', 'Impuesto al cheque', 'Impuesto sobre los Débitos y Créditos Bancarios'],
    level: 'Nación',
    impactClass: 'cascada',
    legalOrigin: 'Ley 25.413, sancionada el 24/03/2001.',
    politicalOrigin: 'Congreso de la Nación durante la presidencia de Fernando de la Rúa (Alianza).',
    politicalContext: 'Fue creado por la llamada Ley de Competitividad de 2001, en un contexto de fuerte tensión fiscal y financiera.',
    shelfImpact: 'Cada empresa alcanzada puede pagar el tributo sobre movimientos bancarios vinculados a cobros y pagos; parte de ese costo financiero puede incorporarse a precios sucesivos.',
    repetitionRule: 'Puede repetirse en movimientos bancarios de distintos actores de la cadena. La incidencia neta depende de exenciones y de cuánto puede computarse a cuenta de otros impuestos.',
    entrepreneurImpact: 'Aumenta el costo de transacción y capital de trabajo, especialmente en negocios de alta rotación y bajo margen.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-25413-2001-66533/actualizacion',
    evidenceNote: 'La tasa y computabilidad efectiva dependen del régimen vigente del contribuyente.'
  },
  {
    id: 'sellos',
    canonicalName: 'Impuesto de Sellos',
    aliases: ['Sellos', 'Impuesto de Sellos', 'Impuesto de Sellos sobre contratos'],
    level: 'Provincia',
    impactClass: 'cascada',
    legalOrigin: 'Tributo provincial sobre actos, contratos y operaciones instrumentadas; las reglas dependen de cada jurisdicción.',
    politicalOrigin: 'No tiene un único creador nacional; debe atribuirse a la ley provincial y gestión que fijó cada régimen o modificación.',
    politicalContext: 'Ha sido objeto de compromisos de reducción en consensos fiscales por su efecto sobre contratación, crédito e inversión.',
    shelfImpact: 'No necesariamente aparece en cada venta, pero puede gravar contratos de financiación, seguros, alquileres, garantías, compraventas u otros instrumentos usados a lo largo de la cadena.',
    repetitionRule: 'Puede reaparecer cuando diferentes contratos o actos de la cadena constituyen hechos imponibles separados.',
    entrepreneurImpact: 'Eleva el costo de formalizar operaciones y financiar activos; reduce el rendimiento esperado de inversiones y puede trasladarse al precio.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa/provincial/ley-13613-123456789-0abc-defg-316-3100bvorpyel/actualizacion',
    evidenceNote: 'Las alícuotas son provinciales y varían según acto y jurisdicción.'
  },
  {
    id: 'internos',
    canonicalName: 'Impuestos Internos',
    aliases: ['Impuestos internos', 'Impuestos internos / derechos aplicables', 'Impuestos Internos Tecnológicos'],
    level: 'Nación',
    impactClass: 'monofasico',
    legalOrigin: 'Ley 24.674, sancionada el 17/07/1996, que modificó el régimen de impuestos internos vigente.',
    politicalOrigin: 'Congreso de la Nación durante la presidencia de Carlos Menem (Partido Justicialista).',
    politicalContext: 'El régimen aplica gravámenes selectivos a determinados bienes y sectores; su alcance ha sido modificado muchas veces desde entonces.',
    shelfImpact: 'Cuando un producto está alcanzado, el impuesto específico se incorpora al costo tributario de la etapa responsable y termina formando parte del precio al consumidor.',
    repetitionRule: 'En general no debe modelarse como IIBB: suele concentrarse en una etapa o hecho imponible específico.',
    entrepreneurImpact: 'Eleva el precio relativo del bien alcanzado y puede reducir demanda o margen si la empresa absorbe parte del impuesto.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-24674-38621',
    evidenceNote: 'Debe verificarse producto por producto si está alcanzado y con qué tasa.'
  },
  {
    id: 'combustibles',
    canonicalName: 'Impuestos sobre Combustibles Líquidos y Dióxido de Carbono',
    aliases: ['Impuesto sobre los Combustibles Líquidos', 'Impuesto al CO₂', 'ICL', 'IDC'],
    level: 'Nación',
    impactClass: 'monofasico',
    legalOrigin: 'Ley 23.966 (1991); el impuesto al CO₂ y el esquema moderno fueron reformulados por la Ley 27.430 en 2017.',
    politicalOrigin: 'Ley 23.966: Congreso durante la presidencia de Carlos Menem (PJ). Reforma 27.430: Congreso durante la presidencia de Mauricio Macri (PRO/Cambiemos).',
    politicalContext: 'El régimen combina objetivos recaudatorios y específicos sobre combustibles; desde 2018 opera con importes fijos por unidad actualizables según el esquema legal.',
    shelfImpact: 'Se incorpora al precio del combustible y luego afecta indirectamente transporte, logística y producción de casi todos los bienes que consumen combustible.',
    repetitionRule: 'El impuesto específico busca incidir en una sola etapa del combustible; su efecto económico reaparece indirectamente como costo logístico en otras cadenas.',
    entrepreneurImpact: 'Aumenta costos de transporte y distribución; sectores intensivos en logística requieren mayor precio o menor margen para absorberlo.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/norma-365/actualizacion',
    evidenceNote: 'No debe contarse varias veces como impuesto directo del mismo litro; sí puede propagarse como costo de otros bienes.'
  },
  {
    id: 'ganancias_empresa',
    canonicalName: 'Impuesto a las Ganancias de la empresa',
    aliases: ['Ganancias empresa'],
    level: 'Nación',
    impactClass: 'renta',
    legalOrigin: 'Régimen nacional del Impuesto a las Ganancias y sus sucesivas modificaciones.',
    politicalOrigin: 'Su diseño actual resulta de décadas de reformas; no es metodológicamente correcto atribuir la carga vigente a una sola administración.',
    politicalContext: 'Es un impuesto sobre la renta o resultado fiscal, no un impuesto directo sobre cada unidad vendida.',
    shelfImpact: 'Puede influir en decisiones de precio e inversión, pero no debe sumarse automáticamente al precio de góndola como si fuera una tasa por venta.',
    repetitionRule: 'No se repite por etapa como IIBB; corresponde al resultado fiscal de cada empresa alcanzada.',
    entrepreneurImpact: 'Reduce la utilidad después de costos y gastos. Por eso el margen bruto mostrado en el simulador no equivale a ganancia neta del empresario.',
    sourceUrl: 'https://www.argentina.gob.ar/normativa',
    evidenceNote: 'Para estimar utilidad neta hacen falta gastos operativos, financieros, amortizaciones, quebrantos y situación fiscal concreta.'
  }
];

export function findTaxPoliticalProfile(name: string) {
  const normalized = name.toLowerCase();
  return TAX_POLITICAL_PROFILES.find(profile =>
    profile.canonicalName.toLowerCase() === normalized ||
    profile.aliases.some(alias => normalized.includes(alias.toLowerCase()) || alias.toLowerCase().includes(normalized))
  );
}
