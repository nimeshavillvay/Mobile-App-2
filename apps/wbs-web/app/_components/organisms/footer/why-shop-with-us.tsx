"use client";

import { usePathname } from "next/navigation";
import { REASONS } from "./constants";

type WhyShopWithUsProps = {
  readonly title?: string;
  readonly description?: string;
  readonly reasons?: readonly {
    readonly title: string;
    readonly description: string;
    readonly Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};
const WhyShopWithUs = ({
  title = "Why Shop With Us?",
  description,
  reasons = REASONS,
}: WhyShopWithUsProps) => {
  const currentPage = usePathname();
  const isShowWhyShopWithUs =
    currentPage === "/" ||
    !!["/category", "/product"].find((publicPage) =>
      currentPage.startsWith(publicPage),
    );

  if (!isShowWhyShopWithUs) {
    return null;
  }
  return (
    <section
      className="container space-y-6 pb-3 md:space-y-12 md:pb-9"
      data-testid="whyshopwithus"
    >
      <h2 className="text-center font-title text-3xl font-medium capitalize tracking-[-0.3px] text-black md:text-5xl md:tracking-[-0.576px]">
        {title}
      </h2>

      <p className="mt-2 text-center text-base text-wurth-gray-800 md:mt-6 md:text-lg">
        {description}
      </p>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        {reasons.map(({ title, Icon, description }, index) => (
          <li
            key={title}
            className="space-y-3 rounded-lg bg-sky-50 p-5 md:space-y-5 md:p-6"
            data-testid={`reason-${index}`}
          >
            <div className="flex max-w-full flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div className="w-fit rounded bg-[linear-gradient(306deg,#00ADEF_3.23%,#C3CF23_125.64%)] p-3 md:rounded-md">
                <Icon className="stroke-white md:size-12" />
              </div>

              <h3 className="text-clip break-words font-title text-2xl uppercase leading-7 tracking-[-0.12px] text-wurth-blue-450 md:text-[1.75rem] md:leading-8 md:tracking-[-0.14px]">
                {title}
              </h3>
            </div>

            <p className="text-sm font-medium text-black md:text-base">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyShopWithUs;
