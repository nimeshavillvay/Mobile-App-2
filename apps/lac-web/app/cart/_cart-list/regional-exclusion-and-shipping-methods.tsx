import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import type { CartItemConfiguration, Plant } from "@/_lib/types";
import type { Dispatch, SetStateAction } from "react";
import type { Availability, ShippingMethod } from "../types";
import CartItemShippingMethod from "./cart-item-shipping-method";
import type { MainOption, ShipToMeOption } from "./types";

const RegionalExclusionAndShippingMethods = ({
  token,
  productId,
  plants,
  availability,
  handleSelectWillCallPlant,
  selectedWillCallPlant,
  setSelectedShippingOption,
  selectedShippingOption,
  setSelectedShipToMe,
  selectedShipToMe,
  setSelectedShippingMethod,
  selectedShippingMethod,
  handleSave,
  defaultShippingMethod,
  shippingMethods,
}: {
  readonly token: string;
  readonly productId: number;
  readonly plants: Plant[];
  readonly availability: Availability;
  readonly handleSelectWillCallPlant: (plant: string) => void;
  readonly selectedWillCallPlant: string;
  readonly setSelectedShippingOption: Dispatch<
    SetStateAction<MainOption | undefined>
  >;
  readonly selectedShippingOption: MainOption | undefined;
  readonly setSelectedShipToMe: (shipToMe: ShipToMeOption) => void;
  readonly selectedShipToMe: ShipToMeOption;
  readonly setSelectedShippingMethod: (method: string) => void;
  readonly selectedShippingMethod: string;
  readonly handleSave: (config: Partial<CartItemConfiguration>) => void;
  readonly defaultShippingMethod: ShippingMethod | undefined;
  readonly shippingMethods: ShippingMethod[];
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
      setSelectedWillCallPlant={handleSelectWillCallPlant}
      selectedWillCallPlant={selectedWillCallPlant}
      setSelectedShippingOption={setSelectedShippingOption}
      selectedShippingOption={selectedShippingOption}
      setSelectedShipToMe={setSelectedShipToMe}
      selectedShipToMe={selectedShipToMe}
      setSelectedShippingMethod={setSelectedShippingMethod}
      selectedShippingMethod={selectedShippingMethod}
      onSave={handleSave}
      defaultShippingMethod={defaultShippingMethod}
      shippingMethods={shippingMethods}
    />
  );
};

export default RegionalExclusionAndShippingMethods;
