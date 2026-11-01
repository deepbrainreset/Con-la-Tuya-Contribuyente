# Validación de la sección de servicios — 01/11/2026

## Alcance

Revisión de los cambios de servicios, sus enlaces, navegación, metadatos, bitácora y controles. No es una certificación de todos los datos del resto del sitio ni del universo de litigios tributarios argentinos.

## Controles técnicos

- `npm run lint`: TypeScript sin errores.
- `npm test`: 17/17 pruebas aprobadas. La regresión de servicios comprueba renderizado de cinco fichas y ocho contrastes, enlaces temporizados y ausencia de la antigua tabla sin respaldo en la vista pública.
- `npm run build`: compilación de cliente, prerender de portada y servidor completados.
- `git diff --check`: sin errores de espacios.
- Navegador sobre el servidor compilado: la ruta `/#/boletas-y-subsidios` carga, tiene el título esperado, muestra los ocho contrastes y permite abrir el detalle sobre el supuesto DNU.
- Revisión de ancho móvil: ancho de contenido y de documento iguales (375 px), sin desbordamiento horizontal. Sin mensajes de error o advertencia en la consola observada.
- Navegación y enlaces se mantienen con la ruta anterior. Portada, menú y pie se actualizan a “Impuestos en Servicios”.

## Fuentes

Se cotejaron textos normativos y fuentes oficiales; ver `SERVICIOS_VERIFICACION.md`. Las tres resoluciones en el Boletín Oficial respondieron HTTP 200 y su contenido incluyó el identificador normativo esperado. Otros siete enlaces documentales respondieron HTTP 200. El portal Normativa presentó HTTP 500 en acceso directo, por lo que las fichas enlazan sus publicaciones originales del Boletín Oficial.

La transcripción automática se recuperó en un segundo recorrido; se contrastaron ocho afirmaciones o conjuntos de afirmaciones del tramo pedido y su contexto. Los textos judiciales de Quilmes y boletas individuales siguen pendientes y así se indica públicamente.

## Publicación

La rama remota por defecto es `main`; no hay otra rama de producción en el inventario consultado. La integración se realiza por solicitud de cambios a `main`, después de los controles de GitHub. No se identificó un sitio de producción ni un despliegue conectado: fusionar código no certifica una publicación web externa.
