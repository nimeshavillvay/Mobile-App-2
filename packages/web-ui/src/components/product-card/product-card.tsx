import HeartOutline from "@/components/icons/heart-outline";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn, formatNumberToPrice } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { useId, type ComponentProps } from "react";

export const ProductCard = ({
  className,
  ...delegated
}: ComponentProps<"article">) => {
  return (
    <article
      className={cn(
        "ui-flex ui-w-[12.5rem] ui-flex-col ui-gap-2 ui-rounded-lg ui-border ui-border-solid ui-border-wurth-gray-250 ui-bg-white ui-p-3 ui-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)] md:ui-w-64 md:ui-p-4",
        className,
      )}
      {...delegated}
    />
  );
};

export const ProductCardHero = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn("ui-relative ui-overflow-hidden ui-rounded", className)}
      {...delegated}
    />
  );
};

export const ProductCardImage = ({
  src,
  alt,
  width = 224,
  height = 224,
  className,
  href,
  title,
  ...delegated
}: ImageProps &
  Pick<LinkProps, "href"> & {
    /**
     * Title to show for screen readers
     */
    title: string;
  }) => {
  return (
    <Link href={href}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "ui-aspect-1 ui-size-44 ui-object-contain md:ui-size-56",
          className,
        )}
        {...delegated}
      />

      <span className="ui-sr-only">{title}</span>
    </Link>
  );
};

export const ProductCardDiscount = ({
  className,
  children,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "ui-absolute ui-left-0 ui-top-0 ui-flex ui-flex-row ui-items-center ui-gap-0.5 ui-bg-green-50 ui-px-1.5 ui-text-base ui-text-green-600 md:ui-px-2 md:ui-text-lg",
        className,
      )}
      {...delegated}
    >
      <span className="ui-font-semibold">{children}%</span> <span>off</span>
    </div>
  );
};

export const ProductCardLabel = ({
  variant = "secondary",
  className,
  ...delegated
}: BadgeProps) => {
  return (
    <Badge
      variant={variant}
      className={cn("ui-absolute ui-right-0 ui-top-0", className)}
      {...delegated}
    />
  );
};

export const ProductCardCompare = ({
  className,
  ...delegated
}: Omit<ComponentProps<typeof Checkbox>, "id">) => {
  const id = useId();

  return (
    <div className="ui-absolute ui-bottom-0 ui-left-0 ui-flex ui-flex-row ui-items-center ui-gap-1 ui-rounded ui-bg-wurth-gray-50 ui-px-2 ui-py-1.5">
      <Checkbox
        id={id}
        className={cn("ui-bg-white", className)}
        {...delegated}
      />

      <Label htmlFor={id}>Compare</Label>
    </div>
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
  href,
}: {
  title: string;
  sku: string;
  href: LinkProps["href"];
}) => {
  return (
    <div className="ui-space-y-1 ui-text-sm">
      <h3 className="ui-line-clamp-3 ui-font-medium ui-text-black">
        <Link href={href}>{title}</Link>
      </h3>

      <div className="ui-font-normal ui-leading-none ui-text-wurth-gray-400">
        {sku}
      </div>
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
  return (
    <div className="ui-text-xs ui-font-normal ui-text-wurth-gray-800 md:ui-text-sm md:ui-leading-none">
      <span
        className={cn(
          "ui-font-bold",
          actualPrice ? "ui-text-green-600" : "ui-text-wurth-gray-400",
        )}
      >
        $
        <span className="ui-text-base md:ui-text-lg">
          {formatNumberToPrice(price)}
        </span>
      </span>
      {!!actualPrice && (
        <span className="ui-ml-1 ui-text-base ui-font-normal ui-text-wurth-gray-400 ui-line-through md:ui-text-lg">
          {formatNumberToPrice(actualPrice)}
        </span>
      )}
      /{uom}
    </div>
  );
};

export const ProductCardActions = () => {
  return (
    <div className="ui-flex ui-flex-row ui-items-center ui-gap-1 md:ui-gap-2">
      <Button
        variant="secondary"
        className="ui-h-10 ui-max-h-full ui-flex-1 ui-px-4 ui-text-[0.875rem] ui-leading-5"
      >
        Add to cart
      </Button>

      <Button variant="cancel" size="icon" className="ui-size-10">
        <HeartOutline className="ui-size-4 ui-fill-black" />

        <span className="ui-sr-only">Add to favorites</span>
      </Button>
    </div>
  );
};

export const ProductCardSkeleton = ({
  className,
  ...delegated
}: Omit<ComponentProps<"div">, "children">) => {
  return (
    <div
      className={cn(
        "ui-h-[23.25rem] ui-w-[17.5rem] ui-animate-pulse ui-rounded-lg ui-border ui-border-wurth-gray-250 ui-bg-wurth-gray-250 md:ui-h-[25.75rem] md:ui-w-64 ",
        className,
      )}
      {...delegated}
    />
  );
};
