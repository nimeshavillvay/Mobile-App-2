import { Truck, X } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import { Button, Dialog, Unspaced } from "tamagui";

const DropShipItemNotice = () => {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button icon={<Truck size={20} />} style={styles.dropShipButton}>
          Drop Ship Item
        </Button>
      </Dialog.Trigger>

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
          <Dialog.Title style={styles.dialogTitle}>Drop Ship Item</Dialog.Title>

          <Dialog.Description style={styles.dialogDescription}>
            This item ships directly from the vendor. Additional freight charges
            may apply.
          </Dialog.Description>

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
    </Dialog>
  );
};

export default DropShipItemNotice;

const styles = StyleSheet.create({
  dropShipButton: {
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    color: "#171717",
    fontSize: 14,
  },
  dialogTitle: {
    color: "#171717",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
  },
  dialogDescription: {
    color: "#171717",
    fontSize: 13,
    lineHeight: 13,
    marginVertical: 24,
  },
});
