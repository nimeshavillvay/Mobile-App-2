import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import "server-only";

type Product = {
  page_title: string;
  group_id: string;
  txt_group_part_number: string;
  group_summary: string;
  group_sel_always: string;
  brand_name: string;
  brand_logo: string;
  brand_code: string;
  group_thumbnail: string;
  group_img: string;
  selected_item: {
    productid: number;
    is_directly_shipped_from_vendor: boolean;
    is_product_exclude: boolean;
    txt_wurth_lac_item: string;
    item_name: string;
    img: string;
    slug: string;
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
    txt_chemical_carncengen: string[];
    txt_chemical_reproduction: string[];
    txt_contains_wood: string;
    txt_prop65_message_01: string;
    txt_prop65_message_02: string;
    txt_prop65_message_03: string;
    txt_meta_title: string;
    txt_upc1: string;
    txt_seo_meta_description: string;
    txt_keywords: string;
    list_price: string;
    on_sale: string;
    fclassid: string;
    brand_name: string;
    txt_group_code: null;
    txt_x_pant_Mat_status: string;
    thumbnail_img: string;
    class: string;
    attributes: {
      attribute_name: string;
      attribute_value: string;
    }[];
    detailed_images: {
      img: string;
      alt: string;
    }[];
  };
};

export const getProduct = async (id: string) => {
  const response = await api
    .get("rest/landinginfo", {
      searchParams: {
        productid: id,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Product>();

  const { selected_item } = response;

  return {
    pageTitle: response.page_title,
    groupId: response.group_id,
    groupSummary: response.group_summary,
    brand: response.brand_name,
    brandLogo: response.brand_logo,
    brandCode: response.brand_code,
    groupThumbnail: response.group_thumbnail,
    groupImage: response.group_img,
    selectedProduct: {
      productId: Number(selected_item.productid),
      isExcludedProduct: selected_item.is_product_exclude,
      productSku: selected_item.txt_wurth_lac_item,
      productName: selected_item.item_name,
      image: selected_item.img,
      slug: selected_item.slug,
      isFavourite: !!selected_item.is_favourite,
      isComparison: !!selected_item.is_comparison,
      isDirectlyShippedFromVendor:
        selected_item.is_directly_shipped_from_vendor ?? false,
      isHazardous: selected_item.txt_hazardous === "Y",
      specialShipping: SPECIAL_SHIPPING_FLAG.includes(
        selected_item.txt_special_shipping,
      ),
      productIdOnSap: selected_item.txt_sap,
      mfrPartNo: selected_item.txt_mfn,
      productSummary: selected_item.txt_description_name,
      productDescription: selected_item.txt_sub_description,
      unitOfMeasure: selected_item.txt_uom_label,
      boxQuantity: Number(selected_item.txt_box_qt) || 1,
      minimumOrderQuantity: Number(selected_item.txt_min_order_amount) || 1,
      quantityByIncrements: Number(selected_item.txt_order_qty_increments) || 1,
      weight: Number(selected_item.txt_weight_value),
      prop65MessageOne: selected_item.txt_prop65_message_01,
      prop65MessageTwo: selected_item.txt_prop65_message_02,
      prop65MessageThree: selected_item.txt_prop65_message_03,
      listPrice: Number(selected_item.list_price),
      isSaleItem: selected_item.on_sale === "Y",
      fClassId: Number(selected_item.fclassid),
      productStatus: selected_item.txt_x_pant_Mat_status,
      productThumbnail: selected_item.thumbnail_img,
      class: selected_item.class,
      attributes: selected_item.attributes.map(
        ({ attribute_name, attribute_value }) => ({
          name: attribute_name,
          value: attribute_value,
        }),
      ),
      detailedImages: response.selected_item.detailed_images,
    },
  };
};
