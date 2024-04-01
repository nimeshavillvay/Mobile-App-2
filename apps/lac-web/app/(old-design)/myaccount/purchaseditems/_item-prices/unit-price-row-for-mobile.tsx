import { formatNumberToPrice } from "@/old/_utils/helpers";
import { calculatePriceDetails } from "@/old/_utils/price-utils";

type UnitPriceRowForMobileProps = {
  price: number;
  salePrice: number;
  uom: string;
};

const UnitPriceRowForMobile = ({
  price,
  salePrice,
  uom,
}: UnitPriceRowForMobileProps) => {
  const { displayPrice, originalPrice, savingAmount, discount } =
    calculatePriceDetails(price, salePrice);

  return (
    <div className="mb-1 flex flex-col">
      <div className="flex flex-row items-center gap-1">
        <div className="font-bold">${formatNumberToPrice(displayPrice)}</div>
        <div className="text-sm">/ {uom ?? ""}</div>
      </div>
      {savingAmount > 0 && (
        <div className="flex flex-row gap-1 text-sm">
          <div className="line-through">
            ${formatNumberToPrice(originalPrice)}
          </div>
          <div className="rounded-md bg-brand-success/10 px-1.5 font-bold text-brand-success">
            {discount}% off
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitPriceRowForMobile;
