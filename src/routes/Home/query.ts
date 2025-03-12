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

export async function getInitialPokemons(): Promise<Pokemon[]> {
  const pokemons = await Promise.all([
    fetchJson<PokemonResponse>(`${baseUrl}/1`),
    fetchJson<PokemonResponse>(`${baseUrl}/2`),
    fetchJson<PokemonResponse>(`${baseUrl}/3`),
  ]);

  return pokemons.map(shapePokemon);
}

export async function getPokemon(id: number): Promise<Pokemon> {
  const pokemon = await fetchJson<PokemonResponse>(`${baseUrl}/${id}`);

  return {
    id: pokemon.id,
    name: pokemon.name,
    experience: pokemon.base_experience,
    imageUri: pokemon.sprites.front_default,
  };
}
