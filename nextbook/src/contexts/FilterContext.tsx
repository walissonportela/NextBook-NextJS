// CONTEXTO DE FILTROS

'use client';

import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define os tipos para os valores do nosso contexto
interface FilterContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  priceFilters: string[];
  setPriceFilters: Dispatch<SetStateAction<string[]>>;
}

// Cria o contexto
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Cria o provedor que irá envolver nossa aplicação
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilters, setPriceFilters] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ searchQuery, setSearchQuery, priceFilters, setPriceFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};