import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

import { Layout, Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import { TemplateProps } from "./model";
import PokemonListItem from "./PokemonListItem";

export default function ({ pokemons, onRemove }: TemplateProps) {
  const styles = useStyle((theme) => ({
    spacer: {
      height: theme.spacing.xxs,
    },
  }));

  return (
    <Layout
      header={{
        title: "My Deck",
        icon: <MaterialCommunityIcons name="cards" size={24} />,
      }}
    >
      <FlashList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text>No pokémons here yet. Save some to your deck!</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.spacer} />}
        ListFooterComponent={<View style={styles.spacer} />}
        estimatedItemSize={65}
        renderItem={({ item }) => (
          <PokemonListItem pokemon={item} onRemove={() => onRemove(item.id)} />
        )}
      />
    </Layout>
  );
}
