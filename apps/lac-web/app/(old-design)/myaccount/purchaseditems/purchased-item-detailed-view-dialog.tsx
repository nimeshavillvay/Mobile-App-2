import AddToCartIcon from "@/old/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import Separator from "@/old/_components/separator";
import { Button } from "@/old/_components/ui/button";
import { Dialog, DialogContent } from "@/old/_components/ui/dialog";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import useAddToCartMutation from "@/old/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToFavoritesMutation from "@/old/_hooks/product/use-add-to-favorites-mutation.hook";
import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { generateItemUrl } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().int().min(1),
});

type Schema = z.infer<typeof schema>;

type ActionConfirmationDialogProps = {
  open: boolean;
  onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"];
  item: CombinedPurchasedItem;
};

const PurchasedItemDetailedViewDialog = ({
  open,
  onOpenChange,
  item,
}: ActionConfirmationDialogProps) => {
  const id = useId();
  const router = useRouter();
  const quantityId = `quantity-${id}`;
  const category = item?.categoryInfo[0] ?? null;
  const subCategory = item?.categoryInfo[1] ?? null;
  const addToCartMutation = useAddToCartMutation();
  const addToFavoritesMutation = useAddToFavoritesMutation();

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const quantity = watch("quantity") ?? 1;

  const onSubmit = (values: Schema) => {
    addToCartMutation.mutate(
      { sku: item.sku, quantity: values.quantity },
      {
        onSuccess: () => {
          // TODO: handle add to cart popup here
        },
      },
    );
  };

  const onAddToFavorites = () => {
    if (item.isFavourite) {
      router.push("/myaccount/myfavorites");
    } else {
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

  const isItemNotAdded = !item.txt_wurth_lac_item;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 top-auto max-w-[490px] translate-y-[0%] gap-0 py-8 md:bottom-auto md:top-[50%] md:translate-y-[-50%]">
        <div className="flex flex-col gap-4 px-6 text-brand-gray-500">
          <div className="flex flex-row gap-4">
            <Link
              href={generateItemUrl(item.group_id, item.sku)}
              className="min-w-[92px]"
            >
              <Image
                src={item.img ? getMediaUrl(item.img) : ItemPlaceholder}
                alt={item.txt_sap_description_name}
                width={92}
                height={92}
                className="size-[92px] border border-brand-gray-200 object-contain"
              />
            </Link>

            <div className="flex flex-col">
              {item.txt_category && (
                <div className="text-base">{item.txt_category}</div>
              )}

              <h4 className="text-wrap font-bold text-black">
                {item.txt_sap_description_name}
              </h4>
            </div>
          </div>

          <div className="flex flex-row gap-2 rounded-sm bg-brand-gray-100 p-3">
            <div className="flex-1">
              <div className="text-nowrap text-sm">Last Order Date</div>
              <div className="font-bold">
                {item.orderDate
                  ? dayjs(item.orderDate).format(DATE_FORMAT)
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
                {item.sku !== "" ? item.sku : "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm">Manufacture Part #</div>
              <div className="font-bold">
                {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-gray-200"
        />

        <div className="flex flex-row gap-2 px-6 py-4 text-brand-gray-500">
          <div className="flex-1">
            <div>
              <span className="font-bold">$95.06</span>
              <span className="text-sm"> / Each</span>
            </div>

            <div>
              <div className="flex h-10 items-center rounded-sm border border-brand-gray-300 px-2">
                Price Breakdown
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-sm leading-6">Min:1, Multiple:1</div>
            <div className="flex">
              <Label htmlFor={quantityId} className="sr-only">
                Quantity
              </Label>

              <Input
                id={quantityId}
                autoFocus={false}
                type="number"
                disabled={isItemNotAdded}
                className="h-10 px-2 text-base"
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

        <div className="bg-brand-gray-100 px-6 py-4">
          <h4 className="font-wurth font-extrabold uppercase">
            Shipping Options / Stock Availability
          </h4>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-4">
          <Button
            variant="secondary"
            className={cn(
              "h-12",
              item.isFavourite ? "border-brand-success text-brand-success" : "",
            )}
            onClick={() => onAddToFavorites()}
          >
            {item.isFavourite ? (
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
            <Button
              variant="secondary"
              className="h-12 flex-1 border-brand-primary text-brand-primary"
              onClick={() =>
                router.push(generateItemUrl(item.group_id, item.sku))
              }
            >
              View Product
            </Button>

            <Button
              className="h-12 flex-1"
              disabled={!quantity || quantity < 1}
            >
              <AddToCartIcon /> Add to Cart
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasedItemDetailedViewDialog;
