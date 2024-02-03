import Breadcrumbs from "@/_components/breadcrumbs";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import type { Metadata } from "next";
import Filters from "./filters";

export const metadata: Metadata = {
  title: "Laminate Finder",
};

const LaminateFinderPage = async () => {
  const [colors, attributeHeadings] = await Promise.all([
    api("pim/webservice/rest/laminatefinder/colorpicker/colors", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    }).json<{
      laminateColors: {
        id: number;
        color_code: string;
        is_color_disable: boolean;
      }[];
    }>(),
    api("pim/webservice/rest/laminatefinderattributeheading", {
      searchParams: new URLSearchParams({
        laminateFinder: "true",
      }),
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    }).json<{
      attribute_heading: {
        attribute_name: string;
        name: string;
      }[];
    }>(),
  ]);

  const attributeValues = await Promise.all(
    attributeHeadings.attribute_heading.map((heading) =>
      api
        .get(
          `pim/webservice/rest/laminatefinderattributevalues/${heading.attribute_name}`,
          {
            searchParams: new URLSearchParams({
              laminateFinder: "true",
            }),
            next: { revalidate: DEFAULT_REVALIDATE },
          },
        )
        .json<{
          attribute_values: {
            isActive: boolean;
            image: null | string;
            attribute_value: string;
            name: string;
            attribute_name: string;
            id: string;
            slug: string;
          }[];
        }>(),
    ),
  );

  const filterSections = attributeHeadings.attribute_heading.map(
    (heading, index) => ({
      ...heading,
      type: (attributeValues[index]?.attribute_values.some(
        (attribute) => !!attribute.image,
      )
        ? "icons"
        : "default") as "icons" | "default",
      values: attributeValues[index]?.attribute_values ?? [],
    }),
  );

  return (
    <>
      <Breadcrumbs
        links={[{ href: "/laminate-finder", label: "Laminate Finder" }]}
      />

      <h1 className="max-w-desktop mx-auto">Laminate Finder</h1>

      <div className="max-w-desktop mx-auto flex flex-row gap-8">
        <Filters
          colors={colors.laminateColors.map((color) => ({
            id: color.id,
            colorCode: color.color_code,
            disabled: color.is_color_disable,
          }))}
          filterSections={filterSections}
        />

        <div>content</div>
      </div>
    </>
  );
};

export default LaminateFinderPage;
