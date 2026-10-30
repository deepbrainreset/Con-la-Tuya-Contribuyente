# TEST_REPORT.md
## Con La Tuya, Contribuyente — Informe de Pruebas, Compilación y Verificación

**Fecha de ejecución:** 2026-10-30 | **Rama de trabajo:** `feat/observatorio-historico-1946-2026` | **Node.js:** `v22.14.0`

---

## 1. Resumen de Ejecución

| Verificación | Comando | Resultado | Detalle |
|---|---|---|---|
| **Typecheck Estático (TypeScript 5.8)** | `npm run lint` (`tsc --noEmit`) | ✅ **PASS (Exit Code 0)** | 0 errores de tipos en los archivos de código, vistas, tipos canónicos, servidor y scripts. |
| **Suite de Integridad de Datos, Reglas Editoriales y SSR** | `npm test` ([`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts)) | ✅ **PASS (11/11 pruebas)** | Verifica fuentes oficiales, serie 1946–2026, no-duplicación de transferencias, expedientes piloto, comparador de declaraciones, auditorías temáticas, cobertura federal completa (24 distritos), sesiones nominales parlamentarias, parámetros de calculadora y SSR. |
| **Build de Producción Frontend (Vite 6)** | `vite build` | ✅ **PASS** | Módulos transformados con code-splitting activo por ruta (`ObservatorioHistorico`, `DeclaracionesComparador`, `AuditoriasTematicas`, `ResponsabilidadPolitica`, `CalculadoraFiscal`, etc.). |
| **Prerenderizado SSR de Portada** | `node --import tsx scripts/prerender.tsx` | ✅ **PASS** | `dist/index.html` hidratado con `#landing-view`, enlace de accesibilidad (`Saltar al contenido principal`), las 6 preguntas ciudadanas de entrada y la navegación en 5 pilares. |
| **Bundle de Servidor Express (esbuild)** | `esbuild server.ts ... --outfile=dist/server.cjs` | ✅ **PASS** | `dist/server.cjs` + sourcemap generados sin errores. |

---

## 2. Detalle de las 11 Pruebas Automatizadas ([`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts))

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

---

## 3. Correcciones y Mejoras de Backlog Aplicadas

1. **Error de tipado preexistente en [`src/views/PropuestasContribucion.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/PropuestasContribucion.tsx):** El primer elemento precargado tenía `scope: 'tributos'` en lugar de `'tributo'`, violando la unión `'jurisdiccion' | 'tributo' | 'politico'` definida en [`src/types.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types.ts). Corregido y verificado con `tsc --noEmit`.
2. **Endurecimiento de [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts):** Se añadieron cabeceras de seguridad HTTP (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), control de CORS, limitación de tasa por IP en memoria (`createRateLimiter`) para `/api/visits/increment` y `/api/censo/localidades`, límite de payload JSON (`64kb`), endpoint de estado `/api/observatorio/health` y puerto configurable vía `process.env.PORT`.
3. **Trazabilidad en [`src/data/productos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/productos.ts) y [`src/data/parametrosCalculadoraFiscal.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/parametrosCalculadoraFiscal.ts):** Se agregaron campos explícitos `referencePeriod`, `currency: 'ARS'`, `epistemicStatus: 'estimacion'`, `lastVerified` y `normativeSourceUrl` a los 7 productos del simulador, y se externalizaron los parámetros normativos de [`src/views/CalculadoraFiscal.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/CalculadoraFiscal.tsx) (Ley 24.241, Ley 19.032, Ley 23.660, Ley 27.743, Ley 20.631).
4. **Cobertura Federal Completa en [`src/data/jurisdictions.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/jurisdictions.ts) y [`src/views/MapaNacional.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/MapaNacional.tsx):** Se incorporaron las 19 provincias restantes con sus gobernadores, coaliciones y portales oficiales verificados sin inventar cifras presupuestarias no auditadas.
5. **Ampliación de Votaciones Nominales Históricas en [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts) y [`src/views/ResponsabilidadPolitica.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ResponsabilidadPolitica.tsx):** Se incorporaron 7 sesiones históricas clave (Ley 27.743 Ganancias 2024, Ley 27.742 Bases 2024, Ley 27.725 Ganancias 2023, Ley 27.705 Moratoria 2023, Ley 27.541 Impuesto PAIS 2019, Ley 26.741 Expropiación 51% YPF 2012 y Ley 26.425 SIPA/AFJP 2008).
6. **SEO Dinámico y Accesibilidad en [`src/App.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/App.tsx):** Se añadieron actualización dinámica de `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<link rel="canonical">` por ruta y enlace de salto accesible (`Saltar al contenido principal`).
