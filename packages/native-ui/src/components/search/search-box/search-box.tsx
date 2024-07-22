import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef } from "react";
import type { TextInput, TextInputProps } from "react-native";
import { Input, View, XStack } from "tamagui";

type SearchInputProps = TextInputProps & {
  readonly onClear: () => void;
};

export const SearchBox = forwardRef<TextInput, SearchInputProps>(
  ({ onChangeText, onClear }, ref) => {
    return (
      <View
        testID="search-box-container"
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
        <XStack
          testID="search-box-xstack"
          alignItems="center"
          justifyContent="flex-start"
          width="90%"
        >
          <AntDesign
            testID="search-icon"
            name="search1"
            size={20}
            color="#cccccc"
          />
          <Input
            testID="search-input"
            ref={ref}
            onChangeText={onChangeText}
            placeholder="What are you looking for?"
            backgroundColor="$colorTransparent"
            borderWidth={0}
            overflow="hidden"
            width="100%"
            returnKeyType="search"
          />
        </XStack>
        <Feather
          testID="clear-icon"
          name="x"
          size={20}
          style={{ marginLeft: "auto" }}
          onPress={onClear}
        />
      </View>
    );
  },
);

SearchBox.displayName = "SearchBox";
