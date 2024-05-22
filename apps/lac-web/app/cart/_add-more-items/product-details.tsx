import { useEffect, useState } from "react";

function ProductDetails({
  isLoading,
  isLastEditedIndex,
}: {
  isLoading: boolean;
  isLastEditedIndex: boolean;
}) {
  if (!isLastEditedIndex) {
    return <>Product Details</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  return <>Item not found.</>;
}

export default ProductDetails;
