import { getBanners } from "@/_lib/apis/server";
import { cn } from "@/_lib/utils";
import { ArrowRight } from "@repo/web-ui/components/icons/arrow-right";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, type ComponentProps } from "react";
import Balancer from "react-wrap-balancer";
import FeaturedBrand from "./_featured-brand";
import FlashSale from "./_flash-sale";
import FeaturedCategories from "./featured-categories";
import HeroBanners from "./hero-banners";
import kessebohmer from "./kessebohmer.jpg";
import kessebohmerLogo from "./kessebohmer.png";
import makita from "./makita.jpg";
import makitaLogo from "./makita.png";
import paintline from "./paintline.jpg";
import paintlineLogo from "./paintline.png";
import wlacImage1 from "./wlac-image-1.jpg";
import wlacImage2 from "./wlac-image-2.jpg";

type Colors = {
  text: string;
  background: string;
  accent: string;
  bgLogo: string;
};
const ADS: (
  | {
      id: number;
      type: "sale";
      title: string;
      colors: Colors;
      image: StaticImageData;
      logo: StaticImageData;
    }
  | {
      id: number;
      type: "spotlight";
      title: string;
      subtitle: string;
      colors: Colors;
      image: StaticImageData;
      logo: StaticImageData;
    }
)[] = [
  {
    id: 1,
    type: "spotlight",
    title: "LeMans Il Promotion!",
    subtitle:
      "Maximize your blind corner cabinet storage with the accessibility of LeMans!",
    colors: {
      text: "#000",
      background: "#0FFFFFF",
      accent: "#CC0000",
      bgLogo: "#CC0000",
    },
    image: kessebohmer,
    logo: kessebohmerLogo,
  },
  {
    id: 2,
    type: "spotlight",
    title: "40 Years of Cordless Innovation",
    subtitle:
      "Makita leads the industry with best-in-class quality cordless products.",
    colors: {
      text: "#FFF",
      background: "#008290",
      accent: "#000",
      bgLogo: "#CC0000",
    },
    image: makita,
    logo: makitaLogo,
  },
  {
    id: 3,
    type: "spotlight",
    title: "The #1 Cabinet Door Drying Rack",
    subtitle:
      "Discover the ultimate solution for efficiently drying your cabinet doors with our premium selection of cabinet door drying racks.",
    colors: {
      text: "#000",
      background: "#E0DED6",
      accent: "#CC0000",
      bgLogo: "#CC0000",
    },
    image: paintline,
    logo: paintlineLogo,
  },
];

const HomePage = async () => {
  const banners = await getBanners("0");

  const heroBanner: ComponentProps<typeof HeroBanners>["banners"] =
    banners.T.flatMap((topBanner) => topBanner.banners).map((banner) => ({
      id: banner.id,
      alt: banner.alt_tag,
      image: banner.file_path,
      pdfLink: banner.pdf_file_path,
    }));

  return (
    <>
      <HeroBanners banners={heroBanner} />

      <section className="container my-3 flex w-full snap-x scroll-pl-4 flex-row items-stretch gap-4 overflow-x-auto 3xl:my-6 3xl:grid 3xl:snap-none 3xl:scroll-pl-0 3xl:grid-cols-3 3xl:gap-5">
        {ADS.map((ad) => (
          <article
            key={ad.id}
            style={
              {
                "--background-color": ad.colors.background,
                "--text-color": ad.colors.text,
              } as CSSProperties
            }
            className="relative flex min-h-[11.75rem] w-[19.75rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-lg bg-[var(--background-color)] md:w-[18.95rem] lg:w-[22.2rem] xl:h-[15rem] xl:w-[26.1rem] 2xl:w-[29.6rem] 3xl:relative 3xl:h-[21.25rem] 3xl:w-auto 3xl:snap-align-none"
          >
            <div
              className={cn(
                "shrink-1 z-[1] min-h-[8.75rem] flex-1 truncate px-4 pt-4 3xl:pl-9 3xl:pr-0 3xl:pt-9",
                ad.type === "spotlight" ? "max-w-[16.063rem]" : "3xl:max-w-56",
              )}
            >
              {ad.type === "sale" && (
                <div className="font-title text-sm tracking-[-0.00438rem] text-[var(--text-color)] md:text-[1.1rem] 3xl:text-[1.25rem] 3xl:leading-7 3xl:tracking-[-0.00625rem]">
                  Super Sale!
                </div>
              )}

              <div className="absolute left-0 top-0 w-full bg-white bg-opacity-50 p-1">
                <Image
                  src={ad.logo}
                  alt="A picture of the sale"
                  width={258}
                  height={50}
                  className="h-7 w-auto 3xl:h-12"
                />
              </div>

              <h3 className="mt-11 whitespace-normal text-wrap font-title text-xl font-medium leading-7 text-[var(--text-color)] md:text-[1.2rem] md:leading-[1.3rem] xl:text-[1.75rem] xl:leading-[1.6rem] 3xl:text-[2.25rem] 3xl:leading-[2rem]">
                <Balancer>{ad.title}</Balancer>
              </h3>

              {ad.type === "spotlight" && (
                <div className="mt-2 whitespace-normal text-wrap pr-7 text-xs font-medium text-[var(--text-color)] md:text-[0.6rem] xl:text-[0.7rem] 3xl:mt-2 3xl:text-sm">
                  {ad.subtitle}
                </div>
              )}
            </div>

            <Image
              src={ad.image}
              alt="A picture of the sale"
              width={258}
              height={225}
              className={cn(
                "33xl:h-[21.25rem] absolute bottom-[1.17rem] min-h-[11.75rem] w-[19.75rem] shrink-0 snap-start self-end rounded-lg object-contain lg:h-[19.45rem] 3xl:absolute 3xl:bottom-0 3xl:w-auto 3xl:snap-align-none",
                ad.type === "spotlight"
                  ? "max-h-[8rem] 3xl:bottom-[2.2rem] 3xl:max-h-[19.063rem]"
                  : "3xl:bottom-0",
              )}
            />

            <div
              style={{ "--accent-color": ad.colors.accent } as CSSProperties}
              className="z-[1] flex flex-row items-center gap-2 bg-[var(--accent-color)] px-4 py-2 pt-2 text-sm font-bold text-white 3xl:py-4"
            >
              <span>Shop Now</span>

              <ArrowRight className="stroke-white" width={16} height={16} />
            </div>
          </article>
        ))}
      </section>

      <section className="container">
        <div className="flex flex-col items-center gap-6 rounded-lg bg-wurth-gray-800 px-6 py-9 lg:flex-row lg:gap-8 lg:p-10">
          <div className="space-y-3 text-white md:flex-1">
            <h2 className="font-title text-4xl font-medium leading-none tracking-[-0.01688rem]">
              <Balancer>
                Woodworking and Metalworking for Every Passion and Profession
              </Balancer>
            </h2>

            <p className="text-lg">
              We provide top-tier woodworking and metalworking supplies, serving
              both professionals and hobbyists. With renowned brands like Blum,
              Rev-a-Shelf, SCM and SawStop, 24/7 online ordering, and fast
              delivery, we make it easy for everyone from businesses to DIY
              enthusiasts to find the right tools and materials. Our expert
              support ensures success for projects of any scale.
            </p>
          </div>

          <Image
            src={wlacImage1}
            alt="A female worker using an industrial machine"
            placeholder="blur"
            className="h-[17rem] rounded-lg bg-white object-cover object-left md:h-80 md:min-w-0 md:flex-1"
          />

          <Image
            src={wlacImage2}
            alt="A male worker using a wood cutter"
            placeholder="blur"
            className="h-[17rem] rounded-lg bg-white object-cover object-right md:h-80 md:min-w-0 md:flex-1"
          />
        </div>
      </section>

      <FlashSale />

      <FeaturedBrand />

      <FeaturedCategories />
    </>
  );
};

export default HomePage;
