import productItemImage from "@/_assets/images/product-item-image.png";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { CartItemConfiguration } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Save } from "@repo/web-ui/components/icons/save";
import { Trash } from "@repo/web-ui/components/icons/trash";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import Image from "next/image";
import { useId } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import { ShippingMethod } from "../types";
import useUpdateCartConfigMutation from "./use-update-cart-item-mutation.hook";

const cartItemSchema = z.object({
  quantity: z.number(),
  po: z.string().optional(),
});

type CartItemProps = {
  product: {
    id: number;
    title: string;
    sku: string;
    manufacturerId: string;
    quantity: number;
    configuration: CartItemConfiguration;
    minAmount: number;
    increment: number;
  };
  shippingMethods: ShippingMethod[];
};

const CartItem = ({ product }: CartItemProps) => {
  const id = useId();
  const quantityId = `quantity-${id}`;
  const poId = `po-${id}`;

  const priceCheckQuery = useSuspensePriceCheck("token", [
    { productId: product.id, qty: product.quantity },
  ]);

  const price = priceCheckQuery.data.productPrices[0];

  const { register, getValues } = useForm<z.infer<typeof cartItemSchema>>({
    resolver: zodResolver(cartItemSchema),
    values: {
      quantity: product.quantity,
      po: product.configuration.poOrJobName ?? "",
    },
  });

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const handleSave = () => {
    const data = getValues();

    updateCartConfigMutation.mutate({
      productId: product.id,
      quantity: data.quantity,
      config: {
        ...product.configuration,
        poOrJobName: data.po,
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-row items-start gap-3">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2">
          <Image
            src={productItemImage}
            alt={`A picture of ${product.title}`}
            width={72}
            height={72}
            className="rounded border border-wurth-gray-250 object-contain shadow-sm"
          />

          <div className="flex flex-col gap-1">
            <Button variant="subtle" className="w-full">
              <HeartOutline className="size-4" />

              <span className="sr-only">Add to favorites</span>
            </Button>

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

        <form className="flex-1 space-y-2">
          <div className="flex flex-row items-center">
            <div className="text-green-700 text-lg">
              ${price?.extendedPrice}
            </div>

            <div className="text-wurth-gray-500 text-sm font-medium ml-2">
              $34.11/{price?.priceUnit}
            </div>

            <div className="line-through text-wurth-gray-500 text-[13px] leading-5 ml-1">
              $38.11/{price?.priceUnit}
            </div>
          </div>

          <h2 className="text-black text-sm font-medium line-clamp-3">
            <Balancer>{product.title}</Balancer>
          </h2>

          <div className="flex flex-row gap-1 text-wurth-gray-500 text-sm">
            <div>Item # {product.sku}</div>

            <div>&#x2022;</div>

            <div>Mfr # {product.manufacturerId}</div>
          </div>

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
              className="rounded px-2.5 py-1 h-fit text-base"
              required
              min={product.minAmount}
              step={product.increment}
            />
          </div>

          <div className="text-wurth-gray-800 text-sm">
            <span className="text-yellow-700">Only 150 in stock</span> at Brea,
            CA
          </div>

          <div>
            <Label htmlFor={poId} className="sr-only">
              PO #/ Job Name
            </Label>

            <Input
              {...register("po", { onBlur: handleSave })}
              id={poId}
              type="text"
              placeholder="PO #/ Job Name"
              className="rounded px-2.5 py-1 h-fit text-base"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartItem;
