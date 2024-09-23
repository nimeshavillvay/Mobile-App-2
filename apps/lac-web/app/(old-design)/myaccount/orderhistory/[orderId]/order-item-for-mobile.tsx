import WurthLacLogo from "@/_components/wurth-lac-logo";
import type { Plant, ShippingMethod } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import Image from "next/image";
import Link from "next/link";
import MoreItemDetailsForMobile from "./more-item-details-for-mobile";

type OrderItemForMobileProps = {
  readonly orderItem: {
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
    itemDescription: string;
    unitOfMeasure?: string;
    image?: string;
    productTitle?: string;
    isExcludedProduct?: boolean;
    productName?: string;
    price: number;
  };
  readonly isDiscontinued: boolean;
  readonly shippingMethods: ShippingMethod[];
  readonly plants: Plant[];
};

const OrderItemForMobile = ({
  orderItem,
  isDiscontinued,
  shippingMethods,
  plants,
}: OrderItemForMobileProps) => {
  const {
    productId,
    slug,
    sku,
    itemDescription,
    totalQuantity,
    unitOfMeasure,
    image,
    productTitle,
    lineItems,
    isExcludedProduct,
    productName,
    price,
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
              className={cn(
                productId ? "pointer-events-auto" : "pointer-events-none",
                "btn-view-product",
              )}
            >
              {image ? (
                <Image
                  src={image}
                  alt={productName ?? itemDescription}
                  width={92}
                  height={92}
                />
              ) : (
                <WurthLacLogo
                  width={92}
                  height={92}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>
          </div>

          <div className="flex flex-col space-y-0.5">
            <div>{sku ?? "N/A"}</div>
            <div
              className="line-clamp-3 font-bold text-black"
              dangerouslySetInnerHTML={{
                __html: productName ?? productTitle ?? "Description N/A",
              }}
            />
            <div className="font-bold text-brand-secondary">
              {lineItems?.length ? lineItems[0]?.itemStatus : "N/A"}
            </div>
            <div className="flex items-center justify-between">
              <div>
                Qty: {totalQuantity} {unitOfMeasure ?? "Unit"}
              </div>
              <div className="font-bold">${formatNumberToPrice(price)}</div>
            </div>
          </div>
        </div>

        <MoreItemDetailsForMobile
          productId={productId}
          lineItems={orderItem.lineItems}
          isDiscontinued={isDiscontinued}
          shippingMethods={shippingMethods}
          plants={plants}
          isExcludedProduct={isExcludedProduct}
        />
      </div>
    </div>
  );
};

export default OrderItemForMobile;
