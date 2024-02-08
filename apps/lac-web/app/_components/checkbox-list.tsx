import { type CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Label } from "./ui/label";

const CheckboxList = ({
  values,
  onCheckedChange,
}: {
  values: { id: string; name: string; isActive?: boolean; checked: boolean }[];
  onCheckedChange?: (valueId: string, checked: CheckedState) => void;
}) => {
  const shownValues = values.slice(0, 10);
  const hiddenValues = values.slice(10);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {shownValues.map((value) => (
        <div key={value.id} className="flex flex-row items-center gap-1">
          <Checkbox
            id={value.id}
            disabled={
              typeof value.isActive !== "undefined" ? !value.isActive : false
            }
            checked={value.checked}
            onCheckedChange={(checked) => onCheckedChange?.(value.id, checked)}
          />

          <Label htmlFor={value.id}>{value.name}</Label>
        </div>
      ))}

      {!!hiddenValues.length && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="space-y-2">
            {hiddenValues.map((value) => (
              <div key={value.id} className="flex flex-row items-center gap-1">
                <Checkbox
                  id={value.id}
                  disabled={value.isActive}
                  checked={value.checked}
                />

                <Label htmlFor={value.id}>{value.name}</Label>
              </div>
            ))}
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <button className="text-brand-primary text-[15px] leading-5 data-[state=open]:mt-2">
              {isOpen ? "less" : "more..."}
            </button>
          </CollapsibleTrigger>
        </Collapsible>
      )}
    </>
  );
};

export default CheckboxList;
