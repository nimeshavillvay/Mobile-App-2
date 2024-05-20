"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { Button } from "@/old/_components/ui/button";

type BuyAgainButtonProps = {
  productId: number;
  disabled?: boolean;
};

const BuyAgainButton = ({ productId, ...delegated }: BuyAgainButtonProps) => {
  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const addToCart = () => {
    setProductId(productId);
    setOpen("verification");
  };

  return (
    <Button
      className="h-12 w-[170px] text-base md:h-8"
      onClick={() => addToCart()}
      {...delegated}
    >
      Buy Again
    </Button>
  );
};

export default BuyAgainButton;
