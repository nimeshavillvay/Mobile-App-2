"use client";

import * as ProductCard from "@/_components/product-card";
import * as Select from "@/_components/select";
import { getMediaUrl } from "@/_utils/helpers";
import Link from "next/link";
import { useState, type ComponentProps } from "react";

type FeaturedBrandProductProps = {
  details: ComponentProps<typeof ProductCard.Details>;
  variations: { sku: string; image: string }[];
};

const FeaturedBrandProduct = ({
  details: {
    href,
    image: { src, ...image },
    ...details
  },
  variations,
}: FeaturedBrandProductProps) => {
  const [sku, selectedSku] = useState(
    variations.length === 1 ? variations[0]?.sku : "",
  );
  const selectedVariant = variations.find((variant) => variant.sku === sku);
  const hrefWithSku = `${href}${sku ? `/${sku}` : ""}`;

  return (
    <ProductCard.Container>
      <ProductCard.Details
        href={hrefWithSku}
        image={{
          src: selectedVariant?.image
            ? getMediaUrl(selectedVariant.image)
            : src,
          ...image,
        }}
        {...details}
      />

      <ProductCard.Actions>
        {variations.length === 1 ? (
          <div className="text-brand-very-dark-gray text-center text-[14px] leading-5">
            {selectedVariant?.sku}
          </div>
        ) : (
          <Select.Root value={sku} onValueChange={selectedSku}>
            <Select.Trigger placeholder="Make a selection" className="w-full">
              {sku}
            </Select.Trigger>

            <Select.Content>
              {variations.map((variation) => (
                <Select.Item key={variation.sku} value={variation.sku}>
                  {variation.sku}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}

        <div className="text-brand-dark-gray mb-5 mt-3 text-center text-[14px] leading-4">
          {variations.length}{" "}
          {variations.length === 1 ? "variation" : "variations"}
        </div>

        <Link
          href={hrefWithSku}
          className="bg-brand-primary block w-full rounded-sm py-2 text-center text-[15px] font-extrabold uppercase leading-5 text-white"
        >
          View item
        </Link>
      </ProductCard.Actions>
    </ProductCard.Container>
  );
};

export default FeaturedBrandProduct;
