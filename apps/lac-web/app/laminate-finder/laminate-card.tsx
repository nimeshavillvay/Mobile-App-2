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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import LaminateItems from "./laminate-items";

const LaminateCard = ({
  groupId,
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

  // todo: validate product empty
  const groupPriceData = priceCheckQuery.data.productPrices[0];
  const groupPrice = groupPriceData?.uomPrice ?? groupPriceData?.price ?? 0; // discounts are not considered
  const groupUom = groupPriceData?.uomPriceUnit ?? groupPriceData?.priceUnit;

  const onGradeValueChange = (grade: string) => {
    setSelectedGrade(grade);
    if (selectedFinish === undefined || selectedFinish === "") {
      return "";
    }
    setProductIds(
      possibleProductIdsForFinishes?.[selectedFinish]?.[grade]?.productids ||
        [],
    );
  };

  const onFinishValueChange = (finish: string) => {
    setSelectedFinish(finish);
    if (selectedGrade === undefined || selectedGrade === "") {
      return "";
    }
    setProductIds(
      possibleProductIdsForGrades?.[selectedGrade]?.[finish]?.productids || [],
    );
  };
  // todo: set selected values for grade and finish if only one exists

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Image
            src={product.groupImage}
            alt={product.groupImage}
            width={203}
            height={203}
          />
          <h5 className="font-medium">{product.groupName}</h5>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[52rem]">
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
            <div className="mt-2 text-sm text-wurth-gray-500">
              <strong>Note:</strong>
              <p className="mb-2">
                Image color is for reference only. Actual colors may vary due to
                monitor settings.
              </p>
              <p>To obtain a sample, please contact your local branch.</p>
            </div>
          </div>
          <div className="grow">
            <h4 className="text-lg font-semibold">Laminate details</h4>
            <p className="mb-2 text-wurth-gray-800">
              Please select a <strong>Grade</strong> and <strong>Finish</strong>{" "}
              to show items.
            </p>
            <div className="mb-4 flex gap-1">
              <Select onValueChange={onGradeValueChange} value={selectedGrade}>
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
        <div className="mt-4 border-t pt-4">
          <h4 className="pb-2 text-xl font-semibold">Matching Edgebanding</h4>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                3D Edgebanding, Color 3D700R Brushed Aluminum, 2mm Thick 15/16
                inch(need to get from api)
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaminateCard;
