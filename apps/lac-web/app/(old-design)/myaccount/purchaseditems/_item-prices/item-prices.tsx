import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { formatNumberToPrice } from "@/old/_utils/helpers";
import type { PriceRow } from "./types";
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
  const prices = itemPricesQuery.data.productPrices[0] ?? null;
  const priceUnit = prices?.priceUnit ?? "";
  const priceBreakDownArray = prices?.priceBreakDowns;

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
      {priceBreakDownArray && priceBreakDownArray.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="h-8 text-left font-bold text-black">
                Qty
              </TableHead>
              <TableHead className="h-8 text-center font-bold text-black">
                UOM
              </TableHead>
              <TableHead className="h-8 text-right font-bold text-black">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {priceBreakDownArray.map((breakDown, index) => (
              <PriceRow
                key={`${breakDown.price}_${index}`}
                quantity={breakDown.quantity}
                uom={uom}
                price={`$${formatNumberToPrice(breakDown.price)} / ${priceUnit}`}
              />
            ))}
          </TableBody>
        </Table>
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
  <TableRow className="border-b-0">
    <TableCell className="py-1 text-left">{quantity}</TableCell>
    <TableCell className="py-1 text-center">{uom}</TableCell>
    <TableCell className="text-nowrap py-1 text-right">{price}</TableCell>
  </TableRow>
);
