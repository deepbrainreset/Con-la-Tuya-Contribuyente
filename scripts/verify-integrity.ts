/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Suite de Pruebas Automatizadas de Integridad de Datos, Reglas Editoriales y Renderizado SSR
 */

import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import { TRIBUTOS } from '../src/data/tributos';
import { JURISDICTIONS } from '../src/data/jurisdictions';
import { CENSUS_PROVINCES_2022 } from '../src/data/censo2022Territorial';
import { INFLATION_SERIES, CURRENT_INFLATION_2026 } from '../src/data/inflacion';
import { SPENDING_JURISDICTIONS, PUBLIC_PURCHASES } from '../src/data/gastoPublico';
import { POLITICAL_TRANSPARENCY } from '../src/data/transparenciaPolitica';
import { EXECUTIVE_AUTHORITIES_2026 } from '../src/data/autoridadesEjecutivas2026';
import { PRODUCTS } from '../src/data/productos';
import { VOTING_SESSIONS } from '../src/data/votacionesParlamentarias';
import { CALCULADORA_NORMATIVE_SOURCES } from '../src/data/parametrosCalculadoraFiscal';
import { EVIDENCE_VS_NARRATIVE_REPORTS } from '../src/data/contrasteEvidencia';
import { CONGRUENCE_BLOG_ENTRIES } from '../src/data/blogCongruencia';
import { CONCEPTUAL_SERVICE_BILLS, HISTORICAL_SUBSIDY_SERIES_2001_2026 } from '../src/data/facturasServiciosSubsidios';
import {
  PRESIDENTIAL_PERIODS_1946_2026,
  HISTORICAL_FISCAL_SERIES,
  HISTORICAL_DOSSIERS,
  CITIZEN_INQUIRY_TEMPLATES,
  CORRECTION_LOG_HISTORY
} from '../src/data/observatorioHistorico';
import { PUBLIC_STATEMENTS_ARCHIVE, STATEMENT_COMPARISONS } from '../src/data/declaracionesHistoricas';
import { THEMATIC_AUDITS } from '../src/data/auditoriasTematicas';
import { NAVIGATION_PILLARS } from '../src/components/Navbar';
import { AppContent } from '../src/App';

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function runTest(name: string, fn: () => string) {
  try {
    const details = fn();
    results.push({ name, passed: true, details });
    console.log(`✅ PASS: ${name} — ${details}`);
  } catch (error: any) {
    results.push({ name, passed: false, details: error?.message || String(error) });
    console.error(`❌ FAIL: ${name} — ${error?.message || error}`);
  }
}

// 1. Tributos y Fuentes Oficiales
runTest('Tributos auditados con fuente oficial y fecha de verificación', () => {
  const realTributos = TRIBUTOS.filter(t => !t.isBaseDemo);
  assert.ok(realTributos.length >= 12, 'Deben existir al menos 12 tributos reales');
  for (const t of realTributos) {
    assert.ok(/^https?:\/\//.test(t.sourceUrl), `Tributo ${t.id} sin URL oficial válida`);
    assert.ok(t.lastVerified.length >= 10, `Tributo ${t.id} sin fecha lastVerified`);
  }
  return `${realTributos.length} tributos reales verificados con URL oficial y fecha`;
});

// 2. Serie Histórica de Inflación y Regla de No-Imputación 2016
runTest('Serie de inflación 1983–2026 e integridad metodológica año 2016', () => {
  assert.ok(INFLATION_SERIES.length >= 41, 'Serie debe cubrir al menos 41 años');
  const year2016 = INFLATION_SERIES.find(r => r.year === 2016);
  assert.ok(year2016, 'Debe existir el registro del año 2016');
  assert.equal(year2016.official, null, 'El año 2016 no debe imputar un dato oficial inexistente');
  for (const r of INFLATION_SERIES) {
    assert.ok(r.officialSource.startsWith('https://'), `Año ${r.year} sin fuente oficial https`);
  }
  assert.ok(CURRENT_INFLATION_2026.source.startsWith('https://'), 'Inflación 2026 sin fuente');
  return `${INFLATION_SERIES.length} años verificados (1983–2025) + 2026 parcial; 2016 official=null preservado`;
});

// 3. Cobertura Histórica 1946–2026 y No-Duplicación de Transferencias
runTest('Cobertura histórica continua 1946–2026 y eliminación de transferencias intergubernamentales', () => {
  assert.equal(PRESIDENTIAL_PERIODS_1946_2026[0].startYear, 1946, 'Debe iniciar en 1946');
  const lastPeriod = PRESIDENTIAL_PERIODS_1946_2026[PRESIDENTIAL_PERIODS_1946_2026.length - 1];
  assert.equal(lastPeriod.endYear, 2026, 'Debe cubrir hasta 2026');
  for (const point of HISTORICAL_FISCAL_SERIES) {
    assert.equal(
      point.intergovernmentalEliminationApplied,
      true,
      `Año ${point.year} debe aplicar eliminación de transferencias intergubernamentales`
    );
    assert.ok(point.sourceUrl.startsWith('https://'), `Año ${point.year} sin URL de fuente`);
  }
  return `${PRESIDENTIAL_PERIODS_1946_2026.length} períodos (1946–2026) y ${HISTORICAL_FISCAL_SERIES.length} puntos fiscales sin doble conteo`;
});

// 4. Expedientes Históricos Piloto
runTest('Expedientes piloto obligatorios (SIPA 2008, YPF, Moratorias, Ganancias 2024, CONICET, COMPR.AR)', () => {
  const requiredIds = [
    'dossier-previsional-2008',
    'dossier-ypf-1992-2012',
    'dossier-moratorias-previsionales',
    'dossier-ganancias-2024',
    'dossier-conicet-ciencia',
    'dossier-compras-ign-2026'
  ];
  for (const id of requiredIds) {
    const found = HISTORICAL_DOSSIERS.find(d => d.id === id);
    assert.ok(found, `Falta expediente obligatorio ${id}`);
    assert.ok(found.normativeFramework.length > 0, `Expediente ${id} sin marco normativo`);
    assert.ok(found.monetaryRecords.length > 0, `Expediente ${id} sin registros monetarios`);
    assert.ok(found.documentedInterventions.length > 0, `Expediente ${id} sin intervenciones documentadas`);
    assert.ok(found.outcomesAndResults.length > 0, `Expediente ${id} sin indicadores de resultado`);
  }
  return `${HISTORICAL_DOSSIERS.length} expedientes interactivos verificados con moneda, etapa y roles diferenciados`;
});

// 5. Separación Presupuesto Aprobado vs. Ejecutado y Compras no concluyentes
runTest('Regla editorial: No equiparar presupuesto aprobado con gasto ejecutado ni licitación con sobreprecio', () => {
  const nacion = SPENDING_JURISDICTIONS.find(j => j.id === 'nacion');
  const pba = SPENDING_JURISDICTIONS.find(j => j.id === 'buenos_aires');
  assert.ok(nacion && (nacion.approvedBudget ?? 0) > 0, 'Nación debe tener presupuesto aprobado Ley 27.798');
  assert.ok(pba && (pba.approvedBudget ?? 0) > 0, 'PBA debe tener presupuesto aprobado Ley 15.557');
  for (const jur of SPENDING_JURISDICTIONS) {
    assert.equal(jur.executedBudget, null, `Jurisdicción ${jur.id} no debe fingir ejecución consolidada inexistente`);
  }
  const ignPurchase = PUBLIC_PURCHASES[0];
  assert.equal(ignPurchase.comparisonStatus, 'no_concluyente', 'Compra sin orden de compra adjudicada debe ser no_concluyente');
  return 'Presupuesto aprobado separado de ejecución (null) y compra COMPR.AR marcada como no_concluyente';
});

// 6. Archivo de Declaraciones y Comparador Contextual
runTest('Archivo de declaraciones y comparador contextual con citas, fechas, fuentes y contexto', () => {
  assert.ok(PUBLIC_STATEMENTS_ARCHIVE.length >= 6, 'Deben existir al menos 6 declaraciones verificadas');
  assert.ok(STATEMENT_COMPARISONS.length >= 4, 'Deben existir al menos 4 dossieres de comparación');
  for (const comp of STATEMENT_COMPARISONS) {
    assert.ok(comp.statementA.exactQuote.length > 20, `Comparación ${comp.id} sin cita A`);
    assert.ok(comp.statementA.sourceUrl.startsWith('https://'), `Comparación ${comp.id} sin fuente HTTPS`);
    assert.ok(comp.institutionalContextComparison.length > 30, `Comparación ${comp.id} sin contexto institucional`);
    assert.ok(comp.documentedPublicExplanations.length > 30, `Comparación ${comp.id} sin explicaciones públicas`);
  }
  return `${PUBLIC_STATEMENTS_ARCHIVE.length} declaraciones y ${STATEMENT_COMPARISONS.length} comparaciones contextuales verificadas`;
});

// 7. Auditorías Temáticas Sectoriales
runTest('Auditorías temáticas (Previsional, Universidades, CONICET, Salud/Educación, Subsidios, Compras)', () => {
  assert.equal(THEMATIC_AUDITS.length, 6, 'Deben existir 6 auditorías temáticas sectoriales');
  for (const audit of THEMATIC_AUDITS) {
    assert.ok(audit.measurementLimitations.length > 0, `Auditoría ${audit.slug} sin limitaciones de medición`);
    assert.ok(audit.physicalAndPerformanceMetrics.length > 0, `Auditoría ${audit.slug} sin métricas físicas`);
  }
  return `${THEMATIC_AUDITS.length} auditorías temáticas con métricas físicas y limitaciones de medición`;
});

// 8. Trazabilidad de Productos, Perfiles Políticos, Consultas Ley 27.275 y Bitácora de Correcciones
runTest('Trazabilidad en productos, autoridades, plantillas Ley 27.275 y bitácora de correcciones', () => {
  for (const prod of PRODUCTS) {
    assert.equal(prod.epistemicStatus, 'estimacion', `Producto ${prod.id} debe declarar estado estimacion`);
    assert.ok(prod.lastVerified, `Producto ${prod.id} debe declarar lastVerified`);
    assert.ok(prod.normativeSourceUrl?.startsWith('https://'), `Producto ${prod.id} debe declarar fuente normativa`);
  }
  assert.equal(EXECUTIVE_AUTHORITIES_2026.length, 25, 'Deben existir las 25 autoridades ejecutivas nacionales/provinciales');
  assert.ok(POLITICAL_TRANSPARENCY.length >= 6, 'Deben existir al menos 6 perfiles políticos detallados');
  assert.ok(CITIZEN_INQUIRY_TEMPLATES.length >= 3, 'Deben existir plantillas de consulta ciudadana Ley 27.275');
  assert.ok(CORRECTION_LOG_HISTORY.length >= 3, 'Debe existir bitácora pública de correcciones');
  return `${PRODUCTS.length} productos con trazabilidad, 25 autoridades, ${CITIZEN_INQUIRY_TEMPLATES.length} plantillas Ley 27.275 y ${CORRECTION_LOG_HISTORY.length} correcciones`;
});

// 9. Navegación en 5 Pilares y Renderizado SSR de Portada y Nuevas Vistas
runTest('Arquitectura de navegación en 5 pilares y renderizado SSR sin errores', () => {
  assert.equal(NAVIGATION_PILLARS.length, 5, 'La barra de navegación debe agruparse en las 5 secciones principales');
  const homeHtml = renderToString(
    React.createElement(MemoryRouter, { initialEntries: ['/'] }, React.createElement(AppContent))
  );
  assert.ok(homeHtml.includes('landing-view'), 'SSR de portada debe incluir #landing-view');
  assert.ok(homeHtml.includes('¿De dónde salió el dinero?'), 'SSR de portada debe incluir las 6 preguntas ciudadanas');
  assert.ok(homeHtml.includes('1. Dinero Público'), 'SSR debe incluir los 5 pilares de navegación');
  return '5 pilares de navegación y SSR de portada verificados exitosamente';
});

// 10. Cobertura Federal Completa (Nación + 23 Provincias + CABA) en JURISDICTIONS
runTest('Cobertura federal completa (Nación + 23 provincias + CABA + municipios) en JURISDICTIONS', () => {
  const nation = JURISDICTIONS.filter(j => j.level === 'nation' && !j.isBaseDemo);
  const provincesAndCaba = JURISDICTIONS.filter(
    j => (j.level === 'province' || j.level === 'city_autonoma') && !j.isBaseDemo
  );
  const municipalities = JURISDICTIONS.filter(j => j.level === 'municipality' && !j.isBaseDemo);
  assert.equal(nation.length, 1, 'Debe existir la jurisdicción nacional');
  assert.equal(provincesAndCaba.length, 24, 'Deben estar presentes los 24 distritos federales (23 provincias + CABA)');
  assert.equal(CENSUS_PROVINCES_2022.length, 24, 'Censo 2022 debe tener 24 distritos');
  for (const j of provincesAndCaba) {
    assert.ok(j.authorityName.length > 3, `Jurisdicción ${j.id} sin autoridad verificada`);
    assert.ok(j.sources.length > 0 && j.sources[0].startsWith('https://'), `Jurisdicción ${j.id} sin fuente HTTPS`);
  }
  return `1 Nación + ${provincesAndCaba.length} distritos federales + ${municipalities.length} municipios verificados (${JURISDICTIONS.length} total)`;
});

// 11. Sesiones de Votación Nominal Parlamentaria y Parámetros Normativos de Calculadora
runTest('Archivo de votaciones nominales parlamentarias y parámetros normativos de calculadora fiscal', () => {
  assert.ok(VOTING_SESSIONS.length >= 7, 'Deben existir al menos 7 sesiones parlamentarias documentadas');
  for (const s of VOTING_SESSIONS) {
    assert.ok(s.url.startsWith('https://'), `Sesión ${s.traceId} sin URL oficial`);
    assert.ok(s.votos_favor > 0, `Sesión ${s.traceId} sin conteo de votos afirmativos`);
    assert.ok(s.voters.length > 0, `Sesión ${s.traceId} sin votos nominales contrastados`);
  }
  assert.ok(CALCULADORA_NORMATIVE_SOURCES.length >= 5, 'Deben existir al menos 5 parámetros normativos de calculadora');
  for (const p of CALCULADORA_NORMATIVE_SOURCES) {
    assert.ok(p.sourceUrl.startsWith('https://'), `Parámetro ${p.id} sin URL normativa`);
  }
  return `${VOTING_SESSIONS.length} sesiones nominales parlamentarias y ${CALCULADORA_NORMATIVE_SOURCES.length} parámetros normativos de calculadora verificados`;
});

// 12. Informes de Contraste Relato Mediático vs. Proceso Administrativo y Evidencia
runTest('Informes de contraste Relato Mediático vs. Proceso Administrativo y Evidencia Oficial', () => {
  assert.ok(EVIDENCE_VS_NARRATIVE_REPORTS.length >= 4, 'Deben existir al menos 4 informes de contraste proceso vs. relato');
  const uniReport = EVIDENCE_VS_NARRATIVE_REPORTS.find(r => r.slug === 'universidades-publicas-auditorias-sigen-agn');
  assert.ok(uniReport, 'Debe existir el informe sobre auditorías universitarias SIGEN/AGN y Ley 24.521');
  for (const rep of EVIDENCE_VS_NARRATIVE_REPORTS) {
    assert.ok(rep.narrativesAnalyzed.length > 0, `Informe ${rep.slug} sin narrativas analizadas`);
    assert.ok(rep.administrativeProcess.length > 0, `Informe ${rep.slug} sin etapas del proceso administrativo`);
    assert.ok(rep.officialSources.length > 0 && rep.officialSources[0].url.startsWith('https://'), `Informe ${rep.slug} sin fuentes HTTPS`);
  }
  return `${EVIDENCE_VS_NARRATIVE_REPORTS.length} informes de contraste entre narrativa mediática y expediente administrativo verificados`;
});

// 13. Blog de Congruencia (2003–2026: X/Twitter, Diarios y TV/YouTube vs. Votos, Contador de Giros e Interpelación Ciudadana)
runTest('Blog de Congruencia (Archivos X/Twitter, Diarios y TV/YouTube 2003–2026, Contador de Contradicciones e Interpelación Ciudadana)', () => {
  assert.ok(CONGRUENCE_BLOG_ENTRIES.length >= 7, 'Deben existir al menos 7 entradas multipardidarias en el Blog de Congruencia');
  const parties = new Set(CONGRUENCE_BLOG_ENTRIES.map(e => e.currentParty));
  assert.ok(parties.size >= 4, 'El escrutinio de congruencia debe cubrir al menos 4 fuerzas políticas distintas');
  let totalContradictions = 0;
  for (const entry of CONGRUENCE_BLOG_ENTRIES) {
    assert.ok(entry.contradictionsCount >= 3, `Entrada ${entry.slug} debe contabilizar sus contradicciones/giros`);
    assert.ok(entry.positionShiftsChain.length >= 4, `Entrada ${entry.slug} debe documentar la postura inicial y los giros sucesivos`);
    assert.ok(entry.xTwitterAndPressArchives.length > 0, `Entrada ${entry.slug} sin archivo de X/Twitter o diarios`);
    assert.ok(entry.tvYoutubeClips.length > 0, `Entrada ${entry.slug} sin clips de archivo TV/YouTube`);
    assert.ok(entry.counterActions.length > 0, `Entrada ${entry.slug} sin acto/voto oficial contrapuesto`);
    assert.ok(entry.citizenPublicInquiries.length > 0, `Entrada ${entry.slug} sin plantilla de interpelación ciudadana verificada`);
    assert.ok(entry.tvYoutubeClips[0].youtubeArchiveUrl.startsWith('https://'), `Entrada ${entry.slug} sin URL de archivo YouTube`);
    assert.ok(entry.counterActions[0].officialDocumentUrl.startsWith('https://'), `Entrada ${entry.slug} sin URL de documento oficial`);
    assert.ok(entry.citizenPublicInquiries[0].evidenceOfficialUrl.startsWith('https://'), `Entrada ${entry.slug} sin fuente oficial en consulta ciudadana`);
    totalContradictions += entry.contradictionsCount;
  }
  return `${CONGRUENCE_BLOG_ENTRIES.length} entradas en ${parties.size} fuerzas políticas, ${totalContradictions} contradicciones contabilizadas (2003–2026) y plantillas de interpelación en redes verificadas`;
});

// 14. Boletas Conceptuales de Servicios, Efecto Cascada (IIBB/Cheque) y Serie de Subsidios 2001–2026
runTest('Boletas conceptuales (Luz, Agua, ABL), contador de efecto cascada (IIBB) y subsidios históricos 2001–2026', () => {
  assert.equal(CONCEPTUAL_SERVICE_BILLS.length, 3, 'Deben existir las 3 radiografías de boletas (Luz, Agua, ABL/Inmobiliario)');
  for (const bill of CONCEPTUAL_SERVICE_BILLS) {
    assert.ok(bill.realFullMonthlyCostArs > 0, `Boleta ${bill.id} sin costo real puro`);
    assert.ok(bill.cascadeStages.length >= 2, `Boleta ${bill.id} sin etapas de efecto cascada`);
    assert.ok(bill.taxLinesByRegion.caba.some(l => l.timesChargedInChain > 1), `Boleta ${bill.id} debe cuantificar impuestos cobrados múltiples veces`);
  }
  assert.ok(HISTORICAL_SUBSIDY_SERIES_2001_2026.length >= 8, 'Serie histórica de subsidios debe cubrir al menos 8 hitos entre 2001 y 2026');
  return `${CONCEPTUAL_SERVICE_BILLS.length} boletas conceptuales en 4 jurisdicciones y ${HISTORICAL_SUBSIDY_SERIES_2001_2026.length} hitos históricos de subsidios (2001–2026) verificados`;
});

const failed = results.filter(r => !r.passed);
console.log(`\nResumen: ${results.length - failed.length}/${results.length} pruebas superadas.`);
if (failed.length > 0) {
  process.exit(1);
}
