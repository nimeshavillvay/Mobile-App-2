"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { QUERY_KEYS } from "@/_lib/constants";
import { INIT_PAGE_NUMBER } from "@/osr/dashboard/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@repo/web-ui/components/icons/magnifying-glass";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LaminateSearch = () => {
  const searchParams = useSearchParams();

  const formSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get(QUERY_KEYS.SEARCH_TEXT) || "",
    },
  });

  const laminateSearch = (values: z.infer<typeof formSchema>) => {
    changeSearchParams(searchParams, [
      {
        key: QUERY_KEYS.SEARCH_TEXT,
        value: values.search,
      },
      {
        key: QUERY_KEYS.PAGE,
        value: INIT_PAGE_NUMBER,
      },
    ]);
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(laminateSearch)} className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for laminates"
                    type="text"
                    {...field}
                    className="border-wurth-gray-300 focus:border-wurth-blue-500 focus:ring-wurth-blue-200 border-1 h-12 rounded-full pr-12 text-lg focus:ring-1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="hover:text-wurth-blue-500 absolute right-2 top-1/2 -translate-y-1/2 transform text-wurth-gray-500"
          >
            <MagnifyingGlass className="h-6 w-6" />
            <span className="sr-only">Laminate Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LaminateSearch;
