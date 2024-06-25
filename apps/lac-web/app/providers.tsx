"use client";

import { revalidateSiteLayout } from "@/_actions/revalidate";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { TooltipProvider } from "@repo/web-ui/components/ui/tooltip";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import Cookies from "js-cookie";
import { useRef, useState, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider as WrapBalancer } from "react-wrap-balancer";

type ProvidersProps = {
  readonly children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  // This ref is used to prevent multiple session expire toasts from showing up
  // and multiple redirects from happening
  const isHandlingSessionExpireRef = useRef(false);
  const { toast } = useToast();

  const handleNoSession = async () => {
    if (!isHandlingSessionExpireRef.current) {
      isHandlingSessionExpireRef.current = true;

      toast({
        title: "Session expired",
        description: "Please sign in again",
        variant: "destructive",
      });

      await revalidateSiteLayout("/sign-in");

      isHandlingSessionExpireRef.current = false;
    }
  };

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
          onSettled: () => {
            const sessionCookie = Cookies.get(SESSION_TOKEN_COOKIE);

            // If there is no session token, there's no point in the mutation as the
            // data won't be saved on the server
            if (!sessionCookie) {
              handleNoSession();
            }
          },
          onError: (error) => {
            // Redirect the user to the sign in page if they try to do a mutation
            // after the token has expired
            if (error?.response?.status === 403) {
              handleNoSession();
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

        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
