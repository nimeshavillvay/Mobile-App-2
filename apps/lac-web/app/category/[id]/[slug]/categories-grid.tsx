import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { SubCategory } from "./types";

export const CategoriesGrid = ({
  categories,
  priorityImages = false,
}: {
  categories: SubCategory[];
  priorityImages?: boolean;
}) => {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/category/${category.id}/${category.slug}`}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src={category.image}
              alt={`An image of ${category.title}`}
              width={112}
              height={112}
              className="size-28 rounded-full object-contain"
              priority={priorityImages}
            />

            <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
              <Balancer>{category.title}</Balancer>
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
