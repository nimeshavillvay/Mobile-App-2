export const calculatePriceDetails = (price: number, listPrice: number) => {
  const displayPrice = price > listPrice ? listPrice : price;
  const discount = Math.round(((listPrice - price) / listPrice) * 100);
  return { displayPrice, discount };
};
