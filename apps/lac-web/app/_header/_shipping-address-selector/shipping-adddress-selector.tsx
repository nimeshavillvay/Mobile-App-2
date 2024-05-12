"use client";

import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useUpdateShippingAddressMutation from "@/_hooks/address/use-update-shipping-address-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Truck } from "@repo/web-ui/components/icons/truck";
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
import { useState } from "react";

type ShippingAddressSelectorProps = {
  token: string;
};

const ShippingAddressSelector = ({ token }: ShippingAddressSelectorProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return null;
  }

  return <ShippingAddressSelectorButton token={token} />;
};

export default ShippingAddressSelector;

const ShippingAddressSelectorButton = ({ token }: { token: string }) => {
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
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-fit px-0 py-0 text-sm font-medium leading-5"
        >
          <Truck width={16} height={16} />

          <span>
            #{defaultAddress?.shipTo}, {defaultAddress?.soldTo}
          </span>
        </Button>
      </DialogTrigger>

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
                  {address.streetAddress}, {address.locality},{" "}
                  {address.postalCode}-{address.zip4}
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
