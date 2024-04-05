const RELATED_SEARCHES = [
  "Decorative Fillers",
  "Island Turnings",
  "Onlays",
  "Outlet Plates",
  "Hardwood Dowels",
];

const RelatedSearches = () => {
  return (
    <section className="container my-14 space-y-6 md:my-20">
      <h2 className="text-center font-title text-3xl font-medium tracking-[-0.01875rem] text-black md:text-left">
        Related Searches
      </h2>

      <ul className="flex flex-row flex-wrap items-center justify-center gap-3 md:justify-start">
        {RELATED_SEARCHES.map((search) => (
          <li
            key={search}
            className="rounded-full bg-wurth-gray-50 px-4 py-2.5 text-sm font-medium text-black"
          >
            {search}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedSearches;
