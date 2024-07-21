/* eslint-disable import/export */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react-native";
import { type ReactElement, type ReactNode } from "react";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";

const queryClient = new QueryClient({
  defaultOptions: {
    // Set "gcTime" to 0 to stop Jest from complaining,
    // "This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue."
    // https://github.com/TanStack/query/issues/1847#issuecomment-1325196926
    queries: {
      gcTime: 0,
      retry: false,
    },
    mutations: {
      gcTime: 0,
      retry: false,
    },
  },
});

const Providers = ({ children }: { readonly children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </QueryClientProvider>
  );
};

const customRender = (component: ReactElement, options?: RenderOptions) => {
  return render(component, {
    wrapper: Providers,
    ...options,
  });
};

export * from "@testing-library/react-native";

// override render method
export { customRender as render };
