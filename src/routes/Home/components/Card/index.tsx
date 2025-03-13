import { Image, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { CardProps } from "./model";
import ProgressCircle from "../ProgressCircle";
import useCardAnimations from "./hooks/useCardAnimations";

const IMAGE_SIZE = 170;

export default function Card({
  pokemon,
  index,
  onSaveToDeck,
  onDismiss,
}: CardProps) {
  const { width } = useWindowDimensions();

  const { gesture, animatedStyles, backgroundAnimatedStyles } =
    useCardAnimations({
      index,
      width,
      onLeftSwipe: onDismiss,
      onRightSwipe: onSaveToDeck,
    });

  const styles = useStyle((theme) => ({
    container: {
      borderRadius: theme.borderRadius.xl,
      width: width / 1.6,
      height: 250,
      borderWidth: 1,
      borderColor: theme.color.border.inactive,
      position: "absolute",
      zIndex: -index,
    },
    background: {
      width: "100%",
      height: "100%",
      borderRadius: theme.borderRadius.xl,
      backgroundColor: theme.color.interactive.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    },
    progressCircle: {
      position: "absolute",
      right: theme.spacing.sml,
      top: theme.spacing.sml,
    },
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyles, styles.container]}>
        <Animated.View style={[backgroundAnimatedStyles, styles.background]}>
          <View style={styles.progressCircle}>
            <ProgressCircle
              progress={pokemon.experience}
              startAnimation={index === 0}
            />
          </View>
          <Image
            source={{
              uri: pokemon.imageUri,
            }}
            style={styles.image}
          />
          <Text variant="highlight">{pokemon.name}</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
