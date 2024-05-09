"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import type { PaymentMethod } from "@/_lib/types";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import { useId } from "react";
import AddCreditCardDialog from "./add-credit-card-dialog";
import useSuspenseCreditCards from "./use-suspense-credit-cards.hook";

type BillingAndPaymentInfoProps = {
  token: string;
  paymentMethods: PaymentMethod[];
};

const BillingAndPaymentInfo = ({
  token,
  paymentMethods,
}: BillingAndPaymentInfoProps) => {
  const id = useId();
  const getId = (code: string) => {
    return `${code}-${id}`;
  };

  const cartQuery = useSuspenseCart(token);
  useSuspenseCreditCards(token);

  const availablePaymentMethodIds =
    cartQuery.data.configuration.avail_payment_options.split(",");
  const mappedPaymentMethods = paymentMethods.filter((paymentMethod) =>
    availablePaymentMethodIds.includes(paymentMethod.code),
  );

  const showCreditCards = !!mappedPaymentMethods.find(
    (paymentMethod) => paymentMethod.isCreditCard,
  );
  const otherPaymentMethods = mappedPaymentMethods.filter(
    (paymentMethod) => !paymentMethod.isCreditCard,
  );

  return (
    <section className="flex flex-col gap-6 rounded-lg border border-wurth-gray-250 p-5 shadow-lg md:p-6">
      <h2 className="font-title text-xl font-medium text-wurth-gray-800 md:text-2xl md:tracking-[-0.144px]">
        Billing and Payment Info
      </h2>

      <div className="flex flex-col gap-5 md:gap-4">
        <h3 className="text-sm text-black">Payment method</h3>

        <RadioGroup asChild>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {otherPaymentMethods.map((paymentMethod) => (
              <li
                key={paymentMethod.code}
                className="flex min-h-[4.75rem] flex-row items-center gap-3 rounded-lg border-2 border-wurth-gray-150 p-4"
              >
                <RadioGroupItem
                  value={paymentMethod.code}
                  id={getId(paymentMethod.code)}
                />

                <Label
                  htmlFor={getId(paymentMethod.code)}
                  className="text-base font-normal text-wurth-gray-800"
                >
                  {paymentMethod.name}
                </Label>
              </li>
            ))}
          </ul>
        </RadioGroup>

        <AddCreditCardDialog token={token} />
      </div>
    </section>
  );
};

export default BillingAndPaymentInfo;
