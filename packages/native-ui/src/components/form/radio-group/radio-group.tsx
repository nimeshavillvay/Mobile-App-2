import { StyleSheet } from "react-native";
import { Label, RadioGroup, XStack } from "tamagui";

const styles = StyleSheet.create({
  radioGroupItem: {
    backgroundColor: "#FFFFFF",
  },
  radioGroupIndicator: {
    width: 12,
    height: 12,
  },
  label: {
    color: "#171717",
    fontSize: 16,
  },
});

export const RadioGroupItemWithLabel = (props: {
  readonly value: string;
  readonly label: string;
}) => {
  const id = `radiogroup-${props.value}`;

  return (
    <XStack width={300} alignItems="center" gap={10}>
      <RadioGroup.Item
        value={props.value}
        id={id}
        size={24}
        style={styles.radioGroupItem}
      >
        <RadioGroup.Indicator style={styles.radioGroupIndicator} />
      </RadioGroup.Item>

      <Label size={24} htmlFor={id} style={styles.label}>
        {props.label}
      </Label>
    </XStack>
  );
};
