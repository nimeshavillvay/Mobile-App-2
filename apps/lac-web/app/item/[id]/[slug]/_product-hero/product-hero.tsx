import productItemImage from "@/_assets/images/product-item-image.png";
import Zap from "@repo/web-ui/components/icons/zap";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import AddToCart from "./add-to-cart";
import {
  DropShipItemNotice,
  ProductDescription,
  ProductDetails,
  ProductNumbers,
  ProductPrices,
  ProductSpecifications,
} from "./product-hero-sections";
import ProductVariants from "./product-variants";

const ProductHero = () => {
  return (
    <>
      <div className="container my-2 flex flex-row items-center gap-2 md:my-1">
        <div className="text-sm font-normal text-black">
          Shop <span className="font-semibold">Blum</span>
        </div>

        <div className="rounded flex flex-row items-center gap-1 bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450">
          <Zap className="stroke-wurth-blue-450 size-4 hidden md:block" />
          <span>Flash Deal</span>
        </div>

        <div className="rounded bg-green-50 px-2 py-0.5 text-base text-green-700">
          <span className="font-semibold">30%</span> off
        </div>
      </div>

      <h1 className="container my-2 md:mt-1 md:mb-7 md:tracking-[-0.144px] font-title text-2xl font-medium tracking-[-0.009rem] text-wurth-gray-800">
        <Balancer>
          CompX 8053 Disc Tumbler Cylinder Cam Lock with FlexaCam, Antique
          Brass, Keyed to C346A Key
        </Balancer>
      </h1>

      {/* Desktop view */}
      <div className="hidden md:grid md:container md:grid-cols-[minmax(0,3fr)_minmax(26rem,2fr)] md:gap-x-12 md:gap-y-[3.75rem]">
        <div>Carousel</div>

        <div className="space-y-6">
          <div className="space-y-2">
            <ProductNumbers />

            <ProductDescription />
          </div>

          <ProductPrices />

          <ProductVariants />

          <AddToCart />

          <DropShipItemNotice />
        </div>

        <ProductDetails />

        <ProductSpecifications />
      </div>

      {/* Mobile view */}
      <>
        <ProductNumbers className="container my-2 md:hidden" />

        <ProductDescription className="container my-2 md:hidden" />

        <Carousel className="mb-10 mt-5 md:hidden">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Image
                  src={productItemImage}
                  alt="A placeholder image"
                  className="aspect-1 object-contain"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots className="mt-1" />
        </Carousel>

        <ProductPrices className="container my-6 md:hidden" />

        <ProductVariants className="container my-6 md:hidden" />

        <AddToCart className="container my-6 md:hidden" />

        <DropShipItemNotice className="container my-6 md:hidden" />

        <ProductDetails className="container my-10 md:hidden" />

        <ProductSpecifications className="container my-10 md:hidden" />
      </>
    </>
  );
};

export default ProductHero;
