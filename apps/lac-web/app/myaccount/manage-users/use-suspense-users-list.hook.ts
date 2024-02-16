import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UserContact } from "./types";

const useSuspenseUsersList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["manage-users", token],
    queryFn: () =>
      api
        .get("am/manage_users", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .json<{
          approve_contacts: [];
          manage_contact: {
            contact_list: UserContact[];
            your_profile: UserContact;
          };
        }>(),
  });
};

export default useSuspenseUsersList;
