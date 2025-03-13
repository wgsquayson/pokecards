import { Gesture } from "react-native-gesture-handler";
import {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useStyle } from "@ui/hooks";

import { UseCardAnimationsProps } from "./model";

const Z_MAX_OFFSET = 15;
const HORIZONTAL_SWIPE_TRIGGER = 140;
const ANIMATION_DURATION = 200;
const SCALE_ANIMATION_DURATION = 500;

export default function useCardAnimations({
  index,
  onLeftSwipe,
  onRightSwipe,
  width,
}: UseCardAnimationsProps) {
  const styles = useStyle(() => ({}));
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (index !== 0) return;
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (index !== 0) return;

      if (e.translationX >= HORIZONTAL_SWIPE_TRIGGER) {
        translateX.value = withTiming(
          width,
          { duration: ANIMATION_DURATION },
          (isFinished) => {
            if (isFinished) {
              runOnJS(onRightSwipe)();
            }
          }
        );

        return;
      }

      if (e.translationX <= -HORIZONTAL_SWIPE_TRIGGER) {
        translateX.value = withTiming(
          -width,
          { duration: ANIMATION_DURATION },
          (isFinished) => {
            if (isFinished) {
              runOnJS(onLeftSwipe)();
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
      transform: [
        { translateX: translateX.value },
        {
          translateY: withTiming(translateY, {
            duration: SCALE_ANIMATION_DURATION,
          }),
        },
        { scale: withTiming(scale, { duration: SCALE_ANIMATION_DURATION }) },
        { rotateZ: withSpring(`${rotateZ * swipeDirection}deg`) },
      ],
    };
  });

  const backgroundAnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [-HORIZONTAL_SWIPE_TRIGGER, 0, HORIZONTAL_SWIPE_TRIGGER],
      [
        styles.theme.color.interactive.danger,
        styles.theme.color.interactive.primary,
        styles.theme.color.interactive.positive,
      ]
    );

    return {
      backgroundColor,
    };
  });

  return {
    gesture,
    animatedStyles,
    backgroundAnimatedStyles,
  };
}
