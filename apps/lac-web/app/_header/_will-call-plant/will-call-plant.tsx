"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Plant } from "@/_lib/types";
import useSuspenseWillCallPlant from "./use-suspense-will-call-plant.hook";

type WillCallPlantProps = {
  token: string;
  plants: Plant[];
};

const WillCallPlantFetcher = ({ token, plants }: WillCallPlantProps) => {
  const willCallPlantQuery = useSuspenseWillCallPlant(token);

  const plant = plants.find(
    (plant) => plant.code === willCallPlantQuery.data.plant,
  );

  return <span>{plant?.name}</span>;
};

const WillCallPlant = ({ token, plants }: WillCallPlantProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return <span>Brea, CA</span>;
  }

  return <WillCallPlantFetcher token={token} plants={plants} />;
};

export default WillCallPlant;
