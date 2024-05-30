import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import type { Metadata } from "next";
import Image from "next/image";
import aboutBanner from "./about-banner.jpg";
import chiefExecutiveOfficer from "./chief-executive-officer.jpg";
import chiefFinancialOfficer from "./chief-financial-officer.jpg";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUsPage = () => {
  return (
    <div className="container">
      {/* Section banner */}
      <Image
        src={aboutBanner}
        alt="The banner for about us page"
        placeholder="blur"
        className="mb-8 h-auto w-full border border-brand-gray-100 object-cover"
        priority={true}
      />

      {/* Section heading with line */}
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">About Us</Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      {/* About us content */}
      <div className="box-border space-y-4 text-brand-gray-500">
        <p>
          Louis and Company, founded in 1975, is a leading provider of quality
          products to the woodworking industry. With a product portfolio that
          includes such leading brands as Blum, Formica, Rev-A-Shelf, Knape &
          Vogt, Grass, Doellken Woodtape, ML Campbell, among many others, Louis
          and Company provides professional woodworkers with one source for all
          the products they use, need and want.
        </p>

        <p>
          In 1997, the company&apos;s success attracted the attention of
          Professor Reinhold Würth of The Würth Group - a worldwide distribution
          organization serving the wood, automotive and metal industries. Würth
          took over his father&apos;s small wholesale screw business in 1954,
          turning over the company&apos;s leadership to his daughter, Bettina,
          in 2006. On July 15th, 2011, Louis and Company became Wurth Louis and
          Company, adopting the parent company&apos;s well known brand, Würth.
          Wurth Louis and Company still provides the same great service with a
          highly trained sales force and comprehensive product range with the
          industry&apos;s leading brands. Since becoming a member of The Würth
          Group, Louis and Company has grown to 20 locations around the Western
          United States.
        </p>

        <p>
          Wurth Louis and Company is much more than simply a wholesale
          distributor of woodworking supplies. Wurth Louis and Company
          continually strives to make your customer experience the utmost in
          convenience:
        </p>

        <ul className="block list-disc ps-8">
          <li>24/7 online ordering</li>

          <li>Questions answered by highly trained service representatives</li>

          <li>On-time deliveries from company owned and operated fleet</li>

          <li>
            Machinery Installation/Maintenance from factory-trained Technicians
          </li>

          <li>
            Credit options: in house financing*, leasing or installment payments
          </li>
        </ul>

        <p>*on approved credit</p>

        <p>
          Wurth Louis and Company continues to be a proven source for
          cabinetmakers, woodworkers and for architects and designers that
          specify our products.
        </p>
        <div className="relative w-full pt-8 md:w-1/2 xl:w-1/3">
          <h2 className="relative pr-3 text-lg font-medium text-brand-primary">
            Our Mission Statement
          </h2>

          <Separator
            orientation="horizontal"
            className="mt-0.5 h-px flex-1 bg-brand-primary"
          />
        </div>

        <p>
          People dedicated to providing excellent service and fine-quality
          products to the woodworking industry.
        </p>
        <div className="relative w-full pt-8 md:w-1/2 xl:w-1/3">
          <h2 className="relative pr-3 text-lg font-medium text-brand-primary">
            Corporate Executives
          </h2>

          <Separator
            orientation="horizontal"
            className="mt-0.5 h-px flex-1 bg-brand-primary"
          />
        </div>

        <div className="grid grid-cols-1 grid-rows-2 gap-8 sm:grid-cols-2 sm:grid-rows-6 md:w-1/2 xl:w-1/3">
          <figure className="row-span-5 flex flex-col rounded-t border border-black">
            <Image
              src={chiefExecutiveOfficer}
              alt="Photo of Thomas Stolmeier"
              placeholder="blur"
              className="w-full rounded-t"
              priority={true}
            />

            <figcaption className="row-span-1 p-2 pl-3">
              <h3 className="font-wurth text-lg font-bold leading-5">
                Thomas Stolmeier
              </h3>
              <p className="mt-2 break-words font-arial italic">
                President and Chief Executive Officer Wurth Louis and Company
              </p>
            </figcaption>
          </figure>

          <figure className="row-span-5 flex flex-col rounded-t border border-black">
            <Image
              src={chiefFinancialOfficer}
              alt="Photo of Thomas Stolmeier"
              placeholder="blur"
              className="w-full rounded-t"
              priority={true}
            />

            <figcaption className="row-span-1 p-2 pl-3">
              <h3 className="font-wurth text-lg font-bold leading-5">
                Evangeline B. de Guzman
              </h3>
              <p className="mt-2 break-words font-arial italic">
                Chief Financial Officer Wurth Louis and Company
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
