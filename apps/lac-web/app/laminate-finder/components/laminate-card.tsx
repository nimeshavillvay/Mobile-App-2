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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import Image from "next/image";
import { useState } from "react";
import LaminateItems from "../laminate-items";

const LaminateCard = ({
  product,
  token,
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

  const possibleProductIdsForGrades = laminateData?.groupFilters?.values_GRADE;
  const possibleProductIdsForFinishes =
    laminateData?.groupFilters?.values_FINISH;

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");

  const [productIds, setProductIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: Number(product.variants[0]?.id), qty: 1 },
  ]);

  const groupPriceData = priceCheckQuery.data.productPrices[0];
  const groupPrice = groupPriceData?.uomPrice ?? groupPriceData?.price ?? 0;
  const groupUom = groupPriceData?.uomPriceUnit ?? groupPriceData?.priceUnit;

  const onGradeValueChange = (grade: string) => {
    setSelectedGrade(grade);
    if (selectedFinish) {
      setProductIds(
        possibleProductIdsForFinishes?.[selectedFinish]?.[grade]?.productids ||
          [],
      );
    }
  };

  const onFinishValueChange = (finish: string) => {
    setSelectedFinish(finish);
    if (selectedGrade) {
      setProductIds(
        possibleProductIdsForGrades?.[selectedGrade]?.[finish]?.productids ||
          [],
      );
    }
  };

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
            >
              {decodeHTMLEntities(product.groupName)}
            </h3>
            <p className="text-xs font-medium">
              {groupPrice.toFixed(2)} / {groupUom}
            </p>
            <div className="mt-1">
              <span className="text-xs">{grades?.length ?? 0} grades</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[52rem] lg:max-w-screen-lg">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex w-full gap-4 lg:w-60 lg:flex-col">
              <div>
                <Image
                  src={product.groupImage}
                  alt={product.groupName}
                  width={44}
                  height={44}
                />
                <h3
                  className="mt-2 text-xl font-bold"
                  dangerouslySetInnerHTML={{ __html: product.groupName }}
                />
                <p className="mb-2">
                  {groupPrice}/ {groupUom}
                </p>
              </div>
              <div>
                <Image
                  src={product.groupImage}
                  alt={product.groupName}
                  width={240}
                  height={240}
                />
              </div>
            </div>
            <div className="grow">
              <h4 className="text-lg font-semibold">Laminate details</h4>
              <p className="mb-2 text-wurth-gray-800">
                Please select a <strong>Grade</strong> and{" "}
                <strong>Finish</strong> to show items.
              </p>
              <div className="mb-4 flex gap-1">
                <Select
                  onValueChange={onGradeValueChange}
                  value={selectedGrade}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades?.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={onFinishValueChange}
                  value={selectedFinish}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {finishes?.map((finish) => (
                      <SelectItem key={finish} value={finish}>
                        {finish}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <LaminateItems productIds={productIds} token={token} />
            </div>
          </div>
          <div className="mt-2 text-sm text-wurth-gray-500">
            <strong>Note:</strong>
            <p className="mb-2">
              Image color is for reference only. Actual colors may vary due to
              monitor settings.
            </p>
            <p>To obtain a sample, please contact your local branch.</p>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          Item # <br /> MFR Part #
                        </TableHead>
                        <TableHead className="text-center lg:w-1/5">
                          Width &times; Height
                        </TableHead>
                        <TableHead className="text-right lg:w-1/5">
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
                        <TableCell className="text-center">Paid</TableCell>
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
                          <Input type="number" className="w-full" />
                          <p className="mt-2 text-right text-sm text-gray-500">
                            EA
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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

function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default LaminateCard;
