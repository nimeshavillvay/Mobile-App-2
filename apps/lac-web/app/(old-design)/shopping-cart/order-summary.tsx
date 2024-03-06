"use client";

import Separator from "@/old/_components/separator";
import useSimulationCheckout from "@/old/_hooks/cart/use-simulation-checkout.hook";
import { formatNumberToPrice } from "@/old/_utils/helpers";
import Link from "next/link";

const OrderSummary = () => {
  const { data } = useSimulationCheckout();

  return (
    <div>
      <div className="mb-2 rounded-sm p-5 pt-4 shadow-md">
        <h4 className="font-wurth text-xl font-medium leading-6">
          Order Summary
        </h4>

        <Separator
          orientation="horizontal"
          className="mb-3.5 mt-2 h-px w-full bg-black"
        />

        <div className="text-brand-gray-500 space-y-2 text-sm leading-5 [&>div]:flex [&>div]:flex-row [&>div]:items-center [&>div]:justify-between [&>div]:gap-4">
          <div>
            <div>{data?.["total-quantity"]} Items</div>

            <div className="font-bold">${data?.net}</div>
          </div>

          <div>
            <div>Shipping & Handling Fee</div>

            <div>${data?.shippingcost}</div>
          </div>

          <Separator
            orientation="horizontal"
            className="bg-brand-gray-200 h-px w-full"
          />

          <div>
            <div>Subtotal</div>

            <div>
              ${formatNumberToPrice((data?.total ?? 0) - (data?.tax ?? 0))}
            </div>
          </div>

          <div>
            <div>Sales Tax</div>

            <div>${data?.tax}</div>
          </div>

          <Separator
            orientation="horizontal"
            className="bg-brand-gray-200 h-0.5 w-full"
          />

          <div className="text-[15px] font-bold">
            <div>Total</div>

            <div>${data?.total}</div>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="bg-brand-secondary font-wurth grid h-[42px] place-items-center items-center rounded-sm text-xl font-extrabold uppercase leading-none text-white"
      >
        Continue
      </Link>
    </div>
  );
};

export default OrderSummary;
