import { ACCOUNT_TOKEN, TOKEN } from "@/_lib/constants";
import { getAccountList } from "@/_lib/shared-apis";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  // Check validity of token before accessing private routes
  if (
    request.nextUrl.pathname.startsWith("/myaccount") ||
    request.nextUrl.pathname.startsWith("/shopping-cart")
  ) {
    const tokenCookie = request.cookies.get(TOKEN);
    const accountTokenCookie = request.cookies.get(ACCOUNT_TOKEN);

    // If there is no token
    if (!tokenCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check validity
    try {
      await getAccountList(tokenCookie?.value);

      // Additional check for pages that need the account token
      if (
        !accountTokenCookie?.value &&
        request.nextUrl.pathname.startsWith("/shopping-cart")
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
