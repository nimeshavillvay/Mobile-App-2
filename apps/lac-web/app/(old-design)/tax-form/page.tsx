import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import type { Metadata } from "next";
import { getTaxFormDetails } from "./apis";
import Map from "./map";
import StateSelector from "./state-selector";

export const metadata: Metadata = {
  title: "Sales Tax And Exemption",
};

const SalesTaxAndExemptionPage = async () => {
  const taxFormDetails = await getTaxFormDetails();

  return (
    <div className="container mt-7">
      <div className="flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">
          Sales Tax (Exemption Certificates)
        </Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="mt-4">
        <b>Sales taxes are charged in the following states:&nbsp;</b>
        You can download the PDF form by clicking on your state or selecting it
        from the dropdown
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-3">
          <Map taxFormDetails={taxFormDetails} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <StateSelector taxFormDetails={taxFormDetails} />
        </div>
      </div>

      <div>
        If your state is not displayed, please call (800) 444-0043 Option 2 for
        more information
      </div>
    </div>
  );
};

export default SalesTaxAndExemptionPage;
