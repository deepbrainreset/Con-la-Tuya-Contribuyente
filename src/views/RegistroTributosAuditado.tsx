import React from 'react';
import RegistroTributos from './RegistroTributos';
import TrazabilidadPoliticoFiscal from '../components/TrazabilidadPoliticoFiscal';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function RegistroTributosAuditado({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="space-y-8">
      <RegistroTributos searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TrazabilidadPoliticoFiscal />
    </div>
  );
}
