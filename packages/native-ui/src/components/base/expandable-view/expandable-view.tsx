import { LinearGradient } from "expo-linear-gradient";
import { type ComponentProps, type ReactNode, useState } from "react";
import { Button, View, YStack } from "tamagui";
import { convertToRGBA } from "~/lib/utils";

type ExpandableViewProps = {
  readonly maxHeight?: number;
  readonly blurDistance?: number;
  readonly blurColor?: string;
  readonly children: ReactNode;
} & ComponentProps<typeof View>;

export const ExpandableView = ({
  maxHeight = 200,
  blurDistance = 50,
  blurColor = "rgb(255,255,255)",
  children,
  ...delegated
}: ExpandableViewProps) => {
  const [expand, setExpand] = useState(false);
  const [height, setHeight] = useState(maxHeight);

  return (
    <YStack>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeight(height);
        }}
        maxHeight={!expand ? maxHeight : undefined}
        overflow="hidden"
        {...delegated}
      >
        {children}
        {!expand && height >= maxHeight && (
          <View
            position="absolute"
            bottom={-1}
            height={blurDistance}
            width="100%"
          >
            <LinearGradient
              colors={[
                convertToRGBA(blurColor, 0),
                convertToRGBA(blurColor, 1),
              ]}
              style={{ height: "100%", width: "100%" }}
              start={{ x: 0, y: -1 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        )}
      </View>
      <View backgroundColor={blurColor} height={20} />

      {height >= maxHeight && (
        <Button
          marginHorizontal={15}
          backgroundColor="white"
          borderWidth={1}
          borderColor="$gray8"
          onPress={() => setExpand(!expand)}
        >
          {expand ? "Show Less" : "Show More"}
        </Button>
      )}
    </YStack>
  );
};
