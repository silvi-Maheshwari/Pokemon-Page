import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokedexGrid = ({ selectedTypes }) => {
    const [pokemonCard, setPokemonCard] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 8;

    const getData = () => {
        setIsLoading(true); 
        axios
            .get('https://pokeapi.co/api/v2/pokemon?limit=100')
            .then((res) => {
                const pokemonResults = res.data.results;

                const detailedPromises = pokemonResults.map((pokemon) =>
                    axios.get(pokemon.url).then((detailsRes) => detailsRes.data)
                );

                Promise.all(detailedPromises).then((detailedPokemon) => {
                    setPokemonCard(detailedPokemon);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error('Error fetching Pokémon data:', err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const filtered = pokemonCard.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
            const matchesTypes = selectedTypes.every((type) =>
                pokemon.types.some((pokemonType) => pokemonType.type.name === type)
            );
            return matchesSearch && matchesTypes;
        });

        const sortedFiltered = filtered.sort((a, b) => {
            if (sortField === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortField === 'type') {
                const typeA = a.types[0]?.type.name || '';
                const typeB = b.types[0]?.type.name || '';
                return sortOrder === 'asc'
                    ? typeA.localeCompare(typeB)
                    : typeB.localeCompare(typeA);
            } else if (sortField === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            }
            return 0;
        });

        setFilter(sortedFiltered);
    }, [search, selectedTypes, pokemonCard, sortField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filter.length / itemsPerPage);

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSortChange = (field) => {
        setSortField(field);
    };

    return (
        <>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Enter Pokémon name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/4 mx-auto block p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-center mb-4 gap-4">
                <button
                    onClick={() => handleSortChange('name')}
                    className={`px-4 py-2 ${sortField === 'name' ? 'bg-red-500 text-white' : 'bg-gray-300'} rounded hover:bg-red-600`}
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => handleSortChange('type')}
                    className={`px-4 py-2 ${sortField === 'type' ? 'bg-red-500 text-white' : 'bg-gray-300'} rounded hover:bg-red-600`}
                >
                    Sort by Type
                </button>
                <button
                    onClick={() => handleSortChange('id')}
                    className={`px-4 py-2 ${sortField === 'id' ? 'bg-red-500 text-white' : 'bg-gray-300'} rounded hover:bg-red-600`}
                >
                    Sort by ID
                </button>
            </div>

            {isLoading ? ( 
                <div className="flex justify-center items-center p-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-red-300">
                    {currentItems.map((pokemon) => (
                        <div key={pokemon.id}>
                            <PokemonCard
                                id={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types || []}
                                image={pokemon.sprites?.front_default || ''}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center gap-4 p-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:bg-gray-200"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default PokedexGrid;
