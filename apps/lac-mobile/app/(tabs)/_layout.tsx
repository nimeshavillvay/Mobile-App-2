import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useSuspenseSimulationCheckout from "@repo/shared-logic/apis/hooks/cart/use-suspense-simulation-checkout.hook";
import { ShoppingCart, Store } from "@tamagui/lucide-icons";
import { Tabs, usePathname } from "expo-router";
import { Suspense } from "react";
import { Text, View } from "tamagui";

const TabLayout = () => {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#ededed",
        tabBarActiveTintColor: "#e5484d",
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.91)",
          display: pathname.startsWith("/cart") ? "none" : "flex",
        },
        headerShown: false,
      }}
      initialRouteName="index"
      backBehavior="history"
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
          tabBarIcon: ({ color }) => <Store size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Suspense fallback={<CartIcon color={color} count={0} />}>
              <Cart color={color} />
            </Suspense>
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

const CartIcon = ({
  color,
  count,
}: {
  readonly color: string;
  readonly count: number;
}) => {
  return (
    <View width={28} height={28}>
      <ShoppingCart size={28} color={color} />

      <View
        position="absolute"
        top={0}
        right={0}
        backgroundColor={color}
        width={18}
        height={18}
        borderRadius={9999}
        alignItems="center"
        justifyContent="center"
        padding={0}
      >
        <Text fontSize={12} lineHeight={12} color="rgba(0,0,0,0.91)">
          {count}
        </Text>
      </View>
    </View>
  );
};

const Cart = ({ color }: { readonly color: string }) => {
  const token = useSessionTokenStorage((state) => state.token);

  const { data } = useSuspenseSimulationCheckout({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
    token,
  });

  return <CartIcon color={color} count={data.cartItemsCount} />;
};
