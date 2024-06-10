import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";

export const ProductNotAvailable = ({
  message = "",
}: {
  readonly message?: string;
}) => {
  return (
    <Alert variant="destructive">
      <AlertIcon className="size-4" />
      <AlertContent>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {message ? (
            message
          ) : (
            <span>
              Not available online. Please call Customer Service for
              availability
            </span>
          )}
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
};
