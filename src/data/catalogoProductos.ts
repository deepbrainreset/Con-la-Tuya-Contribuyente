export interface GenericProductCatalogItem {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  modelProductId?: string;
}

const rows: Array<[string, string, string[], string?]> = [
  ['leche', 'Leche', ['leche entera', 'leche descremada', 'sachet', 'larga vida'], 'leche'],
  ['pan', 'Pan', ['pan lactal', 'pan de mesa', 'pan francés', 'panificados'], 'pan'],
  ['nafta', 'Nafta / combustible', ['nafta super', 'nafta premium', 'gasolina', 'combustible'], 'combustible'],
  ['celular', 'Teléfono celular', ['smartphone', 'telefono movil', 'movil'], 'celular'],
  ['auto', 'Automóvil', ['auto', 'coche', 'vehiculo', 'sedan'], 'auto'],
  ['alquiler', 'Alquiler de vivienda', ['alquiler departamento', 'alquiler casa', 'renta vivienda'], 'alquiler'],
  ['electricidad', 'Electricidad residencial', ['luz', 'energia electrica', 'factura de luz'], 'servicios'],

  ['arroz', 'Arroz', ['arroz blanco', 'arroz integral']],
  ['fideos', 'Fideos / pastas secas', ['pasta', 'spaghetti', 'tallarines']],
  ['harina', 'Harina', ['harina de trigo', 'harina 000', 'harina 0000']],
  ['aceite', 'Aceite comestible', ['aceite girasol', 'aceite maiz', 'aceite oliva']],
  ['azucar', 'Azúcar', ['azucar blanca', 'azucar rubia']],
  ['yerba', 'Yerba mate', ['yerba']],
  ['cafe', 'Café', ['cafe molido', 'cafe instantaneo']],
  ['te', 'Té', ['te negro', 'te verde']],
  ['galletitas', 'Galletitas', ['galletas', 'cookies']],
  ['carne-vacuna', 'Carne vacuna', ['asado', 'vacio', 'nalga', 'carne']],
  ['pollo', 'Pollo', ['pollo entero', 'pechuga', 'pata muslo']],
  ['cerdo', 'Carne de cerdo', ['cerdo', 'bondiola', 'costeleta']],
  ['pescado', 'Pescado', ['merluza', 'salmon', 'pescados']],
  ['huevos', 'Huevos', ['huevo', 'docena de huevos']],
  ['queso', 'Queso', ['queso cremoso', 'queso pategras', 'quesos']],
  ['yogur', 'Yogur', ['yoghurt']],
  ['manteca', 'Manteca', ['mantequilla']],
  ['frutas', 'Frutas', ['manzana', 'banana', 'naranja', 'pera']],
  ['verduras', 'Verduras', ['tomate', 'lechuga', 'papa', 'cebolla', 'hortalizas']],
  ['agua', 'Agua embotellada', ['agua mineral', 'agua saborizada']],
  ['gaseosa', 'Gaseosa', ['refresco', 'soda']],

  ['detergente', 'Detergente', ['lavavajillas', 'detergente platos']],
  ['jabon', 'Jabón', ['jabon tocador', 'jabon blanco']],
  ['shampoo', 'Shampoo', ['champu']],
  ['papel-higienico', 'Papel higiénico', ['papel baño']],
  ['lavandina', 'Lavandina', ['lejia', 'hipoclorito']],
  ['limpiador', 'Limpiador multiuso', ['limpiador piso', 'desinfectante']],
  ['pañales', 'Pañales', ['pañal bebe', 'pañales descartables']],
  ['toallitas', 'Toallitas femeninas', ['toallas femeninas', 'apositos']],

  ['heladera', 'Heladera', ['refrigerador', 'nevera']],
  ['freezer', 'Freezer', ['congelador']],
  ['lavarropas', 'Lavarropas', ['lavadora']],
  ['secarropas', 'Secarropas', ['secadora']],
  ['microondas', 'Horno microondas', ['microondas']],
  ['horno', 'Horno eléctrico / a gas', ['horno electrico', 'horno gas']],
  ['cocina', 'Cocina', ['cocina a gas', 'anafe']],
  ['televisor', 'Televisor', ['tv', 'smart tv']],
  ['aire-acondicionado', 'Aire acondicionado', ['aire', 'split']],
  ['ventilador', 'Ventilador', ['ventilador pie', 'ventilador techo']],
  ['aspiradora', 'Aspiradora', ['aspirador']],
  ['cafetera', 'Cafetera', ['maquina de cafe']],
  ['licuadora', 'Licuadora', ['mixer']],
  ['tostadora', 'Tostadora', ['tostador']],

  ['notebook', 'Notebook / laptop', ['notebook', 'laptop', 'portatil']],
  ['computadora', 'Computadora de escritorio', ['pc', 'desktop', 'computadora']],
  ['monitor', 'Monitor', ['pantalla computadora']],
  ['tablet', 'Tablet', ['tableta']],
  ['impresora', 'Impresora', ['multifuncion']],
  ['router', 'Router Wi‑Fi', ['router', 'modem']],
  ['auriculares', 'Auriculares', ['audifonos', 'headphones']],
  ['parlante', 'Parlante', ['altavoz', 'speaker']],
  ['consola', 'Consola de videojuegos', ['playstation', 'xbox', 'nintendo', 'consola']],
  ['camara', 'Cámara fotográfica', ['camara digital', 'camara fotos']],

  ['zapatillas', 'Zapatillas', ['calzado deportivo', 'sneakers']],
  ['zapatos', 'Zapatos', ['calzado']],
  ['remera', 'Remera', ['camiseta', 't shirt']],
  ['pantalon', 'Pantalón', ['jean', 'vaquero']],
  ['campera', 'Campera', ['chaqueta', 'abrigo']],
  ['ropa-interior', 'Ropa interior', ['calzoncillo', 'bombacha', 'corpiño']],

  ['taladro', 'Taladro', ['taladro electrico', 'perforadora']],
  ['amoladora', 'Amoladora', ['esmeriladora']],
  ['destornillador', 'Destornillador', ['atornillador']],
  ['martillo', 'Martillo', ['maza']],
  ['sierra', 'Sierra eléctrica', ['sierra circular', 'caladora']],
  ['pintura', 'Pintura', ['latex', 'esmalte sintetico']],
  ['cemento', 'Cemento', ['bolsa cemento']],
  ['ladrillo', 'Ladrillos', ['ladrillo hueco', 'ladrillo comun']],
  ['ceramica', 'Cerámicos / porcelanato', ['ceramica piso', 'porcelanato']],

  ['bicicleta', 'Bicicleta', ['bici', 'mountain bike']],
  ['moto', 'Motocicleta', ['moto', 'scooter']],
  ['neumatico', 'Neumático', ['cubierta', 'neumaticos']],
  ['bateria-auto', 'Batería para automóvil', ['bateria auto']],
  ['aceite-motor', 'Aceite para motor', ['lubricante motor']],

  ['medicamento-venta-libre', 'Medicamento de venta libre', ['analgesico', 'ibuprofeno', 'paracetamol']],
  ['anteojos', 'Anteojos / lentes', ['lentes', 'gafas']],
  ['protector-solar', 'Protector solar', ['bloqueador solar']],
  ['pasta-dental', 'Pasta dental', ['dentifrico']],
  ['cepillo-dental', 'Cepillo dental', ['cepillo dientes']],

  ['mueble', 'Mueble', ['mesa', 'silla', 'placard', 'ropero']],
  ['colchon', 'Colchón', ['colchon espuma', 'colchon resortes']],
  ['sabana', 'Sábanas', ['sabana', 'juego sabanas']],
  ['toalla', 'Toallas', ['toallon', 'toalla baño']],

  ['internet', 'Servicio de Internet', ['fibra optica', 'banda ancha', 'wifi hogar']],
  ['telefonia', 'Servicio de telefonía móvil', ['plan celular', 'abono movil']],
  ['gas', 'Gas residencial', ['gas natural', 'factura gas']],
  ['agua-servicio', 'Servicio de agua corriente', ['agua corriente', 'factura agua']],
  ['streaming', 'Servicio de streaming', ['video streaming', 'suscripcion digital']],
  ['gimnasio', 'Cuota de gimnasio', ['gym', 'gimnasio']],
  ['restaurante', 'Comida en restaurante', ['restaurant', 'salida a comer']],
  ['hotel', 'Alojamiento en hotel', ['hotel', 'hospedaje']],
  ['pasaje-bus', 'Pasaje de ómnibus', ['micro larga distancia', 'bus']],
  ['pasaje-avion', 'Pasaje aéreo', ['vuelo', 'avion']],
];

const CATEGORY_BY_ID: Record<string, string> = {
  leche: 'Alimentos y bebidas', pan: 'Alimentos y bebidas', nafta: 'Transporte', celular: 'Tecnología', auto: 'Transporte', alquiler: 'Vivienda', electricidad: 'Servicios del hogar',
  arroz: 'Alimentos y bebidas', fideos: 'Alimentos y bebidas', harina: 'Alimentos y bebidas', aceite: 'Alimentos y bebidas', azucar: 'Alimentos y bebidas', yerba: 'Alimentos y bebidas', cafe: 'Alimentos y bebidas', te: 'Alimentos y bebidas', galletitas: 'Alimentos y bebidas', 'carne-vacuna': 'Alimentos y bebidas', pollo: 'Alimentos y bebidas', cerdo: 'Alimentos y bebidas', pescado: 'Alimentos y bebidas', huevos: 'Alimentos y bebidas', queso: 'Alimentos y bebidas', yogur: 'Alimentos y bebidas', manteca: 'Alimentos y bebidas', frutas: 'Alimentos y bebidas', verduras: 'Alimentos y bebidas', agua: 'Alimentos y bebidas', gaseosa: 'Alimentos y bebidas',
  detergente: 'Limpieza y cuidado personal', jabon: 'Limpieza y cuidado personal', shampoo: 'Limpieza y cuidado personal', 'papel-higienico': 'Limpieza y cuidado personal', lavandina: 'Limpieza y cuidado personal', limpiador: 'Limpieza y cuidado personal', pañales: 'Limpieza y cuidado personal', toallitas: 'Limpieza y cuidado personal',
  heladera: 'Electrodomésticos', freezer: 'Electrodomésticos', lavarropas: 'Electrodomésticos', secarropas: 'Electrodomésticos', microondas: 'Electrodomésticos', horno: 'Electrodomésticos', cocina: 'Electrodomésticos', televisor: 'Electrodomésticos', 'aire-acondicionado': 'Electrodomésticos', ventilador: 'Electrodomésticos', aspiradora: 'Electrodomésticos', cafetera: 'Electrodomésticos', licuadora: 'Electrodomésticos', tostadora: 'Electrodomésticos',
  notebook: 'Tecnología', computadora: 'Tecnología', monitor: 'Tecnología', tablet: 'Tecnología', impresora: 'Tecnología', router: 'Tecnología', auriculares: 'Tecnología', parlante: 'Tecnología', consola: 'Tecnología', camara: 'Tecnología',
  zapatillas: 'Indumentaria', zapatos: 'Indumentaria', remera: 'Indumentaria', pantalon: 'Indumentaria', campera: 'Indumentaria', 'ropa-interior': 'Indumentaria',
  taladro: 'Ferretería y construcción', amoladora: 'Ferretería y construcción', destornillador: 'Ferretería y construcción', martillo: 'Ferretería y construcción', sierra: 'Ferretería y construcción', pintura: 'Ferretería y construcción', cemento: 'Ferretería y construcción', ladrillo: 'Ferretería y construcción', ceramica: 'Ferretería y construcción',
  bicicleta: 'Transporte', moto: 'Transporte', neumatico: 'Transporte', 'bateria-auto': 'Transporte', 'aceite-motor': 'Transporte',
  'medicamento-venta-libre': 'Salud', anteojos: 'Salud', 'protector-solar': 'Salud', 'pasta-dental': 'Salud', 'cepillo-dental': 'Salud',
  mueble: 'Hogar', colchon: 'Hogar', sabana: 'Hogar', toalla: 'Hogar',
  internet: 'Servicios', telefonia: 'Servicios', gas: 'Servicios del hogar', 'agua-servicio': 'Servicios del hogar', streaming: 'Servicios', gimnasio: 'Servicios', restaurante: 'Servicios', hotel: 'Servicios', 'pasaje-bus': 'Transporte', 'pasaje-avion': 'Transporte'
};

export const GENERIC_PRODUCT_CATALOG: GenericProductCatalogItem[] = rows.map(([id, name, aliases, modelProductId]) => ({
  id,
  name,
  aliases,
  modelProductId,
  category: CATEGORY_BY_ID[id] || 'Otros'
}));

export const normalizeProductSearch = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();
