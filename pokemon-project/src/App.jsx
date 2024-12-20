import React, { useState } from 'react';
import './App.css';
import PokedexGrid from './Components/PokedexGrid';
import PokemonTypeFilter from './Components/PokemonTypeFilter';

function App() {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeSelect = (types) => {
    setSelectedTypes(types);
  };

  return (
    <div >
      <PokemonTypeFilter
        availableTypes={["fire", "water", "grass", "electric", "psychic"]}
        selectedTypes={selectedTypes}
        onTypeSelect={handleTypeSelect}
      />
      <PokedexGrid selectedTypes={selectedTypes} />
    </div>
  );
}

export default App;
