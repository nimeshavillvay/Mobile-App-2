"use client";

import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetails,
} from "@/_components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { getMediaUrl } from "@/_utils/helpers";
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
          <div className="text-brand-very-dark-gray text-center text-sm leading-5">
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

        <div className="text-brand-dark-gray mb-5 mt-3 text-center text-sm leading-4">
          {variations.length}{" "}
          {variations.length === 1 ? "variation" : "variations"}
        </div>

        <Link
          href={hrefWithSku}
          className="bg-brand-primary block w-full rounded-sm py-2 text-center text-[15px] font-extrabold uppercase leading-5 text-white"
        >
          View item
        </Link>
      </ProductCardActions>
    </ProductCardContainer>
  );
};

export default ProductCardWithSkuSwitcher;
