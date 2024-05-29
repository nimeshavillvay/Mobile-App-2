"use client";

import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
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
  readonly token: string;
  readonly productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return null;
  }

  return (
    <Warning
      title="Not Available"
      description="This item is not available in your territory."
    />
  );
};
