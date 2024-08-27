import SalesRepresentative from "@/_components/sales-representative";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";

const SalesRepWrapper = () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  const token = sessionToken?.value;
  if (!token) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="h-72" />}>
      <SalesRepresentative token={token} />
    </Suspense>
  );
};

export default SalesRepWrapper;
