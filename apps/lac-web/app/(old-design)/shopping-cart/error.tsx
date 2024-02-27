"use client"; // Error components must be Client Components

import { useEffect } from "react";

const ShoppingCartError = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div>Error loading shopping cart...</div>
    </>
  );
};

export default ShoppingCartError;
