import { Image, View } from "react-native";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { CardProps } from "./model";

export default function Card({ pokemon }: CardProps) {
  const styles = useStyle((theme) => ({
    container: {
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.md,
      alignItems: "center",
      borderRadius: theme.borderRadius.xl,
    },
    image: {
      width: 200,
      height: 200,
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

      <Text variant="heading">Bulbassaur</Text>
    </View>
  );
}
