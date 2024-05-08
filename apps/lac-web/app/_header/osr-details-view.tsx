"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Switch } from "@repo/web-ui/components/icons/switch";
import { useRouter } from "next/navigation";
import React from "react";
import useLogoutMutation from "./_user-profile/use-logout-mutation.hook";

const OSRDetailsView = ({ token }: { token: string }) => {
  const loginCheckResponse = useSuspenseCheckLogin(token);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const loginCheckData = loginCheckResponse.data;
  let isOSRLoggedInAsCustomer = false;

  // TODO: Update this function after the /login-check API is updated to identify the OSR login status
  if (
    loginCheckData.status_code === "OK" &&
    "sales_rep_id" in loginCheckData &&
    "user_id" in loginCheckData
  ) {
    isOSRLoggedInAsCustomer = true;
  }

  return (
    <>
      {isOSRLoggedInAsCustomer && (
        <div className="flex items-center gap-5">
          <div>
            <span>Logged in as&nbsp;</span>

            {loginCheckData?.user && (
              <span className="font-bold">
                {loginCheckData.user.company || loginCheckData.user.billto}
              </span>
            )}
          </div>

          <div className="text-wurth-gray-500">|</div>

          <button
            className="cursor-pointer"
            onClick={() =>
              logoutMutation.mutate(undefined, {
                onSuccess: () => {
                  router.replace("/osr/dashboard");
                },
              })
            }
          >
            <span className="flex items-center gap-2 font-bold">
              Switch back <Switch width={16} />
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default OSRDetailsView;
