"use client";

import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import {
  ACCOUNT_NO_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/_lib/constants";
import { ApiProvider } from "@repo/shared-logic/providers";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useRef, useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "./_components/ui/toaster";
import useLogout from "./_hooks/account/use-logout.hook";
import { selectAccount } from "./_lib/shared-apis";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CookiesProvider>
      <ApiProvider kyInstance={api}>
        <ReactQueryProvider>
          {children}

          <Toaster />
        </ReactQueryProvider>
      </ApiProvider>
    </CookiesProvider>
  );
};

export default Providers;

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const retryRef = useRef(false);
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
            if (!retryRef.current) {
              retryRef.current = true;

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

              retryRef.current = false;
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
