import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
};

const CareersPage = () => {
  return (
    <>
      <section className="max-w-desktop mx-auto">
        {/* Navigation bar for company information pages */}
        <nav className="mb-6 flex text-lg font-bold uppercase">
          <Link
            href="/about-us"
            className="text-brand-gray-500 hover:text-brand-primary px-4 py-2 first:pl-0 hover:underline"
          >
            About Us
          </Link>

          <Link
            href="/careers"
            className="text-brand-primary px-4 py-2 underline first:pl-0"
          >
            Careers
          </Link>

          <Link
            href="/compliance"
            className="text-brand-gray-500 hover:text-brand-primary px-4 py-2 first:pl-0 hover:underline"
          >
            Compliance
          </Link>
        </nav>

        <h1>Careers</h1>
      </section>
    </>
  );
};

export default CareersPage;
