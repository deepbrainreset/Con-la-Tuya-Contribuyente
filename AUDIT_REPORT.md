# AUDIT_REPORT.md
## Con La Tuya, Contribuyente — Informe de Auditoría Técnica
**Versión:** 1.0 | **Fecha:** 2026-10-29 | **Repositorio:** `deepbrainreset/Con-la-Tuya-Contribuyente`

---

> [!IMPORTANT]
> Esta auditoría fue realizada sobre el repositorio público de GitHub sin clonar el código localmente. Todo el análisis está basado en la lectura directa de los 47 archivos del repositorio vía API de GitHub.

---

## 1. Resumen Ejecutivo

El proyecto se encuentra en un estado de **desarrollo temprano funcional**. Tiene una arquitectura sólida, ningún dato ficticio presentado como real, buenas prácticas editoriales en los archivos de datos, y una base técnica coherente. Sin embargo, presenta **dos vulnerabilidades de seguridad críticas** en el servidor, **ausencia total de tests automatizados**, y una **cobertura de datos muy parcial** respecto a la visión del producto.

| Dimensión | Estado general |
|-----------|---------------|
| Arquitectura técnica | ✅ SÓLIDA |
| Seguridad del servidor | 🔴 DEFECTUOSA |
| Calidad de datos | ✅ BUENA (sin ficticios) |
| Cobertura de datos | ⚠️ PARCIAL |
| SEO | ⚠️ PARCIAL |
| Accesibilidad | ⚠️ PARCIAL |
| Tests automatizados | 🔴 AUSENTE |
| CI/CD | ⚠️ PARCIAL |
| Documentación interna | ⚠️ PARCIAL |

---

## 2. Stack Tecnológico Confirmado

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| React | 19.x | Frontend UI |
| TypeScript | ~5.8.2 | Tipado estático |
| Vite | ^6.2.3 | Bundler / Dev server |
| Tailwind CSS | ^4.1.14 (vite plugin) | Estilos |
| React Router | ^7.15.1 + HashRouter | Routing SPA |
| Recharts | ^3.8.1 | Gráficos |
| Leaflet + react-leaflet | 1.9.4 + 5.0.0 | Mapas interactivos |
| Express | ^4.21.2 | Servidor backend |
| Node.js | 22 (CI) | Runtime |
| Motion | ^12.23.24 | Animaciones |
| Lucide React | ^0.546.0 | Iconos |
| `@google/genai` | ^2.4.0 | SDK Gemini (instalado, sin uso activo) |
| dotenv | ^17.2.3 | Variables de entorno |
| tsx | runtime | Dev server (ejecuta server.ts directamente) |
| esbuild | build | Compilación del server para producción |

**Scripts npm:**
- `dev` → `tsx server.ts` (Express sirve Vite en desarrollo)
- `build` → Vite build + prerenderizado SSR + esbuild server
- `start` → `node dist/server.cjs`
- `lint` → `tsc --noEmit` (solo typecheck, sin ESLint)

---

## 3. Inventario de Vistas

| Ruta | Componente | Estado | Datos reales | Importaciones |
|------|-----------|--------|--------------|---------------|
| `/` | `Landing.tsx` | ✅ EXISTENTE | ✅ Sí | ✅ OK |
| `/mapa` | `MapaNacional.tsx` | ✅ EXISTENTE | ✅ Sí (Leaflet + jurisdictions) | ✅ OK |
| `/tributos` | `RegistroTributosAuditado.tsx` | ✅ EXISTENTE | ✅ Sí | ✅ OK |
| `/inflacion` | `Inflacion.tsx` | ✅ EXISTENTE | ✅ Sí (41 puntos históricos) | ✅ OK |
| `/responsabilidad-politica` | `ResponsabilidadPolitica.tsx` | ⚠️ PARCIAL | ⚠️ Mixto | ✅ OK |
| `/calculadora` | `CalculadoraFiscal.tsx` | ⚠️ PARCIAL | ⚠️ Tasas hardcodeadas | ✅ OK |
| `/simulador` | `SimuladorPrecios.tsx` (wrapper) | ✅ EXISTENTE | ✅ (via Core) | ✅ OK |
| `/politicos` | `RegistroPolitico.tsx` | ⚠️ PARCIAL | ⚠️ Solo 6 perfiles, salarios null | ✅ OK |
| `/partidos` | `IntegridadPartidaria.tsx` | ⚠️ PARCIAL | ✅ (45 partidos, pendiente vigencia) | ✅ OK |
| `/gasto` | `GastoPublico.tsx` | ⚠️ PARCIAL | ✅ (2 jurisdicciones, ejecución null) | ✅ OK |
| `/transparencia` | `TransparenciaEstado.tsx` | ⚠️ PARCIAL | ✅ (12 dimensiones, 5/12 verificadas Nación) | ✅ OK |
| `/metodologia` | `MethodologyPage.tsx` | ✅ EXISTENTE | Estático | ✅ OK |
| `/contribucion` | `PropuestasContribucion.tsx` | ✅ EXISTENTE | Estático | ✅ OK |
| `/donacion` | `Donaciones.tsx` | ✅ EXISTENTE | Alias hardcodeado | ✅ OK |
| `/mapa-tributario` | `MapaTributarioDashboard.tsx` | ⚠️ PARCIAL | ✅ (2 tributos completos en schema) | ✅ OK |
| `/admin/mapa-tributario` | `MapaTributarioDashboard.tsx` | ⚠️ DEFECTUOSA | — | ✅ OK |

**No se detectaron imports rotos en ningún archivo.**

---

## 4. Problemas por Severidad

### 🔴 CRÍTICO

| # | Problema | Archivo | Evidencia | Solución propuesta |
|---|---------|---------|-----------|-------------------|
| C-01 | **Sin middleware CORS** — Express acepta peticiones de cualquier origen | `server.ts` | Express sin `cors()` instalado | Instalar `cors`, configurar allowlist de orígenes |
| C-02 | **Sin rate limiting** — `/api/visits/increment` y `/api/censo/localidades` susceptibles a abuso | `server.ts` | Sin `express-rate-limit` ni equivalente | Instalar `express-rate-limit`, límites por IP |
| C-03 | **Sin tests automatizados** — No hay jest, vitest, playwright ni ningún framework de tests | repo completo | package.json sin test runner | Configurar Vitest para unitarios, Playwright para E2E |

### 🟠 ALTO

| # | Problema | Archivo | Evidencia | Solución propuesta |
|---|---------|---------|-----------|-------------------|
| A-01 | **Panel admin sin autenticación** — `/admin/mapa-tributario` accesible por cualquier persona con la URL | `App.tsx`, `MapaTributarioDashboard.tsx` | Solo tab UI diferente, sin guard de ruta | Agregar auth simple (token ENV o BasicAuth) |
| A-02 | **Sin Helmet** — Headers de seguridad HTTP ausentes (X-Frame-Options, CSP, etc.) | `server.ts` | Express sin `helmet()` | `npm install helmet && app.use(helmet())` |
| A-03 | **Sin ESLint ni Prettier** — Calidad de código no automatizada | repo completo | `package.json` lint = solo tsc | Configurar ESLint + Prettier con reglas mínimas |
| A-04 | **Gemini SDK instalado sin uso documentado** — dependencia activa sin endpoint que la consuma | `package.json`, `server.ts` | `@google/genai ^2.4.0` en deps, 0 usos en server.ts | Implementar o remover para reducir superficie de ataque |

### 🟡 MEDIO

| # | Problema | Archivo | Evidencia | Solución propuesta |
|---|---------|---------|-----------|-------------------|
| M-01 | **HashRouter impide indexación de rutas internas** — Solo la portada está prerenderizada | `App.tsx` | HashRouter, sitemap.xml solo homepage | Evaluar migración a BrowserRouter + SSR/Prerender per-route |
| M-02 | **CalculadoraFiscal con valores desactualizables** — Piso Ganancias, tasas sociales y patrimoniales hardcodeados | `CalculadoraFiscal.tsx` | `$1.800.000` piso, `11%` jubilación hardcoded | Mover a archivo de datos con `lastVerified` y fuente |
| M-03 | **productos.ts sin trazabilidad** — Precios sin `lastVerified` ni `sourceUrl` | `productos.ts` | 7 productos sin fecha ni fuente URL | Agregar campos obligatorios de trazabilidad |
| M-04 | **POLITICAL_TRANSPARENCY insuficiente** — 6 perfiles, todos con salary/assets null | `transparenciaPolitica.ts` | profileStatus = 'partial' para todos | Completar con datos de DDJJ publicadas en OA |
| M-05 | **Solo 16 de 36 jurisdicciones cargadas** — Faltan 20 provincias | `jurisdictions.ts` | Comentario explícito en archivo | Pipeline de carga progresiva |
| M-06 | **ComponenteMapaTributario monolítico** — 127 KB / ~2500 líneas, mantenimiento difícil | `MapaTributarioDashboard.tsx` | Tamaño del archivo | Refactorizar en sub-componentes |

### 🟢 BAJO / INFO

| # | Problema | Archivo | Evidencia | Solución propuesta |
|---|---------|---------|-----------|-------------------|
| B-01 | Caché en memoria (se pierde en restart) | `server.ts` | `Map` en memoria | Redis o caché en filesystem para persistencia |
| B-02 | Puerto 3000 hardcodeado | `server.ts` | `const PORT = 3000` | `process.env.PORT \|\| 3000` |
| B-03 | Sitemap.xml solo lista homepage | `public/sitemap.xml` | Archivo inspeccionado | Generar sitemap dinámico con rutas principales |
| B-04 | Nav items activos sin `aria-current` | `Navbar.tsx` | Revisión de JSX | Agregar `aria-current="page"` al item activo |
| B-05 | Tablas de datos sin `<caption>` ni `scope` | Múltiples vistas | Revisión de JSX | Agregar por accesibilidad screen readers |
| B-06 | `visitCount` seed hardcodeado en 24.153 | `server.ts` | `let visitCount = 24153` | Sin impacto funcional; solo cosmético |
| B-07 | 1 sola compra pública registrada, 1 sola sesión parlamentaria | `gastoPublico.ts`, `votacionesParlamentarias.ts` | Conteo de registros | Completar con más datos reales |

---

## 5. Inventario de Componentes

| Componente | Tamaño | Estado | Descripción |
|-----------|--------|--------|-------------|
| `Navbar.tsx` | 5.977 B | ✅ EXISTENTE | 15 items de navegación, sticky, responsive, badge visitas |
| `EvidenceBadge.tsx` | 4.409 B | ✅ EXISTENTE | Badge nivel evidencia A/B/C/D con tooltip |
| `TrazabilidadPoliticoFiscal.tsx` | 5.423 B | ✅ EXISTENTE | Componente de trazabilidad de tributos a decisiones políticas |
| `ComparadorTerritorial.tsx` | 15.061 B | ✅ EXISTENTE | Comparador inter-municipal de impuestos (usa `/api/censo/localidades`) |

---

## 6. Backend — Endpoints

| Método | Ruta | Descripción | Auth | Rate limit |
|--------|------|-------------|------|-----------|
| `GET` | `/api/visits` | Retorna `{ views: number }` | ❌ | ❌ |
| `POST` | `/api/visits/increment` | Incrementa y persiste contador | ❌ | ❌ |
| `GET` | `/api/censo/localidades?provinceId=X` | Localidades ≥10k hab (scraping citypopulation.de + Georef) | ❌ | ❌ |
| `GET` | `/api/georef/provincias` | Proxy GeoJSON Georef, TTL 7 días | ❌ | ❌ |
| `GET` | `/api/georef/municipios?provinceId=X` | Proxy GeoJSON municipios, TTL 7 días | ❌ | ❌ |
| `GET` | `*` | SPA catch-all (solo producción) | — | — |

**Fuentes externas del backend:**
- `citypopulation.de` — scraping HTML
- `apis.datos.gob.ar/georef/api/v2.0` — datos oficiales argentinos

---

## 7. Variables de Entorno

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"   # SDK instalado, sin uso activo en server.ts
APP_URL="MY_APP_URL"                   # Referenciado en metadata pero sin uso verificado
```

**No se detectaron credenciales hardcodeadas en el código.** `.env.example` es el único archivo de configuración de entorno.

---

## 8. CI/CD

| Aspecto | Estado |
|---------|--------|
| Pipeline CI | ✅ EXISTENTE (GitHub Actions) |
| Trigger | Push/PR a `main` |
| Node version | 22 |
| Paso lint | ✅ `tsc --noEmit` |
| Paso build | ✅ `npm run build` |
| Tests automatizados | 🔴 AUSENTE |
| Deploy automático | 🔴 AUSENTE |
| Entorno staging | 🔴 AUSENTE |

---

## 9. Principios Editoriales — Cumplimiento

| Principio de la instrucción maestra | Cumplimiento |
|------------------------------------|-------------|
| No inventar datos para completar períodos sin información | ✅ Los null son explícitos. El año 2016 (inflación en transición) tiene `official: null` correctamente. |
| Distinguir entre hecho verificado, estimación, interpretación, controversia y dato desconocido | ✅ Campo `evidence: 'oficial' \| 'oficial_con_reserva' \| 'referencia'` en inflación. Campo `isBaseDemo` en tributos. |
| No atribuir intenciones ocultas sin prueba | ✅ No se encontraron calificaciones subjetivas en los datos. |
| No equiparar denuncia con condena | ✅ `PARTY_INTEGRITY_METHOD` tiene nota metodológica explícita. |
| No equiparar presupuesto aprobado con pago ejecutado | ✅ `ejecucionMonto: null` separado de `presupuestoAprobado`. |
| Documentar cada fuente | ✅ Todos los datos de Nivel A tienen `sourceUrl` verificable. |
| Cobertura política simétrica | ✅ 6 perfiles abarcan distintos partidos/espacios sin sesgo detectable. |
