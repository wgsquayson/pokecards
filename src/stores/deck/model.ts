import { Pokemon } from "@models/pokemon";

export type DeckState = {
  pokemons: Pokemon[];
  addToDeck: (pokemon: Pokemon) => void;
  removeFromDeck: (pokemonId: number) => void;
  resetDeck: () => void;
};
