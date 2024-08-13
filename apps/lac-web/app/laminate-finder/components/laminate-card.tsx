"use client";

import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { Product } from "@/_lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import Image from "next/image";
import { Suspense, useState } from "react";
import LaminateGradeFinish from "./laminate-grade-finish";
import LaminateGroup from "./laminate-group";

const LaminateCard = ({
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

  const grades = laminateData?.groupFilters?.values_ALL?.GRADE;
  const finishes = laminateData?.groupFilters?.values_ALL?.FINISH;

  const possibleProductIdsForFinishes =
    laminateData?.groupFilters?.values_FINISH;

  const [open, setOpen] = useState(false);

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: Number(product.variants[0]?.id), qty: 1 },
  ]);

  const singleGrade =
    grades !== undefined && grades.length === 1 ? grades[0] : "";
  const singleFinish =
    finishes !== undefined && finishes.length === 1 ? finishes[0] : "";

  const productIds =
    singleGrade && singleFinish
      ? possibleProductIdsForFinishes?.[singleFinish]?.[singleGrade]
          ?.productids || []
      : [];

  const groupPriceData = priceCheckQuery.data.productPrices[0];
  const groupPrice = groupPriceData?.uomPrice ?? groupPriceData?.price ?? 0;
  const groupUom = groupPriceData?.uomPriceUnit ?? groupPriceData?.priceUnit;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md">
          <div className="aspect-square relative w-full">
            <Image
              src={product.groupImage}
              alt={product.groupName}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 translate-y-full transform bg-black bg-opacity-70 p-3 text-white transition-transform duration-300 group-hover:translate-y-0">
            <h3
              className="mb-1 line-clamp-2 text-sm font-semibold"
              title={product.groupName}
              dangerouslySetInnerHTML={{ __html: product.groupName }}
            />
            <p className="text-xs font-medium">
              {groupPrice.toFixed(2)} / {groupUom}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[52rem] lg:max-w-screen-lg">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Suspense
              key={`group-${product.variants[0]?.id}`}
              fallback={
                <Skeleton className="flex h-[39rem] w-full gap-4 lg:w-60 lg:flex-col" />
              }
            >
              <LaminateGroup
                product={product}
                token={token}
                groupId={groupId}
              />
            </Suspense>
            <Suspense
              key={`grade-finish-${product.variants[0]?.id}`}
              fallback={
                <Skeleton className="h-20 w-[20rem] rounded-lg shadow-md" />
              }
            >
              <LaminateGradeFinish
                product={product}
                token={token}
                groupId={groupId}
                singleGrade={singleGrade ?? ""}
                singleFinish={singleFinish ?? ""}
                singleGradeFinishProductIds={productIds}
                setOpen={setOpen}
              />
            </Suspense>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <h4 className="pb-2 text-xl font-semibold">Matching Edgebanding</h4>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                3D Edgebanding, Color 3D700R Brushed Aluminum, 2mm Thick 15/16
                inch(need to get from api)
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
                      src={product.groupImage}
                      alt={product.groupName}
                      width={76}
                      height={76}
                    />
                    <div className="mt-2">
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Brand:</p>
                        <p className="font-semibold">Dollken Woodtape</p>
                      </div>
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Product Type:</p>
                        <p className="font-semibold">Dollken Woodtape</p>
                      </div>
                      <div className="flex gap-4">
                        <p className="w-24 text-gray-600">Thickness:</p>
                        <p className="font-semibold">Dollken Woodtape</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full min-w-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item # and MFR Part #</TableHead>
                          <TableHead className="text-center lg:w-1/4">
                            Width &times; Height
                          </TableHead>
                          <TableHead className="text-right lg:w-1/4">
                            Price
                          </TableHead>
                          <TableHead className="text-center lg:w-1/6">
                            QTY
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            INV001
                            <br />
                            INV001
                          </TableCell>
                          <TableCell className="text-center">
                            Width &times; Height
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-lg font-semibold">
                              $24.99 / EA
                            </span>
                            <p className="text-sm text-gray-500">
                              $24.99/EA for 25-99 items,
                              <br />
                              24.99/EA for 25-99 items,
                              <br />
                              24.99/EA for 25-99 items,
                            </p>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              className="w-full text-center"
                              placeholder="Quantity"
                            />
                            <p className="mt-2 text-center text-sm font-medium text-gray-500">
                              EA
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-end gap-4 rounded bg-gray-50 p-4">
                    <div>
                      <span className="text-wurth-gray-600">Total:</span>{" "}
                      <strong className="text-lg">$456.00</strong>
                    </div>
                    <Button>Add to cart</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaminateCard;
