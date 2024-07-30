import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, usePathname } from "expo-router";

const TabLayout = () => {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#ededed",
        tabBarActiveTintColor: "#e5484d",
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.91)",
          display: pathname.endsWith("search") ? "none" : "flex",
        },
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="shop" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: "Updates",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="menu" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
