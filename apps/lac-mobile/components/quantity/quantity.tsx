import { NumericInput } from "@repo/native-ui/components/input/numeric-input";
import { Minus, Plus } from "@tamagui/lucide-icons";
import { type ComponentProps, useRef, useState } from "react";
import { Controller, useController, type UseFormReturn } from "react-hook-form";
import { Button, Form, Text, View, XStack, YStack } from "tamagui";

type QuantityInputProps = {
  readonly minimumValue?: number;
  readonly incrementBy?: number;
  readonly form: UseFormReturn<{
    quantity: string;
  }>;
} & ComponentProps<typeof XStack>;

export const QuantityInput = ({
  minimumValue = 1,
  incrementBy = 1,
  form,
  ...style
}: QuantityInputProps) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(minimumValue);

  const {
    field: { onChange },
  } = useController({
    control: form.control,
    name: "quantity",
  });

  const handleChange = (value: string) => {
    if (value === "") {
      setInputValue(minimumValue);
      return;
    }

    if (isNaN(Number(value))) {
      return;
    }

    if (Number(value) < minimumValue) {
      setInputValue(minimumValue);
    }

    setInputValue(Number(value));
    value = inputValue.toString();
  };

  const handleIncrement = () => {
    setInputValue((current) => current + 1);
    onChange(inputValue);
  };

  const handleDecrement = () => {
    if (inputValue - incrementBy >= minimumValue) {
      setInputValue((current) => current - 1);
      onChange(inputValue);
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
          render={({ field: { onChange } }) => (
            <NumericInput
              ref={inputRef}
              onChangeText={(val) => {
                handleChange(val);
                onChange(val);
              }}
              value={inputValue.toString()}
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
          <Text fontSize="$1" color="$gray9">
            EACH
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
