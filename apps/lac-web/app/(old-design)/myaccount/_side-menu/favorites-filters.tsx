//TODO: the following import needs to be used with the functionality
// import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import FiltersDropdown from "./filters-dropdown";

// TODO: the following method must be passed with a token
const FavoritesFilters = () => {
  // TODO: This feature is not supported
  // const filtersQuery = useSuspenseFilters(token, {
  //   type: "Favorites",
  //   id: "0", // TODO: Replace this with favorites list id
  // });
  return <FiltersDropdown filters={[]} />;
};

export default FavoritesFilters;
