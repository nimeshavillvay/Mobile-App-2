"use client";

import { TooltipProvider } from "@repo/web-ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider as WrapBalancer } from "react-wrap-balancer";

type ProvidersProps = {
  readonly children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60000, // 1 min
          },
        },
      }),
  );

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <WrapBalancer>
            <TooltipProvider>{children}</TooltipProvider>
          </WrapBalancer>
        </ReactQueryStreamedHydration>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
