"use client";

import { api } from "@/_lib/api";
import { ApiProvider } from "@repo/shared-logic/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

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
    <ApiProvider kyInstance={api}>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApiProvider>
  );
};

export default Providers;
