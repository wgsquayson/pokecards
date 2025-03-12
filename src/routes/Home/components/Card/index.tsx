import { Image, View } from "react-native";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { CardProps } from "./model";

export default function Card({ pokemon }: CardProps) {
  const styles = useStyle((theme) => ({
    container: {
      width: "80%",
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.md,
      alignItems: "center",
      borderRadius: theme.borderRadius.xl,
    },
    image: {
      width: 250,
      height: 250,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  }));

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text variant="heading">Bulbassaur</Text>
        <View />
      </View>
    </View>
  );
}
