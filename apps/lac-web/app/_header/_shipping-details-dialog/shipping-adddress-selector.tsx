"use client";

import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useUpdateShippingAddressMutation from "@/_hooks/address/use-update-shipping-address-mutation.hook";
import type { Token } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useState, type ReactNode } from "react";

type ShippingAddressSelectorProps = {
  readonly token: Token;
  readonly children: ReactNode;
};

const ShippingAddressSelector = ({
  token,
  children,
}: ShippingAddressSelectorProps) => {
  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const { toast } = useToast();

  const defaultAddress = shippingAddressListQuery.data.find(
    (address) => address.default,
  );

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    defaultAddress?.xcAddressId ?? "",
  );

  const updateShippingAddressMutation = useUpdateShippingAddressMutation();

  const changeDefaultAddress = () => {
    const address = shippingAddressListQuery.data.find(
      (address) => address.xcAddressId === selectedAddress,
    );

    if (address) {
      updateShippingAddressMutation.mutate(
        {
          shipTo: address.shipTo,
          default: true,
        },
        {
          onSuccess: () => {
            shippingAddressListQuery.refetch();
            setOpen(false);
            toast({
              title: "Changed selected address",
            });
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[34.375rem]">
        <DialogHeader>
          <DialogTitle>Change Shipping Address</DialogTitle>
        </DialogHeader>

        <ul className="flex flex-col gap-4">
          {shippingAddressListQuery.data.map((address) => (
            <li key={address.xcAddressId}>
              <Button
                variant="outline"
                className={cn(
                  "h-fit w-full justify-start rounded-lg border-2 border-wurth-gray-150 px-4 py-4",
                  address.xcAddressId === selectedAddress && "border-black",
                )}
                onClick={() => setSelectedAddress(address.xcAddressId ?? "")}
                disabled={updateShippingAddressMutation.isPending}
              >
                {address.xcAddressId === selectedAddress ? (
                  <CheckCircleFilled
                    width={20}
                    height={20}
                    className="fill-black"
                  />
                ) : (
                  <CheckCircle
                    width={20}
                    height={20}
                    className="stroke-wurth-gray-150"
                  />
                )}

                <span className="text-base text-wurth-gray-800">
                  {address?.streetAddress && `${address?.streetAddress}, `}
                  {address?.locality && `${address?.locality}, `}
                  {address?.region && `${address?.region} `}
                  {address?.postalCode}
                  {address?.zip4 && `-${address.zip4}`}
                </span>
              </Button>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <Button
            className="font-bold"
            onClick={changeDefaultAddress}
            disabled={updateShippingAddressMutation.isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAddressSelector;
