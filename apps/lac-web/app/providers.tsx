"use client";

import { TooltipProvider } from "@repo/web-ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider as WrapBalancer } from "react-wrap-balancer";

type ProvidersProps = {
  readonly children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CookiesProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </CookiesProvider>
  );
};

export default Providers;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60000, // 1 min
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};

const ReactQueryProvider = ({ children }: { readonly children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WrapBalancer>
          <TooltipProvider>{children}</TooltipProvider>
        </WrapBalancer>
      </ReactQueryStreamedHydration>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
