# HISTORICAL_TIMELINE_ARCHITECTURE.md
## Arquitectura de Línea de Tiempo Histórica Unificada (1946–Actualidad)

**Implementación en código:**
- Modelo de tipos: [`src/types/evidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types/evidencia.ts) (`HistoricalEvent`, `HistoricalEventRelation`, `PressFrontPageRecord`, `PublicOpinionSurveySnapshot`, `SocialRepercussionSnapshot`, `BeforeAfterActionComparison`)
- Datos históricos (1946–2026): [`src/data/archivoHistoricoContexto.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/archivoHistoricoContexto.ts)
- Vista interactiva: [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx) (`/#/archivo-historico`)

---

## 1. Diseño del Grafo Temporal Multidimensional

Cada acontecimiento histórico (`HistoricalEvent`) se modela como un nodo estructurado que articula seis capas documentales simultáneas para una misma fecha o período:

1. **Capa Institucional y Política:** Fecha exacta, período presidencial, presidente, coalición gobernante, ministro de Economía y funcionarios intervinientes.
2. **Capa Normativa y Parlamentaria:** Leyes, decretos-leyes, resoluciones y actas de votación nominal vinculadas mediante `evidenceRecordId`.
3. **Capa Económica, Presupuestaria y Tarifaria:** Variación anual de inflación (IPC), resultado fiscal (% PBI), gasto público consolidado, cambios impositivos e impacto en tarifas y poder adquisitivo.
4. **Capa Hemerográfica (`PressFrontPageRecord`):** Portadas de diarios nacionales de la fecha del hito (*Clarín*, *La Nación*, *Página/12*, *Ámbito Financiero*, *Crónica*, *Perfil*), con titular principal, bajada, cita breve permitida (Art. 10 Ley 11.723), nota de encuadre editorial y referencia al catálogo de la Biblioteca Nacional Mariano Moreno (BNMM).
5. **Capa de Clima Social y Opinión Pública (`PublicOpinionSurveySnapshot` + `SocialRepercussionSnapshot`):** Estudios de opinión con ficha técnica (ICG-UTDT, EPH INDEC, cómputos electorales CNE) y repercusiones colectivas documentadas (paros generales, movilizaciones, cacerolazos).
6. **Capa de Contraste Discursivo (`BeforeAfterActionComparison`):** Matriz objetiva **Antes decía → Después dijo → Después hizo**, más el contexto y la explicación pública ofrecida por el actor político.

---

## 2. Relaciones Causales y Normativas (`HistoricalEventRelation`)

Los nodos históricos se conectan mediante aristas tipadas (`HistoricalRelationType`):
- `CAUSA_PRECEDENTE` (ej. Nacionalización del BCRA y redescuentos 1946 → Shock inflacionario del Rodrigazo 1975).
- `RESPUESTA_NORMATIVA` (ej. Diez años de inflación de tres dígitos 1975–1985 → Creación del signo monetario Austral y desagio por Decreto 1096/85).
- `REFORMA_POSTERIOR` (ej. Hiperinflación 1989–1990 → Ley de Convertibilidad 23.928 en 1991; Creación de AFJP en 1994 → Estatización SIPA Ley 26.425 en 2008).
- `IMPACTO_PRESUPUESTARIO` (ej. Rigidez cambiaria y endeudamiento 1991–2000 → Creación del Impuesto al Cheque Ley 25.413 y Ley de Déficit Cero 25.453 en 2001).
- `CONTRADICCION_DISCURSIVA` (ej. Fórmula previsional 27.426 rechazada en 2017 y suspendida en 2019 por Ley 27.541; Eliminación de Ganancias 4ta categoría por Ley 27.725 en septiembre de 2023 y restitución por Ley 27.743 en julio de 2024).
