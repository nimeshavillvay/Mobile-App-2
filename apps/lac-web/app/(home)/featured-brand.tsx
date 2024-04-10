import ProductCard from "@/_components/product-card";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import fontColorContrast from "font-color-contrast";
import Image from "next/image";
import { type CSSProperties } from "react";
import productImage from "./product-image.png";

const FeaturedBrand = async () => {
  const featuredBrand = await api
    .get("rest/getrandomgroups", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      [
        {
          details: {
            name: string;
            descr: string;
            color: string;
            logo: string;
            background: string;
            link: string;
            link_name: string;
          };
        },
        {
          groups: {
            groupid: string;
            type: string;
            item_group_name: string;
            slug: string;
            brandName: string;
            brandid: string;
            group_img: string;
            compliance_flags: null;
            fclassid: null | string;
            txt_meta_title: string;
            itemSkuList: {
              productid: string;
              is_product_exclude: boolean;
              txt_wurth_lac_item: string;
              item_name: string;
              img: string;
              slug: string;
              is_favourite: null;
              is_comparison: null;
              "SKU-attribute": string;
              txt_hazardous: string;
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
              txt_prop65_message_01: null | string;
              txt_prop65_message_02: null;
              txt_prop65_message_03: null;
              txt_meta_title: string;
              txt_upc1: string;
              txt_seo_meta_description: string;
              txt_keywords: string;
              list_price: string;
              on_sale: string;
            }[];
            variationsCount: number;
          }[];
        },
      ]
    >();

  const details = featuredBrand[0].details;
  const products = featuredBrand[1].groups;

  return (
    <section
      style={
        {
          "--brand-color": details.color,
          "--text-color": fontColorContrast(details.color),
          // TODO Try to convert to a Tailwind CSS class
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), var(--brand-color)",
        } as CSSProperties
      }
      className="my-14 space-y-6 py-9 md:my-20 md:space-y-9 md:py-16"
    >
      <div className="container">
        <div className="overflow-hidden rounded-lg bg-[var(--brand-color)] shadow-lg md:flex md:flex-row-reverse">
          <div className="relative aspect-2 md:flex-1">
            <Image
              src={productImage}
              alt="A placeholder image"
              className="object-cover"
              fill
            />
          </div>

          <div className="p-6 text-[var(--text-color)] md:flex-1 md:p-12">
            {/* TODO Replace with actual brand logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="118"
              height="32"
              fill="none"
              viewBox="0 0 80 21"
              className="fill-[var(--text-color)]"
            >
              <path
                fillRule="evenodd"
                d="M76.853 1.254A1.505 1.505 0 0178.296.196c.822 0 1.504.666 1.504 1.47 0 .803-.682 1.47-1.504 1.47s-1.523-.647-1.523-1.47c0-.157.02-.275.08-.412zm0-.02v.02l-.18-.078c-.04.156-.08.313-.08.49 0 .92.761 1.646 1.703 1.646.942 0 1.704-.745 1.704-1.646C80 .764 79.238 0 78.296 0c-.762 0-1.403.49-1.624 1.156l.18.078zm-53.06 19.203h6.054L36.903 1h-6.094l-7.015 19.438zM7.338 12.658l-.762-6.035a.766.766 0 00-.521-.627.785.785 0 00-.802.176l-4.47 4.233s-.18.196-.22.313c-.141.412.08.843.48.98.08.04.18.04.26.04h1.544c.14.039.2.195.16.313l-.24.686L0 20.398h.561l2.947-8.151v-.02a.768.768 0 00-.481-.98c-.08-.039-.18-.039-.26-.039H1.222c-.14-.039-.2-.196-.16-.313 0-.04.04-.079.08-.098l.52-.51 3.368-3.213.582-.549s.16-.078.26-.059c0 0 .16.118.16.196l.1.784.582 4.566.08.705v.118c-.04.137-.2.196-.34.156-.02 0-.06-.02-.08-.039l-.301-.235-.281-.216-.541-.43s-.14-.098-.24-.138a.795.795 0 00-1.003.47v.02l-2.886 7.975h.56l2.587-7.132.24-.686c.04-.137.2-.196.34-.157.021 0 .061.02.081.04l.581.47.562.45s.14.098.22.118a.795.795 0 001.002-.47.876.876 0 00.04-.392v.02zm40.718 7.76h-.027l.02.02.007-.02zm0 0h5.987l3.147-8.543c1.263-2.058 3.768-1.588 3.307.215l-3.007 8.348h6.275l2.966-8.152c.802-2.057 4.09-2.175 3.368.235l-2.807 7.916h6.054l3.388-9.386c1.122-3.193-2.867-7.465-9.722-2.762-.822-2.156-4.21-3.488-8.72-.373l.3-1.273H52.96l-4.904 13.775zm29.88-18.792H78.577c.24 0 .38-.411.06-.49h-.702v.49zm.481.177h-.42v.02h-.08v.666h-.161V.96h.822c.42-.02.601.608.16.804.207.106.2.285.193.449-.004.106-.008.206.048.276h-.18c-.04-.052-.039-.134-.037-.225.003-.187.006-.408-.345-.461zm-36.542 4.82h-.007l.007-.02v.02zm-.007 0h-5.686l-3.347 9.17c-1.664 5.174 3.668 6.898 8.74 3.312l-.341 1.313h5.432l4.991-13.795h-5.793L42.897 14.5c-.682 1.92-4.55 2.998-3.95.059l2.92-7.936zM18.983.96l-2.265 6.388h.02c7.497-4.37 11.265 1.568 7.958 7.544-4.21 8.289-12.068 6.33-12.428 3.997l-.662 1.529H5.893L12.89.96h6.094zm-4.19 15.167c1.063.685 2.867 0 3.99-1.372 1.182-1.45 1.382-3.586.22-4.33-.983-.628-2.205-.314-3.268.666-.32.274-.601.627-.882 1.019-1.122 1.606-1.182 3.272-.06 4.017z"
                clipRule="evenodd"
              ></path>
            </svg>

            <h2 className="mb-2 mt-4 font-title text-3xl font-medium tracking-[-0.01406rem] md:mt-14 md:text-5xl md:tracking-[-0.036rem]">
              {details.name}
            </h2>

            {!!details.descr && (
              <p className="text-base md:text-lg">{details.descr}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container flex snap-x scroll-pl-4 flex-row gap-4 overflow-x-auto md:scroll-pl-8 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.groupid}
            product={{
              groupName: product.item_group_name,
              variants: product.itemSkuList.map((item) => ({
                id: item.productid,
                slug: item.slug,
                title: item.item_name,
              })),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrand;
