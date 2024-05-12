import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ShippingAddressSelector from "./shipping-adddress-selector";

const ShippingAddressSelectorMain = () => {
  const cookiesStore = cookies();
  const sessionCookies = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookies?.value) {
    return null;
  }

  return <ShippingAddressSelector token={sessionCookies.value} />;
};

const ShippingAddressSelectorRoot = () => {
  return (
    <Suspense fallback={<Skeleton className="h-5 w-32" />}>
      <ShippingAddressSelectorMain />
    </Suspense>
  );
};

export default ShippingAddressSelectorRoot;
