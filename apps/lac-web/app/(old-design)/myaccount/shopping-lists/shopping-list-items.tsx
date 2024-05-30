"use client";

import type { ShoppingListElement } from "@/_lib/types";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { PiPenNibDuotone } from "react-icons/pi";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import ProductCard from "./product-card";
import ShoppingListDialog from "./shopping-list-dialog";
import ShoppingListPagination from "./shopping-list-pagination";
import useDeleteShoppingListMutation from "./use-delete-shopping-list-mutation.hook";
import useSuspenseShoppingListItemCount from "./use-suspense-shopping-list-item-count.hook";
import useSuspenseShoppingListItems from "./use-suspense-shopping-list-item.hook";

const ShoppingListItems = ({
  token,
  page,
  shoppingList,
}: {
  readonly token: string;
  readonly page: number;
  readonly shoppingList: ShoppingListElement;
}) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const perPage = 20;

  const shoppingListItemCountQuery = useSuspenseShoppingListItemCount(
    token,
    shoppingList.listId,
  );
  const shoppingListItemCount = shoppingListItemCountQuery?.data;
  const totalPages = Math.ceil(shoppingListItemCount.count / perPage);

  const shoppingListItemsQuery = useSuspenseShoppingListItems(
    token,
    shoppingList.listId,
    page,
    perPage,
    "title",
    "desc",
  );

  const shoppingListItems = shoppingListItemsQuery?.data;

  const deleteShoppingListMutation = useDeleteShoppingListMutation();

  const renameShoppingList = () => {
    setIsOpenShoppingListDialog(true);
  };

  const deleteShoppingList = () => {
    setIsOpenDeleteDialog(true);
  };

  return (
    <>
      <div className="mx-2 my-5 flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">{shoppingList.listName}</h3>
        <div className="flex flex-row items-center gap-2">
          <ShoppingListButtons
            renameShoppingList={renameShoppingList}
            deleteShoppingList={deleteShoppingList}
          />
        </div>
      </div>

      <div className="mx-2 my-5 flex flex-row items-center justify-between text-sm font-normal">
        <p>{shoppingListItemCount.count} items</p>
        <p>
          Page {page} of {totalPages == 0 ? 1 : totalPages}
        </p>
      </div>

      {shoppingListItems.items.map((item) => (
        <div key={item.productId} className="inline-grid p-2">
          <ProductCard
            orientation="vertical"
            token={token}
            product={item}
            listId={shoppingList.listId}
          />
        </div>
      ))}

      {!!shoppingList?.listId && (
        <ShoppingListPagination
          page={page}
          totalPages={totalPages}
          shoppingListId={shoppingList?.listId}
        />
      )}

      <ShoppingListDialog
        open={isOpenShoppingListDialog}
        setOpenShoppingListDialog={setIsOpenShoppingListDialog}
        isShoppingListNameUpdate={true}
        shoppingList={shoppingList}
      />

      <ActionConfirmationDialog
        open={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        title="Confirm Action"
        text="Do you really want to delete this shopping list?"
        onConfirm={() => {
          deleteShoppingListMutation.mutate(shoppingList.listId);
          setIsOpenDeleteDialog(false);
        }}
        okText="Confirm"
      />
    </>
  );
};

const ShoppingListButtons = ({
  renameShoppingList,
  deleteShoppingList,
  disabled = false,
}: {
  readonly renameShoppingList?: () => void;
  readonly deleteShoppingList?: () => void;
  readonly disabled?: boolean;
}) => {
  return (
    <>
      <Button
        variant="outline"
        className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-black shadow hover:border-gray-300"
        aria-label="Rename shopping list"
        onClick={renameShoppingList}
        disabled={disabled}
      >
        <PiPenNibDuotone className="size-4" />
        <span className="sr-only">Rename shopping list</span>
        Rename list
      </Button>
      <Button
        variant="outline"
        className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-brand-primary shadow hover:border-gray-300"
        aria-label="Delete shopping list"
        onClick={deleteShoppingList}
        disabled={disabled}
      >
        <MdOutlineDelete className="size-4" />
        <span className="sr-only">Delete shopping list</span>
        Delete list
      </Button>
    </>
  );
};

const ShoppingListEmptyItems = () => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <ShoppingListButtons disabled={true} />
      </div>
      <p className="mt-10 text-center text-xl font-bold">No items found</p>
    </>
  );
};

export { ShoppingListEmptyItems, ShoppingListItems };
