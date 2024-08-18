"use client";

import { revalidateSiteLayout } from "@/_actions/revalidate";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";

type LayoutRevalidateProps = {
  readonly token?: string;
};

const LayoutRevalidate = ({ token }: LayoutRevalidateProps) => {
  useEffect(() => {
    if (!token) {
      revalidateSiteLayout();
    }
  }, [token]);

  return null;
};

export default LayoutRevalidate;
