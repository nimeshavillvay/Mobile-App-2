"use client";

import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import { useId, useState } from "react";
import { MdClose } from "react-icons/md";
import type { Attribute, Variant } from "../types";
import VariantRow from "./variant-row";

type VariationsTableProps = {
  attributes: Attribute[];
  variants: Variant[];
};

const VariationsTable = ({ attributes, variants }: VariationsTableProps) => {
  const id = useId();
  const accountListQuery = useAccountList();

  const [filters, setFilters] = useState<{
    [slug: string]: string | undefined;
  }>({});

  const addFilter = (slug: string, value: string) => {
    const newFilters = structuredClone(filters);
    newFilters[slug] = value;
    setFilters(newFilters);
  };

  const removeFilter = (slug: string) => {
    const newFilters = structuredClone(filters);
    delete newFilters[slug];
    setFilters(newFilters);
  };

  const activeFiltersSlugs = Object.keys(filters);
  const activeFilters = attributes
    .filter((attribute) => activeFiltersSlugs.includes(attribute.slug))
    .map((attribute) => {
      const filter = attribute.variations.find(
        (variation) => variation.id === filters[attribute.slug],
      );

      return {
        slug: attribute.slug,
        id: filter?.id ?? "",
        value: filter?.value ?? "",
      };
    });

  return (
    <>
      <div className="mb-4 flex flex-row items-center gap-6">
        <div className="font-bold leading-6 text-brand-gray-500">
          Available Options
        </div>

        {attributes.map((attribute) => (
          <div
            key={attribute.slug}
            className="flex flex-row items-center gap-3"
          >
            <Label
              htmlFor={`${attribute.slug}-${id}`}
              className="text-nowrap text-sm font-bold leading-[18px] text-brand-gray-500"
            >
              {attribute.name}
            </Label>

            <Select
              value={filters[attribute.slug]}
              onValueChange={(value) => addFilter(attribute.slug, value)}
            >
              <SelectTrigger
                id={`${attribute.slug}-${id}`}
                className="h-7 min-w-32 px-1.5"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                {attribute.variations.map((variation) => (
                  <SelectItem key={variation.id} value={variation.id}>
                    {variation.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {!!activeFilters.length && (
        <div className="mb-1 flex flex-row items-center gap-1 bg-brand-gray-200 p-2.5">
          <div className="text-brand-gray-500">Active Filters</div>

          {activeFilters.map((filter) => (
            <button
              key={filter.slug}
              className="flex flex-row items-center gap-1 rounded-sm bg-white px-2.5 py-[5px] text-base font-bold text-black shadow-sm"
              onClick={() => removeFilter(filter.slug)}
            >
              <MdClose />

              <span>{filter.value}</span>
            </button>
          ))}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item # / MFR Part #</TableHead>

            {attributes.map((attribute) => (
              <TableHead key={attribute.slug} className="text-center">
                {attribute.name.trim()}
              </TableHead>
            ))}

            {!!accountListQuery.data && (
              <>
                <TableHead className="text-center">Price</TableHead>

                <TableHead className="text-left">Quantity</TableHead>
              </>
            )}

            <TableHead className="text-left">UOM</TableHead>

            <TableHead>
              {accountListQuery.data ? "Stock Availability" : ""}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variants.map((variant) => (
            <VariantRow
              key={variant.txt_wurth_lac_item}
              variant={variant}
              attributes={attributes}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default VariationsTable;
