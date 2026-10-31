# MASTER_AUDIT_REPORT.md
## Informe Maestro de Auditoría Integral, Preservación de Evidencia y Observatorio Histórico (1946–2026)

**Plataforma:** [Con La Tuya, Contribuyente](https://conlatuyacontribuyente.com)  
**Repositorio:** `https://github.com/deepbrainreset/Con-la-Tuya-Contribuyente`  
**Alcance Temporal:** 1946 – Actualidad (80 años de serie institucional)  
**Alcance Territorial:** Nación, 23 Provincias, Ciudad Autónoma de Buenos Aires (CABA), Municipios y Organismos Públicos.  
**Fecha de Ejecución:** 2026-10-31

---

## 1. Resumen Ejecutivo de la Auditoría

Se ejecutó una auditoría integral de código, arquitectura de evidencia, enlaces externos, integridad legislativa/presupuestaria, seguridad, accesibilidad/responsividad y cobertura histórica sobre el repositorio completo (`React 19`, `Vite`, `TypeScript 5.8`, `Tailwind CSS 4`, `React Router 7`, `Express`, `Leaflet`, `Recharts`).

### Hallazgos y Logros Principales
1. **Auditoría Exhaustiva de Enlaces Externos (`349` URLs únicas verificadas):**
   - Se desarrolló y ejecutó [`scripts/audit-links.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/audit-links.ts) extrayendo automáticamente todas las URLs externas de `src/` y `server.ts`.
   - Resultados documentados en [`docs/SOURCE_LINK_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.md) y [`docs/SOURCE_LINK_AUDIT.csv`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.csv): **168 `VERIFIED_AVAILABLE` (HTTP 200)**, **43 `REDIRECTED_VALID`**, **20 `AVAILABLE_UNVERIFIED`** (redes sociales con bloqueo de scraping sin sesión), **3 `PRIVATE_OR_RESTRICTED`** (WAF gubernamental), **91 `TEMPORARILY_UNAVAILABLE`** (timeouts en portales municipales/provinciales) y **24 `BROKEN`** (rutas profundas cambiadas en portales estatales y 1 URL placeholder eliminada en [`src/data/tributos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/tributos.ts)).
2. **Arquitectura de Evidencia Independiente de URL (Requisito Arquitectónico Obligatorio #1):**
   - Implementada en [`src/types/evidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types/evidencia.ts) y [`src/data/repositorioEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/repositorioEvidencia.ts).
   - Separa la identidad del documento (`EvidenceRecord`, con huella `SHA-256`, extracto literal y metadatos normativos) de sus ubicaciones físicas (`EvidenceLocation` `1:N` con espejos en InfoLEG, Boletín Oficial, repositorios institucionales y Wayback Machine), vinculando afirmaciones (`EvidenceClaim`), auditorías técnicas (`EvidenceVerification`) e historial inmutable de cambios (`EvidenceRevision`).
3. **Línea de Tiempo Histórica Unificada y Módulo «Archivo Histórico, Hemeroteca y Contexto Social (1946–2026)» (Requisito Arquitectónico Obligatorio #2):**
   - Implementado en [`src/data/archivoHistoricoContexto.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/archivoHistoricoContexto.ts) y [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx), accesible desde `/#/archivo-historico` y el Pilar 2 de [`src/components/Navbar.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/components/Navbar.tsx).
   - Integra los grandes hitos de 1946 a 2026 (Nacionalización del BCRA e IAPI 1946, Creación del IVA y Ganancias 1973, Rodrigazo 1975, Plan Austral 1985 y Coparticipación 1988, Convertibilidad y Privatizaciones 1991, Impuesto al Cheque, Déficit Cero y Corralito 2001, Resolución 125 y Estatización de AFJP 2008, Expropiación de YPF y Cepo 2012, Reforma Previsional y Consenso Fiscal 2017, Ley 27.541 e Impuesto PAIS 2019, y Ley Bases, Restitución de Ganancias y Quita de Subsidios 2024–2026).
   - Incorpora **Hemeroteca Digital de Portadas Históricas** (*Clarín*, *La Nación*, *Página/12*, *Ámbito Financiero*, *Crónica*, *Perfil*), respetando el derecho de cita (Art. 10 Ley 11.723), y la matriz **Antes decía → Después dijo → Después hizo**.
4. **Servicio Automatizado de Monitoreo de Fuentes (`server.ts`):**
   - Nuevos endpoints `/api/evidencia/registro` y `/api/evidencia/monitoreo` en [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts) con política de rate-limiting por dominio (`350ms`), backoff exponencial y caché de 24h.

---

## 2. Cobertura de las 10 Preguntas Ciudadanas Fundamentales

| Pregunta Ciudadana | Módulo y Fuente de Datos en la Plataforma | Estado |
|---|---|---|
| 1. ¿De dónde provienen los recursos públicos? | [`src/views/RegistroTributosAuditado.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/RegistroTributosAuditado.tsx), [`src/views/MapaTributarioDashboard.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/MapaTributarioDashboard.tsx) | Verificado (Nivel A/B) |
| 2. ¿Cómo se distribuyen? | [`src/views/MapaNacional.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/MapaNacional.tsx), Ley 23.548 en [`src/data/observatorioHistorico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/observatorioHistorico.ts) | Verificado (24 jurisdicciones) |
| 3. ¿Quién decidió su asignación? | [`src/views/ResponsabilidadPolitica.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ResponsabilidadPolitica.tsx), [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts) | Verificado |
| 4. ¿Qué se contrató, adjudicó, pagó y entregó? | [`src/views/GastoPublico.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/GastoPublico.tsx), [`src/data/gastoPublico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/gastoPublico.ts) | Verificado |
| 5. ¿Qué resultados se obtuvieron? | [`src/views/AuditoriasTematicas.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/AuditoriasTematicas.tsx), [`src/views/FacturasServiciosSubsidios.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/FacturasServiciosSubsidios.tsx) | Verificado |
| 6. ¿Qué funcionarios intervinieron? | [`src/views/RegistroPolitico.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/RegistroPolitico.tsx), [`src/data/autoridadesEjecutivas2026.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/autoridadesEjecutivas2026.ts) | Verificado |
| 7. ¿Qué dijeron esos funcionarios históricamente? | [`src/views/BlogCongruencia.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/BlogCongruencia.tsx), [`src/views/DeclaracionesComparador.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/DeclaracionesComparador.tsx) | Verificado |
| 8. ¿Qué proyectos impulsaron y cómo votaron? | [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts), [`src/data/impactoTributarioPolitico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/impactoTributarioPolitico.ts) | Verificado |
| 9. ¿Qué contexto social, económico y periodístico existía? | [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx) (`/#/archivo-historico`) | Implementado y Verificado |
| 10. ¿Qué explicaciones públicas se ofrecieron? | [`src/views/ContrasteEvidencia.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ContrasteEvidencia.tsx), [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx) | Verificado |

---

## 3. Índice de Entregables Oficiales en `docs/`

1. [`docs/MASTER_AUDIT_REPORT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/MASTER_AUDIT_REPORT.md) — Este informe maestro.
2. [`docs/SOURCE_LINK_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.md) — Auditoría detallada de los 349 enlaces externos.
3. [`docs/SOURCE_LINK_AUDIT.csv`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.csv) — Matriz CSV exportable de enlaces, códigos HTTP y reparaciones.
4. [`docs/EVIDENCE_ARCHITECTURE.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/EVIDENCE_ARCHITECTURE.md) — Especificación del modelo `EvidenceRecord` independiente de URL.
5. [`docs/HISTORICAL_TIMELINE_ARCHITECTURE.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/HISTORICAL_TIMELINE_ARCHITECTURE.md) — Especificación del grafo temporal `HistoricalEvent` + `HistoricalEventRelation`.
6. [`docs/HISTORICAL_ARCHIVE_SOURCES.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/HISTORICAL_ARCHIVE_SOURCES.md) — Catálogo de hemerotecas, repositorios y reglas legales de reproducción.
7. [`docs/LEGISLATIVE_DATA_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/LEGISLATIVE_DATA_AUDIT.md) — Auditoría de leyes, decretos y votaciones nominales.
8. [`docs/DATA_INTEGRITY_REPORT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/DATA_INTEGRITY_REPORT.md) — Verificación de series fiscales, inflacionarias, censales y tarifarias.
9. [`docs/BUG_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/BUG_AUDIT.md) — Registro de defectos detectados (P0–P3) y su resolución.
10. [`docs/SECURITY_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SECURITY_AUDIT.md) — Auditoría de cabeceras HTTP, CORS, rate-limiting y superficie de ataque.
11. [`docs/TEST_RESULTS.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/TEST_RESULTS.md) — Resultados reproducibles de `lint`, `test` (`16/16 PASS`) y `build`.
12. [`docs/IMPLEMENTATION_ROADMAP.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/IMPLEMENTATION_ROADMAP.md) — Hoja de ruta evolutiva por fases.
