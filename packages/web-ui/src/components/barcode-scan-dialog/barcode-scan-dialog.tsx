"use client";

import { BarcodeScanner } from "../barcode-scanner";
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

export const BarcodeScannerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BarcodeScanButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Barcode Scan</DialogTitle>
          <DialogDescription>
            Focus the device camera on the barcode at a distance where it can be
            fully observed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <BarcodeScanner />
        </div>
        <DialogFooter>
          <Button type="submit">Cancel</Button>
          {/* <Button type="submit" onClick={dismissQrReader}>Cancel</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
