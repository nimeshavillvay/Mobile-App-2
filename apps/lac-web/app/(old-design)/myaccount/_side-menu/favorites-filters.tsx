import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import FiltersDropdown from "./filters-dropdown";

const FavoritesFilters = ({ token }: { token: string }) => {
  // TODO: This feature is not supported
  // const filtersQuery = useSuspenseFilters(token, {
  //   type: "Favorites",
  //   id: "0", // TODO: Replace this with favorites list id
  // });
  // return <FiltersDropdown filters={filtersQuery.data} />;
};

export default FavoritesFilters;
