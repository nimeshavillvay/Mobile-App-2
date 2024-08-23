"use client";
import { calculateDiscount, cn } from "@/_lib/utils";
import type { LiteProduct } from "@repo/shared-logic/models/product";
import { buttonVariants } from "@repo/web-ui/components/base/atoms/button";
import {
  ProductCardActions,
  ProductCardBadge,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardVariantSelector,
} from "@repo/web-ui/components/base/molecules/product-card";
import { Zap } from "@repo/web-ui/components/icons/zap";
import Link from "next/link";
import { useState, type ComponentProps } from "react";
import { AddToCartButton, CompareButton, FavoriteButton } from "./buttons";

type ProductCardProps = {
  readonly product: LiteProduct;
  readonly orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  readonly showFavorite?: boolean;
  readonly showCompare?: boolean;
  readonly showAddToCart?: boolean;
};

const ProductCard = ({
  product,
  orientation,
  showFavorite = false,
  showCompare = false,
  showAddToCart = true,
}: ProductCardProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const mainVariant = product.variants?.[0];

  const badges = [];
  if (product.metadata?.onSale) {
    badges.push({
      icon: (
        <Zap
          className="size-4 stroke-wurth-blue-450"
          data-testid="zap-icon-flash-deal"
        />
      ),
      text: "",
      productVariant: "sale" as const,
    });
  }
  if (product.metadata?.isNew) {
    badges.push({
      icon: "",
      text: "New",
      productVariant: "new" as const,
    });
  }
  const discount = mainVariant?.pricing
    ? calculateDiscount(mainVariant.pricing)
    : 0;

  return (
    <ProductCardRoot orientation={orientation}>
      <ProductCardHero>
        <div className="flex flex-row justify-between gap-2">
          {discount > 0 && (
            <ProductCardDiscount variant="primary">
              {discount}
            </ProductCardDiscount>
          )}
          {orientation != "horizontal" && (
            <div className="absolute right-0 top-0 flex flex-row justify-end gap-2">
              {badges.map((badge, index) => (
                <ProductCardBadge
                  key={index}
                  productVariant={badge.productVariant}
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </ProductCardBadge>
              ))}
            </div>
          )}
        </div>
        <ProductCardImage
          src={
            product.imageUrl ||
            mainVariant?.imageUrls?.[0] ||
            "https://via.placeholder.com/300x300"
          }
          alt={product.title}
          href={`/products/${product.handle}`}
          title={product.title}
        />
      </ProductCardHero>
      <ProductCardContent>
        {orientation === "horizontal" && (
          <div className="flex flex-row justify-end gap-2">
            {badges.map((badge, index) => (
              <ProductCardBadge
                key={index}
                productVariant={badge.productVariant}
              >
                {badge.icon}
                <span>{badge.text}</span>
              </ProductCardBadge>
            ))}
          </div>
        )}
        <ProductCardDetails
          title={product.title}
          sku={mainVariant?.sku || ""}
          href={`/products/${product.handle}`}
        />
        <ProductCardPrice
          price={mainVariant?.pricing.price || 0}
          uom={mainVariant?.pricing.uomPriceUnit || "ea"}
          actualPrice={mainVariant?.pricing.listPrice}
        />
        {product.variants && product.variants.length > 1 ? (
          <ProductCardVariantSelector
            href={`/products/${product.handle}`}
            variants={product.variants.map((variant) => ({
              value: variant.id,
              title: variant.title,
            }))}
            value={selectedId}
            onValueChange={(value) => setSelectedId(value)}
          >
            {selectedId ? (
              <ProductCardActions>
                {showAddToCart ? <AddToCartButton label="Add to Cart" /> : null}
                {showFavorite ? <FavoriteButton isFavorite /> : null}
                {showCompare ? <CompareButton isCompared /> : null}
              </ProductCardActions>
            ) : (
              <Link
                href={`/products/${product.handle}`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-10 w-full",
                )}
              >
                View item
              </Link>
            )}
          </ProductCardVariantSelector>
        ) : (
          <ProductCardActions>
            {showAddToCart ? <AddToCartButton label="Add to Cart" /> : null}
            {showFavorite ? <FavoriteButton isFavorite /> : null}
            {showCompare ? <CompareButton isCompared /> : null}
          </ProductCardActions>
        )}
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;
