import { StyleSheet, View } from "react-native";
import { Button } from "tamagui";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Button>Hello World!!!</Button>
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
