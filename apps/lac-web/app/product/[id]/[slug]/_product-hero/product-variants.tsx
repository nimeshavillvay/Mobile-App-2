import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import Check from "@repo/web-ui/components/icons/check";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import finish from "./finish.png";

type AttributeValue = {
  id: string;
  name: string;
  selected: boolean;
};
type ProductVariantsProps = {
  id: string;
  className?: string;
};

const ProductVariants = async ({ id, className }: ProductVariantsProps) => {
  const variants = await api
    .get(`rest/groupfilters/${id}`, {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      attributes: (
        | { name: string; type: "text"; values: AttributeValue[] }
        | {
            name: string;
            type: "icon";
            values: (AttributeValue & { icon: string })[];
          }
      )[];
      products: {
        productId: number;
        attributes: string[];
      }[];
    }>();

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      {variants.attributes.map((attribute) => (
        <div key={attribute.name} className="space-y-2">
          <h3 className="text-base text-wurth-gray-800">
            {attribute.name}:{" "}
            <span className="font-semibold">
              {attribute.values.find((value) => value.selected)?.name}
            </span>
          </h3>

          <nav className="flex flex-row flex-wrap items-center gap-2">
            {attribute.values.map((value) => (
              <Link
                key={value.id}
                href={`/product/123/item`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-fit rounded-lg border-2",
                  value.selected
                    ? "border-wurth-red-650 bg-red-50 hover:bg-red-100"
                    : "border-wurth-gray-150 bg-white",
                  attribute.type === "icon"
                    ? "relative p-1.5"
                    : "px-4 py-3 text-sm font-semibold",
                )}
              >
                {attribute.type === "icon" ? (
                  <>
                    <Image
                      src={finish}
                      alt={`A picture of the ${attribute.name} ${value.name}`}
                      width={52}
                      height={52}
                    />

                    {value.selected && (
                      <div className="absolute left-1/2 top-1/2 z-10 grid size-5 -translate-x-1/2 -translate-y-1/2 select-none place-items-center rounded-full border-2 border-wurth-gray-250 bg-wurth-red-650">
                        <Check className="size-3 stroke-white" />
                      </div>
                    )}

                    <span className="sr-only">{value.name}</span>
                  </>
                ) : (
                  value.name
                )}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </section>
  );
};

export default ProductVariants;
