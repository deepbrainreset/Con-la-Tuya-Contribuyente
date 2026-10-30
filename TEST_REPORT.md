# TEST_REPORT.md
## Con La Tuya, Contribuyente — Informe de Pruebas, Compilación y Verificación

**Fecha de ejecución:** 2026-10-30 | **Rama de producción:** `main` (`origin/main`) | **Node.js:** `v22.14.0`

---

## 1. Resumen de Ejecución

| Verificación | Comando | Resultado | Detalle |
|---|---|---|---|
| **Typecheck Estático (TypeScript 5.8)** | `npm run lint` (`tsc --noEmit`) | ✅ **PASS (Exit Code 0)** | 0 errores de tipos en los archivos de código, vistas, tipos canónicos, servidor y scripts. |
| **Suite de Integridad de Datos, Reglas Editoriales y SSR** | `npm test` ([`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts)) | ✅ **PASS (14/14 pruebas)** | Verifica fuentes oficiales, serie 1946–2026, no-duplicación de transferencias, expedientes piloto, comparador de declaraciones, auditorías temáticas, cobertura federal completa (24 distritos), sesiones nominales parlamentarias, parámetros de calculadora, contraste Evidencia vs. Relato, Blog de Congruencia en Archivo TV/YouTube, Facturas Conceptuales de Servicios + Subsidios AMBA vs. Interior y SSR. |
| **Build de Producción Frontend (Vite 6)** | `vite build` | ✅ **PASS** | Módulos transformados con code-splitting activo por ruta (`ObservatorioHistorico`, `DeclaracionesComparador`, `BlogCongruencia`, `AuditoriasTematicas`, `ContrasteEvidencia`, `FacturasServiciosSubsidios`, `ResponsabilidadPolitica`, `CalculadoraFiscal`, etc.). |
| **Prerenderizado SSR de Portada** | `node --import tsx scripts/prerender.tsx` | ✅ **PASS** | `dist/index.html` hidratado con `#landing-view`, enlace de accesibilidad (`Saltar al contenido principal`), las 6 preguntas ciudadanas de entrada y la navegación en 5 pilares. |
| **Bundle de Servidor Express (esbuild)** | `esbuild server.ts ... --outfile=dist/server.cjs` | ✅ **PASS** | `dist/server.cjs` + sourcemap generados sin errores. |

---

## 2. Detalle de las 14 Pruebas Automatizadas ([`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts))

| # | Caso de Prueba | Estado | Evidencia Verificada |
|---|---|---|---|
| 1 | Tributos auditados con fuente oficial y fecha de verificación | ✅ **PASS** | 12 tributos reales verificados con URL oficial (`http://` / `https://`) y `lastVerified` válido; 1 registro demo explícito (`isBaseDemo: true`). |
| 2 | Serie de inflación 1983–2026 e integridad metodológica año 2016 | ✅ **PASS** | 43 puntos históricos verificados; `2016` preserva `official: null` (sin imputar dato nacional inexistente). |
| 3 | Cobertura histórica continua 1946–2026 y eliminación de transferencias intergubernamentales | ✅ **PASS** | 7 períodos presidenciales/constitucionales (1946–2026) y 11 puntos fiscales con `intergovernmentalEliminationApplied: true`. |
| 4 | Expedientes piloto obligatorios (SIPA 2008, YPF, Moratorias, Ganancias 2024, CONICET, COMPR.AR) | ✅ **PASS** | 6 expedientes interactivos completos con marco normativo, registros monetarios con etapa presupuestaria, intervenciones por rol e indicadores de resultado. |
| 5 | Regla editorial: No equiparar presupuesto aprobado con gasto ejecutado ni licitación con sobreprecio | ✅ **PASS** | Presupuesto aprobado de Nación (Ley 27.798) y PBA (Ley 15.557) separado de ejecución (`executedBudget: null`), y proceso COMPR.AR `41-0009-CDI26` marcado como `no_concluyente`. |
| 6 | Archivo de declaraciones y comparador contextual con citas, fechas, fuentes y contexto | ✅ **PASS** | 7 declaraciones públicas documentadas y 4 dossieres de comparación contextual con citas textuales, fechas, cargos y explicaciones públicas. |
| 7 | Auditorías temáticas (Previsional, Universidades, CONICET, Salud/Educación, Subsidios, Compras) | ✅ **PASS** | 6 auditorías temáticas sectoriales con métricas físicas verificadas y limitaciones explícitas de medición. |
| 8 | Trazabilidad en productos, autoridades, plantillas Ley 27.275 y bitácora de correcciones | ✅ **PASS** | 7 productos con `epistemicStatus: 'estimacion'`, 25 autoridades ejecutivas, 3 plantillas de solicitud de información pública (Ley 27.275) y 3 registros en la bitácora de correcciones. |
| 9 | Arquitectura de navegación en 5 pilares y renderizado SSR sin errores | ✅ **PASS** | `NAVIGATION_PILLARS` contiene las 5 secciones principales y `renderToString(<AppContent />)` genera el HTML de portada con las 6 preguntas ciudadanas. |
| 10 | Cobertura federal completa (Nación + 23 provincias + CABA + municipios) en `JURISDICTIONS` | ✅ **PASS** | 1 Nación + 24 distritos federales (23 provincias + CABA) + 31 municipios verificados (56 jurisdicciones totales en [`src/data/jurisdictions.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/jurisdictions.ts)). |
| 11 | Archivo de votaciones nominales parlamentarias y parámetros normativos de calculadora fiscal | ✅ **PASS** | 7 sesiones nominales parlamentarias históricas en [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts) y 5 parámetros normativos con fuente legal en [`src/data/parametrosCalculadoraFiscal.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/parametrosCalculadoraFiscal.ts). |
| 12 | Módulo de Contraste «Evidencia del Proceso vs. Relato Mediático» con trazabilidad normativa y multiperspectiva | ✅ **PASS** | 6 dossieres de contraste en [`src/data/contrasteEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/contrasteEvidencia.ts) (incluyendo trazabilidad SIGEN/AGN/PTN 2022 vs. 2024 en Universidades Nacionales). |
| 13 | Blog de Congruencia Política y Archivos de TV/YouTube con escrutinio multipartidario | ✅ **PASS** | 6 entradas multipartidarias en [`src/data/blogCongruencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/blogCongruencia.ts) con archivos de TV/YouTube y registros oficiales verificables. |
| 14 | Desglose de Facturas de Servicios, Impuestos en Cascada y Subsidios Históricos AMBA vs. Interior | ✅ **PASS** | 3 facturas conceptuales (Luz, Agua, ABL/Inmobiliario), 4 impuestos repetitivos/cascada y 8 hitos históricos 2001–2026 en [`src/data/facturasServiciosSubsidios.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/facturasServiciosSubsidios.ts). |
