import { useEffect, useState } from "react";

import Template from "./template";
import { getPokemons } from "./query";

import { Pokemon } from "@models/pokemon";
import { useDeckStore } from "@stores/deck";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hasError, setHasError] = useState(false);

  const { addToDeck } = useDeckStore();

  async function getPokemonList() {
    const lastPokemonId = pokemons[pokemons.length - 1]?.id
      ? pokemons[pokemons.length - 1].id
      : 0;

    try {
      const result = await getPokemons(lastPokemonId);
      setPokemons((prev) => prev.concat(result));
    } catch {
      setHasError(true);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  }

  function reorganizePokemonList() {
    setPokemons((prev) => {
      const updatedList = [...prev];
      updatedList.shift();

      if (updatedList.length <= 3) {
        setLoadingMore(true);
        getPokemonList();
      }

      return updatedList;
    });
  }

  function handleSaveToDeck(pokemon: Pokemon) {
    addToDeck(pokemon);
    reorganizePokemonList();
  }

  async function refetch() {
    setLoading(true);
    setHasError(false);

    await getPokemonList();
  }

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <Template
      loadingMore={loadingMore}
      loading={loading}
      pokemons={pokemons}
      onSaveToDeck={handleSaveToDeck}
      onDismiss={reorganizePokemonList}
      hasError={hasError}
      refetch={refetch}
    />
  );
}
