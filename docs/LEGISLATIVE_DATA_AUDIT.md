# LEGISLATIVE_DATA_AUDIT.md
## Auditoría de Datos Legislativos, Normativos y Votaciones Nominales

**Módulos auditados:**
- [`src/data/votacionesParlamentarias.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/votacionesParlamentarias.ts)
- [`src/data/impactoTributarioPolitico.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/impactoTributarioPolitico.ts)
- [`src/data/repositorioEvidencia.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/data/repositorioEvidencia.ts)
- [`src/views/ResponsabilidadPolitica.tsx`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/src/views/ResponsabilidadPolitica.tsx)

---

## 1. Sesiones y Leyes Auditadas con Trazabilidad Nominal

| Norma / Expediente | Fecha | Cámara | Resultado Oficial Verificado | EvidenceRecord Asociado |
|---|---|---|---|---|
| **Decreto-Ley 8.503/46 y 15.350/46 (Ley 12.962)** | 25/03/1946 | PEN / Congreso | Ratificación de nacionalización del BCRA y creación del IAPI | `EVD-1946-DEC-8503-BCRA` |
| **Leyes 20.628 (Ganancias) y 20.631 (IVA)** | 29/12/1973 | HCDN / HSN | Sanción del régimen de IVA (13% inicial) e Impuesto a las Ganancias | `EVD-1973-LEY-20628-GANANCIAS-IVA` |
| **Ley 23.548 — Coparticipación Federal** | 22/01/1988 | HCDN / HSN | 42,34% Nación / 54,66% Provincias (PBA ~21,5%) | `EVD-1988-LEY-23548-COPARTICIPACION` |
| **Ley 23.928 — Convertibilidad del Austral** | 27/03/1991 | HCDN / HSN | Paridad 1 a 1 con respaldo de reservas y prohibición de indexación | `EVD-1991-LEY-23928-CONVERTIBILIDAD` |
| **Ley 25.413 (Impuesto al Cheque) y Ley 25.453 (Déficit Cero)** | 24/03/2001 y 30/07/2001 | HCDN / HSN | Creación del tributo bancario del 0,6% y recorte del 13% estatal/previsional | `EVD-2001-LEY-25413-CHEQUE-DEFICIT-CERO` |
| **Resolución 125/2008 y Ley 26.425 (Estatización AFJP)** | 17/07/2008 y 20/11/2008 | HSN / HCDN | Empate 36–36 en Senado (voto no positivo de Cobos) y sanción SIPA (162 afirmativos en HCDN / 46 en HSN) | `EVD-2008-ACTA-RES125-LEY-26425-AFJP` |
| **Ley 26.741 — Expropiación del 51% de YPF S.A.** | 03/05/2012 | HCDN / HSN | 208 afirmativos, 32 negativos y 6 abstenciones en HCDN (63 afirmativos en HSN) | `EVD-2012-LEY-26741-YPF-EXPROPIACION` |
| **Ley 27.426 — Reforma de Movilidad Previsional** | 19/12/2017 | HCDN / HSN | 127 afirmativos, 117 negativos y 2 abstenciones en HCDN | `EVD-2017-LEY-27426-REFORMA-PREVISIONAL` |
| **Ley 27.541 — Solidaridad Social e Impuesto PAIS** | 21/12/2019 | HCDN / HSN | 134 afirmativos y 110 negativos en HCDN (41 a 23 en HSN) | `EVD-2019-LEY-27541-IMPUESTO-PAIS` |
| **Ley 27.605 — Aporte Solidario Extraordinario** | 18/11/2020 | HCDN / HSN | 133 afirmativos, 115 negativos y 2 abstenciones en HCDN | Registro en `votacionesParlamentarias.ts` |
| **Ley 27.725 — Eliminación 4ta Categoría Ganancias** | 19/09/2023 | HCDN / HSN | 135 afirmativos y 103 negativos en HCDN (apoyada por Sergio Massa y Javier Milei) | `EVD-2023-LEY-27725-GANANCIAS-4TA-ELIMINACION` |
| **Leyes 27.742 (Ley Bases) y 27.743 (Paquete Fiscal)** | 28/06/2024 | HCDN / HSN | Insistencia HCDN sobre Título V (Restitución de Ganancias 4ta Categoría: 136 afirmativos) | `EVD-2024-LEY-27742-BASES-27743-PAQUETE-FISCAL` |

---

## 2. Reglas de Integridad Parlamentaria Verificadas

1. **Separación de roles institucionales:** Cada registro distingue quién redactó o envió el proyecto (`propuestoPor`), qué cámara o comisión lo aprobó (`aprobadoPor`), qué legisladores votaron a favor, en contra, se abstuvieron o estuvieron ausentes (`voters`), y qué titular del Ejecutivo lo promulgó o vetó (`promulgadoPor`).
2. **Prohibición de extrapolación nominal:** Sólo se atribuye voto individual a un legislador cuando consta en el acta nominal oficial de HCDN o HSN; en votaciones a mano alzada (como el ajuste de dietas del Senado del 18/04/2024) se consigna explícitamente la modalidad «Votación a mano alzada sin tablero electrónico nominal».
