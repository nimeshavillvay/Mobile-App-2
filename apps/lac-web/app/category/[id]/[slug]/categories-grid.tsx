import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import type { SubCategory } from "./types";

export const CategoriesGrid = ({
  categories,
  priorityImages = false,
}: {
  readonly categories: SubCategory[];
  readonly priorityImages?: boolean;
}) => {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/category/${category.id}/${category.slug}`}
            className="flex flex-col items-center gap-4"
          >
            <div className="grid size-28 place-items-center rounded-full bg-gradient-to-t from-[#EBEFF5] to-[#F7FAFF] md:size-[11.25rem]">
              <Image
                src={category.image}
                alt={`An image of ${category.title}`}
                width={127}
                height={127}
                className="size-[79px] object-contain mix-blend-multiply md:size-[127px]"
                priority={priorityImages}
              />
            </div>

            <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
              <Balancer>{category.title}</Balancer>
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
