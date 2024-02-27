import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import VisuallyHidden from "@/old/_components/visually-hidden";
import type { Metadata } from "next";
import Image from "next/image";
import careersBanner from "./careers-banner.jpg";

export const metadata: Metadata = {
  title: "Careers",
};

const CareersPage = () => {
  return (
    <>
      {/* Section banner */}
      <Image
        src={careersBanner}
        alt="The banner for careers page"
        placeholder="blur"
        className="border-brand-gray-100 mb-8 h-auto w-full border object-cover"
        priority={true}
      />

      {/* Section heading with line */}
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">Careers</Title>

        <Separator
          orientation="horizontal"
          className="bg-brand-primary h-px flex-1"
        />
      </div>

      {/* Careers content */}
      <div className="text-brand-gray-500 box-border space-y-4">
        <p>
          People are the indispensable element of Wurth Louis and Company - no
          matter what side of the business they are on. We are as passionate
          about our workforce as we are about our customers. If you&apos;re
          looking for a dynamic, growing company with real career advancement
          opportunities, consider becoming a part of our team.
        </p>

        <p>
          Review our open positions at our careers mini-site using the link
          below where you can upload your resume today!
        </p>

        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://recruiting.ultipro.com/WUR1001WGNA/JobBoard/6e3d14dc-8c54-4ad8-8378-c52ee53cd531/?q=&o=postedDateDesc"
            className="text-[#007bff] hover:underline"
          >
            Go to the wurthlac.com Careers mini-site.
            <VisuallyHidden>(opens in a new window)</VisuallyHidden>
          </a>
        </p>
      </div>
    </>
  );
};

export default CareersPage;
