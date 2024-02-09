import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import compliance from "./compliance.jpg";

export const metadata: Metadata = {
  title: "Compliance",
};

const CompliancePage = () => {
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
            className="text-brand-gray-500 hover:text-brand-primary px-4 py-2 underline first:pl-0 hover:underline"
          >
            Careers
          </Link>

          <Link
            href="/compliance"
            className="text-brand-primary px-4 py-2 underline first:pl-0"
          >
            Compliance
          </Link>
        </nav>

        {/* Section banner */}
        <div className="border-brand-gray-100 mb-8 border">
          <Image
            src={compliance}
            alt="The banner for compliance page"
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
            Compliance
          </h1>

          <span className="border-b-brand-primary absolute bottom-3.5 z-0 block w-full border-b"></span>
        </div>

        <div className="text-brand-gray-500 box-border text-base">
          <p tabIndex={0} className="mb-4">
            Mutual trust, reliability, honesty and straightforwardness, both
            inwards and outwards, are the fundamental principles deeply
            ingrained in the Würth Group&apos;s corporate culture. Our
            commitment to these values was first laid down in the Corporate
            Philosophy which was written by Reinhold Würth in the 1970s.
          </p>

          <p tabIndex={0} className="mb-4">
            These principles do not just include adhering to all applicable
            rules and laws, but also the proper mindset of the employees which
            constitutes an integral part of the sustained corporate success of
            the Würth Group.
          </p>

          <p tabIndex={0} className="mb-4">
            And it is our goal to promote this mindset. At the same time, this
            mindset entails our employees&apos; strict adherence to all
            applicable national and international rules and laws. To make these
            principles more transparent for our employees as well as our
            customers, suppliers and other business partners, we have developed
            practical rules of conduct on the basis of our corporate values,
            which are summarized in the Code of Compliance of the Würth Group.
          </p>

          <div className="mb-1.5">
            <a
              title="Download code of compliance - opens PDF in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wuerth.com/downloads/pdf/Compliance/EN-Compliance_Buch_2021.pdf"
              className="text-black no-underline"
            >
              Download Code of Compliance
            </a>
          </div>

          <div className="relative mb-4 mt-12 w-full md:w-1/2">
            <h2
              tabIndex={0}
              aria-level={2}
              className="text-brand-primary relative pr-3 text-lg font-medium"
            >
              Reporting Hotline Speak Up
            </h2>

            <span className="border-b-brand-primary relative z-0 mt-0.5 block w-full border-b"></span>
          </div>

          <p tabIndex={0} className="mb-4">
            Our Code of Compliance represents our commitment to treat each other
            with integrity, along with our customers, suppliers and other
            business partners. Studies have demonstrated that reports received
            from third parties frequently helped to solve cases of economic
            crime. For this very reason, we have set up a system that allows
            both Würth Group employees and third parties to report criminal acts
            and other major compliance violations. This web-based tool is called
            the BKMS System (Business Keeper Monitoring System).
          </p>

          <p tabIndex={0} className="mb-4">
            If you would like to report an incident using this system, you can
            do so either anonymously or by name. Nevertheless, because we would
            like to cultivate an environment of open communication, we encourage
            you to give your name when submitting reports. We will handle your
            personal information with strict confidentiality and take into
            account the legitimate interests of all parties involved.
          </p>

          <p tabIndex={0} className="mb-4">
            Please create a mailbox in the BKMS system via which we can contact
            you. This is important in case we have any follow-up questions or in
            case you would like to add further information to your report later
            on. Communication via the mailbox can also be kept anonymous, if
            desired.
          </p>

          <p tabIndex={0} className="mb-4">
            The system is solely intended to call attention to suspected cases
            of economic crime or major compliance violations within the Würth
            Group. Any misuse of this system for other purposes can constitute a
            criminal offense.
          </p>

          <p tabIndex={0} className="mb-4">
            You can submit a report here:&nbsp;
            <a
              title="Submit a report through Wuerth - Opens in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.bkms-system.net/wuerth"
              className="text-[#007bff] hover:underline"
            >
              https://www.bkms-system.net/wuerth
              <span className="sr-only">(opens in a new window)</span>
            </a>
          </p>

          <p tabIndex={0} className="mb-4">
            Thank you very much for your support!
          </p>
        </div>
      </section>
    </>
  );
};

export default CompliancePage;
