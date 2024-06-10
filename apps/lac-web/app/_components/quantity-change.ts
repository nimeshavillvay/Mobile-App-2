const calculateReduceQuantity = (
  quantity: number,
  minQty: number,
  increaseQty: number,
) => {
  if (minQty > 1) {
    const displayQuantity =
      quantity % minQty === 0
        ? quantity - increaseQty
        : quantity - (quantity % minQty);
    return displayQuantity > minQty ? displayQuantity : minQty;
  } else {
    return quantity - increaseQty;
  }
};
const calculateIncreaseQuantity = (
  quantity: number,
  minQty: number,
  increaseQty: number,
) => {
  if (minQty > 1) {
    return quantity - (quantity % minQty) + increaseQty;
  } else {
    return quantity + increaseQty;
  }
};

export { calculateIncreaseQuantity, calculateReduceQuantity };
