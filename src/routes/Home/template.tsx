import { View } from "react-native";

import { Layout, Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import Card from "./components/Card";

export default function () {
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
  }));

  return (
    <Layout header={{ title: "PokéCards" }}>
      <View style={styles.container}>
        <Text variant="highlight">Choose your Pokémons!</Text>
        <Card />
        <View style={styles.instructions}>
          <Text variant="detail">Swipe right to add to your deck</Text>
          <Text variant="detail">Swipe left to dismiss</Text>
        </View>
      </View>
    </Layout>
  );
}
