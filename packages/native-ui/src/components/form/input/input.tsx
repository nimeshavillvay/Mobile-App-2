import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { useState, type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input as InputPrimitive, Text, VisuallyHidden } from "tamagui";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 9,
    borderColor: "#DBDBDB",
  },
  hidePasswordToggle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  error: {
    color: "#CC0000",
  },
});

export const Input = ({
  style,
  secureTextEntry = false,
  ...delegated
}: ComponentProps<typeof InputPrimitive>) => {
  const [hideText, setHideText] = useState(secureTextEntry);
  const isHidden = secureTextEntry && hideText;

  return (
    <View>
      <InputPrimitive
        secureTextEntry={isHidden}
        style={StyleSheet.flatten([
          styles.input,
          secureTextEntry && { paddingRight: 52 },
          style,
        ])}
        {...delegated}
      />

      {!!secureTextEntry && (
        <Button
          onPress={() => setHideText(!hideText)}
          icon={hideText ? Eye : EyeOff}
          style={styles.hidePasswordToggle}
        >
          <VisuallyHidden>Toggle hiding text</VisuallyHidden>
        </Button>
      )}
    </View>
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
