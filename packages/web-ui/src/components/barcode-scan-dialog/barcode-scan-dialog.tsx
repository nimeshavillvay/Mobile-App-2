"use client";

import { BarcodeScanner } from "@repo/web-ui/components/barcode-scanner";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState } from "react";
import { Alert as AlertIcon } from "~/components/icons/alert";
import { cn } from "~/lib/utils";
import { BarcodeScan } from "../icons/barcode-scan/barcode-scan";

export const BarcodeScannerDialog = () => {
  const [open, setOpen] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("mx-0.5 rounded-full px-2")}
          onClick={() => {
            setOpen(true);
            setProductNotFound(false);
          }}
        >
          <BarcodeScan className="size-5" />
          <span className="sr-only">Scan barcode</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Barcode Scan</DialogTitle>
          <div>
            {productNotFound && (
              <Alert variant="destructive">
                <AlertIcon className="size-4" />
                <AlertContent>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Product cannot be found!</AlertDescription>
                </AlertContent>
              </Alert>
            )}
          </div>
          <DialogDescription>
            Focus the device camera on the barcode at a distance where it can be
            fully observed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <BarcodeScanner
            setDialogOpen={setOpen}
            setProductNotFound={setProductNotFound}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
