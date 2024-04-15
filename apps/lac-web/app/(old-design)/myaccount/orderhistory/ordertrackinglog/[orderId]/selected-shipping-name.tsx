"use client";

import useSelectedAddress from "@/old/_hooks/account/use-selected-address.hook";

const SelectedShippingName = () => {
  const address = useSelectedAddress();

  return <div className="text-sm">{address?.name ?? "N/A"}</div>;
};

export default SelectedShippingName;
