"use client";

import useSuspenseUsersList from "./use-suspense-users-list.hook";

const UsersList = ({ token }: { token: string }) => {
  const usersListQuery = useSuspenseUsersList(token);

  console.log("Users List", usersListQuery);

  return (
    <>
      <h1>Users List Component</h1>
    </>
  );
};

export default UsersList;
