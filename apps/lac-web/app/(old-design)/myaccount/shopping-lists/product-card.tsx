"use client";

import SaleBadges from "@/_components/sale-badges";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn, getBoolean } from "@/_lib/utils";
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
  readonly orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  readonly token: string;
  readonly product: ShoppingListItemsElement;
  readonly listId: string;
  readonly stretchWidth?: boolean;
};

const ProductCard = ({
  orientation,
  token,
  product,
  listId,
  stretchWidth = false,
}: ProductProps) => {
  const id = product.productId;
  const title = product.itemName;
  const image = product.img;
  const sku = product.txtWurthLacItem;
  const uom = product.txtUom;
  const onSale = getBoolean(product.onSale);
  const isNewItem = getBoolean(product.isNewItem);
  const href = `/product/${product.productId}/${product.slug}`;

  const removeShoppingListItemMutation = useRemoveShoppingListItemMutation();

  const priceCheckQuery = useSuspensePriceCheck(token, [
    {
      productId: parseInt(id),
      qty: 1,
    },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];

  let listPrice = 0;
  let currentPrice = 0;

  if (priceData) {
    listPrice = priceData.listPrice;
    currentPrice = priceData?.uomPrice ?? priceData?.price;
  }

  const discountPercent = Math.round(
    ((listPrice - currentPrice) / listPrice) * 100,
  );

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
      className={cn(
        "shrink-0 snap-start",
        orientation === "horizontal" && "w-full",
        stretchWidth && "md:w-full",
      )}
    >
      <ProductCardHero>
        {discountPercent > 0 && (
          <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
        )}

        {orientation === "vertical" && (
          <SaleBadges onSale={onSale} isNewItem={isNewItem} />
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
        {orientation === "horizontal" && (
          <div>
            <SaleBadges onSale={onSale} isNewItem={isNewItem} />
          </div>
        )}

        {!!sku && !!title && (
          <ProductCardDetails title={title} sku={sku} href={href} />
        )}

        <>
          {!!uom && (
            <ProductCardPrice
              price={currentPrice}
              uom={uom}
              actualPrice={listPrice}
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
  readonly addToCart: () => void;
  readonly removeFromShoppingList: () => void;
  readonly disabled?: boolean;
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
