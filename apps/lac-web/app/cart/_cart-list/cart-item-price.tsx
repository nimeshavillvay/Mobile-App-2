import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Token } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/web-ui/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCartFormIdContext } from "../cart-form-id-context";
import type { ViewportTypes } from "./types";

const EXCLUDED_KEYS = ["e", "E", "+", "-"];
const MIN_STEP = 0.0001;

type CartItemPriceProps = {
  readonly quantity: number;
  readonly productId: number;
  readonly token: Token;
  readonly cartItemId: number;
  readonly onPriceChange?: (newPrice: number) => void;
  readonly type: ViewportTypes;
};

const cartItemPriceSchema = z.object({
  price: z
    .number({
      message: "Price required",
    })
    .positive("Price must be positive")
    .multipleOf(MIN_STEP, "Invalid price"),
});

const CartItemPrice = ({
  quantity,
  productId,
  token,
  cartItemId,
  onPriceChange,
  type,
}: CartItemPriceProps) => {
  const cartFormId = useCartFormIdContext();

  const loginCheckResponse = useSuspenseCheckLogin(token);
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: productId, qty: quantity, cartId: cartItemId },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];
  const extendedPrice = priceData?.extendedPrice;
  const price = priceData?.price;
  const priceUnit = priceData?.priceUnit;
  const listPrice = priceData?.listPrice;

  const loginCheckData = loginCheckResponse.data;

  const { register, formState, trigger, getValues } = useForm<
    z.infer<typeof cartItemPriceSchema>
  >({
    resolver: zodResolver(cartItemPriceSchema),
    values: {
      price: Number(price) ?? 0,
    },
  });

  const onBlur = async () => {
    const data = getValues();

    await trigger(); // Trigger validation on blur

    if (onPriceChange) {
      onPriceChange(Number(data.price));
    }
  };

  const onChange = async () => {
    await trigger(); // Trigger validation on change
  };

  if (
    loginCheckData.status_code === "OK" &&
    "sales_rep_id" in loginCheckData &&
    "user_id" in loginCheckData
  ) {
    return (
      <>
        <div
          className={cn(
            "flex w-full items-center",
            type === "desktop" ? "justify-end" : "justify-start md:hidden",
          )}
        >
          <Input
            className={cn(
              "h-fit w-24 rounded-none rounded-l border-r-0 px-2.5 py-1 text-right text-base focus:border-none focus:outline-none focus:ring-0 md:w-20",
              formState.errors.price ? "border-red-700" : "border-gray-200",
            )}
            type="number"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              onBlur: onBlur,
              onChange: onChange,
            })}
            min={MIN_STEP}
            step={MIN_STEP}
            form={cartFormId} // This is to check the validity when clicking "checkout"
            onKeyDown={(e) => {
              if (EXCLUDED_KEYS.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <span
            className={cn(
              "rounded-r border border-l-0 p-1 pr-1.5 lowercase text-wurth-gray-400",
              formState.errors.price ? "border-red-700" : "border-gray-200",
            )}
          >
            /{priceUnit}
          </span>
        </div>

        {formState.errors.price && (
          <p className="text-xs text-red-700">
            {formState.errors.price.message}
          </p>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex",
        type === "desktop"
          ? "flex-col items-end text-right"
          : "flex-row items-center md:hidden",
      )}
    >
      <div className="text-lg text-green-700">
        ${formatNumberToPrice(extendedPrice)}
      </div>

      <div className="ml-2 text-sm font-medium text-wurth-gray-500">
        ${formatNumberToPrice(price)}/{priceUnit}
      </div>

      {listPrice && price && listPrice > price && (
        <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
          ${formatNumberToPrice(listPrice)}/{priceUnit}
        </div>
      )}
    </div>
  );
};

export default CartItemPrice;