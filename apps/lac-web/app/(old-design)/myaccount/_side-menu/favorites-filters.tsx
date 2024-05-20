//TODO: the following import needs to be used with the functionality
// import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import FiltersDropdown from "./filters-dropdown";

const FavoritesFilters = ({
  token,
  listId,
}: {
  token: string;
  listId: string;
}) => {
  const filtersQuery = useSuspenseFilters(token, {
    type: "Favorites",
    id: listId,
  });

  return <FiltersDropdown filters={filtersQuery.data} />;
};

export default FavoritesFilters;
