import productImage from "@/_assets/images/product-item-image.png";
import { cn } from "@/_lib/utils";
import Check from "@repo/web-ui/components/icons/check";
import ChevronLeft from "@repo/web-ui/components/icons/chevron-left";
import Save from "@repo/web-ui/components/icons/save";
import Truck from "@repo/web-ui/components/icons/truck";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import AddToCart from "./add-to-cart";
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
const SPECIFICATIONS = [
  { name: "Brand", value: "CompX" },
  { name: "Item #", value: "NC8053-346A-4G" },
  { name: "Model #", value: "C8053-C346A-4G" },
  { name: "Product Type", value: "Cylinder Cam Lock" },
  { name: "Priced By", value: "each" },
  { name: "Sold in Multiples of", value: "1" },
  { name: "Cylinder Diameter", value: '3/4"' },
];

type ProductPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

export const generateMetadata = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params,
}: ProductPageProps): Promise<Metadata> => {
  return {
    title:
      "8102 Pin Tumbler Cylinder Cam Lock for Lipped/Overlay Application, Dull Chrome, Keyed to C101 Key",
  };
};

const ProductPage = () => {
  return (
    <>
      <div className="container my-4 md:hidden">
        <Link
          href="/cam-locks"
          className={buttonVariants({
            variant: "link",
            className: "h-fit gap-1 p-0",
          })}
        >
          <ChevronLeft className="size-4" />

          <span>Cam Locks</span>
        </Link>
      </div>

      <Breadcrumb className="container mb-6 mt-3 hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Catches & Locks</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Locks</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Cams Locks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container my-2 flex flex-row items-center gap-2">
        <div className="text-sm font-normal text-black">
          Shop <span className="font-semibold">Blum</span>
        </div>

        <div className="rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450">
          Flash Deal
        </div>

        <div className="rounded bg-green-50 px-2 py-0.5 text-base text-green-700">
          <span className="font-semibold">30%</span> off
        </div>
      </div>

      <h1 className="container my-2 font-title text-2xl font-medium tracking-[-0.009rem] text-wurth-gray-800">
        <Balancer>
          CompX 8053 Disc Tumbler Cylinder Cam Lock with FlexaCam, Antique
          Brass, Keyed to C346A Key
        </Balancer>
      </h1>

      <div className="container my-2 flex flex-row items-center gap-2 text-sm font-normal text-wurth-gray-800">
        <div>
          Item # <span className="font-medium">B71T555</span>
        </div>

        <span className="select-none">•</span>

        <div>
          Model # <span className="font-medium">B71T555</span>
        </div>
      </div>

      <p className="container my-2 text-base text-wurth-gray-500">
        <Balancer>
          Lorem ipsum dolor sit amet consectetur. Curabitur diam urna faucibus
          quisque. Pretium lectus morbi justo amet amet quisque ipsum elementum
          ut.
        </Balancer>
      </p>

      <Carousel className="mb-10 mt-5">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={productImage}
                alt="A placeholder image"
                className="aspect-1 object-contain"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots className="mt-1" />
      </Carousel>

      <section className="container my-6 space-y-3">
        <div className="flex flex-row items-end gap-1 space-y-3 text-lg leading-6 text-wurth-gray-800">
          <div className="font-semibold leading-none">
            $<span className="font-title text-[1.75rem] leading-8">8.33</span>
          </div>

          <div className="text-wurth-gray-400 line-through">$18.32</div>

          <div>
            <span className="text-sm font-semibold">/</span>
            <span className="font-title leading-none">pair</span>
          </div>

          <div className="font-semibold text-green-700">You save $0</div>
        </div>

        <div className="grid grid-cols-2 gap-0.5">
          {[
            { items: "25-99", price: 8.06, uom: "pair" },
            { items: "100+", price: 7.75, uom: "pair" },
          ].map((item) => (
            <div
              key={item.items}
              className="rounded-lg bg-wurth-gray-50 px-4 py-3 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none"
            >
              <h5 className="text-sm font-medium text-wurth-gray-800">
                {item.items} items
              </h5>

              <div className="text-sm font-semibold leading-none text-wurth-gray-800">
                <span className="text-base font-bold leading-6">
                  ${item.price}
                </span>
                /{item.uom}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-6 flex flex-col gap-6">
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
                      ? "border-wurth-red-650 bg-red-50"
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

      <AddToCart />

      <section className="container my-6">
        <div className="p-4 flex flex-row gap-2 bg-wurth-gray-50 rounded-lg">
          <Truck className="size-4 mt-1 shrink-0" />

          <div className="space-y-1 flex-1">
            <h4 className="text-wurth-gray-800 text-base font-semibold">
              Drop Ship Item
            </h4>

            <p className="text-wurth-gray-500 text-sm leading-6">
              This item ships directly from the vendor. Additional freight
              charges may apply.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-10 text-wurth-gray-800">
        <h2 className="font-title text-2xl font-medium tracking-[-0.144px] mb-4">
          Product Details
        </h2>

        <div className="text-base leading-7 font-normal space-y-7 mb-6">
          <p>
            For drawers, right-hand or left-hand doors with lipped/overlay
            construction (straight cam) or flush construction (formed cam). For
            overlay application, the combined thickness of front and frame
            cannot exceed the cylinder length.
          </p>

          <div>
            <h3 className="font-semibold leading-6">Features</h3>

            <ul className="list-disc list-inside pl-2">
              <li>90° cam turn</li>

              <li>Key removable in both locked and unlocked positions</li>

              <li>
                Will key together with all other disc tumbler locks using D8785
                key blank
              </li>

              <li>
                Supplied with two keys, trim washer, spur washer (for wood),
                mounting nut and two cams
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-yellow-50 px-4 py-2 flex flex-row items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 36 36"
            className="shrink-0"
          >
            <path
              fill="#F59E0B"
              d="M15.11 3.9c1.154-2 4.04-2 5.196 0l14.549 25.2c1.155 2-.289 4.5-2.598 4.5H3.158c-2.31 0-3.752-2.5-2.598-4.5L15.11 3.9z"
            />
            <path
              fill="#000"
              fillRule="evenodd"
              d="M27.142 18.142L33.816 29.7c.692 1.2-.174 2.7-1.56 2.7H3.159c-1.385 0-2.251-1.5-1.559-2.7l6.508-11.272V30.6h2.11v-5.678h1.142c.725 0 1.287-.17 1.685-.508.4-.338.675-.831.827-1.48.158-.655.236-1.446.236-2.373v-.303c0-.66-.044-1.24-.133-1.743-.09-.507-.24-.932-.45-1.276a1.997 1.997 0 00-.865-.777c-.363-.175-.82-.262-1.37-.262H9.394l6.755-11.7c.692-1.2 2.424-1.2 3.117 0l6.755 11.7h-4.02v7.184l1.996.162c0-.47.077-.818.229-1.044a.739.739 0 01.652-.34c.35 0 .575.143.677.429.101.28.152.652.152 1.116v3.64c0 .47-.062.82-.186 1.052-.119.232-.339.348-.66.348-.361 0-.59-.124-.686-.372-.096-.253-.144-.566-.144-.938v-1.562h-2.124v1.788c0 .599.099 1.12.296 1.562.204.436.522.776.957 1.019.434.237 1.001.356 1.7.356.695 0 1.245-.105 1.65-.316.407-.215.709-.539.906-.97.203-.437.336-.987.398-1.65.062-.664.093-1.443.093-2.339v-.291c0-1.068-.07-1.947-.211-2.637-.136-.69-.373-1.203-.711-1.537-.333-.335-.799-.502-1.396-.502-.328 0-.632.062-.915.186-.282.119-.476.28-.583.486V18.14h3.051zM15.11 3.9c1.155-2 4.042-2 5.197 0l14.549 25.2c1.155 2-.289 4.5-2.598 4.5H3.158c-2.31 0-3.752-2.5-2.598-4.5L15.11 3.9zm2.962 26.7c-.689 0-1.254-.099-1.694-.296a2.35 2.35 0 01-1.026-.87c-.243-.38-.412-.837-.508-1.375a11.268 11.268 0 01-.136-1.838v-5.778c0-1.07.125-1.915.373-2.533.249-.618.622-1.058 1.119-1.319.502-.26 1.135-.391 1.897-.391.661 0 1.204.114 1.627.344.43.229.749.604.958 1.126.209.517.316 1.212.322 2.086v.727h-2.119v-.288c0-.527-.017-.945-.05-1.254-.034-.314-.116-.538-.246-.671-.124-.139-.325-.208-.602-.208-.288 0-.505.072-.652.216-.141.138-.237.37-.288.695-.045.32-.068.756-.068 1.31v2.006a1.52 1.52 0 01.695-.487c.3-.117.63-.179.991-.184.678-.01 1.209.141 1.593.455.384.31.655.776.813 1.399.158.623.238 1.398.238 2.325v.775c0 .88-.094 1.62-.28 2.222-.18.597-.506 1.047-.974 1.35-.464.304-1.124.456-1.983.456zm0-1.862c.271 0 .483-.053.635-.16.153-.106.258-.287.314-.543.062-.261.093-.618.093-1.071v-1.335c0-.522-.03-.94-.093-1.254-.056-.314-.158-.544-.305-.687-.147-.144-.347-.216-.602-.216-.214 0-.403.037-.567.112-.158.069-.288.16-.39.271a.752.752 0 00-.178.368v2.541c0 .453.031.826.093 1.119.068.288.181.503.34.647.163.139.383.208.66.208zm-7.129-5.625h-.724v-5.228h.74c.446 0 .732.202.858.606.126.398.192.987.197 1.767v.278c0 .633-.026 1.14-.079 1.522-.047.376-.147.646-.299.81-.152.164-.383.245-.693.245z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-sm">
            Please be advised that product(s) you’re purchasing may have State
            of California Prop 65 warnings associated. For more information, go
            to www.P65Warnings.ca.gov.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Downloads</h3>

          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-3 border-wurth-gray-250 shadow-sm rounded-lg flex flex-col gap-2 max-w-full h-fit items-start"
              >
                <Save className="size-5 mt-1 shrink-0" />

                <div className="text-wrap text-left text-sm font-semibold text-wurth-gray-800">
                  ICS 10” Cabinet Saw Owners Manual V3
                </div>
              </Button>
            ))}
          </div>

          <Button variant="link" className="h-fit p-0 text-sm font-medium">
            View all downloads
          </Button>
        </div>
      </section>

      <section className="my-10 container space-y-4">
        <h2 className="font-title text-wurth-gray-800 text-2xl font-medium tracking-[-0.144px]">
          Specifications
        </h2>

        <table className="w-full">
          <tbody>
            {SPECIFICATIONS.map((specification) => (
              <tr
                key={specification.name}
                className="text-sm border-b border-b-wurth-gray-150"
              >
                <td className="w-1/2 px-2 py-3 text-wurth-gray-500">
                  {specification.name}
                </td>

                <td className="w-1/2 px-2 py-3 text-wurth-gray-800 font-semibold">
                  {specification.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ProductPage;
