"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { PiPenNibDuotone } from "react-icons/pi";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import ProductCard from "./product-card";
import ShoppingListDialog from "./shopping-list-dialog";
import type { ShoppingListElement } from "./type";
import useDeleteShoppingListMutation from "./use-delete-shopping-list-mutation.hook";
import useSuspenseShoppingListItems from "./use-suspense-shopping-list-item.hook";

const ShoppingListItems = ({
  token,
  page,
  perPage,
  shoppingList,
}: {
  token: string;
  page: number;
  perPage: number;
  shoppingList: ShoppingListElement;
}) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

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

  return (
    <>
      <div className="mx-2 my-5 flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">{shoppingList.listName}</h3>

        <div className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-black shadow hover:border-gray-300"
            aria-label="Rename shopping list"
            onClick={renameShoppingList}
          >
            <PiPenNibDuotone className="size-4" />
            <span className="sr-only">Rename shopping list</span>
            Rename list
          </Button>
          <Button
            variant="outline"
            className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-brand-primary shadow hover:border-gray-300"
            aria-label="Delete shopping list"
            onClick={() => setIsOpenDeleteDialog(true)}
          >
            <MdOutlineDelete className="size-4" />
            <span className="sr-only">Delete shopping list</span>
            Delete list
          </Button>
        </div>
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

export default ShoppingListItems;