"use client";

import {
  PRIVATE_ROUTES,
  SESSION_TOKEN_COOKIE,
  TOKEN_MAX_AGE,
} from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const SessionChecker = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const sessionTokenQuery = useQuery({
    queryKey: ["session-checker"],
    queryFn: async () => {
      const cookies = new Cookies();
      const sessionCookie = cookies.get(SESSION_TOKEN_COOKIE);

      if (sessionCookie && typeof sessionCookie === "string") {
        return sessionCookie;
      }

      return null;
    },
    staleTime: 0,
    refetchInterval: (TOKEN_MAX_AGE / 10) * 1000,
  });

  useEffect(() => {
    if (!sessionTokenQuery.isFetching && sessionTokenQuery.data === null) {
      toast({
        title: "Session expired",
        variant: "destructive",
      });

      if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route))) {
        return router.replace("/sign-in");
      } else {
        return router.replace(pathname);
      }
    }
  }, [
    sessionTokenQuery.isFetching,
    sessionTokenQuery.data,
    pathname,
    router,
    toast,
  ]);

  return null;
};

export default SessionChecker;
