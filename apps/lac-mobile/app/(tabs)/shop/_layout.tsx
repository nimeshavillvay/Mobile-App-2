import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "index",
        }}
      />

      <Stack.Screen
        name="related-products/[id]"
        options={{
          title: "related-products",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
