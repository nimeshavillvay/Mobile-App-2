import { Trash } from "@tamagui/lucide-icons";
import { type ComponentProps } from "react";
import { Animated, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ConfirmationDialog } from "~/components/confirmation-dialog";

export const SwipeDeleteAction = ({
  title,
  description,
  dragAnimatedValue,
  openConfirmationDialog,
  setOpenConfirmationDialog,
  onConfirm,
}: {
  readonly title: string;
  readonly description: string;
  readonly dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  readonly openConfirmationDialog: ComponentProps<
    typeof ConfirmationDialog
  >["open"];
  readonly setOpenConfirmationDialog: ComponentProps<
    typeof ConfirmationDialog
  >["onOpenChange"];
  readonly onConfirm: ComponentProps<typeof ConfirmationDialog>["onConfirm"];
}) => {
  const scale = dragAnimatedValue.interpolate({
    inputRange: [-100, -50, 0],
    outputRange: [2, 1, 0],
    extrapolate: "clamp",
  });

  return (
    <ConfirmationDialog
      open={openConfirmationDialog}
      onOpenChange={setOpenConfirmationDialog}
      title={title}
      description={description}
      onConfirm={onConfirm}
    >
      <RectButton style={styles.rightAction}>
        <Animated.View
          style={[
            { flex: 1, justifyContent: "center" },
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Trash color="white" size={16} />
        </Animated.View>
      </RectButton>
    </ConfirmationDialog>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "#AA2429",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
