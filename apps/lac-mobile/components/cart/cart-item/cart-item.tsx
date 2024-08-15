import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import {
  CartItem as CartItemPrimitive,
  CartItemRightSwipeAction,
} from "@repo/native-ui/components/cart/cart-item";
import { DropShipItemNotice } from "@repo/native-ui/components/notices/drop-ship-item-notice";
import { RegionallyExclusiveItemNotice } from "@repo/native-ui/components/notices/regionally-exclusive-item-notice";
import useRemoveCartItemMutation from "@repo/shared-logic/apis/hooks/cart/use-remove-cart-item-mutation.hook";
import { useState, type ComponentProps } from "react";

type CartItemProps = {
  readonly cartItemId: number;
  readonly image: string;
  readonly title: string;
  readonly sku: string;
  readonly price?: number;
  readonly quantity: number;
  readonly uom: string;
  readonly pickupQuantity?: number;
  readonly backOrderedQuantity?: number;
  readonly isVendorShipped: boolean;
  readonly isExcluded: boolean;
};

const CartItem = ({
  cartItemId,
  image,
  title,
  sku,
  price = 0,
  quantity,
  uom,
  pickupQuantity = 0,
  backOrderedQuantity = 0,
  isVendorShipped,
  isExcluded,
}: CartItemProps) => {
  const token = useSessionTokenStorage((state) => state.token);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const removeCartItemMutation = useRemoveCartItemMutation({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
    token,
  });

  const removeItem: ComponentProps<
    typeof CartItemRightSwipeAction
  >["onConfirm"] = (event) => {
    event.preventDefault();

    removeCartItemMutation.mutate([cartItemId], {
      onSuccess: () => {
        setOpenRemoveDialog(false);
      },
    });
  };

  return (
    <CartItemPrimitive
      renderRightActions={(progress, dragAnimatedValue) => (
        <CartItemRightSwipeAction
          dragAnimatedValue={dragAnimatedValue}
          openConfirmationDialog={openRemoveDialog}
          setOpenConfirmationDialog={setOpenRemoveDialog}
          onConfirm={removeItem}
        />
      )}
      image={image}
      title={title}
      sku={sku}
      price={price}
      quantity={quantity}
      uom={uom}
      isVendorShipped={isVendorShipped}
      DropShipNotice={DropShipItemNotice}
      isExcluded={isExcluded}
      RegionallyExclusiveNotice={RegionallyExclusiveItemNotice}
      pickupQuantity={pickupQuantity}
      backOrderedQuantity={backOrderedQuantity}
    />
  );
};

export default CartItem;
