"use client";

import productItemImage from "@/_assets/images/product-item-image.png";
import { Button } from "@repo/web-ui/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const ProductDesktopCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return;
      }
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-row items-start gap-3 pr-4">
      <div className="flex shrink-0 flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-fit rounded-md border border-wurth-gray-250 p-1 shadow-sm data-[selected=true]:border-2 data-[selected=true]:border-black data-[selected=true]:p-[3px]"
            onClick={() => onThumbClick(index)}
            data-selected={index === selectedIndex}
          >
            <Image
              src={productItemImage}
              alt="A placeholder image"
              width={76}
              height={76}
              className="aspect-1 overflow-hidden rounded object-contain"
              priority={index === 0}
            />
          </Button>
        ))}
      </div>

      <div
        className="overflow-hidden rounded border border-wurth-gray-250 shadow-md"
        ref={emblaRef}
      >
        <div className="flex rounded-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-full">
              <Image
                src={productItemImage}
                alt="A placeholder image"
                className="aspect-1 object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDesktopCarousel;
