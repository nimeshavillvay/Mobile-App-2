"use client";

import HeartOutline from "@/components/icons/heart-outline";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatNumberToPrice } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { createContext, useContext, useId, type ComponentProps } from "react";

type Orientation = "vertical" | "horizontal";

const OrientationContext = createContext<Orientation>("vertical");
const useOrientation = () => {
  return useContext(OrientationContext);
};

export const ProductCard = ({
  className,
  orientation = "vertical",
  ...delegated
}: ComponentProps<"article"> & { orientation?: Orientation }) => {
  return (
    <OrientationContext.Provider value={orientation}>
      <article
        className={cn(
          "ui-flex ui-rounded-lg ui-border ui-border-solid ui-border-wurth-gray-250 ui-bg-white ui-p-3 ui-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
          orientation === "vertical" &&
            "ui-w-[12.5rem] ui-flex-col ui-gap-2 md:ui-w-64 md:ui-p-4",
          orientation === "horizontal" &&
            "ui-w-[24.75rem] ui-flex-row ui-gap-3",
          className,
        )}
        {...delegated}
      />
    </OrientationContext.Provider>
  );
};

export const ProductCardHero = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "ui-relative ui-shrink-0 ui-overflow-hidden ui-rounded",
        orientation === "horizontal" &&
          "ui-flex ui-flex-col ui-justify-between",
        className,
      )}
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
  const orientation = useOrientation();

  return (
    <Link href={href}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "ui-aspect-1 ui-object-contain",
          orientation === "vertical" && "ui-size-44 md:ui-size-56",
          orientation === "horizontal" && "ui-size-[8.5rem]",
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
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "ui-absolute ui-left-0 ui-top-0 ui-flex ui-flex-row ui-items-center ui-gap-0.5 ui-bg-green-50 ui-px-1.5 ui-text-base ui-text-green-600",
        orientation === "vertical" && "md:ui-px-2 md:ui-text-lg",
        className,
      )}
      {...delegated}
    >
      <span className="ui-font-semibold">{children}%</span> <span>off</span>
    </div>
  );
};

/**
 * When the orientation is "vertical", this component needs to be a child
 * of `ProductCardHero`. If the orientation is "horizontal", the parent
 * component should be `ProductCardContent`.
 */
export const ProductCardLabel = ({
  variant = "success",
  className,
  ...delegated
}: BadgeProps) => {
  const orientation = useOrientation();

  return (
    <Badge
      variant={variant}
      className={cn(
        "ui-bg-wurth-gray-50 ui-text-wurth-gray-800 ui-shadow-none hover:ui-bg-wurth-gray-150",
        orientation === "vertical" && "ui-absolute ui-right-0 ui-top-0",
        orientation === "horizontal" && "-ui-mb-1 ui-self-end",
        className,
      )}
      {...delegated}
    />
  );
};

export const ProductCardCompare = ({
  className,
  ...delegated
}: Omit<ComponentProps<typeof Checkbox>, "id">) => {
  const id = useId();
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "ui-flex ui-flex-row ui-items-center ui-gap-1 ui-rounded ui-bg-wurth-gray-50 ui-px-2 ui-py-1.5",
        orientation === "vertical" && "ui-absolute ui-bottom-0 ui-left-0",
        orientation === "horizontal" && "ui-mt-auto ui-max-w-fit",
      )}
    >
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
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "ui-flex ui-flex-col ui-gap-2",
        orientation === "vertical" && "ui-flex-1",
        className,
      )}
      {...delegated}
    />
  );
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
  const orientation = useOrientation();

  return (
    <div className="ui-space-y-1 ui-text-sm">
      <h3
        className={cn(
          "ui-font-medium ui-text-black",
          orientation === "vertical" && "ui-line-clamp-3",
          orientation === "horizontal" && "ui-line-clamp-2",
        )}
      >
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
          actualPrice ? "ui-text-green-600" : "ui-text-wurth-gray-800",
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

export const ProductCardVariantSelector = ({
  href,
  variants,
  value,
  onValueChange,
}: {
  href: string;
  variants: { value: string; title: string }[];
  value?: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <div className="ui-mt-auto ui-space-y-1">
      <h4 className="ui-text-sm ui-font-normal ui-text-wurth-gray-800">
        {variants.length} variations
      </h4>

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="ui-w-full">
          <SelectValue placeholder="Select a variation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {variants.map((variant) => (
              <SelectItem key={variant.value} value={variant.value}>
                {variant.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Link
        href={href}
        className={cn(buttonVariants({ variant: "default" }), "ui-w-full")}
      >
        View item
      </Link>
    </div>
  );
};

export const ProductCardActions = () => {
  return (
    <div className="ui-mt-auto ui-flex ui-flex-row ui-items-center ui-gap-1 md:ui-gap-2">
      <Button className="ui-h-10 ui-max-h-full ui-flex-1 ui-px-4 ui-text-[0.875rem] ui-leading-5">
        Add to cart
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="ui-size-10"
        aria-label="Add to favorites"
      >
        <HeartOutline className="ui-size-4 ui-fill-black" />
      </Button>
    </div>
  );
};

export const ProductCardSkeleton = ({
  className,
  orientation = "vertical",
  ...delegated
}: Omit<ComponentProps<typeof Skeleton>, "children"> & {
  orientation?: Orientation;
}) => {
  return (
    <Skeleton
      className={cn(
        "ui-rounded-lg ui-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
        orientation === "vertical" &&
          "ui-h-[23.25rem] ui-w-[17.5rem] md:ui-h-[25.75rem] md:ui-w-64",
        orientation === "horizontal" && "ui-h-48 ui-w-[24.75rem]",
        className,
      )}
      {...delegated}
    />
  );
};
