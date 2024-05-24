"use client";

import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Alert } from "@repo/web-ui/components/icons/alert";
import { type ComponentProps } from "react";

const RegionalExclusionNoticeWrapper = ({
  token,
  ...delegated
}: ComponentProps<typeof RegionalExclusionNotice>) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  // Don't bother trying to show notice if user is not logged in
  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return null;
  }

  return <RegionalExclusionNotice token={token} {...delegated} />;
};

export default RegionalExclusionNoticeWrapper;

const RegionalExclusionNotice = ({
  token,
  productId,
}: {
  token: string;
  productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 rounded-lg bg-red-50 p-4">
      <Alert
        className="mt-1 shrink-0 stroke-wurth-red-650"
        width={16}
        height={16}
      />

      <div className="flex-1 space-y-1">
        <h4 className="text-base font-semibold text-wurth-red-650">
          Not Available
        </h4>

        <p className="text-sm leading-6 text-wurth-gray-800">
          This item is not available in your territory.
        </p>
      </div>
    </div>
  );
};
