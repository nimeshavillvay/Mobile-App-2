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

type TopSubCategoriesProps = {
  title: string;
};

const TopSubCategories = ({ title }: TopSubCategoriesProps) => {
  return (
    <section className="my-14 space-y-6 md:my-20">
      <SubHeading>Top {title}</SubHeading>

      <p className="container hidden pb-4 text-center text-lg text-wurth-gray-800 md:block">
        Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
        sit. Venenatis maecenas scelerisque massa arcu sed.
      </p>

      <ul className="container flex snap-x scroll-pl-4 flex-row items-center gap-2 overflow-x-auto md:scroll-pl-8 md:justify-center md:gap-3">
        {TOP_CATEGORIES.map((category, index) => (
          <li key={category} className="shrink-0 snap-start">
            <button
              data-active={index === 0}
              className="rounded-full px-3 py-2 text-sm font-semibold leading-4 text-black data-[active=true]:bg-wurth-gray-150 md:px-4 md:text-base md:leading-5"
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
