import { Pokemon } from "@models/pokemon";

export type CardProps = {
  pokemon: Pokemon;
  index: number;
  onSaveToDeck: () => void;
  onDismiss: () => void;
};
