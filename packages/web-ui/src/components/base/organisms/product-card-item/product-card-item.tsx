import type { LiteProduct } from "@repo/shared-logic/models/product";
import type { ComponentProps } from "react";
import {
  ProductCard,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCardVariantSelector,
} from "~/components/product-card/product-card";
import { TooltipProvider } from "~/components/ui/tooltip";
import { calculateDiscount } from "~/lib/utils";

type ProductCardItemProps = {
  readonly product: LiteProduct;
  readonly orientation?: ComponentProps<typeof ProductCard>["orientation"];
};

const ProductCardItem = ({ product, orientation }: ProductCardItemProps) => {
  const mainVariant = product.variants?.[0]; // Assuming the first variant is the main one

  const discount = mainVariant?.pricing
    ? calculateDiscount(mainVariant.pricing)
    : 0;

  const handleAddToCart = () => {
    // Implement add to cart logic
    console.log(`Added ${product.title} to cart`);
  };

  const handleShoppingListClick = () => {
    // Implement shopping list logic
    console.log(`Added ${product.title} to shopping list`);
  };

  return (
    <TooltipProvider>
      <ProductCard orientation={orientation}>
        <ProductCardHero>
          <ProductCardImage
            src={
              product.imageUrl ||
              mainVariant?.imageUrls?.[0] ||
              "https://via.placeholder.com/300x300"
            }
            alt={product.title}
            href={`/products/${product.handle}`}
            title={product.title}
          />
          {discount > 0 && (
            <ProductCardDiscount>{discount}</ProductCardDiscount>
          )}
        </ProductCardHero>
        <ProductCardContent>
          <ProductCardDetails
            title={product.title}
            sku={mainVariant?.sku || ""}
            href={`/products/${product.handle}`}
          />
          <ProductCardPrice
            price={mainVariant?.pricing.price || 0}
            uom={mainVariant?.pricing.uomPriceUnit || "ea"}
            actualPrice={mainVariant?.pricing.listPrice}
            isLaminateItem={false}
          />
          {product.variants && product.variants.length > 0 ? (
            <ProductCardVariantSelector
              href={`/products/${product.handle}`}
              variants={product.variants?.map((variant) => ({
                value: variant.id,
                title: variant.title,
              }))}
              value={mainVariant?.id}
              onValueChange={(value) =>
                console.log(`Selected variant: ${value}`)
              }
              addToCart={handleAddToCart}
              isFavorite={false}
              onClickShoppingList={handleShoppingListClick}
            />
          ) : null}
        </ProductCardContent>
      </ProductCard>
    </TooltipProvider>
  );
};

export default ProductCardItem;
