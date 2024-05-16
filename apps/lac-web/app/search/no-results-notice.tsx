"use client";

const NoResultsNotice = () => {
  return (
    <div className="max-w-500px max-h-200px mx-auto flex flex-col items-center justify-center pb-[250px] pt-[10px]">
      <h1 className="mb-4 text-3xl font-bold">No results</h1>
      <h4>Sorry, no results were found for your search term.</h4>
    </div>
  );
};

export default NoResultsNotice;
