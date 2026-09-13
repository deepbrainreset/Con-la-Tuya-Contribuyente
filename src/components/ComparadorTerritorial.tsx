import React, { useMemo, useState } from 'react';
import { MapPin, AlertTriangle, Landmark } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { PRODUCTS } from '../data/productos';

const money = (value: number) => `$${Math.round(value).toLocaleString('es-AR')}`;
const pct = (value: number) => `${value.toFixed(2)}%`;

export default function ComparadorTerritorial() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [jurisdictionId, setJurisdictionId] = useState('caba');

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const jurisdiction = JURISDICTIONS.find(j => j.id === jurisdictionId) || JURISDICTIONS[0];
  const parent = jurisdiction.parentId ? JURISDICTIONS.find(j => j.id === jurisdiction.parentId) : undefined;

  const baseCost = product.basePrice + product.logistics;
  const national = product.taxNational;
  const baselineProvincial = product.taxProvincial;
  const baselineMunicipal = product.taxMunicipal;
  const margin = product.margin;
  const baselineTotal = baseCost + national + baselineProvincial + baselineMunicipal + margin;

  const locationLabel = useMemo(() => {
    if (jurisdiction.level === 'municipality' && parent) return `${jurisdiction.name}, ${parent.name}`;
    return jurisdiction.name;
  }, [jurisdiction, parent]);

  const needsProvince = jurisdiction.level === 'province' || jurisdiction.level === 'city_autonoma' || jurisdiction.level === 'municipality';
  const needsMunicipality = jurisdiction.level === 'municipality';

  return (
    <section className="space-y-5 bg-slate-900/30 border border-slate-800 rounded-2xl p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold text-white">Comparador territorial del precio final</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
            El mismo producto puede terminar con un precio distinto según provincia y municipio porque la carga nacional es común, pero Ingresos Brutos, Sellos y tasas locales dependen de la jurisdicción y de la actividad. Este comparador sólo calcula diferencias territoriales cuando existe una alícuota sectorial verificada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1"><span className="text-[9px] uppercase font-mono text-slate-500">Producto</span><select value={productId} onChange={e => setProductId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">{PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label className="space-y-1"><span className="text-[9px] uppercase font-mono text-slate-500">Jurisdicción de compra</span><select value={jurisdictionId} onChange={e => setJurisdictionId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">{JURISDICTIONS.filter(j => !j.isBaseDemo && j.level !== 'nation').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}</select></label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card title="Costo + logística" value={money(baseCost)} note="Base modelada común del producto." />
        <Card title="Carga nacional" value={money(national)} note={`${pct(baselineTotal > 0 ? national / baselineTotal * 100 : 0)} del precio base modelado.`} />
        <Card title="Carga provincial" value={needsProvince ? 'Sin datos verificados' : 'No aplica'} note={needsProvince ? 'Falta alícuota sectorial oficial cargada para esta jurisdicción.' : 'Compra a nivel Nación sin provincia seleccionada.'} muted />
        <Card title="Carga municipal" value={needsMunicipality ? 'Sin datos verificados' : 'No desagregada'} note={needsMunicipality ? 'Falta tasa municipal específica para esta actividad.' : 'No hay municipio específico seleccionado o CABA integra competencias locales.'} muted />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-400" /><h3 className="text-sm font-bold text-white">{locationLabel}</h3></div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Autoridad</span><span className="text-slate-200">{jurisdiction.authorityName}</span></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Fuerza política</span><span className="text-slate-200">{jurisdiction.authorityParty}</span></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Tributos activos registrados</span><span className="text-slate-200">{jurisdiction.activeTaxesCount}</span></div>
            <div><span className="text-[9px] uppercase font-mono text-slate-500 block">Nivel de evidencia general</span><span className="text-slate-200">{jurisdiction.confidenceLevel}</span></div>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">{jurisdiction.summary}</p>
        </div>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <span className="text-[9px] uppercase font-mono text-amber-400 block">Precio territorial final</span>
          <strong className="text-lg text-white block mt-1">Pendiente de datos verificados</strong>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">No se reemplaza el componente provincial/municipal del modelo base hasta contar con alícuotas oficiales por actividad, período y jurisdicción.</p>
        </div>
      </div>

      <div className="flex gap-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl text-xs text-sky-100/80 leading-relaxed"><AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><p><strong>Por qué puede variar el precio:</strong> un producto vendido en CABA, Provincia de Buenos Aires, Córdoba o un municipio específico puede soportar distintas alícuotas de IIBB, Sellos y tasas de seguridad e higiene. Además, la cantidad de eslabones sujetos a esos tributos puede cambiar. El comparador no equipara jurisdicciones hasta disponer de esas tasas de manera verificable.</p></div>
    </section>
  );
}

function Card({ title, value, note, muted = false }: { title: string; value: string; note: string; muted?: boolean }) {
  return <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4"><span className="text-[9px] uppercase font-mono text-slate-500 block">{title}</span><strong className={`text-base font-mono block mt-1 ${muted ? 'text-amber-300' : 'text-white'}`}>{value}</strong><p className="text-[9px] text-slate-500 mt-1 leading-relaxed">{note}</p></div>;
}
