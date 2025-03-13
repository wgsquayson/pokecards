import { create } from "zustand";

import { DeckState } from "./model";

export const useDeckStore = create<DeckState>()((set) => ({
  pokemons: [],
  addToDeck: (pokemon) =>
    set((prev) => ({
      pokemons: prev.pokemons.concat(pokemon),
    })),
  removeFromDeck: (pokemonId) =>
    set((prev) => ({
      pokemons: prev.pokemons.filter((pokemon) => pokemon.id !== pokemonId),
    })),
}));
