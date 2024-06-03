import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/web-ui/components/ui/alert-dialog";
import { type ComponentProps, type ReactNode } from "react";

type ActionConfirmationDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: ComponentProps<typeof AlertDialog>["onOpenChange"];
  readonly title?: string;
  readonly text: string;
  readonly onConfirm: () => void;
  readonly okText?: string;
  readonly cancelText?: string;
  readonly children?: ReactNode;
};

const ActionConfirmationDialog = ({
  open,
  onOpenChange,
  title = "Confirm Action",
  text,
  onConfirm,
  okText = "Continue",
  cancelText = "Cancel",
  children,
}: ActionConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{okText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionConfirmationDialog;
