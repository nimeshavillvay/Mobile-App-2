import Separator from "@/old/_components/separator";
import { Skeleton } from "@/old/_components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { MdAccountBox } from "react-icons/md";

const ManageUsersLoading = () => {
  return (
    <div>
      <h2 className="font-wurth text-brand-primary relative text-xl font-medium">
        Manage Users
      </h2>

      <Separator
        orientation="horizontal"
        className="bg-brand-primary h-px flex-1"
      />

      <div className="my-5">
        <h6 className="font-wurth text-brand-gray-500 flex text-base font-medium">
          <MdAccountBox className="self-center text-2xl leading-none" />
          &nbsp;Update Your Profile
        </h6>
      </div>

      <Table>
        <TableHeader className="bg-brand-gray-200 border-brand-gray-200 border">
          <TableRow>
            <TableHead>Email</TableHead>

            <TableHead className="text-center">Permission</TableHead>

            <TableHead className="text-center">Status</TableHead>

            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border-brand-gray-200 border">
          <TableRow>
            <TableCell>
              <Skeleton className="h-5 w-[130px]" />
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-20" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-[100px]" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-end">
                <Skeleton className="h-5 w-20" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsersLoading;
