import { BrowserMultiFormatReader } from "@zxing/library";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const BarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const router = useRouter();

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
        if (result) {
          console.log("result: ", result);
          router.replace("/plp");
        }
      },
    );
    return () => {
      currentReader.reset();
    };
  }, [videoRef, router]);

  return <video ref={videoRef} />;
};
