"use client";

import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
// eslint-disable-next-line no-restricted-imports
import { useDeferredValue, useEffect } from "react";
import useAddToCartForm from "../use-add-to-cart-form.hook";

type ProductPricesProps = {
  readonly token?: string;
  readonly productId: number;
  readonly listPrice: number;
  readonly uom: string;
  readonly className?: string;
  readonly freightCharge: string;
};

const ProductPrices = ({
  productId,
  listPrice,
  uom,
  token,
  className,
  freightCharge,
}: ProductPricesProps) => {
  const { watch } = useAddToCartForm();
  const quantity = watch("quantity");
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const initialPriceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: 1 },
  ]);

  const initialPriceData = initialPriceCheckQuery.data.productPrices[0];
  const initialPrice =
    initialPriceData?.uomPrice ?? initialPriceData?.price ?? 0;

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: deferredQuantity },
  ]);
  const priceData = priceCheckQuery.data.productPrices[0];
  const currentPrice = priceData?.uomPrice ?? priceData?.price ?? 0;

  const discount = Math.round(((listPrice - currentPrice) / listPrice) * 100);

  const actualUom = priceData?.uomPriceUnit ?? uom;

  const isLaminateItem = !!priceData?.uomPrice && !!priceData?.uomPriceUnit;

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );

  const gtmItemUserQuery = useGtmUser();

  useEffect(() => {
    const gtmItemInfo = gtmItemInfoQuery.data?.[0];
    const gtmUser = gtmItemUserQuery.data;
    if (gtmItemInfo !== undefined && gtmUser !== undefined) {
      sendGTMEvent({
        event: "view_item",
        viewItemData: {
          currency: "USD",
          value: gtmItemInfo?.price,
          items: [
            {
              item_id: gtmItemInfo?.item_id,
              item_sku: gtmItemInfo?.item_sku,
              item_name: gtmItemInfo?.item_name,
              item_brand: gtmItemInfo?.item_brand,
              price: gtmItemInfo?.price,
              quantity: 1,
              item_categoryid: gtmItemInfo?.item_categoryid,
              item_primarycategory: gtmItemInfo?.item_primarycategory,
              item_category: gtmItemInfo?.item_category_path[0] ?? "",
              item_category1: gtmItemInfo?.item_category_path[1] ?? "",
              item_category2: gtmItemInfo?.item_category_path[2] ?? "",
              item_category3: gtmItemInfo?.item_category_path[3] ?? "",
            },
          ],
          page_type: getGTMPageType(
            pathnameHistory[pathnameHistory.length - 1] ?? "",
          ),
        },
        data: {
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
      });
    }
  }, [gtmItemInfoQuery.data, gtmItemUserQuery.data, pathnameHistory]);

  return (
    <section className={cn("space-y-3 md:space-y-4", className)}>
      <div className="flex flex-row items-end gap-1 text-lg leading-6 text-wurth-gray-800">
        <div className="text-xl font-semibold leading-none">
          $
          <span className="font-title text-[1.75rem] leading-none">
            {formatNumberToPrice(currentPrice)}
          </span>
        </div>

        {!isLaminateItem && discount > 0 && (
          <div className="text-wurth-gray-400 line-through">
            ${formatNumberToPrice(listPrice)}
          </div>
        )}

        <div>
          <span className="text-sm font-semibold">/</span>
          <span className="font-title leading-none">{actualUom}</span>
        </div>

        {!isLaminateItem && discount > 0 && (
          <div className="font-semibold text-green-700">
            You save ${formatNumberToPrice(listPrice - currentPrice)}
          </div>
        )}
      </div>

      {!!freightCharge && (
        <div className="text-base text-wurth-gray-800">
          Freight: <span className="font-semibold">{freightCharge}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-0.5">
        {priceData?.priceBreakDowns.map((item) => (
          <div
            key={item.quantity}
            className="rounded-lg bg-wurth-gray-50 px-4 py-3 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none md:py-2"
          >
            <h5 className="text-sm font-medium text-wurth-gray-800">
              {item.quantity} items
            </h5>

            <div className="text-sm font-semibold leading-none text-wurth-gray-800">
              <span className="text-base font-bold leading-6">
                ${formatNumberToPrice(Math.min(item.price, initialPrice))}
              </span>
              /{uom}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPrices;
