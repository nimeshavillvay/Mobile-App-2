"use client";

import Separator from "@/_components/separator";
import VisuallyHidden from "@/_components/visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { BiBarcodeReader } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import * as z from "zod";

const searchSchema = z.object({
  value: z.string(),
});
type SearchSchema = z.infer<typeof searchSchema>;

const Search = () => {
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchSchema) => {
    console.log("> data: ", data);
  };

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="border-brand-primary flex flex-1 flex-row items-center rounded border"
    >
      <Form.Field name="search" className="flex-1">
        <VisuallyHidden>
          <Form.Label>Search</Form.Label>
        </VisuallyHidden>

        <Form.Control asChild>
          <input
            {...register("value")}
            type="text"
            required
            placeholder="Search for product or scan a barcode..."
            className="w-full rounded border-0 bg-transparent"
          />
        </Form.Control>
      </Form.Field>

      <button type="button">
        <VisuallyHidden>Scan barcode</VisuallyHidden>

        <BiBarcodeReader />
      </button>

      <Separator
        orientation="vertical"
        className="bg-brand-light-gray w-px self-stretch"
      />

      <Form.Submit asChild>
        <button>
          <VisuallyHidden>Search</VisuallyHidden>

          <MdSearch />
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default Search;
