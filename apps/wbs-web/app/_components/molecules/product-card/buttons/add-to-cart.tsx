import { Button } from "@repo/web-ui/components/base/atoms/button";

type AddToCartButtonProps = {
  readonly addToCart?: () => void;
  readonly disabled?: boolean;
  readonly label: string;
};

export const AddToCartButton = ({
  addToCart,
  disabled = false,
  label,
}: AddToCartButtonProps) => {
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart();
    } else {
      //implement default add to cart behavior
    }
  };

  return (
    <Button
      className="h-10 max-h-full flex-1 px-4 text-[0.875rem] leading-5"
      onClick={handleAddToCart}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
