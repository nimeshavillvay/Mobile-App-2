"use client";

import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import SelectAddressDialog from "./select-address-dialog";

type ShippingAndPickupDetailsProps = {
  token: string;
};

const ShippingAndPickupDetails = ({ token }: ShippingAndPickupDetailsProps) => {
  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const cartQuery = useSuspenseCart(token);

  const selectedAddress = shippingAddressListQuery.data.find(
    (address) =>
      address.xcAddressId === cartQuery.data.configuration.shippingAddressId,
  );

  return (
    <section className="flex flex-col gap-5 rounded-lg border border-wurth-gray-250 p-5 shadow-lg md:gap-6 md:p-6">
      <h2 className="font-title text-xl font-medium text-wurth-gray-800 md:text-2xl md:tracking-[-0.144px]">
        Shipping and Pickup Details
      </h2>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <h3 className="text-sm text-black">Shipping Address</h3>

            <div className="text-base text-wurth-gray-800">
              {selectedAddress?.streetAddress}, {selectedAddress?.county},
              <br />
              {selectedAddress?.locality}, {selectedAddress?.postalCode}-
              {selectedAddress?.zip4},
              <br />
              {selectedAddress?.countryName}
            </div>
          </div>

          <SelectAddressDialog token={token} />
        </div>
      </div>
    </section>
  );
};

export default ShippingAndPickupDetails;
