import { loginCheck } from "@/_hooks/user/use-suspense-check-login.hook";
import { api } from "@/_lib/api";
import {
  PRIVATE_ROUTES,
  SESSION_TOKEN_COOKIE,
  TOKEN_EXPIRE_COOKIE,
  TOKEN_MAX_AGE,
} from "@/_lib/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Logger } from "next-axiom";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  NextResponse,
  userAgent,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

dayjs.extend(isBetween);

const PUBLIC_ONLY_ROUTES = [
  "/sign-in",
  "/register",
  "/forgot-password",
  "/password-reset",
];

export const middleware = async (
  request: NextRequest,
  event: NextFetchEvent,
) => {
  const logger = new Logger({ source: "middleware" }); // traffic, request
  logger.middleware(request);

  event.waitUntil(logger.flush());

  const sessionToken = request.cookies.get(SESSION_TOKEN_COOKIE);
  const tokenExpire = request.cookies.get(TOKEN_EXPIRE_COOKIE);

  const { isBot } = userAgent(request);

  const isPrivateRoute = !!PRIVATE_ROUTES.find((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Don't do any of the session checks for bots
  if (isBot) {
    // Redirect the bot to the home page
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/no-bot", request.url));
    }

    return NextResponse.next();
  }

  // Get new session token just in case
  const { tokenValue: newTokenValue } = await sessionTokenDetails();

  const actualTokenValue = sessionToken?.value ?? newTokenValue;
  const actualExpireValue =
    tokenExpire?.value ?? dayjs().add(TOKEN_MAX_AGE, "seconds").toISOString();

  // Refresh the token on page navigation and
  // check if the user is logged in
  const [{ tokenValue, cookieConfig }, loginCheckResponse] = await Promise.all([
    sessionTokenDetails(actualTokenValue),
    loginCheck(actualTokenValue),
  ]);

  const isForcePasswordReset = loginCheckResponse?.change_password;
  if (
    isForcePasswordReset &&
    !request.nextUrl.pathname.startsWith("/password-reset")
  ) {
    return NextResponse.redirect(
      new URL(
        `/password-reset?user=${loginCheckResponse?.user.user_id}`,
        request.url,
      ),
    );
  }

  // Refresh the token only if it's close to expiring.
  // We shouldn't refresh it on every page navigation, because it makes the TanStack
  // Query cache useless.
  const shouldRefreshToken = dayjs().isBetween(
    dayjs(actualExpireValue).subtract(TOKEN_MAX_AGE / 4, "seconds"),
    dayjs(actualExpireValue),
    "seconds",
  );

  // Check for public routes
  const isPublicRoute = !!PUBLIC_ONLY_ROUTES.find((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  if (
    !isForcePasswordReset &&
    isPublicRoute &&
    sessionToken &&
    loginCheckResponse?.status_code === "OK"
  ) {
    // Redirect to home page if the user tries to access
    // public only routes while logged in
    const response = NextResponse.redirect(new URL("/", request.url));
    if (shouldRefreshToken) {
      setSessionTokenCookie(response, { tokenValue, cookieConfig });
    }

    return response;
  }

  // Check for private routes
  if (!isForcePasswordReset && isPrivateRoute && sessionToken) {
    if (loginCheckResponse?.status_code === "NOT_LOGGED_IN") {
      // Redirect to sign in page if user is not logged in
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      if (shouldRefreshToken) {
        setSessionTokenCookie(response, { tokenValue, cookieConfig });
      }

      return response;
    } else {
      // Do checks for individual routes

      // OSR Dashboard
      if (
        request.nextUrl.pathname.startsWith("/osr") &&
        !(loginCheckResponse && "sales_rep_id" in loginCheckResponse)
      ) {
        const response = NextResponse.redirect(new URL("/", request.url));
        if (shouldRefreshToken) {
          setSessionTokenCookie(response, { tokenValue, cookieConfig });
        }

        return response;
      }
    }
  }

  const response = NextResponse.next();
  if (shouldRefreshToken || !sessionToken || !tokenExpire) {
    setSessionTokenCookie(response, { tokenValue, cookieConfig });
  }

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
     * - robots.txt (robots.txt file)
     * - monitoring (Sentry monitoring)
     * - autodiscover/autodiscover.xml (Outlook)
     * - storefront (Storefront)
     * - no-bot (the page when bots try to access private routes)
     * and those containing these in the pathname:
     * - sitemap (sitemap files)
     * - opengraph-image (Open Graph images)
     * - .html (HTML files)
     * - .php (PHP files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*sitemap|.*opengraph-image|monitoring|autodiscover/autodiscover.xml|.*html|.*php|storefront|no-bot).*)",
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
  response.cookies.set(
    TOKEN_EXPIRE_COOKIE,
    dayjs()
      .add(cookieConfig.maxAge ?? TOKEN_MAX_AGE, "seconds")
      .toISOString(),
    cookieConfig,
  );
};
