import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { productLandingCategorySchema } from "~/lib/zod-schema/category";

export const getProductLandingCategory = async (
  { baseUrl, apiKey }: ApiConfig,
  id: string,
) => {
  const response = await api
    .get(`rest/productlandingcategory/${id}`, {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse =
    await productLandingCategorySchema.parseAsync(response);

  return {
    mainCategory: {
      id: Number(parsedResponse.main.catId),
      type: parsedResponse.main.type,
      title: parsedResponse.main.catTitle,
      description: parsedResponse.main.description,
      additionalDescription: parsedResponse.main.additional_description,
      image: parsedResponse.main.Image,
      slug: parsedResponse.main.slug,
      subCategories: parsedResponse.main.subCatgores.map(
        ({ SubCatId, SubCatTitle, slug, Image }) => ({
          id: Number(SubCatId),
          title: SubCatTitle,
          slug: slug,
          image: Image ?? null,
        }),
      ),
    },
  };
};
