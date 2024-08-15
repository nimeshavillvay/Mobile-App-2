import { X } from "@tamagui/lucide-icons";
import { type ComponentProps, type ReactNode } from "react";
import { StyleSheet } from "react-native";
import { AlertDialog, Button, Unspaced, XStack, YStack } from "tamagui";

type ConfirmationDialogProps = {
  readonly open?: ComponentProps<typeof AlertDialog>["open"];
  readonly onOpenChange?: ComponentProps<typeof AlertDialog>["onOpenChange"];
  readonly children: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly onConfirm: ComponentProps<typeof AlertDialog.Action>["onPress"];
};

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild testID="confirmation-dialog-trigger">
        {children}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap={24}>
            <AlertDialog.Title
              color="#171717"
              fontSize={20}
              lineHeight={24}
              fontWeight={700}
            >
              {title}
            </AlertDialog.Title>

            <AlertDialog.Description
              color="#171717"
              fontSize={13}
              lineHeight={13}
            >
              {description}
            </AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Action asChild onPress={onConfirm}>
                <Button style={styles.confirmButton}>Confirm</Button>
              </AlertDialog.Action>
            </XStack>

            <Unspaced>
              <AlertDialog.Cancel asChild>
                <Button
                  position="absolute"
                  top="$0"
                  right="$0"
                  size="$2"
                  circular
                  icon={X}
                />
              </AlertDialog.Cancel>
            </Unspaced>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    fontSize: 16,
    color: "#EDEDED",
    borderRadius: 9,
    backgroundColor: "#282828",
  },
});
