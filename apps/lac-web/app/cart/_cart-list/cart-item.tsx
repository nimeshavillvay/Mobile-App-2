import productItemImage from "@/_assets/images/product-item-image.png";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type {
  CartItemConfiguration,
  Plant,
  ShippingMethod,
} from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "@repo/web-ui/components/icons/save";
import { Trash } from "@repo/web-ui/components/icons/trash";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import Image from "next/image";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import CartItemShippingMethod from "./cart-item-shipping-method";
import FavoriteButton from "./favorite-button";

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
    isFavourite: boolean;
    favoriteIds: string[];
  };
  shippingMethods: ShippingMethod[];
  plants: Plant[];
};

const CartItem = ({
  token,
  product,
  shippingMethods,
  plants,
}: CartItemProps) => {
  const id = useId();
  const quantityId = `quantity-${id}`;
  const poId = `po-${id}`;

  const [selectedWillCallPlant, setSelectedWillCallPlant] = useState("");

  const priceCheckQuery = useSuspensePriceCheck("token", [
    { productId: product.id, qty: product.quantity },
  ]);

  const price = priceCheckQuery.data.productPrices[0];

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

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId: product.id,
    qty: Number(quantity),
    plant: selectedWillCallPlant !== "" ? selectedWillCallPlant : undefined,
  });

  const updateCartConfigMutation = useUpdateCartItemMutation();

  const handleSave = () => {
    const data = getValues();

    updateCartConfigMutation.mutate([
      {
        productId: product.id,
        quantity: data.quantity,
        config: {
          ...product.configuration,
          poOrJobName: data.po,
        },
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-row items-start gap-3 md:flex-1">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 md:w-[7.5rem]">
          <Image
            src={productItemImage}
            alt={`A picture of ${product.title}`}
            width={120}
            height={120}
            className="size-[4.5rem] rounded border border-wurth-gray-250 object-contain shadow-sm md:size-[7.5rem]"
          />

          <div className="flex flex-col gap-1 md:hidden">
            <FavoriteButton
              display="mobile"
              productId={product.id}
              isFavourite={product.isFavourite}
              favoriteIds={product.favoriteIds}
            />

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
              ${price?.extendedPrice}
            </div>

            <div className="ml-2 text-sm font-medium text-wurth-gray-500">
              $34.11/{price?.priceUnit}
            </div>

            <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
              $38.11/{price?.priceUnit}
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
                })}
                id={quantityId}
                type="number"
                className="h-fit rounded px-2.5 py-1 text-base md:w-24"
                required
                min={product.minAmount}
                step={product.increment}
              />
            </div>

            <div className="text-sm text-wurth-gray-800">
              <span className="text-yellow-700">Only 150 in stock</span> at
              Brea, CA
            </div>
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
          display="desktop"
          shippingMethods={shippingMethods}
          plants={plants}
          availability={checkAvailabilityQuery.data}
          setSelectedWillCallPlant={setSelectedWillCallPlant}
          selectedWillCallPlant={selectedWillCallPlant}
        />
      </div>

      <div className="hidden space-y-3 md:block md:shrink-0">
        <div className="flex flex-col items-end text-right">
          <div className="text-lg text-green-700">${price?.extendedPrice}</div>

          <div className="ml-2 text-sm font-medium text-wurth-gray-500">
            $34.11/{price?.priceUnit}
          </div>

          <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
            $38.11/{price?.priceUnit}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="h-fit w-full justify-end px-0 py-0 text-wurth-red-650"
          >
            <span className="text-[13px] leading-5">Delete</span>

            <Trash className="size-4 fill-wurth-red-650" />
          </Button>

          <Button
            variant="ghost"
            className="h-fit w-full justify-end px-0 py-0"
          >
            <span className="text-[13px] leading-5">Save for later</span>

            <Save className="size-4" />
          </Button>

          <FavoriteButton
            productId={product.id}
            isFavourite={product.isFavourite}
            favoriteIds={product.favoriteIds}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
