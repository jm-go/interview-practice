import "./styles/style.scss";
import { pokemonArray } from "./data/pokemon";

// Add selectors
const pageHeader = document.querySelector<HTMLHeadingElement>("h1");
const cardContainer = document.querySelector<HTMLElement>(".card-container");
// Extension - add selectors for pokemon-name and search-button
const pokemonName = document.querySelector<HTMLInputElement>(".pokemon-name");
const searchButton =
  document.querySelector<HTMLButtonElement>(".search-button");

// Add error handling for selectors and extension selectors
if (!pageHeader || !cardContainer || !pokemonName || !searchButton) {
  throw new Error("Issue with the selector.");
}

// Extension: add some margin for button and input section
pokemonName.style.marginTop = "0.7rem";
searchButton.style.marginTop = "0.7rem";

// Add function to create a card for the pokemon
const addPokemonCard = (pokemon: Pokemon): HTMLElement => {
  // As types is an array, I need to convert it so string using join it first, otherwise it would be displayed with commas
  const typesAsString = pokemon.types.join(" and ");
  const card = document.createElement("div");
  card.className = "card";

  // Add classes to specific elements to match styles from SCSS
  // Create image as an element to give it a class
  const image = document.createElement("img");
  image.src = pokemon.sprite;
  image.className = "card__image";
  card.append(image);

  // Create content as an element to give it a class
  const content = document.createElement("div");
  content.className = "card__content";
  card.append(content);

  // Create h2 as an element to give it a class
  const largeName = document.createElement("h2");
  largeName.className = "card__heading";
  largeName.textContent = pokemon.name;
  largeName.style.textAlign = "center";
  largeName.style.fontWeight = "450";
  card.append(largeName);

  // Create paragraph as an element to give it a class
  // Also, add other elements to create the main text content in the container
  const paragraph = document.createElement("p");
  paragraph.className = "card__text";
  paragraph.textContent = `${pokemon.name} (#${pokemon.id}) is a ${typesAsString} type pokemon.`;
  content.append(paragraph);

  card.append(content);
  return card;
};

// Loop through pokemonArray to create a new card for each element
pokemonArray.forEach((pokemon) => {
  const card = addPokemonCard(pokemon);
  cardContainer.append(card);
});

// Extension: filter through the pokémon
// Search by name functionality
// This function filters the pokemonArray.
// It returns pokemons which names include text given by user, i.e.
// Search "bulb" - > bulbasaur will be displayed
const searchPokemonByName = (name: string): Pokemon[] => {
  return pokemonArray.filter((pokemon) => pokemon.name.includes(name));
};

// This function clears the card container to make space for pokemon cards chosen by user
// It also appends cards for each Pokémon in the given array.
const displayPokemonByName = (pokemon: Pokemon[]) => {
  cardContainer.textContent = "";
  pokemon.forEach((pokemon) => {
    const card = addPokemonCard(pokemon);
    cardContainer.append(card);
  });
};

// The event listener for button click. It retrieves user's input from pokemonName input element.
// Then, when user clicks the button, it searches for matching pokemons using searchPokemonByName function.
// Finally, it displays the results using the displayPokemonByName function.
searchButton.addEventListener("click", () => {
  const newPokemon = pokemonName.value;
  const displayedPokemon = searchPokemonByName(newPokemon);
  displayPokemonByName(displayedPokemon);
});
