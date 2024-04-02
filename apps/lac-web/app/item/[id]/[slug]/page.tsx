import productImage from "@/_assets/images/product-item-image.png";
import ChevronLeft from "@repo/web-ui/components/icons/chevron-left";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

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

        <div className="text-wurth-blue-450 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4">
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

      <section></section>
    </>
  );
};

export default ProductPage;
