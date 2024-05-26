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
import useSuspenseShoppingList from "../../../_hooks/shopping-list/use-suspense-shopping-list.hook";
import ShoppingListDialog from "./shopping-list-dialog";
import ShoppingListItems from "./shopping-list-items";
import ShoppingListPagination from "./shopping-list-pagination";
import useSuspenseShoppingListItemCount from "./use-suspense-shopping-list-item-count.hook";

const ShoppingList = ({ token }: { token: string }) => {
  const [selectedAddressShoppingListId, setSelectedAddressShoppingListId] =
    useState("");
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const perPage = 20;

  const shoppingListsQuery = useSuspenseShoppingList(token, {
    sort: "name",
    sortDirection: "desc",
  });

  const shoppingLists = shoppingListsQuery?.data;

  const searchParams = useSearchParams();
  const shoppingListIdValue = searchParams.get("shoppingListId");

  let page = 1;
  let shoppingList;

  if (shoppingListIdValue == selectedAddressShoppingListId) {
    // for selecting shopping list during pagination
    shoppingList = shoppingLists.lists.find(
      (list) => shoppingListIdValue == list?.listId,
    );

    const pageNoValue = searchParams.get("page") ?? "1";
    page = !isNaN(parseInt(pageNoValue)) ? parseInt(pageNoValue) : 1;
  } else if (selectedAddressShoppingListId) {
    // for selecting shopping list during tab selection
    shoppingList = shoppingLists.lists.find(
      (list) => selectedAddressShoppingListId == list?.listId,
    );
  }

  if (!shoppingList && shoppingLists.lists.length > 0) {
    // for selecting the first shopping list when another shopping list is deleted
    shoppingList = shoppingLists.lists[0];
  }

  let listId = "id";
  if (shoppingList && shoppingList.listId) {
    listId = shoppingList.listId;
  }

  const shoppingListItemCountQuery = useSuspenseShoppingListItemCount(
    token,
    listId,
  );
  const shoppingListItemCount = shoppingListItemCountQuery?.data;
  const totalPages = Math.ceil(shoppingListItemCount.count / perPage);

  return (
    <>
      <div className="flex flex-row justify-center">
        {shoppingLists.lists.length > 0 && (
          <Tabs
            onValueChange={setSelectedAddressShoppingListId}
            defaultValue={shoppingLists.lists[0]?.listId}
            className="max-w-screen-md overflow-x-auto overflow-y-hidden"
          >
            <TabsList>
              {shoppingLists.lists.map((list) => (
                <TabsTrigger key={list.listId} value={list?.listId}>
                  {list?.listName}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
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
          totalPages={totalPages}
          perPage={perPage}
          shoppingList={shoppingList}
        />
      )}

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
