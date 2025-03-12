import { useEffect, useState } from "react";

import Template from "./template";
import { getInitialPokemons, getPokemon } from "./query";

import { Pokemon } from "@models/pokemon";
import { useDeckStore } from "@stores/deck";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { addToDeck } = useDeckStore();

  async function getNewPokemon() {
    const newPokemon = await getPokemon(pokemons[2].id + 1);
    setPokemons((prev) => [prev[1], prev[2], newPokemon]);
  }

  function handleSaveToDeck(pokemon: Pokemon) {
    addToDeck(pokemon);
    getNewPokemon();
  }

  function handleDismiss() {
    getNewPokemon();
  }

  async function initialFetch() {
    try {
      const initialPokemons = await getInitialPokemons();
      setPokemons(initialPokemons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <Template
      pokemons={pokemons}
      onSaveToDeck={handleSaveToDeck}
      onDismiss={handleDismiss}
    />
  );
}
