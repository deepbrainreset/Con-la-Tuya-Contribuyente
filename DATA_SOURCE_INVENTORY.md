# DATA_SOURCE_INVENTORY.md
## Con La Tuya, Contribuyente — Inventario de Fuentes de Datos y Evidencia

---

## 1. Fuentes Actualmente Integradas en el Repositorio

| Archivo en Repo | Entidad / Serie | Fuentes Primarias / Secundarias Citadas | Nivel Evidencia | Período Cubierto | Estado |
|---|---|---|---|---|---|
| [`src/data/tributos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/tributos.ts) | 14 Tributos (5 Nacionales, 4 Provinciales, 5 Municipales) | InfoLEG (Leyes 20.631, 20.628, 23.966, 22.415, 27.541), ARBA (Ley 10.397), AGIP, Ordenanzas Municipales | A (Nac/PBA), B (CABA/Rosario), C (Mun), D (1 demo explícito) | 1973–2026 | **EXISTENTE** |
| [`src/data/inflacion.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/inflacion.ts) | Serie histórica IPC anual y mensual | INDEC (informes técnicos IPC), IRI UNLP, Banco Mundial (`FP.CPI.TOTL.ZG`), IPC Congreso (2007–2015) | Oficial / Oficial con reserva / Referencia | 1983–2026 (sep) | **EXISTENTE** |
| [`src/data/gastoPublico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/gastoPublico.ts) | Presupuesto Nacional, PBA, Pauta Oficial, Compras | Boletín Oficial (Ley 27.798 Presupuesto 2026), Ministerio Economía PBA (Ley 15.557), Jefatura de Gabinete (Pauta 2021–2022, Res. 57/2025), COMPR.AR (Proceso 41-0009-CDI26) | A (Leyes y Pauta histórica), Parcial (Compra en evaluación) | 2021–2022 y 2026 | **PARCIAL** |
| [`src/data/transparenciaPolitica.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/transparenciaPolitica.ts) | 6 Perfiles Políticos y Patrimoniales | Argentina.gob.ar, Oficina Anticorrupción, Portal GCBA (DDJJ 2023/2024 Jorge Macri), Actas HCDN (Acta 5274) | A (Fuentes oficiales; salarios en `null` por falta de recibo individualizado) | 2023–2026 | **PARCIAL** |
| [`src/data/autoridadesEjecutivas2026.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/autoridadesEjecutivas2026.ts) | 25 Autoridades Ejecutivas (Presidente, GCBA, 23 Gobernadores) | Nómina oficial `argentina.gob.ar/provincias` y portales provinciales | A (Cargo y mandato), Parcial (Patrimonio/Salario vacíos) | Mandatos vigentes en 2026 | **PARCIAL** |
| [`src/data/integridadPartidaria.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/integridadPartidaria.ts) | 45 Partidos Nacionales + 4 Alianzas Históricas | Cámara Nacional Electoral (CNE), Cartas Orgánicas publicadas, CIJ / PJN | B (Listado CNE pendiente de cotejo de vigencia 2026; `denominatorReliable: false`) | 1983–2026 | **PARCIAL** |
| [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts) | Votaciones nominales HCDN | Portal de Votaciones Nominales HCDN (`votaciones.hcdn.gob.ar/pdf/acta/5274`) | A (Acta oficial) | 28/06/2024 (1 sesión) | **PARCIAL (Mínimo)** |
| [`src/data/jurisdictions.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/jurisdictions.ts) | 15 Jurisdicciones (Nación, CABA, 4 Provincias, 9 Municipios) | MECON, leyes de presupuesto provinciales y ordenanzas municipales | A (5), B (7), C (3) | 2024–2026 | **PARCIAL** |
| [`src/data/censo2022Territorial.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/censo2022Territorial.ts) + [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts) | Población 24 jurisdicciones + Localidades ≥ 10.000 hab. | INDEC Censo 2022 (CPV2022), Repositorio CONICET (`11336/274043`), API Georef (`apis.datos.gob.ar`), espejo operativo `citypopulation.de` | A (Población provincial y centroides Georef) | Censo 2022 | **EXISTENTE** |
| [`src/data/transparenciaEstado.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/transparenciaEstado.ts) | Matriz de 12 dimensiones de transparencia estatal | Presupuesto Abierto, MECON Consolidado Provincial, COMPR.AR | A–B (Relevamiento al 2026-09-13) | 2024–2026 | **PARCIAL** |
| [`src/data/mapaTributarioData.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/mapaTributarioData.ts) | Base relacional en memoria/localStorage para Mapa Tributario | InfoLEG (Ley 20.631, Ley 20.628, Ley 24.468 de 1995, Ley 27.743 de 2024), HCDN | A | 1973, 1995, 2024–2026 | **PARCIAL** |
| [`src/data/impactoTributarioPolitico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/impactoTributarioPolitico.ts) | 8 Perfiles de incidencia económica y origen normativo | InfoLEG (Leyes 20.631, 25.413, 24.674, 23.966, 20.628), ARBA | A–B | 1973–2026 | **EXISTENTE** |
| [`src/data/cadenaTributaria.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/cadenaTributaria.ts) | 4 Cadenas de valor (leche, pan, combustible, celular) | Estimaciones pedagógicas explicativas (declaradas explícitamente en código) | Estimación educativa | Referencia actual | **PARCIAL (Estimado)** |
| [`src/data/productos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/productos.ts) | 7 Productos de consumo con desglose impositivo | Estimaciones sin `sourceUrl` ni `lastVerified` explícito | Estimación sin fuente individual | ~2025–2026 | **DEFECTUOSA (Falta metadato de fecha/fuente)** |

---

## 2. Catálogo Maestro de Fuentes Primarias para el Motor de Investigación (1946–Actualidad)

| Código | Organismo / Repositorio | Dominio Oficial | Cobertura Temporal | Tipo de Acceso | Uso en el Observatorio |
|---|---|---|---|---|---|
| `SRC-BO` | Boletín Oficial de la República Argentina | `boletinoficial.gob.ar` | 1893–Actualidad (Digitalizado 1946+) | Web / PDF Oficial | Leyes, decretos, decisiones administrativas, designaciones y contrataciones |
| `SRC-INFOLEG` | InfoLEG — Información Legislativa y Documental | `servicios.infoleg.gob.ar` | 1853–Actualidad | Web / Texto actualizado e histórico | Texto completo de leyes, normas que modifican o derogan tributos y reformas |
| `SRC-PRESUPUESTO` | Presupuesto Abierto / Oficina Nacional de Presupuesto | `presupuestoabierto.gob.ar` / `economia.gob.ar/onp` | 2007–Actualidad (API) / 1946–2006 (Cuentas de Inversión) | API REST / CSV / PDF | Crédito inicial, vigente, comprometido, devengado y pagado por jurisdicción y programa |
| `SRC-CGN` | Contaduría General de la Nación — Cuenta de Inversión | `economia.gob.ar/hacienda/cgn` | 1946–Actualidad | Documentos oficiales / PDF | Ejecución efectiva anual de la Administración Nacional |
| `SRC-ARCA` | ARCA (ex AFIP / DGI / Aduana) — Series de Recaudación | `afip.gob.ar` / `datos.gob.ar` | 1950–Actualidad | Series XLS / CSV / Informes | Recaudación por impuesto, aportes de seguridad social y derechos aduaneros |
| `SRC-COPART` | Dirección Nacional de Asuntos Provinciales (DNAP) | `economia.gob.ar/dnap` | 1988 (Ley 23.548)–Actualidad + antecedentes | XLS / CSV / API | Transferencias automáticas y no automáticas a las 23 provincias y CABA |
| `SRC-HCDN` | Honorable Cámara de Diputados de la Nación | `hcdn.gob.ar` / `votaciones.hcdn.gob.ar` | 1983–Actualidad (Actas nominales 2002+) | Portal de Actas PDF / Datos Abiertos | Autores de proyectos, despachos de comisión y votaciones nominales |
| `SRC-HSN` | Honorable Senado de la Nación | `senado.gob.ar` | 1983–Actualidad | Actas de votación / Diario de Sesiones | Votaciones nominales, proyectos y versiones taquigráficas |
| `SRC-ANSES` | ANSES — Boletín Estadístico de la Seguridad Social (BESS) | `anses.gob.ar` / `trabajo.gob.ar` | 1994–Actualidad (+ series INPS 1946–1993) | PDF / XLS | Haberes, beneficiarios de jubilaciones, pensiones, moratorias y traspaso SIPA (Ley 26.425) |
| `SRC-COMPRAR` | COMPR.AR y CONTRAT.AR | `comprar.gob.ar` / `contratar.gob.ar` | 2016–Actualidad | Pliegos y Actas públicas | Licitaciones, comparativas de precios, adjudicaciones y órdenes de compra |
| `SRC-AGN-SIGEN` | Auditoría General de la Nación / SIGEN | `agn.gob.ar` / `sigen.gob.ar` | 1992–Actualidad | Informes de auditoría aprobados (PDF) | Resultados verificados, observaciones de ejecución y hallazgos de auditoría |
| `SRC-CONICET` | CONICET Digital y SICYTAR | `ri.conicet.gov.ar` / `conicet.gov.ar` | 1958 (Decreto-Ley 1291/58)–Actualidad | Repositorio OAI-PMH / Memorias anuales | Proyectos financiados, becas, investigadores y producción científica verificable |
| `SRC-SPU` | Secretaría de Políticas Universitarias — Anuarios Estadísticos | `argentina.gob.ar/educacion/universidades` | 1996–Actualidad (+ series históricas) | Anuarios PDF / XLS | Presupuesto transferido por universidad nacional, matrícula, egresados y planta docente |
| `SRC-INDEC-BCRA` | INDEC y Banco Central (BCRA) | `indec.gob.ar` / `bcra.gob.ar` | 1946–Actualidad | API Series de Tiempo (`apis.datos.gob.ar/series`) | Índices de precios, tipo de cambio histórico, agregados monetarios y deuda |
