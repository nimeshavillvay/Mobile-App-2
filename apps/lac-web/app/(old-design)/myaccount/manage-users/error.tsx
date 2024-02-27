"use client";

import Separator from "@/old/_components/separator";

const ManageUsersError = () => {
  return (
    <div>
      <h2 className="font-wurth text-brand-primary relative text-xl font-medium">
        Manage Users
      </h2>

      <Separator
        orientation="horizontal"
        className="bg-brand-primary h-px flex-1"
      />

      <div className="font-wurth text-brand-primary border-brand-primary mt-10 rounded-sm border p-6 text-center text-lg capitalize">
        Oops... Something went wrong!
      </div>
    </div>
  );
};

export default ManageUsersError;
