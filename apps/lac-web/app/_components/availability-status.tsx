import { UI_DATE_FORMAT } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import dayjs from "dayjs";

type AvailabilityStatusProps = {
  readonly location: string;
  readonly amount: number;
  readonly isHomeBranch: boolean;
  readonly backOrderDate: string;
  readonly isLimitedStock: boolean;
  readonly isNotInStock: boolean;
};

const AvailabilityStatus = ({
  isLimitedStock,
  isNotInStock,
  isHomeBranch,
  amount,
  location,
  backOrderDate,
}: AvailabilityStatusProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <div
        className={cn(
          "rounded px-4 py-2 text-sm font-semibold leading-4 md:px-2 md:py-1",
          isLimitedStock || isNotInStock || !isHomeBranch
            ? "bg-yellow-50 text-yellow-700"
            : "bg-green-50 text-green-700",
        )}
      >
        {isNotInStock || !isHomeBranch
          ? "Backordered"
          : isLimitedStock
            ? "Limited Stock"
            : "In Stock"}
      </div>

      {isHomeBranch && !isNotInStock && (
        <div className="text-sm font-medium text-wurth-gray-800">
          {amount} in stock at {location}
        </div>
      )}
      {(isNotInStock || !isHomeBranch) && !!backOrderDate && (
        <div className="flex-1 text-sm font-medium text-wurth-gray-800">
          Items are expected to ship by{" "}
          {dayjs(backOrderDate).format(UI_DATE_FORMAT)}.
        </div>
      )}
    </div>
  );
};

export default AvailabilityStatus;
