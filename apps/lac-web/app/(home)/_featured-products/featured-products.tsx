"use client";

import Title from "@/_components/title";
import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
import * as Tabs from "@radix-ui/react-tabs";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type ComponentProps } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { FeaturedProduct } from "../types";
import FeaturedProductCard from "./featured-product-card";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedType, setSelectedType] = useState<ProductsType>("special");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

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
    <section className="full-bleed mb-[72px] mt-[55px]">
      <div className="flex flex-row items-center justify-center gap-2">
        <ScrollButton onClick={scrollPrev}>
          <VisuallyHidden>Previous banner</VisuallyHidden>
          <FaChevronLeft />
        </ScrollButton>

        <Tabs.Root
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as ProductsType)}
          className="max-w-desktop"
        >
          <div className="mb-7 flex flex-row justify-between">
            <Title asChild>
              <h2 className="border-brand-gray-400 flex-1 border-b pb-3.5">
                Featured Products
              </h2>
            </Title>

            <Tabs.List className="flex flex-row items-end">
              {productTypes.map((productType) => (
                <Tabs.Trigger
                  key={productType}
                  value={productType}
                  className="text-brand-gray-500 border-brand-gray-400 px-7 py-3 text-base font-bold capitalize leading-5 data-[state=active]:border-x data-[state=active]:border-t data-[state=inactive]:border-b data-[state=active]:text-black"
                >
                  {productType.split(/(?=[A-Z])/).join(" ")}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>

          {productTypes.map((productType, rootIndex) => (
            <Tabs.Content
              key={productType}
              value={productType}
              className="grid"
            >
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {productsListPages.map((page, index) => (
                    <div
                      key={index}
                      className="grid shrink-0 grow-0 basis-full grid-cols-4 gap-8"
                    >
                      {page.map((product) => (
                        <FeaturedProductCard
                          key={product.sku}
                          product={product}
                          priority={rootIndex === 0 && index === 0}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <ScrollButton onClick={scrollNext}>
          <VisuallyHidden>Next banner</VisuallyHidden>
          <FaChevronRight />
        </ScrollButton>
      </div>

      <div className="mt-[22px] flex items-center justify-center gap-1">
        {productsListPages.map((page, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1 w-9 shrink-0",
              selectedIndex === index ? "bg-black/50" : " bg-black/15",
            )}
          >
            <VisuallyHidden>Page {index}</VisuallyHidden>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

const ScrollButton = (
  props: Pick<ComponentProps<"button">, "children" | "onClick">,
) => {
  return (
    <button
      className="grid size-8 place-items-center bg-black/15 text-sm leading-none"
      {...props}
    />
  );
};
