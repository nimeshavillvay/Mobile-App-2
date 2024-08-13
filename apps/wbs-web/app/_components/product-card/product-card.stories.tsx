import type {
  LiteProduct,
  LiteVariant,
} from "@repo/shared-logic/models/product";
import type { Meta, StoryObj } from "@storybook/react";
import ProductCardRoot from "./product-card";

const meta: Meta<typeof ProductCardRoot> = {
  title: "WBS/Product Card",
  component: ProductCardRoot,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCardRoot>;

const baseVariant: LiteVariant = {
  id: "variant1",
  title: "Variant 1",
  sku: "SKU001",
  handle: "variant-1",
  imageUrls: ["/product/771770/PROMD3-MB"],
  pricing: {
    price: 99.99,
    listPrice: 129.99,
    uomPriceUnit: "ea",
  },
  brandName: "Sample Brand",
  categoryName: "Sample Category",
};

const baseProduct: LiteProduct = {
  id: "1",
  title: "Sample Product",
  handle: "sample-product",
  imageUrl: "/product/771770/PROMD3-MB",
  brandName: "Sample Brand",
  categoryName: "Sample Category",
  variants: [
    baseVariant,
    {
      ...baseVariant,
      id: "variant2",
      title: "Variant 2",
      sku: "SKU002",
      handle: "variant-2",
      pricing: {
        price: 89.99,
        listPrice: 119.99,
        uomPriceUnit: "ea",
      },
      brandName: "wurth",
      categoryName: "hinge",
    },
  ],
};

export const Default: Story = {
  args: {
    product: baseProduct,
    orientation: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
};

export const NoDiscount: Story = {
  args: {
    ...Default.args,
    product: {
      ...baseProduct,
      variants: [
        {
          ...baseVariant,
          pricing: {
            price: 99.99,
            listPrice: 99.99,
            uomPriceUnit: "ea",
          },
        },
      ],
    },
  },
};

export const OnSaleAndIsNew: Story = {
  args: {
    ...Default.args,
    product: {
      ...baseProduct,
      metadata: {
        onSale: true,
        isNew: true,
      },
      variants: [
        {
          ...baseVariant,
          pricing: {
            price: 99.99,
            listPrice: 99.99,
            uomPriceUnit: "ea",
          },
        },
      ],
    },
  },
};

export const HorizontalOnSaleAndIsNew: Story = {
  args: {
    ...Default.args,
    orientation: "horizontal",
    product: {
      ...baseProduct,
      metadata: {
        onSale: true,
        isNew: true,
      },
      variants: [
        {
          ...baseVariant,
          pricing: {
            price: 99.99,
            listPrice: 99.99,
            uomPriceUnit: "ea",
          },
        },
      ],
    },
  },
};
export const SingleVariant: Story = {
  args: {
    ...Default.args,
    product: {
      ...baseProduct,
      variants: [baseVariant],
    },
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    product: {
      ...baseProduct,
      imageUrl: "",
      variants: [
        {
          ...baseVariant,
          imageUrls: [],
        },
      ],
    },
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    product: {
      ...baseProduct,
      title:
        "This is a very long product title that might wrap to multiple lines",
    },
  },
};
