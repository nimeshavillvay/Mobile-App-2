import { Button } from "@/old/_components/ui/button";
import { Checkbox } from "@/old/_components/ui/checkbox";
import { Label } from "@/old/_components/ui/label";
import { cn } from "@/old/_utils/helpers";
import { useMultipleSelection, useSelect } from "downshift";
import { ChevronDown, X } from "lucide-react";

type Option = {
  id: string;
  value: string;
  active: boolean;
};

type MultiSelectProps = {
  label: string;
  data: Option[];
  placeholder?: string;
  flag?: string;
  onValuesChange?: (selectedItems: Option[]) => void;
  onClear?: () => void;
};

// TODO: This component can be optimized further
const MultiSelect = ({
  label,
  data,
  placeholder = "Select item",
  flag = "multiselect",
  onValuesChange,
  onClear,
}: MultiSelectProps) => {
  const initialSelectedItems: Option[] = [];

  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems });

  const filteredItems = data;

  const isItemSelected = (item: Option) => {
    return selectedItems?.includes(item);
  };

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items: filteredItems,
    stateReducer: (state, actionAndChanges) => {
      const {
        ToggleButtonKeyDownEnter,
        ToggleButtonKeyDownSpaceButton,
        ItemClick,
      } = useSelect.stateChangeTypes;
      const { changes, type } = actionAndChanges;

      if (
        type === ToggleButtonKeyDownEnter ||
        type === ToggleButtonKeyDownSpaceButton ||
        type === ItemClick
      ) {
        return {
          ...changes,
          isOpen: true, // keep the menu open after selection.
          highlightedIndex: 0, // with the first option highlighted.
        };
      } else {
        return changes;
      }
    },
    onStateChange: ({ type, selectedItem }) => {
      const {
        ToggleButtonKeyDownEnter,
        ToggleButtonKeyDownSpaceButton,
        ItemClick,
      } = useSelect.stateChangeTypes;

      if (
        type === ToggleButtonKeyDownEnter ||
        type === ToggleButtonKeyDownSpaceButton ||
        type === ItemClick
      ) {
        if (selectedItem && selectedItem.active) {
          onValuesChange && onValuesChange([...selectedItems, selectedItem]);

          if (isItemSelected(selectedItem)) {
            removeSelectedItem(selectedItem);
          } else {
            addSelectedItem(selectedItem);
          }
        }
      }
    },
  });

  const removeAllSelectedItems = () => {
    if (onClear) {
      onClear();
    }
    selectedItems.forEach(removeSelectedItem);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-2">
        <Label className="flex-1" {...getLabelProps()}>
          {label}
        </Label>

        <div className="flex h-8 min-w-[138px] flex-1 flex-row items-center justify-between rounded-sm border bg-white px-1 focus-within:border-brand-gray-300">
          {selectedItems.length > 0 && (
            <div className="flex flex-row items-center rounded-md bg-brand-gray-100 px-1 focus:bg-brand-gray-300">
              <span>{selectedItems.length} Selected </span>
              <Button
                variant="ghost"
                className="h-4 gap-0 px-0.5"
                onClick={() => removeAllSelectedItems()}
              >
                <X className="h-3 w-3 opacity-50" />
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            className={cn(
              "font-base flex h-6 cursor-pointer flex-row items-center justify-between gap-0 px-1 font-normal normal-case",
              selectedItems.length === 0 ? "w-full" : "",
            )}
            {...getToggleButtonProps(
              getDropdownProps({ preventKeyAction: isOpen }),
            )}
          >
            <span>{selectedItems.length === 0 && placeholder}</span>

            <ChevronDown
              className={cn(
                "h-4 w-4 opacity-50 transition-transform duration-200 ease-out",
                isOpen ? "rotate-180" : "",
              )}
            />
          </Button>
        </div>
      </div>

      <ul
        className={cn(
          "w-inherit absolute right-4 z-10 mt-1 max-h-80 min-w-[138px] overflow-scroll bg-white p-0 shadow-md",
          !(isOpen && filteredItems.length) ? "hidden" : "",
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          filteredItems.map((item, index) => (
            <li
              key={`${flag}-${item.id}`}
              className={cn(
                "flex cursor-pointer flex-row items-center gap-2 px-3 py-2 shadow-sm hover:bg-brand-secondary/10",
                isItemSelected(item) ? "bg-brand-gray-200" : "",
              )}
              {...getItemProps({ item, index })}
            >
              <Checkbox
                id={`${flag}-${item.id}`}
                disabled={!item.active}
                checked={isItemSelected(item)}
              />
              <Label htmlFor={`${flag}-${item.id}`}>{item.value}</Label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelect;