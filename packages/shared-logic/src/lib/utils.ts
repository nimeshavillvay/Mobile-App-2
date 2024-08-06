import type { z } from "zod";
import type {
  BrandResultList,
  brandResultSchema,
  CategoryResultList,
  categoryResultSchema,
} from "~/lib/zod-schema/multisearch";

export const isCategoryResults = (
  categoryData: unknown,
): categoryData is CategoryResultList => {
  if (
    typeof categoryData == "object" &&
    typeof (categoryData as z.infer<typeof categoryResultSchema>[])[0]?.id ===
      "number" &&
    typeof (categoryData as z.infer<typeof categoryResultSchema>[])[0]
      ?.categoryName === "string"
  ) {
    return true;
  } else {
    return false;
  }
};

export const isBrandResults = (
  brandData: unknown,
): brandData is BrandResultList => {
  if (
    typeof brandData == "object" &&
    typeof (brandData as z.infer<typeof brandResultSchema>[])[0]?.id ===
      "number" &&
    typeof (brandData as z.infer<typeof brandResultSchema>[])[0]?.brandName ===
      "string"
  ) {
    return true;
  } else {
    return false;
  }
};
