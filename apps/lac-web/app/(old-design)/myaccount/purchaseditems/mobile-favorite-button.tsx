"use client";

import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { cn } from "@/_lib/utils";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
};

const MobileFavoriteButton = ({ token, productId }: FavoriteButtonProps) => {
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
        className={cn(
          "h-12 uppercase",
          isFavorite
            ? "border-2 border-[#55a213] bg-white text-[#55a213] hover:bg-white"
            : "border-2 border-sky-500 bg-white text-brand-secondary hover:bg-white",
        )}
        onClick={() => setShowShoppingListsDialog(true)}
      >
        {isFavorite ? (
          <>
            <FavoriteIcon className="text-2xl" />
            added to list
          </>
        ) : (
          <>
            <AddToFavoritesIcon className="pt-1 text-2xl" />
            add to list
          </>
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

export default MobileFavoriteButton;
