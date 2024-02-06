"use client";

import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetails,
} from "@/_components/product-card";
import Title from "@/_components/title";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/_hooks/account/use-login-dialog.hook";
import { getMediaUrl } from "@/_utils/helpers";
import * as Tabs from "@radix-ui/react-tabs";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import type { FeaturedProduct } from "./types";

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
  const [selectedType, setSelectedType] = useState<ProductsType>("special");
  const accountListQuery = useAccountList();
  const setOpenLoginDialog = useLoginDialog((state) => state.setOpen);

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
    <section className="max-w-desktop mx-auto mb-[72px] mt-[55px]">
      <Tabs.Root
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as ProductsType)}
      >
        <div className="mb-7 flex flex-row justify-between">
          <Title asChild>
            <h2 className="border-brand-dark-gray flex-1 border-b pb-3.5">
              Featured Products
            </h2>
          </Title>

          <Tabs.List className="flex flex-row items-end">
            {productTypes.map((productType) => (
              <Tabs.Trigger
                key={productType}
                value={productType}
                className="text-brand-very-dark-gray border-brand-dark-gray px-7 py-3 text-base font-bold capitalize leading-5 data-[state=active]:border-x data-[state=active]:border-t data-[state=inactive]:border-b data-[state=active]:text-black"
              >
                {productType.split(/(?=[A-Z])/).join(" ")}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        {productTypes.map((productType, rootIndex) => (
          <Tabs.Content key={productType} value={productType} className="grid">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {productsListPages.map((page, index) => (
                  <div
                    key={index}
                    className="grid shrink-0 grow-0 basis-full grid-cols-4 gap-8"
                  >
                    {page.map((product) => (
                      <ProductCardContainer key={product.sku}>
                        <ProductCardDetails
                          href={`/product-item/${product.groupId}/${product.sku}`}
                          image={{
                            src: getMediaUrl(product.product_img),
                            alt: `An image of ${product.productTitle}`,
                            priority: rootIndex === 0 && index === 0,
                          }}
                          brand={product.brandName}
                          title={product.productTitle}
                        />

                        <ProductCardActions>
                          <div className="text-brand-dark-gray mb-2 text-center text-sm leading-5">
                            {product.sku}
                          </div>

                          {accountListQuery.data ? (
                            <>
                              <div>
                                ${product.override_price} /{" "}
                                {product.txt_uom_label}
                              </div>
                            </>
                          ) : (
                            <button
                              onClick={() => setOpenLoginDialog(true)}
                              className="bg-brand-primary w-full rounded p-2 text-base text-white"
                            >
                              Login to buy
                            </button>
                          )}
                        </ProductCardActions>
                      </ProductCardContainer>
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