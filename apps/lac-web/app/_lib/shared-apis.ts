import { api } from "./api";

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
