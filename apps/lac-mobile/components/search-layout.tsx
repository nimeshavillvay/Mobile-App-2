import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { SearchBox } from "@repo/native-ui/components/search/search-box";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { Form, VisuallyHidden } from "tamagui";
import { SearchModalLayout } from "~/components/search/search-modal-layout";

export const SearchLayout = () => {
  const ref = useRef<TextInput>(null);

  const form = useForm<{ searchInput: string }>();
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
              {...form.register("searchInput")}
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
