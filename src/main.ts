import "./styles/style.scss";
import { pokemonArray } from "./data/pokemon";
//import { Pokemon } from "./data/types";

// Add selectors
const pageHeader = document.querySelector<HTMLHeadingElement>("h1");
const cardContainer = document.querySelector<HTMLElement>(".card-container");

// Add error handling for selectors
if (!pageHeader || !cardContainer) {
  throw new Error("Issue with the selector.");
}

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

pokemonArray.forEach((pokemon) => {
  const card = addPokemonCard(pokemon);
  cardContainer.append(card);
});
