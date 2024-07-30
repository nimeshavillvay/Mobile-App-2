enum AvailabilityStatus {
  LimitedStock = "limitedStock",
  InStock = "inStock",
  // Add other statuses as needed
}
enum OptionType {
  TakeOnHand = "takeOnHand",
  BackOrderAll = "backOrderAll",
  ShipAlternativeBranch = "shipAlternativeBranch",
  AvailableAll = "availableAll",
  // Add other types as needed
}
export type ShippingMethod = {
  code: string;
  name: string;
};

export type Warehouse = {
  warehouseId: number;
  warehouseName: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
  isSameDayAvailable: boolean;
};

export type AvailabilityOption = {
  backOrder: boolean;
  warehouses: Warehouse[];
  type: OptionType | string;
  hash: string;
};

export type WillCallLocation = {
  willCallWarehouse: string;
  willCallQuantity: number;
  status: AvailabilityStatus | string;
  index?: number;
  backOrder?: boolean;
  type?: string;
  backOrderDate?: string;
  backOrderQuantity?: number;
  hash: string;
  shippingMethod?: string;
  isTransfer?: boolean;
};

export type AvailableLocation = {
  location: string;
  name: string;
  amount: number;
};

export type ProductAvailability = {
  productId: number;
  status: AvailabilityStatus | string;
  availabilityOptions: AvailabilityOption[];
  willCallLocation?: WillCallLocation[] | WillCallLocation;
  defaultWarehouse: string;
  availableLocations: AvailableLocation[];
};
