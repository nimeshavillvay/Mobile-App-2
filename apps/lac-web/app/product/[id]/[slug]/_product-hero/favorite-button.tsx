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

type FavoriteButtonProps = {
  productId: number;
  isFavourite: boolean;
  favoriteIds: string[];
  className?: string;
};

const FavoriteButton = ({
  productId,
  isFavourite,
  favoriteIds,
}: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);
  const router = useRouter();

  const [cookies] = useCookies();
  const sessionToken = cookies[SESSION_TOKEN_COOKIE];

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
          favoriteIds={favoriteIds}
        />
      )}
    </>
  );
};

export default FavoriteButton;
