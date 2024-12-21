
# Pokemon-Page
# Pokémon Pokedex

A web application built with React that allows users to explore Pokémon data, search for Pokémon by name, filter by types, sort them by name, type, or ID, and navigate through pages of Pokémon. The app uses PokeAPI to fetch Pokémon data and Tailwind CSS for styling.

## Features

- **Search**: Search for Pokémon by name.
- **Filter by Type**: Filter Pokémon by selected types (e.g., Fire, Water, Electric).
- **Sort**: Sort Pokémon by name, type, or ID in ascending or descending order.
- **Pagination**: Browse through Pokémon with pagination, showing 8 Pokémon per page.
- **Responsive Design**: The app adjusts for mobile, tablet, and desktop screen sizes.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the Pokémon API (PokeAPI).
- **Tailwind CSS**: For styling and creating a responsive design.
- **PokeAPI**: Used to fetch Pokémon data (https://pokeapi.co/).

## DEPLOY-LINK:---  https://pokemon-website-page.netlify.app/

Usage:-
Search Pokémon: Enter a Pokémon's name in the search input to filter the list by name.
Filter by Type: Select one or more types from the filter options to display only Pokémon of those types.
Sort Pokémon: Click on buttons to sort Pokémon by name, type, or ID in ascending or descending order.
Pagination: Use the "Next" and "Previous" buttons to navigate through pages, with each page displaying 8 Pokémon.

Folder-Structure:-
src/
│
├── components/
│   ├── PokemonCard.js       # Component for displaying individual Pokémon details
│   └── PokedexGrid.js       # Main component that displays the Pokémon grid
│
├── App.js                   # Main application component
├── index.js                 # Entry point for the React app
└── style.css                # Global styles (if any)



