import React, { useMemo, useState } from 'react';
import { ExternalLink, Search, ShieldCheck, Users, Vote, AlertTriangle } from 'lucide-react';
import { TRIBUTOS } from '../data/tributos';

interface VerifiedVoterCard {
  name: string;
  partyAtVote: string;
  district: string;
  vote: 'AFIRMATIVO' | 'NEGATIVO';
  imageUrl: string;
  profileUrl: string;
  actUrl: string;
}

const VERIFIED_VOTER_SAMPLE: VerifiedVoterCard[] = [
  {
    name: 'Cristian A. Ritondo',
    partyAtVote: 'PRO',
    district: 'Buenos Aires',
    vote: 'AFIRMATIVO',
    imageUrl: 'https://parlamentaria.hcdn.gob.ar/image/20178562038_20200206125410_medium.png',
    profileUrl: 'https://www.hcdn.gob.ar/diputados/critondo',
    actUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
  },
  {
    name: 'José Luis Espert',
    partyAtVote: 'La Libertad Avanza',
    district: 'Buenos Aires',
    vote: 'AFIRMATIVO',
    imageUrl: 'https://parlamentaria.hcdn.gob.ar/image/23146233759_20240319150534000_medium.png',
    profileUrl: 'https://www.hcdn.gob.ar/diputados/jespert',
    actUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
  },
  {
    name: 'Máximo Carlos Kirchner',
    partyAtVote: 'Unión por la Patria',
    district: 'Buenos Aires',
    vote: 'NEGATIVO',
    imageUrl: 'https://parlamentaria.hcdn.gob.ar/image/20258693109_20231128170631000_medium.png',
    profileUrl: 'https://www.hcdn.gob.ar/diputados/mkirchner/index.html',
    actUrl: 'https://votaciones.hcdn.gob.ar/pdf/acta/5274'
  }
];

const normalizeParty = (party: string) => party.trim() || 'Sin atribución partidaria';

export default function ResponsabilidadPolitica() {
  const [search, setSearch] = useState('');

  const auditedTributes = useMemo(
    () => TRIBUTOS.filter(t => !t.isBaseDemo && t.status !== 'pendiente_verificacion'),
    []
  );

  const partyShare = useMemo(() => {
    const counts = new Map<string, number>();
    auditedTributes.forEach(t => {
      const party = normalizeParty(t.propuestoPorPartido);
      counts.set(party, (counts.get(party) || 0) + 1);
    });
    const total = auditedTributes.length || 1;
    return Array.from(counts.entries())
      .map(([party, count]) => ({ party, count, percentage: (count / total) * 100 }))
      .sort((a, b) => b.count - a.count || a.party.localeCompare(b.party));
  }, [auditedTributes]);

  const filteredVoters = VERIFIED_VOTER_SAMPLE.filter(v =>
    `${v.name} ${v.partyAtVote} ${v.district} ${v.vote}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 py-4 text-left" id="responsabilidad-politica-view">
      <section className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-black">
          <Vote className="w-4 h-4" />
          <span>Trazabilidad política auditable</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Quién impulsó y quién votó los tributos</h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          Atribución partidaria sobre el universo actualmente indexado en Con La Tuya Contribuyente y registro nominal de votos cuando existe un acta oficial verificable. Los porcentajes no representan todavía la totalidad de impuestos y tasas de Argentina: representan exclusivamente los registros cargados y no-demo de esta base.
        </p>
      </section>

      <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Participación por partido en la creación/impulso</h2>
            <p className="text-xs text-slate-500 mt-1">Denominador actual: {auditedTributes.length} tributos indexados, no-demo y no pendientes.</p>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Se recalcula automáticamente al ampliar la base</div>
        </div>

        <div className="space-y-3">
          {partyShare.map(item => (
            <div key={item.party} className="grid grid-cols-1 md:grid-cols-[minmax(240px,1fr)_3fr_90px] gap-2 md:gap-4 items-center">
              <div>
                <div className="text-xs font-bold text-slate-200">{item.party}</div>
                <div className="text-[10px] text-slate-500">{item.count} {item.count === 1 ? 'tributo' : 'tributos'}</div>
              </div>
              <div className="h-3 bg-slate-950 border border-slate-850 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/70" style={{ width: `${item.percentage}%` }} />
              </div>
              <div className="font-mono font-black text-white md:text-right">{item.percentage.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-5 flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-amber-200">Corrección de integridad del dataset nominal</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            El prototipo anterior contenía nombres cargados manualmente que no coincidían en todos los casos con el padrón real de cada sesión. Esta sección no reutiliza esos registros como evidencia. Los nombres visibles abajo fueron contrastados contra el acta nominal oficial de la Cámara de Diputados. El padrón completo se incorporará únicamente desde actas oficiales, preservando voto, bloque y distrito de la fecha de la votación.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-400" /><h2 className="text-lg font-bold text-white">Políticos con voto nominal verificado</h2></div>
            <p className="text-xs text-slate-500 mt-1">Muestra auditada inicial: Ganancias — O.D. 157, 28/06/2024 01:34. Acta oficial N.º 3.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar político, partido o voto..." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVoters.map(voter => (
            <article key={voter.name} className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-slate-950 overflow-hidden flex items-center justify-center">
                <img src={voter.imageUrl} alt={`Foto oficial de ${voter.name}`} className="w-full h-full object-cover object-top" loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-extrabold text-white">{voter.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{voter.partyAtVote} · {voter.district}</p>
                </div>
                <div className={`inline-flex px-2.5 py-1 rounded-full border text-[10px] font-mono font-black ${voter.vote === 'AFIRMATIVO' ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/25 bg-rose-500/10 text-rose-300'}`}>{voter.vote}</div>
                <div className="flex flex-wrap gap-3 text-[11px]">
                  <a href={voter.profileUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">Perfil oficial <ExternalLink className="w-3 h-3" /></a>
                  <a href={voter.actUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">Acta nominal <ExternalLink className="w-3 h-3" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950/50 border border-slate-900 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-white">Regla de publicación</h3>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            Una persona sólo debe aparecer como “votó a favor/en contra” si existe acta nominal oficial o fuente legislativa primaria equivalente. Para leyes con votación no nominal, la web debe mostrar “sin trazabilidad nominal disponible”, no inferir el voto por bloque o afiliación partidaria.
          </p>
        </div>
      </section>
    </div>
  );
}
