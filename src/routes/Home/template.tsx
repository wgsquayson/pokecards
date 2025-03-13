import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, View } from "react-native";

import { Layout, Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import Card from "./components/Card";
import { TemplateProps } from "./model";

export default function ({
  pokemons = [],
  onSaveToDeck,
  onDismiss,
  loading,
  loadingMore,
  hasError,
  refetch,
}: TemplateProps) {
  const styles = useStyle((theme) => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sml,
    },
    instructions: { alignItems: "center" },
    cardsContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: "40%",
      zIndex: -4,
    },
    cardsPlaceholder: { height: 120 },
    feedbackContainer: {
      height: 30,
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  }));

  if (hasError)
    return (
      <Layout
        header={{
          title: "PokéCards",
          icon: <MaterialIcons name="catching-pokemon" size={24} />,
        }}
        loading={loading}
      >
        <View style={styles.container}>
          <Text variant="detail" color={styles.theme.color.text.negative}>
            An error happened while trying to fetch Pokémons.
          </Text>
          <TouchableOpacity onPress={refetch}>
            <Text variant="highlight">Touch here to try again</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );

  return (
    <Layout
      header={{
        title: "PokéCards",
        icon: <MaterialIcons name="catching-pokemon" size={24} />,
      }}
      loading={loading}
    >
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {pokemons.slice(0, 3).map((pokemon, index) => (
            <Card
              index={index}
              pokemon={pokemon}
              onSaveToDeck={() => onSaveToDeck(pokemon)}
              onDismiss={onDismiss}
              key={pokemon.id}
            />
          ))}
        </View>
        <View style={styles.feedbackContainer}>
          {loadingMore ? <Text variant="detail">Loading...</Text> : null}
        </View>
        {pokemons.length > 0 ? (
          <>
            <Text variant="highlight">Choose your Pokémons!</Text>
            <View style={styles.instructions}>
              <Text variant="detail">Swipe right to add to your deck</Text>
              <Text variant="detail">Swipe left to dismiss</Text>
            </View>
          </>
        ) : (
          <Text variant="highlight">No more Pokémons to pick!</Text>
        )}
      </View>
    </Layout>
  );
}
