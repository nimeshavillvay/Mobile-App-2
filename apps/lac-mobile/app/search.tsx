import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { SearchBox } from "@repo/native-ui/components/search/search-box";
import { SearchModalLayout } from "@repo/native-ui/components/search/search-modal-layout";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Form, View } from "tamagui";
import { z } from "zod";

const searchSchema = z.object({
  searchInput: z.string(),
});

const Search = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    values: {
      searchInput: "",
    },
  });

  const clearSearchTerm = () => {
    form.reset();
  };

  const handleSubmit = form.handleSubmit((data) => {
    const searchParams = new URLSearchParams({
      query: data.searchInput,
    });

    router.replace(`/search-results?${searchParams.toString()}`);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader title="Search" type="search" />
      <Form style={{ paddingHorizontal: 12 }}>
        <Controller
          control={form.control}
          name="searchInput"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <SearchBox
              testID="search-input"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="What are you looking for?"
              onSubmit={handleSubmit}
              onClear={clearSearchTerm}
            />
          )}
        />
      </Form>
      <SearchModalLayout>
        <View />
      </SearchModalLayout>
    </SafeAreaView>
  );
};

export default Search;
