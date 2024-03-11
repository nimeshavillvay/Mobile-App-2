"use client";

import VisuallyHidden from "@/old/_components/visually-hidden";
import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { type EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { CarouselBanner } from "./types";

type CarouselProps = {
  banners: CarouselBanner[];
};

const Carousel = ({ banners }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
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

  if (!banners.length) {
    // If there are no banners
    return null;
  }

  return (
    <div className="full-bleed flex flex-row items-center justify-center gap-2">
      <ScrollButton onClick={scrollPrev}>
        <VisuallyHidden>Previous banner</VisuallyHidden>
        <FaChevronLeft />
      </ScrollButton>

      <div className="relative max-w-desktop overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div key={banner.id} className="shrink-0 grow-0 basis-full">
              <a
                href={getMediaUrl(`/${banner.pdf_file_path}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={getMediaUrl(banner.file_path)}
                  alt={banner.alt_tag}
                  width={1120}
                  height={360}
                  priority={index === 0}
                />
              </a>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-1/2 bottom-0 flex items-center justify-center gap-1">
          {banners.map((banner, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="h-4 w-9 shrink-0"
            >
              <div
                className={cn(
                  "h-1 w-full",
                  selectedIndex === index ? "bg-black/50" : " bg-black/15",
                )}
              />
              <VisuallyHidden>{banner.alt_tag}</VisuallyHidden>
            </button>
          ))}
        </div>
      </div>

      <ScrollButton onClick={scrollNext}>
        <VisuallyHidden>Next banner</VisuallyHidden>
        <FaChevronRight />
      </ScrollButton>
    </div>
  );
};

export default Carousel;

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
