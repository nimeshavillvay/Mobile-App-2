"use client";

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

  return (
    <div>
      <p>Select colors</p>
      <ul className="my-2 flex flex-row flex-wrap gap-4">
        <RadioGroup className="item-center flex flex-col gap-2 md:flex-row">
          {pickerColors[0]?.values.map((color) => (
            <li key={color.id}>
              <RadioGroupItem value={color.id.toString()} />
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
