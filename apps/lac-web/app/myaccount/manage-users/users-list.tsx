"use client";

import useCookies from "@/_hooks/storage/use-cookies.hook";
import useSuspenseUsersList from "./use-suspense-users-list.hook";

const UsersList = () => {
  const [cookies] = useCookies();

  const usersListQuery = useSuspenseUsersList(cookies.token);

  console.log("Users List", usersListQuery);

  return (
    <>
      <h1>Users List Component</h1>
    </>
  );
};

export default UsersList;
