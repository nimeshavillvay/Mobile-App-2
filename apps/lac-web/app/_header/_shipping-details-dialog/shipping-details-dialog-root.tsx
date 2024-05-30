import { getShippingMethods } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ShippingDetailsDialog from "./shipping-details-dialog";

const ShippingDetailsDialogMain = async () => {
  const cookiesStore = cookies();
  const sessionCookies = cookiesStore.get(SESSION_TOKEN_COOKIE);

  const shippingMethods = await getShippingMethods();

  if (!sessionCookies?.value) {
    return null;
  }

  return (
    <ShippingDetailsDialog
      token={sessionCookies.value}
      shippingMethods={shippingMethods}
    />
  );
};

const ShippingDetailsDialogRoot = () => {
  return (
    <Suspense fallback={<Skeleton className="h-5 w-20" />}>
      <ShippingDetailsDialogMain />
    </Suspense>
  );
};

export default ShippingDetailsDialogRoot;
