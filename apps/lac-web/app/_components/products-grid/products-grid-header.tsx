import ChevronDown from "@repo/web-ui/components/icons/chevron-down";
import CloseIcon from "@repo/web-ui/components/icons/close";
import Settings from "@repo/web-ui/components/icons/settings";
import { Button } from "@repo/web-ui/components/ui/button";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { type ReactNode } from "react";

const ProductsGridHeader = () => {
  return (
    <header className="space-y-3">
      {/* Mobile filters selector */}
      <div className="container flex w-full snap-x scroll-pl-4 flex-row items-center gap-2 overflow-x-auto md:hidden">
        <MobileAttributePill>
          <Settings className="size-5" />

          <span className="flex flex-row items-center gap-1">
            Filters & sort
            <span className="grid size-5 place-content-center rounded-full bg-wurth-gray-800 text-xs font-semibold leading-none text-white">
              2
            </span>
          </span>
        </MobileAttributePill>

        <MobileAttributePill>
          Get it fast <ChevronDown className="size-4" />
        </MobileAttributePill>

        <MobileAttributePill>
          Offers <ChevronDown className="size-4" />
        </MobileAttributePill>
      </div>

      <div className="container flex flex-row items-end justify-between text-wurth-gray-800">
        <div className="font-title text-lg font-medium tracking-normal md:text-3xl md:tracking-[-0.01406rem]">
          126 items
        </div>

        <div className="text-sm font-normal md:text-base">Page 1 of 15</div>
      </div>

      {/* Desktop selected attributes viewer */}
      <div className="container hidden md:flex md:flex-row md:items-center md:gap-2">
        <DesktopAttributePill
          name="Brands"
          values={[
            { name: "Amerock", id: 1 },
            { name: "Advance Affiliates Inc", id: 2 },
          ]}
        />

        <DesktopAttributePill
          name="Wood Species"
          values={[{ name: "4 selected", id: 3 }]}
        />

        <Button
          variant="ghost"
          className="flex h-fit flex-row items-center gap-2.5 rounded-full px-4 py-2.5"
        >
          <span className="text-sm font-bold">Clear all</span>

          <CloseIcon width={16} height={16} />
        </Button>
      </div>
    </header>
  );
};

export default ProductsGridHeader;

const MobileAttributePill = ({ children }: { children: ReactNode }) => {
  return (
    <button className="flex shrink-0 snap-start flex-row items-center gap-2 rounded-full border border-wurth-gray-250 px-4 py-3 text-sm font-medium text-wurth-gray-800 shadow-sm">
      {children}
    </button>
  );
};

const DesktopAttributePill = ({
  name,
  values,
}: {
  name: string;
  values: { name: string; id: number }[];
}) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-full border border-wurth-gray-250 bg-white px-4 py-2.5 shadow-sm">
      <span className="text-sm font-medium text-wurth-gray-800">{name}</span>

      <Separator orientation="vertical" className="h-5" />

      <ul className="flex flex-row items-center gap-1">
        {values.map((value) => (
          <li key={value.id}>
            <Button
              variant="subtle"
              className="flex h-fit flex-row items-center gap-2 rounded-sm px-1 py-0.5"
            >
              <span className="text-xs font-normal text-wurth-gray-800">
                {value.name}
              </span>

              <CloseIcon width={12} height={12} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
