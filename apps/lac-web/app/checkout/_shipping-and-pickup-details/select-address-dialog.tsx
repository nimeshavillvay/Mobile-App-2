import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
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
import { useState } from "react";
import AddShippingAddressDialog from "./add-shipping-address-dialog";

type SelectAddressDialogProps = {
  readonly token: string;
};

const SelectAddressDialog = ({ token }: SelectAddressDialogProps) => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const { toast } = useToast();

  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const cartQuery = useSuspenseCart(token);

  const [addressId, setAddressId] = useState(
    cartQuery.data.configuration.shippingAddressId ?? "",
  );

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const handleConfirm = () => {
    updateCartConfigMutation.mutate(
      {
        shippingAddressId: addressId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Address selected",
          });
          setOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="max-w-fit font-bold shadow-md">
            Change Address
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
                    address.xcAddressId === addressId && "border-black",
                  )}
                  onClick={() => {
                    if (address.xcAddressId) {
                      setAddressId(address.xcAddressId);
                    }
                  }}
                >
                  {address.xcAddressId === addressId ? (
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
              variant="outline"
              className="max-w-fit font-bold shadow-md"
              onClick={() => {
                setOpenAdd(true);
                setOpen(false);
              }}
            >
              Add new address
            </Button>

            <Button
              className="font-bold"
              onClick={handleConfirm}
              disabled={updateCartConfigMutation.isPending}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddShippingAddressDialog
        open={openAdd}
        closeDialog={() => {
          setOpenAdd(false);
          setOpen(true);
        }}
      />
    </>
  );
};

export default SelectAddressDialog;
