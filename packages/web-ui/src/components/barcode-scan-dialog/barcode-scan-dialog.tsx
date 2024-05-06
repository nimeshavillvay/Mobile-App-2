import { type ComponentProps } from "react";
import { BarcodeScanButton } from "../search-box";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const BarcodeScannerDialog = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <Dialog {...delegated}>
      <DialogTrigger asChild>
        <BarcodeScanButton />
      </DialogTrigger>
      <DialogContent className={className} style={{ maxWidth: 425 }}>
        <DialogHeader>
          <DialogTitle>Product Barcode Scan</DialogTitle>
          <DialogDescription>
            Focus the device camera on the barcode at a distance where it can be
            fully observed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
