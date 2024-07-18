import { type GetProps, YStack, styled } from "tamagui"; // or '@tamagui/core' if extending just that

export const Circle = styled(YStack, {
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100_000_000,
  overflow: "hidden",
});

export type CircleProps = GetProps<typeof Circle>;
