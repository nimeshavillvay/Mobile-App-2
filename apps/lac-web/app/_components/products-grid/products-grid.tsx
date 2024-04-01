import productItemImage from "@/_assets/images/product-item-image.png";
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
} from "@repo/web-ui/components/product-card";
import AttributesSelector from "./attributes-selector";
import ProductsGridHeader from "./products-grid-header";

const ProductsGrid = () => {
  return (
    <section className="container my-20 space-y-6">
      <ProductsGridHeader />

      <main className="flex flex-row gap-10">
        <AttributesSelector />

        <div className="flex-1 grid grid-cols-5 gap-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <ProductCard key={index} className="shrink-0 snap-start">
              <ProductCardHero>
                <ProductCardDiscount>30</ProductCardDiscount>

                <ProductCardImage
                  src={productItemImage}
                  alt="A placeholder product"
                  href={"/product/12345"}
                  title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                />

                <ProductCardLabel>Label</ProductCardLabel>

                <ProductCardCompare />
              </ProductCardHero>

              <ProductCardContent>
                <ProductCardDetails
                  title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                  sku="PROMD8-SCP"
                  href="/product/771770/PROMD3-MB"
                />

                <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />

                <ProductCardActions />
              </ProductCardContent>
            </ProductCard>
          ))}
        </div>
      </main>
    </section>
  );
};

export default ProductsGrid;
