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
};

const FavoriteButton = ({ token, productId }: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    productId.toString(),
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;
  const favoriteListIds = favoriteSKU?.favoriteListIds ?? [];

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setShowShoppingListsDialog(true)}
      >
        {isFavorite ? (
          <BookmarkFilled
            className="fill-black text-2xl text-brand-primary"
            data-button-action="Purchase Items Open Add to Wishlist Dialog"
          />
        ) : (
          <BookmarkOutline
            className="text-2xl text-brand-gray-500"
            data-button-action="Purchase Items Open Add to Wishlist Dialog"
          />
        )}
      </Button>

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

export default FavoriteButton;
