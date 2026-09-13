/**
 * Modelo de incidencia tributaria por etapas.
 * Los montos son estimaciones explicativas derivadas del desglose base del simulador.
 * No reemplazan una liquidación fiscal ni implican que un impuesto sea jurídicamente
 * acumulativo en todas las etapas. IVA se identifica como impuesto con crédito fiscal.
 */

export type TaxMechanism = 'acumulativo' | 'credito_fiscal' | 'especifico' | 'tasa_local';

export interface TaxChainItem {
  id: string;
  taxName: string;
  level: 'Nación' | 'Provincia' | 'Municipio';
  mechanism: TaxMechanism;
  nominalRate?: string;
  amountShare: number;
  note: string;
}

export interface ProductionStage {
  id: string;
  name: string;
  description: string;
  taxes: TaxChainItem[];
}

export interface ProductTaxChain {
  productId: string;
  stages: ProductionStage[];
}

export const PRODUCT_TAX_CHAINS: ProductTaxChain[] = [
  {
    productId: 'leche',
    stages: [
      {
        id: 'primaria', name: 'Producción primaria', description: 'Tambo, sanidad, energía e insumos.',
        taxes: [
          { id: 'iva_insumos', taxName: 'IVA sobre insumos', level: 'Nación', mechanism: 'credito_fiscal', nominalRate: 'según insumo', amountShare: 0.12, note: 'Aparece en compras; el crédito fiscal evita tratarlo como cascada pura.' },
          { id: 'iibb_primaria', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', nominalRate: 'variable', amountShare: 0.18, note: 'Puede acumularse en distintas jurisdicciones y actividades.' },
          { id: 'tasas_sanitarias', taxName: 'Tasas y controles sanitarios', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.18, note: 'Habilitación, bromatología y controles locales según municipio.' }
        ]
      },
      {
        id: 'industrial', name: 'Industrialización', description: 'Pasteurización, envasado y planta.',
        taxes: [
          { id: 'iva_venta', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', nominalRate: 'alícuota aplicable', amountShare: 0.34, note: 'Se debita en venta y se descuenta crédito fiscal de compras.' },
          { id: 'iibb_industria', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', nominalRate: 'variable', amountShare: 0.30, note: 'Incide sobre facturación de la etapa.' },
          { id: 'tish_industria', taxName: 'Tasa de Seguridad e Higiene', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.32, note: 'Puede liquidarse sobre facturación o parámetros locales.' }
        ]
      },
      {
        id: 'distribucion', name: 'Distribución', description: 'Mayorista, logística y centros de distribución.',
        taxes: [
          { id: 'iva_distribucion', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', nominalRate: 'alícuota aplicable', amountShare: 0.22, note: 'Se muestra por etapa, pero no debe sumarse como impuesto duplicado sin netear créditos.' },
          { id: 'iibb_distribucion', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', nominalRate: 'variable', amountShare: 0.28, note: 'Grava la facturación de distribución cuando corresponde.' },
          { id: 'tasas_logistica', taxName: 'Tasas municipales logísticas', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.22, note: 'Dependen de municipio, depósitos y habilitaciones.' }
        ]
      },
      {
        id: 'retail', name: 'Comercio / góndola', description: 'Supermercado o comercio minorista y venta al consumidor.',
        taxes: [
          { id: 'iva_final', taxName: 'IVA incluido en precio final', level: 'Nación', mechanism: 'credito_fiscal', nominalRate: 'alícuota aplicable', amountShare: 0.32, note: 'Incidencia final atribuida al componente nacional del producto.' },
          { id: 'iibb_retail', taxName: 'Ingresos Brutos minorista', level: 'Provincia', mechanism: 'acumulativo', nominalRate: 'variable', amountShare: 0.24, note: 'Último eslabón de un tributo típicamente acumulativo.' },
          { id: 'tish_retail', taxName: 'Tasa de Seguridad e Higiene / comercio', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.28, note: 'Tasa local del establecimiento de venta.' }
        ]
      }
    ]
  },
  {
    productId: 'pan',
    stages: [
      { id: 'agro', name: 'Producción de trigo', description: 'Producción primaria y acopio.', taxes: [
        { id: 'iva_agro', taxName: 'IVA sobre insumos', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.10, note: 'Crédito fiscal en la cadena.' },
        { id: 'iibb_agro', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.18, note: 'Según actividad y jurisdicción.' }
      ]},
      { id: 'molino', name: 'Molienda', description: 'Transformación de trigo en harina.', taxes: [
        { id: 'iva_molino', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.22, note: 'Débito menos crédito fiscal.' },
        { id: 'iibb_molino', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.26, note: 'Incide sobre facturación.' },
        { id: 'tasa_molino', taxName: 'Tasas municipales de planta', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.22, note: 'Habilitación y seguridad e higiene.' }
      ]},
      { id: 'panificadora', name: 'Panificación', description: 'Elaboración, empaque y despacho.', taxes: [
        { id: 'iva_panif', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.28, note: 'Se registra por etapa sin duplicar el neto final.' },
        { id: 'iibb_panif', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.31, note: 'Carga acumulativa sobre ventas.' },
        { id: 'bromato', taxName: 'Tasas bromatológicas', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.30, note: 'Según ordenanza local.' }
      ]},
      { id: 'retail', name: 'Comercio / góndola', description: 'Distribución minorista y venta final.', taxes: [
        { id: 'iva_retail_pan', taxName: 'IVA en venta final', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.40, note: 'Componente nacional final estimado.' },
        { id: 'iibb_retail_pan', taxName: 'Ingresos Brutos minorista', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.25, note: 'Último eslabón provincial.' },
        { id: 'tish_retail_pan', taxName: 'Tasa de Seguridad e Higiene', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.48, note: 'Tasa local del comercio.' }
      ]}
    ]
  },
  {
    productId: 'combustible',
    stages: [
      { id: 'refino', name: 'Refinación', description: 'Refinería y salida de producto.', taxes: [
        { id: 'icl', taxName: 'Impuesto sobre los Combustibles Líquidos', level: 'Nación', mechanism: 'especifico', amountShare: 0.46, note: 'Tributo específico incluido en la carga nacional.' },
        { id: 'idc', taxName: 'Impuesto al CO₂', level: 'Nación', mechanism: 'especifico', amountShare: 0.16, note: 'Tributo específico ambiental.' },
        { id: 'iibb_refino', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.28, note: 'Según jurisdicción.' }
      ]},
      { id: 'distribucion', name: 'Distribución mayorista', description: 'Transporte, terminales y mayoristas.', taxes: [
        { id: 'iva_comb_dist', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.12, note: 'Débito menos crédito fiscal.' },
        { id: 'iibb_comb_dist', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.30, note: 'Carga sobre facturación.' }
      ]},
      { id: 'estacion', name: 'Estación de servicio', description: 'Venta al consumidor.', taxes: [
        { id: 'iva_comb_final', taxName: 'IVA en precio final', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.26, note: 'Incidencia final aproximada dentro del total nacional.' },
        { id: 'iibb_comb_final', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.42, note: 'Última etapa provincial.' },
        { id: 'tasa_vial', taxName: 'Tasa vial municipal', level: 'Municipio', mechanism: 'tasa_local', amountShare: 1.00, note: 'Sólo en municipios que la aplican; el ejemplo base la incluye.' }
      ]}
    ]
  },
  {
    productId: 'celular',
    stages: [
      { id: 'ensamble', name: 'Importación / ensamblado', description: 'Componentes, industria y ensamblado.', taxes: [
        { id: 'internos', taxName: 'Impuestos internos / derechos aplicables', level: 'Nación', mechanism: 'especifico', amountShare: 0.35, note: 'Depende del régimen y origen.' },
        { id: 'iva_cel_1', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.20, note: 'Se netea con crédito fiscal.' },
        { id: 'iibb_cel_1', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.25, note: 'Según jurisdicción.' }
      ]},
      { id: 'mayorista', name: 'Distribución mayorista', description: 'Mayorista y operador logístico.', taxes: [
        { id: 'iva_cel_2', taxName: 'IVA', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.18, note: 'No sumar como cascada pura.' },
        { id: 'cheque_cel', taxName: 'Débitos y créditos bancarios', level: 'Nación', mechanism: 'acumulativo', amountShare: 0.10, note: 'Puede repetirse a lo largo de movimientos bancarios.' },
        { id: 'iibb_cel_2', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.30, note: 'Carga sobre facturación.' },
        { id: 'tish_cel_2', taxName: 'TISH / tasas locales', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.35, note: 'Depende de municipio.' }
      ]},
      { id: 'retail', name: 'Retail / góndola', description: 'Comercio minorista y venta final.', taxes: [
        { id: 'iva_cel_3', taxName: 'IVA final', level: 'Nación', mechanism: 'credito_fiscal', amountShare: 0.17, note: 'Componente final estimado.' },
        { id: 'iibb_cel_3', taxName: 'Ingresos Brutos', level: 'Provincia', mechanism: 'acumulativo', amountShare: 0.45, note: 'Último eslabón.' },
        { id: 'tish_cel_3', taxName: 'TISH minorista', level: 'Municipio', mechanism: 'tasa_local', amountShare: 0.65, note: 'Tasa local del comercio.' }
      ]}
    ]
  }
];
