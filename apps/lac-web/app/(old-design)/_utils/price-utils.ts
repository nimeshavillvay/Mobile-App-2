export const calculatePriceDetails = (price: number, salePrice: number) => {
  const displayPrice = salePrice > 0 && price > salePrice ? salePrice : price;
  const originalPrice = salePrice > 0 && price > salePrice ? price : 0;
  const savingAmount =
    salePrice > 0 && price > salePrice ? price - salePrice : 0;
  const discount =
    salePrice > 0 && price > salePrice
      ? (((price - salePrice) / price) * 100).toFixed(0.5)
      : 0;

  return { displayPrice, originalPrice, savingAmount, discount };
};
