import type { Meta, StoryObj } from "@storybook/react";
import {
  ProductCard,
  ProductCardActions,
  ProductCardCompare,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "./product-card";
import productImage from "./product-image.png";

const meta: Meta<typeof ProductCard> = {
  title: "Components/Product Card",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const WithDiscount: Story = {
  render: () => {
    return (
      <ProductCard>
        <ProductCardHero>
          <ProductCardDiscount>30</ProductCardDiscount>

          <ProductCardImage
            src={productImage}
            alt="The product image"
            href="/product/771770/PROMD3-MB"
            title="The product title"
          />

          <ProductCardLabel>Label</ProductCardLabel>

          <ProductCardCompare />
        </ProductCardHero>

        <ProductCardContent>
          <ProductCardDetails
            title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
            sku="SCMN100CR+"
            href="/product/771770/PROMD3-MB"
          />

          <ProductCardPrice price={39} uom="pair" actualPrice={49} />

          <ProductCardActions />
        </ProductCardContent>
      </ProductCard>
    );
  },
};

export const WithoutDiscount: Story = {
  render: () => {
    return (
      <ProductCard>
        <ProductCardHero>
          <ProductCardImage
            src={productImage}
            alt="The product image"
            href="/product/771770/PROMD3-MB"
            title="The product title"
          />

          <ProductCardLabel>Label</ProductCardLabel>

          <ProductCardCompare />
        </ProductCardHero>

        <ProductCardContent>
          <ProductCardDetails
            title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
            sku="SCMN100CR+"
            href="/product/771770/PROMD3-MB"
          />

          <ProductCardPrice price={39} uom="pair" />

          <ProductCardActions />
        </ProductCardContent>
      </ProductCard>
    );
  },
};
