import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import type { ComponentProps } from "react";
import CartItemShippingMethod from "./cart-item-shipping-method";

const RegionalExclusionAndShippingMethods = ({
  quantity,
  token,
  productId,
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  setSelectedShippingOption,
  selectedShippingOption,
  setSelectedShippingMethod,
  selectedShippingMethod,
  setSelectedWillCallTransfer,
  selectedWillCallTransfer,
  onSave,
  defaultShippingMethod,
  shippingMethods,
  isDirectlyShippedFromVendor,
  handleSelectWillCallPlant,
  willCallPlant,
  setSelectedBackorderShippingMethod,
  selectedBackorderShippingMethod,
}: ComponentProps<typeof CartItemShippingMethod> & {
  readonly token: string;
  readonly productId: number;
  readonly quantity: number;
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
      quantity={Number(quantity)}
      plants={plants}
      availability={availability}
      setSelectedWillCallPlant={setSelectedWillCallPlant}
      selectedWillCallPlant={selectedWillCallPlant}
      setSelectedShippingOption={setSelectedShippingOption}
      selectedShippingOption={selectedShippingOption}
      setSelectedWillCallTransfer={setSelectedWillCallTransfer}
      selectedWillCallTransfer={selectedWillCallTransfer}
      setSelectedShippingMethod={setSelectedShippingMethod}
      selectedShippingMethod={selectedShippingMethod}
      setSelectedBackorderShippingMethod={setSelectedBackorderShippingMethod}
      selectedBackorderShippingMethod={selectedBackorderShippingMethod}
      onSave={onSave}
      defaultShippingMethod={defaultShippingMethod}
      shippingMethods={shippingMethods}
      isDirectlyShippedFromVendor={isDirectlyShippedFromVendor}
      handleSelectWillCallPlant={handleSelectWillCallPlant}
      willCallPlant={willCallPlant}
      token={token}
    />
  );
};

export default RegionalExclusionAndShippingMethods;
