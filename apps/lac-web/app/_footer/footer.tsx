import Separator from "@/_components/separator";
import VisuallyHidden from "@/_components/visually-hidden";
import WurthLogo from "@/_components/wurth-logo";
import Image from "next/image";
import Link from "next/link";
import fsc from "./fsc.png";
import sam from "./sam.png";
import trustwave from "./trustwave.png";
import vendorFreightRouting from "./vendor-freight-routing.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="bg-brand-gray-100 p-5">
        <div className="max-w-desktop mx-auto flex flex-row justify-between gap-2 text-sm leading-6 text-black">
          <div>
            <Link href="/">
              <VisuallyHidden>Wurth</VisuallyHidden>

              <WurthLogo width={126} height={27} />
            </Link>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="text-brand-gray-500 font-bold">
              Company Information
            </h5>

            <Link href="/about-us" className="hover:underline">
              About Us
            </Link>

            <Link href="/careers" className="hover:underline">
              Careers
            </Link>

            <Link href="/compliance" className="hover:underline">
              Compliance
            </Link>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="text-brand-gray-500 font-bold">My Account</h5>

            <button className="hover:underline">New Account Application</button>

            <Link href="/tax-form" className="hover:underline">
              Sales Tax & Exemption
            </Link>

            <button className="hover:underline">Sign In</button>

            <a
              href="https://wurthlac.billtrust.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Sales Tax & Exemption
            </a>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="text-brand-gray-500 font-bold">Help & Support</h5>

            <Link href="/faqs" className="hover:underline">
              FAQs
            </Link>

            <Link href="/branch-finder" className="hover:underline">
              Our Branches
            </Link>

            <Link href="/terms-of-sale" className="hover:underline">
              Terms of Sale
            </Link>

            <Link
              href="/Terms-and-Conditions-for-WLACs-Purchase-of-Products-from-Suppliers"
              className="hover:underline"
            >
              Terms for Suppliers
            </Link>
          </div>

          <div>
            <div className="flex flex-col items-start">
              <h5 className="text-brand-gray-500 font-bold">
                Credit and Accounts Receivable
              </h5>

              <span>
                Phone:{" "}
                <a
                  href="tel:8004440043"
                  className="text-[#007bff] hover:underline"
                >
                  (800) 444-0043
                </a>
              </span>

              <span>Fax: (972) 660-8678</span>

              <span>
                Email:{" "}
                <a
                  href="mailto:creditdepartment@wurthlac.com"
                  className="text-[#007bff] hover:underline"
                >
                  creditdepartment@wurthlac.com
                </a>
              </span>
            </div>

            <div className="col-start-5 flex flex-col items-start">
              <h5 className="text-brand-gray-500 font-bold">Contact Us</h5>

              <span>
                Corporate :{" "}
                <a
                  href="tel:8004224389"
                  className="text-[#007bff] hover:underline"
                >
                  (800) 422-4389
                </a>
              </span>

              <span>Fax: (800) 422-9452</span>

              <span>
                Email:{" "}
                <a
                  href="mailto:websupport@wurthlac.com"
                  className="text-[#007bff] hover:underline"
                >
                  websupport@wurthlac.com
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[30px] flex flex-row items-center justify-center gap-10">
          <Image
            src={trustwave}
            alt="The logo of Trustwave"
            width={130}
            height={75}
            className="object-contain"
            placeholder="blur"
          />

          <Image
            src={vendorFreightRouting}
            alt="The logo of Vendor Freight Routing"
            width={170}
            height={73}
            className="object-contain"
            placeholder="blur"
          />

          <Image
            src={fsc}
            alt="The logo of FSC"
            width={90}
            height={134}
            className="object-contain"
            placeholder="blur"
          />

          <Image
            src={sam}
            alt="The logo of SAM"
            width={150}
            height={103}
            className="object-contain"
            placeholder="blur"
          />
        </div>
      </div>

      <div className="bg-brand-gray-500">
        <div className="max-w-desktop text-brand-gray-200 mx-auto flex flex-row items-center justify-center gap-2.5 p-5 text-[13px] leading-4">
          <span>
            ©{new Date().getFullYear()} Wurth Louis and Company. All rights
            reserved.
          </span>

          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>

          <Separator
            orientation="vertical"
            className="bg-brand-gray-200 w-px self-stretch"
          />

          <Link href="/rights-request" className="hover:underline">
            Do Not Sell My Personal Information
          </Link>

          <Separator
            orientation="vertical"
            className="bg-brand-gray-200 w-px self-stretch"
          />

          <Link href="/terms-of-sale" className="hover:underline">
            Terms of Sale
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
