import { getPasswordPolicies } from "@/_lib/apis/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkPasswordReset } from "./api";
import PasswordResetForm from "./password-reset-form";

export const metadata: Metadata = {
  title: "Password Reset",
};

type PasswordResetProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const PasswordReset = async ({ searchParams }: PasswordResetProps) => {
  if (!searchParams.password_reset_key || !searchParams.user) {
    redirect("/sign-in");
  }

  const userKey = searchParams.password_reset_key.toString();
  const userId = searchParams.user.toString();
  const passwordResetCheck = await checkPasswordReset(userKey, userId);

  if (passwordResetCheck.statusCode !== "OK") {
    return (
      <div className="mx-auto my-20 max-w-[25rem] space-y-5">
        <p className="text-center text-sm text-wurth-gray-500">
          {passwordResetCheck.message}
        </p>
      </div>
    );
  }

  const passwordPolicies = await getPasswordPolicies();

  return (
    <PasswordResetForm
      userKey={userKey}
      userId={userId}
      passwordPolicies={passwordPolicies}
    />
  );
};

export default PasswordReset;
