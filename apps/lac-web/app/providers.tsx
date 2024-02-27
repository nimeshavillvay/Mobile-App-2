"use client";

import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import {
  ACCOUNT_NO_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/old/_lib/constants";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import useLogout from "./(old-design)/_hooks/account/use-logout.hook";
import { selectAccount } from "./(old-design)/_lib/shared-apis";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CookiesProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </CookiesProvider>
  );
};

export default Providers;

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cookies, setCookies] = useCookies();
  const logout = useLogout();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 600000, // 10 mins
            retry: (failureCount) => {
              // Don't retry for certain error responses
              // Temporarily disable check due to this error
              // https://github.com/sindresorhus/ky/issues/513
              // if (error?.response?.status === 401) {
              //   return false;
              // }

              // Retry others just once
              return failureCount <= 1;
            },
          },
        },
        queryCache: new QueryCache({
          onError: async () => {
            // Refresh the account token
            if (!isRefreshing) {
              setIsRefreshing(true);

              if (
                // Temporarily disable check due to this error
                // https://github.com/sindresorhus/ky/issues/513
                // error?.response?.status === 401 &&
                cookies[TOKEN_COOKIE] &&
                cookies[ACCOUNT_NO_COOKIE] &&
                cookies[ADDRESS_ID_COOKIE]
              ) {
                try {
                  const { token } = await selectAccount(
                    cookies[TOKEN_COOKIE],
                    cookies[ACCOUNT_NO_COOKIE],
                    cookies[ADDRESS_ID_COOKIE],
                  );
                  setCookies("account-token", token, { path: "/" });
                } catch {
                  // Completely logout if refresh account token fails
                  logout();
                }
              } else {
                logout();
              }

              setIsRefreshing(false);
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
