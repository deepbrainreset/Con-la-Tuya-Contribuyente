# Auditoría de fase 0 — inventario inicial del repositorio

Fecha: 2026-10-12. Repositorio: deepbrainreset/Con-la-Tuya-Contribuyente, rama main.

## Archivos inspeccionados
- package.json
- src/App.tsx
- src/components/Navbar.tsx
- src/views/RegistroPolitico.tsx
- src/views/ResponsabilidadPolitica.tsx
- src/views/IntegridadPartidaria.tsx
- src/views/GastoPublico.tsx
- src/views/TransparenciaEstado.tsx
- server.ts
- scripts/prerender.tsx
- README.md
- index.html

**Alcance:** lectura estática parcial; no se han ejecutado tests, compilación, navegador ni auditoría exhaustiva de todas las dependencias y archivos.

## Hallazgos confirmados
1. Frontend React 19 + TypeScript + Vite 6 + Tailwind 4 + React Router 7, Recharts y Leaflet. Backend Express.
2. src/App.tsx usa HashRouter y carga las vistas con React.lazy; preservación de hashes requerida ante futura migración.
3. scripts/prerender.tsx prerenderiza solamente la portada. README.md declara que el sitemap solo contiene la home. Las subsecciones hash no son URLs independientes indexables.
4. src/views/RegistroPolitico.tsx reúne registros de transparencia política y autoridades ejecutivas, con búsqueda, filtros y ficha seleccionada.
5. src/views/ResponsabilidadPolitica.tsx ya presenta una muestra de votos nominales y fuentes de actas; también computa porcentajes por partido exclusivamente sobre tributos auditados cargados, no sobre el universo nacional.
6. src/views/IntegridadPartidaria.tsx contiene registro de partidos, alianzas y vínculos con personas, con advertencias sobre atribución judicial.
7. src/views/GastoPublico.tsx contiene categorías de gasto, compras, publicidad y exploración territorial; requiere revisar granularidad temporal y procedencia antes de integrarlo con el nuevo esquema.
8. src/views/TransparenciaEstado.tsx presenta cobertura de información por jurisdicción y diferencia información publicada, parcial, no verificada y no publicada confirmada.
9. server.ts contiene endpoints y acceso a fuentes externas para localidades y georreferenciación; inventario completo de endpoints pendiente.
10. Navbar expone 15 entradas; agregar nuevas secciones sin reorganización puede empeorar la navegación móvil.

## Riesgos y medidas
- **SEO:** no sustituir HashRouter de forma aislada. Planificar rutas reales + fallback Express + compatibilidad de hashes + canonical/sitemap por URL.
- **Datos:** no mezclar muestra de votos o tributos indexados con estadísticas nacionales exhaustivas.
- **Personas:** vincular actos con intervenciones verificadas; no atribuir a titulares de cargo decisiones de subordinados por presunción.
- **Declaraciones:** transcripción, marca de tiempo, contexto y revisión editorial; sin calificación ideológica global.
- **Finanzas:** etapa de ejecución y transferencias consolidadas; evitar doble conteo.
- **Arquitectura:** normalizar fuentes y entidades antes de incorporar módulos visuales.

## Próxima iteración técnica
1. Inspeccionar íntegramente archivos data/*, resto de App.tsx y endpoints de server.ts.
2. Inventariar interfaces y fuentes existentes y mapear duplicaciones.
3. Definir tipos TypeScript de fuente, funcionario, mandato, acto, intervención, declaración y comparación.
4. Implementar un primer módulo sin alterar datos ni rutas existentes.
5. Ejecutar npm run lint, npm run build y pruebas de navegador antes de integrar y desplegar.

## Criterio de terminación de fase 0
Inventario exhaustivo de código, rutas, endpoints, datos y dependencias; mapa de reutilización; riesgos priorizados y baseline de tests. **No alcanzado todavía**.
