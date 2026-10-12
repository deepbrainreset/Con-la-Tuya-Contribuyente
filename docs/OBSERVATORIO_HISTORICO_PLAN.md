# Plan de implementación — Observatorio histórico del gasto público (1946–actualidad)

Estado: propuesta técnica basada en inspección de package.json, src/App.tsx, README.md e index.html del repositorio vigente. No implica despliegue.

## Arquitectura existente
React 19 + Vite 6 + TypeScript + Tailwind 4 + React Router 7 (HashRouter) + Recharts 3 + Express. Conservar rutas y componentes existentes.

## Alcance funcional
1. Origen: impuestos, contribuciones, tasas, rentas, deuda, emisión cuando corresponda.
2. Destino: jurisdicción, organismo, programa, partida, expediente, proveedor, beneficiario.
3. Ejecución: distinguir crédito presupuestario, compromiso, devengado, pagado y entregado.
4. Resultados: indicadores documentados, metodología y limitaciones.
5. Responsabilidad: personas, cargos, fechas, firmas, votos nominales y atribuciones verificables.
6. Discursos: declaraciones fechadas con fuentes audiovisuales o textuales completas, comparaciones por tema y contexto, sin puntajes partidarios.
7. Investigación: CONICET desde 1958, antecedentes previos, publicaciones, proyectos y financiamiento cuando pueda vincularse sin inferencias arbitrarias.
8. Universidad: costos y resultados como subsección del observatorio, no núcleo del sitio.
9. Participación: consultas individuales redactadas y confirmadas por el ciudadano; sin campañas automáticas masivas.

## Modelo de datos mínimo
- jurisdiction(id,name,level,parent_id,valid_from,valid_to)
- organization(id,jurisdiction_id,name,valid_from,valid_to)
- official(id,full_name,photo_source_url)
- tenure(id,official_id,organization_id,position,start_date,end_date)
- source(id,url,publisher,publication_date,archive_url,sha256,accessed_at)
- budget_record(id,period,organization_id,program,stage,currency,nominal_amount,source_id)
- transfer(id,from_organization_id,to_organization_id,amount,period,source_id)
- procurement(id,organization_id,process_id,stage,amount,source_id)
- action(id,kind,date,organization_id,source_id)
- participation(id,action_id,official_id,role,source_id)
- statement(id,official_id,date,topic,transcript,media_url,timestamp_seconds,source_id)
- comparison(id,statement_a_id,statement_b_id,context,review_status)
- research_output(id,institution_id,kind,title,year,source_id)
- funding_link(id,research_output_id,budget_record_id,attribution_method,confidence)
- outcome(id,program_id,metric,period,value,methodology,source_id)
- correction(id,entity_type,entity_id,reason,old_value,new_value,source_id,reviewed_at)

## Integridad y controles
- Nunca duplicar transferencias intergubernamentales al consolidar.
- Moneda nominal y conversiones separadas, con series de precios y metodología explícitas.
- Nunca equiparar presupuesto previsto con gasto ejecutado.
- Ausencia de impacto documentado != impacto nulo.
- No inferir motivación, delito o deshonestidad de cambios de discurso.
- Versionado, procedencia de fuentes, correcciones públicas y derecho de respuesta.
- Identidades, fotografías y perfiles solo de fuentes públicas verificables.
- Revisión humana antes de publicar comparaciones controvertidas.

## Fases
F0. Inventario completo de vistas, rutas, APIs y fuentes; pruebas de regresión.
F1. Esquema de datos, ingestión con procedencia, normalización y auditoría.
F2. Explorador por año/jurisdicción/organismo y trazabilidad de flujos.
F3. Expedientes y fichas de responsables con fuentes y correcciones.
F4. Archivo audiovisual de declaraciones y comparador contextual.
F5. CONICET y auditoría universitaria con cobertura y límites documentados.
F6. Consultas ciudadanas individuales y seguimiento de respuestas.
F7. SEO: rutas reales, compatibilidad de hashes, SSR/prerender por página, canonical, sitemap, validación.

## Primer MVP
Un conjunto pequeño de expedientes históricos con documentos originales, visualización de etapas presupuestarias, filtros y fichas de participación documentada. Los registros de demostración se identifican como tales; no se presentan como hechos reales.

## Criterios de aceptación
- npm run lint y npm run build pasan.
- No se rompen rutas existentes.
- Todo importe público visible tiene período, moneda, etapa y fuente.
- Todo nombre asociado a una acción tiene evidencia de participación.
- Toda comparación de discursos contiene ambas fuentes, fecha y contexto.
- Navegación móvil y accesibilidad comprobadas en navegador real.
- Despliegue solo después de validación.
