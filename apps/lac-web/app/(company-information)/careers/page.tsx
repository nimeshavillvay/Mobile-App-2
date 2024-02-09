import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import careersBanner from "./careers-banner.jpg";

export const metadata: Metadata = {
  title: "Careers",
};

const CareersPage = () => {
  return (
    <>
      <section className="max-w-desktop mx-auto min-h-[1024px]">
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

        {/* Section banner */}
        <div className="border-brand-gray-100 mb-8 border">
          <Image
            src={careersBanner}
            alt="The banner for careers page"
            placeholder="blur"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Section heading with line */}
        <div className="relative mb-4 flex">
          <h1
            tabIndex={0}
            className="text-brand-primary relative z-10 bg-white pr-2.5 text-2xl font-medium"
          >
            Careers
          </h1>

          <span className="border-b-brand-primary absolute bottom-3.5 z-0 block w-full border-b"></span>
        </div>

        {/* Careers content */}
        <div className="text-brand-gray-500 box-border text-base">
          <p tabIndex={0} className="mb-4">
            People are the indispensable element of Wurth Louis and Company - no
            matter what side of the business they are on. We are as passionate
            about our workforce as we are about our customers. If you&apos;re
            looking for a dynamic, growing company with real career advancement
            opportunities, consider becoming a part of our team.
          </p>

          <p tabIndex={0} className="mb-4">
            Review our open positions at our careers mini-site using the link
            below where you can upload your resume today!
          </p>

          <p tabIndex={0} className="mb-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://recruiting.ultipro.com/WUR1001WGNA/JobBoard/6e3d14dc-8c54-4ad8-8378-c52ee53cd531/?q=&o=postedDateDesc"
              className="text-[#007bff] hover:underline"
            >
              Go to the wurthlac.com Careers mini-site.
              <span className="sr-only">(opens in a new window)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
