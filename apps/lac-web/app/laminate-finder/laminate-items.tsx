import ProductCardSkeleton from "@/_components/product-card-skeleton";
import useLaminateProductsInfo from "@/_hooks/laminate/use-suspense-laminate-info.hook";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import { Suspense } from "react";
import LaminateItemRow from "./laminate-item";

const LaminateItems = ({
  productIds,
  token,
}: {
  readonly productIds: string[];
  readonly token: string;
}) => {
  const laminates = useLaminateProductsInfo(productIds);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Size</TableHead>
            <TableHead>Stock/EA</TableHead>
            {/* <TableHead className="text-center">
                        Alt Branch
                        <br />
                        <span className="text-xs">(Stock)</span>
                      </TableHead> */}
            <TableHead className="text-center">QTY</TableHead>
            <TableHead className="text-right font-medium">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laminates.data?.map((laminate) => (
            <Suspense
              key={laminate.productId}
              fallback={
                <ProductCardSkeleton // todo: update to match laminate dialog item row
                />
              }
            >
              <LaminateItemRow
                productId={laminate.productId}
                size={laminate.size}
                token={token}
              />
            </Suspense>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-4 rounded bg-gray-50 p-4">
        <div className="grow">
          <span className="text-wurth-gray-500">Total:</span>{" "}
          <strong className="text-lg">$456.00</strong>
        </div>
        <Button>Add to cart</Button>
      </div>
    </>
  );
};

export default LaminateItems;
