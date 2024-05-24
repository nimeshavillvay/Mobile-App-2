"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/(old-design)/myaccount/shopping-lists/tabs";
import { Button } from "@repo/web-ui/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import ShoppingListDialog from "./shopping-list-dialog";
import ShoppingListItems from "./shopping-list-items";
import ShoppingListPagination from "./shopping-list-pagination";
import useSuspenseShoppingListMutation from "./use-suspense-shopping-list.hook";

const ShoppingList = ({ token }: { token: string }) => {
  const [selectedAddressShoppingListId, setSelectedAddressShoppingListId] =
    useState("");
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const perPage = 20;
  const shoppingListsQuery = useSuspenseShoppingListMutation(
    token,
    "name",
    "desc",
  );

  const shoppingLists = shoppingListsQuery?.data;

  const searchParams = useSearchParams();

  const pageNoValue = searchParams.get("page") ?? "1";
  const page = !isNaN(parseInt(pageNoValue)) ? parseInt(pageNoValue) : 1;

  let shoppingList;
  const shoppingListIdValue = searchParams.get("shoppingListId");
  if (shoppingListIdValue == selectedAddressShoppingListId) {
    // for selecting shopping list during pagination
    shoppingList = shoppingLists.lists.find(
      (list) => shoppingListIdValue == list?.listId,
    );
  } else if (selectedAddressShoppingListId) {
    // for selecting shopping list during tab selection
    shoppingList = shoppingLists.lists.find(
      (list) => selectedAddressShoppingListId == list?.listId,
    );
  }

  if (!shoppingList) {
    // for selecting the first shopping list when another shopping list is deleted
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