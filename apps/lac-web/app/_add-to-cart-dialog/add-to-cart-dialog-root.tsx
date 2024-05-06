import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AddToCartDialog from "./add-to-cart-dialog";

const AddToCartDialogMain = () => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <AddToCartDialog token={sessionCookie.value} />;
};

const AddToCartDialogRoot = () => {
  return (
    <Suspense>
      <AddToCartDialogMain />
    </Suspense>
  );
};

export default AddToCartDialogRoot;
