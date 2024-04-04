import useSuspensePriceCheck from "@/_hooks/use-suspense-price-check.hook";
import { formatNumberToPrice } from "@/old/_utils/helpers";
import type { ItemPrices, PriceBreakDowns, PriceRow } from "./types";
import UnitPriceRow from "./unit-price-row";
import UnitPriceRowForMobile from "./unit-price-row-for-mobile";

type ItemPricesProps = {
  token: string;
  sku: string;
  quantity: number;
  uom: string;
  salePrice: number;
  showUnitPrice?: boolean;
  unitPriceOnly?: boolean;
};

const ItemPrices = ({
  token,
  sku,
  quantity,
  uom,
  salePrice,
  showUnitPrice = false,
  unitPriceOnly = false,
}: ItemPricesProps) => {
  const itemPricesQuery = useSuspensePriceCheck(token, sku, quantity);

  const prices = itemPricesQuery.data?.["list-sku-price"][0] ?? null;
  const priceUnit = prices?.["price-unit"] ?? "";

  const priceBreakDownArray = prices
    ? Object.keys(prices.pricebreakdowns)
        .filter((key) => key.startsWith("quantity"))
        .map((key) => {
          const index = parseInt(key.replace("quantity", ""));
          const quantityKey = `quantity${index}` as keyof PriceBreakDowns;
          const priceKey = `price${index}` as keyof PriceBreakDowns;
          const quantity = prices.pricebreakdowns[quantityKey];
          const price = prices.pricebreakdowns[priceKey];
          return { quantity, price };
        })
        .filter(({ quantity }) => quantity > 0)
    : [];

  if (unitPriceOnly && prices) {
    return (
      <UnitPriceRowForMobile
        salePrice={salePrice}
        uom={priceUnit}
        price={prices.price}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-2 py-2 text-sm text-brand-gray-500">
      {priceBreakDownArray.length > 0 && (
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="text-left font-bold text-black">Qty</div>
          <div className="text-center font-bold text-black">UOM</div>
          <div className="text-right font-bold text-black">Price</div>
          {priceBreakDownArray.map((breakDown, index) => (
            <PriceRow
              key={index}
              quantity={Number(breakDown.quantity)}
              uom={uom}
              price={`$${formatNumberToPrice(breakDown.price)} / ${priceUnit}`}
            />
          ))}
        </div>
      )}

      {showUnitPrice && prices && (
        <UnitPriceRow
          salePrice={salePrice}
          uom={priceUnit}
          price={prices.price}
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
