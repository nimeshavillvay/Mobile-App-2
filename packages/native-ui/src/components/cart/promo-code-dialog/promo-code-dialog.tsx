import { X } from "@tamagui/lucide-icons";
import { type ComponentProps } from "react";
import { type UseFormReturn, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Text,
  Unspaced,
  VisuallyHidden,
  XStack,
} from "tamagui";
import { formatNumberToPrice } from "~/lib/utils";

const styles = StyleSheet.create({
  dialogTitle: {
    color: "#171717",
    fontSize: 20,
    fontWeight: 700,
  },
});

export const PromoCodeDialog = ({
  modal = true,
  ...delegated
}: ComponentProps<typeof Dialog>) => {
  return <Dialog modal={modal} {...delegated} />;
};

export const PromoCodeDialogTrigger = ({
  promoCode,
  savings,
  clearPromoCode,
}: {
  readonly promoCode?: string | null;
  readonly savings?: number;
  readonly clearPromoCode: () => Promise<void>;
}) => {
  if (promoCode && savings) {
    return (
      <XStack alignItems="center" gap={8}>
        <Dialog.Trigger asChild>
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              padding: 0,
              height: "auto",
            }}
          >
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.44)",
                fontSize: 16,
              }}
            >
              {promoCode}
            </Text>

            <Text
              style={{
                color: "#236E4A",
                fontSize: 16,
              }}
            >
              (Saving ${formatNumberToPrice(savings)})
            </Text>
          </Button>
        </Dialog.Trigger>

        <Button
          icon={X}
          style={{ padding: 4, height: "auto", backgroundColor: "#FFFFFF" }}
          onPress={clearPromoCode}
        />
      </XStack>
    );
  }

  return (
    <Dialog.Trigger asChild>
      <Button
        style={{
          backgroundColor: "#FFFFFF",
          padding: 0,
          height: "auto",
          color: "rgba(0, 0, 0, 0.44)",
          fontSize: 16,
        }}
      >
        Add
      </Button>
    </Dialog.Trigger>
  );
};

export const PromoCodeDialogContent = ({
  form,
  submitPromoCode,
  disabled = false,
  promoCodeError,
}: {
  readonly form: UseFormReturn<
    {
      promoCode: string;
    },
    unknown,
    undefined
  >;
  readonly submitPromoCode: () => Promise<void>;
  readonly disabled?: boolean;
  readonly promoCodeError?: string;
}) => {
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
        gap={24}
        width={340}
      >
        <Dialog.Title style={styles.dialogTitle}>Promo Code</Dialog.Title>

        <Fieldset gap="$4" horizontal>
          <VisuallyHidden>
            <Label width={160} justifyContent="flex-end" htmlFor="promo-code">
              Promo Code
            </Label>
          </VisuallyHidden>

          <Controller
            control={form.control}
            name="promoCode"
            disabled={disabled}
            render={({ field: { onBlur, onChange, value, disabled } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                id="promo-code"
                defaultValue="Promo Code"
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 9,
                  color: "#171717",
                }}
                borderColor={promoCodeError ? "#CC0000" : "#DBDBDB"}
                disabled={disabled}
              />
            )}
          />
        </Fieldset>

        {!!promoCodeError && (
          <Text style={{ color: "#CC0000" }}>{promoCodeError}</Text>
        )}

        <XStack alignSelf="flex-end" gap="$4">
          <Dialog.Close displayWhenAdapted asChild>
            <Button
              theme="active"
              aria-label="Close"
              style={{
                backgroundColor: "#282828",
                borderRadius: 9,
                color: "#EDEDED",
                fontSize: 16,
              }}
              disabled={disabled}
              onPress={submitPromoCode}
            >
              Add
            </Button>
          </Dialog.Close>
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
              disabled={disabled}
            />
          </Dialog.Close>
        </Unspaced>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
