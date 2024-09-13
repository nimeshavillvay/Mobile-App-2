"use client";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { BookmarkFilled } from "@repo/web-ui/components/icons/bookmark-filled";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
  readonly display: "mobile" | "desktop";
};

const FavoriteButtonForLoggedIn = ({
  token,
  productId,
  display,
}: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    productId.toString(),
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;
  const favoriteListIds = favoriteSKU?.favoriteListIds ?? [];

  return (
    <>
      {display === "desktop" && (
        <Button
          variant="ghost"
          className="h-fit w-full justify-end px-0 py-0"
          onClick={() => {
            setShowShoppingListsDialog(true);
          }}
        >
          <span
            className="text-[13px] leading-5"
            data-button-action="Cart Open Add to Shopping List Dialog"
          >
            Add to List
          </span>

          {isFavorite ? (
            <BookmarkFilled
              className="size-4"
              data-button-action="Cart Open Add to Shopping List Dialog"
            />
          ) : (
            <BookmarkOutline
              className="size-4"
              data-button-action="Cart Open Add to Shopping List Dialog"
            />
          )}
        </Button>
      )}

      {display === "mobile" && (
        <Button
          variant="subtle"
          className="w-full"
          onClick={() => {
            setShowShoppingListsDialog(true);
          }}
        >
          {isFavorite ? (
            <BookmarkFilled
              className="size-4"
              data-button-action="Cart Mobile Open Add to Shopping List Dialog"
            />
          ) : (
            <BookmarkOutline
              className="size-4"
              data-button-action="Cart Mobile Open Add to Shopping List Dialog"
            />
          )}

          <span className="sr-only">Add to list</span>
        </Button>
      )}

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={productId}
        favoriteListIds={favoriteListIds}
        token={token}
      />
    </>
  );
};

export default FavoriteButtonForLoggedIn;
