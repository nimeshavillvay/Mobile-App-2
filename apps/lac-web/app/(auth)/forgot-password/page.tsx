import { RecaptchaRefProvider } from "@/_context/recaptcha-ref";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

type ForgotPasswordProps = {
  readonly searchParams: { [key: string]: string | string[] | undefined };
};

const ForgotPassword = ({ searchParams }: ForgotPasswordProps) => {
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

  const email = searchParams.email?.toString() ?? "";

  return (
    <RecaptchaRefProvider>
      <ForgotPasswordForm email={email} />
    </RecaptchaRefProvider>
  );
};

export default ForgotPassword;
