import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { loginCheck } from "@/_hooks/user/use-suspense-check-login.hook";
import { getPasswordPolicies } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPasswordReset } from "./api";
import PasswordResetForm from "./password-reset-form";

export const metadata: Metadata = {
  title: "Password Reset",
};

type PasswordResetProps = {
  readonly searchParams: { [key: string]: string | string[] | undefined };
};

const PasswordReset = async ({ searchParams }: PasswordResetProps) => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  sendGTMEvent({
    event: "view_page",
    viewPageData: {
      page_type: getGTMPageType(
        pathnameHistory[pathnameHistory.length - 1] ?? "",
      ),
    },
  });

  const userKey = searchParams.password_reset_key?.toString();
  const userId = searchParams.user?.toString();
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);
  const token = sessionCookie?.value ?? "";
  const [passwordPolicies, loginCheckResponse] = await Promise.all([
    getPasswordPolicies(),
    loginCheck(token),
  ]);

  if (
    userId &&
    loginCheckResponse?.change_password &&
    loginCheckResponse?.status_code === "OK"
  ) {
    return (
      <PasswordResetForm
        userKey={""}
        userId={userId}
        passwordPolicies={passwordPolicies}
        token={token}
      />
    );
  }

  if (!userKey || !userId) {
    redirect("/sign-in");
  }

  const passwordResetCheck = await checkPasswordReset(userKey, userId);

  if (passwordResetCheck.statusCode && passwordResetCheck.statusCode !== "OK") {
    return (
      <div className="mx-auto my-20 max-w-[25rem] space-y-5">
        <p className="text-center text-sm text-wurth-gray-500">
          {passwordResetCheck.message}
        </p>
      </div>
    );
  }

  return (
    <PasswordResetForm
      userKey={userKey}
      userId={userId}
      passwordPolicies={passwordPolicies}
      token={token}
    />
  );
};

export default PasswordReset;
