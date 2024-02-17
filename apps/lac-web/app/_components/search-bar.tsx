"use client";

import Separator from "@/_components/separator";
import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
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

type SearchBarProps = {
  className?: string;
};

const SearchBar = ({ className }: SearchBarProps) => {
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchSchema) => {
    console.log("> data: ", data);
  };

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "border-brand-gray-400 text-brand-gray-400 flex flex-row items-center gap-2.5 rounded-[10px] border pr-2.5 text-2xl leading-none",
        className,
      )}
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
            className="placeholder:text-brand-gray-400 w-full rounded-l-[10px] border-0 bg-transparent px-5 py-1.5 leading-6 text-black"
          />
        </Form.Control>
      </Form.Field>

      <button type="button">
        <VisuallyHidden>Scan barcode</VisuallyHidden>

        <BiBarcodeReader />
      </button>

      <Separator
        orientation="vertical"
        className="bg-brand-gray-200 h-[26px] w-px"
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

export default SearchBar;