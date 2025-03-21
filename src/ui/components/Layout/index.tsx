import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Platform, View } from "react-native";

import { LayoutProps } from "./model";
import { useStyle } from "../../hooks";
import Text from "../Text";

function Layout({ header, children, loading = false }: LayoutProps) {
  const styles = useStyle((theme) => ({
    safeArea: {
      flex: 1,
      paddingHorizontal: theme.spacing.sml,
      paddingVertical: Platform.OS === "android" ? theme.spacing.sml : 0,
      backgroundColor: theme.color.layout.background.primary,
    },
    header: {
      paddingBottom: theme.spacing.sml,
      flexDirection: "row",
      gap: theme.spacing.xs,
      alignItems: "center",
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {header ? (
          <View style={styles.header}>
            {header.icon}
            <Text variant="heading">{header.title}</Text>
          </View>
        ) : null}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={styles.theme.color.text.primary}
            />
          </View>
        ) : (
          children
        )}
      </SafeAreaView>
    </>
  );
}

export default Layout;
