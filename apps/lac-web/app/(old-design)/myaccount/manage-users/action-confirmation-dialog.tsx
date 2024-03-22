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
      <DialogContent className="bottom-0 top-auto max-w-[490px] translate-y-[0%] xs:bottom-auto xs:top-[50%] xs:translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle className="text-left font-wurth xs:text-center">
            {title}
          </DialogTitle>
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

          <div
            className={cn(
              "mb-7 flex flex-row items-center gap-2 font-wurth font-extrabold text-white xs:justify-end",
              showCancelBtn ? "justify-between" : "justify-end",
            )}
          >
            {showCancelBtn && (
              <DialogClose className="w-1/2 rounded-sm border border-brand-primary px-8 py-1.5 uppercase text-brand-primary xs:w-[120px]">
                {cancelText}
              </DialogClose>
            )}

            <Button
              className="w-1/2 rounded-sm bg-brand-primary px-8 py-1.5 uppercase xs:w-[120px]"
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
