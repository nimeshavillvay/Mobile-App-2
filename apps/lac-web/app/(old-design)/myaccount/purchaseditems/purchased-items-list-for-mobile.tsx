import { getMediaUrl } from "@/old/_utils/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

type PurchasedItemsListForMobileProps = {
  items: CombinedPurchasedItem[];
};

const PurchasedItemsListForMobile = ({
  items,
}: PurchasedItemsListForMobileProps) => {
  const generateItemUrl = (group_id: string, sku: string) => {
    if (group_id && sku) {
      return `/product-item/${group_id}/${sku}`;
    }
    return "#";
  };

  return (
    <div className="grid grid-cols-1 gap-4 bg-brand-gray-200 py-4 md:hidden">
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <div key={item.sku} className="flex flex-row gap-4 bg-white p-4">
            <Link
              href={generateItemUrl(item.group_id, item.sku)}
              className="min-w-[92px]"
            >
              <Image
                src={item.img ? getMediaUrl(item.img) : ItemPlaceholder}
                alt={item.txt_sap_description_name}
                width={92}
                height={92}
                className="size-[92px] border border-brand-gray-200 object-contain"
              />
            </Link>

            <div className="flex min-w-[200px] flex-col gap-1 text-brand-gray-500">
              {item.txt_category && (
                <div className="text-sm">{item.txt_category}</div>
              )}

              <h4 className="min-w-[200px] text-wrap font-bold text-black">
                {item.txt_sap_description_name}
              </h4>

              <div className="truncate text-sm">
                {item.sku !== "" ? item.sku : "N/A"} • MRFP#:{" "}
                {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
              </div>

              <div className="flex flex-row gap-1 bg-brand-gray-100 p-2 text-sm">
                <div className="flex-1">
                  <div className="text-nowrap">Last Order Date</div>
                  <div className="font-bold">
                    {item.orderDate
                      ? dayjs(item.orderDate).format(DATE_FORMAT)
                      : "N/A"}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-nowrap">Order Count</div>
                  <div className="font-bold">1</div>
                </div>
              </div>
            </div>

            <div>
              <MdKeyboardArrowRight className="text-3xl" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PurchasedItemsListForMobile;
