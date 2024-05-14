import type { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

type ForgotPasswordProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ForgotPassword = ({ searchParams }: ForgotPasswordProps) => {
  const email = searchParams.email?.toString() ?? "";

  return <ForgotPasswordForm email={email} />;
};

export default ForgotPassword;
