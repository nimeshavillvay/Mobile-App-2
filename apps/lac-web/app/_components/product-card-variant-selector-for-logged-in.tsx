import AddToShoppingListDialog from "@/_components/shopping-list/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
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
  readonly productVariantId: string;
  readonly href: string;
  readonly variants: {
    id: string;
    slug: string;
    sku: string;
    title: string;
    image: string;
    uom: string;
  }[];
  readonly selectedId?: string;
  readonly setSelectedId: (value: string) => void;
  readonly addToCart: () => void;
  readonly token?: string;
}) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    selectedId ?? productVariantId,
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;

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

export default ProductCardVariantSelectorForLoggedIn;
