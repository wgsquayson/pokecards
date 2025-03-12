import { Pokemon } from "@shared/models/pokemon";

export type TemplateProps = {
  pokemons: Pokemon[];
  onSaveToDeck: (pokemon: Pokemon) => void;
  onDismiss: () => void;
};

export type PokemonResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
};
