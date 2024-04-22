"use client";

import useSelectedAddress from "@/old/_hooks/account/use-selected-address.hook";

const SelectedShippingName = () => {
  const address = useSelectedAddress();

  return (
    <div className="text-sm font-bold text-black md:font-normal md:text-brand-gray-500">
      {address?.name ?? "N/A"}
    </div>
  );
};

export default SelectedShippingName;
