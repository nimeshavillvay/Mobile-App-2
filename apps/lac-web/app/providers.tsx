"use client";

import useAccountNo from "@/_hooks/account/use-account-no.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import useLogout from "@/_hooks/account/use-logout.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
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
  const [accountNo] = useAccountNo();
  const [addressId] = useAddressId();

  const logout = useLogout();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30 seconds
            retry: (failureCount, error) => {
              // Don't retry for certain error responses
              if (error?.response?.status === 401) {
                return false;
              }

              // Retry others just once
              return failureCount <= 1;
            },
          },
        },
        queryCache: new QueryCache({
          onError: async (error) => {
            // Refresh the account token
            if (
              error?.response?.status === 401 &&
              cookies.token &&
              accountNo &&
              addressId
            ) {
              try {
                const { token } = await selectAccount(
                  cookies.token,
                  accountNo,
                  addressId,
                );
                setCookies("account-token", token);
              } catch {
                // Completely logout if refresh account token fails
                logout();
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
