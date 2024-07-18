/* eslint-disable import/export */
import { render, type RenderOptions } from "@testing-library/react-native";
import { type ReactElement, type ReactNode } from "react";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";

const Providers = ({ children }: { readonly children: ReactNode }) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
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
