import { Pokemon } from "@models/pokemon";
import { PokemonResponse } from "./model";

const FETCH_LIMIT = 10;
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error();
  }

  return response.json();
}

function shapePokemon(pokemon: PokemonResponse): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    experience: pokemon.base_experience,
    imageUri: pokemon.sprites.front_default,
  };
}

export async function getPokemons(lastPokemonId: number): Promise<Pokemon[]> {
  const pokemonPromises = Array.from({ length: FETCH_LIMIT }).map((_, index) =>
    fetchJson<PokemonResponse>(`${baseUrl}/${lastPokemonId + index + 1}`)
      .then((pokemon) => (pokemon ? shapePokemon(pokemon) : null))
      .catch(() => null)
  );

  const pokemons = await Promise.all(pokemonPromises);

  return pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null);
}
