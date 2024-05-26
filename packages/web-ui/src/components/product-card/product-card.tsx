"use client";

import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { createContext, useContext, type ComponentProps } from "react";
import { HeartOutline } from "~/components/icons/heart-outline";
import { Badge, BadgeProps } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { SkeletonProps } from "~/components/ui/skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { cn, formatNumberToPrice } from "~/lib/utils";
import { HeartFilled } from "../icons/heart-filled";

type Orientation = "vertical" | "horizontal";

const OrientationContext = createContext<Orientation>("vertical");
const useOrientation = () => {
  return useContext(OrientationContext);
};

const ProductCard = ({
  className,
  orientation = "vertical",
  ...delegated
}: ComponentProps<"article"> & { orientation?: Orientation }) => {
  return (
    <OrientationContext.Provider value={orientation}>
      <article
        className={cn(
          "flex rounded-lg border border-solid border-wurth-gray-250 bg-white p-3 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
          orientation === "vertical" &&
            "w-[12.5rem] flex-col gap-2 md:w-64 md:p-4",
          orientation === "horizontal" && "w-[24.75rem] flex-row gap-3",
          className,
        )}
        {...delegated}
      />
    </OrientationContext.Provider>
  );
};

const ProductCardHero = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded",
        orientation === "horizontal" && "flex flex-col justify-between",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardImage = ({
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
          "aspect-1 object-contain",
          orientation === "vertical" && "size-44 md:size-56",
          orientation === "horizontal" && "size-[8.5rem]",
          className,
        )}
        {...delegated}
      />

      <span className="sr-only">{title}</span>
    </Link>
  );
};

const ProductCardDiscount = ({
  className,
  children,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "absolute left-0 top-0 flex flex-row items-center gap-0.5 bg-green-50 px-1.5 text-base text-green-600",
        orientation === "vertical" && "md:px-2 md:text-lg",
        className,
      )}
      {...delegated}
    >
      <span className="font-semibold">{children}%</span> <span>off</span>
    </div>
  );
};

/**
 * When the orientation is "vertical", this component needs to be a child
 * of `ProductCardHero`. If the orientation is "horizontal", the parent
 * component should be `ProductCardContent`.
 */
const ProductCardLabel = ({
  variant = "success",
  className,
  ...delegated
}: BadgeProps) => {
  const orientation = useOrientation();

  return (
    <Badge
      variant={variant}
      className={cn(
        "bg-wurth-gray-50 text-wurth-gray-800 shadow-none hover:bg-wurth-gray-150",
        orientation === "vertical" && "absolute right-0 top-0",
        orientation === "horizontal" && "-mb-1 self-end",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardContent = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-2", className)}
      {...delegated}
    />
  );
};

const ProductCardDetails = ({
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
    <div className="space-y-1 text-sm">
      <h3
        className={cn(
          "font-medium text-black",
          orientation === "vertical" && "line-clamp-3",
          orientation === "horizontal" && "line-clamp-2",
        )}
      >
        <Link href={href}>{title}</Link>
      </h3>

      <div className="font-normal leading-none text-wurth-gray-400">{sku}</div>
    </div>
  );
};

const ProductCardPrice = ({
  price,
  uom,
  actualPrice,
}: {
  price: number;
  uom: string;
  actualPrice?: number;
}) => {
  return (
    <div className="text-xs font-normal text-wurth-gray-800 md:text-sm md:leading-none">
      <span
        className={cn(
          "font-bold",
          actualPrice && price !== actualPrice
            ? "text-green-600"
            : "text-wurth-gray-800",
        )}
      >
        $
        <span className="text-base md:text-lg">
          {formatNumberToPrice(price)}
        </span>
      </span>
      {!!actualPrice && price !== actualPrice && (
        <span className="ml-1 text-base font-normal text-wurth-gray-400 line-through md:text-lg">
          {formatNumberToPrice(actualPrice)}
        </span>
      )}
      /{uom}
    </div>
  );
};

const ProductCardActions = ({
  addToCart,
  isFavorite,
  onClickShoppingList,
  disabled = false,
}: {
  addToCart: () => void;
  isFavorite: boolean;
  onClickShoppingList: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="mt-auto flex flex-row items-center gap-1 md:gap-2">
      <Button
        className="h-10 max-h-full flex-1 px-4 text-[0.875rem] leading-5"
        onClick={addToCart}
        disabled={disabled}
      >
        Add to cart
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Add to favorites"
        disabled={disabled}
        onClick={onClickShoppingList}
      >
        {isFavorite ? (
          <HeartFilled className="size-4" />
        ) : (
          <HeartOutline className="size-4" />
        )}
      </Button>
    </div>
  );
};

const ProductCardVariantSelector = ({
  href,
  variants,
  value,
  onValueChange,
  addToCart,
  disabled,
  isFavorite,
  onClickShoppingList,
}: {
  href: string;
  variants: { value: string; title: string }[];
  value?: string;
  onValueChange: (value: string) => void;
  isFavorite: boolean;
  onClickShoppingList: () => void;
} & ComponentProps<typeof ProductCardActions>) => {
  return (
    <div className="mt-auto space-y-1">
      <h4 className="text-sm font-normal text-wurth-gray-800">
        {variants.length} variations
      </h4>

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
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

      {value ? (
        <ProductCardActions
          addToCart={addToCart}
          disabled={disabled}
          isFavorite={isFavorite}
          onClickShoppingList={onClickShoppingList}
        />
      ) : (
        <Link
          href={href}
          className={cn(buttonVariants({ variant: "default" }), "h-10 w-full")}
        >
          View item
        </Link>
      )}
    </div>
  );
};

const ProductCardSkeleton = ({
  className = "",
  orientation = "vertical",
  ...delegated
}: Omit<SkeletonProps, "children"> & {
  orientation?: Orientation;
}) => {
  return (
    <Skeleton
      className={cn(
        "rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
        orientation === "vertical" &&
          "h-[23.25rem] w-[17.5rem] md:h-[25.75rem] md:w-64",
        orientation === "horizontal" && "h-48 w-[24.75rem]",
        className,
      )}
      {...delegated}
    />
  );
};

export {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
  ProductCardSkeleton,
  ProductCardVariantSelector,
};
