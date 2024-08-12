import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#E2E2E2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCFCFC",
  },
  disabledCheckbox: {
    borderColor: "#EFEFEF",
    backgroundColor: "#EFEFEF",
  },
});

export type CheckboxProps = {
  readonly checked?: boolean;
  readonly onCheckedChanged?: (checked: boolean) => void;
  readonly disabled?: boolean;
};

export const Checkbox = ({
  checked,
  onCheckedChanged,
  disabled,
}: CheckboxProps) => {
  return (
    <Pressable
      onPress={() => onCheckedChanged?.(!checked)}
      style={[styles.checkbox, !!disabled && styles.disabledCheckbox]}
      disabled={disabled}
      testID="checkbox"
    >
      {!!checked && <CheckIcon size={14} testID="check-icon" />}
    </Pressable>
  );
};
