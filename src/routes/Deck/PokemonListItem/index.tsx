import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useStyle } from "@ui/hooks";
import { Text } from "@ui/components";

import { PokemonListItemProps } from "./model";

const IMAGE_SIZE = 50;

export default function PokemonListItem({
  pokemon,
  onRemove,
}: PokemonListItemProps) {
  const styles = useStyle((theme) => ({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.color.interactive.primary,
      padding: theme.spacing.sml,
      borderRadius: theme.borderRadius.md,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xxs,
    },
    image: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    },
  }));

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function slideOut() {
    translateX.value = withTiming(1000, { duration: 200 }, (isFinished) => {
      if (isFinished) {
        runOnJS(onRemove)();
      }
    });
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <Image style={styles.image} source={{ uri: pokemon.imageUri }} />
        <Text variant="bold">{pokemon.name}</Text>
      </View>
      <TouchableOpacity hitSlop={styles.theme.spacing.xs} onPress={slideOut}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color={styles.theme.color.interactive.danger}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
