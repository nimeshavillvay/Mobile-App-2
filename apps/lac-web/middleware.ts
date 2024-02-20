import {
  ACCOUNT_NO_COOKIE,
  ACCOUNT_TOKEN_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/_lib/constants";
import {
  getAccountList,
  selectAccount,
  verifyAccountToken,
} from "@/_lib/shared-apis";
import { NextResponse, type NextRequest } from "next/server";

const redirectToHome = (request: NextRequest) => {
  // Delete all cookies
  request.cookies.delete([
    TOKEN_COOKIE,
    ACCOUNT_TOKEN_COOKIE,
    ACCOUNT_NO_COOKIE,
    ADDRESS_ID_COOKIE,
  ]);

  return NextResponse.redirect(new URL("/", request.url));
};

export const middleware = async (request: NextRequest) => {
  // Check validity of token before accessing private routes
  if (
    request.nextUrl.pathname.startsWith("/myaccount") ||
    request.nextUrl.pathname.startsWith("/shopping-cart")
  ) {
    const tokenCookie = request.cookies.get(TOKEN_COOKIE);

    // If there is no token
    if (!tokenCookie?.value) {
      return redirectToHome(request);
    }

    // Check validity
    try {
      await getAccountList(tokenCookie.value);

      // Additional check for pages that need the account token
      if (
        request.nextUrl.pathname.startsWith("/myaccount") ||
        request.nextUrl.pathname.startsWith("/shopping-cart")
      ) {
        const accountTokenCookie = request.cookies.get(ACCOUNT_TOKEN_COOKIE);
        const accountNoCookie = request.cookies.get(ACCOUNT_NO_COOKIE);
        const addressIdCookie = request.cookies.get(ADDRESS_ID_COOKIE);

        if (accountTokenCookie?.value) {
          try {
            // Verify token
            await verifyAccountToken(accountTokenCookie.value);
          } catch {
            // If it fails try to refresh it
            if (accountNoCookie?.value && addressIdCookie?.value) {
              const { token } = await selectAccount(
                tokenCookie.value,
                accountNoCookie.value,
                addressIdCookie.value,
              );
              request.cookies.set(ACCOUNT_TOKEN_COOKIE, token);
            } else {
              return redirectToHome(request);
            }
          }
        } else if (accountNoCookie?.value && addressIdCookie?.value) {
          // If the account token doesn't exist but the Account No and
          // Address ID do, try to get a new account token
          const { token } = await selectAccount(
            tokenCookie.value,
            accountNoCookie.value,
            addressIdCookie.value,
          );
          request.cookies.set(ACCOUNT_TOKEN_COOKIE, token);
        } else {
          return redirectToHome(request);
        }
      }
    } catch {
      return redirectToHome(request);
    }
  }

  return NextResponse.next();
};
