"use client";

import {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "@repo/web-ui/components/product-card";

type FlashSaleProductProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    sku: string;
    image: string;
  };
};

const FlashSaleProduct = ({
  product: { id, slug, title, sku, image },
}: FlashSaleProductProps) => {
  return (
    <ProductCard className="shrink-0 snap-start">
      <ProductCardHero>
        <ProductCardDiscount>30</ProductCardDiscount>

        <ProductCardImage
          src={image}
          alt={`A picture of the product ${title}`}
          href={`/product/${id}/${slug}`}
          title={title}
        />

        <ProductCardLabel>Label</ProductCardLabel>
      </ProductCardHero>

      <ProductCardContent>
        <ProductCardDetails
          title={title}
          sku={sku}
          href={`/product/${id}/${slug}`}
        />

        <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />

        <ProductCardActions />
      </ProductCardContent>
    </ProductCard>
  );
};

export default FlashSaleProduct;
