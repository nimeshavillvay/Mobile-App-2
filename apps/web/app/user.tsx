"use client";

import { useUser } from "@repo/shared-logic/hooks";

type UserProps = {
  id: number;
};

const User = ({ id }: UserProps) => {
  const userQuery = useUser(id);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User {id}</h2>

      <div>Name: {userQuery.data?.name}</div>
      <div>Email: {userQuery.data?.email}</div>
    </div>
  );
};

export default User;
