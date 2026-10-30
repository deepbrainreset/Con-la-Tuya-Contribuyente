# ROADMAP.md
## Con La Tuya, Contribuyente — Hoja de Ruta de Implementación (Fases 1 a 7)

---

## Principios Rectores de Ejecución
1. **Preservación total:** Ninguna de las 15 vistas ni sus rutas actuales se elimina; todas se integran en la nueva arquitectura de 5 secciones manteniendo retrocompatibilidad de URLs.
2. **Rigor epistémico:** Cada cifra muestra moneda, período, etapa presupuestaria y fuente documental verificable.
3. **Neutralidad partidaria:** Cobertura simétrica 1946–actualidad sin adjetivaciones morales ni inferencias de intencionalidad.

---

## Plan de Fases y Criterios de Aceptación

### FASE 1 — Estabilización, Seguridad, Pruebas y Arquitectura Canónica de Datos
- **Objetivos:**
  - Endurecer [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts) con cabeceras de seguridad HTTP, CORS, rate-limiting en memoria para endpoints sensibles y puerto configurable (`process.env.PORT`).
  - Definir el modelo de tipos canónico [`src/types/observatorio.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types/observatorio.ts) que unifique fuentes primarias, estados epistémicos (`verificado`, `oficial_con_reserva`, `estimacion`, `interpretacion`, `controversia`, `desconocido`), etapas presupuestarias, monedas históricas (1946–2026), intervenciones políticas por rol, expedientes, declaraciones y auditorías temáticas.
  - Documentar períodos y fuentes en [`src/data/productos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/productos.ts) y [`src/views/CalculadoraFiscal.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/CalculadoraFiscal.tsx).
  - Implementar suite de pruebas automatizadas de integridad de datos y contratos (`npm test`).
- **Criterios de aceptación:** `npm run lint`, `npm test` y `npm run build` ejecutan con código de salida `0`.

### FASE 2 — Nueva Navegación (5 Pilares), Explorador Fiscal Histórico y Trazabilidad Presupuestaria
- **Objetivos:**
  - Reorganizar [`src/components/Navbar.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/components/Navbar.tsx) en los **5 pilares** (*1. Dinero Público, 2. Observatorio Histórico, 3. Responsables Públicos, 4. Auditorías Temáticas, 5. Participación y Transparencia*) y añadir las 6 preguntas ciudadanas de entrada directa en la interfaz.
  - Crear el dataset histórico [`src/data/observatorioHistorico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/observatorioHistorico.ts) (períodos presidenciales y regímenes monetarios 1946–2026, series fiscales documentadas, distinción de etapas presupuestarias y control explícito de transferencias intergubernamentales para evitar doble conteo).
  - Implementar la vista interactiva **Observatorio y Explorador Fiscal Histórico** (`/observatorio`).
- **Criterios de aceptación:** Filtros operativos por período/año, jurisdicción, moneda y etapa de ejecución; alertas visibles de consolidación intergubernamental.

### FASE 3 — Expedientes Interactivos y Responsables Públicos
- **Objetivos:**
  - Implementar el módulo de **Expedientes Históricos Interactivos** (`/expedientes`) con los expedientes piloto requeridos por la instrucción maestra, respaldados por normativa y fuentes oficiales:
    1. **Reforma Previsional de 2008 (Ley 26.425):** Traspaso de AFJP al SIPA, flujos, obligaciones y resultados documentados.
    2. **YPF (Ley 24.145 de 1992 y Ley 26.741 de 2012):** Privatización, expropiación del 51%, votaciones nominales y estado de litigios internacionales documentados.
    3. **Moratorias Previsionales (Leyes 24.476, 25.994, 26.970, 27.705):** Cobertura, altas y costo fiscal documentado en BESS/ANSES.
    4. **Restitución del Impuesto a las Ganancias 2024 (Ley 27.743 Título V):** Trazabilidad legislativa completa.
    5. **Compras Públicas bajo Auditoría (Proceso COMPR.AR 41-0009-CDI26):** Separación estricta de licitación, adjudicación, pago y entrega.
  - Enriquecer la trazabilidad de responsables separando autoría, voto nominal, promulgación, firma y ejecución.
- **Criterios de aceptación:** Todo expediente muestra norma oficial, etapa presupuestaria, roles diferenciados de funcionarios e hipervínculos a fuentes primarias (InfoLEG, Boletín Oficial, HCDN, Senado, ANSES).

### FASE 4 — Archivo de Declaraciones Públicas y Comparador Contextual Histórico
- **Objetivos:**
  - Crear [`src/data/declaracionesHistoricas.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/declaracionesHistoricas.ts) con declaraciones públicas verificadas y fechadas de distintos espacios políticos sobre temas fiscales, previsionales, monetarios y de empresas públicas, más dossieres de comparación documental.
  - Implementar la vista **Archivo de Declaraciones y Comparador Contextual** (`/declaraciones`) que enfrenta declaraciones de distinta fecha o declaraciones vs. actos/votos oficiales, mostrando siempre contexto, cargo en cada momento, fuente original y posibles explicaciones públicas, sin calificaciones subjetivas.
- **Criterios de aceptación:** Ninguna comparación carece de fecha, fuente, cita textual exacta y nota de contexto.

### FASE 5 — Auditorías Temáticas Sectoriales (Previsional, Universidades, CONICET y Ciencia)
- **Objetivos:**
  - Implementar la vista **Auditorías Temáticas Sectoriales** (`/auditorias`) cubriendo:
    - **Sistema Previsional y sus Reformas** (ANSES / BESS).
    - **Universidades Públicas Nacionales** (Presupuesto SPU, matrícula, egresados y auditorías AGN).
    - **Ciencia y CONICET (1958–Actualidad)** (Decreto-Ley 1291/58, investigadores, becarios, repositorio CONICET Digital y límites metodológicos de medición de impacto).
    - **Subsidios Económicos, Infraestructura, Publicidad Oficial y Compras Públicas**.
- **Criterios de aceptación:** Cada auditoría distingue costo presupuestario, ejecución, indicadores físicos verificados y limitaciones de medición ("ausencia de impacto medido ≠ impacto inexistente").

### FASE 6 — Participación Ciudadana, Solicitudes de Información y Registro de Correcciones
- **Objetivos:**
  - Expandir [`src/views/PropuestasContribucion.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/PropuestasContribucion.tsx) e incorporar el **Generador de Consultas Ciudadanas Documentadas** (basado en la Ley 27.275 de Acceso a la Información Pública) vinculado a los expedientes del observatorio, requiriendo revisión y confirmación individual del ciudadano (sin envíos masivos automatizados), junto con la bitácora de correcciones y derecho a respuesta.
- **Criterios de aceptación:** El usuario puede seleccionar un expediente, generar un borrador formal respetuoso y específico citando las normas y fuentes del expediente, y consultar el historial de correcciones.

### FASE 7 — Buscador Histórico Unificado, SEO, Accesibilidad WCAG y Validación Final
- **Objetivos:**
  - Incorporar el **Buscador Histórico Unificado** accesible desde la barra superior y desde la portada, capaz de buscar simultáneamente en las 5 dimensiones (Tributos, Jurisdicciones, Funcionarios, Partidos, Expedientes, Declaraciones y Auditorías Temáticas).
  - Añadir soporte de sincronización de rutas y metadatos dinámicos (`canonical`, `document.title`, `meta description`), atributos ARIA (`aria-current="page"`, `aria-expanded`, `scope="col"`) y ejecutar la validación completa de compilación, prerenderizado y tests (`TEST_REPORT.md`).
- **Criterios de aceptación:** Build de producción exitoso, prerenderizado verificado, 100% de tests pasando y documentación sincronizada.
