import { Button } from "@/(old-design)/_components/ui/button";
import WurthLacLogo from "@/_components/wurth-lac-logo";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { generateItemUrl } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import PurchasedItemDetailedViewDialog from "./purchased-item-detailed-view-dialog";
import type { DetailedPurchasedItem } from "./types";

type PurchasedItemsListForMobileProps = {
  readonly items: DetailedPurchasedItem[];
  readonly token: string;
};

const PurchasedItemsListForMobile = ({
  items,
  token,
}: PurchasedItemsListForMobileProps) => {
  const [selectedItem, setSelectedItem] = useState<DetailedPurchasedItem>();
  const [showDetailedView, setShowDetailedView] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-brand-gray-200 py-4 md:hidden">
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <PurchasedItemRowForMobile
              key={`${item.productId}_${index}`}
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
  readonly item: DetailedPurchasedItem;
  readonly onClick: () => void;
}) => {
  return (
    <div className="flex min-h-[180px] flex-row justify-between bg-white p-4">
      <Link href={generateItemUrl(item)} className="min-w-[92px]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.productTitle}
            width={92}
            height={92}
            className="size-[92px] border border-brand-gray-200 object-contain"
          />
        ) : (
          <WurthLacLogo
            width={92}
            height={92}
            className="border border-brand-gray-200 px-2"
          />
        )}
        <span className="sr-only">Item image</span>
      </Link>

      <div className="flex w-full min-w-[200px] flex-col gap-1 px-2 text-brand-gray-500">
        {item.productCategory && (
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: item.productCategory }}
          />
        )}

        <h4
          className="line-clamp-3 text-wrap font-bold text-black"
          dangerouslySetInnerHTML={{ __html: item.productTitle }}
        />

        <div className="truncate text-sm">
          {item.productSku !== "" ? item.productSku : "N/A"}
          &nbsp;•&nbsp;MRFP#:&nbsp;
          {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
        </div>

        <div className="flex flex-row gap-1 rounded-sm bg-brand-gray-100 p-2 text-sm">
          <div className="flex-1">
            <div className="text-nowrap">Last Order Date</div>
            <div className="font-bold">
              {item.purchaseOrderDate
                ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
                : "N/A"}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-nowrap">Order Count</div>
            <div className="font-bold">{item.totalItem ?? "N/A"}</div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onClick}
        className="h-full items-start px-0.5"
      >
        <MdKeyboardArrowRight
          className="text-3xl"
          data-button-action="Purchase Items Mobile View Details"
        />
      </Button>
    </div>
  );
};
