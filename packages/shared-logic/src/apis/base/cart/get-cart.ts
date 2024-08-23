import { api } from "~/lib/api";
import { SPECIAL_SHIPPING_FLAG } from "~/lib/constants";
import { getBoolean } from "~/lib/helpers";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { cartSchema, type CartItemConfiguration } from "~/lib/zod-schema/cart";

const getConfigAvailability = (option: CartItemConfiguration) => {
  const plantAvailable: {
    plant: string | undefined | null;
    quantity: number | undefined;
    shippingMethod: string | undefined | null;
  }[] = [];

  for (let i = 1; i < 6; i++) {
    const plantKey = `plant_${i}` as keyof CartItemConfiguration;
    const quantityKey = `avail_${i}` as keyof CartItemConfiguration;
    const shippingMethodKey =
      `shipping_method_${i}` as keyof CartItemConfiguration;

    if (option[plantKey] && option[quantityKey]) {
      plantAvailable.push({
        plant: option[plantKey],
        quantity: Number(option[quantityKey]),
        shippingMethod: option[shippingMethodKey],
      });
    }
  }

  return plantAvailable;
};

export const getSimulationCheckout = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/cart", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await cartSchema.parseAsync(response);

  return {
    cartItems: parsedResponse.cartItems.map((item) => ({
      code: item.code,
      quantity: item.quantity,
      cartItemId: item.cart_item_id,
      configuration: item.configuration,
      mappedConfiguration: {
        availability: getConfigAvailability(item.configuration),
        willCallQuantity:
          Number(item.configuration.will_call_avail) ?? undefined,
        willCallPlant: item.configuration.will_call_plant,
        hashValue: item.configuration.hashvalue,
        selectedOption: item.configuration.selectedOption,
        backOrderAll: item.configuration.backorder_all,
        backOrderQuantity: Number(item.configuration.backorder_quantity),
        backOrderDate: item.configuration.backorder_date,
      },
      itemInfo: {
        productId: Number(item.itemInfo.productid),
        isExcludedProduct: item.itemInfo.is_product_exclude,
        productSku: item.itemInfo.txt_wurth_lac_item,
        productName: item.itemInfo.item_name,
        image: item.itemInfo.img,
        slug: item.itemInfo.slug,
        isComparison: !!item.itemInfo.is_comparison,
        isHazardous: getBoolean(item.itemInfo.txt_hazardous),
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
        minimumOrderQuantity: Number(item.itemInfo.txt_min_order_amount) ?? 1,
        quantityByIncrements:
          Number(item.itemInfo.txt_order_qty_increments) ?? 1,
        weight: Number(item.itemInfo.txt_weight_value),
        prop65MessageOne: item.itemInfo.txt_prop65_message_01,
        prop65MessageTwo: item.itemInfo.txt_prop65_message_02,
        prop65MessageThree: item.itemInfo.txt_prop65_message_03,
        metaTitle: item.itemInfo.txt_meta_title,
        listPrice: Number(item.itemInfo.list_price),
        isSaleItem: getBoolean(item.itemInfo.on_sale),
        isNewItem: getBoolean(item.itemInfo.is_new),
        fClassId: Number(item.itemInfo.fclassid),
        brandName: item.itemInfo.brand_name,
        groupCode: item.itemInfo.txt_group_code,
        productStatus: item.itemInfo.item_status,
        categoryName: item.itemInfo.category_name,
        isDirectlyShippedFromVendor:
          item.itemInfo.is_directly_shipped_from_vendor,
      },
    })),
    configuration: parsedResponse.configuration,
    mappedConfiguration: {
      poJob: parsedResponse.configuration.po_job,
      jobName: parsedResponse.configuration.jobName,
      coupon: parsedResponse.configuration.coupon,
      po: parsedResponse.configuration.po,
      soldTo: parsedResponse.configuration.sold_to,
      shipTo: parsedResponse.configuration.ship_to,
      userEmail: parsedResponse.configuration.user_email,
      isOverridden: parsedResponse.configuration.is_overridden,
      overriddenEmail: parsedResponse.configuration.overridden_email,
      osr: parsedResponse.configuration.osr,
      firstName: parsedResponse.configuration["first-name"],
      defaultShipping: parsedResponse.configuration.default_shipping,
      deliveringPlant: parsedResponse.configuration.delivering_plant,
      availablePaymentOptions:
        parsedResponse.configuration.avail_payment_options,
      attnName: parsedResponse.configuration.attnName,
      pickDate: parsedResponse.configuration.pickDate,
      driverNote: parsedResponse.configuration.driverNote,
      orderEmail: parsedResponse.configuration.orderEmail,
      completeDelivery: parsedResponse.configuration.completeDelivery,
      paymentToken: parsedResponse.configuration.paymentToken,
      cardName: parsedResponse.configuration.cardName,
      cardType: parsedResponse.configuration.cardType,
      expireDate: parsedResponse.configuration.expireDate,
      paymentMethod: parsedResponse.configuration.paymentMethod,
      isPrimaryShippingAddress:
        parsedResponse.configuration.isAPrimaryShippingAddress,
      shippingAddressId: parsedResponse.configuration.shippingAddressId,
    },
    totalQuantity: parsedResponse["total-quantity"],
    allRegionalExcluded: parsedResponse.allRegionalExluded,
  };
};
