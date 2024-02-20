import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ApproveContact, ManageContact } from "./types";

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
        .json<{
          approve_contacts: ApproveContact[];
          manage_contact: ManageContact;
        }>(),
  });
};

export default useSuspenseUsersList;
