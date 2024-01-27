import useAccountList from "@/_hooks/account/use-account-list.hook";
import useAccountNo from "@/_hooks/account/use-account-no.hook";
import useAccountSelectorDialog from "@/_hooks/account/use-account-selector-dialog.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId } from "react";
import { FaCheck } from "react-icons/fa";

const AccountSelectorDialog = () => {
  const id = useId();
  const rememberId = `remember-${id}`;

  const open = useAccountSelectorDialog((state) => state.open);
  const setOpen = useAccountSelectorDialog((state) => state.setOpen);

  const accountListQuery = useAccountList();
  const [accountNo, setAccountNo] = useAccountNo();
  const [addressId, setAddressId] = useAddressId();

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
            onClick={() => setOpen(false)}
          >
            Continue
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AccountSelectorDialog;
