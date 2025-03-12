import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Layout } from "@ui/components";

export default function () {
  return (
    <Layout
      header={{
        title: "My Deck",
        icon: <MaterialCommunityIcons name="cards" size={24} />,
      }}
    ></Layout>
  );
}
