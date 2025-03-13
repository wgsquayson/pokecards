import {
  AnimatedProp,
  Canvas,
  Group,
  Path,
  Skia,
  SkPoint,
  Transforms3d,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { ProgressCircleProps } from "./model";

const SIZE = 60;
const STROKE_WIDTH = 7;
const MAX_PROGRESS = 563;
const ANIMATION_DURATION = 1000;

export default function ProgressCircle({
  progress = 0,
  startAnimation = false,
}: ProgressCircleProps) {
  const currentProgress = useSharedValue(0);

  const styles = useStyle(() => ({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    canvas: {
      width: SIZE,
      height: SIZE,
    },
    text: {
      position: "absolute",
    },
  }));

  const origin: AnimatedProp<SkPoint> = {
    x: SIZE / 2,
    y: SIZE / 2,
  };

  const transform: AnimatedProp<Transforms3d> = [
    {
      rotate: -Math.PI / 2,
    },
  ];

  const radius = SIZE / 2 - STROKE_WIDTH / 2;

  const path = Skia.Path.Make();

  path.addCircle(SIZE / 2, SIZE / 2, radius);

  useEffect(() => {
    if (startAnimation) {
      currentProgress.value = withTiming(
        progress / MAX_PROGRESS >= 1 ? MAX_PROGRESS : progress / MAX_PROGRESS,
        {
          duration: ANIMATION_DURATION,
        }
      );
    }
  }, [progress, startAnimation]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Group origin={origin} transform={transform}>
          <Path
            end={1}
            start={0}
            path={path}
            style="stroke"
            strokeCap="round"
            color={styles.theme.color.border.inactive}
            strokeWidth={STROKE_WIDTH}
          />
          <Path
            start={0}
            path={path}
            end={currentProgress}
            style="stroke"
            strokeCap="round"
            color={styles.theme.color.border.active}
            strokeWidth={STROKE_WIDTH}
          />
        </Group>
      </Canvas>
      <View style={styles.text}>
        <Text variant="detail">{String(progress)}xp</Text>
      </View>
    </View>
  );
}
