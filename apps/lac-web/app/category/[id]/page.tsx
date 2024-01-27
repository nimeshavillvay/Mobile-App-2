import Breadcrumbs from "@/_components/breadcrumbs";
import type { Metadata } from "next";
import { getCategory } from "./apis";

type CategoryPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: CategoryPageProps): Promise<Metadata> => {
  const category = await getCategory(id);

  return {
    title: category.main.catTitle,
  };
};

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const category = await getCategory(id);

  return (
    <>
      <Breadcrumbs id={id} type="category" />

      <h1>{category.main.catTitle}</h1>
    </>
  );
};

export default CategoryPage;
