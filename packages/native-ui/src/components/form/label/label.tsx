import { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Label as LabelPrimitive } from "tamagui";

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    lineHeight: 16,
  },
});

export const Label = ({
  ...delegated
}: ComponentProps<typeof LabelPrimitive>) => {
  return <LabelPrimitive style={styles.label} {...delegated} />;
};
