import type { ReactNode } from "react";
import { ScrollView, YStack } from "tamagui";

export const ScreenLayout = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  return (
    <ScrollView flex={1} backgroundColor="white">
      <YStack flex={1} backgroundColor="white" testID="screen-layout-container">
        {children}
      </YStack>
    </ScrollView>
  );
};
