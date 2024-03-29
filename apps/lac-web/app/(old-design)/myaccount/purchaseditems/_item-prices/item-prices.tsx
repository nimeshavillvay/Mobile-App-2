import { formatNumberToPrice } from "@/old/_utils/helpers";
import type { ItemPrices, PriceBreakDowns, PriceRow } from "./types";
import useSuspensePriceCheck from "./use-suspense-price-check.hook";

type ItemPricesProps = {
  token: string;
  sku: string;
  quantity: number;
  uom: string;
  salePrice: string;
};

const ItemPrices = ({
  token,
  sku,
  quantity,
  uom,
  salePrice,
}: ItemPricesProps) => {
  const itemPricesQuery = useSuspensePriceCheck(token, sku, quantity);

  const prices = itemPricesQuery.data ?? null;
  const priceBreakDown = prices?.["list-sku-price"][0] ?? null;
  const priceUnit = prices?.["list-sku-price"][0]?.["price-unit"] ?? null;
  const priceBreakDownArray: PriceRow[] = [];

  if (priceBreakDown) {
    priceBreakDownArray.push(
      ...Object.keys(priceBreakDown.pricebreakdowns)
        .filter((key) => key.startsWith("quantity"))
        .map((key) => {
          const index = parseInt(key.replace("quantity", ""));
          const quantity =
            priceBreakDown.pricebreakdowns[
              `quantity${index}` as keyof PriceBreakDowns
            ];
          const price =
            priceBreakDown.pricebreakdowns[
              `price${index}` as keyof PriceBreakDowns
            ];
          return { quantity, price };
        })
        .filter(({ quantity }) => quantity > 0),
    );
  }

  return (
    <div className="flex flex-col space-y-2 py-2 text-sm text-brand-gray-500">
      {priceBreakDown && priceBreakDown.pricebreakdowns.quantity1 > 0 && (
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="text-left font-bold text-black">Qty</div>
          <div className="text-center font-bold text-black">UOM</div>
          <div className="text-right font-bold text-black">Price</div>
          {priceBreakDownArray?.length > 0 &&
            priceBreakDownArray.map((breakDown, index) => (
              <PriceRow
                key={index}
                quantity={breakDown.quantity}
                uom={uom}
                price={`$${formatNumberToPrice(breakDown.price)} / ${priceUnit}`}
              />
            ))}
        </div>
      )}

      {priceBreakDown && (
        <EachPriceRow
          salePrice={Number(salePrice)}
          uom={priceUnit ?? ""}
          price={priceBreakDown.price}
        />
      )}
    </div>
  );
};

export default ItemPrices;

const PriceRow = ({
  quantity,
  uom,
  price,
}: {
  quantity: number;
  uom: string;
  price: string;
}) => (
  <>
    <div className="text-left">{quantity}</div>
    <div className="text-center">{uom}</div>
    <div className="text-nowrap text-right">{price}</div>
  </>
);

const EachPriceRow = ({
  salePrice,
  price,
  uom,
}: {
  salePrice: number;
  price: number;
  uom: string;
}) => {
  const displayPrice = salePrice > 0 && price > salePrice ? salePrice : price;
  const originalPrice = salePrice > 0 && price > salePrice ? price : 0;
  const savingAmount =
    salePrice > 0 && price > salePrice ? price - salePrice : 0;
  const discount =
    salePrice > 0 && price > salePrice
      ? (((price - salePrice) / price) * 100).toFixed(0.5)
      : 0;

  return (
    <div className="flex flex-row justify-end gap-1">
      <div className="font-bold">${formatNumberToPrice(displayPrice)}</div>
      <div>/ {uom ?? ""}</div>
      {savingAmount > 0 && (
        <>
          <div className="line-through">
            ${formatNumberToPrice(originalPrice)}
          </div>
          <div className="rounded-md bg-brand-success/10 px-1.5 font-bold text-brand-success">
            {discount}% off
          </div>
        </>
      )}
    </div>
  );
};
