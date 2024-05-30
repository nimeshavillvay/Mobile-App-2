"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Plant } from "@/_lib/types";
import { Map } from "@repo/web-ui/components/icons/map";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { Shop } from "@repo/web-ui/components/icons/shop";
import { Timetable } from "@repo/web-ui/components/icons/timetable";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/web-ui/components/ui/drawer";
import useSuspenseWillCallPlant from "./use-suspense-will-call-plant.hook";

const DEFAULT_PLANT = "Brea, CA";

type WillCallPlantProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const WillCallPlantDrawer = ({ token, plants }: WillCallPlantProps) => {
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const { plantName, address, operationHours } = willCallPlantQuery.data;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-fit flex-row items-center gap-2 p-0 text-black"
        >
          <Shop width={16} height={16} />

          <span>{plantName ?? DEFAULT_PLANT}</span>
        </Button>
      </DrawerTrigger>

      {/* Don't show the drawer if no address data is returned */}
      {address && (
        <DrawerContent>
          <div className="mx-auto w-full max-w-[26.75rem]">
            <DrawerHeader>
              <DrawerTitle>My Pickup Branch</DrawerTitle>

              <DrawerDescription className="sr-only">
                See details of your pickup branch.
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-0">
              <div className="mb-4 mt-6 grid grid-cols-2 gap-4 text-sm font-medium text-wurth-gray-800">
                <div className="flex flex-row items-start gap-2">
                  <Map
                    width={20}
                    height={20}
                    className="mt-1 shrink-0 stroke-wurth-gray-800"
                  />

                  <div>
                    <div className="text-wrap">
                      {address.streetAddress && `${address.streetAddress},`}
                      {address.locality && ` ${address.locality},`}
                      &nbsp;
                      {address.region && `${address.region} `}
                      {address.postalCode && `${address.postalCode}, `}
                      {address.countryName}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-2">
                    <Phone
                      width={20}
                      height={20}
                      className="shrink-0 stroke-wurth-gray-800"
                    />

                    <span>{address.phoneNumber ?? "N/A"}</span>
                  </div>

                  {!!operationHours && (
                    <div className="flex flex-row items-start gap-2">
                      <Timetable
                        width={20}
                        height={20}
                        className="shrink-0 stroke-wurth-gray-800"
                      />

                      <span>{operationHours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DrawerFooter className="pb-9">
              <DrawerClose asChild>
                <Button>Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
};

const WillCallPlant = ({ token, ...delegated }: WillCallPlantProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return (
      <div className="flex flex-row items-center gap-2 text-black">
        <Shop width={16} height={16} />

        <span>{DEFAULT_PLANT}</span>
      </div>
    );
  }

  return <WillCallPlantDrawer token={token} {...delegated} />;
};

export default WillCallPlant;
