import { Button } from "@/old/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { cn } from "@/old/_utils/helpers";
import { type ComponentProps } from "react";

type ActionConfirmationDialogProps = {
  open: boolean;
  onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"];
  title: string;
  text: string;
  textColor?: "primary" | "default";
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
  showCancelBtn?: boolean;
};

const ActionConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  text,
  textColor = "default",
  onConfirm,
  okText = "Ok",
  cancelText = "Cancel",
  showCancelBtn = true,
}: ActionConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[490px]">
        <DialogHeader>
          <DialogTitle className="font-wurth">{title}</DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <div
            className={cn(
              "old-design-text-base pb-5",
              textColor === "primary"
                ? "text-brand-primary"
                : "text-brand-gray-500",
            )}
          >
            {text}
          </div>

          <div className="mb-7 flex flex-row items-center justify-end gap-2 font-wurth font-extrabold text-white">
            {showCancelBtn && (
              <DialogClose className="w-[120px] rounded-sm border border-brand-primary px-8 py-1.5 uppercase text-brand-primary">
                {cancelText}
              </DialogClose>
            )}

            <Button
              className="w-[120px] rounded-sm bg-brand-primary px-8 py-1.5 uppercase"
              onClick={onConfirm}
            >
              {okText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionConfirmationDialog;
