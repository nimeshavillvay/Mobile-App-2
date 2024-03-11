import { AddToCart, HeartOutline } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn, formatNumberToPrice } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { type ComponentProps } from "react";

export const ProductCard = ({
  className,
  ...delegated
}: ComponentProps<"article">) => {
  return (
    <article
      className={cn(
        "ui-relative ui-flex ui-w-[17.5rem] ui-flex-col ui-gap-1 ui-rounded-xl ui-border ui-border-solid ui-border-wurth-gray-150 ui-bg-white ui-p-4 ui-shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.10),_0px_1px_2px_0px_rgba(0,_0,_0,_0.10)]",
        className,
      )}
      {...delegated}
    />
  );
};

export const ProductCardImage = ({
  src,
  alt,
  width = 248,
  height = 248,
  className,
  ...delegated
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "ui-aspect-1 ui-size-[15.5rem] ui-rounded ui-object-contain",
        className,
      )}
      {...delegated}
    />
  );
};

export const ProductCardBanner = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "ui-absolute ui-left-4 ui-top-4 ui-rounded ui-bg-green-100 ui-px-2.5 ui-py-0.5 ui-text-lg ui-text-green-700",
        className,
      )}
      {...delegated}
    />
  );
};

export const ProductCardContent = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return <div className={cn("ui-space-y-2", className)} {...delegated} />;
};

export const ProductCardDetails = ({
  title,
  sku,
}: {
  title: string;
  sku: string;
}) => {
  return (
    <div className="ui-space-y-1 ui-text-sm ui-font-medium">
      <h3 className="ui-text-black">{title}</h3>

      <div className="ui-leading-none ui-text-wurth-gray-400">{sku}</div>
    </div>
  );
};

export const ProductCardPrice = ({
  price,
  uom,
  actualPrice,
}: {
  price: number;
  uom: string;
  actualPrice?: number;
}) => {
  const discount = (actualPrice ?? price) - price;

  return (
    <div>
      <div className="ui-text-sm ui-font-medium ui-leading-none ui-text-wurth-gray-800">
        $
        <span className="ui-font-title ui-text-lg ui-font-semibold ui-tracking-[-0.00625rem]">
          {formatNumberToPrice(price)}
        </span>
        /{uom}
      </div>

      {!!actualPrice && (
        <div className="ui-flex ui-flex-row ui-items-center ui-gap-1 ui-text-sm">
          <div className="ui-text-wurth-gray-400 ui-line-through">
            ${formatNumberToPrice(actualPrice)}
          </div>

          <div className="ui-font-semibold ui-text-green-600">
            Save ${formatNumberToPrice(discount)}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductCardActions = () => {
  return (
    <div className="ui-flex ui-flex-row ui-items-center ui-gap-2.5">
      <Button className="ui-flex-1">
        <AddToCart className="ui-size-4 ui-stroke-white" />{" "}
        <span>Add to cart</span>
      </Button>

      <Button variant="outline" size="icon">
        <HeartOutline className="ui-size-4 ui-fill-black" />
      </Button>
    </div>
  );
};
