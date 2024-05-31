import QuantityInputField from "@/_components/quantity-input-field";
import useDeleteCartItemMutation from "@/_hooks/cart/use-delete-cart-item-mutation.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type {
  CartConfiguration,
  CartItemConfiguration,
  Plant,
} from "@/_lib/types";
import { formatNumberToPrice } from "@/_lib/utils";
import { NUMBER_TYPE } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@repo/web-ui/components/icons/alert";
import { Trash } from "@repo/web-ui/components/icons/trash";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACK_ORDER_ALL,
  DEFAULT_PLANT,
  EMPTY_STRING,
  IN_STOCK,
  LIMITED_STOCK,
  MAIN_OPTIONS,
  NOT_IN_STOCK,
  TAKE_ON_HAND,
} from "../constants";
import FavoriteButton from "./favorite-button";
import FavoriteButtonSkeleton from "./favorite-button-skeleton";
import {
  createCartItemConfig,
  findAvailabilityOptionForType,
  getAlternativeBranchesConfig,
  getShippingMethods,
} from "./helpers";
import PlantName from "./plant-name";
import RegionalExclusionAndShippingMethods from "./regional-exclusion-and-shipping-methods";
import type { MainOption, ShipToMeOption } from "./types";
import useCheckAvailabilityMutation from "./use-check-availability-mutation.hook";

const cartItemSchema = z.object({
  quantity: NUMBER_TYPE,
  po: z.string().optional(),
});

type CartItemProps = {
  readonly token: string;
  readonly product: {
    id: number;
    title: string;
    sku: string;
    manufacturerId: string;
    quantity: number;
    configuration: CartItemConfiguration;
    minAmount: number;
    increment: number;
    image: string;
    cartItemId: number;
    slug: string;
    isExcludedProduct: boolean;
  };
  readonly plants: Plant[];
  readonly cartConfiguration: CartConfiguration;
  readonly willCallPlant: { plantCode: string };
};

const CartItem = ({
  token,
  product,
  plants,
  cartConfiguration,
  willCallPlant,
}: CartItemProps) => {
  const id = useId();
  const poId = `po-${id}`;

  const itemConfigHash = product?.configuration?.hashvalue;
  const itemConfigShippingMethod = product?.configuration?.shipping_method_1;

  const checkLoginQuery = useSuspenseCheckLogin(token);

  const [selectedWillCallPlant, setSelectedWillCallPlant] = useState(() => {
    if (willCallPlant?.plantCode) {
      return willCallPlant.plantCode;
    }
    return plants?.at(0)?.code ?? "";
  });

  const [selectedShippingOption, setSelectedShippingOption] =
    useState<MainOption>();

  const { register, getValues, watch, control } = useForm<
    z.infer<typeof cartItemSchema>
  >({
    resolver: zodResolver(cartItemSchema),
    values: {
      quantity: product.quantity,
      po: product.configuration.poOrJobName ?? "",
    },
  });

  const quantity = watch("quantity");
  const delayedQuantity = useDebouncedState(quantity);

  const updateCartConfigMutation = useUpdateCartItemMutation(token);
  const deleteCartItemMutation = useDeleteCartItemMutation(token);
  const checkAvailabilityMutation = useCheckAvailabilityMutation(token);

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: product.id, qty: delayedQuantity },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId: product.id,
    qty: Number(delayedQuantity ?? product.quantity),
    plant: selectedWillCallPlant !== "" ? selectedWillCallPlant : undefined,
  });

  const {
    options: availabilityOptions,
    status,
    availableLocations,
    willCallAnywhere,
    xplant,
  } = checkAvailabilityQuery.data;

  const firstLocation = availableLocations.at(0);

  const isNotInStock = status === NOT_IN_STOCK;
  const isLimitedStock = status === LIMITED_STOCK;
  const isInStock = status === IN_STOCK;

  const willCallHash = willCallAnywhere?.hash;

  const availableAll = findAvailabilityOptionForType(
    availabilityOptions,
    AVAILABLE_ALL,
  );
  const takeOnHand = findAvailabilityOptionForType(
    availabilityOptions,
    TAKE_ON_HAND,
  );
  const backOrderAll = findAvailabilityOptionForType(
    availabilityOptions,
    BACK_ORDER_ALL,
  );
  const shipAlternativeBranch = findAvailabilityOptionForType(
    availabilityOptions,
    ALTERNATIVE_BRANCHES,
  );

  // Select the available shipping options based on the priority
  const AVAILABLE_OPTIONS_MAP = {
    [AVAILABLE_ALL]: availableAll,
    [TAKE_ON_HAND]: takeOnHand,
    [ALTERNATIVE_BRANCHES]: shipAlternativeBranch,
  };

  const [selectedShipToMe, setSelectedShipToMe] = useState<ShipToMeOption>(
    () => {
      // State initialization based on availability options
      if (availableAll) {
        return AVAILABLE_ALL;
      } else if (takeOnHand) {
        return TAKE_ON_HAND;
      } else if (shipAlternativeBranch) {
        return ALTERNATIVE_BRANCHES;
      }
      // Return a default value here if none of the conditions match
      return undefined;
    },
  );

  // use the new function to determine the available options
  const shippingMethods = getShippingMethods(
    selectedShipToMe,
    AVAILABLE_OPTIONS_MAP,
  );

  // Find the default option (available first option)
  let defaultShippingMethod = shippingMethods?.at(0);

  if (shippingMethods?.length > 0 && cartConfiguration?.default_shipping) {
    const shipToDefaultShippingMethod = shippingMethods.find(
      (method) => method?.code === cartConfiguration.default_shipping,
    );
    if (shipToDefaultShippingMethod) {
      defaultShippingMethod = shipToDefaultShippingMethod;
    } else {
      shippingMethods.at(0);
    }
  }

  // User selected shipping method (ship-to-me)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    defaultShippingMethod?.code ?? "",
  );

  const handleChangeQtyOrPO = () => {
    checkAvailabilityMutation.mutate(
      {
        productId: product.id,
        qty: delayedQuantity,
      },
      {
        onSuccess: ({ options }) => {
          if (options.length > 0) {
            const availableAll = findAvailabilityOptionForType(
              options,
              AVAILABLE_ALL,
            );
            const takeOnHand = findAvailabilityOptionForType(
              options,
              TAKE_ON_HAND,
            );
            const shipAlternativeBranch = findAvailabilityOptionForType(
              options,
              ALTERNATIVE_BRANCHES,
            );
            const backOrderAll = findAvailabilityOptionForType(
              options,
              BACK_ORDER_ALL,
            );
            if (availableAll) {
              setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
              setSelectedShipToMe(AVAILABLE_ALL);
              handleSave(
                createCartItemConfig({
                  method:
                    availableAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
                    EMPTY_STRING,
                  quantity: availableAll.plants?.at(0)?.quantity ?? 0,
                  plant: availableAll.plants?.at(0)?.plant ?? EMPTY_STRING,
                  hash: availableAll.hash,
                }),
              );
            } else if (takeOnHand) {
              setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
              setSelectedShipToMe(TAKE_ON_HAND);
              handleSave(
                createCartItemConfig({
                  method:
                    takeOnHand.plants?.at(0)?.shippingMethods?.at(0)?.code ??
                    EMPTY_STRING,
                  quantity: takeOnHand.plants?.at(0)?.quantity ?? 0,
                  plant: takeOnHand.plants?.at(0)?.plant ?? EMPTY_STRING,
                  hash: takeOnHand.hash,
                  backOrderDate: takeOnHand.plants?.at(0)?.backOrderDate,
                  backOrderQuantity:
                    takeOnHand.plants?.at(0)?.backOrderQuantity,
                }),
              );
            } else if (shipAlternativeBranch) {
              setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
              setSelectedShipToMe(ALTERNATIVE_BRANCHES);
              handleSave(
                getAlternativeBranchesConfig({
                  plants: shipAlternativeBranch.plants,
                  method:
                    shipAlternativeBranch.plants?.at(0)?.shippingMethods?.at(0)
                      ?.code ?? EMPTY_STRING,
                  hash: shipAlternativeBranch.hash,
                  backOrderDate:
                    shipAlternativeBranch?.plants?.[0]?.backOrderDate,
                  backOrderQuantity:
                    shipAlternativeBranch?.plants?.[0]?.backOrderQuantity,
                }),
              );
            } else if (backOrderAll) {
              setSelectedShippingOption(MAIN_OPTIONS.BACK_ORDER);
              handleSave(
                createCartItemConfig({
                  method:
                    backOrderAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
                    EMPTY_STRING,
                  quantity: 0,
                  plant: backOrderAll.plants?.at(0)?.plant ?? EMPTY_STRING,
                  hash: backOrderAll.hash,
                  backOrderDate: backOrderAll.plants?.at(0)?.backOrderDate,
                  backOrderQuantity:
                    backOrderAll.plants?.at(0)?.backOrderQuantity,
                  backOrderAll: true,
                }),
              );
            }
          }
        },
      },
    );
  };

  const handleSave = (config?: Partial<CartItemConfiguration>) => {
    const data = getValues();

    updateCartConfigMutation.mutate([
      {
        cartItemId: product.cartItemId,
        quantity: Number(data.quantity),
        config: {
          ...product.configuration,
          ...config,
          poOrJobName: data.po,
        },
      },
    ]);
  };

  const handleDeleteCartItem = () => {
    deleteCartItemMutation.mutate({
      products: [{ cartid: product.cartItemId }],
    });
  };

  const handleSelectWillCallPlant = (plant: string) => {
    if (plant !== "") {
      setSelectedWillCallPlant(plant);

      checkAvailabilityMutation.mutate(
        {
          productId: product.id,
          qty: quantity,
          plant: plant,
        },
        {
          onSuccess: ({ willCallAnywhere }) => {
            if (willCallAnywhere && willCallAnywhere.status != "notInStock") {
              handleSave({
                ...createCartItemConfig({
                  method: "0",
                  quantity: willCallAnywhere?.willCallQuantity,
                  plant: willCallAnywhere?.willCallPlant,
                  hash: willCallAnywhere.hash,
                  backOrderDate: willCallAnywhere?.backOrderDate_1,
                  backOrderQuantity: willCallAnywhere?.backOrderQuantity_1,
                }),
                will_call_avail: (willCallAnywhere?.status === NOT_IN_STOCK
                  ? 0
                  : willCallAnywhere?.willCallQuantity ?? 0
                ).toString(),
                will_call_plant:
                  willCallAnywhere?.willCallPlant ?? EMPTY_STRING,
              });
            } else {
              handleSave({
                ...createCartItemConfig({
                  method: "0",
                  quantity: 0,
                  plant: willCallAnywhere.willCallPlant,
                  hash: willCallAnywhere.hash,
                  backOrderAll: true,
                  backOrderDate: willCallAnywhere?.willCallBackOrder,
                  backOrderQuantity: willCallAnywhere?.willCallQuantity,
                }),
              });
            }
          },
        },
      );
    }
  };

  // // TODO - Need to optimize this logic based on priority to set the default option
  const setDefaultsForCartConfig = () => {
    if (availableAll) {
      handleSave(
        createCartItemConfig({
          method:
            availableAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            EMPTY_STRING,
          quantity: availableAll.plants?.at(0)?.quantity ?? 0,
          plant: availableAll.plants?.at(0)?.plant ?? EMPTY_STRING,
          hash: availableAll.hash,
        }),
      );
    } else if (takeOnHand) {
      handleSave(
        createCartItemConfig({
          method:
            takeOnHand.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            EMPTY_STRING,
          quantity: takeOnHand.plants?.at(0)?.quantity ?? 0,
          plant: takeOnHand.plants?.at(0)?.plant ?? EMPTY_STRING,
          hash: takeOnHand.hash,
          backOrderDate: takeOnHand.plants?.at(0)?.backOrderDate,
          backOrderQuantity: takeOnHand.plants?.at(0)?.backOrderQuantity,
        }),
      );
    } else if (shipAlternativeBranch) {
      handleSave(
        getAlternativeBranchesConfig({
          plants: shipAlternativeBranch.plants,
          method:
            shipAlternativeBranch.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            EMPTY_STRING,
          hash: shipAlternativeBranch.hash,
          backOrderDate: shipAlternativeBranch?.plants?.[0]?.backOrderDate,
          backOrderQuantity:
            shipAlternativeBranch?.plants?.[0]?.backOrderQuantity,
        }),
      );
    } else if (backOrderAll) {
      handleSave(
        createCartItemConfig({
          method:
            backOrderAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            EMPTY_STRING,
          quantity: 0,
          plant: backOrderAll.plants?.at(0)?.plant ?? EMPTY_STRING,
          hash: backOrderAll.hash,
          backOrderDate: backOrderAll.plants?.at(0)?.backOrderDate,
          backOrderQuantity: backOrderAll.plants?.at(0)?.backOrderQuantity,
          backOrderAll: true,
        }),
      );
    }
  };

  const matchedAvailabilityOption = availabilityOptions.find(
    (option) => option.hash === itemConfigHash,
  );

  // TODO - Will remove useEffect hook once we found a better solution.
  // This is used as intermittent UI state which is much more complicated to be managed inside a mutation ATM
  useEffect(() => {
    // Check if matched availability option exists
    if (matchedAvailabilityOption) {
      if (matchedAvailabilityOption.type === AVAILABLE_ALL) {
        setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
        setSelectedShipToMe(AVAILABLE_ALL);
      } else if (matchedAvailabilityOption.type === TAKE_ON_HAND) {
        setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
        setSelectedShipToMe(TAKE_ON_HAND);
      } else if (matchedAvailabilityOption.type === ALTERNATIVE_BRANCHES) {
        setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
        setSelectedShipToMe(ALTERNATIVE_BRANCHES);
      } else if (matchedAvailabilityOption.type === BACK_ORDER_ALL) {
        setSelectedShippingOption(MAIN_OPTIONS.BACK_ORDER);
      }
      // Check if there is a selected shipping method
      if (itemConfigShippingMethod !== "") {
        setSelectedShippingMethod(itemConfigShippingMethod);
      }
    } else {
      // Check if hash matches with the will call hash
      if (willCallHash === itemConfigHash) {
        setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
        // setSelectedWillCallPlant(willCallAnywhere?.willCallPlant);
      } else {
        // Update the cart config with default option based on the priority
        // TODO - There is a mismatch in hashes when initial page load due to selectedWillCallPlant state reset to default
        setDefaultsForCartConfig();
      }
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    itemConfigShippingMethod,
    itemConfigHash,
    willCallHash,
    matchedAvailabilityOption,
  ]); // Disabling ESLint for the dependency array because it's exhaustive when including all relevant dependencies

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-row items-start gap-3 md:flex-1">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 md:w-[7.5rem]">
          <Link href={`/product/${product.id}/${product.slug}`}>
            {product.image !== "" ? (
              <Image
                src={product.image}
                alt={`A picture of ${product.title}`}
                width={120}
                height={120}
                className="size-[4.5rem] rounded border border-wurth-gray-250 object-contain shadow-sm md:size-[7.5rem]"
              />
            ) : (
              <WurthFullBlack
                width={120}
                height={120}
                className="border border-brand-gray-200 px-2"
              />
            )}
          </Link>

          <div className="flex flex-col gap-1 md:hidden">
            <Suspense fallback={<FavoriteButtonSkeleton display="mobile" />}>
              <FavoriteButton
                display="mobile"
                productId={product.id}
                token={token}
              />
            </Suspense>

            <Button
              variant="subtle"
              className="w-full bg-red-50 hover:bg-red-100"
              onClick={() => handleDeleteCartItem()}
              disabled={deleteCartItemMutation.isPending}
            >
              <Trash className="size-4 fill-wurth-red-650" />

              <span className="sr-only">Save</span>
            </Button>
          </div>
        </div>

        <form className="flex-1 space-y-2 md:space-y-1">
          <div className="flex flex-row items-center md:hidden">
            <div className="text-lg text-green-700">
              ${formatNumberToPrice(priceData?.extendedPrice)}
            </div>

            <div className="ml-2 text-sm font-medium text-wurth-gray-500">
              ${formatNumberToPrice(priceData?.price)}/{priceData?.priceUnit}
            </div>

            {priceData?.listPrice &&
              priceData?.price &&
              priceData?.listPrice > priceData?.price && (
                <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
                  ${formatNumberToPrice(priceData?.listPrice)}/
                  {priceData?.priceUnit}
                </div>
              )}
          </div>

          <h2 className="line-clamp-3 text-sm font-medium text-black">
            <Balancer>{product.title}</Balancer>
          </h2>

          <div className="flex flex-row gap-1 text-sm text-wurth-gray-500">
            <div>Item # {product.sku}</div>

            <div>&#x2022;</div>

            <div>Mfr # {product.manufacturerId}</div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Controller
              control={control}
              name="quantity"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <QuantityInputField
                  onBlur={onBlur}
                  onChange={(event) => {
                    if (
                      Number(event.target.value) >= product.minAmount &&
                      Number(event.target.value) % product.increment === 0
                    ) {
                      handleChangeQtyOrPO();
                    }

                    onChange(event);
                  }}
                  value={value}
                  ref={ref}
                  name={name}
                  removeDefaultStyles
                  className="h-fit rounded px-2.5 py-1 text-base md:w-24"
                  required
                  min={product.minAmount}
                  step={product.increment}
                  disabled={checkAvailabilityQuery.isPending}
                />
              )}
            />

            {isInStock && (
              <div className="text-sm text-wurth-gray-800">
                <span className="font-semibold text-green-700">
                  {firstLocation?.amount ?? 0} in stock
                </span>
                &nbsp;at&nbsp;{firstLocation?.name}
              </div>
            )}

            {isLimitedStock && (
              <div className="text-sm text-wurth-gray-800">
                <span className="font-semibold text-yellow-700">
                  Only {firstLocation?.amount ?? 0} in stock
                </span>
                &nbsp;at&nbsp;{firstLocation?.name}
              </div>
            )}

            {/* Set default plant when there is no will call plant */}
            {isNotInStock && (
              <div className="text-sm text-wurth-gray-800">
                <span className="font-semibold text-red-700">Out of stock</span>
                &nbsp;at&nbsp;
                <PlantName
                  plants={plants}
                  plantCode={xplant !== "" ? xplant : DEFAULT_PLANT}
                />
              </div>
            )}
          </div>

          <div className="pt-2">
            <Label htmlFor={poId} className="sr-only">
              PO #/ Job Name
            </Label>

            <Input
              {...register("po", {
                onChange: () => handleChangeQtyOrPO(),
                disabled: updateCartConfigMutation.isPending,
              })}
              id={poId}
              type="text"
              placeholder="PO #/ Job Name"
              className="h-fit rounded px-2.5 py-1 text-base"
            />
          </div>
        </form>
      </div>

      <div className="md:w-80">
        {checkLoginQuery.data.status_code === "NOT_LOGGED_IN" &&
          (product.isExcludedProduct ? (
            <div className="flex flex-row gap-2 rounded-lg bg-red-50 p-4">
              <Alert
                className="mt-1 shrink-0 stroke-wurth-red-650"
                width={16}
                height={16}
              />

              <div className="flex-1 space-y-1">
                <h4 className="text-base font-semibold text-wurth-red-650">
                  Not Available
                </h4>

                <div className="text-sm leading-6 text-wurth-gray-800">
                  This item is not available in certain regions. For better
                  experience please{" "}
                  <Link href="/sign-in">Sign in or register</Link>.
                </div>
              </div>
            </div>
          ) : (
            <RegionalExclusionAndShippingMethods
              token={token}
              productId={product.id}
              plants={plants}
              availability={checkAvailabilityQuery.data}
              setSelectedWillCallPlant={handleSelectWillCallPlant}
              selectedWillCallPlant={selectedWillCallPlant}
              setSelectedShippingOption={setSelectedShippingOption}
              selectedShippingOption={selectedShippingOption}
              setSelectedShipToMe={setSelectedShipToMe}
              selectedShipToMe={selectedShipToMe}
              setSelectedShippingMethod={setSelectedShippingMethod}
              selectedShippingMethod={selectedShippingMethod}
              onSave={handleSave}
              defaultShippingMethod={defaultShippingMethod}
              shippingMethods={shippingMethods}
            />
          ))}

        {checkLoginQuery.data.status_code === "OK" && (
          <Suspense>
            <RegionalExclusionAndShippingMethods
              token={token}
              productId={product.id}
              plants={plants}
              availability={checkAvailabilityQuery.data}
              setSelectedWillCallPlant={handleSelectWillCallPlant}
              selectedWillCallPlant={selectedWillCallPlant}
              setSelectedShippingOption={setSelectedShippingOption}
              selectedShippingOption={selectedShippingOption}
              setSelectedShipToMe={setSelectedShipToMe}
              selectedShipToMe={selectedShipToMe}
              setSelectedShippingMethod={setSelectedShippingMethod}
              selectedShippingMethod={selectedShippingMethod}
              onSave={handleSave}
              defaultShippingMethod={defaultShippingMethod}
              shippingMethods={shippingMethods}
            />
          </Suspense>
        )}
      </div>

      <div className="hidden space-y-3 md:block md:shrink-0">
        <div className="flex flex-col items-end text-right">
          <div className="text-lg text-green-700">
            ${formatNumberToPrice(priceData?.extendedPrice)}
          </div>

          <div className="ml-2 text-sm font-medium text-wurth-gray-500">
            ${formatNumberToPrice(priceData?.price)}/{priceData?.priceUnit}
          </div>

          {priceData?.listPrice &&
            priceData?.price &&
            priceData?.listPrice > priceData?.price && (
              <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
                ${formatNumberToPrice(priceData?.listPrice)}/
                {priceData?.priceUnit}
              </div>
            )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="h-fit w-full justify-end px-0 py-0 text-wurth-red-650"
            onClick={() => handleDeleteCartItem()}
            disabled={deleteCartItemMutation.isPending}
          >
            <span className="text-[13px] leading-5">Delete</span>

            <Trash className="size-4 fill-wurth-red-650" />
          </Button>

          <FavoriteButton
            display="desktop"
            productId={product.id}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
