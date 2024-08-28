import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { type ComponentProps } from "react";
import { Adapt, Select as SelectPrimitive, Sheet } from "tamagui";

export const Select = ({
  disablePreventBodyScroll = true,
  ...delegated
}: ComponentProps<typeof SelectPrimitive>) => {
  return (
    <SelectPrimitive
      native
      disablePreventBodyScroll={disablePreventBodyScroll}
      {...delegated}
    />
  );
};

export const SelectTrigger = ({
  iconAfter = ChevronDown,
  ...delegated
}: ComponentProps<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger iconAfter={iconAfter} {...delegated}>
      <SelectPrimitive.Value />
    </SelectPrimitive.Trigger>
  );
};

export const SelectAdapt = () => {
  return (
    <Adapt when="sm" platform="touch">
      <Sheet
        native
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
  );
};

export const SelectContent = ({
  children,
  ...delegated
}: ComponentProps<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Content {...delegated}>
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
};

export const SelectItem = SelectPrimitive.Item;

export const SelectItemText = SelectPrimitive.ItemText;

export const SelectItemIndicator = ({
  children = <Check size={16} />,
  marginLeft = "auto",
  ...delegated
}: ComponentProps<typeof SelectPrimitive.ItemIndicator>) => {
  return (
    <SelectPrimitive.ItemIndicator marginLeft={marginLeft} {...delegated}>
      {children}
    </SelectPrimitive.ItemIndicator>
  );
};
