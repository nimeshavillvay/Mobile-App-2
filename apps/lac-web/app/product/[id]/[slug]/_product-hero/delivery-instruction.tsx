"use client";
import Instructions from "@/confirmation/[orderNo]/instructions";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState } from "react";

const DeliveryInstruction = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mx-0.5 justify-start pl-0 hover:bg-transparent hover:underline"
        >
          View delivery instructions
          <span className="sr-only">Instruction</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>

          <Instructions
            type="mobile"
            className="top-auto max-h-[calc(100vh-150px)] overflow-y-auto"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryInstruction;
