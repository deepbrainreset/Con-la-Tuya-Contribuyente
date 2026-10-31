# DATA_INTEGRITY_REPORT.md
## Informe de Integridad de Datos Fiscales, Presupuestarios, Censales e Históricos

**Script de verificación automatizada:** [`scripts/verify-integrity.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/scripts/verify-integrity.ts) (`npm test`)

---

## 1. Matriz de Datasets Auditados

| Dominio de Datos | Archivo Principal | Registros Verificados | Nivel de Evidencia | Estado |
|---|---|---|---|---|
| **Tributos Nacionales, Provinciales y Municipales** | [`src/data/tributos.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/tributos.ts) | 12 tributos troncales + explorador en `mapaTributarioData.ts` | Nivel A / B / C | 100% enlaces HTTPS activos |
| **Jurisdicciones Federales y Municipios** | [`src/data/jurisdictions.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/jurisdictions.ts) | 1 Nación + 24 distritos federales (23 provincias + CABA) + 19 municipios | Nivel A / B | Cobertura federal 24/24 completa |
| **Censo Nacional 2022 (INDEC / Georef)** | [`src/data/censo2022Territorial.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/censo2022Territorial.ts) | 24 jurisdicciones censales + API de localidades $\ge 10.000$ hab. | Nivel A (INDEC) | Población consolidada verificada |
| **Inflación Histórica (1983–2026)** | [`src/data/inflacion.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/inflacion.ts) | 43 años continuos (1983–2025) + seguimiento mensual 2026 | Nivel A (INDEC / IPC Congreso 2007–2015) | Doble serie documentada en período de intervención INDEC |
| **Gasto Público y Compras COMPR.AR** | [`src/data/gastoPublico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/gastoPublico.ts) | Presupuesto aprobado vs. ejecutado + procesos COMPR.AR con contraste de mercado | Nivel A (Presupuesto Abierto / COMPR.AR) | Trazabilidad por inciso y pliego |
| **Boletas de Servicios, Cascada IIBB y Subsidios (2001–2026)** | [`src/data/facturasServiciosSubsidios.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/facturasServiciosSubsidios.ts) | 3 servicios (Luz, Agua, ABL) $\times$ 4 regiones + 9 hitos de subsidios (2001–2026) | Nivel A (CAMMESA, ENRE, ERAS, OPC) | Conteo de acumulación en cascada verificado |
| **Observatorio Histórico (1946–2026)** | [`src/data/observatorioHistorico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/observatorioHistorico.ts) | 19 períodos presidenciales, 12 hitos macrofiscales, 6 expedientes profundos | Nivel A (BCRA, InfoLEG, BORA) | 80 años de serie continua |
| **Archivo Histórico, Hemeroteca y Contexto Social (1946–2026)** | [`src/data/archivoHistoricoContexto.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/archivoHistoricoContexto.ts) | 9 hitos multidimensionales, 18 portadas históricas, 9 matrices Antes/Después/Acción, 7 relaciones causales | Nivel A + Hemeroteca BNMM | 100% vinculado a `EvidenceRecord` |
| **Repositorio de Evidencia Independiente de URL** | [`src/data/repositorioEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/repositorioEvidencia.ts) | 12 `EvidenceRecord`, 22 `EvidenceLocation`, 4 `EvidenceClaim`, 22 `EvidenceVerification` | Huella `SHA-256` + Espejo Wayback | 100% verificado |

---

## 2. Controles de Consistencia Matemática y Metodológica

1. **Separación entre elegibilidad demográfica e imposición tributaria:** La población del Censo 2022 ($\ge 10.000$ habitantes) determina la elegibilidad del gobierno local en el mapa territorial, pero las alícuotas y tasas municipales se vinculan exclusivamente a la Ordenanza Fiscal y Tarifaria de cada municipio.
2. **Doble serie inflacionaria 2007–2015:** En [`src/data/inflacion.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/inflacion.ts) y [`src/data/archivoHistoricoContexto.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/archivoHistoricoContexto.ts) se informa tanto el dato publicado por el INDEC intervenido como el IPC de Direcciones Provinciales de Estadística / IPC Congreso para evitar distorsiones en los cálculos de poder adquisitivo real.
3. **Efecto cascada de Ingresos Brutos e Impuesto al Cheque:** En [`src/data/facturasServiciosSubsidios.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/facturasServiciosSubsidios.ts) se distingue explícitamente la alícuota nominal de pie de factura respecto de las 3 a 4 etapas acumulativas previas (generación, transporte, distribución y cobro).
