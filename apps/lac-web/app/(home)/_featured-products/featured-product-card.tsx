import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetails,
} from "@/_components/product-card";
import { Input } from "@/_components/ui/input";
import { Skeleton } from "@/_components/ui/skeleton";
import VerifyProductDialog from "@/_components/verify-product-dialog";
import VisuallyHidden from "@/_components/visually-hidden";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/_hooks/account/use-login-dialog.hook";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToFavoritesMutation from "@/_hooks/product/use-add-to-favorites-mutation.hook";
import useFavoriteSkus from "@/_hooks/product/use-favorite-skus.hook";
import usePriceCheck from "@/_hooks/product/use-price-check.hook";
import { cn, formatNumberToPrice, getMediaUrl } from "@/_utils/helpers";
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

  const priceCheckQuery = usePriceCheck(product.sku, quantity);
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

  let discountedPrice = 0;
  if (product.override_price) {
    discountedPrice = parseFloat(product.override_price);
  } else if (priceCheckQuery?.data?.["list-sku-price"][0].price) {
    discountedPrice = priceCheckQuery.data?.["list-sku-price"][0].price;
  }
  const actualPrice =
    priceCheckQuery?.data?.["list-sku-price"][0].price ?? discountedPrice;
  const discount = ((actualPrice - discountedPrice) / actualPrice) * 100;

  const isDiscounted =
    !!priceCheckQuery.data && actualPrice !== discountedPrice;

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
          <div className="text-brand-gray-400 mb-2 text-center text-sm leading-5">
            {product.sku}
          </div>

          {accountListQuery.data ? (
            <>
              <div className="text-brand-gray-500 flex flex-row items-center justify-center gap-1 text-lg font-normal leading-5">
                {discountedPrice ? (
                  <span className="font-bold">${discountedPrice}</span>
                ) : (
                  <Skeleton className="h-4 w-[46px]" />
                )}
                <span>/</span>
                <span>{product.txt_uom_label}</span>
              </div>

              {priceCheckQuery.data ? (
                isDiscounted && (
                  <div className="mt-0.5 flex flex-row items-center justify-center gap-[5px]">
                    <div className="text-brand-gray-400 line-through">
                      ${actualPrice}
                    </div>

                    <div className="text-brand-success bg-brand-success/10 rounded-sm px-1 py-0.5 font-bold leading-none">
                      Save ${formatNumberToPrice(actualPrice - discountedPrice)}{" "}
                      ({Math.round(discount)}%)
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
                  priceCheckQuery.data
                    ? isDiscounted
                      ? "mt-3.5"
                      : "mt-9"
                    : "mt-3.5",
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
                  className="bg-brand-primary flex flex-1 flex-row items-center justify-between rounded-sm p-1.5 font-extrabold uppercase text-white"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    fill="none"
                    viewBox="0 0 25 24"
                  >
                    <path
                      fill="#fff"
                      d="M11.5 9V6h-3V4h3V1h2v3h3v2h-3v3h-2zm-4 13c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 015.5 20c0-.55.196-1.021.588-1.413A1.925 1.925 0 017.5 18c.55 0 1.02.196 1.412.587.392.392.588.863.588 1.413s-.196 1.021-.588 1.413A1.925 1.925 0 017.5 22zm10 0c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0115.5 20c0-.55.196-1.021.588-1.413A1.925 1.925 0 0117.5 18c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413s-.196 1.021-.587 1.413A1.928 1.928 0 0117.5 22zm2-5H4.125L7.1 11.6 3.5 4h-2V2h3.275l4.25 9h7.025l3.875-7H22.2l-4.975 9H8.6l-1.1 2h12v2z"
                    />
                  </svg>

                  <span>Add to cart</span>
                </button>

                {favoriteSkusQuery?.data?.[0].isFavourite ? (
                  <Link
                    href="/myaccount/myfavorites"
                    className="border-brand-success grid size-9 place-items-center rounded-sm border-2"
                  >
                    <VisuallyHidden>Favorites</VisuallyHidden>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="19"
                      fill="none"
                      viewBox="0 0 21 19"
                    >
                      <path
                        fill="#55a213"
                        d="M15.225 0c-1.827 0-3.58.839-4.725 2.164A6.324 6.324 0 005.775 0C2.541 0 0 2.506 0 5.695c0 3.914 3.57 7.103 8.977 11.949L10.5 19l1.523-1.367C17.43 12.798 21 9.61 21 5.695 21 2.505 18.459 0 15.225 0z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="border-brand-secondary grid size-9 place-items-center rounded-sm border-2"
                    onClick={addToFavorites}
                    disabled={addToFavoritesMutation.isPending}
                  >
                    <VisuallyHidden>Add to favorites</VisuallyHidden>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      fill="none"
                      viewBox="0 0 25 24"
                    >
                      <path
                        fill="#00ADEF"
                        d="M11.5 21l-3.175-2.85a92.776 92.776 0 01-3.087-2.9c-.859-.85-1.567-1.65-2.125-2.4-.559-.75-.967-1.475-1.225-2.175a6.296 6.296 0 01-.388-2.2c0-1.567.525-2.871 1.575-3.913C4.125 3.521 5.433 3 7 3c.867 0 1.692.183 2.475.55A5.93 5.93 0 0111.5 5.1a5.93 5.93 0 012.025-1.55A5.769 5.769 0 0116 3c1.35 0 2.483.379 3.4 1.137A5.69 5.69 0 0121.275 7H19.15c-.3-.667-.742-1.167-1.325-1.5A3.628 3.628 0 0016 5c-.85 0-1.583.23-2.2.688-.617.458-1.192 1.062-1.725 1.812h-1.15c-.517-.75-1.104-1.354-1.762-1.812A3.705 3.705 0 007 5c-.95 0-1.771.329-2.463.987C3.846 6.646 3.5 7.475 3.5 8.475c0 .55.117 1.108.35 1.675.233.567.65 1.221 1.25 1.963.6.741 1.417 1.608 2.45 2.599 1.033.992 2.35 2.188 3.95 3.588.433-.383.942-.825 1.525-1.325s1.05-.917 1.4-1.25l.225.225.487.488.488.487.225.225c-.367.333-.833.746-1.4 1.237-.567.492-1.067.93-1.5 1.313L11.5 21zm7-4v-3h-3v-2h3V9h2v3h3v2h-3v3h-2z"
                      />
                    </svg>
                  </button>
                )}
              </form>
            </>
          ) : (
            <button
              onClick={() => setOpenLoginDialog(true)}
              className="bg-brand-primary w-full rounded p-2 text-base text-white"
              disabled={accountListQuery.isLoading}
            >
              Login to buy
            </button>
          )}
        </ProductCardActions>

        {flag !== "hidden" && (
          <span
            className={cn(
              "absolute right-0 top-0 flex flex-row items-center gap-[5px] rounded-bl-[36px] p-3.5 text-[22px] font-extrabold uppercase leading-none",
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
