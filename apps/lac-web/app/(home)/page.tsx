import Banner from "@/_components/banner";
import SubHeading from "@/_components/sub-heading";
import { getBanners } from "@/_lib/apis/server";
import { ArrowRight } from "@repo/web-ui/components/icons/arrow-right";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties } from "react";
import Balancer from "react-wrap-balancer";
import FlashSale from "./_flash-sale";
import ad1 from "./ad-1.png";
import ad2 from "./ad-2.png";
import blogImage from "./blog-image.png";
import FeaturedBrand from "./featured-brand";
import FeaturedCategories from "./featured-categories";
import HeroBanners from "./hero-banners";

type Colors = {
  text: string;
  background: string;
  accent: string;
};
const ADS: (
  | {
      id: number;
      type: "sale";
      title: string;
      colors: Colors;
      image: StaticImageData;
    }
  | {
      id: number;
      type: "spotlight";
      title: string;
      subtitle: string;
      colors: Colors;
      image: StaticImageData;
    }
)[] = [
  {
    id: 1,
    type: "sale",
    title: "Waste Pull-outs",
    colors: { text: "#FFF", background: "#053868", accent: "#000" },
    image: ad1,
  },
  {
    id: 2,
    type: "spotlight",
    title: "Sakes alive only $205!",
    subtitle:
      "Get the Würth 5” PSA Non-Vac Random Orbital Sander & 3 boxes of Abrasives for only $205!",
    colors: {
      text: "#000",
      background: "#C8C3C3",
      accent: "#CC0000",
    },
    image: ad2,
  },
  {
    id: 3,
    type: "sale",
    title: "Waste Pull-outs",
    colors: { text: "#FFF", background: "#053868", accent: "#000" },
    image: ad1,
  },
];

const HomePage = async () => {
  const banners = await getBanners("0");

  return (
    <>
      <HeroBanners
        banners={banners.T.flatMap((topBanner) => topBanner.banners).map(
          (banner) => ({
            id: banner.id,
            alt: banner.alt_tag,
          }),
        )}
      />

      <section className="container my-3 flex w-full snap-x scroll-pl-4 flex-row  items-stretch gap-4 overflow-x-auto md:my-6 md:grid md:snap-none md:scroll-pl-0 md:grid-cols-3 md:gap-5">
        {ADS.map((ad) => (
          <article
            key={ad.id}
            style={
              {
                "--background-color": ad.colors.background,
                "--text-color": ad.colors.text,
              } as CSSProperties
            }
            className="flex w-[11.75rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-lg bg-[var(--background-color)] md:relative md:max-h-[21.25rem] md:w-auto md:snap-align-none"
          >
            <div className="shrink-1 z-10 min-h-0 flex-1 truncate px-4 pt-4 md:max-w-56 md:px-9 md:pt-9">
              {ad.type === "sale" && (
                <div className="font-title text-sm tracking-[-0.00438rem] text-[var(--text-color)] md:text-lg md:tracking-[-0.00625rem]">
                  Super Sale!
                </div>
              )}

              <h3 className="font-title text-2xl font-medium leading-7 text-[var(--text-color)] md:text-[2.75rem] md:leading-[3rem]">
                <Balancer>{ad.title}</Balancer>
              </h3>

              {ad.type === "spotlight" && (
                <div className="text-xs font-medium text-[var(--text-color)] md:mt-2 md:text-base">
                  {ad.subtitle}
                </div>
              )}
            </div>

            <Image
              src={ad.image}
              alt="A picture of the sale"
              width={170}
              height={170}
              className="self-end object-contain md:absolute md:bottom-7 md:right-0"
            />

            <div
              style={{ "--accent-color": ad.colors.accent } as CSSProperties}
              className="z-10 flex flex-row items-center gap-2 bg-[var(--accent-color)] px-4 py-2 text-sm font-bold text-white"
            >
              <span>Shop Now</span>

              <ArrowRight className="stroke-white" width={16} height={16} />
            </div>
          </article>
        ))}
      </section>

      <section className="container">
        <div className="flex flex-col gap-6 rounded-lg bg-wurth-gray-800 px-6 py-9 md:flex-row md:items-center md:gap-8 md:p-10">
          <div className="space-y-3 text-white md:flex-1">
            <h2 className="font-title text-4xl font-medium leading-none tracking-[-0.01688rem]">
              <Balancer>Crafted for Craftsmen. Built for Business.</Balancer>
            </h2>

            <p className="text-lg">
              Whittle away inefficiencies with our streamlined ecommerce
              platform. We deliver top-quality woodworking products straight to
              your workshop, so you can focus on what matters most - creating
              exceptional pieces.
            </p>
          </div>

          <div className="h-[17rem] rounded-lg bg-white md:h-80 md:flex-1" />

          <div className="h-[17rem] rounded-lg bg-white md:h-80 md:flex-1" />
        </div>
      </section>

      <FlashSale />

      <Banner />

      <FeaturedBrand />

      <section className="container my-14 space-y-6 md:my-20 md:space-y-9">
        <SubHeading>Save More...</SubHeading>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className="md:aspect-auto aspect-square relative flex flex-col justify-between gap-2 rounded-lg bg-green-50 p-3 md:min-h-[11.25rem] md:p-4"
            >
              <h3 className="text-sm font-medium text-black md:text-base md:leading-tight">
                <Balancer>GRASS Institutional Hinges</Balancer>
              </h3>

              <div className="z-10 font-title text-xl leading-6 text-green-700 md:text-2xl md:leading-none">
                <span className="tracking-[-0.00625rem] md:tracking-[-0.0075rem]">
                  Up to
                </span>
                <br />
                <span className="text-2xl font-bold leading-none tracking-[-0.01125rem] md:text-4xl md:tracking-[-0.01688rem]">
                  30%
                </span>{" "}
                <span className="text-base uppercase">off</span>
              </div>

              <Image
                src={ad1}
                alt="A placeholder"
                width={125}
                height={125}
                className="absolute bottom-3 right-0 object-contain"
              />
            </li>
          ))}
        </ul>
      </section>

      <Banner />

      <FeaturedCategories />

      <section className="my-14 space-y-6 bg-wurth-gray-50 py-9 md:my-20 md:space-y-9 md:py-16">
        <SubHeading>Latest From Our Blog</SubHeading>

        <ul className="container flex snap-x scroll-pl-4 flex-row items-center gap-4 overflow-x-auto md:scroll-pl-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index} className="snap-start">
              <article className="w-[19.75rem] overflow-hidden rounded-lg border border-wurth-gray-250 bg-white shadow-md">
                <Image
                  src={blogImage}
                  alt="Blog image"
                  width={316}
                  height={180}
                />

                <div className="space-y-1 p-5">
                  <h3 className="line-clamp-3 text-lg font-bold leading-6 text-black">
                    <Balancer>
                      2024 Kitchen Trends - Delivering What Homeowners Want
                    </Balancer>
                  </h3>

                  <p className="line-clamp-2 text-sm text-wurth-gray-500">
                    Stay ahead of the curve with the hottest kitchen trends
                    homeowners are craving. Discover design tips, material
                    recommendations, and strategies to win over clients with
                    cutting-edge kitchens.
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
