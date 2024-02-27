"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import useSimulationCheckout from "@/_hooks/cart/use-simulation-checkout.hook";
import usePriceCheck from "@/_hooks/product/use-price-check.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineShoppingCart } from "react-icons/md";
import { z } from "zod";
import SearchBar from "./search-bar";
import { Input } from "./ui/input";
import VisuallyHidden from "./visually-hidden";

const formSchema = z.object({
  po: z.string().min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

type VerifyProductDialogProps = {
  open: boolean;
  onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"];
  product: {
    image: {
      src: string;
      alt: string;
    };
    sku: string;
    name: string;
    uom: string;
    price?: string;
  };
  quantity: number;
};

const VerifyProductDialog = ({
  open,
  onOpenChange,
  product,
  quantity,
}: VerifyProductDialogProps) => {
  const simulationCheckoutQuery = useSimulationCheckout();
  const priceCheckQuery = usePriceCheck(product.sku, quantity);

  let discountedPrice = product.price ? parseFloat(product.price) : 0;
  if (!discountedPrice && priceCheckQuery?.data?.["list-sku-price"][0].price) {
    discountedPrice = priceCheckQuery?.data?.["list-sku-price"][0].price;
  }

  const actualPrice =
    priceCheckQuery?.data?.["list-sku-price"][0].price ?? discountedPrice;
  const discount = ((actualPrice - discountedPrice) / actualPrice) * 100;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      po: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log("> values: ", values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[760px]">
        <DialogHeader>
          <DialogTitle>An Item Added To Your Cart</DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5">
          <SearchBar />

          <Table className="mt-6">
            <VisuallyHidden>
              <TableCaption>A list of the recently added items.</TableCaption>
            </VisuallyHidden>

            <TableHeader>
              <TableRow>
                <TableHead>Product Description</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Sub Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="flex flex-row items-start gap-[18px]">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={92}
                    height={92}
                    className="aspect-1 border-brand-gray-200 border object-cover"
                  />

                  <div className="flex-1 space-y-0.5">
                    <div>Item# : {product.sku}</div>

                    <div className="font-bold text-black">{product.name}</div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="po"
                          render={({ field }) => (
                            <FormItem className="w-full flex-1">
                              <VisuallyHidden>
                                <FormLabel>PO/Job name</FormLabel>
                              </VisuallyHidden>

                              <FormControl>
                                <Input
                                  placeholder="PO/Job name"
                                  className="h-[30px] w-2/3 p-1"
                                  {...field}
                                />
                              </FormControl>

                              <VisuallyHidden>
                                <FormDescription>
                                  This is the PO number for the order
                                </FormDescription>
                              </VisuallyHidden>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>
                </TableCell>

                <TableCell className="text-brand-gray-500 text-nowrap text-center">
                  <div className="text-sm">
                    <span className="font-bold">${discountedPrice}</span> /{" "}
                    {product.uom}
                  </div>

                  {!!discount && (
                    <div className="flex flex-row flex-nowrap items-center gap-[5px]">
                      <div className="text-brand-gray-400 line-through">
                        ${priceCheckQuery?.data?.["list-sku-price"][0].price}
                      </div>

                      <div className="text-brand-success bg-brand-success/10 rounded-sm px-1 py-0.5 font-bold">
                        {Math.round(discount)}% off
                      </div>
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-brand-gray-500 text-center">
                  {quantity} {product.uom}
                </TableCell>

                <TableCell className="text-brand-gray-500 text-right font-bold">
                  ${priceCheckQuery.data?.["list-sku-price"]?.[0].price}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 flex flex-row items-center justify-end gap-2 font-extrabold text-white">
            <DialogClose className="bg-brand-primary rounded-sm px-8 py-2 uppercase">
              Continue Shopping
            </DialogClose>

            <Link
              href="/shopping-cart"
              className="bg-brand-gray-500 flex flex-row items-center gap-2 rounded-sm px-8 py-2 uppercase"
            >
              <span className="relative">
                <MdOutlineShoppingCart className="text-xl leading-none text-white" />

                <span className="text-brand-gray-500 absolute bottom-0 right-0 rounded-full bg-white px-0.5 py-px text-[8px] font-bold leading-none">
                  {simulationCheckoutQuery.data?.cartItemsCount}
                </span>
              </span>

              <span>View Cart (${simulationCheckoutQuery.data?.net})</span>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyProductDialog;
