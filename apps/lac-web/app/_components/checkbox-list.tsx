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
}: {
  values: { id: string; name: string; isActive?: boolean }[];
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
          />

          <Label htmlFor={value.id}>{value.name}</Label>
        </div>
      ))}

      {!!hiddenValues.length && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="space-y-2">
            {hiddenValues.map((value) => (
              <div key={value.id} className="flex flex-row items-center gap-1">
                <Checkbox id={value.id} disabled={value.isActive} />

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
