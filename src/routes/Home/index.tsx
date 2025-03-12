import { useEffect, useState } from "react";

import Template from "./template";
import { Pokemon } from "@models/pokemon";
import { getInitialPokemons, getPokemon } from "./query";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function getNewPokemon() {
    const newPokemon = await getPokemon(pokemons[1].id + 1);

    setPokemons((prev) => [prev[1], newPokemon]);
  }

  function handleSaveToDeck(pokemon: Pokemon) {
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
