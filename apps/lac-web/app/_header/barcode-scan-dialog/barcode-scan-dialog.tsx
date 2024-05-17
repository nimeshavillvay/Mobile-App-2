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
import { BarcodeScan } from "~/components/icons/barcode-scan/barcode-scan";
import { cn } from "~/lib/utils";
import useScanBarcodeMutation from "../../_hooks/search/use-scan-barcode-mutation.hook";

export const BarcodeScannerDialog = () => {
  const [open, setOpen] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const scanBarcodeMutation = useScanBarcodeMutation({
    setOpen,
    setProductNotFound,
  });
  const useScanSuccess = (query: string) => {
    scanBarcodeMutation.mutate(query);
  };

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
        <BarcodeScanner onScanSuccess={useScanSuccess} />
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
