"use client";

import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import VisuallyHidden from "@/_components/visually-hidden";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { MdDeleteOutline } from "react-icons/md";

type ShoppingCartListProps = {
  accountToken: string;
};

const ShoppingCartList = ({ accountToken }: ShoppingCartListProps) => {
  const id = useId();
  const { data } = useSuspenseCart(accountToken);

  return (
    <Table className="mt-9">
      <TableHeader>
        <TableRow>
          <TableHead>Product Description</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">UOM</TableHead>
          <TableHead>Subtotal</TableHead>
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
          <TableRow key={item.itemInfo.txt_wurth_lac_item}>
            <TableCell className="flex flex-row items-stretch gap-3">
              <Link
                href={`/product-item/${item.itemInfo.groupId}/${item.itemInfo.txt_wurth_lac_item}`}
              >
                <Image
                  src={getMediaUrl(item.itemInfo.img)}
                  alt={item.itemInfo.txt_sub_description}
                  width={92}
                  height={92}
                  className="border-brand-gray-200 size-[92px] border object-contain"
                />
              </Link>

              <div className="flex flex-col gap-0.5">
                <Link
                  href={`/product-item/${item.itemInfo.groupId}/${item.itemInfo.txt_wurth_lac_item}`}
                  className="text-brand-gray-500 text-sm"
                >
                  Item#: {item.itemInfo.txt_wurth_lac_item}
                </Link>

                <h4 className="font-bold">
                  {item.itemInfo.txt_description_name}
                </h4>

                <VisuallyHidden>
                  <Label
                    htmlFor={`jobName-${item.itemInfo.txt_wurth_lac_item}-${id}`}
                  >
                    PO/Job Name
                  </Label>
                </VisuallyHidden>

                <Input
                  id={`jobName-${item.itemInfo.txt_wurth_lac_item}-${id}`}
                  placeholder="PO/Job Name"
                  className="border-brand-gray-300 placeholder:text-brand-gray-300 mt-auto h-6 w-full max-w-[164px] px-1 text-base leading-4"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShoppingCartList;
