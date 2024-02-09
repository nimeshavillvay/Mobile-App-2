import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutBanner from "./about-banner.jpg";
import chiefExecutiveOfficer from "./chief-executive-officer.jpg";
import chiefFinancialOfficer from "./chief-financial-officer.jpg";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUsPage = () => {
  return (
    <>
      <section className="max-w-desktop mx-auto min-h-[1024px]">
        {/* Navigation bar for company information pages */}
        <nav className="mb-6 flex text-lg font-bold uppercase">
          <Link
            href="/about-us"
            className="text-brand-primary px-4 py-2 underline first:pl-0"
          >
            About Us
          </Link>

          <Link
            href="/careers"
            className="text-brand-gray-500 hover:text-brand-primary px-4 py-2 first:pl-0 hover:underline"
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
            src={aboutBanner}
            alt="The banner for about us page"
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
            About Us
          </h1>

          <span className="border-b-brand-primary absolute bottom-3.5 z-0 block w-full border-b"></span>
        </div>

        {/* About us content */}
        <div className="text-brand-gray-500 box-border text-base">
          <p tabIndex={0} className="mb-4">
            Louis and Company, founded in 1975, is a leading provider of quality
            products to the woodworking industry. With a product portfolio that
            includes such leading brands as Blum, Formica, Rev-A-Shelf, Knape &
            Vogt, Grass, Doellken Woodtape, ML Campbell, among many others,
            Louis and Company provides professional woodworkers with one source
            for all the products they use, need and want.
          </p>

          <p tabIndex={0} className="mb-4">
            In 1997, the company&apos;s success attracted the attention of
            Professor Reinhold Würth of The Würth Group - a worldwide
            distribution organization serving the wood, automotive and metal
            industries. Würth took over his father&apos;s small wholesale screw
            business in 1954, turning over the company&apos;s leadership to his
            daughter, Bettina, in 2006. On July 15th, 2011, Louis and Company
            became Wurth Louis and Company, adopting the parent company&apos;s
            well known brand, Würth. Wurth Louis and Company still provides the
            same great service with a highly trained sales force and
            comprehensive product range with the industry&apos;s leading brands.
            Since becoming a member of The Würth Group, Louis and Company has
            grown to 20 locations around the Western United States.
          </p>

          <p tabIndex={0} className="mb-4">
            Wurth Louis and Company is much more than simply a wholesale
            distributor of woodworking supplies. Wurth Louis and Company
            continually strives to make your customer experience the utmost in
            convenience:
          </p>

          <ul tabIndex={0} className="mb-4 block list-disc ps-8">
            <li>24/7 online ordering</li>

            <li>
              Questions answered by highly trained service representatives
            </li>

            <li>On-time deliveries from company owned and operated fleet</li>

            <li>
              Machinery Installation/Maintenance from factory-trained
              Technicians
            </li>

            <li>
              Credit options: in house financing*, leasing or installment
              payments
            </li>
          </ul>

          <p tabIndex={0} className="mb-4">
            *on approved credit
          </p>

          <p tabIndex={0} className="mb-4">
            Wurth Louis and Company continues to be a proven source for
            cabinetmakers, woodworkers and for architects and designers that
            specify our products.
          </p>

          <div className="relative mb-4 mt-12 w-full md:w-1/2">
            <h2
              tabIndex={0}
              aria-level={2}
              className="text-brand-primary relative pr-3 text-lg font-medium"
            >
              Our Mission Statement
            </h2>

            <span className="border-b-brand-primary relative z-0 mt-0.5 block w-full border-b"></span>
          </div>

          <p tabIndex={0} className="mb-4">
            People dedicated to providing excellent service and fine-quality
            products to the woodworking industry.
          </p>

          <div className="relative mb-4 mt-12 w-full md:w-1/2">
            <h2
              tabIndex={0}
              aria-level={2}
              className="text-brand-primary relative pr-3 text-lg font-medium"
            >
              Corporate Executives
            </h2>

            <span className="border-b-brand-primary relative z-0 mt-0.5 block w-full border-b"></span>
          </div>

          <div className="grid grid-cols-2 gap-8 md:w-1/2">
            <div className="relative">
              <div className="border-brand-gray-200 relative flex flex-col rounded border">
                <Image
                  src={chiefExecutiveOfficer}
                  alt="Photo of Thomas Stolmeier"
                  placeholder="blur"
                  className="w-full rounded-t"
                />

                <div className="break-words p-4">
                  <h4
                    tabIndex={0}
                    aria-level={3}
                    className="mb-2 text-base font-medium"
                  >
                    Thomas Stolmeier
                  </h4>

                  <p tabIndex={0} className="text-sm italic">
                    President and Chief Executive Officer Wurth Louis and
                    Company
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="border-brand-gray-200 relative flex flex-col rounded border">
                <Image
                  src={chiefFinancialOfficer}
                  alt="Photo of Evangeline B. de Guzman"
                  placeholder="blur"
                  className="w-full rounded-t"
                />

                <div className="break-words p-4">
                  <h4
                    tabIndex={0}
                    aria-level={3}
                    className="mb-2 text-base font-medium"
                  >
                    Evangeline B. de Guzman
                  </h4>

                  <p tabIndex={0} className="text-sm italic">
                    Chief Financial Officer Wurth Louis and Company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
