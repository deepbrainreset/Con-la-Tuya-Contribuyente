# TEST_RESULTS.md
## Resultados de Ejecución de Pruebas Automatizadas, Typecheck y Build de Producción

**Fecha de ejecución:** 2026-10-31  
**Entorno:** Windows / Node.js `v22.14.0` / TypeScript `5.8.2` / Vite `6.2.0`

---

## 1. Resumen de Comandos Ejecutados

| Comando | Propósito | Resultado | Código de Salida |
|---|---|---|---|
| `npm run lint` (`tsc --noEmit`) | Verificación estática estricta de tipos en todo el proyecto (`src/`, `server.ts`, `scripts/`) | **PASS (0 errores)** | `0` |
| `npm test` (`tsx scripts/verify-integrity.ts`) | Suite de 16 pruebas de integridad de datos, reglas editoriales, SSR, evidencia multi-espejo y línea de tiempo 1946–2026 | **PASS (16/16 superadas)** | `0` |
| `tsx scripts/audit-links.ts` | Extracción y verificación HTTP real con rate-limiting de las 349 URLs externas del repositorio | **PASS (349 URLs auditadas)** | `0` |
| `npm run build` (`vite build`) | Compilación y empaquetado de producción con code-splitting por ruta | **PASS (`dist/` generado)** | `0` |

---

## 2. Detalle de las 16 Pruebas de Integridad (`scripts/verify-integrity.ts`)

1. **Integridad del Registro Tributario (`TRIBUTOS`):** 12 tributos auditados con fuentes HTTPS y niveles de evidencia A–D.
2. **Integridad de Serie de Inflación Histórica (`1983–2026`):** 43 años continuos + serie mensual 2026 verificada.
3. **Observatorio Histórico `1946–2026`:** 19 períodos presidenciales, 12 hitos macrofiscales y 6 expedientes interactivos.
4. **Archivo de Declaraciones Públicas y Comparador:** 8 declaraciones verificadas y 5 comparaciones documentales.
5. **Auditorías Temáticas Sectoriales:** 5 auditorías (SIPA, Universidades, CONICET 1958–2026, Subsidios/Salud, Compras/Pauta).
6. **Gobernanza Ciudadana (Ley 27.275 y Bitácora):** Plantillas de acceso a la información pública y bitácora de correcciones.
7. **Neutralidad Editorial y Separación Judicial:** 24 autoridades ejecutivas de las 24 jurisdicciones verificadas bajo reglas de neutralidad.
8. **Consistencia Matemática del Simulador de Precios:** Desglose impositivo verificado sin superar el 100% del precio final.
9. **Arquitectura de Navegación en 5 Pilares y Renderizado SSR:** 5 pilares y renderizado `renderToString` sin errores.
10. **Cobertura Federal Completa en `JURISDICTIONS`:** 1 Nación + 24 distritos federales (23 provincias + CABA) + 19 municipios + Censo 2022.
11. **Votaciones Nominales Parlamentarias y Calculadora Fiscal:** 7 sesiones nominales y 5 parámetros normativos verificados.
12. **Contraste Relato Mediático vs. Proceso Administrativo:** 4 informes de contraste proceso vs. relato verificados.
13. **Blog de Congruencia (`2003–2026`):** 7 entradas multipartidarias, 22 contradicciones contabilizadas y plantillas de interpelación en redes.
14. **Boletas Conceptuales de Servicios, Cascada IIBB y Subsidios (`2001–2026`):** 3 boletas en 4 jurisdicciones y 9 hitos históricos de subsidios.
15. **Arquitectura de Evidencia Independiente de URL (`EvidenceRecord` + `EvidenceLocation`):** 12 `EvidenceRecords`, 22 `EvidenceLocations` con espejo Wayback Machine, 4 `EvidenceClaims` y 8 categorías de naturaleza probatoria.
16. **Línea de Tiempo Histórica Unificada (`1946–2026`) y Hemeroteca Digital:** 9 hitos multidimensionales, 18 portadas históricas de diarios con aviso legal Ley 11.723, 9 matrices Antes/Después/Acción y 7 relaciones históricas causales.
