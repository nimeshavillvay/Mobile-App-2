import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShoppingCartList from "./shopping-cart-list";

const ShoppingCartListRoot = () => {
  const cookieStore = cookies();
  const accountToken = cookieStore.get(ACCOUNT_TOKEN_COOKIE);

  if (!accountToken?.value) {
    return redirect("/");
  }

  return <ShoppingCartList accountToken={accountToken.value} />;
};

export default ShoppingCartListRoot;
