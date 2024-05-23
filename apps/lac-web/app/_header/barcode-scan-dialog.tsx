"use client";

import DiscontinuedItemNotice from "@/search/discontinued-item-notice";
import { BarcodeScanner } from "@repo/web-ui/components/barcode-scanner";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import { BarcodeScan } from "@repo/web-ui/components/icons/barcode-scan";
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
import { cn } from "~/lib/utils";
import useScanBarcodeMutation from "./use-scan-barcode-mutation.hook";

const BarcodeScannerDialog = () => {
  const [open, setOpen] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [isDiscontinued, setIsDiscontinued] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [isGroupEmpty, setIsGroupEmpty] = useState(false);
  const [textChanged, setTextChanged] = useState(false);

  const scanBarcodeMutation = useScanBarcodeMutation({
    setOpen,
    setProductNotFound,
    setIsDiscontinued,
    setCategoryId,
    setCategorySlug,
    setIsGroupEmpty,
  });

  const onScanSuccess = (query: string) => {
    scanBarcodeMutation.mutate(query);
  };
  console.log(isGroupEmpty);

  return (
    <>
      {!open && textChanged && isDiscontinued && (
        <DiscontinuedItemNotice categoryId={categoryId} slug={categorySlug} />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("mx-0.5 rounded-full px-2")}
            onClick={() => {
              setOpen(true);
              setProductNotFound(false);
              setCategoryId("");
              setCategorySlug("");
              setIsDiscontinued(false);
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
                    <AlertDescription>
                      Product cannot be found!
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              )}
            </div>

            <DialogDescription>
              Focus the device camera on the barcode at a distance where it can
              be fully observed.
            </DialogDescription>
          </DialogHeader>

          <BarcodeScanner
            setTextChanged={setTextChanged}
            onScanSuccess={onScanSuccess}
          />

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BarcodeScannerDialog;
