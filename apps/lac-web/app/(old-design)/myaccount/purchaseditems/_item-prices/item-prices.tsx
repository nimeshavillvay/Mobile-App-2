import type { ItemPrices, PriceBreakDowns, PriceRow, SKUPrice } from "./types";
import useSuspensePriceCheck from "./use-suspense-price-check.hook";

type ItemPricesProps = {
  token: string;
  sku: string;
  quantity: number;
  uom: string;
};

const ItemPrices = ({ token, sku, quantity, uom }: ItemPricesProps) => {
  const itemPricesQuery = useSuspensePriceCheck(token, sku, quantity);

  const prices: ItemPrices = itemPricesQuery.data ?? null;
  const priceBreakDown: SKUPrice =
    (prices?.["list-sku-price"]?.[0] as SKUPrice) ?? null;
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
    <div className="flex flex-row py-2 text-sm text-brand-gray-500">
      {priceBreakDown?.pricebreakdowns.quantity1 > 0 && (
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
                price={`$${breakDown.price} / ${uom}`}
              />
            ))}
        </div>
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
