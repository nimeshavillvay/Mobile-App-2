import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef } from "react";

export const BarcodeScanner = ({
  onScanSuccess,
}: {
  onScanSuccess: (open: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;
    const currentReader = reader.current;
    console.log("currentReader", currentReader);
    console.log("videoRef", videoRef);
    currentReader.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result) => {
        if (result) {
          console.log("result scan", result);
          onScanSuccess(result.getText());
        }
      },
    );
    return () => {
      currentReader.reset();
    };
  }, [videoRef, onScanSuccess]);

  return <video width="100%" height="100%" ref={videoRef} />;
};
