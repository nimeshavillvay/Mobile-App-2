"use client";

import { useFilterParams } from "@/_components/products-grid";
import { QUERY_KEYS } from "@/_components/products-grid/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/web-ui/components/ui/tooltip";
import React, { useCallback, useMemo, useState } from "react";
import useSuspenseLaminateFilters from "../hooks/use-suspense-laminate-filters.hook";

type Color = {
  id: number;
  value: string;
  tooltip: string | null;
  active: boolean;
};

const ColorOption = React.memo(
  ({
    color,
    isSelected,
    onSelect,
  }: {
    readonly color: Color;
    readonly isSelected: boolean;
    readonly onSelect: (id: string) => void;
  }) => (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <label
            htmlFor={`color-${color.id}`}
            className={`size-15 flex cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-in-out ${color.active ? "" : "cursor-not-allowed opacity-50"} `}
          >
            <input
              type="radio"
              id={`color-${color.id}`}
              name="colorpicker"
              value={color.id.toString()}
              checked={isSelected}
              onChange={() => onSelect(color.id.toString())}
              disabled={!color.active}
              className="sr-only"
            />
            <span
              className={`size-14 rounded-full border-2 transition-all duration-200 ease-in-out ${isSelected ? "border-blue-500" : "border-transparent hover:border-blue-300"} `}
              style={{ backgroundColor: color.value }}
              aria-hidden="true"
            />
            <span className="sr-only">{color.tooltip}</span>
          </label>
        </TooltipTrigger>
        <TooltipContent>
          <p>{color.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </li>
  ),
);

ColorOption.displayName = "ColorOption";

const ColorPicker = ({ token }: { readonly token: string }) => {
  const laminateFiltersQuery = useSuspenseLaminateFilters({ token });
  const { searchParams } = useFilterParams(laminateFiltersQuery.data);

  const colorPickerFilter = useMemo(
    () => laminateFiltersQuery.data.find((filter) => filter.is_colorpicker),
    [laminateFiltersQuery.data],
  );

  const colorPickerFilterId = colorPickerFilter?.id.toString() || "";

  const [selectedColor, setSelectedColor] = useState(
    searchParams.get(colorPickerFilterId) || "",
  );

  const changeColor = useCallback(
    (colorId: string) => {
      setSelectedColor(colorId);
      const newUrlSearchParams = new URLSearchParams(searchParams);

      newUrlSearchParams.delete(QUERY_KEYS.page);
      newUrlSearchParams.delete(colorPickerFilterId);
      newUrlSearchParams.append(colorPickerFilterId, colorId);

      window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
    },
    [searchParams, colorPickerFilterId],
  );

  if (!colorPickerFilter || colorPickerFilter.values.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Select Color</h3>
      <fieldset>
        <legend className="sr-only">Color options</legend>
        <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          <TooltipProvider>
            {colorPickerFilter.values.map((color) => (
              <ColorOption
                key={color.id}
                color={color}
                isSelected={selectedColor === color.id.toString()}
                onSelect={changeColor}
              />
            ))}
          </TooltipProvider>
        </ul>
      </fieldset>
    </div>
  );
};

export default React.memo(ColorPicker);
