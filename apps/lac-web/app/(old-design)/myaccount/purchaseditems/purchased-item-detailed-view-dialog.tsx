// import { Button } from "@/old/_components/ui/button";
import Separator from "@/old/_components/separator";
import {
  Dialog,
  // DialogClose,
  DialogContent,
} from "@/old/_components/ui/dialog";
import { getMediaUrl } from "@/old/_utils/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
import { generateItemUrl } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

type ActionConfirmationDialogProps = {
  open: boolean;
  onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"];
  item: CombinedPurchasedItem;
};

const PurchasedItemDetailedViewDialog = ({
  open,
  onOpenChange,
  item,
}: ActionConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 top-auto max-w-[490px] translate-y-[0%] gap-0 py-8 md:bottom-auto md:top-[50%] md:translate-y-[-50%]">
        <div className="flex flex-col gap-4 px-6 text-brand-gray-500">
          <div className="flex flex-row gap-4">
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

            <div className="flex flex-col">
              {item.txt_category && (
                <div className="text-base">{item.txt_category}</div>
              )}

              <h4 className="text-wrap font-bold text-black">
                {item.txt_sap_description_name}
              </h4>
            </div>
          </div>

          <div className="flex flex-row gap-2 rounded-sm bg-brand-gray-100 p-3">
            <div className="flex-1">
              <div className="text-nowrap text-sm">Last Order Date</div>
              <div className="font-bold">
                {item.orderDate
                  ? dayjs(item.orderDate).format(DATE_FORMAT)
                  : "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-nowrap text-sm">Order Count</div>
              <div className="font-bold">1</div>
            </div>
          </div>

          <div className="flex flex-row gap-2 p-3">
            <div className="flex-1">
              <div className="text-sm">Item #</div>
              <div className="font-bold">
                {item.sku !== "" ? item.sku : "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm">Manufacture Part #</div>
              <div className="font-bold">
                {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-gray-200"
        />

        <div className="flex flex-row gap-2 px-6 pt-4 text-brand-gray-500">
          <div className="h-10 flex-1">
            <div>
              <span className="font-bold">$95.06</span>
              <span className="text-sm"> / Each</span>
            </div>

            <div>
              <div className="rounded-sm border border-brand-gray-300 p-2">
                Price Breakdown
              </div>
            </div>
          </div>

          <div className="h-10 flex-1">
            <div className="text-sm">Min:1, Multiple:1</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasedItemDetailedViewDialog;
