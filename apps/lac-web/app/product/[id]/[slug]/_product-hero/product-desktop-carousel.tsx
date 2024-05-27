"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";

type ProductDesktopCarouselProps = {
  readonly images: { src: string; alt: string }[];
};

const ProductDesktopCarousel = ({ images }: ProductDesktopCarouselProps) => {
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
    <div className="relative pr-4">
      <div className="absolute bottom-0 left-0 top-0 h-full overflow-y-auto">
        <div className="flex flex-col gap-2">
          {images.map((image, index) => (
            <Button
              key={image.src}
              type="button"
              variant="outline"
              className="h-fit rounded-md border border-wurth-gray-250 p-1 shadow-sm data-[selected=true]:border-2 data-[selected=true]:border-black data-[selected=true]:p-[3px]"
              onClick={() => onThumbClick(index)}
              data-selected={index === selectedIndex}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={76}
                height={76}
                className="aspect-1 overflow-hidden rounded object-contain"
                priority={index === 0}
              />
            </Button>
          ))}
        </div>
      </div>

      <div
        style={{ "--thumbnail-list-width": "98px" } as CSSProperties}
        className="ml-[var(--thumbnail-list-width)] w-[calc(100%-var(--thumbnail-list-width))] overflow-hidden rounded border border-wurth-gray-250 shadow-md"
        ref={emblaRef}
      >
        <div className="flex rounded-lg">
          {images.map((image, index) => (
            <div key={image.src} className="min-w-0 shrink-0 grow-0 basis-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={980}
                height={980}
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
