"use client";

import productItemImage from "@/_assets/images/product-item-image.png";
import {
  ProductCard,
  ProductCardActions,
  ProductCardCompare,
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
    title: string;
  };
};

const FlashSaleProduct = ({
  product: { id, title },
}: FlashSaleProductProps) => {
  return (
    <ProductCard className="shrink-0 snap-start">
      <ProductCardHero>
        <ProductCardDiscount>30</ProductCardDiscount>

        <ProductCardImage
          src={productItemImage}
          alt={`A picture of the product ${title}`}
          href={`/item/12345`}
          title={title}
        />

        <ProductCardLabel>Label</ProductCardLabel>

        <ProductCardCompare />
      </ProductCardHero>

      <ProductCardContent>
        <ProductCardDetails
          title={title}
          sku={id}
          href="/product/771770/PROMD3-MB"
        />

        <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />

        <ProductCardActions />
      </ProductCardContent>
    </ProductCard>
  );
};

export default FlashSaleProduct;
