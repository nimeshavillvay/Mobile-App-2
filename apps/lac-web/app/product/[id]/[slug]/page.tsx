import productItemImage from "@/_assets/images/product-item-image.png";
import { api } from "@/_lib/api";
import { getBreadcrumbs } from "@/_lib/apis/server";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { ChevronLeft } from "@repo/web-ui/components/icons/chevron-left";
import {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "@repo/web-ui/components/product-card";
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
import { Fragment } from "react";
import Balancer from "react-wrap-balancer";
import ProductHero from "./_product-hero";
import { getProduct } from "./apis";
import type { ProductPageProps } from "./types";

export const generateMetadata = async ({
  params: { id, slug },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id, slug);

  return {
    title: product.selectedProduct.productName,
    description: product.selectedProduct.productDescription,
  };
};

const ProductPage = async ({ params: { id, slug } }: ProductPageProps) => {
  // Just to check if the product exists
  await getProduct(id, slug);

  const [breadcrumbs, relatedProducts] = await Promise.all([
    getBreadcrumbs(id, "product"),
    api
      .get(`rest/landingrelatedproduct/${id}`, {
        next: { revalidate: DEFAULT_REVALIDATE },
      })
      .json<{
        data: {
          heading: string;
          items: {
            productid: string;
            is_product_exclude: boolean;
            txt_wurth_lac_item: string;
            item_name: string;
            img: string;
            url: string;
            is_favourite: null;
            is_comparison: null;
            txt_hazardous: string;
            txt_special_shipping: string;
            txt_sap: string;
            txt_mfn: string;
            txt_description_name: string;
            txt_sub_description: string;
            sel_assigned_brand: string;
            txt_uom: string;
            txt_uom_label: string;
            txt_uom_value: null;
            txt_rounding: null;
            txt_box_qt: string;
            txt_min_order_amount: string;
            txt_order_qty_increments: string;
            txt_weight_value: string;
            txt_wight: string;
            txt_weight_label: string;
            date: Date;
            txt_chemical_carncengen: null;
            txt_chemical_reproduction: null;
            txt_contains_wood: null;
            txt_prop65_message_01: null;
            txt_prop65_message_02: null;
            txt_prop65_message_03: null;
            txt_meta_title: string;
            txt_upc1: string;
            txt_seo_meta_description: string;
            txt_keywords: string;
            list_price: string;
            on_sale: string;
            fclassid: string;
            brand_name: string;
            txt_group_code: null;
            item_status: null;
            category_name: string;
            product_summary: string;
            is_directly_shipped_from_vendor: boolean;
          }[];
        }[];
      }>()
      .then(({ data }) => data),
  ]);

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
            <Fragment key={breadcrumb.id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/category/${breadcrumb.id}/${breadcrumb.slug}`}>
                    {breadcrumb.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <ProductHero id={id} slug={slug} />

      {relatedProducts.length > 0 && (
        <section className="my-10 space-y-4 md:my-[3.75rem] md:space-y-9">
          <h2 className="container font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
            <Balancer>Accessories and Related Products</Balancer>
          </h2>

          {relatedProducts.map((relatedSection) => (
            <div key={relatedSection.heading} className="space-y-3 bg-white">
              <h3 className="container text-lg font-semibold text-wurth-gray-800">
                <Balancer>{relatedSection.heading}</Balancer>
              </h3>

              <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                {relatedSection.items.map((item) => (
                  <ProductCard
                    key={item.productid}
                    orientation="horizontal"
                    className="w-full"
                  >
                    <ProductCardHero>
                      <ProductCardDiscount>30</ProductCardDiscount>

                      <ProductCardImage
                        src={productItemImage}
                        alt={`A picture if the item ${item.item_name}`}
                        href={`/product/${item.productid}/${item.url}`}
                        title={item.item_name}
                      />
                    </ProductCardHero>

                    <ProductCardContent>
                      <ProductCardDetails
                        title={item.item_name}
                        sku={item.productid}
                        href={`/product/${item.productid}/${item.url}`}
                      />

                      <ProductCardPrice
                        price={2.05}
                        uom="pair"
                        actualPrice={4.11}
                      />

                      <ProductCardActions
                        addToCart={() => {
                          console.log("> Added to cart");
                        }}
                      />
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
      )}

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
              </ProductCardHero>

              <ProductCardContent>
                <ProductCardDetails
                  title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                  sku="PROMD8-SCP"
                  href="/product/771770/PROMD3-MB"
                />

                <ProductCardPrice price={2.05} uom="pair" actualPrice={4.11} />

                <ProductCardActions
                  addToCart={() => {
                    console.log("> Added to cart");
                  }}
                />
              </ProductCardContent>
            </ProductCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductPage;
