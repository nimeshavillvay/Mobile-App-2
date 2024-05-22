"use client";

import AddToShoppingListDialog from "@/(old-design)/myaccount/shopping-lists/add-to-shopping-list-dialog";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
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
import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";

type ProductProps = {
  orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  product: {
    groupName: string;
    groupImage: string;
    variants: {
      id: string;
      slug: string;
      sku: string;
      title: string;
      image: string;
      uom: string;
      isFavourite: boolean;
      favoriteIds: string[];
    }[];
  };
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
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);
  const [isFavourite, setIsFavourite] = useState(
    product.variants[0]?.isFavourite ?? false,
  );

  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

  const defaultVariant = product.variants[0];
  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedId,
  );

  let href = "";
  let image = product.groupImage;
  if (
    (product.variants.length === 1 ||
      (product.variants.length > 1 && !selectedVariant)) &&
    defaultVariant
  ) {
    // If there is only one variant or if there are multiple variants and
    // none of them have been selected
    href = `/product/${defaultVariant.id}/${defaultVariant.slug}`;
    image = defaultVariant.image;
  } else if (selectedVariant) {
    href = `/product/${selectedVariant.id}/${selectedVariant.slug}`;
    image = selectedVariant.image;
  }

  let id = "";
  let sku = "";
  let uom = "";
  if (selectedVariant) {
    id = selectedVariant.id;
    sku = selectedVariant.sku;
    uom = selectedVariant.uom;
  } else if (defaultVariant) {
    id = defaultVariant.id;
    sku = defaultVariant.sku;
    uom = defaultVariant.uom;
  }

  let title = "";
  let favoriteIds: string[] = [];

  if (product.variants.length === 1 && defaultVariant) {
    // If there is just one variant, use its title
    title = defaultVariant.title;
    favoriteIds = defaultVariant.favoriteIds;
  } else if (product.variants.length > 1) {
    if (selectedVariant) {
      // If there are multiple variants and one of them has been selected, use its title
      title = selectedVariant.title;
    } else {
      // If there are multiple variants and none of them have been selected, use the group name
      title = product.groupName;
    }
  }

  const priceCheckQuery = useSuspensePriceCheck(token, [
    {
      productId: parseInt(id),
      qty: 1,
    },
  ]);

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

        {product.variants.length > 1 ? (
          <ProductCardVariantSelector
            href={href}
            value={selectedId}
            onValueChange={setSelectedId}
            variants={product.variants.map((variant) => ({
              value: variant.id,
              title: variant.title,
            }))}
            addToCart={addToCart}
            isFavourite={isFavourite}
            onClickShoppingList={() => {
              isLoggedInUser
                ? setShowShoppingListsDialog(true)
                : router.push("/sign-in");
            }}
          />
        ) : (
          <>
            <ProductCardPrice
              price={currentPrice}
              uom={uom}
              actualPrice={previousPrice}
            />

            <ProductCardActions
              addToCart={addToCart}
              isFavourite={isFavourite}
              onClickShoppingList={() => {
                isLoggedInUser
                  ? setShowShoppingListsDialog(true)
                  : router.push("/sign-in");
              }}
            />

            {isLoggedInUser && (
              <AddToShoppingListDialog
                open={showShoppingListsDialog}
                setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
                productId={parseInt(id)}
                favoriteIds={favoriteIds}
                setUpdatedIsFavorite={(isFavourite) => {
                  setIsFavourite(isFavourite);
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
