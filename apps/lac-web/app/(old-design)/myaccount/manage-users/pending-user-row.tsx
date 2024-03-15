import { TableCell, TableRow } from "@/old/_components/ui/table";
import { Role } from "@/old/_lib/types";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import { ApproveContact } from "./types";
import useDeletePendingUserMutation from "./use-delete-pending-user-mutation.hook";
import UserApproveForm from "./user-approve-form";

type UserRowProps = {
  user: ApproveContact;
  index: number;
  jobRoles: Role[];
};

const PendingUserRow = ({ user, jobRoles }: UserRowProps) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deletePendingUserMutation = useDeletePendingUserMutation();

  return (
    <>
      <TableRow className="bg-white">
        <TableCell className="align-middle">{user?.email}</TableCell>

        <TableCell className="align-middle capitalize">
          {`${user?.firstName} ${user?.lastName}`}
        </TableCell>

        <TableCell className="align-middle capitalize">
          Office Manager
        </TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end">
            <div className="cursor-pointer text-brand-gray-500">
              <MdDelete
                className="self-center text-2xl leading-none"
                onClick={() => setIsOpenDelete(true)}
              />
            </div>
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4}>
          <UserApproveForm jobRoles={jobRoles} user={user} />
        </TableCell>
      </TableRow>

      <ActionConfirmationDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title="Confirm Action"
        text="Do you really want to delete these records?"
        onConfirm={() => deletePendingUserMutation.mutate(user?.signedData)}
        okText="Confirm"
      />
    </>
  );
};

export default PendingUserRow;
