import { TableCell, TableRow } from "@/_components/ui/table";
import { cn } from "@/_utils/helpers";
import { MdKeyboardArrowDown } from "react-icons/md";
import { UserProfile } from "./types";

const UserRow = ({ user, index }: { user: UserProfile; index: number }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "border-brand-tertiary text-brand-tertiary";

      case "DEACTIVE":
        return "border-brand-gray-400 text-brand-gray-200";

      case "PENDING":
        return "border-brand-secondary text-brand-secondary";

      default:
        return "border-brand-gray-400 text-brand-gray-400";
    }
  };

  return (
    <TableRow
      key={user?.uuid}
      className={index % 2 === 0 ? "bg-white" : "bg-brand-gray-100"}
    >
      <TableCell>{user?.email}</TableCell>

      <TableCell className="text-center">{user?.permission}</TableCell>

      <TableCell className="text-center">
        <div className="flex justify-center">
          <div
            className={cn(
              "py px w-[90px] rounded-sm border font-bold capitalize",
              getStatusClass(user?.status),
            )}
          >
            {user?.status?.toLowerCase()}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end">
          <button className="font-wurth bg-brand-secondary flex items-center justify-center rounded-sm pl-4 pr-2 text-base font-extrabold uppercase leading-[24px] text-white">
            Open&nbsp;
            <MdKeyboardArrowDown className="text-xl leading-none" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
