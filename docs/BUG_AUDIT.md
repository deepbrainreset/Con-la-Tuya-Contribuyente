# BUG_AUDIT.md
## Registro de Defectos Detectados (P0, P1, P2, P3) y Estado de Resolución

---

## 1. Clasificación de Severidades

- **P0 (Crítico / Bloqueante):** Fallas de compilación, caídas de renderizado, exposición de credenciales o corrupción de datos.
- **P1 (Alto Impacto):** Enlaces normativos rotos o placeholders residuales, acoplamiento frágil a una sola URL sin respaldo, o desbordamiento de navegación en pantallas intermedias.
- **P2 (Impacto Medio):** Timeouts en portales provinciales/municipales lentos sin espejo en Wayback Machine, o falta de desplazamiento automático hacia paneles de detalle en móviles.
- **P3 (Mejora / Cosmético):** Redirecciones HTTP 301/302 de dominio raíz (`http://` a `https://` o sin `www.` a `www.`).

---

## 2. Defectos Identificados y Resueltos

| ID | Severidad | Componente / Archivo | Descripción Reproducible del Defecto | Solución Aplicada y Verificación | Estado |
|---|---|---|---|---|---|
| **BUG-01** | **P1** | [`src/data/tributos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/tributos.ts) | El registro `tasa_turistica_ejemplo` contenía una URL placeholder inexistente (`https://conlatuyacontribuyente.org/pendiente`) y tres enlaces `http://servicios.infoleg.gob.ar/...` redirigían a `mostrarArchivoInexistente.do`. | Reemplazados por enlaces HTTPS canónicos verificados (`HTTP 200`) de InfoLEG, Boletín Oficial PBA y portal normativo nacional. | **RESUELTO** |
| **BUG-02** | **P1** | Arquitectura de Fuentes Externas | Las referencias normativas dependían de una única cadena URL por registro; cuando un portal estatal cambiaba su estructura de rutas (ej. `votaciones.hcdn.gob.ar/pdf/acta/...` o `normas.gba.gob.ar/documentos/...`), el usuario encontraba un error 404 sin respaldo. | Implementada la arquitectura `EvidenceRecord` + `EvidenceLocation` (`1:N`) en [`src/types/evidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/types/evidencia.ts) y [`src/data/repositorioEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/repositorioEvidencia.ts) con huella `SHA-256`, extracto literal y espejos en InfoLEG, BORA y Wayback Machine. | **RESUELTO** |
| **BUG-03** | **P1** | [`src/components/Navbar.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/components/Navbar.tsx) | En resoluciones de tablet y laptop compacta (`768px`–`1023px`) la barra horizontal de 5 pilares comprimía textos y los menús desplegables de los últimos pilares podían desbordar el borde derecho. | Breakpoint de barra de escritorio elevado a `lg:flex` (`1024px+`), alineación `right-0` en los dos últimos pilares, barra contextual de sub-secciones, acordeón móvil/tablet y dock inferior fijo (`lg:hidden`). | **RESUELTO** |
| **BUG-04** | **P2** | Vistas Maestro-Detalle en Móvil/Tablet | Al seleccionar un funcionario, expediente o informe en pantallas móviles (`<1024px`), el panel de detalle se actualizaba más abajo en el DOM sin desplazamiento visual. | Incorporado auto-scroll suave (`scrollIntoView({ behavior: 'smooth', block: 'start' })`) en [`src/views/ArchivoHistoricoContexto.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ArchivoHistoricoContexto.tsx), [`src/views/RegistroPolitico.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/RegistroPolitico.tsx), [`src/views/BlogCongruencia.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/BlogCongruencia.tsx), [`src/views/ObservatorioHistorico.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ObservatorioHistorico.tsx), [`src/views/AuditoriasTematicas.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/AuditoriasTematicas.tsx) y [`src/views/ContrasteEvidencia.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ContrasteEvidencia.tsx). | **RESUELTO** |
| **BUG-05** | **P3** | Enlaces con redirección HTTP 301/302 | 43 enlaces gubernamentales redirigían de `http://` a `https://` o agregaban barra final. | Documentados en [`docs/SOURCE_LINK_AUDIT.md`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/docs/SOURCE_LINK_AUDIT.md) con su URL final resuelta y respaldados en `EVIDENCE_LOCATIONS`. | **RESUELTO** |
