"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import { type ComponentProps } from "react";
import type { Attribute, Variant } from "../types";
import VariantRow from "./variant-row";

type VariationsTableProps = {
  product: ComponentProps<typeof VariantRow>["product"];
  attributes: Attribute[];
  variants: Variant[];
};

const VariationsTable = ({
  product,
  attributes,
  variants,
}: VariationsTableProps) => {
  const accountListQuery = useAccountList();

  return (
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
            product={product}
            variant={variant}
            attributes={attributes}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default VariationsTable;
