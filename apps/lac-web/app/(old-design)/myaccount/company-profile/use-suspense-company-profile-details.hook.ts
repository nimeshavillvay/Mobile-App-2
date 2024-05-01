import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CompanyDetails } from "./types";

type CompanyDetailsResponse = {
  company_name: string;
  image: string;
};

const transformCompanyDetails = (
  address: CompanyDetailsResponse,
): CompanyDetails => ({
  companyName: address["company_name"],
  image: address["image"],
});

const useSuspenseCompanyProfileDetails = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "company-profile", token],
    queryFn: () =>
      api
        .get("rest/osrdetails", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .json<CompanyDetailsResponse>(),
    select: (companyDetails: CompanyDetailsResponse) =>
      transformCompanyDetails(companyDetails),
  });
};

export default useSuspenseCompanyProfileDetails;
