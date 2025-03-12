import { useDeckStore } from "@stores/deck";
import Template from "./template";

export default function Deck() {
  const { pokemons, removeFromDeck } = useDeckStore();

  return <Template pokemons={pokemons} onRemove={removeFromDeck} />;
}
