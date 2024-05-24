import AddToShoppingListDialog from "@/(old-design)/myaccount/shopping-lists/add-to-shopping-list-dialog";
import useSuspenseFavouriteSKUs from "@/(old-design)/myaccount/shopping-lists/use-suspense-favourite-skus.hook";
import { ProductCardVariantSelector } from "@repo/web-ui/components/product-card";
import { useState } from "react";

const ProductCardVariantSelectorForLoggedIn = ({
  productVariantId,
  href,
  variants,
  selectedId,
  setSelectedId,
  addToCart,
  token,
}: {
  productVariantId: string;
  href: string;
  variants: {
    id: string;
    slug: string;
    sku: string;
    title: string;
    image: string;
    uom: string;
  }[];
  selectedId?: string;
  setSelectedId: (value: string) => void;
  addToCart: () => void;
  token: string;
}) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favouriteSKUs } = useSuspenseFavouriteSKUs(token, [
    selectedId ?? productVariantId,
  ]);

  const favouriteSKU = favouriteSKUs[0];
  const isFavourite = favouriteSKU?.isFavourite ?? false;

  return (
    <>
      <ProductCardVariantSelector
        href={href}
        value={selectedId}
        onValueChange={setSelectedId}
        variants={variants.map((variant) => ({
          value: variant.id,
          title: variant.title,
        }))}
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

export default ProductCardVariantSelectorForLoggedIn;
