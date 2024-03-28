import AlertInline from "@/(old-design)/_components/alert-inline";
import useAddToFavoritesMutation from "@/(old-design)/_hooks/product/use-add-to-favorites-mutation.hook";
import ErrorBoundary from "@/old/_components/error-boundary";
import ShippingOptions from "@/old/_components/shipping-options";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import useAddToCartMutation from "@/old/_hooks/cart/use-add-to-cart-mutation.hook";
import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";
import ItemAttributes from "./_item-attributes/item-attributes";
import ItemPrices from "./_item-prices/item-prices";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CategoryInfo, CombinedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().min(1).nullable(),
});

type Schema = z.infer<typeof schema>;

type PurchasedItemRowProps = {
  token: string;
  item: CombinedPurchasedItem;
  index: number;
};

const PurchasedItemRow = ({ token, item, index }: PurchasedItemRowProps) => {
  const [showItemAttributes, setShowItemAttributes] = useState<boolean>(false);
  const [showShippingOptions, setShowShippingOptions] =
    useState<boolean>(false);
  const [showMyPrice, setShowMyPrice] = useState<boolean>(false);
  const id = useId();
  const router = useRouter();
  const quantityId = `quantity-${id}`;
  const category: CategoryInfo = item.categoryInfo[0] as CategoryInfo;
  const subCategory: CategoryInfo = item.categoryInfo[1] as CategoryInfo;
  const addToCartMutation = useAddToCartMutation();
  const addToFavoritesMutation = useAddToFavoritesMutation();

  const { register, watch, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    values: {
      quantity: null,
    },
  });

  const quantity = watch("quantity");

  const generateItemUrl = (group_id: string, sku: string) => {
    if (group_id && sku) {
      return `/product-item/${group_id}/${sku}`;
    }
    return "#";
  };

  const onSubmit = (values: Schema) => {
    addToCartMutation.mutate(
      { sku: item.sku, quantity: values.quantity as number },
      {
        onSuccess: (resp) => {
          console.log("Added to cart", resp);
        },
      },
    );
  };

  const onAddToFavorites = () => {
    if (item.isFavourite) {
      router.push("/myaccount/myfavorites");
    } else {
      console.log("cat > ", category, subCategory);
      if (category && subCategory) {
        addToFavoritesMutation.mutate({
          brandId: item.sel_assigned_brand as number,
          brandName: item.brand_name,
          categoryId: category.oo_id,
          categoryName: category.cat_name,
          sku: item.sku,
          subCategoryId: subCategory.oo_id,
          subCategoryName: subCategory.cat_name,
        });
      }
    }
  };

  const isEligible = (item: CombinedPurchasedItem) => {
    return (
      item &&
      item.txt_wurth_lac_item &&
      !item.is_product_exclude &&
      item.txt_x_pant_Mat_status !== "DL"
    );
  };

  const isItemError = (item: CombinedPurchasedItem) => {
    return (
      !item ||
      !item.txt_wurth_lac_item ||
      item.is_product_exclude ||
      item.txt_x_pant_Mat_status === "DL" ||
      item.txt_x_pant_Mat_status === "DU" ||
      item.txt_x_pant_Mat_status === "DV"
    );
  };

  return (
    <>
      <TableRow
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell>
          <Link
            href={generateItemUrl(item.group_id, item.sku)}
            className={
              item.group_id ? "pointer-events-auto" : "pointer-events-none"
            }
          >
            <Image
              src={item.img ? getMediaUrl(item.img) : ItemPlaceholder}
              alt={item.txt_sap_description_name}
              width={92}
              height={92}
              className="size-[92px] border border-brand-gray-200 object-contain"
            />
          </Link>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5">
          <Link
            href={generateItemUrl(item.group_id, item.sku)}
            className={cn(
              "text-sm text-brand-gray-500",
              item.group_id ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Item# : {item.sku !== "" ? item.sku : "N/A"}
          </Link>

          <div className="text-sm text-brand-gray-500">
            MRF Part# : {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
          </div>

          <h4 className="text-wrap font-bold">
            {item.txt_sap_description_name}
          </h4>

          <div className="text-sm text-brand-gray-500">
            Category : {item.txt_category !== "" ? item.txt_category : "N/A"}
          </div>
        </TableCell>

        <TableCell className="text-center text-sm text-brand-gray-500">
          {item.orderDate ? dayjs(item.orderDate).format(DATE_FORMAT) : "N/A"}
        </TableCell>

        <TableCell className="text-center text-sm text-brand-gray-500">
          {item.totalItem ?? "N/A"}
        </TableCell>

        <TableCell rowSpan={2}>
          <Collapsible
            open={showMyPrice}
            onOpenChange={setShowMyPrice}
            disabled={!item?.group_id}
            className="min-w-[260px]"
          >
            <CollapsibleTrigger className="mx-auto flex cursor-pointer flex-row items-center justify-center text-sm text-brand-primary">
              <span>{showMyPrice ? "Hide" : "Show"} my price</span>

              <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ErrorBoundary
                fallback={
                  <div className="p-4 text-brand-primary">
                    Failed to Prices!!!
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="p-4 text-brand-gray-400">
                      Prices Loading...
                    </div>
                  }
                >
                  <ItemPrices
                    token={token}
                    sku={item.sku}
                    quantity={1}
                    uom={item.txt_uom}
                  />
                </Suspense>
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
          <Label htmlFor={quantityId} className="sr-only">
            Quantity
          </Label>
          <Input
            id={quantityId}
            type="number"
            disabled={!item.group_id}
            className="h-6 w-16 px-1 text-right text-base leading-4"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
          {item.group_id && (
            <>
              <div className="text-nowrap">
                <span className="font-bold text-black">Min: </span>
                {item.txt_min_order_amount}
              </div>

              <div className="text-nowrap">
                <span className="font-bold text-black">Multiples: </span>
                {item.txt_order_qty_increments}
              </div>
            </>
          )}
        </TableCell>

        <TableCell className="text-sm text-brand-gray-500">
          {item.txt_uom !== "" ? item.txt_uom : "N/A"}
        </TableCell>
      </TableRow>

      <TableRow
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell></TableCell>
        <TableCell colSpan={3} className={isEligible(item) ? "py-2" : ""}>
          <Collapsible
            open={showItemAttributes}
            onOpenChange={setShowItemAttributes}
            disabled={!item?.group_id}
          >
            <CollapsibleTrigger>
              <div
                className={cn(
                  "group flex flex-row items-center text-sm",
                  item.group_id
                    ? "cursor-pointer text-brand-primary"
                    : "cursor-not-allowed text-brand-gray-400",
                )}
              >
                <span>
                  {showItemAttributes ? "Hide" : "View"} item attributes
                </span>

                <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ErrorBoundary
                fallback={
                  <div className="p-4 text-brand-primary">
                    Failed to Load Attributes!!!
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="p-4 text-brand-gray-400">
                      Attributes Loading...
                    </div>
                  }
                >
                  <ItemAttributes token={token} sku={item.sku} />
                </Suspense>
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>

      {isEligible(item) && (
        <TableRow
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell colSpan={7}>
            <div className="flex flex-row items-end justify-end gap-2">
              <Button
                variant="ghost"
                className="text-brand-secondary"
                onClick={() => setShowShippingOptions(!showShippingOptions)}
                disabled={!quantity || quantity < 1}
              >
                <span>Change Shipping Options</span>

                <MdKeyboardArrowDown className="text-xl leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </Button>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  className="w-[170px]"
                  disabled={!quantity || quantity < 1}
                >
                  Add to cart
                </Button>
              </form>

              <Button variant="ghost" onClick={() => onAddToFavorites()}>
                {item.isFavourite ? (
                  <IoMdHeart className="text-2xl text-brand-primary" />
                ) : (
                  <IoMdHeartEmpty className="text-2xl text-brand-gray-500" />
                )}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}

      {isItemError(item) && (
        <TableRow
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell colSpan={4} className="pt-0">
            <ErrorAlert item={item} />
          </TableCell>
        </TableRow>
      )}

      {showShippingOptions && (
        <TableRow
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell colSpan={5} className="pt-0">
            <div className="flex justify-end">
              <ShippingOptions sku={item.sku} quantity={quantity as number} />
            </div>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  );
};

export default PurchasedItemRow;

const ErrorAlert = ({ item }: { item: CombinedPurchasedItem }) => {
  if (!item?.txt_wurth_lac_item) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="Not available online. Please call Customer Service for availability"
      />
    );
  }

  if (item?.is_product_exclude) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="This item is not available in your territory."
      />
    );
  }

  if (item?.txt_x_pant_Mat_status === "DL") {
    return (
      <AlertInline
        variant="destructive"
        title="DISCONTINUED"
        description="This item is no longer available"
      />
    );
  }

  if (
    item?.txt_x_pant_Mat_status === "DU" ||
    item?.txt_x_pant_Mat_status === "DV"
  ) {
    return (
      <AlertInline
        variant="destructive"
        title="Will be Discontinued"
        description="Stock is limited"
      />
    );
  }

  return null;
};
