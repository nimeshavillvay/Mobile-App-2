import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { ProductCardActions } from "@repo/web-ui/components/product-card";
import { useState } from "react";

const ProductCardActionsForLoggedIn = ({
  token,
  productVariantId,
  addToCart,
}: {
  productVariantId: string;
  token: string;
  addToCart: () => void;
}) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    productVariantId,
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;

  return (
    <>
      <ProductCardActions
        addToCart={addToCart}
        isFavorite={isFavorite}
        onClickShoppingList={() => {
          setShowShoppingListsDialog(true);
        }}
      />

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={parseInt(productVariantId)}
        favoriteListIds={favoriteSKU?.favoriteListIds ?? []}
        token={token}
      />
    </>
  );
};

export default ProductCardActionsForLoggedIn;
