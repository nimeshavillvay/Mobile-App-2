import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TooltipProvider } from "~/components/ui/tooltip";
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
  ProductCardSkeleton,
  ProductCardVariantSelector,
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

const addToCart = () => {};

const onClickShoppingCart = () => {};

export const WithDiscount: Story = {
  render: () => {
    return (
      <TooltipProvider>
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
          </ProductCardHero>

          <ProductCardContent>
            <ProductCardDetails
              title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
              sku="SCMN100CR+"
              href="/product/771770/PROMD3-MB"
            />

            <ProductCardPrice
              price={39}
              uom="pair"
              actualPrice={49}
              isLaminateItem
            />

            <ProductCardActions
              addToCart={addToCart}
              isFavorite
              onClickShoppingList={onClickShoppingCart}
            />
          </ProductCardContent>
        </ProductCard>
      </TooltipProvider>
    );
  },
};

export const WithoutDiscount: Story = {
  render: () => {
    return (
      <TooltipProvider>
        <ProductCard>
          <ProductCardHero>
            <ProductCardImage
              src={productImage}
              alt="The product image"
              href="/product/771770/PROMD3-MB"
              title="The product title"
            />

            <ProductCardLabel>Label</ProductCardLabel>
          </ProductCardHero>

          <ProductCardContent>
            <ProductCardDetails
              title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
              sku="SCMN100CR+"
              href="/product/771770/PROMD3-MB"
            />

            <ProductCardPrice price={39} uom="pair" isLaminateItem />

            <ProductCardActions
              addToCart={addToCart}
              onClickShoppingList={onClickShoppingCart}
              isFavorite={false}
            />
          </ProductCardContent>
        </ProductCard>
      </TooltipProvider>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    return (
      <TooltipProvider>
        <ProductCard orientation="horizontal">
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
              onClickShoppingList={onClickShoppingCart}
              isFavorite={false}
            />
          </ProductCardContent>
        </ProductCard>
      </TooltipProvider>
    );
  },
};

export const WithVariantSelector: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [id, setId] = useState<string | undefined>();

    const onVariantSelect = (value: string) => {
      setId(value);
    };

    return (
      <TooltipProvider>
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
          </ProductCardHero>

          <ProductCardContent>
            <ProductCardDetails
              title='blum 21" Tandem Plus 563H Undermount Drawer Slide for 5/8" Material, 100lb Capacity Full Extension with BLUMOTION Soft-Closing'
              sku="SCMN100CR+"
              href="/product/771770/PROMD3-MB"
            />

            <ProductCardVariantSelector
              href="/item/id/slug"
              variants={[
                { value: "1", title: "Variant 1" },
                { value: "2", title: "Variant 2" },
                { value: "3", title: "Variant 3" },
              ]}
              value={id}
              onValueChange={onVariantSelect}
              addToCart={addToCart}
              isFavorite={false}
              onClickShoppingList={() => {}}
            />
          </ProductCardContent>
        </ProductCard>
      </TooltipProvider>
    );
  },
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
