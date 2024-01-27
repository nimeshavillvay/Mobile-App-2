"use client";

import type { FeaturedProduct } from "@/_lib/types";
import { getMediaUrl } from "@/_utils/helpers";
import * as Tabs from "@radix-ui/react-tabs";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FeaturedProductsProps = {
  bestSellers: FeaturedProduct[];
  featured: FeaturedProduct[];
  latest: FeaturedProduct[];
  special: FeaturedProduct[];
};
type ProductsType = keyof FeaturedProductsProps;

const productTypes: ProductsType[] = [
  "special",
  "featured",
  "bestSellers",
  "latest",
];

const FeaturedProducts = ({
  bestSellers,
  featured,
  latest,
  special,
}: FeaturedProductsProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [selectedType, setSelectedType] = useState<ProductsType>("bestSellers");

  let productsList: FeaturedProduct[] = [];
  if (selectedType === "bestSellers") {
    productsList = bestSellers;
  } else if (selectedType === "featured") {
    productsList = featured;
  } else if (selectedType === "latest") {
    productsList = latest;
  } else {
    productsList = special;
  }

  const productsListPages: FeaturedProduct[][] = [];
  for (let i = 0; i < productsList.length; i += 4) {
    productsListPages.push(productsList.slice(i, i + 4));
  }

  return (
    <section className="max-w-desktop mx-auto">
      <Tabs.Root
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as ProductsType)}
      >
        <div className="flex flex-row justify-between">
          <h2>Featured Products</h2>

          <Tabs.List className="flex flex-row gap-4">
            {productTypes.map((productType) => (
              <Tabs.Trigger
                key={productType}
                value={productType}
                className="text-brand-very-dark-gray capitalize data-[state=active]:text-black"
              >
                {productType.split(/(?=[A-Z])/).join(" ")}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        {productTypes.map((productType) => (
          <Tabs.Content key={productType} value={productType} className="grid">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {productsListPages.map((page, index) => (
                  <div
                    key={index}
                    className="grid shrink-0 grow-0 basis-full grid-cols-4"
                  >
                    {page.map((product) => (
                      <div key={product.sku}>
                        <Link
                          href={`/product-item/${product.groupId}/${product.sku}`}
                          className="block"
                        >
                          <Image
                            src={getMediaUrl(product.product_img)}
                            alt={`An image of ${product.productTitle}`}
                            width={171}
                            height={171}
                          />

                          <div>{product.brandName}</div>

                          <h3>{product.productTitle}</h3>

                          <div>{product.sku}</div>

                          <button className="bg-brand-primary w-full rounded p-2 text-white">
                            Login to buy
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
};

export default FeaturedProducts;
