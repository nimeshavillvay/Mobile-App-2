"use client";

import { useFilterParams } from "@/_components/products-grid";
import { QUERY_KEYS } from "@/_components/products-grid/constants";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/web-ui/components/ui/tooltip";
import { useForm } from "react-hook-form";
import type { LaminateSearchFormSchema } from "./helpers";
import { laminateSearchFormSchema } from "./helpers";

type Color = {
  id: number;
  value: string;
  tooltip: string | null;
  active: boolean;
};

const ColorOption = ({
  color,
  isSelected,
  onSelect,
}: {
  readonly color: Color;
  readonly isSelected: boolean;
  readonly onSelect: (id: string) => void;
}) => {
  return (
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
  );
};

const ColorPicker = ({ token }: { readonly token: string }) => {
  const laminateSearchForm = useForm<LaminateSearchFormSchema>({
    resolver: zodResolver(laminateSearchFormSchema),
  });
  const laminateFiltersQuery = useSuspenseLaminateFilters({ token });
  const { searchParams } = useFilterParams(laminateFiltersQuery.data);

  const colorPickerFilter = laminateFiltersQuery.data.find(
    (filter) => filter.is_colorpicker,
  );

  const colorPickerFilterId = colorPickerFilter?.id.toString() || "";
  const selectedColor = searchParams.get(colorPickerFilterId);

  const changeColor = (colorId: string) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);

    newUrlSearchParams.delete(QUERY_KEYS.page);
    newUrlSearchParams.delete(QUERY_KEYS.searchText);
    laminateSearchForm.reset({ search: "" });
    newUrlSearchParams.delete(colorPickerFilterId);
    newUrlSearchParams.append(colorPickerFilterId, colorId.toString());

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  if (!colorPickerFilter || colorPickerFilter.values.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Select Color</h3>
      <fieldset>
        <legend className="sr-only">Color options</legend>
        <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {colorPickerFilter.values.map((color) => (
            <ColorOption
              key={color.id}
              color={color}
              isSelected={selectedColor === color.id.toString()}
              onSelect={changeColor}
            />
          ))}
        </ul>
      </fieldset>
    </div>
  );
};

export default ColorPicker;
