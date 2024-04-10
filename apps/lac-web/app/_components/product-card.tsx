"use client";

import productItemImage from "@/_assets/images/product-item-image.png";
import { cn } from "@/_lib/utils";
import {
  ProductCardActions,
  ProductCardCompare,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardVariantSelector,
} from "@repo/web-ui/components/product-card";
import { useState, type ComponentProps } from "react";

type ProductProps = {
  orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  product: {
    groupName: string;
    variants: {
      id: string;
      slug: string;
      title: string;
    }[];
  };
};

const ProductCard = ({ orientation, product }: ProductProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const defaultVariant = product.variants[0];
  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedId,
  );

  let href = "";
  if (
    (product.variants.length === 1 ||
      (product.variants.length > 1 && !selectedVariant)) &&
    defaultVariant
  ) {
    // If there is only one variant or if there are multiple variants and
    // none of them have been selected
    href = `/item/${defaultVariant.id}/${defaultVariant.slug}`;
  } else if (selectedVariant) {
    href = `/item/${selectedVariant.id}/${selectedVariant.slug}`;
  }

  let sku = "";
  if (selectedVariant) {
    sku = selectedVariant.id;
  } else if (defaultVariant) {
    sku = defaultVariant.id;
  }

  let title = "";
  if (product.variants.length === 1 && defaultVariant) {
    // If there is just one variant, use its title
    title = defaultVariant.title;
  } else if (product.variants.length > 1) {
    if (selectedVariant) {
      // If there are multiple variants and one of them has been selected, use its title
      title = selectedVariant.title;
    } else {
      // If there are multiple variants and none of them have been selected, use the group name
      title = product.groupName;
    }
  }

  return (
    <ProductCardRoot
      orientation={orientation}
      className={cn(orientation === "horizontal" && "w-full")}
    >
      <ProductCardHero>
        <ProductCardDiscount>30</ProductCardDiscount>

        <ProductCardImage
          src={productItemImage}
          alt="A placeholder product"
          href={href}
          title={title}
        />

        <ProductCardLabel>Label</ProductCardLabel>

        <ProductCardCompare />
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
          />
        ) : (
          <>
            <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />

            <ProductCardActions />
          </>
        )}
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;
