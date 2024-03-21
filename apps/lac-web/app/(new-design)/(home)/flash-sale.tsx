"use client";

import {
  ProductCard,
  ProductCardCompare,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "@repo/web-ui/components/product-card";
import Title from "./Title";
import productItemImage from "./product-item-image.png";

const FlashSale = () => {
  return (
    <section className="mt-14 space-y-6">
      <header className="container text-center">
        <Title>Flash Sale</Title>

        <p className="mt-2 text-base text-wurth-gray-800">
          Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
          sit. Venenatis maecenas scelerisque massa arcu sed.
        </p>
      </header>

      <div className="container flex w-full snap-x scroll-pl-4 flex-row gap-4 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductCard key={index} className="shrink-0 snap-start">
            <ProductCardHero>
              <ProductCardDiscount>30</ProductCardDiscount>

              <ProductCardImage
                src={productItemImage}
                alt="A placeholder product"
                href={"/product/12345"}
                title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
              />

              <ProductCardLabel>Label</ProductCardLabel>

              <ProductCardCompare />
            </ProductCardHero>

            <ProductCardContent>
              <ProductCardDetails
                title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                sku="PROMD8-SCP"
                href="/product/771770/PROMD3-MB"
              />

              <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />
            </ProductCardContent>
          </ProductCard>
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
