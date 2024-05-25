"use client";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavouriteSKUs from "@/_hooks/shopping-list/use-suspense-favourite-skus.hook";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  token: string;
  productId: number;
};

const FavoriteButton = ({ token, productId }: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favouriteSKUs } = useSuspenseFavouriteSKUs(token, [
    productId.toString(),
  ]);

  const favouriteSKU = favouriteSKUs[0];
  const isFavourite = favouriteSKU?.isFavourite ?? false;
  const favoriteListIds = favouriteSKU?.favouriteListIds ?? [];

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setShowShoppingListsDialog(true)}
      >
        {isFavourite ? (
          <IoMdHeart className="text-2xl text-brand-primary" />
        ) : (
          <IoMdHeartEmpty className="text-2xl text-brand-gray-500" />
        )}
      </Button>

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={productId}
        favouriteListIds={favoriteListIds}
        token={token}
      />
    </>
  );
};

export default FavoriteButton;
