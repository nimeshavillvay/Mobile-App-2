import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import { Alert } from "@repo/web-ui/components/icons/alert";
import dayjs from "dayjs";

const UI_DATE_FORMAT = "ddd, MMMM.DD, YYYY";

const RegionalExclusionAndShippingMethods = ({
  token,
  productId,
  plants,
  mappedConfiguration,
}: {
  readonly token: string;
  readonly productId: number;
  readonly plants: { code: string; name: string }[];
  readonly mappedConfiguration: {
    availability: {
      plant: string | undefined;
      quantity: number | undefined;
      shippingMethod: string | undefined;
    }[];
    willCallQuantity: number;
    willCallPlant: string;
    hashValue: string;
    selectedOption: string;
    backOrderAll: string;
    backOrderQuantity: number;
    backOrderDate: string;
  };
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return (
      <div className="mt-1 flex flex-row gap-2 rounded-lg bg-red-50 p-2">
        <Alert
          className="mt-1 shrink-0 stroke-wurth-red-650"
          width={16}
          height={16}
        />

        <div className="flex-1 space-y-1">
          <h4 className="text-base font-semibold text-wurth-red-650">
            This items cannot be shipped to your current address
          </h4>

          <div className="m-0 text-sm leading-6 text-wurth-gray-800">
            Please update your shipping address at checkout or consider removing
            this item.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {mappedConfiguration?.availability?.length > 0 &&
        mappedConfiguration.availability.map(
          (
            itemLine: {
              plant: string | undefined;
              quantity: number | undefined;
              shippingMethod: string | undefined;
            },
            index: number,
          ) =>
            itemLine &&
            typeof itemLine.quantity === "number" &&
            itemLine.quantity !== 0 &&
            !isNaN(itemLine?.quantity) && (
              <div key={index} className="">
                <span className="text-green-700">
                  {itemLine?.quantity}
                  &nbsp;
                  {itemLine?.quantity === 1 ? "item" : "items"}
                </span>
                &nbsp;pickup at&nbsp;
                {plants.find((plant) => plant.code === itemLine.plant)?.name ??
                  "Plant N/A"}
                &nbsp;&nbsp;
                {mappedConfiguration.availability.length - 1 !== index && (
                  <span className="text-black">&#x2022;&nbsp;&nbsp;</span>
                )}
                {mappedConfiguration.availability.length - 1 === index &&
                  mappedConfiguration.backOrderQuantity > 0 && (
                    <span className="text-black">&#x2022;&nbsp;&nbsp;</span>
                  )}
              </div>
            ),
        )}
      {mappedConfiguration.backOrderQuantity > 0 &&
        mappedConfiguration.backOrderDate && (
          <div className="mr-4">
            <span className="text-yellow-700">Backorder</span>
            &nbsp;
            {mappedConfiguration.backOrderQuantity}
            &nbsp;items, ship by&nbsp;
            {dayjs(mappedConfiguration.backOrderDate).format(UI_DATE_FORMAT)}
          </div>
        )}
    </div>
  );
};

export default RegionalExclusionAndShippingMethods;
