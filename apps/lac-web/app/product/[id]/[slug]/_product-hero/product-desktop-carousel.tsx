"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";

type ProductDesktopCarouselProps = Readonly<{
  title: string;
  images: { src: string; alt: string }[];
}>;

const ProductDesktopCarousel = ({
  title,
  images,
}: ProductDesktopCarouselProps) => {
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
            <Dialog key={image.src}>
              <DialogTrigger className="min-w-0 shrink-0 grow-0 basis-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={980}
                  height={980}
                  className="aspect-1 object-contain"
                  priority={index === 0}
                />

                <span className="sr-only">View image {index + 1}</span>
              </DialogTrigger>

              <DialogPortal>
                <DialogOverlay />

                <DialogPrimitive.Content>
                  <div className="fixed left-0 right-0 top-0 z-[60] flex flex-row items-center justify-between gap-2.5 bg-black/70 p-2.5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top">
                    <div className="text-lg leading-5 text-white">{title}</div>

                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="h-fit p-0">
                        <Close className="stroke-white" />
                      </Button>
                    </DialogClose>
                  </div>

                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={512}
                    height={512}
                    className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top sm:rounded-lg"
                  />
                </DialogPrimitive.Content>
              </DialogPortal>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDesktopCarousel;
