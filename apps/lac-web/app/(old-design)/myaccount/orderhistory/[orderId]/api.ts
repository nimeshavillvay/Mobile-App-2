import { api } from "@/_lib/api";
import type { OldItemInfo } from "@/_lib/types";
import { mapGetItemInfoResponse } from "@/_mappers/get-item-info.mapper";
import "server-only";

export const getOrderDetail = async (orderId: string) => {
  const response = await api
    .get("rest/order-history/detail", {
      searchParams: {
        orderNo: orderId,
      },
      cache: "no-store",
    })
    .json<{
      orderNo: string;
      orderType: string;
      status: string;
      email: string;
      orderDate: string;
      orderBy: string;
      soldTo: string;
      shipTo: string;
      po: string;
      jobName: string;
      handlingFee: number;
      subTotal: number;
      orderTotal: number;
      tax: number;
      promoCode: string;
      paymentMethod: string;
      driverNotes: string;
      completeDelivery: boolean;
      shipToAddress: {
        "xc-addressid": string;
        "country-name": string;
        county: string;
        locality: string;
        organization: string;
        "phone-number": string;
        region: string;
        "street-address": string;
        "postal-code": string;
        zip4: string;
        soldto: string;
      };
      billToAddress: {
        "xc-addressid": string;
        "country-name": string;
        county: string;
        locality: string;
        organization: string;
        "phone-number": string;
        region: string;
        "street-address": string;
        "postal-code": string;
        zip4: string;
        "ship-to": string;
        default: boolean;
      };
      item: {
        sku: string;
        productid: string;
        totalQuantity: string;
        lineItems: {
          itemNo: string;
          sku: string;
          productid: string;
          itemDescription: string;
          itemTotalQuantity: string;
          price: number;
          deliveryDate: string | null;
          plant: string;
          shippingCondition: string;
          delivery: string;
          invoice: string;
          itemPo: string;
          promoCode: string;
          shipQuantity: string;
          boQty: number;
          boDate: string | null;
          itemStatus: string;
          descChanged: boolean;
          sapNo: string;
          categoryId: string;
          brandId: string;
          categoryName: string;
          brandName: string;
        }[];
        itemSubTotal: number;
        promoCode: string;
        itemNo: string;
        sapNo: string;
        price: number;
        itemPo: string;
        itemDescription: string;
        descriptionChanged: boolean;
      }[];
    }>();

  const transformedData = {
    orderNo: Number(response.orderNo),
    orderType: response.orderType,
    orderStatus: response.status,
    email: response.email,
    orderDate: response.orderDate ?? "",
    orderBy: response.orderBy,
    soldTo: response.soldTo,
    shipTo: response.shipTo,
    po: response.po,
    jobName: response.jobName,
    handlingFee: response.handlingFee,
    subTotal: response.subTotal,
    orderTotal: response.orderTotal,
    taxAmount: response.tax,
    promoCode: response.promoCode,
    paymentMethod: response.paymentMethod,
    driverNotes: response.driverNotes,
    completeDelivery: response.completeDelivery,
    shipToAddress: {
      attention: response.shipToAddress.organization,
      street: response.shipToAddress["street-address"],
      city: response.shipToAddress.locality,
      zip4: response.shipToAddress.zip4,
      zipCode: response.shipToAddress["postal-code"],
      country: response.shipToAddress["country-name"],
      county: response.shipToAddress.county,
      region: response.shipToAddress.region,
      phoneNumber: response.shipToAddress["phone-number"],
      soldTo: response.shipToAddress.soldto,
    },
    billToAddress: {
      attention: response.billToAddress.organization,
      street: response.billToAddress["street-address"],
      city: response.billToAddress.locality,
      zip4: response.billToAddress.zip4,
      zipCode: response.billToAddress["postal-code"],
      country: response.billToAddress["country-name"],
      county: response.billToAddress.county,
      region: response.billToAddress.region,
      phoneNumber: response.billToAddress["phone-number"],
      shipTo: response.billToAddress["ship-to"],
      default: response.billToAddress.default,
    },
    items: response?.item?.length
      ? response.item.map((item) => ({
          sku: item.sku,
          productId: Number(item.productid),
          totalQuantity: Number(item.totalQuantity),
          lineItems: item?.lineItems?.length
            ? item.lineItems.map((lineItem) => ({
                itemNo: lineItem.itemNo,
                sku: lineItem.sku,
                productId: Number(lineItem.productid),
                itemDescription: lineItem.itemDescription,
                itemTotalQuantity: lineItem.itemTotalQuantity,
                price: lineItem.price,
                deliveryDate: lineItem.deliveryDate ?? "",
                plant: lineItem.plant,
                shippingCondition: lineItem.shippingCondition,
                delivery: lineItem.delivery,
                invoice: lineItem.invoice,
                itemPo: lineItem.itemPo,
                promoCode: lineItem.promoCode,
                shipQuantity: Number(lineItem.shipQuantity),
                boQty: lineItem.boQty,
                boDate: lineItem.boDate ?? "",
                itemStatus: lineItem.itemStatus,
                descChanged: lineItem.descChanged,
                sapNo: lineItem.sapNo,
                categoryId: lineItem.categoryId,
                brandId: lineItem.brandId,
                categoryName: lineItem.categoryName,
                brandName: lineItem.brandName,
              }))
            : [],
          itemSubTotal: item.itemSubTotal,
          promoCode: item.promoCode,
          itemNo: item.itemNo,
          sapNo: item.sapNo,
          price: item.price,
          itemPo: item.itemPo,
          itemDescription: item.itemDescription,
          descriptionChanged: item.descriptionChanged,
        }))
      : [],
  };

  return transformedData;
};

export const getItemInfo = async (productIdList: number[]) => {
  const response = await api
    .get("rest/getiteminfo", {
      searchParams: { productids: productIdList.toString() },
      cache: "no-store",
    })
    .json<OldItemInfo[]>();

  const transformedData = mapGetItemInfoResponse(response);

  return transformedData;
};
