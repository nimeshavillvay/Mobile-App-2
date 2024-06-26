import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { MainTitle } from "../_components/main-title";
import kessebohmerCatalogInteractive from "./Kessebohmer-Catalog-interactive.jpg";
import kessebohmerCatalog from "./Kessebohmer-Catalog.jpg";
import kessebohmerLogo from "./Kessebohmer-logo.png";
import pdfCatalogThumb from "./PDF_Catalog_Thumb.jpg";
import catalogCover from "./WLAC_Catalog_Cover.png";

import { FileDownload } from "@repo/web-ui/components/icons/file-download";
import type { ReactNode } from "react";
import { SubTitle } from "../_components/sub-title";
import { catalogData, nonInteractiveCatalogs } from "./catalog-data";

export const metadata: Metadata = {
  title: "Catalogs & Literature",
};

const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

const Catalog = ({
  url,
  imageSrc,
  alt,
}: {
  readonly url: string;
  readonly imageSrc: StaticImageData;
  readonly alt: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-300 shadow-md shadow-gray-300 hover:shadow-xl hover:shadow-gray-500"
    >
      <Image src={imageSrc} alt={alt} placeholder="blur" />
    </a>
  );
};
Catalog.displayName = "Catalog";

const NonInteractiveCatalog = ({
  url,
  title,
  children,
}: {
  readonly url: string;
  readonly title: string;
  readonly children: ReactNode;
}) => {
  return (
    <li className="w-fit list-outside list-disc text-blue-700 hover:text-blue-900 hover:underline">
      <a href={url} title={title} target="_blank">
        {children}
      </a>
    </li>
  );
};
NonInteractiveCatalog.displayName = "NonInteractiveCatalog";

const CatalogsLiteraturePage = () => {
  return (
    <div className="container mt-8 flex flex-col">
      <MainTitle>Catalogs & Literature</MainTitle>

      <SubTitle>Main Product Catalog</SubTitle>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:grid-rows-1">
        <div className="flex flex-col">
          <p className="mb-4">
            Click the catalog cover below to go to the individual sections of
            the catalog.
          </p>
          <a href="/catalog-main" className="w-fit self-center sm:self-auto">
            <Image src={catalogCover} alt="Catalog Cover" placeholder="blur" />
          </a>
        </div>
        <div>
          <p className="mb-4">Or you can download the full pdf version here.</p>
          <a
            href={`${apiUrl}/assets/pdf/WurthLAC_2022-2023_Full_Catalog.pdf`}
            title="WurthLAC 2022-2023 Full Catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit flex-col sm:flex-row"
          >
            <div className="flex w-full justify-center border border-b-0 border-gray-400 sm:w-auto sm:border-0">
              <Image
                src={pdfCatalogThumb}
                alt="Catalog Thumb"
                className="border border-gray-400 sm:self-auto"
              />
            </div>
            <div className="flex flex-col justify-center border border-t-0 border-gray-400 p-6 sm:border-l-0 sm:border-t">
              <h4>
                <span className="block font-wurth text-xl font-normal text-gray-500">
                  Download the pdf version of
                </span>
                <span className="block font-wurth text-3xl font-extrabold text-gray-800">
                  2022/2023 Full Catalog
                </span>
              </h4>
              <div className="mt-4 flex bg-gray-200 p-4 pl-6">
                <FileDownload className="stroke-red-700 stroke-2" />
                <span className="self-center pl-4 font-wurth font-normal text-red-700">
                  Download Catalog
                </span>
              </div>
            </div>
          </a>
          <p className="mt-2">
            Note: File size is large(160mb). Catalog may take an extended time
            to download.
          </p>
        </div>
      </div>

      <SubTitle>New Kessebohmer Catalog</SubTitle>

      <div className="mb-4 grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
        <Image
          src={kessebohmerLogo}
          alt="Kessebohmer Logo"
          placeholder="blur"
        />

        <p>
          For over 60 years, Kesseböhmer has been the world leader in creating
          exceptional kitchen storage solutions. Designed to maximize space and
          efficiency, their products offer all the innovation and quality that
          todays kitchens demand. We are excited to introduce Kesseböhmer to the
          Würth Louis and Company line of products, bringing their expertise in
          kitchen storage solutions to our customers.
        </p>

        <a
          href={`${apiUrl}/assets/pdf/Kessebohmer_Catalog.pdf`}
          title="WurthLAC Kessebohmer Catalog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit flex-col sm:flex-row"
        >
          <div className="flex w-2/3 justify-center border border-b-0 border-gray-400 sm:w-1/2 sm:border-0 md:w-1/3">
            <Image
              src={kessebohmerCatalog}
              alt="Kessebohmer Catalog"
              className="border border-gray-400 sm:self-auto"
            />
          </div>
          <div className="flex w-2/3 flex-col justify-center border border-t-0 border-gray-400 p-6 sm:w-auto sm:border-l-0 sm:border-t">
            <h4>
              <span className="block font-wurth text-xl font-normal text-gray-500">
                Download the pdf version of
              </span>
              <span className="block font-wurth text-3xl font-extrabold text-gray-800">
                Wurth Louis Kessebohmer Catalog
              </span>
            </h4>
            <div className="mt-4 flex p-4 pl-0">
              <FileDownload className="stroke-red-700 stroke-2" />
              <span className="self-center pl-4 font-wurth font-normal text-red-700">
                Download Catalog
              </span>
            </div>
          </div>
        </a>

        <a
          href="https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/kessebohmer-catalog/"
          title="WurthLAC Kessebohmer Catalog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit flex-col sm:flex-row"
        >
          <div className="flex w-2/3 justify-center border border-b-0 border-gray-400 sm:w-1/2 sm:border-0 md:w-1/3">
            <Image
              src={kessebohmerCatalogInteractive}
              alt="Catalog Thumb"
              className="border border-gray-400 sm:self-auto"
            />
          </div>
          <div className="flex w-2/3 flex-col justify-center border border-t-0 border-gray-400 p-6 sm:w-auto sm:border-l-0 sm:border-t">
            <h4>
              <span className="block font-wurth text-xl font-normal text-gray-500">
                View the Kessebohmer Catalog in your browser
              </span>
              <span className="block font-wurth text-3xl font-extrabold text-gray-800">
                Interactive Kessebohmer Catalog
              </span>
            </h4>
          </div>
        </a>
      </div>

      <SubTitle>Other Catalogs</SubTitle>

      <p className="mt-6">
        <span className="block">Order directly from the catalog!</span>
        <span className="block">
          Open any of the catalogs below to see an interactive version of the
          catalog.
        </span>
        <span className="block">
          Click any <span className="bg-yellow-300">yellow highlighted</span>{" "}
          item number to see the website page and add the item to your cart.
          (Item numbers that are not highlighted in yellow may not be available
          on the Web or may no longer be available.)
        </span>
      </p>

      <div className="grid grid-cols-2 gap-8 gap-x-12 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {catalogData.map((catalog) => (
          <Catalog
            url={catalog.url}
            imageSrc={catalog.imageSrc}
            alt={catalog.alt}
            key={catalog.id}
          />
        ))}
      </div>

      <SubTitle>Non-Interactive Catalogs (PDF)</SubTitle>

      <ul className="pt4 pl-6 pt-4">
        {nonInteractiveCatalogs.map((catalog) => (
          <NonInteractiveCatalog
            key={catalog.id}
            url={catalog.url}
            title={catalog.title}
          >
            {catalog.text}
          </NonInteractiveCatalog>
        ))}
      </ul>
    </div>
  );
};

export default CatalogsLiteraturePage;
