import type { ReactNode } from "react";
import { YStack } from "tamagui";
import { AppBar } from "~/components/base/app-bar";

export const AppTab = ({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) => {
  return (
    <YStack flex={1} backgroundColor="white" testID="app-tab-container">
      <AppBar title={title} />
      {children}
    </YStack>
  );
};
