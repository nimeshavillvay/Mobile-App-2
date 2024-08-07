"use client";

import { useFilterParams } from "@/_components/products-grid";
import { QUERY_KEYS } from "@/_components/products-grid/constants";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";

const ColorPicker = ({ token }: { readonly token: string }) => {
  const laminateFiltersQuery = useSuspenseLaminateFilters({ token });
  const pickerColors = laminateFiltersQuery.data.filter(
    (filter) => filter.is_colorpicker,
  );
  const { searchParams } = useFilterParams(laminateFiltersQuery.data);

  if (
    pickerColors[0]?.values === undefined ||
    pickerColors[0]?.values.length === 0
  ) {
    return null;
  }
  const colorPickerFilterId = pickerColors[0]?.id.toString();

  const changeColor = (colorId: string) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.delete(QUERY_KEYS.page);
    newUrlSearchParams.delete(colorPickerFilterId);
    newUrlSearchParams.append(colorPickerFilterId, colorId.toString());

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  return (
    <div>
      <p>Select colors</p>
      <ul className="my-2 flex flex-row flex-wrap gap-4">
        <RadioGroup
          onValueChange={changeColor}
          value={searchParams.get(colorPickerFilterId) ?? ""}
          className="item-center flex flex-col gap-2 md:flex-row"
        >
          {pickerColors[0]?.values.map((color) => (
            <li key={color.id}>
              <RadioGroupItem
                key={color.id}
                value={color.id.toString()}
                disabled={!color.active}
              />
              <Label htmlFor={color.id.toString()} className="sr-only">
                {color.tooltip}
              </Label>
              <span>{color.value}</span>
            </li>
          ))}
        </RadioGroup>
      </ul>
    </div>
  );
};

export default ColorPicker;
