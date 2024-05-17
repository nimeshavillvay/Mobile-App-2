"use client";

import { cn } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import Link from "next/link";
import { useEffect, useState } from "react";

type DiscontinuedItemNoticeProps = {
  categoryId: string;
  slug: string;
};

const DiscontinuedItemNotice = ({
  categoryId,
  slug,
}: DiscontinuedItemNoticeProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discontinued</DialogTitle>
          <DialogDescription>
            We&apos;re sorry, that product has been discontinued. Would you like
            to go to its category to find a substitute?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-end space-x-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-bold text-black",
            )}
          >
            No
          </Link>
          <Link
            href={`/category/${categoryId}/${slug}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "font-bold text-white",
            )}
          >
            Yes
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscontinuedItemNotice;
