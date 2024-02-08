"use client";

import { useSearchParams } from "next/navigation";
import FiltersBase from "./filters-base";
import type { FilterSection } from "./types";

type FiltersProps = {
  sections: FilterSection[];
};

const Filters = ({ sections }: FiltersProps) => {
  const searchParams = useSearchParams();

  return <FiltersBase sections={sections} searchParams={searchParams} />;
};

export default Filters;
