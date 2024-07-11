import { StyleSheet, View } from "react-native";
import { Text } from "tamagui";

const CartPage = () => {
  return (
    <View style={styles.container}>
      <Text>Cart Page</Text>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
