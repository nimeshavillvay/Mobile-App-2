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
    <div className="sticky top-0 flex flex-row gap-2 bg-white">
      {headings.map((heading) => (
        <Link
          key={heading.id}
          href={`${pathname}#${heading.id}`}
          className={cn(
            visibleSection === heading.id
              ? "text-brand-primary"
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
    <section id={sectionType} ref={ref}>
      <h2 className="text-brand-primary">{heading}</h2>

      {children}
    </section>
  );
};
