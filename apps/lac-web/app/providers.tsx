"use client";

import { api } from "@/_lib/api";
import { ApiProvider } from "@repo/shared-logic/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30 seconds
          },
        },
      }),
  );

  return (
    <CookiesProvider>
      <ApiProvider kyInstance={api}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </ApiProvider>
    </CookiesProvider>
  );
};

export default Providers;
