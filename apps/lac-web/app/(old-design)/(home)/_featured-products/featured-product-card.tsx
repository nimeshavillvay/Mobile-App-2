import AddToCartIcon from "@/old/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetails,
} from "@/old/_components/product-card";
import { Input } from "@/old/_components/ui/input";
import { Skeleton } from "@/old/_components/ui/skeleton";
import VerifyProductDialog from "@/old/_components/verify-product-dialog";
import VisuallyHidden from "@/old/_components/visually-hidden";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/old/_hooks/account/use-login-dialog.hook";
import useAddToCartMutation from "@/old/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToFavoritesMutation from "@/old/_hooks/product/use-add-to-favorites-mutation.hook";
import useFavoriteSkus from "@/old/_hooks/product/use-favorite-skus.hook";
import usePriceCalculation from "@/old/_hooks/product/use-price-calculation.hook";
import { cn, formatNumberToPrice, getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import { z } from "zod";
import type { FeaturedProduct } from "../types";

const formSchema = z.object({
  quantity: z.number().int().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

type FeaturedProductCardProps = {
  product: FeaturedProduct;
  /**
   * Increase loading priority of image
   */
  priority: boolean;
};

const FeaturedProductCard = ({
  product,
  priority,
}: FeaturedProductCardProps) => {
  const accountListQuery = useAccountList();
  const setOpenLoginDialog = useLoginDialog((state) => state.setOpen);
  const [open, setOpen] = useState(false);

  let flag: "hidden" | "sale" | "new" = "hidden";
  if (product.is_sale) {
    flag = "sale";
  } else if (product.is_new) {
    flag = "new";
  }

  const id = useId();
  const qtyId = `qty-${id}`;

  const { register, handleSubmit, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const quantity = watch("quantity");

  const { discountedPrice, discountPercentage, actualPrice, isLoading } =
    usePriceCalculation(product.sku, quantity, product.override_price);
  const favoriteSkusQuery = useFavoriteSkus(product.sku);
  const addToCartMutation = useAddToCartMutation();
  const addToFavoritesMutation = useAddToFavoritesMutation();

  const onSubmit = (values: FormSchema) => {
    addToCartMutation.mutate(
      { sku: product.sku, quantity: values.quantity },
      {
        onSuccess: () => {
          setOpen(true);
        },
      },
    );
  };

  const isDiscounted = actualPrice !== discountedPrice;

  const addToFavorites = () => {
    addToFavoritesMutation.mutate({
      brandId: product.brandId,
      brandName: product.brandName,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      sku: product.sku,
      subCategoryId: product.subCategoryId,
      subCategoryName: product.subCategoryName,
    });
  };

  return (
    <>
      <ProductCardContainer key={product.sku} className="relative">
        <ProductCardDetails
          href={`/product-item/${product.groupId}/${product.sku}`}
          image={{
            src: getMediaUrl(product.product_img),
            alt: `An image of ${product.productTitle}`,
            priority,
          }}
          brand={product.brandName}
          title={product.productTitle}
        />

        <ProductCardActions>
          <div className="mb-2 text-center text-sm leading-5 text-brand-gray-400">
            {product.sku}
          </div>

          {accountListQuery.data ? (
            <>
              <div className="flex flex-row items-center justify-center gap-1 text-lg font-normal leading-5 text-brand-gray-500">
                {discountedPrice ? (
                  <span className="font-bold">${discountedPrice}</span>
                ) : (
                  <Skeleton className="h-4 w-[46px]" />
                )}
                <span>/</span>
                <span>{product.txt_uom_label}</span>
              </div>

              {!isLoading ? (
                isDiscounted && (
                  <div className="mt-0.5 flex flex-row items-center justify-center gap-[5px]">
                    <div className="text-brand-gray-400 line-through">
                      ${actualPrice}
                    </div>

                    <div className="rounded-sm bg-brand-success/10 px-1 py-0.5 font-bold leading-none text-brand-success">
                      Save ${formatNumberToPrice(actualPrice - discountedPrice)}{" "}
                      ({Math.round(discountPercentage)}%)
                    </div>
                  </div>
                )
              ) : (
                <div className="mt-0.5 flex flex-row items-center justify-center gap-[5px]">
                  <Skeleton className="h-5 w-[46px]" />
                  <Skeleton className="h-[19px] w-[136px]" />
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(
                  "flex flex-row items-center gap-1",
                  !isLoading ? (isDiscounted ? "mt-3.5" : "mt-9") : "mt-3.5",
                )}
              >
                <VisuallyHidden>
                  <label htmlFor={qtyId}>Quantity</label>
                </VisuallyHidden>

                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  id={qtyId}
                  type="number"
                  min={1}
                  placeholder="Qty"
                  className="size-9 border-2 px-0.5 text-center"
                />

                <button
                  className="flex flex-1 flex-row items-center justify-center rounded-sm bg-brand-primary p-1.5 font-wurth font-extrabold uppercase text-white"
                  type="submit"
                >
                  <AddToCartIcon />

                  <span>Add to cart</span>
                </button>

                {favoriteSkusQuery?.data?.[0].isFavourite ? (
                  <Link
                    href="/myaccount/myfavorites"
                    className="grid size-9 place-items-center rounded-sm border-2 border-brand-success"
                  >
                    <VisuallyHidden>Favorites</VisuallyHidden>

                    <FavoriteIcon />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="grid size-9 place-items-center rounded-sm border-2 border-brand-secondary"
                    onClick={addToFavorites}
                    disabled={addToFavoritesMutation.isPending}
                  >
                    <VisuallyHidden>Add to favorites</VisuallyHidden>

                    <AddToFavoritesIcon />
                  </button>
                )}
              </form>
            </>
          ) : (
            <button
              onClick={() => setOpenLoginDialog(true)}
              className="w-full rounded bg-brand-primary p-2 font-wurth text-base font-extrabold uppercase text-white"
              disabled={accountListQuery.isLoading}
            >
              Login to buy
            </button>
          )}
        </ProductCardActions>

        {flag !== "hidden" && (
          <span
            className={cn(
              "absolute right-0 top-0 flex flex-row items-center gap-[5px] rounded-bl-[36px] p-3.5 font-wurth text-[22px] font-extrabold uppercase leading-none",
              flag === "sale" && "bg-brand-secondary text-white",
              flag === "new" && "bg-brand-success text-white",
            )}
          >
            {flag === "sale" && <IoPricetagsOutline className="-scale-x-100" />}

            <span>{flag}</span>
          </span>
        )}
      </ProductCardContainer>

      <VerifyProductDialog
        open={open}
        onOpenChange={setOpen}
        product={{
          image: {
            src: getMediaUrl(product.product_img),
            alt: `An image of ${product.productTitle}`,
          },
          sku: product.sku,
          name: product.productTitle,
          uom: product.txt_uom_label,
          price: product.override_price,
        }}
        quantity={quantity}
      />
    </>
  );
};

export default FeaturedProductCard;
