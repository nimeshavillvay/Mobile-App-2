import { DELIVERY_METHODS } from "@/lib/constants";
import { RadioGroupItemWithLabel } from "@repo/native-ui/components/form/radio-group";
import { Check, ChevronDown, Package, X } from "@tamagui/lucide-icons";
import { type ComponentProps, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Adapt,
  Button,
  Dialog,
  RadioGroup,
  Select,
  Sheet,
  Text,
  Unspaced,
  View,
  XStack,
  YStack,
} from "tamagui";

const styles = StyleSheet.create({
  dialogTitle: {
    color: "#171717",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
    paddingRight: 50,
  },
  shipToMeDescription: {
    color: "#171717",
    fontSize: 16,
  },
  trigger: {
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    fontSize: 16,
    color: "#EDEDED",
    borderRadius: 9,
    backgroundColor: "#282828",
  },
});

export const AllDeliveryMethodsChanger = ({
  children,
  open,
  onOpenChange,
  ...delegated
}: ComponentProps<typeof View> & {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}) => {
  return (
    <View paddingHorizontal={16} paddingTop={16} {...delegated}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </View>
  );
};

export const AllDeliveryMethodsChangerTrigger = () => {
  return (
    <Dialog.Trigger asChild>
      <Button
        icon={<Package size={16} />}
        borderRadius={9}
        color="#171717"
        fontSize={16}
      >
        Set Delivery Method for All Items
      </Button>
    </Dialog.Trigger>
  );
};

export const AllDeliveryMethodsChangerDialog = ({
  shippingMethods,
  selectedShipToMeMethod,
  setSelectedShipToMeMethod,
  saveShippingMethod,
}: {
  readonly shippingMethods: { code: string; name: string }[];
  readonly selectedShipToMeMethod: string | undefined;
  readonly setSelectedShipToMeMethod: (value: string) => void;
  readonly saveShippingMethod: (
    deliveryMethod: string,
    shippingMethod?: string,
  ) => Promise<void>;
}) => {
  const [deliveryType, setDeliveryType] = useState<string | undefined>(
    undefined,
  );

  const disableSave =
    !deliveryType ||
    (deliveryType === DELIVERY_METHODS.SHIP_TO_ME && !selectedShipToMeMethod);

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        key="overlay"
        animation="slow"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Dialog.Content
        bordered
        elevate
        key="content"
        animateOnly={["transform", "opacity"]}
        animation={[
          "quicker",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
      >
        <Dialog.Title style={styles.dialogTitle}>
          Set Delivery Method for All Items
        </Dialog.Title>

        <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
          <YStack gap={24}>
            <YStack gap={10}>
              <RadioGroupItemWithLabel
                value={DELIVERY_METHODS.SHIP_TO_ME}
                label="Ship to me"
              />

              <Select
                value={selectedShipToMeMethod}
                onValueChange={setSelectedShipToMeMethod}
                disablePreventBodyScroll
              >
                <Select.Trigger
                  iconAfter={ChevronDown}
                  style={styles.trigger}
                  disabled={deliveryType !== DELIVERY_METHODS.SHIP_TO_ME}
                >
                  <Select.Value placeholder="Select a delivery method" />
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                  <Sheet
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                      type: "spring",
                      damping: 20,
                      mass: 1.2,
                      stiffness: 250,
                    }}
                  >
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                      animation="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Sheet>
                </Adapt>

                <Select.Content>
                  <Select.Viewport>
                    <Select.Group>
                      {shippingMethods.map((shippingMethod, index) => (
                        <Select.Item
                          index={index}
                          key={shippingMethod.code}
                          value={shippingMethod.code}
                        >
                          <Select.ItemText>
                            {shippingMethod.name}
                          </Select.ItemText>

                          <Select.ItemIndicator marginLeft="auto">
                            <Check size={16} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select>

              <Text style={styles.shipToMeDescription}>
                Get it by <Text fontWeight={700}>today</Text> if you order
                before noon
              </Text>
            </YStack>

            <View>
              <RadioGroupItemWithLabel
                value={DELIVERY_METHODS.STORE_PICK_UP}
                label="Store pick up (Brea, CA)"
              />
            </View>
          </YStack>
        </RadioGroup>

        <XStack gap="$3" justifyContent="flex-end">
          <Button
            onPress={() => {
              if (deliveryType) {
                saveShippingMethod(deliveryType, selectedShipToMeMethod);
              }
            }}
            style={[styles.saveButton, { opacity: disableSave ? 0.5 : 1 }]}
            disabled={disableSave}
          >
            Save
          </Button>
        </XStack>

        <Unspaced>
          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={X}
            />
          </Dialog.Close>
        </Unspaced>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
