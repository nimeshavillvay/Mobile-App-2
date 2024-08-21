import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LayoutRevalidate from "./layout-revalidate";

// TODO: Delete this component after upgrading to Next.js 15
// Revalidate the entire site layout if the session token is
// no available. The token is not available to out of order
// streaming components when opening the site for the first time.
// This is a bug in Next.js 14.
// https://github.com/vercel/next.js/issues/49442
const ServerTokenRefresher = () => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  return <LayoutRevalidate token={sessionToken?.value} />;
};

const ServerTokenRefresherRoot = () => {
  return (
    <Suspense>
      <ServerTokenRefresher />
    </Suspense>
  );
};

export default ServerTokenRefresherRoot;
