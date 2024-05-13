"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { useEffect, useState } from "react";

const NoResultsNotice = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Open just once on mount
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>No results</DialogTitle>
          <DialogDescription>
            Sorry, no results were found for your search term.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NoResultsNotice;
