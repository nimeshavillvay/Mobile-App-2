"use client";

import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import type { Product } from "@/_lib/types";
import useAddMultipleToCartMutation from "@/cart/_add-more-items/use-add-multiple-to-cart-mutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Button } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import Image from "next/image";
import { Suspense, useDeferredValue } from "react";
import { useForm } from "react-hook-form";
import {
  edgeBandingAddToCartFormSchema,
  type EdgeBandingAddToCartFormSchema,
} from "../helpers";
import EdgeBandTableLoading from "./edgband-table-loading";
import LaminateCardTotalPrice from "./laminate-card-total-price";
import LaminateEdgeBandingRow from "./laminate-edgebanding-row";

const LaminateEdgeBanding = ({
  product,
  token,
  groupId,
}: {
  readonly groupId: string;
  readonly product: Product;
  readonly token: string;
}) => {
  const { data: laminateData } = useLaminateFilter(
    Number(product.variants[0]?.id),
  );
  console.log("laminateData", laminateData?.edgebanding);
  const form = useForm<EdgeBandingAddToCartFormSchema>({
    resolver: zodResolver(edgeBandingAddToCartFormSchema),
    defaultValues: { bandQuantity: laminateData?.edgebanding.map(() => "") },
  });
  const formId = `add-edgeband-to-cart-${groupId}`;

  const quantities = form.getValues("bandQuantity");
  const delayedQuantities = useDebouncedState(quantities);
  const deferredQuantities = useDeferredValue(delayedQuantities);

  const lineProductIds = form.getValues("bandProductId");

  const priceCheckRequest =
    lineProductIds !== undefined
      ? lineProductIds
          .map((productId, index) => ({
            productId: Number(productId),
            qty: Number(deferredQuantities[index]),
          }))
          .filter((item) => item.qty !== 0)
      : [];
  console.log("quantities ", quantities);
  console.log("lineProductIds ", lineProductIds);

  const addMultipleToCartMutation = useAddMultipleToCartMutation(token);

  const handleAddAllItemsToCart = async () => {
    const skus = form.getValues("bandSku");

    const addToCartRequest = lineProductIds
      .map((productId, index) => ({
        productId: Number(productId),
        quantity: Number(quantities[index]),
        sku: skus[index] ?? "",
      }))
      .filter((item) => item.quantity !== undefined);
    addMultipleToCartMutation.mutateAsync(addToCartRequest, {
      onSuccess: () => {
        // setOpen(false);
      },
    });
  };

  const laminateBrand = laminateData?.brandName;
  const laminateProductType = laminateData?.edgebanding[0]?.attributes.filter(
    (attribute) => attribute.attribute_name === "Product Type",
  )[0]?.attribute_value;
  const laminateThickness = laminateData?.edgebanding[0]?.attributes.filter(
    (attribute) => attribute.attribute_name === "Thickness",
  )[0]?.attribute_value;

  return (
    // <Form {...form}>
    <form id={formId}>
      <div className="mt-4 border-t pt-4">
        <h4 className="pb-2 text-xl font-semibold">Matching Edgebanding</h4>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {laminateData?.edgebanding[0]?.productName}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-4 flex gap-4">
                <Image
                  src={product.groupImage}
                  alt={product.groupName}
                  width={132}
                  height={132}
                />
                <div>
                  <Image
                    src={laminateData?.brandImage ?? product.groupImage}
                    alt={laminateData?.brandName ?? product.groupName}
                    width={76}
                    height={76}
                  />
                  <div className="mt-2">
                    {laminateBrand && (
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Brand:</p>
                        <p className="font-semibold">{laminateBrand}</p>
                      </div>
                    )}
                    {laminateProductType && (
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Product Type:</p>
                        <p className="font-semibold">{laminateProductType}</p>
                      </div>
                    )}
                    {laminateThickness && (
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Thickness:</p>
                        <p className="font-semibold">{laminateThickness}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full min-w-96">
                  <Suspense fallback={<EdgeBandTableLoading />}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item # and MFR Part #</TableHead>
                          <TableHead className="text-center lg:w-1/4">
                            Price
                          </TableHead>
                          <TableHead className="text-center lg:w-1/6">
                            QTY
                          </TableHead>
                          <TableHead className="text-right font-medium">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {laminateData?.edgebanding.map((item, index) => (
                          <LaminateEdgeBandingRow
                            key={index}
                            product={item}
                            token={token}
                            groupId={groupId}
                            quantityFieldIndex={index}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </Suspense>
                </div>
                <div className="flex items-center gap-4 rounded bg-gray-50 p-4">
                  <div className="grow">
                    <Suspense fallback={<Skeleton className="h-9 w-40" />}>
                      <span className="text-wurth-gray-500">Total:</span>{" "}
                      {priceCheckRequest.length > 0 ? (
                        <LaminateCardTotalPrice
                          token={token}
                          priceCheckRequest={priceCheckRequest}
                        />
                      ) : (
                        <strong className="text-lg">$0.00</strong>
                      )}
                    </Suspense>
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddAllItemsToCart}
                    disabled={priceCheckRequest.length === 0}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </form>
    // </Form>
  );
};

export default LaminateEdgeBanding;
