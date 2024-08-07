import useLaminateProductsInfo from "@/_hooks/laminate/use-suspense-laminate-info.hook";
// import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";

const LaminateItems = ({
  productIds,
  token,
}: {
  readonly productIds: string[];
  readonly token: string;
}) => {
  const laminates = useLaminateProductsInfo(productIds);
  console.log(">>>>> productIds", productIds);
  console.log(">>>>> laminates", laminates);

  //   const availabilityCheckForVariants =  laminates.data?.map(laminate => {

  //   })
  //   const {data: checkAvailabilityQuery} = useSuspenseCheckAvailability(token, {
  //     productId:Number(product.variants[0]?.id),
  //     qty: 1,
  //   });
  //   const addMultipleToCartMutation = useAddMultipleToCartMutation(token);

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
            <TableRow key={laminate.productId}>
              <TableCell className="w-40 text-nowrap">
                {laminate.size}
              </TableCell>
              <TableCell className="text-nowrap">
                Home Branch: <strong className="font-semibold">681</strong>
                <br />
                Alt Branch: <strong className="font-semibold">34</strong>
                <br />
              </TableCell>
              {/* <TableCell className="text-center">23</TableCell> */}
              <TableCell className="text-right">
                <Input type="number" className="w-16" />
              </TableCell>
              <TableCell className="text-right font-medium">$250.00</TableCell>
            </TableRow>
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
