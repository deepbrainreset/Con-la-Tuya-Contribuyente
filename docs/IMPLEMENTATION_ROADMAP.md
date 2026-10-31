# IMPLEMENTATION_ROADMAP.md
## Hoja de Ruta de Implementación y Evolución Continua (1946–Actualidad)

---

## Fase 1 — Auditoría Integral y Desacoplamiento de Evidencia (COMPLETADA)
- [x] Extracción y verificación automatizada de las **349 URLs externas** del repositorio ([`scripts/audit-links.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/audit-links.ts), [`docs/SOURCE_LINK_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.md) y [`docs/SOURCE_LINK_AUDIT.csv`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.csv)).
- [x] Reparación de enlaces rotos o placeholders detectados en [`src/data/tributos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/tributos.ts).
- [x] Implementación del modelo de evidencia independiente de URL (`EvidenceRecord`, `EvidenceLocation`, `EvidenceClaim`, `EvidenceVerification`, `EvidenceRevision`) en [`src/types/evidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types/evidencia.ts) y [`src/data/repositorioEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/repositorioEvidencia.ts).

## Fase 2 — Línea de Tiempo Histórica Unificada y Hemeroteca 1946–2026 (COMPLETADA)
- [x] Implementación de `HistoricalEvent` y `HistoricalEventRelation` cubriendo los hitos estructurales de 1946 a 2026 en [`src/data/archivoHistoricoContexto.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/archivoHistoricoContexto.ts).
- [x] Incorporación de la **Hemeroteca Digital de Portadas Históricas** (*Clarín*, *La Nación*, *Página/12*, *Ámbito Financiero*, *Crónica*, *Perfil*) bajo el derecho de cita (Art. 10 Ley 11.723).
- [x] Incorporación de la matriz **Antes decía → Después dijo → Después hizo** y de la separación estricta en 8 categorías de naturaleza probatoria.
- [x] Creación de la vista interactiva [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx) (`/#/archivo-historico`) e integración en [`src/App.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/App.tsx) y [`src/components/Navbar.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/components/Navbar.tsx).

## Fase 3 — Monitoreo Automatizado de Fuentes y Suite de Integridad (COMPLETADA)
- [x] Exposición de `/api/evidencia/registro` y `/api/evidencia/monitoreo` en [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts).
- [x] Ampliación de [`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts) a 16 pruebas integrales automatizadas.

## Fase 4 — Expansión Progresiva de Cobertura Subnacional e Histórica (PRÓXIMOS PASOS)
- [ ] **Ingesta Automatizada de Ordenanzas Fiscales Municipales:** Expandir el desglose de tasas viales, TISH y alumbrado a los más de 135 municipios bonaerenses y capitales departamentales del interior con copia preservada de ordenanza anual.
- [ ] **Digitalización de Diarios de Sesiones Históricos (1946–1983):** Incorporar actas taquigráficas completas de la Biblioteca del Congreso de la Nación (BCN) para las reformas constitucionales y presupuestarias de 1949, 1957 y 1973–1976.
- [ ] **Sincronización Periódica con Wayback Machine Save API:** Automatizar en el job semanal de monitoreo el envío preventivo de nuevas resoluciones del Boletín Oficial y pliegos de `COMPR.AR` a `web.archive.org/save/`.
