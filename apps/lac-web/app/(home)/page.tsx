import ProductCardWithSkuSwitcher from "@/_components/product-card-with-sku-switcher";
import Separator from "@/_components/separator";
import Title from "@/_components/title";
import VisuallyHidden from "@/_components/visually-hidden";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { TfiYoutube } from "react-icons/tfi";
import banner1Government from "./banner-1-government.jpg";
import banner2CatalogsLiterature from "./banner-2-catalogs-literature.jpg";
import banner3Machinery from "./banner-3-machinery.jpg";
import Carousel from "./carousel";
import EmailSignup from "./email-signup";
import FeaturedProducts from "./featured-products";
import type { CarouselBanner, FeaturedProduct } from "./types";

const BANNERS = [
  {
    title: "Government",
    description: "We are a SAM Approved U.S. Government Vendor",
    background: banner1Government,
    href: "/government",
  },
  {
    title: "Catalogs & Literature",
    description: "Digital versions to download",
    background: banner2CatalogsLiterature,
    href: "/catalogs-literature",
  },
  {
    title: "Machinery",
    description: "Explore out full line of woodworking machinery",
    background: banner3Machinery,
    href: "https://www.wurthmachinery.com/",
  },
];

const SOCIAL_LINK = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/WurthLAC?ref=bookmarks",
    Icon: FaFacebookF,
    color: "#3B5998",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/wurthlouisandco",
    Icon: FaTwitter,
    color: "#55ACEE",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/3876774?trk=vsrp_companies_res_name&trkInfo=VSRPsearchId%3A359569061436460995522%2CVSRPtargetId%3A3876774%2CVSRPcmpt%3Aprimary",
    Icon: FaLinkedinIn,
    color: "#007AB9",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/user/WurthLAC",
    Icon: TfiYoutube,
    color: "#C4302B",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/wurthlac/",
    Icon: FaInstagram,
    color: "#000000",
  },
];

const HomePage = async () => {
  const [carouselData, featuredProducts, featuredBrand, bottomBanners] =
    await Promise.all([
      api
        .get("pim/webservice/rest/carouselbanner", {
          next: { revalidate: DEFAULT_REVALIDATE },
        })
        .json<CarouselBanner[]>(),
      api
        .get("pim/webservice/rest/getfeatureproducts", {
          next: { revalidate: DEFAULT_REVALIDATE },
        })
        .json<{
          featured_product_list: {
            best_seller: FeaturedProduct[];
            featured: FeaturedProduct[];
            latest: FeaturedProduct[];
            special: FeaturedProduct[];
          };
        }>(),
      api
        .get("pim/webservice/rest/getrandomgroups", {
          next: { revalidate: DEFAULT_REVALIDATE },
        })
        .json<
          [
            {
              brand: {
                name: string;
                color: string;
                logo: string;
                code: string;
              };
            },
            {
              groups: {
                groupId: number;
                item_group_name: string;
                slug: string;
                brandName: string;
                group_img: string;
                itemSkuList: {
                  txt_wurth_lac_item: string;
                  "SKU-attribute": string;
                  img: string;
                  item_name: string;
                  slug: string;
                }[];
                variationsCount: number;
              }[];
            },
          ]
        >(),
      api
        .get("pim/webservice/rest/topbottombanner", {
          next: { revalidate: DEFAULT_REVALIDATE },
        })
        .json<
          {
            id: number;
            slot: string;
            use_custom_link: boolean;
            custom_url: string;
            active: boolean;
            alt_tag?: string;
            priority?: number;
            image_name: string;
            image_path: string;
          }[]
        >(),
    ]);

  return (
    <>
      <Carousel banners={carouselData} />

      <FeaturedProducts
        bestSellers={featuredProducts.featured_product_list.best_seller}
        featured={featuredProducts.featured_product_list.featured}
        latest={featuredProducts.featured_product_list.latest}
        special={featuredProducts.featured_product_list.special}
      />

      <section className="max-w-desktop mx-auto">
        <div className="flex flex-row items-center gap-2.5">
          <Title>Featured Brand</Title>

          <Separator
            orientation="horizontal"
            className="bg-brand-gray h-px flex-1"
          />
        </div>

        <div className="mb-[30px] mt-6 flex flex-row items-center gap-4 border border-black bg-black">
          <Image
            src={getMediaUrl(featuredBrand[0].brand.logo)}
            alt={`The logo of ${featuredBrand[0].brand.name}`}
            width={130}
            height={50}
            className="height-[50px] w-[130px] border bg-white object-contain px-2.5 py-[3px]"
          />

          <h3 className="text-2xl leading-none text-white">
            {featuredBrand[0].brand.name}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {featuredBrand[1].groups.map((group) => (
            <ProductCardWithSkuSwitcher
              key={group.groupId}
              details={{
                href: `/product-item/${group.groupId}`,
                image: {
                  src: getMediaUrl(group.group_img),
                  alt: `An image of the group ${group.item_group_name}`,
                },
                brand: group.brandName,
                title: group.item_group_name,
              }}
              variations={group.itemSkuList.map((variation) => ({
                sku: variation.txt_wurth_lac_item,
                image: variation.img,
                name: variation.item_name,
              }))}
            />
          ))}
        </div>
      </section>

      <section className="max-w-desktop mx-auto mt-9 flex flex-row justify-between gap-[33px]">
        {BANNERS.map((banner) => (
          <Link href={banner.href} key={banner.href} className="relative">
            <Image
              src={banner.background}
              placeholder="blur"
              width={352}
              height={344}
              alt={`The background for ${banner.title}`}
              className="h-[344px] w-[352px] object-cover"
            />

            <div className="absolute bottom-0 left-6 right-0 top-[164px] bg-black/40 p-5 text-white backdrop-blur-sm">
              <div className="text-4xl font-extrabold uppercase leading-none">
                {banner.title}
              </div>

              <div className="mb-[18px] mt-1.5 text-lg leading-6">
                {banner.description}
              </div>

              <div className="text-brand-secondary flex flex-row items-center gap-2 text-base font-extrabold uppercase leading-[22px]">
                <span>Learn more</span>
                <MdChevronRight className="text-xs leading-none" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Separator
        orientation="horizontal"
        className="max-w-desktop bg-brand-light-gray mx-auto my-[55px] h-px w-full"
      />

      <section className="max-w-desktop mx-auto mb-[92px] flex flex-row justify-between gap-5">
        <div>
          <EmailSignup />

          <div className="mt-5">
            <h3 className="text-[19px] font-medium leading-6">
              Keep In Touch Through Social Media
            </h3>

            <div className="mt-3 flex flex-row items-center gap-[22px]">
              {SOCIAL_LINK.map(({ name, href, Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-9 place-content-center rounded-full text-2xl leading-normal text-white"
                  style={{ backgroundColor: color }}
                >
                  <VisuallyHidden>{name}</VisuallyHidden>

                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {bottomBanners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.custom_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {!!banner.alt_tag && (
              <VisuallyHidden>{banner.alt_tag}</VisuallyHidden>
            )}

            <Image
              src={getMediaUrl(banner.image_path)}
              alt={banner.alt_tag ?? ""}
              width={360}
              height={191}
              className="h-[191px] w-[360px] object-contain"
            />
          </Link>
        ))}
      </section>
    </>
  );
};

export default HomePage;
