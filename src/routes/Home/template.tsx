import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

import { Layout, Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import Card from "./components/Card";
import Instructions from "./components/Instructions";

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
    cardsContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: "40%",
      zIndex: -4,
    },
    feedbackContainer: {
      height: 30,
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  }));

  return (
    <Layout
      header={{
        title: "PokéCards",
        icon: <MaterialIcons name="catching-pokemon" size={24} />,
      }}
      loading={loading}
    >
      <View style={styles.container}>
        {pokemons.length > 0 ? (
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
        ) : null}
        <View style={styles.feedbackContainer}>
          {loadingMore ? <Text variant="detail">Loading...</Text> : null}
        </View>
        <Instructions
          hasError={hasError}
          listLength={pokemons.length}
          refetch={refetch}
        />
      </View>
    </Layout>
  );
}
