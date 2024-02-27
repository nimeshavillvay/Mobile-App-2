import usePriceCheck from "./use-price-check.hook";

const usePriceCalculation = (
  sku: string,
  quantity = 1,
  overridePrice?: number | string,
) => {
  const priceCheckQuery = usePriceCheck(sku, quantity);

  let discountedPrice = 0;
  if (typeof overridePrice === "number") {
    discountedPrice = overridePrice;
  } else if (
    typeof overridePrice === "string" &&
    !isNaN(parseFloat(overridePrice))
  ) {
    discountedPrice = parseFloat(overridePrice);
  } else if (priceCheckQuery?.data?.["list-sku-price"][0].price) {
    discountedPrice = priceCheckQuery.data?.["list-sku-price"][0].price;
  }

  const actualPrice =
    priceCheckQuery?.data?.["list-sku-price"][0].price ?? discountedPrice;
  const discountPercentage = Math.round(
    ((actualPrice - discountedPrice) / actualPrice) * 100,
  );

  return {
    actualPrice,
    discountedPrice,
    discountPercentage,
    isLoading: priceCheckQuery.isLoading,
  };
};

export default usePriceCalculation;
