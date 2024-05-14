import type { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
