import type { ReactNode } from "react";
import { ScrollView, YStack } from "tamagui";

export const SearchModalLayout = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  return (
    <ScrollView backgroundColor="white" flex={1} paddingHorizontal={12}>
      <YStack testID="search-modal-layout" flex={1} backgroundColor="white">
        {children}
      </YStack>
    </ScrollView>
  );
};
