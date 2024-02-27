"use client";

import { useSearchParams } from "next/navigation";
import { type ComponentProps } from "react";
import FiltersBase from "./filters-base";

type FiltersProps = {
  colors: ComponentProps<typeof FiltersBase>["colors"];
  sections: ComponentProps<typeof FiltersBase>["sections"];
};

const Filters = ({ colors, sections }: FiltersProps) => {
  const searchParams = useSearchParams();

  return (
    <FiltersBase
      colors={colors}
      sections={sections}
      searchParams={searchParams}
    />
  );
};

export default Filters;
