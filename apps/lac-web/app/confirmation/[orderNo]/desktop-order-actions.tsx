"use client";

import { cn } from "@/_lib/utils";
import { Printer } from "@repo/web-ui/components/icons/printer";
import { Receipt } from "@repo/web-ui/components/icons/receipt";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";

const DesktopOrderActions = () => {
  return (
    <div className="flex flex-row items-center">
      <Button
        variant="ghost"
        className="font-bold"
        onClick={() => window.print()}
      >
        <Printer width={16} height={16} />

        <span>Print receipt</span>
      </Button>

      <Link
        href="/myaccount/orderhistory"
        className={cn(buttonVariants({ variant: "ghost" }), "font-bold")}
      >
        <Receipt width={16} height={16} />

        <span>View order history</span>
      </Link>
    </div>
  );
};

export default DesktopOrderActions;
