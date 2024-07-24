import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { SearchBox } from "@repo/native-ui/components/search/search-box";
import { SearchModalLayout } from "@repo/native-ui/components/search/search-modal-layout";
import { SearchProduct } from "@repo/native-ui/components/search/suggestion/search-product";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { Form, VisuallyHidden } from "tamagui";
import { z } from "zod";

const searchSchema = z.object({
  searchInput: z.string(),
});

const SearchLayout = () => {
  const ref = useRef<TextInput>(null);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    values: {
      searchInput: "",
    },
  });
  const searchTerm = form.watch("searchInput");

  const clearSearchTerm = () => {
    ref.current?.clear();
  };

  const onSubmit = () => {
    console.log(searchTerm);
  };

  return (
    <SearchModalLayout>
      <ScreenHeader title="Search" type="search" />
      <Form>
        <Controller
          control={form.control}
          name="searchInput"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <SearchBox
              testID="search-input"
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
              placeholder="What are you looking for?"
              ref={ref}
              onSubmit={onSubmit}
              onClear={clearSearchTerm}
            />
          )}
        />
      </Form>

      {/*
      Just adding this to stop linter complaining about unused variable.
      This will be used to query the search api 
      */}
      <VisuallyHidden>{searchTerm}</VisuallyHidden>
    </SearchModalLayout>
  );
};

export default SearchLayout;
