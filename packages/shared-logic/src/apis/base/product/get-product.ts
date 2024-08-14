import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import type { Product } from "~/lib/zod-schema/product";

export const getProduct = async (
  { baseUrl, apiKey }: ApiConfig,
  productId: string,
  slug: string,
) => {
  const response = await api
    .get(`rest/landinginfo`, {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        productid: productId,
      }),
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json<Product>();

  if (slug !== response.selected_item.slug) {
    return null;
  }

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
      productId: response.selected_item.productid,
      isExcludedProduct: response.selected_item.is_product_exclude,
      productSku: response.selected_item.txt_wurth_lac_item,
      productName: response.selected_item.item_name,
      image: response.selected_item.img,
      slug: response.selected_item.slug,
      isComparison: !!response.selected_item.is_comparison,
      isDirectlyShippedFromVendor:
        response.selected_item.is_directly_shipped_from_vendor ?? false,
      isHazardous: getBoolean(response.selected_item.txt_hazardous),
      specialShipping: response.selected_item.txt_special_shipping,
      productIdOnSap: response.selected_item.txt_sap,
      mfrPartNo: response.selected_item.txt_mfn,
      productSummary: response.selected_item.txt_description_name,
      productDescription: response.selected_item.txt_sub_description,
      unitOfMeasure: response.selected_item.txt_uom_label,
      boxQuantity: !isNaN(parseInt(response.selected_item.txt_box_qt))
        ? parseInt(response.selected_item.txt_box_qt)
        : 1,
      minimumOrderQuantity: !isNaN(
        parseInt(response.selected_item.txt_min_order_amount),
      )
        ? parseInt(response.selected_item.txt_min_order_amount)
        : 1,
      quantityByIncrements: !isNaN(
        parseInt(response.selected_item.txt_order_qty_increments),
      )
        ? parseInt(response.selected_item.txt_order_qty_increments)
        : 1,
      weight: Number(response.selected_item.txt_weight_value),
      prop65MessageOne: response.selected_item.txt_prop65_message_01,
      prop65MessageTwo: response.selected_item.txt_prop65_message_02,
      prop65MessageThree: response.selected_item.txt_prop65_message_03,
      listPrice: Number(response.selected_item.list_price),
      isSaleItem: getBoolean(response.selected_item.on_sale),
      isNewItem: getBoolean(response.selected_item.is_new),
      fClassId: Number(response.selected_item.fclassid),
      productStatus: response.selected_item.txt_x_pant_Mat_status,
      productThumbnail: response.selected_item.thumbnail_img,
      class: response.selected_item.class,
      attributes: response.selected_item.attributes?.map(
        ({ attribute_name, attribute_value }) => ({
          name: attribute_name,
          value: attribute_value,
        }),
      ),
      detailedImages: response.selected_item.detailed_images,
    },
  };
};

const getBoolean = (value: string | undefined) => {
  return value === "Y";
};
