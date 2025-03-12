import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import Deck from "./Deck";

const RootStack = createBottomTabNavigator({
  screens: {
    Home,
    Deck: {
      screen: Deck,
      name: "My Deck",
    },
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
