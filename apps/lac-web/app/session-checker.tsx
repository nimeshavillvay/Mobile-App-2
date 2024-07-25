"use client";

import { TOKEN_EXPIRE_COOKIE } from "@/_lib/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";
import { Cookies } from "react-cookie";

dayjs.extend(isBetween);

const SessionChecker = () => {
  const HARD_RELOAD_BEFORE = 5; // 5 minutes
  const CHECK_INTERVAL = 60000; // 1 minute in milliseconds

  const checkTokenExpiration = () => {
    const cookies = new Cookies();
    const tokenExpire = cookies.get(TOKEN_EXPIRE_COOKIE);
    const tokenExpiryDate = dayjs(tokenExpire);
    const now = dayjs();

    if (tokenExpire) {
      const shouldRefreshToken =
        now.isAfter(tokenExpiryDate) ||
        now.isBetween(
          tokenExpiryDate.subtract(HARD_RELOAD_BEFORE, "minute"),
          tokenExpiryDate,
          "second",
        );

      if (shouldRefreshToken) {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    // Check token expiration immediately on mount
    checkTokenExpiration();

    // Check token expiration at regular intervals
    // TODO: Try to catch idle user in a better way. Check for performance optimizations.
    const interval = setInterval(checkTokenExpiration, CHECK_INTERVAL);

    // Handle visibility change to check token expiration when returning to the tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTokenExpiration();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
};

export default SessionChecker;
