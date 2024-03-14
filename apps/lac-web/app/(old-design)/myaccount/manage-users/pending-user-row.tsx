import { TableCell, TableRow } from "@/old/_components/ui/table";
import { Role } from "@/old/_lib/types";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import { ApproveContact } from "./types";
import useDeleteOtherUserMutation from "./use-delete-other-user-mutation.hook";

type UserRowProps = {
  user: ApproveContact;
  index: number;
  jobRoles: Role[];
};

const PendingUserRow = ({ user }: UserRowProps) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deleteOtherUserMutation = useDeleteOtherUserMutation();

  return (
    <>
      <TableRow className="bg-white">
        <TableCell>{user?.email}</TableCell>

        <TableCell className="capitalize">
          {`${user?.firstName} ${user?.lastName}`}
        </TableCell>

        <TableCell className="capitalize">Office Manager</TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end">
            <div className="cursor-pointer text-brand-gray-500">
              <MdDeleteOutline
                className="self-center text-2xl leading-none"
                onClick={() => setIsOpenDelete(true)}
              />
            </div>
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4}></TableCell>
      </TableRow>

      <ActionConfirmationDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title="Confirm Action"
        text="Do you really want to delete these records?"
        onConfirm={() => deleteOtherUserMutation.mutate(user?.signedData)}
        okText="Confirm"
      />
    </>
  );
};

export default PendingUserRow;
