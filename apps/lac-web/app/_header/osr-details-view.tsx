"use client";

import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Switch } from "@repo/web-ui/components/icons/switch";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { useRouter } from "next/navigation";

const OSRDetailsView = ({ token }: { readonly token: string }) => {
  const loginCheckResponse = useSuspenseCheckLogin(token);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const loginCheckData = loginCheckResponse.data;

  if (loginCheckData.status_code == "NOT_LOGGED_IN") {
    return null;
  }

  return (
    loginCheckData.isLoggedInAsCustomer && (
      <div className="flex items-center gap-5">
        <div>
          <span>Logged in as&nbsp;</span>

          {loginCheckData.status_code === "OK" && (
            <span className="font-bold">
              {loginCheckData.user.company !== ""
                ? loginCheckData.user.company
                : loginCheckData.user.billto}
            </span>
          )}
        </div>

        <Separator
          orientation="vertical"
          className="h-5 w-px bg-brand-gray-500"
        />

        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            logoutMutation.mutate(undefined, {
              onSuccess: () => {
                router.replace("/osr/dashboard");
              },
            })
          }
        >
          Switch back <Switch width={16} />
        </button>
      </div>
    )
  );
};

export default OSRDetailsView;
