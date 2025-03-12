import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons/";

import Home from "./Home";
import Deck from "./Deck";

const RootStack = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      name: "Home",
      options: {
        tabBarIcon: () => <MaterialIcons name="catching-pokemon" size={20} />,
      },
    },
    Deck: {
      screen: Deck,
      name: "My Deck",
      options: {
        tabBarIcon: () => <MaterialCommunityIcons name="cards" size={20} />,
      },
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
