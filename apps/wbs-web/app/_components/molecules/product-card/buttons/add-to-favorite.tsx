import { Button } from "@repo/web-ui/components/base/atoms/button";
import { HeartFilled } from "@repo/web-ui/components/icons/heart-filled";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";

type FavoriteButtonProps = {
  readonly isFavorite: boolean;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
};

export const FavoriteButton = ({
  isFavorite,
  onClick,
  disabled = false,
}: FavoriteButtonProps) => {
  const handleShoppingListClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Implement shopping list logic
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10"
      aria-label="Add to favorites"
      disabled={disabled}
      onClick={handleShoppingListClick}
      data-testid="add-to-shopping-list"
    >
      {isFavorite ? (
        <HeartFilled className="size-4" data-testid="heart-filled" />
      ) : (
        <HeartOutline className="size-4" data-testid="heart-outline" />
      )}
    </Button>
  );
};
