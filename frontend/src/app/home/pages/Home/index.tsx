import React, { useState } from 'react';
import SearchFilterComponent from '../../../../shared/components/SearchFilterComponent';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Lógica para executar a pesquisa com base na query
  };

  const handleFilter = () => {
    // Lógica para aplicar o filtro
  };

  return (

      <SearchFilterComponent
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
      />
  );
};

export default Home;