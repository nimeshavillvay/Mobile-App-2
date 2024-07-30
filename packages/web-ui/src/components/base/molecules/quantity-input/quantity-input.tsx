import { useState } from "react";
import { Button } from "~/components/base/atoms/button";
import { Input } from "~/components/base/atoms/input";
import { Label } from "~/components/base/atoms/label";
import { cn } from "~/lib/utils";

type QuantityInputProps = {
  readonly className?: string;
  readonly minQuantity?: number;
  readonly maxQuantity?: number;
  readonly step?: number;
  readonly initialQuantity?: number;
  readonly uom?: string;
  readonly showLabel?: string;
};

const QuantityInput = ({
  className,
  minQuantity = 1,
  maxQuantity = 100,
  step = 1,
  initialQuantity = 1,
  uom = "each",
  showLabel = "",
}: QuantityInputProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + step, maxQuantity));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - step, minQuantity));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(minQuantity, Math.min(value, maxQuantity)));
    }
  };

  return (
    <form
      className={cn("mx-auto max-w-xs", className)}
      title="quantity-input-form"
    >
      {showLabel ? <Label htmlFor="quantity-input">{showLabel}</Label> : null}
      <div className="relative flex max-w-[11rem] items-center">
        <Button
          type="button"
          id="decrement-button"
          aria-label="Decrement quantity"
          onClick={handleDecrement}
          variant="ghost"
          className="h-11 rounded-none rounded-s-md border-y border-l border-gray-300 p-3 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-3 w-3 text-black dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </Button>

        {uom ? (
          <div className="absolute bottom-1 start-1/2 flex -translate-x-1/2 items-center space-x-1 text-xs text-gray-400 rtl:translate-x-1/2 rtl:space-x-reverse">
            <span className="line-clamp-1 overflow-hidden uppercase">
              qty/{uom}
            </span>
          </div>
        ) : null}
        <Input
          type="text"
          id="quantity-input"
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
          step={step}
          className="block h-11 w-full rounded-none border-x-0 border-gray-300 pb-6 text-center text-sm font-medium text-black shadow-none focus:border-gray-300 focus:ring-0 focus-visible:ring-0"
          placeholder=""
          required
        />

        <Button
          type="button"
          id="increment-button"
          aria-label="Increment quantity"
          onClick={handleIncrement}
          variant="ghost"
          className="h-11 rounded-none rounded-e-md border-y border-r border-gray-300 p-3 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-3 w-3 text-black dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </Button>
      </div>
      <Label className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Min Order: {minQuantity} Quantity Multiple: {step}
      </Label>
    </form>
  );
};

export default QuantityInput;
