import type { Plant, ShippingMethod } from "@/_lib/types";
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
import { useId, useState } from "react";
import type { Availability } from "../types";
import type { CartItemConfigurationOptional, OptionPlant } from "./types";

const UI_DATE_FORMAT = "ddd, MMM. DD YYYY";

// Shipping options
const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";
const BACK_ORDER = "back-order";

// Ship to me options
const ALL_AVAILABLE = "all-available";
const TAKE_ON_HAND = "take-on-hand";
const ALTERNATIVE_BRANCHES = "alternative-branches";

type CartItemShippingMethodProps = {
  shippingMethods: ShippingMethod[];
  plants: Plant[];
  availability: Availability;
  setSelectedWillCallPlant: (plant: string) => void;
  selectedWillCallPlant: string;
  onSave: (config: CartItemConfigurationOptional) => void;
};

const CartItemShippingMethod = ({
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  onSave,
}: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `ship-to-me-${id}`;
  const willCallId = `will-call-${id}`;
  const backOrderId = `back-order-${id}`;

  const { options, status, willCallAnywhere } = availability;

  const availableAll =
    options.find((option) => option.type === "availableAll") ?? undefined;
  const takeOnHand =
    options.find((option) => option.type === "takeOnHand") ?? undefined;
  const backOrderAll =
    options.find((option) => option.type === "backOrderAll") ?? undefined;
  const shipAlternativeBranch =
    options.find((option) => option.type === "shipAlternativeBranch") ??
    undefined;

  const [selectedShipToMe, setSelectedShipToMe] = useState(() => {
    if (availableAll) {
      return ALL_AVAILABLE;
    }

    if (takeOnHand) {
      return TAKE_ON_HAND;
    }

    if (shipAlternativeBranch) {
      return ALTERNATIVE_BRANCHES;
    }

    return undefined;
  });

  const [selectedSection, setSelectedSection] = useState<string>();

  let availableOptions: ShippingMethod[] = [];

  // Select the available shipping options based on the priority
  if (selectedShipToMe === ALL_AVAILABLE && availableAll) {
    availableOptions =
      Object.values(availableAll?.plants)?.at(0)?.shippingMethods ?? [];
  }

  if (selectedShipToMe === TAKE_ON_HAND && takeOnHand) {
    availableOptions =
      Object.values(takeOnHand?.plants)?.at(0)?.shippingMethods ?? [];
  }

  if (selectedShipToMe === ALTERNATIVE_BRANCHES && shipAlternativeBranch) {
    availableOptions =
      Object.values(shipAlternativeBranch?.plants)?.at(0)?.shippingMethods ??
      [];
  }

  // Find the default option (available first option)
  const defaultShippingOption = availableOptions?.at(0);

  // User selected shipping method
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    defaultShippingOption?.code ?? "",
  );

  const calculateAllPlantsQuantity = (plants: {
    [key: string]: {
      quantity?: number;
    };
  }) => {
    // Get all the values of the plants
    const plantValues = Object.values(plants);

    // Calculate the total quantity
    return plantValues.reduce((acc, plant) => acc + (plant.quantity ?? 0), 0);
  };

  const getPlantName = (plantCode: string) => {
    const foundPlant = plants.find((plant) => plant.code === plantCode);
    return foundPlant?.name ?? "Plant N/A";
  };

  const checkVendorShipped = () => {
    // Check if the vendor ships the item
    if (
      availableAll?.plants["1"]?.shippingMethods?.find(
        (method) => method.code === "D",
      )
    ) {
      return true;
    }
    return false;
  };

  const checkSameDayShippingEnabled = () => {
    // Check if same day shipping is enabled
    if (availableAll?.plants) {
      const isSameDayAvail = Object.values(availableAll?.plants)?.find(
        (value) => value?.isSameDayAvail,
      );

      return isSameDayAvail?.isSameDayAvail ?? false;
    }
    return false;
  };

  // Available all logics
  let availableAllPlant: OptionPlant | undefined = undefined;

  if (availableAll) {
    // Find available plant details within plants object
    availableAllPlant = Object.values(availableAll?.plants)?.at(0) ?? undefined;
  }

  // Back Order all logics
  const getBackOrderAllDate = (plants: {
    [key: string]: {
      backOrderDate?: string;
    };
  }) => {
    const backOrderDates = ["1", "5"]
      .map((key) => plants?.[key]?.backOrderDate)
      .filter(Boolean);

    return backOrderDates.length > 0 ? backOrderDates[0] : "";
  };

  const getBackOrderAllPlant = (plants: {
    [key: string]: {
      plant: string;
    };
  }) => {
    const backOrderPlants = ["1", "5"]
      .map((key) => plants?.[key]?.plant)
      .filter(Boolean);

    return backOrderPlants.length > 0 ? backOrderPlants[0] : "";
  };

  const getBackOrderAllMethod = (plants: {
    [key: string]: {
      shippingMethods: ShippingMethod[];
    };
  }) => {
    const backOrderMethods = ["1", "5"]
      .map((key) => plants?.[key]?.shippingMethods)
      .filter(Boolean)
      .flat();

    const firstMethod = backOrderMethods.find((method) => method);

    return firstMethod?.code ?? "";
  };

  return (
    <ul className="flex flex-col gap-3">
      {checkVendorShipped() && (
        <li className="text-sm text-wurth-gray-500">
          This item is shipped by the vender
        </li>
      )}

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={shipToMeId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === SHIP_TO_ME}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(SHIP_TO_ME);
              } else {
                setSelectedSection(undefined);
              }
            }}
            disabled={status !== "inStock" && status !== "limitedStock"}
          />

          <Label htmlFor={shipToMeId} className="text-base">
            Ship to me
          </Label>
        </div>

        <div className="ml-[1.625rem] flex flex-col gap-2">
          <Select
            disabled={
              selectedSection !== SHIP_TO_ME || availableOptions?.length === 0
            }
            value={selectedShippingMethod}
            onValueChange={(val) => setSelectedShippingMethod(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a delivery method" />
            </SelectTrigger>

            <SelectContent>
              {availableOptions?.length > 0 &&
                availableOptions.map((option) => (
                  <SelectItem key={option.code} value={option.code}>
                    {option.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {checkSameDayShippingEnabled() && (
            <div className="text-sm">
              Get it by <b>today</b> if you order before noon
            </div>
          )}

          {selectedSection === SHIP_TO_ME && (
            <RadioGroup
              value={selectedShipToMe}
              onValueChange={(val) => {
                setSelectedShipToMe(val);
                // Reset the selected shipping method to default
                setSelectedShippingMethod(defaultShippingOption?.code ?? "");
              }}
            >
              {/* All available option */}
              {availableAll && (
                <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                  <div className="w-4">
                    <RadioGroupItem value={ALL_AVAILABLE} id={ALL_AVAILABLE} />
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
                      {takeOnHand.plants?.["1"]?.quantity && (
                        <ItemCountBadge
                          count={takeOnHand.plants?.["1"]?.quantity}
                        />
                      )}
                      &nbsp;from&nbsp;
                      {takeOnHand.plants?.["1"]?.plant
                        ? getPlantName(takeOnHand.plants?.["1"]?.plant)
                        : "Plant N/A"}
                    </div>

                    {takeOnHand.backOrder && (
                      <BackOrderItemCountLabel
                        count={takeOnHand.plants?.["1"]?.backOrderQuantity ?? 0}
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
                                        {availableOptions?.find(
                                          (option) =>
                                            option.code ===
                                            selectedShippingMethod,
                                        )?.name ?? defaultShippingOption?.name}
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

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={willCallId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === WILL_CALL}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(WILL_CALL);
              } else {
                setSelectedSection(undefined);
              }
            }}
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
              onValueChange={(val) => setSelectedWillCallPlant(val)}
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
                {willCallAnywhere.status === "inStock" && (
                  <div className="flex items-center text-sm">
                    <ItemCountBadge count={willCallAnywhere.willCallQuantity} />
                    &nbsp;<span className="font-medium">pick up at</span>
                    &nbsp;
                    {getPlantName(willCallAnywhere.willCallPlant)}
                  </div>
                )}

                {willCallAnywhere.status === "limitedStock" && (
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

                {willCallAnywhere.status === "notInStock" && (
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

            {willCallAnywhere?.status === "notInStock" && (
              <BackOrderInfoBanner
                date={willCallAnywhere?.willCallBackOrder ?? ""}
              />
            )}
          </div>
        )}
      </li>

      {backOrderAll && (
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={backOrderId}
              className="size-5 rounded-full"
              iconClassName="size-4"
              checked={selectedSection === BACK_ORDER}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setSelectedSection(BACK_ORDER);
                  onSave({
                    plant_1: getBackOrderAllPlant(backOrderAll?.plants),
                    plant_2: "",
                    plant_3: "",
                    plant_4: "",
                    plant_5: "",
                    shipping_method_1: getBackOrderAllMethod(
                      backOrderAll?.plants,
                    ),
                    shipping_method_2: "",
                    shipping_method_3: "",
                    shipping_method_4: "",
                    shipping_method_5: "",
                    backorder_all: "T",
                  });
                } else {
                  setSelectedSection(undefined);
                }
              }}
              disabled={!backOrderAll}
            />

            <Label htmlFor={backOrderId} className="text-base">
              Backorder everything
            </Label>
          </div>

          {selectedSection === BACK_ORDER && (
            <div className="ml-[1.625rem]">
              <BackOrderInfoBanner
                date={getBackOrderAllDate(backOrderAll?.plants) ?? ""}
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
          [key: string]: {
            backOrderDate?: string;
          };
        };
      }
    | undefined;
}) => {
  if (option?.backOrder) {
    return (
      <BackOrderInfoBanner date={option?.plants["1"]?.backOrderDate ?? ""} />
    );
  }

  return null;
};
