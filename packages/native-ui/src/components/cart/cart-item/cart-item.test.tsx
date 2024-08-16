import { DropShipItemNotice } from "~/components/notices/drop-ship-item-notice";
import { RegionallyExclusiveItemNotice } from "~/components/notices/regionally-exclusive-item-notice";
import { render, screen } from "~/lib/test-utils";
import { CartItem, CartItemRightSwipeAction } from "./cart-item";

const ITEM = {
  image: "test.jpg",
  title: "Test Title",
  sku: "Test SKU",
  price: 10,
  quantity: 10,
  uom: "each",
  isVendorShipped: false,
  isExcluded: false,
  pickupQuantity: 10,
  backOrderedQuantity: 10,
};

describe("Cart Item", () => {
  it("displays the data properly", () => {
    render(
      <CartItem
        renderRightActions={(progress, dragAnimatedValue) => (
          <CartItemRightSwipeAction
            dragAnimatedValue={dragAnimatedValue}
            openConfirmationDialog={false}
            setOpenConfirmationDialog={jest.fn()}
            onConfirm={jest.fn()}
          />
        )}
        image={ITEM.image}
        title={ITEM.title}
        sku={ITEM.sku}
        price={ITEM.price}
        quantity={ITEM.quantity}
        uom={ITEM.uom}
        isVendorShipped={ITEM.isVendorShipped}
        DropShipNotice={DropShipItemNotice}
        isExcluded={ITEM.isExcluded}
        RegionallyExclusiveNotice={RegionallyExclusiveItemNotice}
        pickupQuantity={ITEM.pickupQuantity}
        backOrderedQuantity={ITEM.backOrderedQuantity}
      />,
    );

    expect(screen.getByRole("header")).toHaveTextContent(ITEM.title);
    expect(screen.getByTestId("cart-item-sku")).toHaveTextContent(
      `Item # ${ITEM.sku}`,
    );
    expect(screen.getByText("Edit")).toBeOnTheScreen();
    expect(screen.getByTestId("cart-item-quantity-and-uom")).toHaveTextContent(
      `${ITEM.quantity} ${ITEM.uom}`,
    );
    expect(
      screen.getByText(`Pickup ${ITEM.pickupQuantity} items`),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(`Backordered ${ITEM.backOrderedQuantity} items`),
    ).toBeOnTheScreen();
  });
});
