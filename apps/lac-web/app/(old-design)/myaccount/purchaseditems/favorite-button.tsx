"use client";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import AddToShoppingListDialog from "@/(old-design)/myaccount/shopping-lists/add-to-shopping-list-dialog";
import useSuspenseFavouriteSKUs from "@/(old-design)/myaccount/shopping-lists/use-suspense-favourite-skus.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  productId: number;
};

const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const [cookies] = useCookies();
  const sessionToken = cookies[SESSION_TOKEN_COOKIE];

  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favouriteSKUs } = useSuspenseFavouriteSKUs(sessionToken, [
    productId.toString(),
  ]);

  const favouriteSKU = favouriteSKUs[0];
  const isFavourite = favouriteSKU?.isFavourite ?? false;
  const favoriteIds = favouriteSKU?.favouriteIds ?? [];

  const checkLoginQuery = useSuspenseCheckLogin(sessionToken);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

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

      {isLoggedInUser && (
        <AddToShoppingListDialog
          open={showShoppingListsDialog}
          setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
          productId={productId}
          favouriteIds={favoriteIds}
        />
      )}
    </>
  );
};

export default FavoriteButton;
