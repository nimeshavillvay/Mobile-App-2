import { Button } from "@repo/web-ui/components/base/atoms/button";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";

type CompareButtonProps = {
  readonly isCompared: boolean;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
};

export const CompareButton = ({
  isCompared,
  onClick,
  disabled = false,
}: CompareButtonProps) => {
  const handleOnCompare = () => {
    if (onClick) {
      onClick();
    } else {
      // Implement default shopping list logic
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10"
      aria-label="Add to Compare List"
      data-testid="add-to-compare-list"
      disabled={disabled}
      onClick={handleOnCompare}
    >
      {isCompared ? (
        <CheckCircle className="size-4" data-testid="check-circle-icon" />
      ) : (
        <CheckCircleFilled
          className="size-4"
          data-testid="check-circle-filled-icon"
        />
      )}
    </Button>
  );
};
