import { decode } from "html-entities";
import { api } from "~/lib/api";
import { getBoolean } from "~/lib/helpers";
import type { ApiConfig } from "~/lib/types";
import { relatedProductResultSchema } from "~/lib/zod-schema/related-products";

export const getRelatedProduct = async (
  { baseUrl, apiKey }: ApiConfig,
  productId: string,
) => {
  const response = await api
    .get(`rest/landingrelatedproduct/${productId}`, {
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

  const { data } = await relatedProductResultSchema.parseAsync(response);

  return data.map((results) => ({
    heading: results.heading,
    products: results.items.map((product) => ({
      productId: product.productid,
      isExcludedProduct: product.is_product_exclude,
      productSku: product.txt_wurth_lac_item,
      productName: decode(product.item_name),
      image: product.img,
      slug: product.slug,
      isComparison: !!product.is_comparison,
      isDirectlyShippedFromVendor:
        product.is_directly_shipped_from_vendor ?? false,
      isHazardous: getBoolean(product.txt_hazardous),
      specialShipping: product.txt_special_shipping,
      productIdOnSap: product.txt_sap,
      mfrPartNo: product.txt_mfn,
      productSummary: product.txt_description_name,
      productDescription: product.txt_sub_description,
      unitOfMeasure: product.txt_uom_label,
      boxQuantity: !isNaN(parseInt(product.txt_box_qt))
        ? parseInt(product.txt_box_qt)
        : 1,
      minimumOrderQuantity: !isNaN(parseInt(product.txt_min_order_amount))
        ? parseInt(product.txt_min_order_amount)
        : 1,
      quantityByIncrements: !isNaN(parseInt(product.txt_order_qty_increments))
        ? parseInt(product.txt_order_qty_increments)
        : 1,
      weight: Number(product.txt_weight_value),
      prop65MessageOne: product.txt_prop65_message_01,
      prop65MessageTwo: product.txt_prop65_message_02,
      prop65MessageThree: product.txt_prop65_message_03,
      listPrice: Number(product.list_price),
      isSaleItem: getBoolean(product.on_sale),
      isNewItem: getBoolean(product.is_new),
      onSale: getBoolean(product.on_sale),
      fClassId: Number(product.fclassid),
      productStatus: product.txt_x_pant_Mat_status,
    })),
  }));
};
