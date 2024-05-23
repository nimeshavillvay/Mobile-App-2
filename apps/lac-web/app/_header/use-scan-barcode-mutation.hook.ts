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
  uom?: string;
  groupId?: string;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brandSlug?: string;
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
  setIsDiscontinued,
  setCategoryId,
  setCategorySlug,
  setSearchQuery,
}: {
  setOpen: (open: boolean) => void;
  setProductNotFound: (open: boolean) => void;
  setIsDiscontinued: (open: boolean) => void;
  setCategoryId: (open: string) => void;
  setCategorySlug: (open: string) => void;
  setSearchQuery: (searchQuery: string) => void;
}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (query: string) => {
      setSearchQuery("");
      const searchResults = await searchApi
        .get("barcode", {
          searchParams: { query },
        })
        .json<SearchData>();

      const firstProduct = searchResults.results;
      const isPlp = searchResults.summary.plp;
      if (
        isPlp &&
        !Array.isArray(firstProduct) &&
        firstProduct.productStatus != "discontinued" &&
        (firstProduct.groupId === "0" || firstProduct.categoryName === "")
      ) {
        setOpen(false);
        router.push(`search?query=${firstProduct.MFRPartNo}`);
      } else if (
        isPlp &&
        firstProduct.productStatus === "discontinued" &&
        firstProduct.categoryId &&
        firstProduct.categorySlug
      ) {
        setIsDiscontinued(true);
        setCategoryId(firstProduct.categoryId);
        setCategorySlug(firstProduct.categorySlug);
        setOpen(false);
      } else if (isPlp && firstProduct) {
        const productPath = `/product/${firstProduct.id}/${firstProduct.slug}`;
        setOpen(false);
        setProductNotFound(false);
        router.push(productPath);
      } else {
        setProductNotFound(true);
      }
      setSearchQuery(query);
    },
  });
};

export default useScanBarcodeMutation;
