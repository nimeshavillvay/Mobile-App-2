import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import "server-only";
import { getProduct } from "../apis";
import ProductPrices from "./_product-prices";
import SaleBadges from "./_sale-badges";
import AddToCart from "./add-to-cart";
import AddToCartFormProvider from "./add-to-cart-form-provider";
import ProductDesktopCarousel from "./product-desktop-carousel";
import {
  DropShipItemNotice,
  ProductDescription,
  ProductDetails,
  ProductNumbers,
  ProductSpecifications,
} from "./product-hero-sections";
import ProductVariants from "./product-variants";

type ProductHeroProps = {
  id: string;
  slug: string;
};

const ProductHero = async ({ id, slug }: ProductHeroProps) => {
  const product = await getProduct(id, slug);

  const images = product.selectedProduct.detailedImages
    ? product.selectedProduct.detailedImages.map((image) => ({
        src: image.img,
        alt: image.alt,
      }))
    : [
        {
          src: product.selectedProduct.image,
          alt: product.selectedProduct.productName,
        },
      ];

  return (
    <AddToCartFormProvider
      minQuantity={product.selectedProduct.minimumOrderQuantity}
    >
      <div className="container my-2 flex flex-row items-center gap-2 md:my-1">
        <Link
          href={`/search?query=${product.brand}`}
          className="text-sm font-normal text-black hover:underline"
        >
          Shop <span className="font-semibold">{product.brand}</span>
        </Link>

        <SaleBadges
          productId={parseInt(id)}
          listPrice={product.selectedProduct.listPrice}
        />
      </div>

      <h1 className="container my-2 font-title text-2xl font-medium tracking-[-0.009rem] text-wurth-gray-800 md:mb-7 md:mt-1 md:tracking-[-0.144px]">
        <Balancer>{product.selectedProduct.productName}</Balancer>
      </h1>

      {/* Desktop view */}
      <div className="hidden md:container md:grid md:grid-cols-[minmax(0,3fr)_minmax(26rem,2fr)] md:gap-x-8 md:gap-y-[3.75rem]">
        <ProductDesktopCarousel images={images} />

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

          <ProductPrices
            productId={parseInt(id)}
            listPrice={product.selectedProduct.listPrice}
            uom={product.selectedProduct.unitOfMeasure}
          />

          <ProductVariants id={id} />

          <AddToCart
            productId={parseInt(id)}
            minQty={product.selectedProduct.minimumOrderQuantity}
            incQty={product.selectedProduct.quantityByIncrements}
          />

          {product.selectedProduct.isDirectlyShippedFromVendor && (
            <DropShipItemNotice />
          )}
        </div>

        <ProductDetails id={id} slug={slug} />

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
            {images.map((image, index) => (
              <CarouselItem key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={770}
                  height={770}
                  className="aspect-1 object-contain"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots className="mt-1" />
        </Carousel>

        <ProductPrices
          productId={parseInt(id)}
          listPrice={product.selectedProduct.listPrice}
          uom={product.selectedProduct.unitOfMeasure}
          className="container my-6 md:hidden"
        />

        <ProductVariants id={id} className="container my-6 md:hidden" />

        <AddToCart
          productId={parseInt(id)}
          minQty={product.selectedProduct.minimumOrderQuantity}
          incQty={product.selectedProduct.quantityByIncrements}
          className="container my-6 md:hidden"
        />

        {product.selectedProduct.isDirectlyShippedFromVendor && (
          <DropShipItemNotice className="container my-6 md:hidden" />
        )}

        <ProductDetails
          id={id}
          slug={slug}
          className="container my-10 md:hidden"
        />

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
    </AddToCartFormProvider>
  );
};

export default ProductHero;
