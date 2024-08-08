"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "@/osr/dashboard/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@repo/web-ui/components/icons/magnifying-glass";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
    <div className="col-span-1 flex flex-row items-center rounded border border-wurth-gray-250">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(laminateSearch)}>
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
                  />
                </FormControl>

                <FormDescription className="sr-only">
                  Search for laminates
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="mx-0.5 rounded px-2 text-wurth-gray-500"
          >
            <MagnifyingGlass className="size-5" />
            <span className="sr-only">Laminate Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LaminateSearch;
