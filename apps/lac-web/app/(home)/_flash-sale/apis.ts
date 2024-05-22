import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import "server-only";

type FeatureProduct = {
  productTitle: string;
  slug: string;
  txt_description_name: string;
  txt_mfn: string;
  txt_hazardous: string;
  txt_web_direct: string;
  txt_special_shipping: string;
  groupId: string;
  productId: string;
  group_img: string;
  product_img: string;
  sku: string;
  txt_uom: string;
  txt_uom_label: string;
  is_sale: boolean;
  is_new: boolean;
  min_order_amount: string;
  order_qty_increments: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  is_favourite: boolean;
  favoriteIds: string[];
};

export const getSaleItems = async (token?: string) => {
  const response = await api
    .get("rest/getfeatureproducts", {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      bestsellers: unknown[];
      featured: unknown[];
      on_sale: FeatureProduct[];
      quick_ship: unknown[];
    }>();

  return response.on_sale.map((data) => ({
    productTitle: data.productTitle,
    productDescription: data.txt_description_name,
    mfrPartNo: data.txt_mfn,
    isHazardous: data.txt_hazardous === "Y",
    isDirectlyShippedFromVendor: data.txt_web_direct === "Y",
    specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
      (flag) => flag === data.txt_special_shipping,
    ),
    groupId: Number(data.groupId),
    productId: data.productId,
    slug: data.slug,
    groupImage: data.group_img,
    productImage: data.product_img,
    productSku: data.sku,
    unitOfMeasure: data.txt_uom_label,
    isSaleItem: data.is_sale,
    isNewItem: data.is_new,
    minimumOrderQuantity: Number(data.min_order_amount) ?? 1,
    quantityByIncrements: Number(data.order_qty_increments) ?? 1,
    brandId: Number(data.brandId),
    brandName: data.brandName,
    categoryId: Number(data.categoryId),
    categoryName: data.categoryName,
    subCategoryId: Number(data.subCategoryId),
    subCategoryName: data.subCategoryName,
    isFavourite: !!data.is_favourite,
    favoriteIds: data.favoriteIds,
  }));
};
