import { StyleSheet, View } from "react-native";
import { Text } from "tamagui";

const UpdatesPage = () => {
  return (
    <View style={styles.container}>
      <Text>Updates Page</Text>
    </View>
  );
};

export default UpdatesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
