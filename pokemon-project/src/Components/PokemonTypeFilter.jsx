import React from "react";

const PokemonTypeFilter = ({ availableTypes, selectedTypes, onTypeSelect }) => {
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onTypeSelect(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeSelect([...selectedTypes, type]);
    }
  };

  return (
    <div className="type-filter flex flex-wrap gap-2 p-4 justify-center">
      {availableTypes.map((type) => (
        <button
          key={type}
          className={`py-2 px-4 rounded-lg text-white font-semibold transition-colors duration-200 ease-in-out 
            ${selectedTypes.includes(type) ? "bg-red-500" : "bg-gray-500 hover:bg-red-300"}`}
          onClick={() => toggleType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypeFilter;
