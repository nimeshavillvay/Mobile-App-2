import { AddToCartButton } from "@/_components/molecules/product-card/buttons";
import ProductCard from "@/_components/molecules/product-card/product-card";
import type {
  LiteProduct,
  LiteVariant,
} from "@repo/shared-logic/models/product";

const HomePage = () => {
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
    metadata: {
      onSale: true,
      isNew: true,
    },
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

  return (
    <div className="px-20 py-20">
      <h1>This is the wurth baer home page</h1>
      <ProductCard
        product={baseProduct}
        orientation="horizontal"
        showAddToCart={false}
      />

      <AddToCartButton label="Add To Cart Button" />
    </div>
  );
};

export default HomePage;
