import { getMediaUrl } from "@/old/_utils/helpers";
import Image from "next/image";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

type PurchasedItemsListForMobileProps = {
  items: CombinedPurchasedItem[];
};

const PurchasedItemsListForMobile = ({
  items,
}: PurchasedItemsListForMobileProps) => {
  console.log(items);
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <div
            key={item.sku}
            className="flex flex-row gap-4 bg-brand-success/10 p-4 text-brand-success"
          >
            <div>
              <Image
                src={item.img ? getMediaUrl(item.img) : ItemPlaceholder}
                alt={item.txt_sap_description_name}
                width={92}
                height={92}
                className="h-[96px] w-[92px] border border-brand-gray-200 object-contain"
              />
            </div>
            <div>Mobile view is here</div>
          </div>
        ))}
    </div>
  );
};

export default PurchasedItemsListForMobile;
