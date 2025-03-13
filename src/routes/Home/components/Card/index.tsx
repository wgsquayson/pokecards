import { Image, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
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
const Z_MAX_OFFSET = 15;
const HORIZONTAL_SWIPE_LIMIT = 180;
const ANIMATION_DURATION = 200;
const SCALE_DURATION = 500;

export default function Card({
  pokemon,
  index,
  onSaveToDeck,
  onDismiss,
}: CardProps) {
  const { width } = useWindowDimensions();

  const styles = useStyle((theme) => ({
    container: {
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.xl,
      width: width / 1.6,
      height: 250,
      borderWidth: 1,
      borderColor: theme.color.border.inactive,
      position: "absolute",
      zIndex: -index,
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

  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (index !== 0) return;
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (index !== 0) return;

      if (e.translationX >= HORIZONTAL_SWIPE_LIMIT) {
        translateX.value = withTiming(
          width,
          { duration: ANIMATION_DURATION },
          (isFinished) => {
            if (isFinished) {
              runOnJS(onSaveToDeck)();
            }
          }
        );

        return;
      }

      if (e.translationX <= -HORIZONTAL_SWIPE_LIMIT) {
        translateX.value = withTiming(
          -width,
          { duration: ANIMATION_DURATION },
          (isFinished) => {
            if (isFinished) {
              runOnJS(onDismiss)();
            }
          }
        );

        return;
      }

      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
    });

  const animatedStyles = useAnimatedStyle(() => {
    const swipeDirection = translateX.value > 0 ? 1 : -1;

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, Z_MAX_OFFSET]
    );
    const translateY = interpolate(index, [0, 1, 2], [0, -25, -50]);
    const scale = interpolate(index, [0, 1, 2], [1, 0.9, 0.8]);

    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [-HORIZONTAL_SWIPE_LIMIT, 0, HORIZONTAL_SWIPE_LIMIT],
        [
          styles.theme.color.interactive.danger,
          styles.theme.color.interactive.primary,
          styles.theme.color.interactive.positive,
        ]
      ),
      transform: [
        { translateX: translateX.value },
        {
          translateY: withTiming(translateY, { duration: SCALE_DURATION }),
        },
        { scale: withTiming(scale, { duration: SCALE_DURATION }) },
        { rotateZ: withSpring(`${rotateZ * swipeDirection}deg`) },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
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
    </GestureDetector>
  );
}
