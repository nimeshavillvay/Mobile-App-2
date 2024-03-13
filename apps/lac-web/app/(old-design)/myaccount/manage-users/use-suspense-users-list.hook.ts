import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ManageUsers } from "./types";

const useSuspenseUsersList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "manage-users", token],
    queryFn: () =>
      api
        .get("am/manage_users", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .json<ManageUsers>(),
  });
};

export default useSuspenseUsersList;
