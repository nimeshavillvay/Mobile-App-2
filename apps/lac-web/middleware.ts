import { loginCheck } from "@/_hooks/user/use-suspense-check-login.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ONLY_ROUTES = [
  "/sign-in",
  "/register",
  "/forgot-password",
  "/password-reset",
];
const PRIVATE_ROUTES = ["/osr", "/checkout", "/confirmation", "/myaccount"];

export const middleware = async (request: NextRequest) => {
  // Exclude the following routes from the middleware
  if (request.nextUrl.pathname.endsWith("opengraph-image")) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_TOKEN_COOKIE);

  // Create new session token if it doesn't exist
  if (!sessionToken) {
    // TODO Find a better solution to this
    // Currently server components do not have the session token cookie
    // when opening the site for the first time, so we're using this
    // workaround to redirect the same page after setting the cookie
    // https://github.com/vercel/next.js/issues/49442#issuecomment-1538691004
    const response = NextResponse.redirect(request.url);
    const { tokenValue, cookieConfig } = await sessionTokenDetails();
    setSessionTokenCookie(response, { tokenValue, cookieConfig });

    return response;
  }

  // Refresh the token on page navigation and
  // check if the user is logged in
  const [{ tokenValue, cookieConfig }, loginCheckResponse] = await Promise.all([
    sessionTokenDetails(sessionToken.value),
    loginCheck(sessionToken?.value),
  ]);

  // Check for public routes
  const isPublicRoute = !!PUBLIC_ONLY_ROUTES.find((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  if (
    isPublicRoute &&
    sessionToken &&
    loginCheckResponse.status_code === "OK"
  ) {
    // Redirect to home page if the user tries to access
    // public only routes while logged in
    const response = setSessionTokenCookie(
      NextResponse.redirect(new URL("/", request.url)),
      { tokenValue, cookieConfig },
    );

    return response;
  }

  // Check for private routes
  const isPrivateRoute = !!PRIVATE_ROUTES.find((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  if (isPrivateRoute && sessionToken) {
    if (loginCheckResponse.status_code === "NOT_LOGGED_IN") {
      // Redirect to sign in page if user is not logged in
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      setSessionTokenCookie(response, { tokenValue, cookieConfig });

      return response;
    } else {
      // Do checks for individual routes

      // OSR Dashboard
      if (
        request.nextUrl.pathname.startsWith("/osr") &&
        !("sales_rep_id" in loginCheckResponse)
      ) {
        const response = NextResponse.redirect(new URL("/", request.url));
        setSessionTokenCookie(response, { tokenValue, cookieConfig });

        return response;
      }
    }
  }

  const response = NextResponse.next();
  setSessionTokenCookie(response, {
    tokenValue,
    cookieConfig,
  });

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

const sessionTokenDetails = async (existingToken?: string) => {
  const sessionResponse = await api.get("rest/session", {
    cache: "no-cache",
    credentials: "include",
    headers: existingToken
      ? { Authorization: `Bearer ${existingToken}` }
      : // Can't give "undefined" here because all existing headers get deleted
        { "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY },
  });

  let tokenValue = "";
  const cookieConfig: Partial<ResponseCookie> = {
    path: "/",
  };

  // Check for the session token cookie
  for (const header of sessionResponse.headers.entries()) {
    if (
      header[0] === "set-cookie" &&
      header[1].includes(`${SESSION_TOKEN_COOKIE}=`)
    ) {
      const keyValuePairs = header[1].split("; ");

      for (const pair of keyValuePairs) {
        const [key, value] = pair.split("=");

        if (key && value) {
          if (key === SESSION_TOKEN_COOKIE) {
            tokenValue = value;
            // } else if (key === "expires") {
            //   cookieConfig.expires = dayjs(value).toDate();
          } else if (key === "Max-Age") {
            cookieConfig.maxAge = parseInt(value);
          }
        }
      }
    }
  }

  return {
    tokenValue,
    cookieConfig,
  };
};
const setSessionTokenCookie = (
  response: NextResponse,
  {
    tokenValue,
    cookieConfig,
  }: {
    tokenValue: string;
    cookieConfig: Partial<ResponseCookie>;
  },
) => {
  response.cookies.set(SESSION_TOKEN_COOKIE, tokenValue, cookieConfig);
};
