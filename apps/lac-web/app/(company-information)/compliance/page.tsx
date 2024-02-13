import Separator from "@/_components/separator";
import Title from "@/_components/title";
import type { Metadata } from "next";
import Image from "next/image";
import { IoArrowForwardSharp } from "react-icons/io5";
import compliance from "./compliance.jpg";

export const metadata: Metadata = {
  title: "Compliance",
};

const CompliancePage = () => {
  return (
    <>
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
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">Compliance</Title>

        <Separator
          orientation="horizontal"
          className="bg-brand-primary h-px flex-1"
        />
      </div>

      <div className="text-brand-gray-500 box-border space-y-4 text-base">
        <p>
          Mutual trust, reliability, honesty and straightforwardness, both
          inwards and outwards, are the fundamental principles deeply ingrained
          in the Würth Group&apos;s corporate culture. Our commitment to these
          values was first laid down in the Corporate Philosophy which was
          written by Reinhold Würth in the 1970s.
        </p>

        <p>
          These principles do not just include adhering to all applicable rules
          and laws, but also the proper mindset of the employees which
          constitutes an integral part of the sustained corporate success of the
          Würth Group.
        </p>

        <p>
          And it is our goal to promote this mindset. At the same time, this
          mindset entails our employees&apos; strict adherence to all applicable
          national and international rules and laws. To make these principles
          more transparent for our employees as well as our customers, suppliers
          and other business partners, we have developed practical rules of
          conduct on the basis of our corporate values, which are summarized in
          the Code of Compliance of the Würth Group.
        </p>

        <div className="space-y-1.5">
          <div>
            <a
              title="Download code of compliance - opens PDF in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wuerth.com/downloads/pdf/Compliance/EN-Compliance_Buch_2021.pdf"
              className="flex font-bold uppercase tracking-normal text-black no-underline"
            >
              Download Code of Compliance
              <IoArrowForwardSharp className="self-center text-lg leading-none" />
            </a>
          </div>

          <div>
            <a
              title="Reporting Hotline SpeakUp - Opens in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.bkms-system.net/wuerth"
              className="flex font-bold uppercase tracking-normal text-black no-underline"
            >
              Reporting Hotline Speak Up
              <IoArrowForwardSharp className="self-center text-lg leading-none" />
            </a>
          </div>
        </div>

        <div className="relative w-full pt-8 md:w-1/2">
          <h2 className="text-brand-primary relative pr-3 text-lg font-medium">
            Reporting Hotline Speak Up
          </h2>

          <Separator
            orientation="horizontal"
            className="bg-brand-primary mt-0.5 h-px flex-1"
          />
        </div>

        <p>
          Our Code of Compliance represents our commitment to treat each other
          with integrity, along with our customers, suppliers and other business
          partners. Studies have demonstrated that reports received from third
          parties frequently helped to solve cases of economic crime. For this
          very reason, we have set up a system that allows both Würth Group
          employees and third parties to report criminal acts and other major
          compliance violations. This web-based tool is called the BKMS System
          (Business Keeper Monitoring System).
        </p>

        <p>
          If you would like to report an incident using this system, you can do
          so either anonymously or by name. Nevertheless, because we would like
          to cultivate an environment of open communication, we encourage you to
          give your name when submitting reports. We will handle your personal
          information with strict confidentiality and take into account the
          legitimate interests of all parties involved.
        </p>

        <p>
          Please create a mailbox in the BKMS system via which we can contact
          you. This is important in case we have any follow-up questions or in
          case you would like to add further information to your report later
          on. Communication via the mailbox can also be kept anonymous, if
          desired.
        </p>

        <p>
          The system is solely intended to call attention to suspected cases of
          economic crime or major compliance violations within the Würth Group.
          Any misuse of this system for other purposes can constitute a criminal
          offense.
        </p>

        <p>
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

        <p>Thank you very much for your support!</p>
      </div>
    </>
  );
};

export default CompliancePage;
