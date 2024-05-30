import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import type { CartItemShippingMethodProps } from "./cart-item-shipping-method";
import CartItemShippingMethod from "./cart-item-shipping-method";

const RegionalExclusionAndShippingMethods = ({
  token,
  productId,
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  setSelectedShippingOption,
  selectedShippingOption,
  setSelectedShipToMe,
  selectedShipToMe,
  setSelectedShippingMethod,
  selectedShippingMethod,
  onSave,
  defaultShippingMethod,
  shippingMethods,
}: CartItemShippingMethodProps & {
  readonly token: string;
  readonly productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (productExcludedQuery.data.isExcluded) {
    return (
      <Warning
        title="This items cannot be shipped to your current address"
        description="Please update your shipping address at checkout or consider removing this item."
      />
    );
  }

  return (
    <CartItemShippingMethod
      plants={plants}
      availability={availability}
      setSelectedWillCallPlant={setSelectedWillCallPlant}
      selectedWillCallPlant={selectedWillCallPlant}
      setSelectedShippingOption={setSelectedShippingOption}
      selectedShippingOption={selectedShippingOption}
      setSelectedShipToMe={setSelectedShipToMe}
      selectedShipToMe={selectedShipToMe}
      setSelectedShippingMethod={setSelectedShippingMethod}
      selectedShippingMethod={selectedShippingMethod}
      onSave={onSave}
      defaultShippingMethod={defaultShippingMethod}
      shippingMethods={shippingMethods}
    />
  );
};

export default RegionalExclusionAndShippingMethods;
