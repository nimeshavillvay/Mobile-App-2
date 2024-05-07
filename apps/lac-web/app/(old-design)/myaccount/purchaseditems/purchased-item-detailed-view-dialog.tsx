import ErrorBoundary from "@/old/_components/error-boundary";
import AddToCartIcon from "@/old/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import Separator from "@/old/_components/separator";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Dialog, DialogContent } from "@/old/_components/ui/dialog";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import useAddToCartMutation from "@/old/_hooks/cart/use-add-to-cart-mutation.hook";
import { cn } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useId,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import * as z from "zod";
import ItemPrices from "./_item-prices/item-prices";
import { generateItemUrl } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import { CombinedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().int().min(1),
});

type Schema = z.infer<typeof schema>;

type ActionConfirmationDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  item: CombinedPurchasedItem;
  token: string;
};

const PurchasedItemDetailedViewDialog = ({
  open,
  onOpenChange,
  item,
  token,
}: ActionConfirmationDialogProps) => {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const id = useId();
  const router = useRouter();
  const quantityId = `quantity-${id}`;
  const addToCartMutation = useAddToCartMutation();

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const quantity = watch("quantity") ?? 1;

  const onSubmit = (values: Schema) => {
    addToCartMutation.mutate(
      { sku: item.productSku, quantity: values.quantity },
      {
        onSuccess: () => {
          // TODO: handle add to cart popup here
        },
      },
    );
  };

  const onAddToFavorites = () => {
    if (item.isFavorite) {
      router.push("/myaccount/myfavorites");
    } else {
      // TODO: Logic needs to be finalized.
    }
  };

  const isItemNotAdded = !item.productSku;
  const isValidQuantity = !!(quantity && quantity >= 1);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setShowPriceBreakdown(false);
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="bottom-0 top-auto max-w-[768px] translate-y-[0%] gap-0 py-8 md:bottom-auto md:top-[50%] md:translate-y-[-50%]">
        <div className="flex flex-col gap-4 px-6 text-brand-gray-500">
          <div className="flex flex-row gap-4">
            <Link
              href={generateItemUrl(item.productId)}
              className="min-w-[92px]"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.productDescription}
                  width={92}
                  height={92}
                  className="size-[92px] border border-brand-gray-200 object-contain"
                />
              ) : (
                <WurthFullBlack
                  width={92}
                  height={92}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>

            <div className="flex flex-col">
              {item.productCategory && (
                <div className="text-base">{item.productCategory}</div>
              )}

              <h4 className="text-wrap font-bold text-black">
                {item.productDescription}
              </h4>
            </div>
          </div>

          <div className="flex flex-row gap-2 rounded-sm bg-brand-gray-100 p-3">
            <div className="flex-1">
              <div className="text-nowrap text-sm">Last Order Date</div>
              <div className="font-bold">
                {item.purchaseOrderDate
                  ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
                  : "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-nowrap text-sm">Order Count</div>
              <div className="font-bold">1</div>
            </div>
          </div>

          <div className="flex flex-row gap-2 p-3">
            <div className="flex-1">
              <div className="text-sm">Item #</div>
              <div className="font-bold">
                {item.productSku !== "" ? item.productSku : "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm">Manufacture Part #</div>
              <div className="font-bold">
                {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-gray-200"
        />

        <div className="max-h-[300px] overflow-y-scroll">
          <div className="flex flex-row gap-2 px-6 py-4 text-brand-gray-500">
            <div className="flex-1">
              {!isItemNotAdded && (
                <>
                  <ErrorBoundary
                    fallback={
                      <div className="p-4 text-center text-brand-primary">
                        Failed to Load Price!!!
                      </div>
                    }
                  >
                    <Suspense
                      fallback={
                        <div className="p-4 text-center text-brand-gray-400">
                          Price Loading...
                        </div>
                      }
                    >
                      <ItemPrices
                        token={token}
                        productId={item.productId}
                        quantity={1}
                        uom={item.unitOfMeasure}
                        salePrice={item.isSaleItem ? Number(item.listPrice) : 0}
                        unitPriceOnly
                      />
                    </Suspense>
                  </ErrorBoundary>

                  <div
                    className="flex h-10 items-center justify-between rounded-sm border border-brand-gray-300 px-2"
                    onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  >
                    <div>Price Breakdown</div>
                    <MdKeyboardArrowRight className="text-2xl leading-none" />
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 self-end">
              <div className="mb-1 text-sm">Min:1, Multiple:1</div>
              <div className="flex">
                <Label htmlFor={quantityId} className="sr-only">
                  Quantity
                </Label>

                <Input
                  id={quantityId}
                  autoFocus={false}
                  type="number"
                  disabled={isItemNotAdded}
                  className="h-10 rounded-r-none px-2 text-base"
                  placeholder="Qty"
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                />

                <div className="flex h-10 items-center rounded-r-sm border border-s-0 border-brand-gray-400 px-2">
                  Each
                </div>
              </div>
            </div>
          </div>

          <Collapsible
            open={showPriceBreakdown}
            onOpenChange={setShowPriceBreakdown}
            disabled={isItemNotAdded}
          >
            <CollapsibleTrigger
              className={cn(
                "group flex w-full flex-row items-center justify-between bg-brand-gray-100 px-6 py-4",
                isItemNotAdded ? "pointer-events-none opacity-50" : "",
              )}
            >
              <h4 className="font-wurth font-extrabold uppercase">
                Price Breakdown
              </h4>

              <MdKeyboardArrowDown className="text-2xl leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex w-full justify-center">
              <ErrorBoundary
                fallback={
                  <div className="p-4 text-center text-brand-primary">
                    Failed to Load Prices!!!
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="p-4 text-center text-brand-gray-400">
                      Prices Loading...
                    </div>
                  }
                >
                  <ItemPrices
                    token={token}
                    productId={item.productId}
                    quantity={1}
                    uom={item.unitOfMeasure}
                    salePrice={item.isSaleItem ? Number(item.listPrice) : 0}
                  />
                </Suspense>
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col gap-4 px-6 pt-6">
          <Button
            variant="secondary"
            className={cn(
              "h-12",
              item.isFavorite ? "border-brand-success text-brand-success" : "",
            )}
            onClick={() => onAddToFavorites()}
          >
            {item.isFavorite ? (
              <>
                <FavoriteIcon /> In My Favorites
              </>
            ) : (
              <>
                <AddToFavoritesIcon /> Add to Favorites
              </>
            )}
          </Button>

          <form
            className="flex flex-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Link href={generateItemUrl(item.productId)} className="flex-1">
              <Button
                variant="secondary"
                className="h-12 w-full border-brand-primary text-brand-primary"
              >
                View Product
              </Button>
            </Link>

            <Button className="h-12 flex-1" disabled={!isValidQuantity}>
              <AddToCartIcon /> Add to Cart
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasedItemDetailedViewDialog;
