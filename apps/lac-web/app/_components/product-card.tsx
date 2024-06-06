"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Product } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import {
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardVariantSelector,
} from "@repo/web-ui/components/product-card";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Suspense, useState, type ComponentProps } from "react";
import ProductCardActionsForLoggedIn from "./product-card-actions-for-logged-in";
import ProductCardVariantSelectorForLoggedIn from "./product-card-variant-selector-for-logged-in";
import ProductCardVariantSelectorSkeleton from "./product-card-variant-selector-skeleton";
import SaleBadges from "./sale-badges";

type ProductProps = {
  readonly orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  readonly product: Product;
  readonly token: string;
  readonly stretchWidth?: boolean;
};

const ProductCard = ({
  orientation,
  product,
  token,
  stretchWidth = false,
}: ProductProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

  const defaultVariant = product.variants[0];
  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedId,
  );

  // Get Product Details
  let href = "";
  let image = "";
  if (
    (product.variants.length === 1 ||
      (product.variants.length > 1 && !selectedVariant)) &&
    defaultVariant
  ) {
    href = `/product/${defaultVariant.id}/${defaultVariant.slug}`;
    image = defaultVariant.image;
  } else if (selectedVariant) {
    href = `/product/${selectedVariant.id}/${selectedVariant.slug}`;
    image = selectedVariant.image;
  }

  // Get Variant Data
  let id = "";
  let sku = "";
  let uom = "";
  let onSale = false;
  let isNewItem = false;
  if (selectedVariant) {
    id = selectedVariant.id;
    sku = selectedVariant.sku;
    uom = selectedVariant.uom;
    onSale = selectedVariant.onSale ?? false;
    isNewItem = selectedVariant.isNewItem ?? false;
  } else if (defaultVariant) {
    id = defaultVariant.id;
    sku = defaultVariant.sku;
    uom = defaultVariant.uom;
    onSale = defaultVariant.onSale ?? false;
    isNewItem = defaultVariant.isNewItem ?? false;
  }

  // Get Product Title
  let title = "";
  if (product.variants.length === 1 && defaultVariant) {
    title = defaultVariant.title;
  }
  if (product.variants.length > 1) {
    if (selectedVariant) {
      title = selectedVariant.title;
    } else {
      title = product.groupName;
    }
  }

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

  return (
    <ProductCardRoot
      orientation={orientation}
      className={cn(
        "shrink-0 snap-start",
        orientation === "horizontal" ? "w-full" : "min-h-[25.75rem]",
        stretchWidth && "md:w-full",
      )}
    >
      <ProductCardHero>
        {discountPercent > 0 && (
          <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
        )}

        <SaleBadges onSale={onSale} isNewItem={isNewItem} />

        <ProductCardImage
          src={image}
          alt="A placeholder product"
          href={href}
          title={title}
        />
      </ProductCardHero>

      <ProductCardContent>
        <ProductCardDetails title={title} sku={sku} href={href} />

        <div className="flex flex-col gap-2">
          <ProductCardPrice
            price={currentPrice}
            uom={uom}
            actualPrice={listPrice}
          />

          {product.variants.length > 1 ? (
            isLoggedInUser ? (
              <Suspense fallback={<ProductCardVariantSelectorSkeleton />}>
                <ProductCardVariantSelectorForLoggedIn
                  productVariantId={id}
                  href={href}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  variants={product.variants}
                  addToCart={addToCart}
                  token={token}
                />
              </Suspense>
            ) : (
              <ProductCardVariantSelector
                href={href}
                value={selectedId}
                onValueChange={setSelectedId}
                variants={product.variants.map((variant) => ({
                  value: variant.id,
                  title: variant.title,
                }))}
                addToCart={addToCart}
                isFavorite={false}
                onClickShoppingList={() => {
                  router.push("/sign-in");
                }}
              />
            )
          ) : isLoggedInUser ? (
            <Suspense fallback={<Skeleton className="h-5 w-full" />}>
              <ProductCardActionsForLoggedIn
                token={token}
                productVariantId={id}
                addToCart={addToCart}
              />
            </Suspense>
          ) : (
            <ProductCardActions
              addToCart={addToCart}
              isFavorite={false}
              onClickShoppingList={() => {
                router.push("/sign-in");
              }}
            />
          )}
        </div>
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;
