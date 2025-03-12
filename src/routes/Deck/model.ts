import { Pokemon } from "@models/pokemon";

export type TemplateProps = {
  pokemons: Pokemon[];
  onRemove: (pokemonId: number) => void;
};
