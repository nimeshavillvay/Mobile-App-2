import ArrowLeft from "@repo/web-ui/components/icons/arrow-right";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties } from "react";
import Balancer from "react-wrap-balancer";
import Title from "./Title";
import ad1 from "./ad-1.png";
import ad2 from "./ad-2.png";
import Banner from "./banner";
import blogImage from "./blog-image.png";
import FeaturedBrand from "./featured-brand";
import FeaturedCategories from "./featured-categories";
import FlashSale from "./flash-sale";
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
  {
    id: 4,
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
];

const HomePage = () => {
  return (
    <>
      <HeroBanners />

      <section className="container my-3 flex w-full snap-x scroll-pl-4 flex-row items-stretch gap-4 overflow-x-auto">
        {ADS.map((ad) => (
          <article
            key={ad.id}
            style={
              {
                "--background-color": ad.colors.background,
                "--text-color": ad.colors.text,
              } as CSSProperties
            }
            className="flex w-[11.75rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-lg bg-[var(--background-color)]"
          >
            <div className="flex-1 px-4 pt-4">
              {ad.type === "sale" && (
                <div className="font-title text-sm tracking-[-0.00438rem] text-[var(--text-color)]">
                  Super Sale!
                </div>
              )}

              <h3 className="font-title text-2xl font-medium leading-7 text-[var(--text-color)]">
                <Balancer>{ad.title}</Balancer>
              </h3>

              {ad.type === "spotlight" && (
                <div className="text-xs font-medium text-[var(--text-color)]">
                  {ad.subtitle}
                </div>
              )}
            </div>

            <Image
              src={ad.image}
              alt="A picture of the sale"
              width={170}
              height={170}
              className="self-end object-contain"
            />

            <div
              style={{ "--accent-color": ad.colors.accent } as CSSProperties}
              className="flex flex-row items-center gap-2 bg-[var(--accent-color)] px-4 py-2 text-sm font-bold text-white"
            >
              <span>Shop Now</span>

              <ArrowLeft className="stroke-white" width={16} height={16} />
            </div>
          </article>
        ))}
      </section>

      <section className="container">
        <div className="space-y-6 rounded-lg bg-wurth-gray-800 px-6 py-9">
          <div className="space-y-3 text-white">
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

          <div className="h-[17rem] rounded-lg bg-white" />

          <div className="h-[17rem] rounded-lg bg-white" />
        </div>
      </section>

      <FlashSale />

      <Banner />

      <FeaturedBrand />

      <section className="container my-14 space-y-6">
        <Title>Save More...</Title>

        <ul className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className="relative flex aspect-1 flex-col justify-between gap-2 rounded-lg bg-green-50 p-3"
            >
              <h3 className="text-sm font-medium text-black">
                <Balancer>GRASS Institutional Hinges</Balancer>
              </h3>

              <div className="z-10 font-title text-xl leading-6 text-green-700">
                <span className="tracking-[-0.00625rem]">Up to</span>
                <br />
                <span className="text-2xl font-bold leading-none tracking-[-0.01125rem]">
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

      <section className="my-14 space-y-6 bg-wurth-gray-50 py-9">
        <Title>Latest From Our Blog</Title>

        <ul className="container flex snap-x scroll-pl-4 flex-row items-center gap-4 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, index) => (
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
