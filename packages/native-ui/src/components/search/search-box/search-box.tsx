import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import { Input, View, XStack } from "tamagui";

export const SearchBox = () => {
  const inputRef = useRef<Input>(null);

  return (
    <View
      flexBasis="auto"
      flexDirection="row"
      borderRadius={7}
      borderStyle="solid"
      borderWidth={1}
      borderColor="$gray8"
      paddingHorizontal={12}
      paddingVertical={2}
      paddingRight={20}
      alignItems="center"
      backgroundColor="$gray2Light"
    >
      <XStack alignItems="center" justifyContent="flex-start" width="90%">
        <AntDesign name="search1" size={20} color="#cccccc" />
        <Input
          ref={inputRef}
          placeholder="What are you looking for?"
          backgroundColor="$colorTransparent"
          borderWidth={0}
          overflow="hidden"
          width="100%"
          returnKeyType="search"
        />
      </XStack>
      <Feather
        name="x"
        size={20}
        style={{ marginLeft: "auto" }}
        onPress={() => inputRef.current?.clear()}
      />
    </View>
  );
};
