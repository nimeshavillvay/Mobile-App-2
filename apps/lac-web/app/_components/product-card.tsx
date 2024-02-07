import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

export const ProductCardContainer = ({
  children,
}: {
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-between gap-3.5 border border-black/[0.13] px-4 py-5 shadow-[0_1px_6px_0px] shadow-black/10">
      {children}
    </div>
  );
};

export const ProductCardDetailsSkeleton = () => {
  return (
    <div>
      {/* Image */}
      <Skeleton className="aspect-[224/188]" />

      {/* Brand */}
      <Skeleton className="mx-auto mt-[25px] h-[15px] w-2/3" />

      {/* Product Name */}
      <Skeleton className="mt-3.5 h-4" />
      <Skeleton className="mt-2 h-4" />
      <Skeleton className="mt-2 h-4" />
    </div>
  );
};

export const ProductCardDetails = ({
  href,
  image: { src, alt, priority },
  brand,
  title,
}: {
  href: LinkProps["href"];
  image: Pick<ImageProps, "src" | "alt" | "priority">;
  brand: string;
  title: string;
}) => {
  return (
    <Link href={href} className="block text-center">
      <Image
        src={src}
        alt={alt}
        width={224}
        height={188}
        className="mx-auto aspect-[224/188] object-contain"
        priority={priority}
      />

      <div className="text-brand-gray-500 mb-1.5 mt-5 text-[15px] uppercase leading-5">
        {brand}
      </div>

      <h3 className="left-5 text-base font-bold">{title}</h3>
    </Link>
  );
};

export const ProductCardActions = ({ children }: { children?: ReactNode }) => {
  return <div>{children}</div>;
};
