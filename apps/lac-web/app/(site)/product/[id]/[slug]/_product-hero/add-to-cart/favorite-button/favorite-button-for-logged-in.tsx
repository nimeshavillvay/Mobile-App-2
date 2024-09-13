"use client";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { BookmarkFilled } from "@repo/web-ui/components/icons/bookmark-filled";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonForLoggedInProps = {
  readonly productId: number;
  readonly token?: string;
};

const FavoriteButtonForLoggedIn = ({
  productId,
  token,
}: FavoriteButtonForLoggedInProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    productId.toString(),
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setShowShoppingListsDialog(true);
        }}
        data-button-action="Open Wishlist"
      >
        {isFavorite ? (
          <BookmarkFilled className="size-4" />
        ) : (
          <BookmarkOutline className="size-4" />
        )}

        <span className="sr-only">Add to list</span>
      </Button>

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={productId}
        favoriteListIds={favoriteSKU?.favoriteListIds ?? []}
        token={token}
      />
    </>
  );
};

export default FavoriteButtonForLoggedIn;
