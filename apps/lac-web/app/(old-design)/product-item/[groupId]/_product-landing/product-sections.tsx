"use client";

import { cn } from "@/_utils/helpers";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type SectionType =
  | "variations"
  | "details"
  | "accessories-and-related-products"
  | "documents"
  | "faq";

const visibleSectionAtom = atom<SectionType>("variations");

export const Root = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <div>{children}</div>
    </Provider>
  );
};

export const Headings = () => {
  const pathname = usePathname();
  const visibleSection = useAtomValue(visibleSectionAtom);

  const headings: { label: string; id: SectionType }[] = [
    {
      label: "Variations",
      id: "variations",
    },
    {
      label: "Product Details",
      id: "details",
    },
    {
      label: "Accessories & Related Products",
      id: "accessories-and-related-products",
    },
    {
      label: "Documents",
      id: "documents",
    },
    {
      label: "FAQs",
      id: "faq",
    },
  ];

  return (
    <div className="border-b-brand-gray-200 sticky top-0 z-10 flex flex-row gap-16 border-b bg-white py-4">
      {headings.map((heading) => (
        <Link
          key={heading.id}
          href={`${pathname}#${heading.id}`}
          className={cn(
            "text-lg font-bold leading-6",
            visibleSection === heading.id
              ? "text-brand-primary underline underline-offset-2"
              : "text-brand-gray-400",
          )}
        >
          {heading.label}
        </Link>
      ))}
    </div>
  );
};

export const Section = ({
  sectionType,
  heading,
  children,
}: {
  sectionType: SectionType;
  heading: string;
  children: ReactNode;
}) => {
  const setVisibleSection = useSetAtom(visibleSectionAtom);
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setVisibleSection(sectionType);
      }
    },
  });

  return (
    <section
      id={sectionType}
      ref={ref}
      className="scroll-mt-[57px] pb-16 pt-2.5"
    >
      <h2 className="text-brand-primary font-wurth mb-6 text-[28px] font-medium leading-8">
        {heading}
      </h2>

      {children}
    </section>
  );
};
