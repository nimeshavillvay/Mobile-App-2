import { formatNumberToPrice } from "@/old/_utils/helpers";
import { calculatePriceDetails } from "@/old/_utils/price-utils";

type UnitPriceRowProps = {
  price: number;
  salePrice: number;
  uom: string;
};

// TODO: Can be reusable in other components
const UnitPriceRow = ({ price, salePrice, uom }: UnitPriceRowProps) => {
  const { displayPrice, originalPrice, savingAmount, discount } =
    calculatePriceDetails(price, salePrice);

  return (
    <div className="flex flex-row justify-end gap-1 px-4">
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

export default UnitPriceRow;
