"use client";

import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Shield } from "@repo/web-ui/components/icons/shield";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateCartConfigMutation from "./use-update-cart-config-mutation.hook";

const promoSchema = z.object({
  promo: z.string(),
});

const OrderSummary = () => {
  const id = useId();
  const promoId = `promo-${id}`;

  const [openPromo, setOpenPromo] = useState(false);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout();

  const savingsAmount =
    simulationCheckoutQuery.data.total -
    simulationCheckoutQuery.data.net -
    simulationCheckoutQuery.data.shippingcost -
    simulationCheckoutQuery.data.tax;

  const { register, handleSubmit } = useForm<z.infer<typeof promoSchema>>({
    resolver: zodResolver(promoSchema),
    values: {
      promo: simulationCheckoutQuery.data.configuration.coupon ?? "",
    },
  });

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const onSubmit = handleSubmit((data) => {
    updateCartConfigMutation.mutate({ coupon: data.promo });
  });

  return (
    <div className="gap-3 flex flex-col rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <h3 className=" font-title text-xl font-medium tracking-[-0.1px] text-wurth-gray-800">
        Order Summary
      </h3>

      <table className="w-full text-sm text-wurth-gray-800">
        <tbody>
          <tr>
            <td className="pb-1">
              Subtotal ({simulationCheckoutQuery.data["total-quantity"]} items)
            </td>

            <td className="pb-1 text-right">
              ${simulationCheckoutQuery.data.net.toFixed(2)}
            </td>
          </tr>

          {savingsAmount > 0 && (
            <tr>
              <td className="py-1">Savings</td>

              <td className="py-1 text-right font-medium text-green-700">
                -${savingsAmount.toFixed(2)}
              </td>
            </tr>
          )}

          <tr>
            <td className="py-1">Shipping</td>

            <td className="py-1 text-right">
              {simulationCheckoutQuery.data.shippingcost > 0
                ? `$${simulationCheckoutQuery.data.shippingcost.toFixed(2)}`
                : "Free"}
            </td>
          </tr>

          <tr>
            <td className="py-1">
              <Link href="/tax-form" className="underline">
                Sales Tax
              </Link>
            </td>

            <td className="py-1 text-right">
              ${simulationCheckoutQuery.data.tax.toFixed(2)}
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="pb-3 pt-1">
              <Collapsible.Root open={openPromo} onOpenChange={setOpenPromo}>
                <div className="flex flex-row items-center justify-between">
                  <div className="py-1 font-medium">Promo Code</div>

                  <Collapsible.Trigger asChild>
                    <Button
                      variant="subtle"
                      className="h-fit gap-1 px-2 py-0.5 font-bold"
                    >
                      {!openPromo ? (
                        <>
                          <Plus className="size-4" /> <span>Add</span>
                        </>
                      ) : (
                        "Close"
                      )}
                    </Button>
                  </Collapsible.Trigger>
                </div>

                <Collapsible.Content asChild>
                  <form
                    onSubmit={onSubmit}
                    className="mt-2 flex flex-row gap-2"
                  >
                    <Label className="sr-only" htmlFor={promoId}>
                      Promo Code
                    </Label>

                    <Input
                      {...register("promo")}
                      id={promoId}
                      type="text"
                      required
                      className="h-8"
                    />

                    <Button size="sm" type="submit">
                      Add
                    </Button>
                  </form>
                </Collapsible.Content>
              </Collapsible.Root>
            </td>
          </tr>

          <tr className="border-t border-t-wurth-gray-250">
            <td className="py-4 pb-1">Estimated total</td>

            <td className="py-4 pb-1 text-right text-base">
              ${simulationCheckoutQuery.data.total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        variant="secondary"
        size="lg"
        className="h-fit px-5 py-4 text-lg font-normal gap-2 w-full shadow-md rounded-lg"
      >
        <Shield className="size-5 stroke-white" />

        <span>Secure Checkout</span>
      </Button>
    </div>
  );
};

export default OrderSummary;
