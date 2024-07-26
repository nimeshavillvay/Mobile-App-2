import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

export const ScreenLayout = ({
  children,
  edges,
}: {
  readonly children: ReactNode;
  readonly edges?: SafeAreaViewProps["edges"];
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <ScrollView flex={1} backgroundColor="white">
        <YStack
          flex={1}
          backgroundColor="white"
          testID="screen-layout-container"
        >
          {children}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
