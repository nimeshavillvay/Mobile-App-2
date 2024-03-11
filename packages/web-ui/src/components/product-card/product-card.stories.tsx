import type { Meta, StoryObj } from "@storybook/react";
import {
  ProductCard,
  ProductCardActions,
  ProductCardBanner,
  ProductCardContent,
  ProductCardDetails,
  ProductCardImage,
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
        <ProductCardBanner>
          <span style={{ fontWeight: "700" }}>30%</span> off
        </ProductCardBanner>

        <ProductCardImage src={productImage} alt="The product image" />

        <ProductCardContent>
          <ProductCardDetails
            title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
            sku="SCMN100CR+"
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
        <ProductCardImage src={productImage} alt="The product image" />

        <ProductCardContent>
          <ProductCardDetails
            title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
            sku="SCMN100CR+"
          />

          <ProductCardPrice price={39} uom="pair" />

          <ProductCardActions />
        </ProductCardContent>
      </ProductCard>
    );
  },
};
