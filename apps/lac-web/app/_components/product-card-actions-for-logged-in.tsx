import AddToShoppingListDialog from "@/(old-design)/myaccount/shopping-lists/add-to-shopping-list-dialog";
import useSuspenseFavouriteSKUs from "@/(old-design)/myaccount/shopping-lists/use-suspense-favourite-skus.hook";
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

  const { data: favouriteSKUs } = useSuspenseFavouriteSKUs(token, [
    productVariantId,
  ]);

  const favouriteSKU = favouriteSKUs[0];
  const isFavourite = favouriteSKU?.isFavourite ?? false;

  return (
    <>
      <ProductCardActions
        addToCart={addToCart}
        isFavourite={isFavourite}
        onClickShoppingList={() => {
          setShowShoppingListsDialog(true);
        }}
      />

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={parseInt(productVariantId)}
        favouriteIds={favouriteSKU?.favouriteIds ?? []}
      />
    </>
  );
};

export default ProductCardActionsForLoggedIn;
