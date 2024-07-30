import type { Meta, StoryObj } from "@storybook/react";
import { type EmblaOptionsType } from "embla-carousel";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ChevronDown } from "../../../icons/chevron-down";
import { ChevronLeft } from "../../../icons/chevron-left";
import { ChevronRight } from "../../../icons/chevron-right";
import { ChevronUp } from "../../../icons/chevron-up";
import {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "../../../product-card";
import { Carousel, CarouselContent, CarouselHeader } from "./carousel";
import productImage from "./product-image.png";

const meta: Meta<typeof Carousel> = {
  title: "Base/Molecule/Carousel",
  component: Carousel,
};
export default meta;

const addToCart = () => {
  console.log("Added to cart");
};

type Story = StoryObj<typeof Carousel>;

const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
let OPTIONS: EmblaOptionsType;

const renderProductCard = (orientation?: "horizontal" | "vertical") => (
  <TooltipProvider>
    <ProductCard orientation={orientation}>
      <ProductCardHero>
        <ProductCardDiscount>30</ProductCardDiscount>
        <ProductCardImage
          src={productImage}
          alt="The product image"
          href="/product/771770/PROMD3-MB"
          title="The product title"
        />
      </ProductCardHero>
      <ProductCardContent>
        <ProductCardLabel>Label</ProductCardLabel>
        <ProductCardDetails
          title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
          sku="SCMN100CR+"
          href="/product/771770/PROMD3-MB"
        />
        <ProductCardPrice
          price={39}
          uom="pair"
          actualPrice={49}
          isLaminateItem={false}
        />
        <ProductCardActions
          addToCart={addToCart}
          isFavorite={false}
          onClickShoppingList={() => {}}
        />
      </ProductCardContent>
    </ProductCard>
  </TooltipProvider>
);

export const HorizontalCarousel: Story = {
  render: () => {
    OPTIONS = { dragFree: true, axis: "x" };
    return (
      <Carousel>
        <CarouselHeader>
          <h1>Similar Items</h1>
        </CarouselHeader>
        <CarouselContent
          options={OPTIONS}
          PrevIcon={ChevronLeft}
          NextIcon={ChevronRight}
          className="bg-white"
          orientation="horizontal"
          buttonsPosition="side"
        >
          {SLIDES.map((index: number) => (
            <div key={index} className="pr-8">
              {renderProductCard("horizontal")}
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    );
  },
};

export const VerticalCarousel: Story = {
  render: () => {
    OPTIONS = {
      dragFree: true,
      axis: "y",
    };
    return (
      <Carousel>
        <CarouselHeader>
          <h1>Similar Items</h1>
        </CarouselHeader>
        <CarouselContent
          options={OPTIONS}
          PrevIcon={ChevronUp}
          NextIcon={ChevronDown}
          className="bg-white"
          orientation="vertical"
          buttonsPosition="top"
          buttonSize="mobile"
        >
          {SLIDES.map((index: number) => (
            <div key={index} className="pb-5">
              {renderProductCard("vertical")}
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    );
  },
};
