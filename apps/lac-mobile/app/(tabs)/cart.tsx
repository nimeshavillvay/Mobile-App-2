import CartItem from "@/components/cart/cart-item/cart-item";
import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import {
  DEFAULT_PLANT,
  DEFAULT_SHIPPING_METHOD,
  WILLCALL_SHIPPING_METHOD,
} from "@/lib/constants";
import { formatNumberToPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import {
  AllDeliveryMethodsChanger,
  AllDeliveryMethodsChangerDialog,
  AllDeliveryMethodsChangerTrigger,
} from "@repo/native-ui/components/cart/all-delivery-methods-changer";
import { OrderSummary } from "@repo/native-ui/components/cart/order-summary";
import {
  PromoCodeDialog,
  PromoCodeDialogContent,
  PromoCodeDialogTrigger,
} from "@repo/native-ui/components/cart/promo-code-dialog";
import { ConfirmationDialog } from "@repo/native-ui/components/confirmation-dialog";
import { checkAvailability } from "@repo/shared-logic/apis/base/product/check-availability";
import useSuspenseWillCallPlant from "@repo/shared-logic/apis/hooks/account/use-suspense-will-call-plant.hook";
import useRemoveCartItemMutation from "@repo/shared-logic/apis/hooks/cart/use-remove-cart-item-mutation.hook";
import useSuspenseCart from "@repo/shared-logic/apis/hooks/cart/use-suspense-cart.hook";
import useSuspenseShippingMethods from "@repo/shared-logic/apis/hooks/cart/use-suspense-shipping-methods.hook";
import useSuspenseSimulationCheckout from "@repo/shared-logic/apis/hooks/cart/use-suspense-simulation-checkout.hook";
import useUpdateCartConfigurationMutation from "@repo/shared-logic/apis/hooks/cart/use-update-cart-configuration-mutation.hook";
import useUpdateCartItemMutation from "@repo/shared-logic/apis/hooks/cart/use-update-cart-item-mutation.hook";
import useSuspensePriceCheck from "@repo/shared-logic/apis/hooks/product/use-suspense-price-check.hook";
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACKORDER_DISABLED,
  BACKORDER_ENABLED,
  DELIVERY_METHODS,
  FALSE_STRING,
  IN_STOCK,
  LIMITED_STOCK,
  NOT_AVAILABLE,
  NOT_IN_STOCK,
  TAKE_ON_HAND,
} from "@repo/shared-logic/constants";
import { type CartItemConfiguration } from "@repo/shared-logic/zod-schema/cart";
import { FlashList } from "@shopify/flash-list";
import { X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense, useState, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, H1, H4, Text, VisuallyHidden } from "tamagui";
import { z } from "zod";

type ConfigKey = keyof CartItemConfiguration;

const CartPage = () => {
  const width = Dimensions.get("window").width;

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <H1 style={styles.title}>Shopping Cart</H1>

        <Button
          icon={<X size={28} />}
          circular
          size={36}
          backgroundColor="white"
          onPress={() => router.back()}
        >
          <VisuallyHidden>
            <Text>Close page</Text>
          </VisuallyHidden>
        </Button>
      </View>

      <Suspense
        fallback={
          <MotiView style={{ flex: 1 }}>
            <Skeleton width={width} height="100%" colorMode="light" />
          </MotiView>
        }
      >
        <CartItemList />
      </Suspense>

      <Suspense>
        <CartFooter />
      </Suspense>
    </ScreenLayout>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
  },
  footerContainer: {
    padding: 16,
  },
  clearCartButton: {
    backgroundColor: "#ffffff",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    color: "#171717",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 400,
  },
  orderSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.07)",
  },
  orderSummaryLabel: {
    color: "rgba(0, 0, 0, 0.91)",
    fontSize: 18,
    fontWeight: 400,
  },
  footerBtn: {
    flex: 1,
    borderRadius: 9,
    fontSize: 16,
    paddingHorizontal: 0,
  },
});

const promoCodeFormSchema = z.object({
  promoCode: z.string(),
});
type PromoCodeSchema = z.infer<typeof promoCodeFormSchema>;

const CartItemList = () => {
  const [openClearAllDialog, setOpenClearAllDialog] = useState(false);
  const [selectedShipToMeMethod, setSelectedShipToMeMethod] = useState<
    string | undefined
  >(undefined);
  const [openChangeAll, setOpenChangeAll] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const cartQuery = useSuspenseCart(authenticatedApiConfig);
  const priceCheckQuery = useSuspensePriceCheck(
    authenticatedApiConfig,
    cartQuery.data.cartItems.map((item) => ({
      productId: item.itemInfo.productId,
      qty: item.quantity,
    })),
  );

  const willCallPlantQuery = useSuspenseWillCallPlant(authenticatedApiConfig);
  const shippingMethodsQuery = useSuspenseShippingMethods(
    authenticatedApiConfig,
  );

  const removeCartItemMutation = useRemoveCartItemMutation(
    authenticatedApiConfig,
  );
  const updateCartItemMutation = useUpdateCartItemMutation(
    authenticatedApiConfig,
  );

  const clearCart: ComponentProps<typeof ConfirmationDialog>["onConfirm"] = (
    event,
  ) => {
    event.preventDefault();

    removeCartItemMutation.mutate(
      cartQuery.data.cartItems.map((item) => item.cartItemId),
      {
        onSuccess: () => {
          setOpenClearAllDialog(false);
        },
      },
    );
  };

  const setConfigValues = (
    config: CartItemConfiguration,
    index: number,
    availValue: string,
    plantValue: string,
    shippingMethodValue: string,
  ): void => {
    const configKeyAvail: ConfigKey = `avail_${index}` as ConfigKey;
    const configKeyPlant: ConfigKey = `plant_${index}` as ConfigKey;
    const configKeyShippingMethod: ConfigKey =
      `shipping_method_${index}` as ConfigKey;

    config[configKeyAvail] = availValue;
    config[configKeyPlant] = plantValue;
    config[configKeyShippingMethod] = shippingMethodValue;
  };

  const saveShippingMethod = async (
    deliveryMethod: string,
    shippingMethodValue?: string,
  ) => {
    setDisableSave(true);

    // Handle global will call
    if (deliveryMethod === DELIVERY_METHODS.STORE_PICK_UP) {
      const cartItemsAvailability = await Promise.all(
        cartQuery.data.cartItems.map(async (item) => {
          return await checkAvailability(authenticatedApiConfig, {
            productId: item.itemInfo.productId,
            quantity: item.quantity,
            plant: willCallPlantQuery.data.plantCode ?? DEFAULT_PLANT,
          });
        }),
      );

      const cartItems = cartQuery.data.cartItems.map((item) => {
        const config = {
          ...item.configuration,
        };
        const availability = cartItemsAvailability.find(
          (willCall) =>
            willCall.productId === item.itemInfo.productId &&
            willCall.willCallAnywhere[0]?.shippingMethod ===
              WILLCALL_SHIPPING_METHOD &&
            willCall.willCallAnywhere[0]?.status !== NOT_AVAILABLE,
        );

        if (availability) {
          (Object.keys(config) as (keyof typeof config)[]).forEach((key) => {
            if (
              ["avail_", "shipping_method_", "plant_"].some((prefix) =>
                key.startsWith(prefix),
              )
            ) {
              config[key] = "";
            }
          });

          config.plant_1 = willCallPlantQuery.data?.plantCode ?? DEFAULT_PLANT;
          config.hashvalue = availability?.willCallAnywhere?.[0]?.hash
            ? availability.willCallAnywhere[0].hash
            : "";

          if (
            availability.willCallAnywhere &&
            availability.willCallAnywhere[0] &&
            availability.willCallAnywhere[0].status === IN_STOCK
          ) {
            config.shipping_method_1 =
              availability?.options
                ?.at(0)
                ?.plants?.at(0)
                ?.shippingMethods?.at(0)?.code ?? "0";
            config.avail_1 =
              availability.willCallAnywhere[0]?.willCallQuantity.toString();
            config.backorder_date =
              availability.willCallAnywhere[0]?.backOrderDate_1 ?? "";
            config.will_call_avail =
              availability.willCallAnywhere[0]?.willCallQuantity.toString();
            config.will_call_plant =
              willCallPlantQuery.data.plantCode ?? DEFAULT_PLANT;
            config.will_call_shipping = WILLCALL_SHIPPING_METHOD;
            config.will_call_not_in_stock = FALSE_STRING;
          } else if (
            availability.willCallAnywhere &&
            availability.willCallAnywhere[0] &&
            availability.willCallAnywhere[0].status === NOT_IN_STOCK
          ) {
            config.avail_1 = "0";
            config.shipping_method_1 =
              availability?.options
                ?.at(0)
                ?.plants?.at(0)
                ?.shippingMethods?.at(0)?.code ?? "0";
            config.backorder_all = "T";
            config.backorder_date =
              availability.willCallAnywhere[0]?.willCallBackOrder ?? "";
            config.backorder_quantity =
              availability.willCallAnywhere[0]?.willCallQuantity.toString();
            config.will_call_plant =
              willCallPlantQuery.data.plantCode ?? DEFAULT_PLANT;
            config.will_call_shipping = WILLCALL_SHIPPING_METHOD;
            config.will_call_not_in_stock = FALSE_STRING;
          } else if (
            availability.willCallAnywhere &&
            availability.willCallAnywhere[0] &&
            availability.willCallAnywhere[0].status === LIMITED_STOCK
          ) {
            config.shipping_method_1 =
              availability?.options
                ?.at(0)
                ?.plants?.at(0)
                ?.shippingMethods?.at(0)?.code ?? "0";
            config.avail_1 =
              availability.willCallAnywhere[0]?.willCallQuantity.toString();
            config.backorder_date =
              availability.willCallAnywhere[0]?.backOrderDate_1 ?? "";
            config.will_call_avail =
              availability.willCallAnywhere[0]?.willCallQuantity.toString();
            config.will_call_plant =
              willCallPlantQuery.data.plantCode ?? DEFAULT_PLANT;
            config.backorder_all = "F";
            config.backorder_quantity =
              availability.willCallAnywhere[0]?.backOrderQuantity_1?.toString() ??
              "";
            config.will_call_shipping = WILLCALL_SHIPPING_METHOD;
            config.will_call_not_in_stock = FALSE_STRING;
          }
        }

        return {
          cartItemId: item.cartItemId,
          quantity: item.quantity,
          config,
        };
      });

      await updateCartItemMutation.mutateAsync(cartItems);
    } else if (
      deliveryMethod === DELIVERY_METHODS.SHIP_TO_ME &&
      shippingMethodValue
    ) {
      // Get the available shipping methods for each item in the cart
      const itemShippingMethods = await Promise.all(
        cartQuery.data.cartItems.map(async (item) => {
          const availability = await checkAvailability(authenticatedApiConfig, {
            productId: item.itemInfo.productId,
            quantity: item.quantity,
            plant: item.configuration?.plant_1,
          });

          const allAvailableOption = availability.options.find(
            (option) => option.type === AVAILABLE_ALL,
          );
          const takeOnHandOption = availability.options.find(
            (option) => option.type === TAKE_ON_HAND,
          );
          const alternativeBranchesOption = availability.options.find(
            (option) => option.type === ALTERNATIVE_BRANCHES,
          );

          // Get all methods for "Ship to me"
          const options = [
            allAvailableOption,
            takeOnHandOption,
            alternativeBranchesOption,
          ];

          const selectedOption = options.find((option) =>
            option?.plants.some((plant) =>
              plant?.shippingMethods.some(
                (method) => method?.code === shippingMethodValue,
              ),
            ),
          );

          const shippingMethods =
            selectedOption?.plants.at(0)?.shippingMethods ?? [];

          return {
            id: item.itemInfo.productId,
            hashvalue: selectedOption?.hash ?? "",
            shippingMethods,
            plants: selectedOption?.plants,
            backOrder: selectedOption?.backOrder,
            type: selectedOption?.type,
          };
        }),
      );

      await updateCartItemMutation.mutateAsync(
        cartQuery.data.cartItems.map((item) => {
          const config = {
            ...item.configuration,
          };

          let newValue: string | undefined = undefined;
          let newHashValue: string | undefined = undefined;
          // Check if the value is available
          const shippingMethod = itemShippingMethods.find(
            (shippingMethod) => shippingMethod.id === item.itemInfo.productId,
          );
          if (shippingMethod) {
            // Check if the global shipping method selected is available for the item
            const isValid = !!shippingMethod.shippingMethods.find(
              (element) => element.code === shippingMethodValue,
            );

            if (isValid) {
              newValue = shippingMethodValue;
              newHashValue = shippingMethod.hashvalue;
            }
          }
          // Change the shipping method only if it can be changed
          const selectedOption = shippingMethod;
          const addedIndexes: number[] = [];

          if (newValue && newHashValue) {
            config.will_call_shipping = "";
            config.will_call_avail = "";
            config.will_call_plant = "";
            config.will_call_not_in_stock = FALSE_STRING;
            // Set hash value
            config.hashvalue = newHashValue;
            if (selectedOption) {
              config.backorder_all =
                selectedOption.type === "backOrderAll" &&
                selectedOption.backOrder
                  ? BACKORDER_ENABLED
                  : BACKORDER_DISABLED;
              config.backorder_quantity =
                selectedOption.plants?.[0]?.backOrderQuantity?.toString() ??
                "0";
              config.backorder_date =
                selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";
            }

            for (let i = 0; i < 5; i++) {
              if (
                selectedOption &&
                selectedOption.plants &&
                selectedOption.plants[i]
              ) {
                const selectedPlant = selectedOption.plants[i];

                if (selectedPlant) {
                  const quantity = selectedPlant.quantity ?? "";
                  const index = selectedPlant.index;
                  addedIndexes.push(index);

                  const availValue = quantity?.toString() ?? "";
                  const plantValue = selectedPlant.plant ?? "";
                  const shippingMethodValue =
                    selectedPlant.plant !== willCallPlantQuery.data.plantCode
                      ? DEFAULT_SHIPPING_METHOD
                      : (newValue ?? "");

                  // Set values for the selected plant
                  setConfigValues(
                    config,
                    index,
                    availValue,
                    plantValue,
                    shippingMethodValue,
                  );
                }
              }
            }

            // Add the missing plants
            for (let i = 1; i <= 5; i++) {
              if (!addedIndexes.includes(i)) {
                setConfigValues(config, i, "", "", "");
              }
            }
          }

          return {
            cartItemId: item.cartItemId,
            quantity: item.quantity,
            config,
          };
        }),
      );
    }

    setOpenChangeAll(false);
    setDisableSave(false);
  };

  return (
    <FlashList
      data={cartQuery.data.cartItems}
      extraData={priceCheckQuery.data.productPrices}
      keyExtractor={({ itemInfo }) => itemInfo.productId.toString()}
      renderItem={({ item }) => (
        <CartItem
          cartItemId={item.cartItemId}
          image={item.itemInfo.image}
          title={item.itemInfo.productName}
          sku={item.itemInfo.productSku}
          price={
            priceCheckQuery.data.productPrices.find(
              (price) => price.productId === item.itemInfo.productId.toString(),
            )?.extendedPrice
          }
          quantity={item.quantity}
          uom={item.itemInfo.unitOfMeasure}
          pickupQuantity={item.mappedConfiguration.availability.reduce(
            (accumulator, currentValue) =>
              (currentValue.quantity ?? 0) + accumulator,
            0,
          )}
          backOrderedQuantity={item.mappedConfiguration.backOrderQuantity}
          isVendorShipped={item.itemInfo.isDirectlyShippedFromVendor}
          isExcluded={item.itemInfo.isExcludedProduct}
        />
      )}
      ListHeaderComponent={
        <AllDeliveryMethodsChanger
          open={openChangeAll}
          onOpenChange={setOpenChangeAll}
        >
          <AllDeliveryMethodsChangerTrigger />

          <AllDeliveryMethodsChangerDialog
            shippingMethods={shippingMethodsQuery.data}
            selectedShipToMeMethod={selectedShipToMeMethod}
            setSelectedShipToMeMethod={setSelectedShipToMeMethod}
            saveShippingMethod={saveShippingMethod}
            disableSaveBtn={disableSave}
            willCallPlant={willCallPlantQuery.data.plantName}
          />
        </AllDeliveryMethodsChanger>
      }
      ListFooterComponent={
        cartQuery.data.cartItems.length > 0 ? (
          <View style={styles.footerContainer}>
            <ConfirmationDialog
              open={openClearAllDialog}
              onOpenChange={setOpenClearAllDialog}
              title="Clear Cart"
              description="Are you sure you want to clear your cart?"
              onConfirm={clearCart}
            >
              <Button style={styles.clearCartButton}>Clear Cart</Button>
            </ConfirmationDialog>
          </View>
        ) : null
      }
      estimatedItemSize={180}
    />
  );
};

const CartFooter = () => {
  const [promoCodeDialogOpen, setPromoCodeDialogOpen] = useState(false);

  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const cartQuery = useSuspenseCart(authenticatedApiConfig);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(
    authenticatedApiConfig,
  );

  const promoCodeForm = useForm<PromoCodeSchema>({
    resolver: zodResolver(promoCodeFormSchema),
    values: {
      promoCode: cartQuery.data.configuration.coupon ?? "",
    },
  });

  const updateCartConfigurationMutation = useUpdateCartConfigurationMutation(
    authenticatedApiConfig,
  );

  const submitPromoCode = promoCodeForm.handleSubmit(async (values) => {
    await updateCartConfigurationMutation.mutateAsync(
      {
        coupon: values.promoCode,
      },
      {
        onError: () => {
          promoCodeForm.setError("promoCode", {
            message: "Invalid Promo Code",
          });
        },
        onSuccess: () => {
          setPromoCodeDialogOpen(false);
        },
      },
    );
  });
  const clearPromoCode = async () => {
    await updateCartConfigurationMutation.mutateAsync({
      coupon: "",
    });
  };

  return (
    <View
      style={{
        elevation: 1,
        backgroundColor: "#FFFFFF",
        shadowOffset: { height: -1, width: 0 },
        shadowRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: "hidden",
      }}
    >
      <View
        style={[
          styles.orderSummaryRow,
          { paddingHorizontal: 0, paddingVertical: 0 },
        ]}
      >
        <OrderSummary
          itemsCount={simulationCheckoutQuery.data.cartItemsCount}
          net={simulationCheckoutQuery.data.net}
          savings={simulationCheckoutQuery.data.discount}
          shipping={simulationCheckoutQuery.data.shippingcost}
          tax={simulationCheckoutQuery.data.tax}
        />
      </View>

      <View style={styles.orderSummaryRow}>
        <H4 style={styles.orderSummaryLabel}>Promo Code</H4>

        <PromoCodeDialog
          open={promoCodeDialogOpen}
          onOpenChange={setPromoCodeDialogOpen}
        >
          <PromoCodeDialogTrigger
            promoCode={cartQuery.data.configuration.coupon}
            savings={simulationCheckoutQuery.data.discount}
            clearPromoCode={clearPromoCode}
          />

          <PromoCodeDialogContent
            form={promoCodeForm}
            submitPromoCode={submitPromoCode}
            disabled={updateCartConfigurationMutation.isPending}
            promoCodeError={promoCodeForm.formState.errors.promoCode?.message}
          />
        </PromoCodeDialog>
      </View>

      <View style={styles.orderSummaryRow}>
        <H4 style={styles.orderSummaryLabel}>Estimated total</H4>

        <Text
          style={{
            color: "rgba(0, 0, 0, 0.91)",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          ${formatNumberToPrice(simulationCheckoutQuery.data.total)}
        </Text>
      </View>

      <View style={[styles.orderSummaryRow, { borderBottomWidth: 0, gap: 10 }]}>
        <Button
          style={[
            styles.footerBtn,
            {
              backgroundColor: "#FFFFFF",
              color: "#171717",
              borderWidth: 1,
              borderColor: "#E2E2E2",
            },
          ]}
        >
          Quick Order
        </Button>

        <Button
          style={[
            styles.footerBtn,
            { backgroundColor: "#282828", color: "#EDEDED" },
          ]}
        >
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
};
