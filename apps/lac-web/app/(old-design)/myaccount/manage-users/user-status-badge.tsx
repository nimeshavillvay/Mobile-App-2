import type { Status } from "@/_lib/types";
import { Badge } from "@/old/_components/ui/badge";
import { cn } from "@/old/_utils/helpers";

const getStatusClass = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return "border-brand-tertiary text-brand-tertiary";

    case "SUSPENDED":
      return "border-brand-gray-400 text-brand-gray-200";

    default:
      return "border-brand-gray-400 text-brand-gray-400";
  }
};

type UserStatusBadgeProps = {
  status: Status;
};

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <Badge className={cn("w-[90px] capitalize", getStatusClass(status))}>
      {status?.toLowerCase()}
    </Badge>
  );
};

export default UserStatusBadge;
