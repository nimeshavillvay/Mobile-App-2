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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import AttributesSelector from "./attributes-selector";
import ProductsGridHeader from "./products-grid-header";

const ProductsGrid = () => {
  return (
    <section className="my-14 space-y-3 md:my-20 md:space-y-6">
      <ProductsGridHeader />

      {/* Mobile products list */}
      <div className="container flex flex-col gap-3 md:hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCard key={index} orientation="horizontal" className="w-full">
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

      {/* Desktop products grid */}
      <div className="hidden flex-row gap-10 md:flex">
        <AttributesSelector />

        <div className="grid flex-1 grid-cols-5 gap-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <ProductCard key={index}>
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
      </div>

      <Pagination className="pt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default ProductsGrid;
