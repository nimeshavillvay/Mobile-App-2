"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn } from "@/_lib/utils";
import {
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
} from "@repo/web-ui/components/product-card";
import { Button } from "@repo/web-ui/components/ui/button";
import { type ComponentProps } from "react";
import { MdOutlineDelete } from "react-icons/md";
import type { ShoppingListItemsElement } from "./type";
import useRemoveShoppingListItemMutation from "./use-remove-shopping-list-item-mutation.hook";

type ProductProps = {
  orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  token: string;
  product: ShoppingListItemsElement;
  listId: string;
};

const ProductCard = ({ orientation, token, product, listId }: ProductProps) => {
  const id = product.productId;
  const title = product.itemName;
  const image = product.img;
  const sku = product.txtWurthLacItem;
  const uom = product.txtUom;
  const href = `/product/${product.productId}/${product.slug}`;

  const priceCheckQuery = useSuspensePriceCheck(token, [
    {
      productId: parseInt(id),
      qty: 1,
    },
  ]);

  const removeShoppingListItemMutation = useRemoveShoppingListItemMutation();

  let currentPrice = 0;
  let previousPrice = 0;
  let discountPercent = 0;

  if (priceCheckQuery.data.productPrices[0]) {
    currentPrice = priceCheckQuery.data.productPrices[0].price;
    previousPrice = priceCheckQuery.data.productPrices[0].extendedPrice;
  }

  if (currentPrice !== previousPrice) {
    discountPercent = Math.floor(
      ((currentPrice - previousPrice) / previousPrice) * 100,
    );
  }

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const addToCart = () => {
    setProductId(parseInt(id));
    setOpen("verification");
  };

  const removeFromShoppingList = () => {
    removeShoppingListItemMutation.mutate({ listId, productId: id });
  };

  return (
    <ProductCardRoot
      orientation={orientation}
      className={cn(orientation === "vertical" && "h-[27rem]")}
    >
      <ProductCardHero>
        {discountPercent > 0 && (
          <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
        )}

        {!!image && !!title && (
          <ProductCardImage
            src={image}
            alt="A placeholder product"
            href={href}
            title={title}
          />
        )}
      </ProductCardHero>

      <ProductCardContent>
        {!!sku && !!title && (
          <ProductCardDetails title={title} sku={sku} href={href} />
        )}

        <>
          {!!uom && (
            <ProductCardPrice
              price={currentPrice}
              uom={uom}
              actualPrice={previousPrice}
            />
          )}

          <ShoppingListProductCardActions
            addToCart={addToCart}
            removeFromShoppingList={removeFromShoppingList}
          />
        </>
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;

const ShoppingListProductCardActions = ({
  addToCart,
  removeFromShoppingList,
  disabled = false,
}: {
  addToCart: () => void;
  removeFromShoppingList: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="mt-auto flex flex-row items-center gap-1 md:gap-2">
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Add to favorites"
        onClick={removeFromShoppingList}
        disabled={disabled}
      >
        <MdOutlineDelete className="size-4 fill-black" />
      </Button>

      <Button
        className="h-10 max-h-full flex-1 px-4 text-[0.875rem] leading-5"
        onClick={addToCart}
        disabled={disabled}
      >
        Add to cart
      </Button>
    </div>
  );
};