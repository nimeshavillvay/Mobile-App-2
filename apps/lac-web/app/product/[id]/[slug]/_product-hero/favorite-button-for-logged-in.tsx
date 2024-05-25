"use client";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import { HeartFilled } from "@repo/web-ui/components/icons/heart-filled";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import useSuspenseFavoriteSKUs from "../../../../_hooks/shopping-list/use-suspense-favorite-skus.hook";

type FavoriteButtonForLoggedInProps = {
  productId: number;
  token: string;
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
      >
        {isFavorite ? (
          <HeartFilled className="size-4" />
        ) : (
          <HeartOutline className="size-4" />
        )}

        <span className="sr-only">Add to favorites</span>
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
