import { AlertTriangle, X } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import { Button, Dialog, Unspaced } from "tamagui";

export const RegionallyExclusiveItemNotice = () => {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button
          icon={<AlertTriangle size={20} />}
          style={styles.exclusiveButton}
        >
          Not Available
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
          backgroundColor="#FEECEE"
          borderColor="#AA2429"
        >
          <Dialog.Title style={styles.dialogTitle}>Not Available</Dialog.Title>

          <Dialog.Description style={styles.dialogDescription}>
            This item is not available in certain regions. For better experience
            please Sign in or register.
          </Dialog.Description>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                color="#AA2429"
                backgroundColor="$colorTransparent"
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  exclusiveButton: {
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 14,
    backgroundColor: "#FEECEE",
    color: "#AA2429",
    borderColor: "#AA2429",
  },
  dialogTitle: {
    color: "#AA2429",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
  },
  dialogDescription: {
    color: "#AA2429",
    fontSize: 13,
    lineHeight: 13,
    marginVertical: 24,
  },
});
