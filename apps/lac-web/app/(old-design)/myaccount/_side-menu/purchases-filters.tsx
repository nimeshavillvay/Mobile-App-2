import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { useSearchParams } from "next/navigation";
import { INIT_FROM_DATE, INIT_TO_DATE } from "./constants";
import FiltersDropdown from "./filters-dropdown";

type PurchasesFiltersProps = {
  readonly token: string;
};

const PurchasesFilters = ({ token }: PurchasesFiltersProps) => {
  const searchParams = useSearchParams();

  const fromDate = searchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = searchParams.get("to") ?? INIT_TO_DATE;

  const filtersQuery = useSuspenseFilters(token, {
    type: "Purchases",
    from: fromDate,
    to: toDate,
  });

  return <FiltersDropdown filters={filtersQuery.data} />;
};

export default PurchasesFilters;
