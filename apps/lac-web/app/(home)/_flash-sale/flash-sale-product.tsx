"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
} from "@repo/web-ui/components/product-card";

type FlashSaleProductProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    sku: string;
    image: string;
    uom: string;
  };
  token: string;
};

const FlashSaleProduct = ({
  product: { id, slug, title, sku, image, uom },
  token,
}: FlashSaleProductProps) => {
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: parseInt(id), qty: 1 },
  ]);

  let currentPrice = 0;
  let previousPrice = 0;
  let discountPercent = 0;

  if (priceCheckQuery.data.productPrices[0]) {
    currentPrice = priceCheckQuery.data.productPrices[0].price;
    previousPrice = priceCheckQuery.data.productPrices[0].extendedPrice;
  }

  if (currentPrice !== previousPrice) {
    discountPercent = Math.floor(
      ((currentPrice - previousPrice) / previousPrice) * 100,
    );
  }

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const addToCart = () => {
    setProductId(parseInt(id));
    setOpen("verification");
  };

  return (
    <ProductCard className="shrink-0 snap-start">
      <ProductCardHero>
        {discountPercent > 0 && (
          <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
        )}

        <ProductCardImage
          src={image}
          alt={`A picture of the product ${title}`}
          href={`/product/${id}/${slug}`}
          title={title}
        />
      </ProductCardHero>

      <ProductCardContent>
        <ProductCardDetails
          title={title}
          sku={sku}
          href={`/product/${id}/${slug}`}
        />

        <ProductCardPrice
          price={currentPrice}
          uom={uom}
          actualPrice={previousPrice}
        />

        <ProductCardActions addToCart={addToCart} />
      </ProductCardContent>
    </ProductCard>
  );
};

export default FlashSaleProduct;
