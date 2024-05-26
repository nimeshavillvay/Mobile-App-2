import useDeleteCartItemMutation from "@/_hooks/cart/use-delete-cart-item-mutation.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type {
  CartConfiguration,
  CartItemConfiguration,
  Plant,
} from "@/_lib/types";
import { formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "@repo/web-ui/components/icons/save";
import { Trash } from "@repo/web-ui/components/icons/trash";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import Image from "next/image";
import { Suspense, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACK_ORDER_ALL,
  EMPTY_STRING,
  MAIN_OPTIONS,
  NOT_IN_STOCK,
  TAKE_ON_HAND,
} from "../constants";
import CartItemShippingMethod from "./cart-item-shipping-method";
import FavoriteButton from "./favorite-button";
import FavoriteButtonSkeleton from "./favorite-button-skeleton";
import {
  createCartItemConfig,
  findAvailabilityOptionForType,
  getAlternativeBranchesConfig,
} from "./helpers";
import type { MainOption } from "./types";

const cartItemSchema = z.object({
  quantity: z.number(),
  po: z.string().optional(),
});

type CartItemProps = {
  token: string;
  product: {
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
  };
  plants: Plant[];
  cartConfiguration: CartConfiguration;
  willCallPlant: { plant: string };
};

const CartItem = ({
  token,
  product,
  plants,
  cartConfiguration,
  willCallPlant,
}: CartItemProps) => {
  const id = useId();
  const quantityId = `quantity-${id}`;
  const poId = `po-${id}`;

  const itemConfigHash = product?.configuration?.hashvalue;

  const [selectedWillCallPlant, setSelectedWillCallPlant] = useState(() => {
    if (willCallPlant?.plant) {
      return willCallPlant.plant;
    }
    return plants?.at(0)?.code ?? "";
  });

  const [selectedShippingOption, setSelectedShippingOption] =
    useState<MainOption>();

  const { register, getValues, watch } = useForm<
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

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: product.id, qty: delayedQuantity },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId: product.id,
    qty: delayedQuantity,
    plant: selectedWillCallPlant !== "" ? selectedWillCallPlant : undefined,
  });

  const { options, status, availableLocations, willCallAnywhere } =
    checkAvailabilityQuery.data;
  const firstLocation = availableLocations[0];
  const isNotInStock = status === NOT_IN_STOCK;

  const handleSave = (config?: Partial<CartItemConfiguration>) => {
    const data = getValues();

    updateCartConfigMutation.mutate([
      {
        cartItemId: product.cartItemId,
        quantity: Number(data.quantity),
        config: {
          ...product.configuration,
          poOrJobName: data.po,
          ...config,
        },
      },
    ]);
  };

  const handleDeleteCartItem = () => {
    deleteCartItemMutation.mutate({
      products: [{ cartid: product.cartItemId }],
    });
  };

  // TODO - Need to optimize this logic based on priority to set the default option
  const setDefaultOptionByPriority = () => {
    const availableAll = findAvailabilityOptionForType(options, AVAILABLE_ALL);
    const takeOnHand = findAvailabilityOptionForType(options, TAKE_ON_HAND);
    const backOrderAll = findAvailabilityOptionForType(options, BACK_ORDER_ALL);
    const shipAlternativeBranch = findAvailabilityOptionForType(
      options,
      ALTERNATIVE_BRANCHES,
    );

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
        }),
      );
    }
  };

  // TODO - Will remove useEffect hook once we found a better solution.
  // keeping this for now to unblock QAs
  useEffect(() => {
    if (options?.length > 0) {
      const matchedOption = options.find(
        (option) => option.hash === itemConfigHash,
      );

      // Check if matched option exists
      if (matchedOption) {
        if (
          [AVAILABLE_ALL, TAKE_ON_HAND, ALTERNATIVE_BRANCHES].includes(
            matchedOption.type,
          )
        ) {
          setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
        } else if (matchedOption.type === BACK_ORDER_ALL) {
          setSelectedShippingOption(MAIN_OPTIONS.BACK_ORDER);
        }
      } else {
        // Check if hash matches with the will call hash
        if (willCallAnywhere?.hash === itemConfigHash) {
          setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
        } else {
          // Update the cart config with default option based on the priority
          setDefaultOptionByPriority();
        }
      }
    }
  }, [options, itemConfigHash, willCallAnywhere]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-row items-start gap-3 md:flex-1">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 md:w-[7.5rem]">
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

          <div className="flex flex-col gap-1 md:hidden">
            <Suspense fallback={<FavoriteButtonSkeleton display="mobile" />}>
              <FavoriteButton
                display="mobile"
                productId={product.id}
                token={token}
              />
            </Suspense>

            <Button variant="subtle" className="w-full">
              <Save className="size-4" />

              <span className="sr-only">Save</span>
            </Button>

            <Button
              variant="subtle"
              className="w-full bg-red-50 hover:bg-red-100"
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

            <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
              ${formatNumberToPrice(priceData?.listPrice)}/
              {priceData?.priceUnit}
            </div>
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
            <div>
              <Label htmlFor={quantityId} className="sr-only">
                Quantity
              </Label>

              <Input
                {...register("quantity", {
                  onBlur: handleSave,
                  disabled: checkAvailabilityQuery.isPending,
                })}
                id={quantityId}
                type="number"
                className="h-fit rounded px-2.5 py-1 text-base md:w-24"
                required
                min={product.minAmount}
                step={product.increment}
              />
            </div>

            {!isNotInStock && (
              <div className="text-sm text-wurth-gray-800">
                <span className="text-yellow-700">
                  Only {firstLocation?.amount} in stock
                </span>
                &nbsp;at&nbsp;{firstLocation?.name}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Label htmlFor={poId} className="sr-only">
              PO #/ Job Name
            </Label>

            <Input
              {...register("po", { onBlur: handleSave })}
              id={poId}
              type="text"
              placeholder="PO #/ Job Name"
              className="h-fit rounded px-2.5 py-1 text-base"
            />
          </div>
        </form>
      </div>

      <div className="md:w-80">
        <CartItemShippingMethod
          plants={plants}
          availability={checkAvailabilityQuery.data}
          setSelectedWillCallPlant={setSelectedWillCallPlant}
          selectedWillCallPlant={selectedWillCallPlant}
          setSelectedShippingOption={setSelectedShippingOption}
          selectedShippingOption={selectedShippingOption}
          onSave={handleSave}
          cartConfiguration={cartConfiguration}
        />
      </div>

      <div className="hidden space-y-3 md:block md:shrink-0">
        <div className="flex flex-col items-end text-right">
          <div className="text-lg text-green-700">
            ${formatNumberToPrice(priceData?.extendedPrice)}
          </div>

          <div className="ml-2 text-sm font-medium text-wurth-gray-500">
            ${formatNumberToPrice(priceData?.price)}/{priceData?.priceUnit}
          </div>

          <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
            ${formatNumberToPrice(priceData?.listPrice)}/{priceData?.priceUnit}
          </div>
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

          <Button
            variant="ghost"
            className="h-fit w-full justify-end px-0 py-0"
            disabled={true}
          >
            <span className="text-[13px] leading-5">Save for later</span>

            <Save className="size-4" />
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
