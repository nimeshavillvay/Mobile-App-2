"use client";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import { HeartFilled } from "@repo/web-ui/components/icons/heart-filled";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import useSuspenseFavouriteSKUs from "../../../../_hooks/shopping-list/use-suspense-favourite-skus.hook";

type FavoriteButtonForLoggedInProps = {
  productId: number;
  token: string;
};

const FavoriteButtonForLoggedIn = ({
  productId,
  token,
}: FavoriteButtonForLoggedInProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favouriteSKUs } = useSuspenseFavouriteSKUs(token, [
    productId.toString(),
  ]);

  const favouriteSKU = favouriteSKUs[0];
  const isFavourite = favouriteSKU?.isFavourite ?? false;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setShowShoppingListsDialog(true);
        }}
      >
        {isFavourite ? (
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
        favouriteListIds={favouriteSKU?.favouriteListIds ?? []}
        token={token}
      />
    </>
  );
};

export default FavoriteButtonForLoggedIn;
