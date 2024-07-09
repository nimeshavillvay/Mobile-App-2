import type { Plant } from "@/_lib/types";
import React from "react";
import PlantName from "./plant-name";

const NotAvailableInfoBanner = ({
  plants,
  willCallPlant,
}: {
  readonly plants: Plant[];
  readonly willCallPlant: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-red-800/10 px-4 py-2 text-sm">
      <div className="text-red-800">
        This item is not available for pick up at{" "}
        <PlantName plants={plants} plantCode={willCallPlant} />
      </div>
      <div className="text-xs text-wurth-gray-500">
        To proceed, please select a valid shipping option.
      </div>
    </div>
  );
};

export default NotAvailableInfoBanner;
