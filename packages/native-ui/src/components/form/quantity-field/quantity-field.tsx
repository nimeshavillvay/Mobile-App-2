import { Minus, Plus } from "@tamagui/lucide-icons";
import { type ComponentProps } from "react";
import { TextInput, View } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";

export const QuantityField = ({
  uom,
  quantity,
  setQuantity,
  minQuantity,
  quantityMultiple,
  disabled = false,
}: {
  readonly uom: string;
  readonly quantity: number;
  readonly setQuantity: (quantity: number) => void;
  readonly minQuantity: number;
  readonly quantityMultiple: number;
  readonly disabled?: boolean;
}) => {
  const handleOnTextChange: ComponentProps<typeof TextInput>["onChangeText"] = (
    text: string,
  ) => {
    let newQuantity = parseInt(text.replace(/[^0-9]/g, ""));

    if (newQuantity < minQuantity) {
      newQuantity = minQuantity;
    }

    if (newQuantity % quantityMultiple !== 0) {
      newQuantity = newQuantity - (newQuantity % quantityMultiple);
    }

    setQuantity(newQuantity);
  };

  let error = "";
  if (quantity < minQuantity) {
    error = `Please consider minimum order quantity of ${minQuantity}`;
  } else if (quantity % quantityMultiple !== 0) {
    error = `Please consider order quantity multiple of ${quantityMultiple}`;
  }

  return (
    <YStack gap={8}>
      <XStack>
        <Button
          icon={Minus}
          disabled={quantity <= minQuantity || disabled}
          onPress={() => setQuantity(quantity - quantityMultiple)}
          style={{
            padding: 0,
            width: 40,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />

        <XStack
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.07)",
          }}
        >
          <TextInput
            value={quantity.toString()}
            onChangeText={handleOnTextChange}
            keyboardType="numeric"
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              borderWidth: 0,
              shadowRadius: 0,
              textAlign: "center",
            }}
            editable={disabled}
            selectTextOnFocus={disabled}
          />

          <View
            style={{
              paddingHorizontal: 16,
              justifyContent: "center",
              borderLeftWidth: 1,
              borderLeftColor: "rgba(0, 0, 0, 0.22)",
            }}
          >
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.44)",
                fontSize: 10,
                textTransform: "uppercase",
              }}
            >
              {uom}
            </Text>
          </View>
        </XStack>

        <Button
          icon={Plus}
          onPress={() => setQuantity(quantity + quantityMultiple)}
          style={{
            padding: 0,
            width: 40,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          disabled={disabled}
        />
      </XStack>

      {!!error && <Text style={{ color: "#CC0000" }}>{error}</Text>}
    </YStack>
  );
};
