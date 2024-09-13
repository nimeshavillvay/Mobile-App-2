"use client";

import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { createContext, useContext, type ComponentProps } from "react";
import type { BadgeProps } from "~/components/base/atoms/badge";
import { Badge } from "~/components/base/atoms/badge";
import type { SkeletonProps } from "~/components/base/atoms/skeleton";
import { Skeleton } from "~/components/base/atoms/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/base/molecules/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cva, type VariantProps } from "~/lib/cva.config";
import { cn, formatNumberToPrice } from "~/lib/utils";

type Orientation = "vertical" | "horizontal";

const OrientationContext = createContext<Orientation>("vertical");
const useOrientation = () => {
  return useContext(OrientationContext);
};

const ProductCard = ({
  className,
  orientation = "vertical",
  ...delegated
}: ComponentProps<typeof Card> & { readonly orientation?: Orientation }) => {
  return (
    <OrientationContext.Provider value={orientation}>
      <Card
        className={cn(
          "flex rounded-lg border border-solid border-wurth-gray-250 bg-white p-3 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
          orientation === "vertical" &&
            "w-[12.5rem] flex-col gap-3 md:w-64 md:p-4",
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
}: ComponentProps<typeof CardHeader>) => {
  const orientation = useOrientation();

  return (
    <CardHeader
      className={cn(
        "relative shrink-0 space-y-0 overflow-hidden rounded p-0",
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
    readonly title: string;
  }) => {
  const orientation = useOrientation();

  return (
    <Link
      href={href}
      className="flex items-center justify-center"
      data-testid="product-card-image-link"
    >
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
  variant = "success",
  className,
  children,
  ...delegated
}: ComponentProps<typeof Badge>) => {
  const orientation = useOrientation();

  return (
    <Badge
      variant={variant}
      className={cn(
        "flex w-fit items-center gap-0.5 bg-green-50 px-1.5 text-base text-green-600 shadow-none hover:bg-green-100 md:pr-5",
        orientation === "vertical" && "md:px-2 md:text-lg",
        className,
      )}
      {...delegated}
    >
      <span className="font-semibold">{children}%</span> <span>off</span>
    </Badge>
  );
};

/**
 * When the orientation is "vertical", this component needs to be a child
 * of `ProductCardHero`. If the orientation is "horizontal", the parent
 * component should be `ProductCardContent`.
 */
const productBadgeVariants = cva({
  base: "bg-wurth-gray-50 text-wurth-gray-800 shadow-none hover:bg-wurth-gray-150",
  variants: {
    productVariant: {
      new: "bg-red-50 text-yellow-700 hover:bg-red-100",
      sale: "bg-sky-50 text-wurth-blue-450 hover:bg-sky-100",
    },
  },
});

const ProductCardBadge = ({
  className,
  productVariant,
  children,
  ...props
}: BadgeProps & VariantProps<typeof productBadgeVariants>) => {
  return (
    <Badge
      className={cn(productBadgeVariants({ productVariant }), className)}
      {...props}
    >
      {children}
    </Badge>
  );
};

const ProductCardContent = ({
  className,
  ...delegated
}: ComponentProps<typeof CardContent>) => {
  return (
    <CardContent
      className={cn(
        "flex flex-1 flex-col justify-between gap-2 p-0",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardDetails = ({
  title,
  sku,
  href,
  useInnerHtml = false,
}: {
  readonly title: string;
  readonly sku: string;
  readonly href: LinkProps["href"];
  readonly useInnerHtml?: boolean;
}) => {
  const titleContent = useInnerHtml ? (
    <span dangerouslySetInnerHTML={{ __html: title }} />
  ) : (
    title
  );
  return (
    <TooltipProvider>
      <div className="space-y-1 text-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="line-clamp-2 font-medium text-black">
              <Link href={href}>{titleContent}</Link>
            </h3>
          </TooltipTrigger>

          <TooltipContent>
            {useInnerHtml ? (
              <p dangerouslySetInnerHTML={{ __html: title }} />
            ) : (
              <p>{title}</p>
            )}
          </TooltipContent>
        </Tooltip>

        <div className="font-normal leading-none text-wurth-gray-400">
          {sku}
        </div>
      </div>
    </TooltipProvider>
  );
};

const ProductCardPrice = ({
  price,
  uom,
  actualPrice,
}: {
  readonly price: number;
  readonly uom: string;
  readonly actualPrice?: number;
}) => {
  return (
    <div className="text-xs font-normal text-wurth-gray-800 md:text-sm md:leading-none">
      <span
        className={cn(
          "font-bold",
          actualPrice && price < actualPrice
            ? "text-green-600"
            : "text-wurth-gray-800",
        )}
      >
        $
        <span className="text-base md:text-lg">
          {formatNumberToPrice(price)}
        </span>
      </span>
      {!!actualPrice && price < actualPrice && (
        <span className="ml-1 text-base font-normal text-wurth-gray-400 line-through md:text-lg">
          {formatNumberToPrice(actualPrice)}
        </span>
      )}
      /{uom}
    </div>
  );
};

const ProductCardActions = ({
  className,
  ...delegated
}: ComponentProps<typeof CardFooter>) => {
  return (
    <CardFooter
      className={cn("flex flex-row items-center gap-1 p-0 md:gap-2", className)}
      {...delegated}
    />
  );
};

const ProductCardVariantSelector = ({
  variants,
  value,
  onValueChange,
  children,
}: {
  readonly href: string;
  readonly variants: { value: string; title: string }[];
  readonly value?: string;
  readonly onValueChange: (value: string) => void;
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
                <span dangerouslySetInnerHTML={{ __html: variant.title }} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {children}
    </div>
  );
};

const ProductCardSkeleton = ({
  className = "",
  orientation = "vertical",
  ...delegated
}: Omit<SkeletonProps, "children"> & {
  readonly orientation?: Orientation;
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
      data-testid="skeleton"
      {...delegated}
    />
  );
};

export {
  OrientationContext,
  ProductCard,
  ProductCardActions,
  ProductCardBadge,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCardSkeleton,
  ProductCardVariantSelector,
  useOrientation,
};
