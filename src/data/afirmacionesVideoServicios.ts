export const VIDEO_SERVICE_CLAIMS = [
  {
    time: '08:50–09:07', seconds: 530, status: 'No acreditado como afirmación general',
    claim: 'Las bajas nacionales contrastan con aumentos de gobernadores e intendentes.',
    finding: 'El video no identifica tributos, jurisdicciones ni períodos comparables para sostener una exclusividad nacional o una compensación causal. Sí hay una suba local documentada: Quilmes dispuso actualizar un 10 % importes, topes y alícuotas desde noviembre de 2025. Ese aumento relativo no significa una tasa uniforme del 10 % sobre todas las facturas ni prueba que responda a una baja nacional.',
    source: 'Quilmes, Decreto 3272/2025, 15/10/2025', url: 'https://sibom.slyt.gba.gov.ar/bulletins/13655/contents/2303739'
  },
  {
    time: '09:08–09:22', seconds: 548, status: 'Generalización no válida',
    claim: 'Un 10 % de la factura eléctrica se destina al municipio.',
    finding: 'Hay recaudación municipal mediante distribuidoras, pero no una alícuota nacional uniforme del 10 %. Como contraejemplo fechado, el Decreto 2227 de Junín de 2025 describe tasas del 25 %, 12 % y 4 % sobre el facturado neto según categoría, y bonifica al 2 % la categoría de consumos mayores a 30.000 kWh/mes. No son porcentajes del total final ni valores aplicables a Quilmes.',
    source: 'Junín, Decreto 2227, 22/09/2025', url: 'https://boletinoficial.junin.gob.ar/decretogobierno/show.xhtml?id=25307'
  },
  {
    time: '09:15–09:19', seconds: 555, status: 'Duplicación no acreditada en un caso concreto',
    claim: 'Cobrar ABL y alumbrado en la factura eléctrica implica pagar dos veces la iluminación.',
    finding: 'El manual histórico del ENRE contempla reclamos por cobro simultáneo. Eso documenta un supuesto reclamable, pero el video no exhibe boletas, ordenanza e imputaciones de un contribuyente para probar una duplicación específica. ABL y electricidad domiciliaria tampoco son prestaciones idénticas.',
    source: 'ENRE, manual de reclamos, apartado 2.8.40 (documento histórico)', url: 'https://www.enre.gov.ar/web/bibliotd.nsf/203df3042bad9c40032578f6004ed613/16180c756e025830032579ea0042c679/%24FILE/anexo.pdf'
  },
  {
    time: '09:23–09:29 y 10:02–10:10', seconds: 563, status: 'Instrumento normativo incorrecto',
    claim: 'La prohibición de cargos ajenos en las boletas se dictó mediante un DNU.',
    finding: 'La medida identificada es la Resolución 267/2024 de la Secretaría de Industria y Comercio, publicada el 11/09/2024; no es un DNU. Electricidad y gas tienen además resoluciones regulatorias específicas. La restricción de facturación no equivale a derogar la tasa.',
    source: 'Resolución SIyC 267/2024, arts. 1–3', url: 'https://www.boletinoficial.gov.ar/detalleAviso/primera/313712/20240911'
  },
  {
    time: '09:30–09:53', seconds: 570, status: 'Ejemplo condicionado a la base de cálculo',
    claim: 'Una factura de $200.000 se reduciría aproximadamente a $180.000 sin un cargo del 10 %.',
    finding: 'Si el cargo fuera el 10 % de un neto sin otros conceptos, un total de $200.000 implica un neto de $181.818,18 y un cargo de $18.181,82. Si fuera el 10 % del total, restar $20.000 daría $180.000. El expositor reconoce que redondea. La factura real requiere conocer la base, los demás tributos y sus interacciones; no puede prometerse ese ahorro.',
    source: 'Ejemplo de base imponible local: Junín, Decreto 2227/2025', url: 'https://boletinoficial.junin.gob.ar/decretogobierno/show.xhtml?id=25307'
  },
  {
    time: '09:54–10:02', seconds: 594, status: 'Confunde impago del servicio e impago de la tasa',
    claim: 'La falta de pago del componente municipal habilita el corte de electricidad.',
    finding: 'El manual histórico del ENRE indica que la falta de pago de la tasa de alumbrado no autoriza por sí sola a suspender el suministro. Esto es distinto de la deuda por el servicio eléctrico. Su aplicación a una factura actual requiere revisar el régimen y eventuales decisiones judiciales; no se recomienda dejar de pagar a partir del video.',
    source: 'ENRE, manual de reclamos, apartado 2.8.40 (documento histórico)', url: 'https://www.enre.gov.ar/web/bibliotd.nsf/203df3042bad9c40032578f6004ed613/16180c756e025830032579ea0042c679/%24FILE/anexo.pdf'
  },
  {
    time: '10:12–10:24', seconds: 612, status: 'Secuencia de Quilmes pendiente de acreditar',
    claim: 'Quilmes y otros municipios obtuvieron un fallo favorable y luego uno contrario.',
    finding: 'El comunicado nacional del 21/02/2025 informa rechazos de amparos de Tigre, Hurlingham, Moreno, General Rodríguez, José C. Paz, Ituzaingó y San Martín; Quilmes no integra esa lista. Ese comunicado no prueba la secuencia procesal de Quilmes, ni sustituye los fallos, ni acredita firmeza. No se atribuye una resolución universal a todos los municipios.',
    source: 'Ministerio de Economía, comunicado del 21/02/2025', url: 'https://www.argentina.gob.ar/noticias/la-justicia-avalo-la-medida-del-gobierno-que-prohibe-incluir-tasas-municipales-en-las'
  },
  {
    time: '10:24–10:30', seconds: 624, status: 'No acreditado con boleta verificable',
    claim: 'Las facturas de Quilmes incluyen una aclaración sobre este asunto.',
    finding: 'No se obtuvo una factura fechada y verificable que permita establecer el texto y su alcance. La Resolución AAIP 9/2018 documenta antecedentes del convenio EDESUR–Quilmes, pero no prueba la leyenda de las boletas aludidas ni su contenido actual.',
    source: 'AAIP, Resolución 9/2018, antecedentes documentales', url: 'https://www.argentina.gob.ar/sites/default/files/rs-2018-9-apn-aaip.pdf'
  }
] as const;
