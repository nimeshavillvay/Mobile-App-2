import productItemImage from "@/_assets/images/product-item-image.png";
import { Zap } from "@repo/web-ui/components/icons/zap";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import "server-only";
import { getProduct } from "../apis";
import AddToCart from "./add-to-cart";
import ProductDesktopCarousel from "./product-desktop-carousel";
import {
  DropShipItemNotice,
  ProductDescription,
  ProductDetails,
  ProductNumbers,
  ProductPrices,
  ProductSpecifications,
} from "./product-hero-sections";
import ProductVariants from "./product-variants";

type ProductHeroProps = {
  id: string;
};

const ProductHero = async ({ id }: ProductHeroProps) => {
  const product = await getProduct(id);

  return (
    <>
      <div className="container my-2 flex flex-row items-center gap-2 md:my-1">
        <div className="text-sm font-normal text-black">
          Shop <span className="font-semibold">{product.brand}</span>
        </div>

        <div className="flex flex-row items-center gap-1 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450">
          <Zap className="hidden size-4 stroke-wurth-blue-450 md:block" />
          <span>Flash Deal</span>
        </div>

        <div className="rounded bg-green-50 px-2 py-0.5 text-base text-green-700">
          <span className="font-semibold">30%</span> off
        </div>
      </div>

      <h1 className="container my-2 font-title text-2xl font-medium tracking-[-0.009rem] text-wurth-gray-800 md:mb-7 md:mt-1 md:tracking-[-0.144px]">
        <Balancer>{product.selectedProduct.productName}</Balancer>
      </h1>

      {/* Desktop view */}
      <div className="hidden md:container md:grid md:grid-cols-[minmax(0,3fr)_minmax(26rem,2fr)] md:gap-x-8 md:gap-y-[3.75rem]">
        <ProductDesktopCarousel />

        <div className="space-y-6">
          <div className="space-y-2">
            <ProductNumbers
              groupId={product.groupId}
              productId={product.selectedProduct.productId}
            />

            <ProductDescription>
              {product.selectedProduct.productDescription}
            </ProductDescription>
          </div>

          <ProductPrices />

          <ProductVariants id={id} />

          <AddToCart
            minQty={product.selectedProduct.minimumOrderQuantity}
            incQty={product.selectedProduct.quantityByIncrements}
          />

          <DropShipItemNotice />
        </div>

        <ProductDetails id={id} />

        {!!product.selectedProduct.attributes && (
          <ProductSpecifications
            attributes={product.selectedProduct.attributes.map((attribute) => ({
              name: attribute.name,
              value: attribute.value,
            }))}
          />
        )}
      </div>

      {/* Mobile view */}
      <>
        <ProductNumbers
          groupId={product.groupId}
          productId={product.selectedProduct.productId}
          className="container my-2 md:hidden"
        />

        <ProductDescription className="container my-2 md:hidden">
          {product.selectedProduct.productDescription}
        </ProductDescription>

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

        <ProductVariants id={id} className="container my-6 md:hidden" />

        <AddToCart
          minQty={product.selectedProduct.minimumOrderQuantity}
          incQty={product.selectedProduct.quantityByIncrements}
          className="container my-6 md:hidden"
        />

        <DropShipItemNotice className="container my-6 md:hidden" />

        <ProductDetails id={id} className="container my-10 md:hidden" />

        {!!product.selectedProduct.attributes && (
          <ProductSpecifications
            attributes={product.selectedProduct.attributes.map((attribute) => ({
              name: attribute.name,
              value: attribute.value,
            }))}
            className="container my-10 md:hidden"
          />
        )}
      </>
    </>
  );
};

export default ProductHero;
