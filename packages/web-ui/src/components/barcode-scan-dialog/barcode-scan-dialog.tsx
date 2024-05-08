"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useZxing } from "react-zxing";
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
  const [result, setResult] = useState("");
  const [turnOffCamera, setTurnOffCamera] = useState(false);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setTurnOffCamera(true);
      redirect("/plp");
    },
    paused: turnOffCamera,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BarcodeScanButton />
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 425 }}>
        <DialogHeader>
          <DialogTitle>Product Barcode Scan</DialogTitle>
          <DialogDescription>
            Focus the device camera on the barcode at a distance where it can be
            fully observed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <video ref={ref} />
          <span>Result: {result}</span>
        </div>
        <DialogFooter>
          <Button type="submit">Cancel</Button>
          {/* <Button type="submit" onClick={dismissQrReader}>Cancel</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
