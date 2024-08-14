import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { productSchema, type Product } from "~/lib/zod-schema/product";

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
    .json();

  const product = await productSchema.parseAsync(response);

  return {
    pageTitle: product.page_title,
    groupId: product.group_id,
    groupSummary: product.group_summary,
    brand: product.brand_name,
    brandLogo: product.brand_logo,
    brandCode: product.brand_code,
    groupThumbnail: product.group_thumbnail,
    groupImage: product.group_img,
    selectedProduct: {
      productId: product.selected_item.productid,
      isExcludedProduct: product.selected_item.is_product_exclude,
      productSku: product.selected_item.txt_wurth_lac_item,
      productName: product.selected_item.item_name,
      image: product.selected_item.img,
      slug: product.selected_item.slug,
      isComparison: !!product.selected_item.is_comparison,
      isDirectlyShippedFromVendor:
        product.selected_item.is_directly_shipped_from_vendor ?? false,
      isHazardous: getBoolean(product.selected_item.txt_hazardous),
      specialShipping: product.selected_item.txt_special_shipping,
      productIdOnSap: product.selected_item.txt_sap,
      mfrPartNo: product.selected_item.txt_mfn,
      productSummary: product.selected_item.txt_description_name,
      productDescription: product.selected_item.txt_sub_description,
      unitOfMeasure: product.selected_item.txt_uom_label,
      boxQuantity: !isNaN(parseInt(product.selected_item.txt_box_qt))
        ? parseInt(product.selected_item.txt_box_qt)
        : 1,
      minimumOrderQuantity: !isNaN(
        parseInt(product.selected_item.txt_min_order_amount),
      )
        ? parseInt(product.selected_item.txt_min_order_amount)
        : 1,
      quantityByIncrements: !isNaN(
        parseInt(product.selected_item.txt_order_qty_increments),
      )
        ? parseInt(product.selected_item.txt_order_qty_increments)
        : 1,
      weight: Number(product.selected_item.txt_weight_value),
      prop65MessageOne: product.selected_item.txt_prop65_message_01,
      prop65MessageTwo: product.selected_item.txt_prop65_message_02,
      prop65MessageThree: product.selected_item.txt_prop65_message_03,
      listPrice: Number(product.selected_item.list_price),
      isSaleItem: getBoolean(product.selected_item.on_sale),
      isNewItem: getBoolean(product.selected_item.is_new),
      fClassId: Number(product.selected_item.fclassid),
      productStatus: product.selected_item.txt_x_pant_Mat_status,
      productThumbnail: product.selected_item.thumbnail_img,
      class: product.selected_item.class,
      attributes: product.selected_item.attributes?.map(
        ({ attribute_name, attribute_value }) => ({
          name: attribute_name,
          value: attribute_value,
        }),
      ),
      detailedImages: product.selected_item.detailed_images,
    },
  };
};

const getBoolean = (value: string | undefined) => {
  return value === "Y";
};
