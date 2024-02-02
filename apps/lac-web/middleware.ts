import { TOKEN } from "@/_lib/constants";
import { getAccountList } from "@/_lib/shared-apis";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  // Check validity of token before accessing private routes
  if (request.nextUrl.pathname.startsWith("/myaccount")) {
    const tokenCookie = request.cookies.get(TOKEN);

    // If there is no token
    if (!tokenCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check validity
    try {
      await getAccountList(tokenCookie?.value);
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
