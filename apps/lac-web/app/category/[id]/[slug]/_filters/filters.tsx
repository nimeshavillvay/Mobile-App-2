import { api } from "@/_lib/api";
import FiltersSelector from "./filters-selector";

type FiltersProps = {
  id: string;
};

const Filters = async ({ id }: FiltersProps) => {
  const headings = await api
    .get(`pim/webservice/rest/productlandingattributeheading/${id}`, {
      next: {
        revalidate: 3600,
      },
    })
    .json<{
      attribute_heading: {
        attribute_name: string;
        name: string;
      }[];
    }>();

  const sections = await Promise.all(
    headings.attribute_heading.map(async (heading) => {
      const values = await api
        .get(
          `pim/webservice/rest/productlandingattributevalues/${id}/${heading.attribute_name}`,
          {
            next: {
              revalidate: 3600,
            },
          },
        )
        .json<{
          attribute_values: {
            isActive: boolean;
            attribute_value: string;
            name: string;
            attribute_name: string;
            id: string;
            slug: string;
          }[];
        }>();

      return {
        id: heading.attribute_name,
        heading: heading.name,
        values: values.attribute_values.map((item) => ({
          id: item.id,
          name: item.name,
          isActive: item.isActive,
        })),
      };
    }),
  );

  return <FiltersSelector sections={sections} />;
};

export default Filters;
