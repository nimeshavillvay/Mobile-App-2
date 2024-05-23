import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

export const BarcodeScanner = ({
  onScanSuccess,
  setTextChanged,
}: {
  onScanSuccess: (open: string) => void;
  setTextChanged: (open: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const onScanSuccessRef = useRef(onScanSuccess);
  const [oldQuery, setOldQuery] = useState("");

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    if (!videoRef.current) return;
    const currentReader = reader.current;
    currentReader.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result) => {
        if (result && result.getText() && result.getText() !== oldQuery) {
          onScanSuccessRef.current(result.getText());
          setOldQuery(result.getText());
          setTextChanged(true);
        }
      },
    );
    return () => {
      currentReader.reset();
    };
  }, [videoRef, oldQuery, setTextChanged]);

  return (
    <video width="100%" height="100%" ref={videoRef}>
      <track kind="captions" />
    </video>
  );
};
