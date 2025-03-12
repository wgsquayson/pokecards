import { useEffect, useState } from "react";

import Template from "./template";
import { getInitialPokemons, getPokemon } from "./query";

import { Pokemon } from "@models/pokemon";
import { useDeckStore } from "@stores/deck";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { addToDeck } = useDeckStore();

  async function getNewPokemon() {
    const newPokemon = await getPokemon(pokemons[1].id + 1);
    setPokemons((prev) => [prev[1], newPokemon]);
  }

  function handleSaveToDeck(pokemon: Pokemon) {
    addToDeck(pokemon);
    getNewPokemon();
  }

  function handleDismiss() {
    getNewPokemon();
  }

  useEffect(() => {
    getInitialPokemons().then(setPokemons);
  }, []);

  return (
    <Template
      pokemons={pokemons}
      onSaveToDeck={handleSaveToDeck}
      onDismiss={handleDismiss}
    />
  );
}
