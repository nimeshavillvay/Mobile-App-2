"use client";

import { useToast } from "@repo/web-ui/components/ui/toast";
import { TooltipProvider } from "@repo/web-ui/components/ui/tooltip";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider as WrapBalancer } from "react-wrap-balancer";

type ProvidersProps = {
  readonly children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const router = useRouter();
  const { toast } = useToast();

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
        mutationCache: new MutationCache({
          onError: (error) => {
            // Redirect the user to the sign in page if they try to do a mutation
            // after the token has expired
            if (error?.response?.status === 403) {
              toast({
                title: "Session expired",
                description: "Please sign in again",
                variant: "destructive",
              });

              router.replace("/sign-in");
            }
          },
        }),
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
