import { Button } from "@/(old-design)/_components/ui/button";
import { getMediaUrl } from "@/old/_utils/helpers";
import WurthFullBlack from "@repo/web-ui/components/logos/wurth-full-black";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { generateItemUrl } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import PurchasedItemDetailedViewDialog from "./purchased-item-detailed-view-dialog";
import { CombinedPurchasedItem } from "./types";

type PurchasedItemsListForMobileProps = {
  items: CombinedPurchasedItem[];
  token: string;
};

const PurchasedItemsListForMobile = ({
  items,
  token,
}: PurchasedItemsListForMobileProps) => {
  const [selectedItem, setSelectedItem] = useState<CombinedPurchasedItem>();
  const [showDetailedView, setShowDetailedView] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-brand-gray-200 py-4 md:hidden">
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <PurchasedItemRowForMobile
              key={item.sku}
              item={item}
              onClick={() => {
                setSelectedItem(item);
                setShowDetailedView(!showDetailedView);
              }}
            />
          ))}
      </div>
      {selectedItem && (
        <PurchasedItemDetailedViewDialog
          open={showDetailedView}
          onOpenChange={setShowDetailedView}
          item={selectedItem}
          token={token}
        />
      )}
    </>
  );
};

export default PurchasedItemsListForMobile;

const PurchasedItemRowForMobile = ({
  item,
  onClick,
}: {
  item: CombinedPurchasedItem;
  onClick: () => void;
}) => {
  return (
    <div className="flex min-h-[180px] flex-row justify-between bg-white p-4">
      <Link
        href={generateItemUrl(item.group_id, item.sku)}
        className="min-w-[92px]"
      >
        {item.img ? (
          <Image
            src={getMediaUrl(item.img)}
            alt={item.txt_sap_description_name}
            width={92}
            height={92}
            className="size-[92px] border border-brand-gray-200 object-contain"
          />
        ) : (
          <WurthFullBlack
            width={92}
            height={92}
            className="border border-brand-gray-200 px-2"
          />
        )}
        <span className="sr-only">Item image</span>
      </Link>

      <div className="flex w-full min-w-[200px] flex-col gap-1 px-2 text-brand-gray-500">
        {item.txt_category && (
          <div className="text-sm">{item.txt_category}</div>
        )}

        <h4 className="text-wrap font-bold text-black">
          {item.txt_sap_description_name}
        </h4>

        <div className="truncate text-sm">
          {item.sku !== "" ? item.sku : "N/A"}&nbsp;•&nbsp;MRFP#:&nbsp;
          {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
        </div>

        <div className="flex flex-row gap-1 rounded-sm bg-brand-gray-100 p-2 text-sm">
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

      <Button
        variant="ghost"
        onClick={onClick}
        className="h-full items-start px-0.5"
      >
        <MdKeyboardArrowRight className="text-3xl" />
      </Button>
    </div>
  );
};