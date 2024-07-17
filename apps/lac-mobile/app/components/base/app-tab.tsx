import { ReactNode } from "react";
import { YStack } from "tamagui";
import AppBar from "./app-bar";

const AppTab = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <YStack flex={1} backgroundColor="white">
      <AppBar title={title} />
      {children}
    </YStack>
  );
};

export default AppTab;
