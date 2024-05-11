import type { Plant, ShippingMethod } from "@/_lib/types";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
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
import dayjs from "dayjs";
import { useId, useState } from "react";
import type { Availability } from "../types";

const UI_DATE_FORMAT = "ddd, MMM. DD YYYY";

// Shipping options
const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";
const BACK_ORDER = "back-order";

// Ship to me options
const ALL_AVAILABLE = "all-available";
const TAKE_ON_HAND = "take-on-hand";
const ALTERNATIVE_BRANCHES = "alternative-branches";

const EXCLUDED_OPTIONS = ["CC", "WI", "1D", "2D", "DR"];

type CartItemShippingMethodProps = {
  shippingMethods: ShippingMethod[];
  plants: Plant[];
  availability: Availability;
  setSelectedWillCallPlant: (plant: string) => void;
  selectedWillCallPlant: string;
};

const CartItemShippingMethod = ({
  shippingMethods,
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
}: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `ship-to-me-${id}`;
  const willCallId = `will-call-${id}`;
  const backOrderId = `back-order-${id}`;

  const { options, status, willCallAnywhere } = availability;

  const [selectedShipToMe, setSelectedShipToMe] = useState(
    status === "inStock" ? ALL_AVAILABLE : TAKE_ON_HAND,
  );

  const availableOptions = shippingMethods.filter(
    (option) => !EXCLUDED_OPTIONS.includes(option.code),
  );

  const [selectedSection, setSelectedSection] = useState<string>();

  const handleSelectValueChange = (value: string) => {
    console.log(value);
  };

  const availableAll =
    options.find((option) => option.type === "availableAll") ?? undefined;
  const takeOnHand =
    options.find((option) => option.type === "takeOnHand") ?? undefined;
  const backOrderAll =
    options.find((option) => option.type === "backOrderAll") ?? undefined;
  const shipAlternativeBranch =
    options.find((option) => option.type === "shipAlternativeBranch") ??
    undefined;

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
    if (availableAll?.plants["1"]?.shippingMethods?.includes("DR")) {
      return true;
    }
    return false;
  };

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
            disabled={selectedSection !== SHIP_TO_ME}
            defaultValue={"UP"}
            onValueChange={handleSelectValueChange}
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

          <div className="text-sm">
            Get it by <b>today</b> if you order before noon
          </div>

          {selectedSection === SHIP_TO_ME && (
            <RadioGroup
              defaultValue={status === "inStock" ? ALL_AVAILABLE : TAKE_ON_HAND}
              onValueChange={(val) => setSelectedShipToMe(val)}
            >
              {/* All available option */}
              {availableAll && (
                <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                  <div className="w-4">
                    <RadioGroupItem value={ALL_AVAILABLE} id={ALL_AVAILABLE} />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="font-medium">
                      {availableAll.plants?.["1"]?.quantity && (
                        <ItemCountBadge
                          count={availableAll.plants?.["1"]?.quantity}
                        />
                      )}
                      &nbsp;from&nbsp;
                      {availableAll.plants?.["1"]?.plant
                        ? getPlantName(availableAll.plants?.["1"]?.plant)
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
                {/* TODO: Needs implement plants related to will call anywhere */}
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

const ItemCountBadge = ({ count = 0 }: { count: number }) => {
  return (
    <span className="rounded bg-green-700/10 px-1 font-medium text-green-700">
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
            plant: string;
            quantity?: number;
            backOrderQuantity?: number;
            backOrderDate?: string;
            shippingMethods: string[];
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
