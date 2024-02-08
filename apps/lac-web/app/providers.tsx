"use client";

import { logout } from "@/_actions/account";
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
import { useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { selectAccount } from "./_lib/shared-apis";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CookiesProvider>
      <ApiProvider kyInstance={api}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ApiProvider>
    </CookiesProvider>
  );
};

export default Providers;

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookies] = useCookies();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30 seconds
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
                setCookies("account-token", token);
              } catch {
                // Completely logout if refresh account token fails
                await logout();
              }
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
