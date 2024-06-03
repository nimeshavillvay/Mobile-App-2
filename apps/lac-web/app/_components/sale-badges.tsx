"use client";

import { Zap } from "@repo/web-ui/components/icons/zap";

type SaleBadgesProps = {
  readonly onSale: boolean;
  readonly isNewItem: boolean;
};

const SaleBadges = ({ onSale, isNewItem }: SaleBadgesProps) => {
  return (
    <>
      {onSale && (
        <div
          className="float-right flex flex-row items-center gap-1 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450"
          style={{ marginLeft: "7px" }}
        >
          <Zap className="hidden size-4 stroke-wurth-blue-450 md:block" />
          <span>Flash Deal</span>
        </div>
      )}
      {isNewItem && (
        <div
          className="float-right flex flex-row items-center gap-1 rounded px-2 py-1.5 text-sm font-semibold leading-4"
          style={{
            color: "#A16207",
            backgroundColor: "#FEF2F2",
          }}
        >
          <span>New</span>
        </div>
      )}
    </>
  );
};

export default SaleBadges;
