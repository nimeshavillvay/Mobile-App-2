import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const ShoppingListPagination = ({
  page,
  totalPages,
  shoppingListId,
}: {
  page: number;
  totalPages: number;
  shoppingListId: string;
}) => {
  const previousPage = page - 1 < 1 ? 1 : page - 1;
  let nextPage;
  if (totalPages == 0) {
    nextPage = 1;
  } else {
    nextPage = page + 1 > totalPages ? totalPages : page + 1;
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getHref = (pageNo: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set("page", pageNo.toString());
    newUrlSearchParams.set("shoppingListId", shoppingListId.toString());
    return `${pathname}?${newUrlSearchParams.toString()}`;
  };

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getHref(previousPage)} />
        </PaginationItem>

        {page !== previousPage && (
          <>
            {previousPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={getHref(previousPage)}>
                {previousPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href={getHref(page)} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page !== nextPage && (
          <>
            <PaginationItem>
              <PaginationLink href={getHref(nextPage)}>
                {nextPage}
              </PaginationLink>
            </PaginationItem>

            {nextPage < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        <PaginationItem>
          <PaginationNext href={getHref(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ShoppingListPagination;
