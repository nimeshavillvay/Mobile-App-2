"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const onOpenChange = (change: boolean) => {
    setOpen(change);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <BarcodeScanButton onClick={() => setOpen(true)} />
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
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
