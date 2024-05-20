import type { Plant, ShippingMethod } from "@/_lib/types";
import { formatNumberToPrice } from "@/old/_utils/helpers";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import Image from "next/image";
import Link from "next/link";
import MoreItemDetailsForMobile from "./more-item-details-for-mobile";

type OrderItemForMobileProps = {
  orderItem: {
    productId: number;
    slug?: string;
    sku: string;
    totalQuantity: number;
    lineItems: {
      itemNo: string;
      sku: string;
      productId: number;
      itemDescription: string;
      deliveryDate: string;
      plant: string;
      shippingCondition: string;
      invoice: string;
      shipQuantity: number;
      boQty: number;
      boDate: string;
      itemStatus: string;
      promoCode: string;
    }[];
    itemSubTotal: number;
    itemDescription: string;
    unitOfMeasure?: string;
    image?: string;
    productTitle?: string;
    isExcludedProduct?: boolean;
  };
  shippingMethods: ShippingMethod[];
  plants: Plant[];
};

const OrderItemForMobile = ({
  orderItem,
  shippingMethods,
  plants,
}: OrderItemForMobileProps) => {
  const {
    productId,
    slug,
    sku,
    itemDescription,
    totalQuantity,
    itemSubTotal,
    unitOfMeasure,
    image,
    productTitle,
    lineItems,
    isExcludedProduct,
  } = orderItem;

  const generateItemUrl = ({
    productId,
    slug,
  }: {
    productId: number;
    slug: string;
  }) => {
    if (slug !== "") {
      return `/product/${productId}/${slug}`;
    }
    return "#";
  };

  return (
    <div className="border-t px-4 py-6 text-brand-gray-500">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row gap-2">
          <div className="min-w-[92px]">
            <Link
              href={generateItemUrl({ productId, slug: slug ?? "" })}
              className={
                productId ? "pointer-events-auto" : "pointer-events-none"
              }
            >
              {image ? (
                <Image
                  src={image}
                  alt={itemDescription}
                  width={92}
                  height={92}
                />
              ) : (
                <WurthFullBlack
                  width={92}
                  height={92}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>
          </div>

          <div className="flex flex-col space-y-0.5">
            <div>{sku ?? "N/A"}</div>
            <div className="font-bold text-black">
              {itemDescription ?? productTitle ?? "Description N/A"}
            </div>
            <div className="font-bold text-brand-secondary">
              {lineItems?.length ? lineItems[0]?.itemStatus : "N/A"}
            </div>
            <div className="flex items-center justify-between">
              <div>
                Qty: {totalQuantity} {unitOfMeasure ?? "Unit"}
              </div>
              <div className="font-bold">
                ${itemSubTotal ? formatNumberToPrice(itemSubTotal) : "0.00"}
              </div>
            </div>
          </div>
        </div>

        <MoreItemDetailsForMobile
          productId={productId}
          lineItems={orderItem.lineItems}
          shippingMethods={shippingMethods}
          plants={plants}
          isExcludedProduct={isExcludedProduct}
        />
      </div>
    </div>
  );
};

export default OrderItemForMobile;
