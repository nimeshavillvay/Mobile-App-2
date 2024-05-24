"use client";

import AddToShoppingListDialog from "@/(old-design)/myaccount/shopping-lists/add-to-shopping-list-dialog";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { HeartFilled } from "@repo/web-ui/components/icons/heart-filled";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSuspenseFavouriteSKUs from "../../../../(old-design)/myaccount/shopping-lists/use-suspense-favourite-skus.hook";

type FavoriteButtonProps = {
  productId: number;
  className?: string;
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

  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(sessionToken);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          isLoggedInUser
            ? setShowShoppingListsDialog(true)
            : router.push("/sign-in");
        }}
      >
        {isFavourite ? (
          <HeartFilled className="size-4" />
        ) : (
          <HeartOutline className="size-4" />
        )}

        <span className="sr-only">Add to favorites</span>
      </Button>

      {isLoggedInUser && (
        <AddToShoppingListDialog
          open={showShoppingListsDialog}
          setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
          productId={productId}
          favouriteIds={favouriteSKU?.favouriteIds ?? []}
        />
      )}
    </>
  );
};

export default FavoriteButton;
