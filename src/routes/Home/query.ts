import { Pokemon } from "@models/pokemon";
import { PokemonResponse } from "./model";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

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
  const pokemons = await Promise.all(
    Array.from({ length: 10 }).map((_, index) =>
      fetchJson<PokemonResponse>(`${baseUrl}/${lastPokemonId + index + 1}`)
    )
  );

  return pokemons.map(shapePokemon);
}
