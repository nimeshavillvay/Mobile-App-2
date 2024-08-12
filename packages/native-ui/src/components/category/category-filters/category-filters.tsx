import { ChevronDown } from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type ComponentProps, type ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Accordion,
  Button,
  Paragraph,
  ScrollView,
  Square,
  Text,
  XStack,
} from "tamagui";
import { Checkbox, type CheckboxProps } from "~/components/checkbox";

const styles = StyleSheet.create({
  attributesList: {
    backgroundColor: "#F7F8FA",
    padding: 16,
  },
  attributeItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
  },
  attributeTrigger: {
    paddingHorizontal: 18,
    paddingVertical: 23,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0,
  },
  attributeContent: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 16,
  },
  valueLabel: {
    color: "#171717",
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
    height: 20,
  },
  footerButton: {
    flex: 1,
    height: 44,
    borderRadius: 9,
    fontSize: 16,
  },
});

export const CategoryFiltersSkeleton = () => {
  return (
    <MotiView style={{ padding: 16, flex: 1, backgroundColor: "#F7F8FA" }}>
      <Skeleton height="100%" width="100%" colorMode="light" />
    </MotiView>
  );
};

export const CategoryFiltersScrollView = ({
  style,
  ...delegated
}: ComponentProps<typeof ScrollView>) => {
  return (
    <ScrollView
      style={StyleSheet.flatten([styles.attributesList, style])}
      {...delegated}
    />
  );
};

export const CategoryFiltersAccordion = (
  props: ComponentProps<typeof Accordion>,
) => {
  return <Accordion {...props} />;
};

export const CategoryFiltersAccordionItem = ({
  style = styles.attributeItem,
  ...delegated
}: ComponentProps<typeof Accordion.Item>) => {
  return <Accordion.Item style={style} {...delegated} />;
};

export const CategoryFiltersAccordionTrigger = ({
  children,
  ...delegated
}: Omit<ComponentProps<typeof Accordion.Trigger>, "style"> & {
  readonly children: ReactNode;
}) => {
  return (
    <Accordion.Trigger style={styles.attributeTrigger} {...delegated}>
      {({ open }: { readonly open: boolean }) => (
        <>
          <Paragraph fontSize={18}>{children}</Paragraph>

          <Square animation="quick" rotate={open ? "180deg" : "0deg"} size={20}>
            <ChevronDown size={20} />
          </Square>
        </>
      )}
    </Accordion.Trigger>
  );
};

export const CategoryFiltersAccordionContent = ({
  style = styles.attributeContent,
  ...delegated
}: ComponentProps<typeof Accordion.Content>) => {
  return <Accordion.Content style={style} {...delegated} />;
};

export const CategoryFilterCheckboxItem = ({
  checked,
  onCheckedChanged,
  onPress,
  disabled,
  children,
}: {
  readonly checked?: CheckboxProps["checked"];
  readonly onCheckedChanged?: CheckboxProps["onCheckedChanged"];
  readonly onPress?: ComponentProps<typeof Pressable>["onPress"];
  readonly disabled?: boolean;
  readonly children?: ReactNode;
}) => {
  return (
    <XStack alignItems="center" gap={10}>
      <Checkbox
        checked={checked}
        onCheckedChanged={onCheckedChanged}
        disabled={disabled}
      />

      <Pressable disabled={disabled} onPress={onPress}>
        <Text style={styles.valueLabel}>{children}</Text>
      </Pressable>
    </XStack>
  );
};

export const CategoryFilterFooter = ({
  onClearPress,
  onApplyPress,
}: {
  readonly onClearPress: () => void;
  readonly onApplyPress: () => void;
}) => {
  return (
    <XStack
      paddingTop={12}
      paddingBottom={17}
      paddingHorizontal={16}
      alignItems="center"
      justifyContent="space-between"
      gap={10}
    >
      <Button
        style={styles.footerButton}
        color="#171717"
        backgroundColor="white"
        borderColor="#E2E2E2"
        onPress={onClearPress}
      >
        Clear Filters
      </Button>

      <Button
        style={StyleSheet.flatten([
          styles.footerButton,
          { color: "#EDEDED", backgroundColor: "#282828" },
        ])}
        onPress={onApplyPress}
      >
        Apply Filters
      </Button>
    </XStack>
  );
};
