import { Image, View } from "react-native";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { CardProps } from "./model";
import ProgressCircle from "../ProgressCircle";

export default function Card({ pokemon }: CardProps) {
  const styles = useStyle((theme) => ({
    container: {
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.xl,
      width: "60%",
      height: 250,
    },
    image: {
      width: 170,
      height: 170,
    },
    progressCircle: {
      position: "absolute",
      right: theme.spacing.sml,
      top: theme.spacing.sml,
    },
  }));

  return (
    <View style={styles.container}>
      <View style={styles.progressCircle}>
        <ProgressCircle progress={120} />
      </View>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }}
        style={styles.image}
      />
      <Text variant="highlight">Bulbassaur</Text>
    </View>
  );
}
