"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import {
  getProductDetails,
  getProductTitle,
  getVariantData,
} from "@/_lib/client-helpers";
import { Product } from "@/_lib/types";
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

type ProductProps = {
  orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  product: Product;
  token: string;
  stretchWidth?: boolean;
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

  const { href, image } = getProductDetails(product.variants, selectedVariant);

  const { id, sku, uom } = selectedVariant
    ? getVariantData(selectedVariant)
    : getVariantData(defaultVariant);

  const title = getProductTitle(product, selectedVariant);

  const priceCheckQuery = useSuspensePriceCheck(token, [
    {
      productId: parseInt(id),
      qty: 1,
    },
  ]);
  const priceData = priceCheckQuery.data.productPrices[0];

  let listPrice = 0;
  let currentPrice = 0;
  let discountPercent = 0;

  if (priceData) {
    listPrice = priceData.listPrice;
    currentPrice = priceData?.uomPrice ?? priceData?.price;
  }

  if (currentPrice !== listPrice) {
    discountPercent = Math.floor(
      ((listPrice - currentPrice) / listPrice) * 100,
    );
  }

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
        orientation === "horizontal" && "w-full",
        stretchWidth && "md:w-full",
      )}
    >
      <ProductCardHero>
        {discountPercent > 0 && (
          <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
        )}

        <ProductCardImage
          src={image}
          alt="A placeholder product"
          href={href}
          title={title}
        />
      </ProductCardHero>

      <ProductCardContent>
        <ProductCardDetails title={title} sku={sku} href={href} />

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
              isFavourite={false}
              onClickShoppingList={() => {
                router.push("/sign-in");
              }}
            />
          )
        ) : (
          <>
            {isLoggedInUser ? (
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
                isFavourite={false}
                onClickShoppingList={() => {
                  router.push("/sign-in");
                }}
              />
            )}
          </>
        )}
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;
