import { api } from "@/_lib/api";
import { SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import type { CartConfiguration, CartItemConfiguration } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const getConfigAvailability = (option: CartItemConfiguration) => {
  const plantAvailable: {
    plant: string | undefined;
    quantity: number | undefined;
    shippingMethod: string | undefined;
  }[] = [];

  for (let i = 1; i < 6; i++) {
    const plantKey = `plant_${i}` as keyof CartItemConfiguration;
    const quantityKey = `avail_${i}` as keyof CartItemConfiguration;
    const shippingMethodKey =
      `shipping_method_${i}` as keyof CartItemConfiguration;

    plantAvailable.push({
      plant: option[plantKey],
      quantity: Number(option[quantityKey]),
      shippingMethod: option[shippingMethodKey],
    });
  }

  return plantAvailable;
};

const useSuspenseCart = () => {
  return useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await api
        .get("rest/cart", {
          cache: "no-cache",
        })
        .json<{
          cartItems: {
            code: string;
            quantity: number;
            cartid: number;
            configuration: CartItemConfiguration;
            itemInfo: {
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
              txt_prop65_message_01: string;
              txt_prop65_message_02: null;
              txt_prop65_message_03: null;
              txt_meta_title: string;
              txt_upc1: string;
              txt_seo_meta_description: string;
              txt_keywords: string;
              list_price: string;
              on_sale: string;
              fclassid: null;
              brand_name: string;
              txt_group_code: null;
              item_status: null;
              category_name: string;
              product_summary: string;
              is_directly_shipped_from_vendor: boolean;
            };
          }[];
          configuration: CartConfiguration;
          "total-quantity": number;
        }>();
    },
    select: (data) => {
      return {
        cartItems: data.cartItems.map((item) => ({
          code: item.code,
          quantity: item.quantity,
          cartId: item.cartid,
          configuration: item.configuration,
          mappedConfiguration: {
            availability: getConfigAvailability(item.configuration),
            willCallQuantity:
              Number(item.configuration.will_call_avail) ?? undefined,
            willCallPlant: item.configuration.will_call_plant,
            hashValue: item.configuration.hashvalue,
            selectedOption: item.configuration.selectedOption,
            backOrderAll: item.configuration.backorder_all,
          },
          itemInfo: {
            productId: Number(item.itemInfo.productid),
            isExcludedProduct: item.itemInfo.is_product_exclude,
            productSku: item.itemInfo.txt_wurth_lac_item,
            productName: item.itemInfo.item_name,
            image: item.itemInfo.img,
            slug: item.itemInfo.url,
            isFavourite: !!item.itemInfo.is_favourite,
            isComparison: !!item.itemInfo.is_comparison,
            isHazardous: item.itemInfo.txt_hazardous === "Y",
            specialShipping: SPECIAL_SHIPPING_FLAG.includes(
              item.itemInfo.txt_special_shipping,
            ),
            productIdOnSap: item.itemInfo.txt_sap,
            mfrPartNo: item.itemInfo.txt_mfn,
            productSummary: item.itemInfo.txt_description_name,
            productDescription: item.itemInfo.txt_sub_description,
            brandCode: item.itemInfo.sel_assigned_brand,
            unitOfMeasure: item.itemInfo.txt_uom_label,
            boxQuantity: Number(item.itemInfo.txt_box_qt) ?? 1,
            minimumOrderQuantity:
              Number(item.itemInfo.txt_min_order_amount) ?? 1,
            quantityByIncrements:
              Number(item.itemInfo.txt_order_qty_increments) ?? 1,
            weight: Number(item.itemInfo.txt_weight_value),
            prop65MessageOne: item.itemInfo.txt_prop65_message_01,
            prop65MessageTwo: item.itemInfo.txt_prop65_message_02,
            prop65MessageThree: item.itemInfo.txt_prop65_message_03,
            metaTitle: item.itemInfo.txt_meta_title,
            listPrice: Number(item.itemInfo.list_price),
            isSaleItem: item.itemInfo.on_sale === "Y",
            fClassId: Number(item.itemInfo.fclassid),
            brandName: item.itemInfo.brand_name,
            groupCode: item.itemInfo.txt_group_code,
            productStatus: item.itemInfo.item_status,
            categoryName: item.itemInfo.category_name,
            isDirectlyShippedFromVendor:
              item.itemInfo.is_directly_shipped_from_vendor,
          },
        })),
        configuration: data.configuration,
        mappedConfiguration: {
          poJob: data.configuration.po_job,
          jobName: data.configuration.jobName,
          coupon: data.configuration.coupon,
          po: data.configuration.po,
          soldTo: data.configuration.sold_to,
          shipTo: data.configuration.ship_to,
          userEmail: data.configuration.user_email,
          isOverridden: data.configuration.is_overridden,
          overriddenEmail: data.configuration.overridden_email,
          osr: data.configuration.osr,
          firstName: data.configuration["first-name"],
          deliveringPlant: data.configuration.delivering_plant,
          availablePaymentOptions: data.configuration.avail_payment_options,
          attnName: data.configuration.attnName,
          pickDate: data.configuration.pickDate,
          driverNote: data.configuration.driverNote,
          orderEmail: data.configuration.orderEmail,
          completeDelivery: data.configuration.completeDelivery,
          paymentToken: data.configuration.paymentToken,
          cardName: data.configuration.cardName,
          cardType: data.configuration.cardType,
          expireDate: data.configuration.expireDate,
          paymentMethod: data.configuration.paymentMethod,
          isPrimaryShippingAddress:
            data.configuration.isAPrimaryShippingAddress,
          shippingAddressId: data.configuration.shippingAddressId,
        },
        totalQuantity: data["total-quantity"],
      };
    },
  });
};

export default useSuspenseCart;