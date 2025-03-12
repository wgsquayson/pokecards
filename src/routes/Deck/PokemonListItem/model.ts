import { Pokemon } from "@models/pokemon";

export type PokemonListItemProps = {
  pokemon: Pokemon;
  onRemove: () => void;
};
