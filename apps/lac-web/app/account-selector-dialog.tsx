"use client";

import FullscreenLoading from "@/_components/fullscreen-loading";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useAccountNo from "@/_hooks/account/use-account-no.hook";
import useAccountSelectorDialog from "@/_hooks/account/use-account-selector-dialog.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import { FaCheck } from "react-icons/fa";

const AccountSelectorDialog = () => {
  const id = useId();
  const rememberId = `remember-${id}`;

  const open = useAccountSelectorDialog((state) => state.open);
  const setOpen = useAccountSelectorDialog((state) => state.setOpen);

  const [cookies, setCookies] = useCookies();
  const accountListQuery = useAccountList();
  const [localAccountNo, setLocalAccountNo] = useAccountNo();
  const [localAddressId, setLocalAddressId] = useAddressId();
  const [accountNo, setAccountNo] = useState(localAccountNo);
  const [addressId, setAddressId] = useState(localAddressId);

  const accountSelectMutation = useMutation({
    mutationFn: ({
      accountNo,
      shipTo,
    }: {
      accountNo: string;
      shipTo: string;
    }) =>
      api
        .post("am/account-select", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({ accountNo, "ship-to": shipTo }),
        })
        .json<{
          permission: string;
          token: string;
        }>(),
    onSuccess: (data, { accountNo, shipTo }) => {
      setCookies("account-token", data.token);
      setLocalAccountNo(accountNo);
      setLocalAddressId(shipTo);
      setOpen(false);
    },
  });

  const onAccountNoChange = (accountNo: string) => {
    const account = accountListQuery.data?.accounts.find(
      (account) => account["account-no"] === accountNo,
    );

    if (account) {
      setAccountNo(accountNo);

      // If the account has only 1 address select it automatically
      if (
        account.addresses.length === 1 &&
        account.addresses[0]?.["address-id"]
      ) {
        setAddressId(account.addresses[0]["address-id"]);
      } else {
        setAddressId("");
      }
    }
  };

  useEffect(() => {
    // Used to sync the state with localstorage when the dialog opens
    setAccountNo(localAccountNo);
    setAddressId(localAddressId);
  }, [localAccountNo, localAddressId]);

  if ((accountListQuery.isLoading || accountSelectMutation.isPending) && open) {
    return <FullscreenLoading />;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          <Dialog.Title>Account & Shipping Address</Dialog.Title>

          <Dialog.Description className="flex flex-col">
            <span>Choose your account and shipping address</span>

            <span>Access My Account</span>
          </Dialog.Description>

          <RadioGroup.Root value={accountNo} onValueChange={onAccountNoChange}>
            {accountListQuery.data?.accounts?.map((account) => (
              <div key={account["account-no"]}>
                <div className="flex flex-row">
                  <RadioGroup.Item
                    value={account["account-no"]}
                    id={`account-${account["account-no"]}`}
                    className="data-[state=checked]:border-brand-secondary data-[state=checked]:bg-brand-secondary h-[25px] w-[25px] rounded-full border border-black bg-white"
                  >
                    <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-white after:content-['']" />
                  </RadioGroup.Item>

                  <div>
                    <Label.Root htmlFor={`account-${account["account-no"]}`}>
                      {account.name} # {account["account-no"]}
                    </Label.Root>

                    {account.addresses.length > 1 && (
                      <div>Multiple shipping addresses</div>
                    )}
                  </div>
                </div>

                {account.addresses.length > 1 && (
                  <RadioGroup.RadioGroup
                    value={addressId}
                    onValueChange={setAddressId}
                    className="pl-5"
                  >
                    {account.addresses.map((address) => (
                      <div
                        key={address["address-id"]}
                        className="flex flex-row"
                      >
                        <RadioGroup.Item
                          value={address["address-id"]}
                          id={`address-${address["address-id"]}`}
                          className="data-[state=checked]:border-brand-secondary data-[state=checked]:bg-brand-secondary h-[25px] w-[25px] rounded-full border border-black bg-white"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-white after:content-['']" />
                        </RadioGroup.Item>

                        <div>
                          <Label.Root
                            htmlFor={`address-${address["address-id"]}`}
                          >
                            # {address["address-id"]}
                          </Label.Root>

                          <div>{address.name},</div>
                          <div>{address["street-address"]},</div>
                          <div>
                            {address.locality}, {address.region},{" "}
                            {address["postal-code"]}, {address["country-name"]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup.RadioGroup>
                )}
              </div>
            ))}
          </RadioGroup.Root>

          <div className="flex flex-row items-center gap-2">
            <Checkbox.Root
              className="data-[state=checked]:bg-brand-secondary data-[state=checked]:border-brand-secondary grid h-[25px] w-[25px] place-items-center border border-black"
              id={rememberId}
            >
              <Checkbox.Indicator className="text-white">
                <FaCheck />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <Label.Root htmlFor={rememberId} className="capitalize">
              Remember my setting
            </Label.Root>
          </div>

          <button
            className="bg-brand-primary p-2 uppercase text-white"
            onClick={() =>
              accountSelectMutation.mutate({ accountNo, shipTo: addressId })
            }
            disabled={!accountNo || !addressId}
          >
            Continue
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AccountSelectorDialog;
