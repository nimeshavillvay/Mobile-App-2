"use client";

import { Tabs, TabsList, TabsTrigger } from "@/_components/ui/tabs";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
import { Button } from "~/components/ui/button";
import ShoppingListDialog from "./shopping-list-dialog";
import ShoppingListItems from "./shopping-list-items";
import ShoppingListPagination from "./shopping-list-pagination";
import useSuspenseShoppingList from "./use-suspense-shopping-list.hook";

const ShoppingList = ({ token }: { token: string }) => {
  const [selectedAddressShoppingListId, setSelectedAddressShoppingListId] =
    useState("");
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const perPage = 20;
  const shoppingLists = useSuspenseShoppingList(token, "name", "desc")?.data;

  const searchParams = useSearchParams();

  const pageNoValue = searchParams.get("page") ?? "1";
  const page = !isNaN(parseInt(pageNoValue)) ? parseInt(pageNoValue) : 1;

  let shoppingList;
  const shoppingListIdValue = searchParams.get("shoppingListId");
  if (shoppingListIdValue == selectedAddressShoppingListId) {
    shoppingList = shoppingLists.lists.find(
      (list) => shoppingListIdValue == list?.listId,
    );
  } else if (selectedAddressShoppingListId) {
    shoppingList = shoppingLists.lists.find(
      (list) => selectedAddressShoppingListId == list?.listId,
    );
  } else {
    shoppingList = shoppingLists.lists[0];
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <Tabs
          onValueChange={setSelectedAddressShoppingListId}
          defaultValue={shoppingLists.lists[0]?.listId}
          className="overflow-y-auto"
        >
          <TabsList>
            {shoppingLists.lists.map((list) => (
              <TabsTrigger key={list.listId} value={list?.listId}>
                {list?.listName}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          className="mx-5 my-auto px-0 py-0 hover:bg-transparent"
          onClick={() => setIsOpenShoppingListDialog(true)}
        >
          <span className="sr-only">Create shopping list</span>
          <MdOutlineAdd className="border-1   size-6 rounded-sm border-gray-100 bg-transparent font-bold text-black shadow" />
        </Button>
      </div>

      {!!shoppingList && (
        <ShoppingListItems
          token={token}
          page={page}
          perPage={perPage}
          shoppingList={shoppingList}
        />
      )}

      {!!shoppingList?.listId && (
        <ShoppingListPagination
          token={token}
          page={page}
          perPage={perPage}
          shoppingListId={shoppingList?.listId}
        />
      )}

      <ShoppingListDialog
        open={isOpenShoppingListDialog}
        setOpenShoppingListDialog={setIsOpenShoppingListDialog}
        isShoppingListNameUpdate={false}
        shoppingList={{
          listId: "",
          listName: "",
          date: "",
          totalItem: "",
        }}
      />
    </>
  );
};

export default ShoppingList;
