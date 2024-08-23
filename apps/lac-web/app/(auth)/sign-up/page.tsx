import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import SignUp from "./sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
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

  return (
    <Suspense
      fallback={
        <div className="container">
          <Skeleton className="mx-auto my-20 h-[210px] max-w-[25rem] rounded-lg shadow-lg" />
        </div>
      }
    >
      <SignUp />
    </Suspense>
  );
};

export default SignUpPage;
