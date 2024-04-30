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
  banners: { id: string; alt: string; image: string }[];
};

const HeroBanners = ({ banners }: HeroBannersProps) => {
  return (
    <section className="bg-[#271E1A] py-4">
      <Carousel
        className="container w-full"
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  className="bg-[#362A23] object-cover shadow-lg"
                />
              </div>
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
