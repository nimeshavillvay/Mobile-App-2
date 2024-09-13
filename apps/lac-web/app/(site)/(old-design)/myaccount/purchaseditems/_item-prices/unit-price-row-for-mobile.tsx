import { formatNumberToPrice } from "@/_lib/utils";
import { calculatePriceDetails } from "@/old/_utils/price-utils";

type UnitPriceRowForMobileProps = {
  readonly price: number;
  readonly listPrice: number;
  readonly uom: string;
};

const UnitPriceRowForMobile = ({
  price,
  listPrice,
  uom,
}: UnitPriceRowForMobileProps) => {
  const { displayPrice, discount } = calculatePriceDetails(price, listPrice);

  return (
    <div className="mb-1 flex flex-col">
      <div className="flex flex-row items-center gap-1">
        <div className="font-bold">${formatNumberToPrice(displayPrice)}</div>
        <div className="text-sm">/ {uom ?? ""}</div>
      </div>
      {discount > 0 && (
        <div className="flex flex-row gap-1 text-sm">
          <div className="line-through">${formatNumberToPrice(listPrice)}</div>
          <div className="rounded-md bg-brand-success/10 px-1.5 font-bold text-brand-success">
            {discount}% off
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitPriceRowForMobile;
