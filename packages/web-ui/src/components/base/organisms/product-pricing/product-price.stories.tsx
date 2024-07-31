import type { ProductPrice } from "@repo/shared-logic/models/pricing";
import type { Meta, StoryObj } from "@storybook/react";
import ProductPricing from "./product-price";

const meta: Meta<typeof ProductPricing> = {
  title: "Organisms/Product Pricing",
  component: ProductPricing,
  tags: ["autodocs"],
  argTypes: {
    productPrice: { control: "object" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ProductPricing>;

const baseProductPrice: ProductPrice = {
  price: 19.99,
  listPrice: 24.99,
  uomPriceUnit: "each",
  priceBreakdowns: [
    { quantity: 1, price: 19.99 },
    { quantity: 5, price: 18.99 },
    { quantity: 10, price: 17.99 },
    { quantity: 20, price: 16.99 },
  ],
};

export const Default: Story = {
  args: {
    productPrice: baseProductPrice,
  },
};

export const NoDiscount: Story = {
  args: {
    productPrice: {
      ...baseProductPrice,
      listPrice: 19.99,
    },
  },
};

export const HighPrice: Story = {
  args: {
    productPrice: {
      ...baseProductPrice,
      price: 999.99,
      listPrice: 1299.99,
      priceBreakdowns: [
        { quantity: 1, price: 999.99 },
        { quantity: 2, price: 949.99 },
        { quantity: 5, price: 899.99 },
      ],
    },
  },
};

export const DifferentUnit: Story = {
  args: {
    productPrice: {
      ...baseProductPrice,
      uomPriceUnit: "kg",
    },
  },
};

export const NoBreakdowns: Story = {
  args: {
    productPrice: {
      ...baseProductPrice,
      priceBreakdowns: [],
    },
  },
};

export const CustomClassName: Story = {
  args: {
    productPrice: baseProductPrice,
    className: "bg-gray-100 p-4 rounded-xl",
  },
};
