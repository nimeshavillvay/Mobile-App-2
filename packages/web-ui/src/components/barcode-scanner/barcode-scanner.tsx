import { BrowserMultiFormatReader } from "@zxing/library";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSuspenseBarcodeSearch from "../../../../../apps/lac-web/app/_hooks/search/use-suspense-barcode-search.hook";

export const BarcodeScanner = ({
  setDialogOpen,
  setProductNotFound,
}: {
  setDialogOpen: (open: boolean) => void;
  setProductNotFound: (open: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const router = useRouter();

  const [scannedValue, setScannedValue] = useState("");
  const searchQuery = useSuspenseBarcodeSearch(scannedValue);

  const firstProduct = searchQuery.data.results;

  if (searchQuery.data.summary.plp && firstProduct) {
    const productPath = `/product/${firstProduct.id}/${firstProduct.slug}`;
    setDialogOpen(false);
    setProductNotFound(false);
    router.replace(productPath);
  }
  if (
    Array.isArray(firstProduct) &&
    firstProduct.length !== 0 &&
    !searchQuery.data.summary.plp &&
    scannedValue !== ""
  ) {
    setProductNotFound(true);
  }

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
          setScannedValue(result.getText());
        }
      },
    );
    return () => {
      currentReader.reset();
    };
  }, [videoRef, router, setDialogOpen]);

  return <video width="100%" height="100%" ref={videoRef} />;
};
