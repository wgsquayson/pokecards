import { useEffect, useState } from "react";

import Template from "./template";
import { getPokemons } from "./query";

import { Pokemon } from "@models/pokemon";
import { useDeckStore } from "@stores/deck";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [lastFetchedPokemonId, setLastFetchedPokemonId] = useState(0);
  const [isLastBatch, setIsLastBatch] = useState(false);

  const { addToDeck } = useDeckStore();

  async function getPokemonList() {
    try {
      const result = await getPokemons(lastFetchedPokemonId);

      if (result.length > 0) {
        setPokemons((prev) => [...prev, ...result]);
        setLastFetchedPokemonId(result[result.length - 1].id);
        return;
      }

      setIsLastBatch(true);
    } catch {
      setHasError(true);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  }

  function reorganizePokemonList() {
    setPokemons((prev) => {
      const updatedList = prev.slice(1);

      if (updatedList.length <= 3 && !isLastBatch) {
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
