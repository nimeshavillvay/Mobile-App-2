import productItemImage from "@/_assets/images/product-item-image.png";
import SubHeading from "@/_components/sub-heading";
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

const TOP_CATEGORIES = [
  "Bar Railings",
  "Decorative Grills & Lattices",
  "Decorative Fillers & Caps",
  "Hardwood Dowels",
];

const TopSubCategories = () => {
  return (
    <section className="my-14 md:my-20 space-y-6">
      <SubHeading>Top Decorative Hardware & Wood Components</SubHeading>

      <p className="hidden md:block pb-4 container text-center text-lg text-wurth-gray-800">
        Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
        sit. Venenatis maecenas scelerisque massa arcu sed.
      </p>

      <ul className="container flex snap-x scroll-pl-4 flex-row items-center md:justify-center gap-2 md:gap-3 overflow-x-auto md:scroll-pl-8">
        {TOP_CATEGORIES.map((category, index) => (
          <li key={category} className="shrink-0 snap-start">
            <button
              data-active={index === 0}
              className="rounded-full px-3 md:px-4 py-2 text-sm md:text-base font-semibold leading-4 md:leading-5 text-black data-[active=true]:bg-wurth-gray-150"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="container flex w-full snap-x scroll-pl-4 flex-row gap-4 overflow-x-auto md:scroll-pl-8 md:gap-5">
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
    </section>
  );
};

export default TopSubCategories;
