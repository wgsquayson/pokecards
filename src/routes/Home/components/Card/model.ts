import { Pokemon } from "@models/pokemon";

export type CardProps = {
  pokemon: Pokemon;
  onSaveToDeck: () => void;
  onDismiss: () => void;
};
