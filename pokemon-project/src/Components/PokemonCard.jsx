import React from 'react';

const PokemonCard = ({ id, name, types, image }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg bg-white text-center bg-blue-300">
            <img
                src={image}
                alt={name}
                className="mx-auto w-24 h-24 object-contain mb-4"
            />
            <h1 className="text-lg  capitalize">Name:- {name}</h1>
            <h2 className="text-sm text-gray-500 mb-2">ID: {id}</h2>
            <div>
                <strong className="block text-sm font-semibold mb-2">Types:</strong>
                <div className="flex justify-center gap-2 flex-wrap">
                    {types.map((type1, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs capitalize"
                        >
                            {type1.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
