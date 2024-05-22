import { searchApi } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type SearchResult = {
  brandName: string;
  id: string;
  lastUpdatedDate: string | null;
  MFRPartNo: string;
  sellingBookSequenceNo: string;
  UPCCode: string;
  alias: string;
  materialNumber: string;
  productTitle: string;
  Status: string;
  productStatus: string;
  createDate: string;
  keywords: string;
  minimumOrderQuantity: string;
  orderQuantityByIncrements: string;
  categoryPath: string;
  categoryName: string;
  attributes: string[] | null;
  itemImage: string;
  slug: string;
};

type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
    searchParams?: string;
  };
  results: SearchResult;
};

const useScanBarcodeMutation = ({
  setOpen,
  setProductNotFound,
}: {
  setOpen: (open: boolean) => void;
  setProductNotFound: (open: boolean) => void;
}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (query: string) => {
      const searchResults = await searchApi
        .get("barcode", {
          searchParams: { query },
        })
        .json<SearchData>();

      const firstProduct = searchResults.results;
      if (searchResults.summary.plp && firstProduct) {
        const productPath = `/product/${firstProduct.id}/${firstProduct.slug}`;
        setOpen(false);
        setProductNotFound(false);
        router.push(productPath);
      } else {
        setProductNotFound(true);
      }
    },
  });
};

export default useScanBarcodeMutation;
