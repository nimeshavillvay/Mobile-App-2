import { Button } from "@/_components/ui/button";
import { TableCell, TableRow } from "@/_components/ui/table";
import { Role } from "@/_lib/types";
import { cn } from "@/_utils/helpers";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { UserProfile } from "./types";
import UserUpdateForm from "./user-update-form";

const UserRow = ({
  user,
  index,
  jobRoles,
}: {
  user: UserProfile;
  index: number;
  jobRoles: Role[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
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
            <Button
              className="font-wurth bg-brand-secondary flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 px-2 text-base leading-6 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <>
                  Open
                  <MdKeyboardArrowDown className="text-xl leading-none" />
                </>
              ) : (
                <>
                  Close
                  <MdKeyboardArrowUp className="text-xl leading-none" />
                </>
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isOpen && (
        <TableRow>
          <TableCell colSpan={4}>
            <UserUpdateForm jobRoles={jobRoles} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default UserRow;
