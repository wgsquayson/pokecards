import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import Navigation from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </>
  );
}
