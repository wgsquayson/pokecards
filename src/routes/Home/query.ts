import { Pokemon } from "@shared/models/pokemon";
import { PokemonResponse } from "./model";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export async function getInitialPokemons(): Promise<Pokemon[]> {
  const [firstPokemon, secondPokemon] = await Promise.all([
    fetchJson<PokemonResponse>(`${baseUrl}/1`),
    fetchJson<PokemonResponse>(`${baseUrl}/2`),
  ]);

  return [
    {
      id: firstPokemon.id,
      name: firstPokemon.name,
      experience: firstPokemon.base_experience,
      imageUri: firstPokemon.sprites.front_default,
    },
    {
      id: secondPokemon.id,
      name: secondPokemon.name,
      experience: secondPokemon.base_experience,
      imageUri: secondPokemon.sprites.front_default,
    },
  ];
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
