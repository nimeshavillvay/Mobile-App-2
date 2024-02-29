import type { UOM, UOMLabel } from "@/old/_lib/types";

export type CarouselBanner = {
  id: number;
  slot: string;
  use_custom_link: number;
  custom_url: null | string;
  active: number;
  alt_tag: string;
  priority: number;
  file_name: string;
  file_path: string;
  pdf_file_name: string;
  pdf_file_path: string;
};

export type FeaturedProduct = {
  productTitle: string;
  txt_description_name: string;
  txt_mfn: string;
  txt_hazardous: "N";
  txt_web_direct: "N";
  txt_special_shipping: string;
  groupId: number;
  group_img: string;
  product_img: string;
  sku: string;
  txt_uom: UOM;
  txt_uom_label: UOMLabel;
  is_sale: boolean;
  is_new: boolean;
  min_order_amount: number;
  order_qty_increments: number;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  override_price?: string;
};
