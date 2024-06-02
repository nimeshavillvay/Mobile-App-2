import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Token } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/web-ui/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ViewportTypes } from "./types";

type CartItemPriceProps = {
  readonly quantity: number;
  readonly productId: number;
  readonly token: Token;
  readonly type: ViewportTypes;
};

const cartItemPriceSchema = z.object({
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.0001).max(999999999)),
});

const CartItemPrice = ({
  quantity,
  productId,
  token,
  type,
}: CartItemPriceProps) => {
  const loginCheckResponse = useSuspenseCheckLogin(token);
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: productId, qty: quantity },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];
  const loginCheckData = loginCheckResponse.data;

  const { register, formState } = useForm<z.infer<typeof cartItemPriceSchema>>({
    resolver: zodResolver(cartItemPriceSchema),
    values: {
      price: priceData?.price ?? 0,
    },
  });

  console.log(formState.errors);

  if (
    loginCheckData.status_code === "OK" &&
    "sales_rep_id" in loginCheckData &&
    "user_id" in loginCheckData
  ) {
    return (
      <div
        className={cn(
          "flex w-full items-center",
          type === "desktop" ? "justify-end" : "justify-start md:hidden",
        )}
      >
        <Input
          className={cn(
            "h-fit w-24 rounded-none rounded-l border-r-0 px-2.5 py-1 text-right text-base md:w-20",
            formState.errors.price ? "border-red-700" : "border-green-700",
          )}
          type="number"
          {...register("price")}
        />
        <span className="rounded-r border border-l-0 p-1 pr-1.5 lowercase text-wurth-gray-400">
          /{priceData?.priceUnit}
        </span>
      </div>
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
        ${formatNumberToPrice(priceData?.extendedPrice)}
      </div>

      <div className="ml-2 text-sm font-medium text-wurth-gray-500">
        ${formatNumberToPrice(priceData?.price)}/{priceData?.priceUnit}
      </div>

      {priceData?.listPrice &&
        priceData?.price &&
        priceData?.listPrice > priceData?.price && (
          <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
            ${formatNumberToPrice(priceData?.listPrice)}/{priceData?.priceUnit}
          </div>
        )}
    </div>
  );
};

export default CartItemPrice;
