import OGImage from "@/_lib/og-image";
import { getCategory } from "./apis";
import type { CategoryPageProps } from "./types";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";
export const contentType = "image/png";

const Image = async ({ params: { id, slug } }: CategoryPageProps) => {
  const category = await getCategory(id, slug);

  return OGImage({
    title: category.title,
    image: category.image,
  });
};

export default Image;
