import { cn } from "@/_lib/utils";
import Check from "@repo/web-ui/components/icons/check";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import finishBlack from "./finish-black.png";
import finishGold from "./finish-gold.png";
import finishSilver from "./finish-silver.png";

const ATTRIBUTES: ({ name: string; selected: string } & (
  | {
      type: "icons";
      values: { name: string; image: StaticImageData; selected: boolean }[];
    }
  | {
      type: "normal";
      values: { name: string; image: undefined; selected: boolean }[];
    }
))[] = [
  {
    name: "Finish",
    selected: "Antique Brass",
    type: "icons",
    values: [
      { name: "gold", image: finishGold, selected: true },
      { name: "silver", image: finishSilver, selected: false },
      { name: "black", image: finishBlack, selected: false },
    ],
  },
  {
    name: "Keyed As",
    selected: "C346A Key",
    type: "normal",
    values: [
      { name: "C346A Key", image: undefined, selected: true },
      {
        name: "Master Keyed/Keyed Different",
        image: undefined,
        selected: false,
      },
      { name: "D002A Key", image: undefined, selected: false },
      { name: "MK14A Key", image: undefined, selected: false },
      { name: "KD Key", image: undefined, selected: false },
      { name: "Keyed Different", image: undefined, selected: false },
    ],
  },
];

type ProductVariantsProps = {
  className?: string;
};

const ProductVariants = ({ className }: ProductVariantsProps) => {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      {ATTRIBUTES.map((attribute) => (
        <div key={attribute.name} className="space-y-2">
          <h3 className="text-base text-wurth-gray-800">
            {attribute.name}:{" "}
            <span className="font-semibold">{attribute.selected}</span>
          </h3>

          <nav className="flex flex-row flex-wrap items-center gap-2">
            {attribute.values.map((value) => (
              <Link
                key={value.name}
                href={"#"}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-fit rounded-lg border-2",
                  value.selected
                    ? "border-wurth-red-650 bg-red-50 hover:bg-red-100"
                    : "border-wurth-gray-150 bg-white",
                  attribute.type === "icons"
                    ? "relative p-1.5"
                    : "px-4 py-3 text-sm font-semibold",
                )}
              >
                {attribute.type === "icons" && value.image ? (
                  <>
                    <Image
                      src={value.image}
                      alt={value.name}
                      width={52}
                      height={52}
                    />

                    {value.selected && (
                      <div className="absolute left-1/2 top-1/2 z-10 grid size-5 -translate-x-1/2 -translate-y-1/2 select-none place-items-center rounded-full border-2 border-wurth-gray-250 bg-wurth-red-650">
                        <Check className="size-3 stroke-white" />
                      </div>
                    )}

                    <span className="sr-only">value</span>
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
