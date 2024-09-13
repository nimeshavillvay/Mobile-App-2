"use client";

import { cn } from "@/_lib/utils";
import Separator from "@/old/_components/separator";
import VisuallyHidden from "@/old/_components/visually-hidden";
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
  readonly className?: string;
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
        "flex flex-row items-center gap-2.5 rounded-[10px] border border-brand-gray-400 pr-2.5 text-2xl leading-none text-brand-gray-400",
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
            className="w-full rounded-l-[10px] border-0 bg-transparent px-5 py-1.5 leading-6 text-black placeholder:text-brand-gray-400"
          />
        </Form.Control>
      </Form.Field>

      <button type="button" className="btnAction">
        <VisuallyHidden>Scan barcode</VisuallyHidden>

        <BiBarcodeReader />
      </button>

      <Separator
        orientation="vertical"
        className="h-[26px] w-px bg-brand-gray-200"
      />

      <Form.Submit asChild>
        <button className="btnAction">
          <VisuallyHidden>Search</VisuallyHidden>

          <MdSearch />
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default SearchBar;
