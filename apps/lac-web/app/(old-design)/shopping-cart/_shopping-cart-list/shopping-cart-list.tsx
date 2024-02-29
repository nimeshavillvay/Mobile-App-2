"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import VisuallyHidden from "@/old/_components/visually-hidden";
import useSuspenseCart from "@/old/_hooks/cart/use-suspense-cart.hook";
import { MdDeleteOutline } from "react-icons/md";
import ShoppingCartListRow from "./shopping-cart-list-row";

type ShoppingCartListProps = {
  accountToken: string;
};

const ShoppingCartList = ({ accountToken }: ShoppingCartListProps) => {
  const { data } = useSuspenseCart(accountToken);

  return (
    <Table className="mt-9">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>Product Description</TableHead>
          <TableHead className="text-center">Unit Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">UOM</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
          <TableHead>
            <button>
              <VisuallyHidden>Remove all items</VisuallyHidden>

              <MdDeleteOutline />
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.cartItems.map((item) => (
          <ShoppingCartListRow
            key={item.itemInfo.txt_wurth_lac_item}
            item={item}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ShoppingCartList;
