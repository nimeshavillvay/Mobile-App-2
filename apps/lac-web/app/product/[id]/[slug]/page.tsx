import productItemImage from "@/_assets/images/product-item-image.png";
import RelatedSearches from "@/_components/related-searches";
import { getBreadcrumbs } from "@/_lib/apis/server";
import { cn } from "@/_lib/utils";
import ChevronLeft from "@repo/web-ui/components/icons/chevron-left";
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
import { Badge } from "@repo/web-ui/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Balancer from "react-wrap-balancer";
import ProductHero from "./_product-hero";
import { getProduct } from "./apis";

type ProductPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { id, slug },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id);

  // Check if the slug matches the product's slug
  if (slug !== product.selected_item.url) {
    return notFound();
  }

  return {
    title: product.selected_item.item_name,
    description: product.selected_item.txt_sub_description,
  };
};

const ProductPage = async ({ params: { id, slug } }: ProductPageProps) => {
  const product = await getProduct(id);

  // Check if the slug matches the product's slug
  if (slug !== product.selected_item.url) {
    return notFound();
  }

  const breadcrumbs = await getBreadcrumbs(id, "product");

  return (
    <>
      <div className="container my-4 md:hidden">
        <Link
          href="/cam-locks"
          className={buttonVariants({
            variant: "link",
            className: "h-fit gap-1 p-0",
          })}
        >
          <ChevronLeft className="size-4" />

          <span>Cam Locks</span>
        </Link>
      </div>

      <Breadcrumb className="container mb-6 mt-3 hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb) => (
            <Fragment key={breadcrumb.oo_id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/category/${breadcrumb.oo_id}/${breadcrumb.slug}`}
                  >
                    {breadcrumb.cat_name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <ProductHero id={id} />

      <section className="my-10 space-y-4 md:my-[3.75rem] md:space-y-9">
        <h2 className="container font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
          <Balancer>Accessories and Related Products</Balancer>
        </h2>

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "space-y-3",
              index === 0 ? "bg-red-50 py-4 md:pb-12 md:pt-10" : "bg-white",
            )}
          >
            <div className="container flex flex-row items-center gap-1.5">
              <h3 className="text-lg font-semibold text-wurth-gray-800">
                Rollers
              </h3>

              {index === 0 && <Badge variant="primary">Required</Badge>}
            </div>

            <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCard
                  key={index}
                  orientation="horizontal"
                  className="w-full"
                >
                  <ProductCardHero>
                    <ProductCardDiscount>30</ProductCardDiscount>

                    <ProductCardImage
                      src={productItemImage}
                      alt="A placeholder product"
                      href={"/product/12345"}
                      title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                    />

                    <ProductCardCompare />
                  </ProductCardHero>

                  <ProductCardContent>
                    <ProductCardDetails
                      title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                      sku="PROMD8-SCP"
                      href="/product/771770/PROMD3-MB"
                    />

                    <ProductCardPrice
                      price={2.05}
                      uom="pair"
                      actualPrice={4.11}
                    />

                    <ProductCardActions />
                  </ProductCardContent>
                </ProductCard>
              ))}
            </div>

            <div className="container md:hidden">
              <Button className="w-full font-bold">Load 4 more</Button>
            </div>
          </div>
        ))}
      </section>

      <section className="my-10 space-y-6 bg-wurth-gray-50 py-10 md:space-y-5">
        <h2 className="container text-center font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
          More to consider
        </h2>

        <div className="container flex w-full snap-x scroll-pl-4 flex-row gap-5 overflow-x-auto md:scroll-pl-8">
          {Array.from({ length: 5 }).map((_, index) => (
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

      <RelatedSearches />
    </>
  );
};

export default ProductPage;
