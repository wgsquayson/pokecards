import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

import { Layout, Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import Card from "./components/Card";
import { TemplateProps } from "./model";

export default function ({
  pokemons = [],
  onSaveToDeck,
  onDismiss,
}: TemplateProps) {
  const styles = useStyle((theme) => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.lg,
    },
    instructions: {
      alignItems: "center",
    },
    card: { alignItems: "center" },
  }));

  return (
    <Layout
      header={{
        title: "PokéCards",
        icon: <MaterialIcons name="catching-pokemon" size={24} />,
      }}
    >
      <View style={styles.container}>
        {pokemons.map((pokemon, index) => (
          <View style={styles.card} key={pokemon.id}>
            <Card
              index={index}
              pokemon={pokemon}
              onSaveToDeck={() => onSaveToDeck(pokemon)}
              onDismiss={onDismiss}
            />
          </View>
        ))}
        <View
          style={{
            height: 200,
            width: "70%",
            zIndex: -3,
          }}
        />
        <Text variant="highlight">Choose your Pokémons!</Text>
        <View style={styles.instructions}>
          <Text variant="detail">Swipe right to add to your deck</Text>
          <Text variant="detail">Swipe left to dismiss</Text>
        </View>
      </View>
    </Layout>
  );
}
