import { api } from "./api";
import type { Address } from "./types";

export const getAccountList = async (token: string) => {
  return await api
    .get("am/account-list", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .json<{
      accounts: {
        isAssociate: boolean;
        name: string;
        "account-no": string;
        addresses: Address[];
        "billing-address": Address;
      }[];
      "given-name": string;
      "family-name": string;
      isOsr: boolean;
    }>();
};

export const selectAccount = async (
  token: string,
  accountNo: string,
  shipTo: string,
) => {
  return await api
    .post("am/account-select", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      json: { accountNo, "ship-to": shipTo },
    })
    .json<{
      permission: string;
      token: string;
    }>();
};

export const verifyAccountToken = async (token: string) => {
  return await api
    .get("am/token_check", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .json<"OK">();
};

export const checkAvailability = async (
  token: string,
  sku: string,
  quantity: number,
) => {
  return await api
    .post("pim/webservice/ecommerce/availability-check", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: { skuidqty: [{ sku, quantity }] },
    })
    .json<
      [
        {
          options: [
            {
              backOrder: string;
              index: string;
              plant_1: string;
              quantity_1: string;
              shippingMethods_1: string;
              type: string;
              hash: string;
            },
          ];
          price: number;
          sku: string;
          status: string;
          willcallanywhere: unknown;
          xplant: string;
        },
      ]
    >();
};
