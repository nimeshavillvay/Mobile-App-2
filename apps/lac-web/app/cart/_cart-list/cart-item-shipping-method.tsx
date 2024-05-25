import type {
  CartConfiguration,
  CartItemConfiguration,
  Plant,
  ShippingMethod,
} from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { ChevronDown } from "@repo/web-ui/components/icons/chevron-down";
import { Button } from "@repo/web-ui/components/ui/button";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import dayjs from "dayjs";
import { useEffect, useId, useMemo, useState } from "react";
import type { Availability, AvailabilityOption } from "../types";
import type { OptionPlant } from "./types";

const UI_DATE_FORMAT = "ddd, MMM. DD YYYY";

// Shipping options
const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";
const BACK_ORDER = "back-order";

// Ship to me options
const ALL_AVAILABLE = "all-available";
const TAKE_ON_HAND = "take-on-hand";
const ALTERNATIVE_BRANCHES = "alternative-branches";

// Vendor Direct Shipping Method
const VENDOR_DIRECT_CODE = "D";

// Cart config values
const EMPTY_STRING = "";
const TRUE_STRING = "T";
const FALSE_STRING = "F";

// Availability statuses
const IN_STOCK = "inStock";
const LIMITED_STOCK = "limitedStock";
const NOT_IN_STOCK = "notInStock";

type CartItemShippingMethodProps = {
  plants: Plant[];
  availability: Availability;
  setSelectedWillCallPlant: (plant: string) => void;
  selectedWillCallPlant: string;
  onSave: (config: Partial<CartItemConfiguration>) => void;
  cartConfiguration: CartConfiguration;
};

const createCartItemConfig = ({
  method,
  quantity,
  plant,
  backOrderAll = false,
}: {
  method: string;
  quantity: number;
  plant: string;
  backOrderAll?: boolean;
}) => ({
  avail_1: quantity ? quantity.toString() : EMPTY_STRING,
  avail_2: EMPTY_STRING,
  avail_3: EMPTY_STRING,
  avail_4: EMPTY_STRING,
  avail_5: EMPTY_STRING,
  plant_1: plant,
  plant_2: EMPTY_STRING,
  plant_3: EMPTY_STRING,
  plant_4: EMPTY_STRING,
  plant_5: EMPTY_STRING,
  shipping_method_1: method,
  shipping_method_2: EMPTY_STRING,
  shipping_method_3: EMPTY_STRING,
  shipping_method_4: EMPTY_STRING,
  shipping_method_5: EMPTY_STRING,
  backorder_all: backOrderAll ? TRUE_STRING : FALSE_STRING,
});

// [] First each change should be send a put to the cart config
// [] After each change do an availability check render shipping method and options
// [] Get the cart items and check the hashes on the config, if the hashes match set the props
// [] Else you set the default form the config or if not default provided then you set the firstItem
// [] Skeleton should be shown when the put is happening for the first time

const getShippingMethods = (
  selectedOption: string | undefined,
  availableOptions: { [key: string]: AvailabilityOption | undefined },
) => {
  if (!selectedOption) return [];

  const availableOption = availableOptions[selectedOption];
  if (availableOption) {
    return Object.values(availableOption?.plants)?.at(0)?.shippingMethods ?? [];
  }

  return [];
};

const CartItemShippingMethod = ({
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  onSave,
  cartConfiguration,
}: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${SHIP_TO_ME}-${id}`;
  const willCallId = `${WILL_CALL}-${id}`;
  const backOrderId = `${BACK_ORDER}-${id}`;

  const { options, status, willCallAnywhere } = availability;

  function findAvailabilityOptionForType(
    options: AvailabilityOption[],
    type: string,
  ) {
    return options.find((option) => option.type === type) ?? undefined;
  }

  const availableAll = findAvailabilityOptionForType(options, "availableAll");
  const takeOnHand = findAvailabilityOptionForType(options, "takeOnHand");
  const backOrderAll = findAvailabilityOptionForType(options, "backOrderAll");
  const shipAlternativeBranch = findAvailabilityOptionForType(
    options,
    "shipAlternativeBranch",
  );

  const [selectedShipToMe, setSelectedShipToMe] = useState(() => {
    // State initialization based on availability options
    if (availableAll) {
      return ALL_AVAILABLE;
    } else if (takeOnHand) {
      return TAKE_ON_HAND;
    } else if (shipAlternativeBranch) {
      return ALTERNATIVE_BRANCHES;
    }
    // Return a default value here if none of the conditions match
    return undefined;
  });

  const [selectedSection, setSelectedSection] = useState<string>();

  // Select the available shipping options based on the priority
  const AVAILABLE_OPTIONS_MAP = {
    [ALL_AVAILABLE]: availableAll,
    [TAKE_ON_HAND]: takeOnHand,
    [ALTERNATIVE_BRANCHES]: shipAlternativeBranch,
  };

  // use the new function to determine the available options
  const shippingMethods = getShippingMethods(
    selectedShipToMe,
    AVAILABLE_OPTIONS_MAP,
  );

  // Find the default option (available first option)
  const defaultShippingOption = shippingMethods?.at(0);

  // User selected shipping method
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(() => {
    // Check if there is default shipping method for users ship-to address
    if (cartConfiguration?.default_shipping) {
      const shipToDefaultMethod = shippingMethods?.find(
        (method) => method?.code === cartConfiguration.default_shipping,
      );
      if (shipToDefaultMethod) {
        return shipToDefaultMethod.code;
      }
    }
    return defaultShippingOption?.code ?? "";
  });

  const calculateAllPlantsQuantity = (
    plants: {
      quantity?: number;
    }[],
  ) => {
    // Get all the values of the plants
    const plantValues = Object.values(plants);

    // Calculate the total quantity
    return plantValues.reduce((acc, plant) => acc + (plant.quantity ?? 0), 0);
  };

  const getPlantName = (plantCode: string) => {
    const foundPlant = plants.find((plant) => plant.code === plantCode);
    return foundPlant?.name ?? "Plant N/A";
  };

  const isVendorShipped = !!availableAll?.plants
    ?.at(0)
    ?.shippingMethods?.find((method) => method.code === VENDOR_DIRECT_CODE);

  const isSameDayShippingEnabled =
    !!availableAll?.plants?.find((value) => value?.isSameDayAvail)
      ?.isSameDayAvail ?? false;

  // Ship to me logics
  const isShipToMeEnabled = status === IN_STOCK || status === LIMITED_STOCK;

  let availableAllPlant: OptionPlant | undefined = undefined;
  let takeOnHandPlant: OptionPlant | undefined = undefined;

  if (availableAll) {
    // Find available plant details within plants object
    availableAllPlant = Object.values(availableAll?.plants)?.at(0) ?? undefined;
  }

  if (takeOnHand) {
    // Find take on hand plant details within plants object
    takeOnHandPlant = Object.values(takeOnHand?.plants)?.at(0) ?? undefined;
  }

  // Back Order all logics
  const isBackOrderAllEnabled = !!backOrderAll;

  const getFirstBackOrderDateFromPlants = (
    plants: {
      backOrderDate?: string;
    }[],
  ) => {
    return plants?.at(0)?.backOrderDate;
  };

  const getFirstPlantFromPlants = (
    plants: {
      plant: string;
    }[],
  ) => {
    return plants?.at(0)?.plant ?? "";
  };

  const getFirstShippingCodeFromShippingMethod = (
    plants: {
      shippingMethods: ShippingMethod[];
    }[],
  ) => {
    const shippingMethods = plants?.at(0)?.shippingMethods ?? [];
    // Get the first method available
    return shippingMethods?.at(0)?.code ?? "";
  };

  const getAlternativeBranchesConfig = ({
    plants,
    method,
  }: {
    plants: {
      index: number;
      quantity?: number;
      plant: string;
    }[];
    method: string;
  }) => {
    let config: Partial<CartItemConfiguration> = {};

    const data = plants?.map((plant) => ({
      [`avail_${plant?.index}`]: (plant?.quantity ?? 0).toString(),
      [`plant_${plant?.index}`]: plant?.plant ?? "",
      [`shipping_method_${plant?.index}`]: method,
    }));

    config = Object.assign(config, ...data);

    return config;
  };

  const handleDeliveryOptionSelect = ({
    checked,
    selectedOption,
  }: {
    checked: boolean;
    selectedOption: typeof SHIP_TO_ME | typeof WILL_CALL | typeof BACK_ORDER;
  }) => {
    if (checked) {
      setSelectedSection(selectedOption);
      // Ship to me configs
      if (selectedOption === SHIP_TO_ME) {
        if (availableAll) {
          onSave(
            createCartItemConfig({
              method: selectedShippingMethod,
              quantity: availableAllPlant?.quantity ?? 0,
              plant: availableAllPlant?.plant ?? EMPTY_STRING,
            }),
          );
        } else if (takeOnHand) {
          onSave(
            createCartItemConfig({
              method: selectedShippingMethod,
              quantity: takeOnHandPlant?.quantity ?? 0,
              plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
            }),
          );
        } else if (shipAlternativeBranch) {
          onSave(
            getAlternativeBranchesConfig({
              plants: shipAlternativeBranch.plants,
              method: selectedShippingMethod,
            }),
          );
        }
      }
      // Will call pickup configs
      if (selectedOption === WILL_CALL && willCallAnywhere) {
        onSave({
          ...createCartItemConfig({
            method: EMPTY_STRING,
            quantity: 0,
            plant: EMPTY_STRING,
          }),
          will_call_avail: (willCallAnywhere?.status === NOT_IN_STOCK
            ? 0
            : willCallAnywhere?.willCallQuantity ?? 0
          ).toString(),
          will_call_plant: willCallAnywhere?.willCallPlant ?? EMPTY_STRING,
        });
      }
      // Back order all can have only this config
      if (selectedOption === BACK_ORDER && backOrderAll) {
        onSave(
          createCartItemConfig({
            method: getFirstShippingCodeFromShippingMethod(
              backOrderAll?.plants,
            ),
            quantity: 0,
            plant: getFirstPlantFromPlants(backOrderAll?.plants),
            backOrderAll: true,
          }),
        );
      }
    } else {
      setSelectedSection(undefined);
    }
  };

  const handleShipToMeMethod = (shippingMethod: string) => {
    setSelectedShippingMethod(shippingMethod);

    if (shippingMethod) {
      switch (selectedShipToMe) {
        case ALL_AVAILABLE:
          onSave(
            createCartItemConfig({
              method: shippingMethod,
              quantity: availableAllPlant?.quantity ?? 0,
              plant: availableAllPlant?.plant ?? EMPTY_STRING,
            }),
          );
          break;
        case TAKE_ON_HAND:
          onSave(
            createCartItemConfig({
              method: shippingMethod,
              quantity: takeOnHandPlant?.quantity ?? 0,
              plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
            }),
          );
          break;
        case ALTERNATIVE_BRANCHES:
          if (shipAlternativeBranch) {
            onSave(
              getAlternativeBranchesConfig({
                plants: shipAlternativeBranch.plants,
                method: shippingMethod,
              }),
            );
          }
          break;
      }
    }
  };

  const handleShipToMeOptions = (shipToMe: string) => {
    setSelectedShipToMe(shipToMe);
    // TODO - Check if there is ship-to default shipping
    // Reset the selected shipping method to default
    const defaultMethod = defaultShippingOption?.code;

    if (defaultMethod) {
      setSelectedShippingMethod(defaultMethod);

      if (shipToMe === TAKE_ON_HAND && takeOnHand) {
        onSave(
          createCartItemConfig({
            method: defaultMethod,
            quantity: takeOnHandPlant?.quantity ?? 0,
            plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
          }),
        );
      }

      if (shipToMe === ALTERNATIVE_BRANCHES && shipAlternativeBranch) {
        onSave(
          getAlternativeBranchesConfig({
            plants: shipAlternativeBranch?.plants,
            method: defaultMethod,
          }),
        );
      }
    }
  };

  // Compute selectedShipToMe value whenever options change
  useMemo(() => {
    if (availableAll) {
      setSelectedShipToMe(ALL_AVAILABLE);
    } else if (takeOnHand) {
      setSelectedShipToMe(TAKE_ON_HAND);
    } else if (shipAlternativeBranch) {
      setSelectedShipToMe(ALTERNATIVE_BRANCHES);
    }
  }, [availableAll, takeOnHand, shipAlternativeBranch]);

  useEffect(() => {
    // TODO - Will remove useEffect hook once found a better solution.
    // Keeping this for now to unblock QAs
    if (selectedSection === WILL_CALL && willCallAnywhere) {
      onSave({
        ...createCartItemConfig({
          method: EMPTY_STRING,
          quantity: 0,
          plant: EMPTY_STRING,
        }),
        will_call_avail: (willCallAnywhere?.status === NOT_IN_STOCK
          ? 0
          : willCallAnywhere?.willCallQuantity ?? 0
        ).toString(),
        will_call_plant: willCallAnywhere?.willCallPlant ?? EMPTY_STRING,
      });
    }
  }, [selectedSection, willCallAnywhere]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ul className="flex flex-col gap-3">
      {isVendorShipped && (
        <li className="text-sm text-wurth-gray-500">
          This item is shipped by the vender
        </li>
      )}

      {isShipToMeEnabled && (
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={shipToMeId}
              className="size-5 rounded-full"
              iconClassName="size-4"
              checked={selectedSection === SHIP_TO_ME}
              onCheckedChange={(checked) =>
                handleDeliveryOptionSelect({
                  checked: checked === true,
                  selectedOption: SHIP_TO_ME,
                })
              }
            />

            <Label htmlFor={shipToMeId} className="text-base">
              Ship to me
            </Label>
          </div>

          <div className="ml-[1.625rem] flex flex-col gap-2">
            {shippingMethods?.length > 0 && (
              <Select
                disabled={
                  selectedSection !== SHIP_TO_ME || shippingMethods?.length <= 1
                }
                value={selectedShippingMethod}
                onValueChange={(method) => handleShipToMeMethod(method)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a delivery method" />
                </SelectTrigger>

                <SelectContent>
                  {shippingMethods.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {isSameDayShippingEnabled && (
              <div className="text-sm">
                Get it by <b>today</b> if you order before noon
              </div>
            )}

            {selectedSection === SHIP_TO_ME && (
              <RadioGroup
                value={selectedShipToMe}
                onValueChange={(shipToMe) => handleShipToMeOptions(shipToMe)}
              >
                {/* All available option */}
                {availableAll && (
                  <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                    <div className="w-4">
                      <RadioGroupItem
                        value={ALL_AVAILABLE}
                        id={ALL_AVAILABLE}
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="font-medium">
                        {availableAllPlant?.quantity && (
                          <ItemCountBadge count={availableAllPlant.quantity} />
                        )}
                        &nbsp;from&nbsp;
                        {availableAllPlant?.plant
                          ? getPlantName(availableAllPlant.plant)
                          : "Plant N/A"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Take on hand option */}
                {takeOnHand && (
                  <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                    <div className="w-4">
                      <RadioGroupItem value={TAKE_ON_HAND} id={TAKE_ON_HAND} />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="font-medium">
                        {takeOnHandPlant?.quantity && (
                          <ItemCountBadge count={takeOnHandPlant.quantity} />
                        )}
                        &nbsp;from&nbsp;
                        {takeOnHandPlant?.plant
                          ? getPlantName(takeOnHandPlant?.plant)
                          : "Plant N/A"}
                      </div>

                      {takeOnHand.backOrder && (
                        <BackOrderItemCountLabel
                          count={takeOnHandPlant?.backOrderQuantity ?? 0}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Ship from alternative branches option */}
                {shipAlternativeBranch && (
                  <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                    <div className="w-4">
                      <RadioGroupItem
                        value={ALTERNATIVE_BRANCHES}
                        id={ALTERNATIVE_BRANCHES}
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="text-wrap font-medium">
                        {shipAlternativeBranch.plants?.["1"]?.quantity && (
                          <ItemCountBadge
                            count={calculateAllPlantsQuantity(
                              shipAlternativeBranch.plants,
                            )}
                          />
                        )}
                        &nbsp;from&nbsp;
                        {shipAlternativeBranch.plants?.["1"]?.plant
                          ? getPlantName(
                              shipAlternativeBranch.plants?.["1"]?.plant,
                            )
                          : "Plant N/A"}
                        &nbsp;and&nbsp;
                        <span className="font-normal">
                          other alternative branches
                        </span>
                      </div>

                      {shipAlternativeBranch.backOrder && (
                        <BackOrderItemCountLabel
                          count={
                            shipAlternativeBranch.plants?.["1"]
                              ?.backOrderQuantity ?? 0
                          }
                        />
                      )}

                      {selectedShipToMe === ALTERNATIVE_BRANCHES && (
                        <Collapsible
                          className="mt-1.5 flex flex-col gap-1"
                          disabled={selectedShipToMe !== ALTERNATIVE_BRANCHES}
                        >
                          <CollapsibleTrigger
                            className="group flex h-7 w-full flex-row items-center justify-start"
                            asChild
                          >
                            <Button
                              type="button"
                              variant="subtle"
                              className="gap-2 px-2"
                            >
                              <ChevronDown
                                width={16}
                                height={16}
                                className="transition duration-150 ease-out group-data-[state=open]:rotate-180"
                              />
                              <span>Show breakdown by branch</span>
                            </Button>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-light">
                                    Location
                                  </TableHead>
                                  <TableHead className="text-end font-light">
                                    Items
                                  </TableHead>
                                </TableRow>
                              </TableHeader>

                              <TableBody className="font-light">
                                {shipAlternativeBranch.plants &&
                                  Object.values(
                                    shipAlternativeBranch.plants,
                                  )?.map((plant) => (
                                    <TableRow key={plant.plant}>
                                      <TableCell>
                                        <div>{getPlantName(plant.plant)}</div>
                                        <div className="text-xs">
                                          via&nbsp;
                                          {shippingMethods?.find(
                                            (option) =>
                                              option.code ===
                                              selectedShippingMethod,
                                          )?.name ??
                                            defaultShippingOption?.name}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-end">
                                        {plant.quantity}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </div>
                )}

                {selectedShipToMe === TAKE_ON_HAND && (
                  <ShipToMeBOInfoBanner option={takeOnHand} />
                )}

                {selectedShipToMe === ALTERNATIVE_BRANCHES && (
                  <ShipToMeBOInfoBanner option={shipAlternativeBranch} />
                )}
              </RadioGroup>
            )}
          </div>
        </li>
      )}

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={willCallId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === WILL_CALL}
            onCheckedChange={(checked) =>
              handleDeliveryOptionSelect({
                checked: checked === true,
                selectedOption: WILL_CALL,
              })
            }
            disabled={false}
          />

          <Label htmlFor={willCallId} className="text-base">
            Store pick up (Will call)
          </Label>
        </div>

        {selectedSection === WILL_CALL && (
          <div className="ml-[1.625rem] flex flex-col gap-2">
            <Select
              disabled={selectedSection !== WILL_CALL}
              value={selectedWillCallPlant}
              onValueChange={(plant) => setSelectedWillCallPlant(plant)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>

              <SelectContent>
                {plants?.length > 0 &&
                  plants.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {willCallAnywhere && (
              <div className="flex flex-col gap-1">
                {willCallAnywhere.status === IN_STOCK && (
                  <div className="flex items-center text-sm">
                    <ItemCountBadge count={willCallAnywhere.willCallQuantity} />
                    &nbsp;<span className="font-medium">pick up at</span>
                    &nbsp;
                    {getPlantName(willCallAnywhere.willCallPlant)}
                  </div>
                )}

                {willCallAnywhere.status === LIMITED_STOCK && (
                  <>
                    <div className="flex items-center text-sm">
                      <ItemCountBadge
                        count={willCallAnywhere.willCallQuantity}
                      />
                      &nbsp;<span className="font-medium">pick up at</span>
                      &nbsp;
                      {getPlantName(willCallAnywhere.willCallPlant)}
                    </div>

                    {willCallAnywhere.backOrderQuantity_1 &&
                      willCallAnywhere.backOrderQuantity_1 > 0 && (
                        <div className="flex items-center text-sm">
                          <ItemCountBadge
                            count={willCallAnywhere.backOrderQuantity_1}
                            className="bg-red-600/10 text-red-600"
                          />
                          &nbsp;<span className="font-medium">pick up at</span>
                          &nbsp;
                          {willCallAnywhere.plant_1
                            ? getPlantName(willCallAnywhere.plant_1)
                            : "Plant N/A"}
                        </div>
                      )}

                    {willCallAnywhere?.backOrder && (
                      <BackOrderItemCountLabel
                        count={willCallAnywhere.backOrderQuantity_1 ?? 0}
                      />
                    )}
                  </>
                )}

                {willCallAnywhere.status === NOT_IN_STOCK && (
                  <>
                    <div className="rounded bg-red-800/10 px-2 py-1 text-sm text-red-800">
                      This item is out of stock at&nbsp;
                      {getPlantName(willCallAnywhere.willCallPlant)}
                    </div>

                    <BackOrderItemCountLabel
                      count={willCallAnywhere.willCallQuantity}
                    />
                  </>
                )}
              </div>
            )}

            {willCallAnywhere?.backOrder && (
              <BackOrderInfoBanner
                date={willCallAnywhere?.backOrderDate_1 ?? ""}
              />
            )}

            {willCallAnywhere?.status === NOT_IN_STOCK && (
              <BackOrderInfoBanner
                date={willCallAnywhere?.willCallBackOrder ?? ""}
              />
            )}
          </div>
        )}
      </li>

      {isBackOrderAllEnabled && (
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={backOrderId}
              className="size-5 rounded-full"
              iconClassName="size-4"
              checked={selectedSection === BACK_ORDER}
              onCheckedChange={(checked) =>
                handleDeliveryOptionSelect({
                  checked: checked === true,
                  selectedOption: BACK_ORDER,
                })
              }
              disabled={!backOrderAll}
            />

            <Label htmlFor={backOrderId} className="text-base">
              Backorder everything
            </Label>
          </div>

          {selectedSection === BACK_ORDER && (
            <div className="ml-[1.625rem]">
              <BackOrderInfoBanner
                date={
                  getFirstBackOrderDateFromPlants(backOrderAll?.plants) ?? "N/A"
                }
              />
            </div>
          )}
        </li>
      )}
    </ul>
  );
};

export default CartItemShippingMethod;

const ItemCountBadge = ({
  count = 0,
  className,
}: {
  count: number;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "rounded bg-green-700/10 px-1 font-medium text-green-700",
        className,
      )}
    >
      {count}&nbsp;{count > 1 ? "items" : "item"}
    </span>
  );
};

const BackOrderItemCountLabel = ({ count }: { count: number }) => {
  return (
    <div className="text-sm font-medium">
      <span className="rounded bg-yellow-700/10 px-1 text-yellow-700">
        Backorder
      </span>
      &nbsp;{count}&nbsp;{count > 1 ? "items" : "item"}
    </div>
  );
};

const BackOrderInfoBanner = ({ date }: { date: string }) => {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-yellow-50 px-4 py-2 text-sm">
      <div>
        Backordered items are expected to ship by&nbsp;
        {date !== "" ? dayjs(date).format(UI_DATE_FORMAT) : "N/A"}.
      </div>
      <div className="text-xs text-wurth-gray-500">
        Delivery dates are subject to change without notice.
      </div>
    </div>
  );
};

const ShipToMeBOInfoBanner = ({
  option,
}: {
  option:
    | {
        backOrder: boolean;
        plants: {
          backOrderDate?: string;
        }[];
      }
    | undefined;
}) => {
  if (option?.backOrder) {
    return (
      <BackOrderInfoBanner date={option?.plants?.at(0)?.backOrderDate ?? ""} />
    );
  }

  return null;
};
