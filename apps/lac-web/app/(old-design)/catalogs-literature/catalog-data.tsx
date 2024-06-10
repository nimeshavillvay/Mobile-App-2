import type { StaticImageData } from "next/image";
import duraseinSurfacesCatalog from "./durasein_surfaces_catalog.jpeg";
import handToolsCatalog from "./hand_tools_catalog.jpeg";
import karranCatalog from "./karran_catalog.jpeg";
import kentDesignWireGrillsCatalog from "./kent_design_wire_grills_catalog.jpeg";
import knanpeAndVogtCatalog from "./knape_and_vogt_catalog.jpeg";
import olympusLockCatalog from "./olympus_lock_catalog.jpeg";
import revAShelfCatalog from "./rev_a_shelf_catalog.jpeg";
import revAShelfSidelinesCatalog from "./rev_a_shelf_sidelines_catalog.jpeg";
import solventAndChemicalsCatalog from "./solvent_and_chemicals_catalog.jpeg";
import strongholdBracketsCatalog from "./stronghold_brackets_catalog.jpeg";
import tigerflexGlovesCatalog from "./tigerflex_gloves_catalog.jpeg";
import trescoCatalog from "./tresco_catalog.jpeg";
import vauthSagelCatalog from "./vauth_sagel_catalog.jpeg";
import woodworkingAndSolidSurfacesCatalog from "./woodworking_and_solid_surfaces_catalog.jpeg";
import wurthLouisAndCompanyCatalog from "./wurth_louis_and_company_catalog.jpeg";
import wurthLouisAndCompanyPremiumKitchenCatalog from "./wurth_louis_and_company_premium_kitchen_catalog.jpeg";
import wurthProCatalog from "./wurth_pro_catalog.jpeg";

export type CatalogDataType = {
  readonly id: string;
  readonly url: string;
  readonly imageSrc: StaticImageData;
  readonly alt: string;
};

export type NonInteractiveCatalogDataType = {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly text: string;
};

export const catalogData: CatalogDataType[] = [
  {
    id: "wurth_pro",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/pro-catalog/",
    imageSrc: wurthProCatalog,
    alt: "Wurth Pro Catalog",
  },
  {
    id: "knape_and_vogt",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/knape-and-vogt-kv-catalog/",
    imageSrc: knanpeAndVogtCatalog,
    alt: "Knape and Vogt Catalog",
  },
  {
    id: "olympus_lock",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/olympus-locks/",
    imageSrc: olympusLockCatalog,
    alt: "Olympus Lock Catalog",
  },
  {
    id: "kent_designer_wire_grills",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/kent-design-wire-grills/",
    imageSrc: kentDesignWireGrillsCatalog,
    alt: "Kent Designer Wire Grills Catalog",
  },
  {
    id: "vauth_sagel",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/vauth-sagel-carbon-steel-and-platinum/",
    imageSrc: vauthSagelCatalog,
    alt: "Vauth Sagel Catalog",
  },
  {
    id: "karran",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/karran-sinks-2021/",
    imageSrc: karranCatalog,
    alt: "Karran Catalog",
  },
  {
    id: "durasein",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/durasein-tri-fold/",
    imageSrc: duraseinSurfacesCatalog,
    alt: "Durasein Catalog",
  },
  {
    id: "tresco",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/tresco-lighting-kits/",
    imageSrc: trescoCatalog,
    alt: "Tresco Catalog",
  },
  {
    id: "rev_a_shelf",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/rev-a-shelf-2022-new-products/",
    imageSrc: revAShelfCatalog,
    alt: "Rev A Shelf Catalog",
  },
  {
    id: "rev_a_shelf_sidelines",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/rev-a-shelf-sidelines/",
    imageSrc: revAShelfSidelinesCatalog,
    alt: "Rev A Shelf Sidelines Catalog",
  },
  {
    id: "stronghold_brackets",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/stronghold-brackets/",
    imageSrc: strongholdBracketsCatalog,
    alt: "Stronghold Brackets Catalog",
  },
  {
    id: "tigerflex_gloves",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/tigerflex-gloves/",
    imageSrc: tigerflexGlovesCatalog,
    alt: "Tigerflex Gloves Catalog",
  },
  {
    id: "wurth_solvents",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-solvents-and-chemicals/",
    imageSrc: solventAndChemicalsCatalog,
    alt: "Wurth Solvents and Chemicals Catalog",
  },
  {
    id: "wurth_woodworking",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-woodworking-and-solid-surfaces/",
    imageSrc: woodworkingAndSolidSurfacesCatalog,
    alt: "Wurth Woodworking And Solid Surfaces Catalog",
  },
  {
    id: "wurth_hand_tools",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-hand-tools/",
    imageSrc: handToolsCatalog,
    alt: "Wurth Hand Tools Catalog",
  },
  {
    id: "blum_catalog",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/blum-catalog-2023/",
    imageSrc: wurthLouisAndCompanyCatalog,
    alt: "Blum Catalog",
  },
  {
    id: "kessebohmer_catalog",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/kessebohmer-catalog/",
    imageSrc: wurthLouisAndCompanyPremiumKitchenCatalog,
    alt: "Kessebohmer Catalog",
  },
];

export const nonInteractiveCatalogs: NonInteractiveCatalogDataType[] = [
  {
    id: "wurth_pro",
    url: "/literature/2021/LP1508-Wurth-Pro-SV.pdf",
    title: "Wurth PRO Catalog PDF - Opens in new window",
    text: "PRO Catalog",
  },
  {
    id: "kv_catalog",
    url: "/literature/2023/LP1673_KV_Catalog.pdf",
    title: "Knape and Vogt Catalog PDF",
    text: "Knape and Vogt (KV)",
  },
  {
    id: "olympus_locks",
    url: "/literature/2022/LP1672_Olympus_Locks_Catalog.pdf",
    title: "Olympus Locks Catalog PDF",
    text: "Olympus Locks",
  },
  {
    id: "design_wire_grills",
    url: "/literature/2022/LP1679-Kent-Design-Wire-Grill.pdf",
    title: "Kent Design Wire Grills PDF",
    text: "Kent Design Wire Grills",
  },
  {
    id: "salt_horizontal",
    url: "/literature/2022/SALT-Horizontal-Guide.pdf",
    title: "SALT Horizontal Guide PDF",
    text: "SALT Horizontal Guide",
  },
  {
    id: "vauth_sagel_carbon_steel",
    url: "/literature/2022/Vauth-Sagel-Carbon-Steel-and-Platinum.pdf",
    title: "Vauth-Sagel Catalog PDF",
    text: "Vauth-Sagel - Carbon Steel and Platinum",
  },
  {
    id: "karran_sinks",
    url: "/literature/2022/LP1624-Karran-Catalog-09_2022.pdf",
    title: "Karran Sinks Catalog PDF",
    text: "Karran Sinks 2022",
  },
  {
    id: "durasein",
    url: "/literature/2022/LP1604-Durasein-Trifold-Brochure.pdf",
    title: "Durasein Trifold Brochure PDF",
    text: "Durasein Trifold Brochure",
  },
  {
    id: "tresco_kits",
    url: "/literature/2022/LP1606-Tresco-Catalog.pdf",
    title: "Tresco Kits Catalog PDF",
    text: "Tresco CSL Kits",
  },
  {
    id: "rev_a_shelf_2022",
    url: "/literature/2022/LP1653-RAS-2022-New-Products.pdf",
    title: "Rev-A-Shelf New Products for 2022 PDF",
    text: "Rev-A-Shelf 2022 New Products",
  },
  {
    id: "rev_a_shelf_sidelines",
    url: "/literature/2021/WLAC-RAS-Sidelines-Brochure-NP-3-8-21.pdf",
    title: "Rev-A-Shelf Sidelines Catalog PDF",
    text: "Rev-A-Shelf Sidelines",
  },
  {
    id: "stronghold_brackets",
    url: "/literature/2022/LP1612-Stronghold-Brackets.pdf",
    title: "Stronghold Brackets Catalog PDF",
    text: "Stronghold Brackets",
  },
  {
    id: "tigerflex",
    url: "/literature/2021/LP1485-Tigerflex.pdf",
    title: "Tigerflex Catalog PDF",
    text: "Tigerflex",
  },
  {
    id: "solvents_and_chemicals",
    url: "/literature/2021/Wurth-Solvents-Chemicals.pdf",
    title: "Wurth Solvents and Chemicals Catalog PDF",
    text: "Solvents and Chemicals",
  },
  {
    id: "woodworking",
    url: "/literature/2021/Wurth_Woodworking_and_Solid_Surfaces.pdf",
    title: "Wurth Woodworking and Solid Surfaces Catalog PDF",
    text: "Woodworking and Solid Surfaces",
  },
  {
    id: "hand_tools",
    url: "/literature/2021/Wurth-Hand-Tools.pdf",
    title: "Wurth Hand Tools Catalog PDF",
    text: "Hand Tools",
  },
];
