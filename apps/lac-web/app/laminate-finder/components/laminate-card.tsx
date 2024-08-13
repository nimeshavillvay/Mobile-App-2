"use client";

import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { Product } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import { Suspense, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "../helpers";
import { laminateAddToCartFormSchema } from "../helpers";
import LaminateEdgeBanding from "./laminate-edgebanding";
import LaminateGradeFinish from "./laminate-grade-finish";
import LaminateGroup from "./laminate-group";
import LaminatesDialogLoading from "./laminates-dialog-loading";

const LaminateCard = ({
  product,
  token,
  groupId,
}: {
  readonly groupId: string;
  readonly product: Product;
  readonly token: string;
}) => {
  const form = useForm<LaminateAddToCartFormSchema>({
    resolver: zodResolver(laminateAddToCartFormSchema),
  });

  const { data: laminateData } = useLaminateFilter(
    Number(product.variants[0]?.id),
  );

  const formId = `add-edgeband-to-cart-${groupId}`;

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
        <FormProvider {...form}>
          <form id={formId}>
            <Suspense fallback={<LaminatesDialogLoading />}>
              {/* todo: update */}
              <LaminateEdgeBanding
                product={product}
                token={token}
                groupId={groupId}
              />
            </Suspense>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default LaminateCard;
