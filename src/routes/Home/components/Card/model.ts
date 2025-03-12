import { Pokemon } from "@shared/models/pokemon";

export type CardProps = {
  pokemon: Pokemon;
  onSaveToDeck: () => void;
  onDismiss: () => void;
};
