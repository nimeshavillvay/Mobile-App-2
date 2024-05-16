"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type HeroBannersProps = {
  banners: { id: string; alt: string; image: string; pdfLink: string }[];
};

const HeroBanners = ({ banners }: HeroBannersProps) => {
  return (
    <section className="bg-[#271E1A] py-4">
      <Carousel
        className="container w-full"
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <a
                href={banner.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-w-[28] aspect-h-9 block"
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  width={1920}
                  height={538}
                  priority={index === 0}
                  className="block rounded-lg bg-[#362A23] object-cover shadow-lg"
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots
          className="mt-2.5"
          buttonClassName="border-white/40 data-[selected]:bg-white/40"
        />
      </Carousel>
    </section>
  );
};

export default HeroBanners;
