import { Dimensions, Image, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { CardProps } from "./model";
import ProgressCircle from "../ProgressCircle";

const IMAGE_SIZE = 170;
const X_MAX_OFFSET = 1000;
const Z_MAX_OFFSET = 15;

export default function Card({ pokemon, onSaveToDeck, onDismiss }: CardProps) {
  const styles = useStyle((theme) => ({
    container: {
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.xl,
      width: Dimensions.get("window").width / 1.6,
      height: 250,
      borderWidth: 1,
      borderColor: theme.color.border.inactive,
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

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0, z: 0 });
  const start = useSharedValue({ x: 0, y: 0, z: 0 });

  const horizontalLimit = Math.floor(Dimensions.get("window").width / 2);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      function getZ() {
        if (e.translationX > 50) return Z_MAX_OFFSET;
        if (e.translationX < -50) return -Z_MAX_OFFSET;
        return 0;
      }

      offset.value = {
        x: e.translationX + start.value.x,
        y: 0,
        z: getZ(),
      };
    })
    .onEnd((e) => {
      if (e.translationX >= horizontalLimit) {
        onSaveToDeck();

        offset.value = withSpring({
          x: X_MAX_OFFSET,
          y: 0,
          z: Z_MAX_OFFSET,
        });

        return;
      }

      if (e.translationX <= -horizontalLimit) {
        onDismiss();

        offset.value = withSpring({
          x: -X_MAX_OFFSET,
          y: 0,
          z: -Z_MAX_OFFSET,
        });

        return;
      }

      offset.value = withTiming(
        {
          x: 0,
          y: 0,
          z: 0,
        },
        { duration: 500 }
      );
    })
    .onFinalize(() => {
      isPressed.value = false;
    })
    .failOffsetX([-horizontalLimit, horizontalLimit])
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { rotateZ: withSpring(`${offset.value.z}deg`) },
        { scale: withSpring(isPressed.value ? 1.1 : 1) },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.progressCircle}>
          <ProgressCircle progress={pokemon.experience} />
        </View>
        <Image
          source={{
            uri: pokemon.imageUri,
          }}
          style={styles.image}
        />
        <Text variant="highlight">{pokemon.name}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
