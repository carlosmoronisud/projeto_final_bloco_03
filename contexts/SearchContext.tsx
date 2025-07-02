import React, { createContext, useState, useContext, type ReactNode } from 'react';

// 1. Definir o tipo para o contexto de busca
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// 2. Criar o contexto
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// 3. Criar o provedor de contexto
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const contextValue: SearchContextType = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

// 4. Hook personalizado para consumir o contexto de busca
// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider');
  }
  return context;
};