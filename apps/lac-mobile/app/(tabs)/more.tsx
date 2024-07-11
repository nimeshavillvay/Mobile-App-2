import { StyleSheet, View } from "react-native";
import { Text } from "tamagui";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text>More Page</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
