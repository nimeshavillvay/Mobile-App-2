import CloseIcon from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Separator } from "@repo/web-ui/components/ui/separator";

const ProductsGridHeader = () => {
  return (
    <header className="space-y-3">
      <div className="flex flex-row items-end justify-between text-wurth-gray-800">
        <div className="font-title text-3xl font-medium tracking-[-0.01406rem]">
          126 items
        </div>

        <div className="text-base font-normal">Page 1 of 15</div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <AttributePill
          name="Brands"
          values={[
            { name: "Amerock", id: 1 },
            { name: "Advance Affiliates Inc", id: 2 },
          ]}
        />

        <AttributePill
          name="Wood Species"
          values={[{ name: "4 selected", id: 3 }]}
        />

        <Button
          variant="ghost"
          className="py-2.5 px-4 flex flex-row items-center gap-2.5 h-fit rounded-full"
        >
          <span className="text-sm font-bold">Clear all</span>

          <CloseIcon width={16} height={16} />
        </Button>
      </div>
    </header>
  );
};

export default ProductsGridHeader;

const AttributePill = ({
  name,
  values,
}: {
  name: string;
  values: { name: string; id: number }[];
}) => {
  return (
    <div className="flex flex-row gap-2 px-4 py-2.5 items-center rounded-full border border-wurth-gray-250 bg-white shadow-sm">
      <span className="text-sm font-medium text-wurth-gray-800">{name}</span>

      <Separator orientation="vertical" className="h-5" />

      <ul className="flex flex-row items-center gap-1">
        {values.map((value) => (
          <li key={value.id}>
            <Button
              variant="subtle"
              className="py-0.5 px-1 flex flex-row items-center gap-2 rounded-sm h-fit"
            >
              <span className="text-xs text-wurth-gray-800 font-normal">
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
