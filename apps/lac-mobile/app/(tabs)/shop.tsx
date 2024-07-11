import { StyleSheet, View } from "react-native";
import { Text } from "tamagui";

const ShopPage = () => {
  return (
    <View style={styles.container}>
      <Text>Shop Page</Text>
    </View>
  );
};

export default ShopPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
