import { GestureHandlerRootView } from "react-native-gesture-handler";

import Navigation from "./src/routes";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  );
}
