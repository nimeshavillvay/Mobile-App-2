import {
  DEFAULT_PLANT,
  IN_STOCK,
  LIMITED_STOCK,
  NOT_AVAILABLE,
  NOT_IN_STOCK,
  UI_DATE_FORMAT,
} from "@/_lib/constants";
import type {
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
import { useId } from "react";
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACK_ORDER_ALL,
  DEFAULT_SHIPPING_METHOD,
  EMPTY_STRING,
  FALSE_STRING,
  MAIN_OPTIONS,
  TAKE_ON_HAND,
  TRUE_STRING,
} from "../constants";
import type { Availability, WillCallAnywhere } from "../types";
import NotAvailableInfoBanner from "./cart-item-not-available-banner";
import CartItemWillCallTransfer from "./cart-item-will-call-transfer";
import {
  createCartItemConfig,
  findAvailabilityOptionForType,
  getAlternativeBranchesConfig,
} from "./helpers";
import PlantName from "./plant-name";
import type {
  MainOption,
  OptionPlant,
  ShipToMeOption,
  WillCallOption,
} from "./types";

// Vendor Direct Shipping Method

type CartItemShippingMethodProps = {
  readonly plants: Plant[];
  readonly availability: Availability;
  readonly setSelectedWillCallPlant: (plant: string) => void;
  readonly selectedWillCallPlant: string;
  readonly setSelectedShippingOption: (option: MainOption | undefined) => void;
  readonly selectedShippingOption: MainOption | undefined;
  readonly setSelectedShipToMe: (shipToMe: ShipToMeOption) => void;
  readonly selectedShipToMe: ShipToMeOption;
  readonly setSelectedShippingMethod: (method: string) => void;
  readonly selectedShippingMethod: string;
  readonly onSave: (config: Partial<CartItemConfiguration>) => void;
  readonly defaultShippingMethod: ShippingMethod | undefined;
  readonly shippingMethods: ShippingMethod[];
  readonly setSelectedWillCallTransfer: (option: WillCallOption) => void;
  readonly selectedWillCallTransfer: WillCallOption;
  readonly isDirectlyShippedFromVendor: boolean;
  readonly handleSelectWillCallPlant: (plant: string) => void;
  readonly willCallPlant: { plantCode: string; plantName: string };
  readonly setSelectedBackorderShippingMethod: (method: string) => void;
  readonly selectedBackorderShippingMethod: string;
};

const CartItemShippingMethod = ({
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  setSelectedShippingOption,
  selectedShippingOption,
  setSelectedShipToMe,
  setSelectedWillCallTransfer,
  selectedWillCallTransfer,
  selectedShipToMe,
  setSelectedShippingMethod,
  selectedShippingMethod,
  onSave,
  defaultShippingMethod,
  shippingMethods,
  isDirectlyShippedFromVendor,
  handleSelectWillCallPlant,
  willCallPlant,
  setSelectedBackorderShippingMethod,
  selectedBackorderShippingMethod,
}: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${MAIN_OPTIONS.SHIP_TO_ME}-${id}`;
  const willCallId = `${MAIN_OPTIONS.WILL_CALL}-${id}`;
  const backOrderId = `${MAIN_OPTIONS.BACK_ORDER}-${id}`;

  const {
    options: availabilityOptions,
    status,
    willCallAnywhere,
  } = availability;

  const availableAll = findAvailabilityOptionForType(
    availabilityOptions,
    AVAILABLE_ALL,
  );
  const takeOnHand = findAvailabilityOptionForType(
    availabilityOptions,
    TAKE_ON_HAND,
  );
  const backOrderAll = findAvailabilityOptionForType(
    availabilityOptions,
    BACK_ORDER_ALL,
  );
  const shipAlternativeBranch = findAvailabilityOptionForType(
    availabilityOptions,
    ALTERNATIVE_BRANCHES,
  );

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

  const isVendorShipped = isDirectlyShippedFromVendor === true ?? false;

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

  const handleDeliveryOptionSelect = ({
    checked,
    selectedOption,
  }: {
    checked: boolean;
    selectedOption: MainOption;
  }) => {
    if (checked) {
      const isWillCallOptionSelected =
        selectedOption === MAIN_OPTIONS.WILL_CALL;
      const isWillCallAnywhere =
        willCallAnywhere !== undefined && willCallAnywhere !== null;
      // Ship to me configs
      if (selectedOption === MAIN_OPTIONS.SHIP_TO_ME) {
        if (availableAll) {
          const setShippingMethod =
            availableAllPlant?.shippingMethods?.find(
              (method) => method.code === selectedShippingMethod,
            )?.code ??
            availableAllPlant?.shippingMethods?.at(0)?.code ??
            selectedShippingMethod;
          setSelectedShippingMethod(setShippingMethod);
          onSave({
            ...createCartItemConfig({
              method: setShippingMethod,
              quantity: availableAllPlant?.quantity ?? 0,
              plant: availableAllPlant?.plant ?? EMPTY_STRING,
              hash: availableAll.hash,
              backOrderAll: false,
            }),
            will_call_avail: EMPTY_STRING,
            will_call_shipping: EMPTY_STRING,
            will_call_plant: EMPTY_STRING,
            will_call_not_in_stock: FALSE_STRING,
          });
        } else if (takeOnHand) {
          const setShippingMethod =
            takeOnHandPlant?.shippingMethods?.find(
              (method) => method.code === selectedShippingMethod,
            )?.code ??
            takeOnHandPlant?.shippingMethods?.at(0)?.code ??
            selectedShippingMethod;
          setSelectedShippingMethod(setShippingMethod);
          onSave({
            ...createCartItemConfig({
              method: setShippingMethod,
              quantity: takeOnHandPlant?.quantity ?? 0,
              plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
              hash: takeOnHand.hash,
              backOrderDate: takeOnHandPlant?.backOrderDate,
              backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
            }),
            will_call_avail: EMPTY_STRING,
            will_call_shipping: EMPTY_STRING,
            will_call_plant: EMPTY_STRING,
            will_call_not_in_stock: FALSE_STRING,
          });
        } else if (shipAlternativeBranch) {
          const setShippingMethod =
            shipAlternativeBranch.plants
              ?.at(0)
              ?.shippingMethods?.find(
                (method) => method.code === selectedShippingMethod,
              )?.code ??
            shipAlternativeBranch.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            selectedShippingMethod;
          setSelectedShippingMethod(setShippingMethod);
          onSave({
            ...getAlternativeBranchesConfig({
              plants: shipAlternativeBranch.plants,
              method: setShippingMethod,
              hash: shipAlternativeBranch.hash,
              backOrderDate: shipAlternativeBranch.backOrder
                ? shipAlternativeBranch?.plants?.[0]?.backOrderDate
                : "",
              backOrderQuantity: shipAlternativeBranch.backOrder
                ? shipAlternativeBranch?.plants?.[0]?.backOrderQuantity
                : 0,
              homePlant: willCallPlant.plantCode ?? DEFAULT_PLANT.code,
            }),
            will_call_not_in_stock: FALSE_STRING,
          });
        }
      }
      if (
        isWillCallOptionSelected &&
        isWillCallAnywhere &&
        willCallAnywhere[0]
      ) {
        setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL);
        processWillCallAnywhereItem(willCallAnywhere[0]);
      }
      // Back order all can have only this config
      if (selectedOption === MAIN_OPTIONS.BACK_ORDER && backOrderAll) {
        const setShippingMethod =
          backOrderAll.plants
            ?.at(0)
            ?.shippingMethods?.find(
              (method) => method.code === selectedBackorderShippingMethod,
            )?.code ??
          backOrderAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
          selectedBackorderShippingMethod;
        setSelectedBackorderShippingMethod(setShippingMethod);
        onSave({
          ...createCartItemConfig({
            method: setShippingMethod,
            quantity: 0,
            plant: getFirstPlantFromPlants(backOrderAll?.plants),
            hash: backOrderAll.hash,
            backOrderAll: true,
            backOrderDate: backOrderAll.plants[0]?.backOrderDate ?? "",
            backOrderQuantity: backOrderAll.plants[0]?.backOrderQuantity ?? 0,
          }),
          will_call_avail: EMPTY_STRING,
          will_call_shipping: EMPTY_STRING,
          will_call_plant: EMPTY_STRING,
          will_call_not_in_stock: FALSE_STRING,
        });
      }
    } else {
      setSelectedShippingOption(undefined);
    }
  };

  const processWillCallAnywhereItem = (item: WillCallAnywhere) => {
    const isNotInStock = item && item.status === NOT_IN_STOCK;
    if (item && !isNotInStock) {
      onSave({
        ...createCartItemConfig({
          method: DEFAULT_SHIPPING_METHOD,
          quantity: item?.willCallQuantity,
          plant: item?.willCallPlant,
          hash: item.hash,
          backOrderDate: item?.backOrderDate_1,
          backOrderQuantity: item?.backOrderQuantity_1,
          shippingMethod: item.shippingMethod,
        }),
        will_call_avail: (item?.status === NOT_IN_STOCK
          ? 0
          : item?.willCallQuantity ?? 0
        ).toString(),
        will_call_plant: item?.willCallPlant ?? EMPTY_STRING,
        will_call_not_in_stock:
          item?.status === NOT_AVAILABLE ? TRUE_STRING : FALSE_STRING,
      });
    }
    // Will call pickup configs and all are backorder
    if (item && isNotInStock) {
      onSave({
        ...createCartItemConfig({
          method: DEFAULT_SHIPPING_METHOD,
          quantity: 0,
          plant: item.willCallPlant,
          hash: item.hash,
          backOrderAll: true,
          backOrderDate: item?.willCallBackOrder,
          backOrderQuantity: item?.willCallQuantity,
          shippingMethod: item.shippingMethod,
        }),
        will_call_plant: item?.willCallPlant ?? EMPTY_STRING,
        will_call_not_in_stock:
          item?.status === NOT_AVAILABLE ? TRUE_STRING : FALSE_STRING,
      });
    }
  };

  const handleWillCallOptions = (willCallOption: string) => {
    if (
      willCallOption === MAIN_OPTIONS.WILL_CALL &&
      willCallAnywhere &&
      willCallAnywhere[0]
    ) {
      setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
      setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL);
      processWillCallAnywhereItem(willCallAnywhere[0]);
    }
    if (
      willCallOption === MAIN_OPTIONS.WILL_CALL_TRANSFER &&
      willCallAnywhere &&
      willCallAnywhere[1]
    ) {
      setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
      setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL_TRANSFER);
      processWillCallAnywhereItem(willCallAnywhere[1]);
    }
  };

  const handleShipToMeMethod = (shippingMethod: string) => {
    setSelectedShippingMethod(shippingMethod);

    if (shippingMethod) {
      switch (selectedShipToMe) {
        case AVAILABLE_ALL:
          onSave(
            createCartItemConfig({
              method: shippingMethod,
              quantity: availableAllPlant?.quantity ?? 0,
              plant: availableAllPlant?.plant ?? EMPTY_STRING,
              hash: availableAll?.hash ?? "",
              backOrderAll: false,
            }),
          );
          break;
        case TAKE_ON_HAND:
          onSave(
            createCartItemConfig({
              method: shippingMethod,
              quantity: takeOnHandPlant?.quantity ?? 0,
              plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
              hash: takeOnHand?.hash ?? "",
              backOrderDate: takeOnHandPlant?.backOrderDate,
              backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
            }),
          );
          break;
        case ALTERNATIVE_BRANCHES:
          if (shipAlternativeBranch) {
            onSave(
              getAlternativeBranchesConfig({
                plants: shipAlternativeBranch.plants,
                method: shippingMethod,
                hash: shipAlternativeBranch.hash,
                backOrderDate: shipAlternativeBranch.backOrder
                  ? shipAlternativeBranch?.plants?.[0]?.backOrderDate
                  : "",
                backOrderQuantity: shipAlternativeBranch.backOrder
                  ? shipAlternativeBranch?.plants?.[0]?.backOrderQuantity
                  : 0,
                homePlant: willCallPlant.plantCode ?? DEFAULT_PLANT.code,
              }),
            );
          }
          break;
      }
    }
  };

  const handleBackorderMethod = (shippingMethod: string) => {
    setSelectedShippingMethod(shippingMethod);

    if (shippingMethod) {
      switch (selectedShippingOption) {
        case MAIN_OPTIONS.BACK_ORDER:
          if (backOrderAll) {
            onSave({
              ...createCartItemConfig({
                method: shippingMethod,
                quantity: 0,
                plant: getFirstPlantFromPlants(backOrderAll?.plants),
                hash: backOrderAll.hash,
                backOrderAll: true,
                backOrderDate: backOrderAll.plants[0]?.backOrderDate ?? "",
                backOrderQuantity:
                  backOrderAll.plants[0]?.backOrderQuantity ?? 0,
              }),
              will_call_avail: EMPTY_STRING,
              will_call_shipping: EMPTY_STRING,
              will_call_plant: EMPTY_STRING,
            });
          }
      }
    }
  };

  const handleShipToMeOptions = (shipToMe: ShipToMeOption) => {
    setSelectedShipToMe(shipToMe);
    // Reset the selected shipping method to default
    if (defaultShippingMethod) {
      setSelectedShippingMethod(defaultShippingMethod.code);

      if (shipToMe === TAKE_ON_HAND && takeOnHand) {
        const setShippingMethod =
          takeOnHandPlant?.shippingMethods?.find(
            (method) => method.code === selectedShippingMethod,
          )?.code ??
          takeOnHandPlant?.shippingMethods?.[0]?.code ??
          selectedShippingMethod;
        setSelectedShippingMethod(setShippingMethod);
        onSave({
          ...createCartItemConfig({
            method: setShippingMethod,
            quantity: takeOnHandPlant?.quantity ?? 0,
            plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
            hash: takeOnHand.hash,
            backOrderDate: takeOnHandPlant?.backOrderDate,
            backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
          }),
          will_call_not_in_stock: FALSE_STRING,
        });
      }

      if (shipToMe === ALTERNATIVE_BRANCHES && shipAlternativeBranch) {
        onSave({
          ...getAlternativeBranchesConfig({
            plants: shipAlternativeBranch?.plants,
            method: defaultShippingMethod.code,
            hash: shipAlternativeBranch.hash,
            backOrderDate: shipAlternativeBranch.backOrder
              ? shipAlternativeBranch?.plants?.[0]?.backOrderDate
              : "",
            backOrderQuantity: shipAlternativeBranch.backOrder
              ? shipAlternativeBranch?.plants?.[0]?.backOrderQuantity
              : 0,
            homePlant: willCallPlant.plantCode ?? DEFAULT_PLANT.code,
          }),
          will_call_not_in_stock: FALSE_STRING,
        });
      }
    }
  };

  return (
    <ul className="flex flex-col gap-3">
      {isVendorShipped && (
        <li className="text-sm text-wurth-gray-500">
          This item is shipped by the vendor
        </li>
      )}

      {isShipToMeEnabled && (
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={shipToMeId}
              className="size-5 rounded-full"
              iconClassName="size-4"
              checked={selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME}
              onCheckedChange={(checked) =>
                handleDeliveryOptionSelect({
                  checked: checked === true,
                  selectedOption: MAIN_OPTIONS.SHIP_TO_ME,
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
                  selectedShippingOption !== MAIN_OPTIONS.SHIP_TO_ME ||
                  shippingMethods?.length <= 1
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

            {selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME && (
              <RadioGroup
                value={selectedShipToMe}
                onValueChange={(value) =>
                  handleShipToMeOptions(value as ShipToMeOption)
                }
              >
                {/* All available option */}
                {availableAll && (
                  <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                    <div className="w-4">
                      <RadioGroupItem
                        value={AVAILABLE_ALL}
                        id={AVAILABLE_ALL}
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="font-medium">
                        {availableAllPlant?.quantity && (
                          <ItemCountBadge count={availableAllPlant.quantity} />
                        )}
                        &nbsp;from&nbsp;
                        <PlantName
                          plants={plants}
                          plantCode={availableAllPlant?.plant}
                        />
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
                        <PlantName
                          plants={plants}
                          plantCode={takeOnHandPlant?.plant}
                        />
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
                        {shipAlternativeBranch.plants?.length > 0 && (
                          <ItemCountBadge
                            count={calculateAllPlantsQuantity(
                              shipAlternativeBranch.plants,
                            )}
                          />
                        )}
                        &nbsp;from&nbsp;
                        <PlantName
                          plants={plants}
                          plantCode={shipAlternativeBranch.plants?.at(0)?.plant}
                        />
                        &nbsp;and&nbsp;
                        <span className="font-normal">
                          other alternative branches
                        </span>
                      </div>

                      {shipAlternativeBranch.backOrder && (
                        <BackOrderItemCountLabel
                          count={
                            shipAlternativeBranch.plants?.at(0)
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
                            className="group flex h-7 flex-row items-center justify-start"
                            asChild
                          >
                            <Button
                              type="button"
                              variant="subtle"
                              className="h-full gap-2 px-2"
                            >
                              <ChevronDown
                                width={16}
                                height={16}
                                className="transition duration-150 ease-out group-data-[state=open]:rotate-180"
                              />
                              <span className="text-balance text-left">
                                Show breakdown by branch
                              </span>
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
                                        <div>
                                          <PlantName
                                            plants={plants}
                                            plantCode={plant.plant}
                                          />
                                        </div>
                                        <div className="text-xs">
                                          via&nbsp;
                                          {plant.plant ===
                                          willCallPlant.plantCode
                                            ? shippingMethods?.find(
                                                (option) =>
                                                  option.code ===
                                                  selectedShippingMethod,
                                              )?.name ??
                                              defaultShippingMethod?.name
                                            : "Ground"}
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
            checked={selectedShippingOption === MAIN_OPTIONS.WILL_CALL}
            onCheckedChange={(checked) =>
              handleDeliveryOptionSelect({
                checked: checked === true,
                selectedOption: MAIN_OPTIONS.WILL_CALL,
              })
            }
            disabled={false}
          />

          <Label htmlFor={willCallId} className="text-base">
            Store pick up (Will call)
          </Label>
        </div>

        {selectedShippingOption === MAIN_OPTIONS.WILL_CALL && (
          <div className="ml-[1.625rem] flex flex-col gap-2">
            <Select
              disabled={selectedShippingOption !== MAIN_OPTIONS.WILL_CALL}
              value={selectedWillCallPlant}
              onValueChange={(plant) => {
                if (willCallAnywhere && willCallAnywhere[0]) {
                  handleSelectWillCallPlant(plant);
                }
                setSelectedWillCallPlant(plant);
                setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL);
                setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
              }}
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

            {willCallAnywhere && willCallAnywhere[0] && (
              <div className="flex flex-col gap-1">
                {willCallAnywhere[0].status === IN_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    {willCallAnywhere[0].status === IN_STOCK && (
                      <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                        <RadioGroupItem
                          value={MAIN_OPTIONS.WILL_CALL}
                          id={MAIN_OPTIONS.WILL_CALL}
                        />

                        <div className="flex flex-col gap-0.5">
                          <div className="text-wrap font-medium">
                            <ItemCountBadge
                              count={willCallAnywhere[0].willCallQuantity}
                            />
                            &nbsp;
                            <span className="font-medium">
                              pick up at &nbsp;
                              <PlantName
                                plants={plants}
                                plantCode={willCallAnywhere[0].willCallPlant}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === LIMITED_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                      <RadioGroupItem
                        value={MAIN_OPTIONS.WILL_CALL}
                        id={MAIN_OPTIONS.WILL_CALL}
                      />

                      <div className="flex flex-col gap-0.5">
                        <div className="text-wrap font-medium">
                          <ItemCountBadge
                            count={willCallAnywhere[0].willCallQuantity}
                          />
                          &nbsp;
                          <span className="font-medium">
                            pick up at &nbsp;
                            <PlantName
                              plants={plants}
                              plantCode={willCallAnywhere[0].willCallPlant}
                            />
                          </span>
                        </div>

                        {willCallAnywhere[0]?.backOrder && (
                          <BackOrderItemCountLabel
                            count={willCallAnywhere[0].backOrderQuantity_1 ?? 0}
                          />
                        )}
                      </div>
                    </div>
                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}{" "}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === NOT_IN_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                      <RadioGroupItem
                        value={MAIN_OPTIONS.WILL_CALL}
                        id={MAIN_OPTIONS.WILL_CALL}
                      />

                      <div className="flex flex-col gap-0.5">
                        <div className="rounded bg-red-800/10 px-2 py-1 text-sm text-red-800">
                          This item is out of stock at&nbsp;
                          <PlantName
                            plants={plants}
                            plantCode={willCallAnywhere[0].willCallPlant}
                          />
                        </div>

                        {willCallAnywhere[0]?.willCallQuantity && (
                          <BackOrderItemCountLabel
                            count={willCallAnywhere[0].willCallQuantity}
                          />
                        )}
                      </div>
                    </div>

                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[0]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.willCallBackOrder ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === NOT_AVAILABLE && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <NotAvailableInfoBanner
                      willCallType={MAIN_OPTIONS.WILL_CALL}
                      plants={plants}
                      willCallPlant={willCallAnywhere[0].willCallPlant ?? ""}
                    />
                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}
              </div>
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
              checked={selectedShippingOption === MAIN_OPTIONS.BACK_ORDER}
              onCheckedChange={(checked) =>
                handleDeliveryOptionSelect({
                  checked: checked === true,
                  selectedOption: MAIN_OPTIONS.BACK_ORDER,
                })
              }
              disabled={!backOrderAll}
            />

            <Label htmlFor={backOrderId} className="text-base">
              Backorder everything
            </Label>
          </div>
          <div className="ml-[1.625rem] flex flex-col gap-2">
            {backOrderAll?.plants[0]?.shippingMethods &&
              backOrderAll?.plants[0]?.shippingMethods.length > 0 && (
                <Select
                  disabled={
                    selectedShippingOption !== MAIN_OPTIONS.BACK_ORDER ||
                    backOrderAll.plants[0]?.shippingMethods?.length <= 1
                  }
                  value={selectedBackorderShippingMethod}
                  onValueChange={(method) => handleBackorderMethod(method)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a delivery method" />
                  </SelectTrigger>

                  <SelectContent>
                    {backOrderAll.plants[0]?.shippingMethods.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
          </div>
          {selectedShippingOption === MAIN_OPTIONS.BACK_ORDER && (
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
  readonly count: number;
  readonly className?: string;
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

const BackOrderItemCountLabel = ({ count }: { readonly count: number }) => {
  return (
    <div className="text-sm font-medium">
      <span className="rounded bg-yellow-700/10 px-1 text-yellow-700">
        Backorder
      </span>
      &nbsp;{count}&nbsp;{count > 1 ? "items" : "item"}
    </div>
  );
};

const BackOrderInfoBanner = ({ date }: { readonly date: string }) => {
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
  readonly option:
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
