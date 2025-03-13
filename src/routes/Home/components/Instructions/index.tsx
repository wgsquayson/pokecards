import { TouchableOpacity, View } from "react-native";

import { Text } from "@ui/components";
import { useStyle } from "@ui/hooks";

import { InstructionsProps } from "./model";

export default function Instructions({
  listLength,
  hasError,
  refetch,
}: InstructionsProps) {
  const styles = useStyle((theme) => ({
    instructions: { alignItems: "center" },
  }));

  if (hasError)
    return (
      <>
        <Text color={styles.theme.color.text.negative} textAlign="center">
          An error happened while trying to fetch Pokémons.
        </Text>
        <TouchableOpacity onPress={refetch}>
          <Text variant="bold">Touch here to try again</Text>
        </TouchableOpacity>
      </>
    );

  if (listLength > 0)
    return (
      <>
        <Text variant="highlight">Choose your Pokémons!</Text>
        <Text variant="detail" textAlign="center">
          Swipe right to add to your deck{"\n"}Swipe left to dismiss
        </Text>
      </>
    );

  return <Text variant="highlight">No more Pokémons to pick!</Text>;
}
