"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import { useState } from "react";
import { CategoriesGrid } from "./categories-grid";
import type { SubCategory } from "./types";

const SubCategoriesCollapsible = ({
  hiddenSubCategories,
}: {
  readonly hiddenSubCategories: SubCategory[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible
      className="flex flex-col gap-6 space-y-6 md:space-y-9"
      open={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <CollapsibleContent asChild>
        <CategoriesGrid categories={hiddenSubCategories} />
      </CollapsibleContent>

      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="self-center py-2.5 font-bold text-black"
        >
          {isExpanded ? "Show less" : "Show all"}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default SubCategoriesCollapsible;
