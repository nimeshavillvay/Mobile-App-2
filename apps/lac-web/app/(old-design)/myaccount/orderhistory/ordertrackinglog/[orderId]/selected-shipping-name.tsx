"use client";

import useSelectedAddress from "@/old/_hooks/account/use-selected-address.hook";

const SelectedShippingName = () => {
  // TODO: Need to remove old API once company profile is ready
  const address = useSelectedAddress();

  return (
    <div className="text-sm font-bold text-black md:font-normal md:text-brand-gray-500">
      {address?.streetAddress ?? "N/A"}
    </div>
  );
};

export default SelectedShippingName;
