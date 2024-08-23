import { ChevronUp } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Accordion, H5, Square, Text } from "tamagui";
import { formatNumberToPrice } from "~/lib/utils";

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    shadowRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  triggerText: {
    fontSize: 18,
    fontWeight: 400,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
    textTransform: "none",
    color: "rgba(0, 0, 0, 0.91)",
    fontSize: 16,
    fontWeight: 400,
  },
  rowValue: {
    color: "rgba(0, 0, 0, 0.91)",
    fontSize: 16,
    fontWeight: 700,
  },
});

export const OrderSummary = ({
  itemsCount,
  net,
  savings,
  shipping,
  tax,
}: {
  readonly itemsCount: number;
  readonly net: number;
  readonly savings: number;
  readonly shipping: number;
  readonly tax: number;
}) => {
  const [value, setValue] = useState("");

  const screenWidth = Dimensions.get("screen").width;

  return (
    <Accordion
      value={value}
      onValueChange={setValue}
      overflow="hidden"
      width="100%"
      type="single"
      collapsible
    >
      <Accordion.Item value="order-summary">
        <Accordion.Trigger
          paddingHorizontal={0}
          paddingVertical={0}
          borderTopWidth={0}
          borderBottomWidth={0}
          testID="order-summary-trigger"
        >
          {({ open }: { readonly open: boolean }) => (
            <View
              style={[
                styles.trigger,
                {
                  borderBottomWidth: open ? 1 : 0,
                  borderColor: "rgba(0, 0, 0, 0.07)",
                },
              ]}
            >
              <Text style={styles.triggerText}>Order Summary</Text>

              <Square
                animation="quick"
                rotate={open ? "180deg" : "0deg"}
                size={20}
              >
                <ChevronUp size={20} strokeOpacity={0.439} />
              </Square>
            </View>
          )}
        </Accordion.Trigger>

        <Accordion.HeightAnimator
          animation="slow"
          style={{ width: "100%", backgroundColor: "green" }}
        >
          <Accordion.Content
            width={screenWidth}
            paddingHorizontal={16}
            paddingVertical={7}
            gap={8}
            exitStyle={{ opacity: 0 }}
            testID="order-summary-content"
          >
            <View
              style={[styles.summaryRow]}
              testID="order-summary-net-price-row"
            >
              <H5 style={styles.rowTitle}>Subtotal ({itemsCount} items)</H5>

              <Text style={styles.rowValue}>${formatNumberToPrice(net)}</Text>
            </View>

            {savings > 0 && (
              <View style={[styles.summaryRow]} testID="order-summary-savings">
                <H5 style={styles.rowTitle}>Savings</H5>

                <Text style={[styles.rowValue, { color: "#30A46C" }]}>
                  -${formatNumberToPrice(savings)}
                </Text>
              </View>
            )}

            <View style={[styles.summaryRow]} testID="order-summary-shipping">
              <H5 style={styles.rowTitle}>Shipping</H5>

              <Text style={styles.rowValue}>
                {shipping > 0 ? `$${formatNumberToPrice(shipping)}` : "Free"}
              </Text>
            </View>

            <View style={[styles.summaryRow]} testID="order-summary-tax">
              <H5 style={styles.rowTitle}>Sales Tax</H5>

              <Text
                style={[styles.rowValue, { fontSize: 14, fontWeight: 500 }]}
              >
                ${formatNumberToPrice(tax)}
              </Text>
            </View>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
};
