import { api } from "./api";
import type { Address } from "./types";

export const getAccountList = async (token: string) => {
  return await api
    .get("am/account-list", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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
      body: JSON.stringify({ accountNo, "ship-to": shipTo }),
    })
    .json<{
      permission: string;
      token: string;
    }>();
};
