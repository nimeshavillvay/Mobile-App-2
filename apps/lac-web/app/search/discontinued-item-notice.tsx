"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.push(`/`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discontinued</DialogTitle>
          <DialogDescription>
            We&apos;re sorry, that product has been discontinued. Would you like
            to go to its category to find a substitute?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push(`/`)}>
            No
          </Button>
          <Button
            variant="default"
            onClick={() => router.push(`/category/${categoryId}/${slug}`)}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscontinuedItemNotice;
