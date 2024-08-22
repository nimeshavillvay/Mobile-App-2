import type { Meta, StoryObj } from "@storybook/react";
import {
  ProductCard,
  ProductCardActions,
  ProductCardBadge,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCardSkeleton,
} from "./product-card";
import productImage from "./product-image.png";

const meta: Meta<typeof ProductCard> = {
  title: "Base/Molecules/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: {
        type: "select",
        options: ["vertical", "horizontal"],
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCardHero>
        <ProductCardImage
          href="/product-title"
          src={productImage}
          alt="Product Image"
          title="Product Title"
        />
      </ProductCardHero>
      <ProductCardContent>
        <ProductCardDetails title="Product Title" sku="SKU12345" href="#" />
        <ProductCardPrice price={100} uom="each" />
        <ProductCardActions />
      </ProductCardContent>
    </ProductCard>
  ),
};

export const Horizontal: Story = {
  render: () => {
    return (
      <ProductCard orientation="horizontal">
        <ProductCardHero>
          <ProductCardImage
            src={productImage}
            alt="The product image"
            href="/product/771770/PROMD3-MB"
            title="The product title"
          />
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

export const WithSaleBadge: Story = {
  args: {
    orientation: "vertical",
  },
  render: () => (
    <ProductCard>
      <ProductCardHero>
        <ProductCardDiscount>20</ProductCardDiscount>
        <ProductCardBadge productVariant="sale">Sale</ProductCardBadge>
        <ProductCardImage
          href="/product-title"
          src={productImage}
          alt="Product Image"
          title="Product Title"
        />
      </ProductCardHero>
      <ProductCardContent>
        <ProductCardDetails title="Product Title" sku="SKU12345" href="#" />
        <ProductCardPrice price={80} actualPrice={100} uom="each" />
        <ProductCardActions />
      </ProductCardContent>
    </ProductCard>
  ),
};

export const LoadingSkeleton: Story = {
  render: () => {
    return <ProductCardSkeleton />;
  },
};

export const LoadingSkeletonHorizontal: Story = {
  render: () => {
    return <ProductCardSkeleton orientation="horizontal" />;
  },
};
