"use client";

import { Button } from "@/(old-design)/_components/ui/button";
import { cn } from "@/(old-design)/_utils/helpers";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdCheck } from "react-icons/md";
import { changeSearchParams } from "./client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "./constants";

type FiltersForMobileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  totalPagesCount: number;
};

const PurchasedItemsMobilePagination = ({
  open,
  setOpen,
  totalPagesCount,
}: FiltersForMobileProps) => {
  const urlSearchParams = useSearchParams();
  const currentPage = Number(urlSearchParams.get("page") ?? INIT_PAGE_NUMBER);

  const [page, setPage] = useState(currentPage);

  const pagesList = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  const paginate = () => {
    const searchParams = [];

    searchParams.push({
      key: QUERY_KEYS.PAGE,
      value: page.toString(),
    });

    changeSearchParams(urlSearchParams, searchParams);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base overflow max-h-[80vh] max-w-[500px] gap-0">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-bold">
            Select a page
          </DialogTitle>
        </DialogHeader>
        <div>
          {pagesList.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={cn(
                "flex w-full items-center justify-between px-5 py-3 font-bold",
                page == pageNumber
                  ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
                  : "",
              )}
            >
              Page {pageNumber}
              <MdCheck
                className={cn(
                  "text-3xl leading-none text-brand-secondary",
                  page == pageNumber ? "block" : "hidden",
                )}
              />
            </button>
          ))}
          <DialogFooter className="px-5 py-6">
            <Button className="w-full p-6" onClick={() => paginate()}>
              Done
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasedItemsMobilePagination;
