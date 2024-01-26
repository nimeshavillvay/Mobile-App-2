"use client";

import type { CarouselBanner } from "@/_lib/types";
import { getMediaUrl } from "@/_utils/helpers";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type CarouselProps = {
  banners: CarouselBanner[];
};

const Carousel = ({ banners }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner, index) => (
          <div key={banner.id} className="shrink-0 grow-0 basis-full">
            <a
              href={getMediaUrl(banner.pdf_file_path)}
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
    </div>
  );
};

export default Carousel;
