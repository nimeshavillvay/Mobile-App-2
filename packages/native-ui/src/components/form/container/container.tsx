import { type ComponentProps } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { YStack } from "tamagui";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const FormRootContainer = ({
  style,
  contentContainerStyle = {
    rowGap: 24,
  },
  ...delegated
}: ComponentProps<typeof ScrollView>) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 64 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={StyleSheet.flatten([styles.root, style])}
        contentContainerStyle={contentContainerStyle}
        {...delegated}
      />
    </KeyboardAvoidingView>
  );
};

export const FormFieldContainer = ({
  gap = 16,
  ...delegated
}: ComponentProps<typeof YStack>) => {
  return <YStack gap={gap} {...delegated} />;
};
