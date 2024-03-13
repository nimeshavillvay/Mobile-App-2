import { SelectItem } from "@/old/_components/ui/select";
import { Status } from "./types";

type StatusOptionProps = {
  status: Status;
};

const StatusOption = ({ status }: StatusOptionProps) => {
  switch (status) {
    case "PENDING":
      return <SelectItem value={status}>Pending</SelectItem>;
    case "INACTIVE":
      return <SelectItem value={status}>Inactive</SelectItem>;
    case "DISABLED":
      return <SelectItem value={status}>Disabled</SelectItem>;
    default:
      return null;
  }
};

export default StatusOption;
