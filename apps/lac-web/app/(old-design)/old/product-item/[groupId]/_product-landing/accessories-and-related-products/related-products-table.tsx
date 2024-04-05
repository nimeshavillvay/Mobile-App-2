"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import { Fragment } from "react";
import RelatedProductRow from "./related-product-row";
import type { RelatedProduct } from "./types";

type RelatedProductsTableProps = {
  products: RelatedProduct[];
};

const RelatedProductsTable = ({ products }: RelatedProductsTableProps) => {
  const accountListQuery = useAccountList();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>Item description</TableHead>

          {!!accountListQuery.data && (
            <>
              <TableHead className="text-center">Price</TableHead>

              <TableHead>Quantity</TableHead>

              <TableHead>UOM</TableHead>
            </>
          )}

          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((section) => (
          <Fragment key={section.heading}>
            <TableRow>
              <TableCell
                colSpan={accountListQuery.data ? 6 : 3}
                className="bg-brand-gray-200 py-2 text-[18px] font-bold leading-6 text-black"
              >
                {section.heading}
              </TableCell>
            </TableRow>

            {section.items.map((item) => (
              <RelatedProductRow
                key={`${item.group_id}-${item.txt_wurth_lac_item}`}
                item={item}
              />
            ))}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default RelatedProductsTable;
