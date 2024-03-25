import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import PurchasedItemsSelectors from "./purchased-items-selectors";

const PurchasedItemsList = () => {
  return (
    <>
      <PurchasedItemsSelectors />

      <div className="my-6 flex flex-row justify-between text-brand-gray-400">
        <div>1-10 of 17</div>

        <div>Per Page:</div>

        <div>1</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Item # / MFR Part #</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Count</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>UOM</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody></TableBody>
      </Table>
    </>
  );
};

export default PurchasedItemsList;
