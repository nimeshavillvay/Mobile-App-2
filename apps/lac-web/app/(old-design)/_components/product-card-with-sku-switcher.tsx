"use client";

import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetails,
} from "@/old/_components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { getMediaUrl } from "@/old/_utils/helpers";
import Link from "next/link";
import { useState, type ComponentProps } from "react";

type ProductCardWithSkuSwitcherProps = {
  details: ComponentProps<typeof ProductCardDetails>;
  variations: { sku: string; image: string; name: string }[];
};

const ProductCardWithSkuSwitcher = ({
  details: {
    href,
    image: { src, ...image },
    title,
    ...details
  },
  variations,
}: ProductCardWithSkuSwitcherProps) => {
  const [sku, selectedSku] = useState(
    variations.length === 1 ? variations[0]?.sku : "",
  );
  const selectedVariant = variations.find((variant) => variant.sku === sku);
  const hrefWithSku = `${href}${sku ? `/${sku}` : ""}`;

  return (
    <ProductCardContainer>
      <ProductCardDetails
        href={hrefWithSku}
        image={{
          src: selectedVariant?.image
            ? getMediaUrl(selectedVariant.image)
            : src,
          ...image,
        }}
        title={selectedVariant?.name ?? title}
        {...details}
      />

      <ProductCardActions>
        {variations.length === 1 ? (
          <div className="text-center text-sm leading-5 text-brand-gray-500">
            {selectedVariant?.sku}
          </div>
        ) : (
          <Select value={sku} onValueChange={selectedSku}>
            <SelectTrigger className="h-5 rounded-sm px-1.5 py-0">
              <SelectValue placeholder="Make a selection" />
            </SelectTrigger>

            <SelectContent>
              {variations.map((variation) => (
                <SelectItem key={variation.sku} value={variation.sku}>
                  {variation.sku}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="mb-5 mt-3 text-center text-sm leading-4 text-brand-gray-400">
          {variations.length}{" "}
          {variations.length === 1 ? "variation" : "variations"}
        </div>

        <Link
          href={hrefWithSku}
          className="block w-full rounded-sm bg-brand-primary py-2 text-center font-wurth font-extrabold uppercase text-white"
        >
          View item
        </Link>
      </ProductCardActions>
    </ProductCardContainer>
  );
};

export default ProductCardWithSkuSwitcher;
