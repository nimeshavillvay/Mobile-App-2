import { NumericInput } from "@repo/native-ui/components/input/numeric-input";
import { Minus, Plus } from "@tamagui/lucide-icons";
import { type ComponentProps } from "react";
import { Controller, useController, type UseFormReturn } from "react-hook-form";
import { Button, Form, Text, View, XStack, YStack } from "tamagui";

type QuantityInputProps = {
  readonly minimumValue?: number;
  readonly incrementBy?: number;
  readonly form: UseFormReturn<{
    quantity: number;
  }>;
  readonly unitOfMeasure: string;
} & ComponentProps<typeof XStack>;

export const QuantityInput = ({
  minimumValue = 1,
  incrementBy = 1,
  form,
  unitOfMeasure,
  ...style
}: QuantityInputProps) => {
  const {
    field: { value, onChange },
  } = useController({
    control: form.control,
    name: "quantity",
  });

  const handleChange = (inputValue: string) => {
    if (!inputValue) {
      onChange(minimumValue);
      return;
    }

    if (isNaN(Number(inputValue))) {
      return;
    }

    if (Number(inputValue) < minimumValue) {
      onChange(minimumValue);
      return;
    }

    onChange(inputValue);
  };

  const handleIncrement = () => {
    onChange(Number(value) + incrementBy);
  };

  const handleDecrement = () => {
    if (value - incrementBy >= minimumValue) {
      onChange(Number(value) - incrementBy);
    }
  };

  return (
    <XStack {...style}>
      <Button
        icon={Minus}
        padding={8}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        onPress={handleDecrement}
      />
      <Form style={{ flex: 1 }}>
        <Controller
          control={form.control}
          name="quantity"
          render={({ field: { value } }) => (
            <NumericInput
              onChangeText={(val) => {
                handleChange(val);
              }}
              defaultValue={minimumValue.toString()}
              value={value.toString()}
              flex={1}
              borderRadius={0}
              backgroundColor="$gray2"
              borderWidth={0}
              paddingHorizontal={3}
            />
          )}
        />
      </Form>

      <View backgroundColor="$gray2" paddingVertical={10}>
        <YStack
          flex={1}
          justifyContent="center"
          borderLeftWidth={1}
          paddingHorizontal={3}
          borderLeftColor="$gray8"
        >
          <Text fontSize="$1" color="$gray9" textTransform="uppercase">
            {unitOfMeasure}
          </Text>
        </YStack>
      </View>
      <Button
        icon={Plus}
        padding={8}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        onPress={handleIncrement}
      />
    </XStack>
  );
};
