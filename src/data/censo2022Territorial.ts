export const CENSUS_POPULATION_THRESHOLD = 10_000;

export type CensusTaxDataStatus = 'verified' | 'partial' | 'missing';

export interface CensusProvince {
  id: string;
  indecCode: string;
  name: string;
  population2022: number;
  cityPopulationSlug?: string;
}

export interface CensusLocality {
  id: string;
  name: string;
  provinceId: string;
  department?: string;
  population2022: number;
  unit: 'localidad_censal' | 'aglomerado';
  censusYear: 2022;
  taxGovernmentLocalId?: string;
  taxDataStatus: CensusTaxDataStatus;
  populationSource: 'INDEC_CPV2022' | 'CONICET_CPV2022' | 'MIRROR_INDEC_CPV2022';
}

/**
 * Población definitiva Censo 2022 por jurisdicción.
 * Se mantiene separada de la base tributaria: población no implica que exista
 * una alícuota provincial/municipal sectorial verificada para el simulador.
 */
export const CENSUS_PROVINCES_2022: CensusProvince[] = [
  { id: 'caba', indecCode: '02', name: 'Ciudad Autónoma de Buenos Aires', population2022: 3_121_707 },
  { id: 'buenos_aires', indecCode: '06', name: 'Buenos Aires', population2022: 17_523_996, cityPopulationSlug: 'buenosaires' },
  { id: 'catamarca', indecCode: '10', name: 'Catamarca', population2022: 429_562, cityPopulationSlug: 'catamarca' },
  { id: 'chaco', indecCode: '22', name: 'Chaco', population2022: 1_129_606, cityPopulationSlug: 'chaco' },
  { id: 'chubut', indecCode: '26', name: 'Chubut', population2022: 592_621, cityPopulationSlug: 'chubut' },
  { id: 'cordoba', indecCode: '14', name: 'Córdoba', population2022: 3_840_905, cityPopulationSlug: 'cordoba' },
  { id: 'corrientes', indecCode: '18', name: 'Corrientes', population2022: 1_212_696, cityPopulationSlug: 'corrientes' },
  { id: 'entre_rios', indecCode: '30', name: 'Entre Ríos', population2022: 1_425_578, cityPopulationSlug: 'entrerios' },
  { id: 'formosa', indecCode: '34', name: 'Formosa', population2022: 607_419, cityPopulationSlug: 'formosa' },
  { id: 'jujuy', indecCode: '38', name: 'Jujuy', population2022: 811_611, cityPopulationSlug: 'jujuy' },
  { id: 'la_pampa', indecCode: '42', name: 'La Pampa', population2022: 361_859, cityPopulationSlug: 'lapampa' },
  { id: 'la_rioja', indecCode: '46', name: 'La Rioja', population2022: 383_865, cityPopulationSlug: 'larioja' },
  { id: 'mendoza', indecCode: '50', name: 'Mendoza', population2022: 2_043_540, cityPopulationSlug: 'mendoza' },
  { id: 'misiones', indecCode: '54', name: 'Misiones', population2022: 1_278_873, cityPopulationSlug: 'misiones' },
  { id: 'neuquen', indecCode: '58', name: 'Neuquén', population2022: 710_814, cityPopulationSlug: 'neuquen' },
  { id: 'rio_negro', indecCode: '62', name: 'Río Negro', population2022: 750_768, cityPopulationSlug: 'rionegro' },
  { id: 'salta', indecCode: '66', name: 'Salta', population2022: 1_441_351, cityPopulationSlug: 'salta' },
  { id: 'san_juan', indecCode: '70', name: 'San Juan', population2022: 822_853, cityPopulationSlug: 'sanjuan' },
  { id: 'san_luis', indecCode: '74', name: 'San Luis', population2022: 542_069, cityPopulationSlug: 'sanluis' },
  { id: 'santa_cruz', indecCode: '78', name: 'Santa Cruz', population2022: 337_226, cityPopulationSlug: 'santacruz' },
  { id: 'santa_fe', indecCode: '82', name: 'Santa Fe', population2022: 3_544_908, cityPopulationSlug: 'santafe' },
  { id: 'santiago_del_estero', indecCode: '86', name: 'Santiago del Estero', population2022: 1_060_906, cityPopulationSlug: 'santiagodelestero' },
  { id: 'tierra_del_fuego', indecCode: '94', name: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', population2022: 185_732, cityPopulationSlug: 'tierradelfuego' },
  { id: 'tucuman', indecCode: '90', name: 'Tucumán', population2022: 1_731_820, cityPopulationSlug: 'tucuman' }
];

export const CENSUS_TERRITORIAL_SOURCES = {
  indecDefinitive: 'https://www.indec.gob.ar/indec/web/Nivel4-Tema-2-41-165?lang=es',
  indecRedatam: 'https://redatam.indec.gob.ar/redarg/CENSOS/CPV2022/Docs/codcart.htm',
  indecLocalitiesMetadata: 'https://geonode.indec.gob.ar/layers/geonode%3Alocalidades_censales/metadata_detail',
  conicetLocalitiesDataset: 'https://datosdeinvestigacion.conicet.gov.ar/handle/11336/274043'
};

export const CENSUS_2022_METHOD_NOTE =
  'El umbral de 10.000 habitantes se aplica a localidad censal/aglomerado del Censo 2022. Para tasas municipales se usa por separado el gobierno local competente, porque localidad censal y gobierno local no son necesariamente la misma unidad.';
