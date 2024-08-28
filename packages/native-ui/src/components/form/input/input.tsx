import { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Input as InputPrimitive, Text } from "tamagui";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 9,
    borderColor: "#DBDBDB",
  },
  error: {
    color: "#CC0000",
  },
});

export const Input = ({
  style,
  ...delegated
}: ComponentProps<typeof InputPrimitive>) => {
  return (
    <InputPrimitive
      style={StyleSheet.flatten([styles.input, style])}
      {...delegated}
    />
  );
};

export const InputError = ({
  style = {
    color: "#CC0000",
  },
  children,
  ...delegated
}: ComponentProps<typeof Text>) => {
  if (!children) {
    return null;
  }

  return (
    <Text style={style} {...delegated}>
      {children}
    </Text>
  );
};
