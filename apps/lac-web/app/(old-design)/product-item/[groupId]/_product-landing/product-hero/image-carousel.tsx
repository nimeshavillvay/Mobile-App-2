"use client";

import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const CAROUSEL_SIZE = 3;

type ImageCarouselProps = {
  productImages: string[];
  productTitle: string;
};

const ImageCarousel = ({ productImages, productTitle }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
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
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const pictureIndexes = [selectedIndex];
  while (pictureIndexes.length < CAROUSEL_SIZE) {
    let noPreviousAdded = true;
    let noNextAdded = true;

    const firstIndex = pictureIndexes[0];
    if (typeof firstIndex === "number" && firstIndex > 0) {
      pictureIndexes.unshift(firstIndex - 1);
      noPreviousAdded = false;
    }

    const lastIndex = pictureIndexes[pictureIndexes.length - 1];
    if (typeof lastIndex === "number" && lastIndex < productImages.length) {
      pictureIndexes.push(lastIndex + 1);
      noNextAdded = false;
    }

    // No indexes were added
    if (noPreviousAdded && noNextAdded) {
      break;
    }
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col items-center">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          aria-label="Previous image"
          className="text-[#999999]"
        >
          <MdKeyboardArrowUp />
        </button>

        {pictureIndexes.map((index) => {
          const image = productImages[index];

          if (!image) {
            return null;
          }

          return (
            <button
              key={image}
              onClick={() => scrollTo(index)}
              className={cn(
                "border",
                selectedIndex === index
                  ? "border-brand-primary"
                  : "border-brand-gray-200",
              )}
            >
              <Image
                src={getMediaUrl(image)}
                alt={`Image ${index + 1} of ${productTitle}`}
                width={68}
                height={68}
                priority={index < 3}
                className="object-contain"
              />
            </button>
          );
        })}

        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          aria-label="Next image"
          className="text-[#999999]"
        >
          <MdKeyboardArrowDown />
        </button>
      </div>

      <div
        className="border-brand-gray-200 overflow-hidden border"
        ref={emblaRef}
      >
        <div className="flex h-[300px] flex-col">
          {productImages.map((productImage, index) => (
            <Image
              key={productImage}
              src={getMediaUrl(productImage)}
              alt={`Image ${index + 1} of ${productTitle}`}
              width={300}
              height={300}
              priority={index === 0}
              className="size-[300px] shrink-0 grow-0 basis-full object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
