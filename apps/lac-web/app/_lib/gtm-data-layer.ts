import useItemInfo from "@/_hooks/product/use-item-info.hook";
import { sendGTMEvent } from "@next/third-parties/google";

export const AddToCartGTMDtaLayerPush = (
  productId: number,
  quantity: number,
) => {
  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];

  sendGTMEvent({
    event: "add_to_cart",
    addToCartData: {
      currency: "USD",
      value: "3.7800",
      items: [
        {
          item_id: itemInfo?.productId,
          item_sku: itemInfo?.productSku,
          item_name: itemInfo?.productName,
          item_brand: itemInfo?.brand,
          price: "3.7800",
          quantity: quantity,
          item_variant: '51-3/16" Plastic Bags', // todo: need clarification
          item_categoryid: itemInfo?.productCategory,
          item_primarycategory: "Dust Collectors and Air Filtration Systems",
          item_category: itemInfo?.productCategory,
          item_category1: "Dust Collectors and Air Filtration Systems",
        },
      ],
      page_type: "other",
    },
  });
};

type Products = {
  productId: number | undefined;
  quantity: number | null | undefined;
}[];

export const AddMultipleToCartGTMDtaLayerPush = (gtmData: Products) => {
  gtmData.map((item) => {
    AddToCartGTMDtaLayerPush(item.productId ?? 0, item.quantity ?? 0);
  });
};

export const GTMDataLayer = <T extends object>(gtmData: T) => {
  console.log(">> GTMDataLayer", gtmData);
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(gtmData);
  }
};
