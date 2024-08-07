import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import { Input } from "@repo/web-ui/components/ui/input";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";

const LaminateItemRow = ({
  productId,
  token,
  size,
}: {
  readonly productId: number;
  readonly token: string;
  readonly size: string;
}) => {
  const { data: checkAvailabilityQuery } = useSuspenseCheckAvailability(token, {
    productId: Number(productId),
    qty: 1,
  });

  return (
    <TableRow key={productId}>
      <TableCell className="w-40 text-nowrap">{size}</TableCell>
      <TableCell className="text-nowrap">
        Home Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[0]?.amount ?? 0}
        </strong>
        <br />
        Alt Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[1]?.amount ?? 0}
        </strong>
        <br />
      </TableCell>
      <TableCell className="text-right">
        <Input type="number" className="w-16" />
      </TableCell>
      <TableCell className="text-right font-medium">$250.00</TableCell>
    </TableRow>
  );
};

export default LaminateItemRow;
