import ProductCardWithSkuSwitcher from "@/old/_components/product-card-with-sku-switcher";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import VisuallyHidden from "@/old/_components/visually-hidden";
import { api } from "@/old/_lib/api";
import { DEFAULT_REVALIDATE } from "@/old/_lib/constants";
import { getMediaUrl } from "@/old/_utils/helpers";
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
import FeaturedProducts from "./_featured-products";
import banner1Government from "./banner-1-government.jpg";
import banner2CatalogsLiterature from "./banner-2-catalogs-literature.jpg";
import banner3Machinery from "./banner-3-machinery.jpg";
import Carousel from "./carousel";
import EmailSignup from "./email-signup";
import type { CarouselBanner, FeaturedProduct } from "./types";

type BannerIconProps = {
  className: string;
};
const BANNERS = [
  {
    title: "Government",
    description: "We are a SAM Approved U.S. Government Vendor",
    background: banner1Government,
    href: "/government",
    Icon: ({ className }: BannerIconProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="132"
        height="126"
        fill="none"
        viewBox="0 0 132 126"
        className={className}
      >
        <g fill="#fff" filter="url(#filter0_d_12190_12320)">
          <path d="M21.357 105.6h-5.74v4.8h100.766v-4.8H21.357zM68.386 22.2h9.093l-2.361-3.155a.59.59 0 010-.722l2.361-2.723h-9.377c.18.324.28.68.284 1.045V22.2zM110.005 99.6h-88.01v4.8h88.01v-4.8zM103.628 93.6H28.372v4.8h75.256v-4.8zM89.966 57.6h7.284v34.8h-7.284V57.6zM75.108 57.6h7.285v34.8h-7.285V57.6zM67.11 26.424v-9.778c0-.577-.497-1.045-1.11-1.045-.613 0-1.111.468-1.111 1.045v9.778h2.222zM34.75 57.6h7.284v34.8h-7.285V57.6zM49.598 57.6h7.284v34.8h-7.284V57.6zM42.672 56.4h60.956v-4.8H28.372v4.8h14.3zM66 27.6c-17.947 0-32.615 10.177-33.064 22.8h66.128C98.616 37.8 83.947 27.6 66 27.6z"></path>
        </g>
        <defs>
          <filter
            id="filter0_d_12190_12320"
            width="157.552"
            height="150"
            x="-12.776"
            y="-12"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_12190_12320"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_12190_12320"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    title: "Catalogs & Literature",
    description: "Digital versions to download",
    background: banner2CatalogsLiterature,
    href: "/catalogs-literature",
    Icon: ({ className }: BannerIconProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="134"
        height="120"
        fill="none"
        viewBox="0 0 134 120"
        className={className}
      >
        <g
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
          filter="url(#filter0_d_14988_4068)"
        >
          <path d="M50.339 23.68c-7.374.024-15.635.071-23.278.038v57.638h19.172c5.705 0 10.902.595 14.868 2.1 1.664.632 3.124 1.443 4.265 2.474V32.08c0-2.474-.548-4.11-1.395-5.25-.848-1.139-2.038-1.88-3.707-2.362-2.502-.727-5.965-.797-9.925-.788zm-13.91 17.026h.039c.08-.009.16-.009.24 0h16.82c.34-.004.673.118.913.343.244.23.383.534.383.857 0 .32-.14.629-.383.854-.24.224-.574.351-.912.346H36.707c-.702.07-1.34-.407-1.415-1.068-.08-.666.433-1.261 1.136-1.332zm.278 6.45H53.53c.343-.004.672.118.911.343.245.23.384.534.384.857 0 .32-.14.628-.383.853-.24.225-.569.352-.912.347H36.707a1.307 1.307 0 01-.912-.346 1.166 1.166 0 01-.383-.854c0-.323.14-.628.383-.857.24-.225.568-.347.912-.343zM81.987 23.68c-3.557.01-6.676.123-8.968.788-1.664.483-2.86 1.224-3.707 2.363s-1.395 2.775-1.395 5.25v53.85c1.14-1.031 2.6-1.842 4.265-2.475 3.966-1.505 9.153-2.1 14.867-2.1h19.173c0-19.22-.02-38.452 0-57.637-8.206 0-16.323.032-24.235-.038zm-2.79 17.026c.095-.009.184-.009.28 0h16.82c.344-.004.673.118.913.343.244.23.383.534.383.857 0 .32-.14.629-.383.854-.24.224-.569.351-.912.346H79.476c-.702.07-1.34-.407-1.415-1.068-.075-.666.433-1.261 1.136-1.332zm.08 6.45a1.41 1.41 0 01.2 0h16.82a1.32 1.32 0 01.913.343c.244.23.383.534.383.857 0 .32-.14.628-.383.853a1.324 1.324 0 01-.912.347H79.476c-.702.052-1.32-.445-1.375-1.106-.055-.666.473-1.242 1.176-1.294z"></path>
          <path d="M15.46 28.556h9.05v63.075c0 .872.607 1.2 1.554 1.2h81.434c.773 0 1.276-.614 1.276-1.2V28.556h9.765l-6.855 67.763H22.318L15.46 28.556z"></path>
          <path d="M27.06 83.756h19.173c5.516 0 10.513.605 13.952 1.913 1.719.651 3.004 1.49 3.866 2.437.628.69 1.061 1.44 1.236 2.325H27.06v-6.675zM87.05 83.756h19.172v6.675H67.996c.175-.886.608-1.636 1.236-2.325.857-.947 2.147-1.786 3.866-2.437 3.438-1.308 8.426-1.913 13.952-1.913z"></path>
        </g>
        <defs>
          <filter
            id="filter0_d_14988_4068"
            width="157.552"
            height="150"
            x="-11.776"
            y="-15"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_14988_4068"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_14988_4068"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    title: "Machinery",
    description: "Explore out full line of woodworking machinery",
    background: banner3Machinery,
    href: "https://www.wurthmachinery.com/",
    Icon: ({ className }: BannerIconProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="144"
        height="122"
        fill="none"
        viewBox="0 0 144 122"
        className={className}
      >
        <g fill="#fff" filter="url(#filter0_d_14988_4730)">
          <path d="M80.764 71.153c.618 0 1.171-.347 1.405-.881a1.378 1.378 0 00-.329-1.561 1.59 1.59 0 00-1.654-.31c-.568.226-.942.746-.942 1.323.005.787.683 1.43 1.52 1.43zM72 28.098c-5.386 0-10.389 2.635-13.204 6.961-2.81 4.322-3.035 9.708-.588 14.226h27.578c2.451-4.514 2.227-9.904-.583-14.226-2.815-4.326-7.818-6.96-13.204-6.96H72z"></path>
          <path d="M92.26 47.434c.183-.487.687-.806 1.24-.778 1.49.08 6.258-.9 7.837-4.458-2.586.802-5.515.727-7.892-.295a1.174 1.174 0 01-.727-1.031l-.03-.933h-.005c-.015-.516.328-.98.842-1.144.901-.29 2.72-1.34 4.036-3.037a6.353 6.353 0 001.464-3.858c-2.077 1.654-4.828 2.62-7.443 2.508h.005a1.253 1.253 0 01-1.072-.666l-.603-1.186v.005a1.122 1.122 0 01.294-1.378c1.111-.938 3.752-4.796 2.193-8.363-1.226 2.288-3.358 4.181-5.805 5.044v-.005c-.443.155-.942.061-1.29-.244l-.723-.637a1.13 1.13 0 01-.264-1.373c.419-.807.917-2.757.573-4.833l-.005.004a6.38 6.38 0 00-1.863-3.703c-.23 2.555-1.445 5.063-3.378 6.722h.005a1.32 1.32 0 01-1.256.244l-1.315-.436c-.523-.173-.862-.652-.832-1.172.08-1.397-.957-5.883-4.739-7.369.852 2.433.773 5.19-.314 7.425-.199.408-.622.67-1.096.685l-.991.028c-.543.019-1.037-.305-1.216-.788-.483-1.326-3.224-5.123-7.324-5.17 1.753 1.955 2.78 4.542 2.66 6.994v.005c-.02.43-.289.815-.702 1.003l-1.256.567h-.005a1.305 1.305 0 01-1.465-.272c-.996-1.045-5.097-3.53-8.894-2.063 2.432 1.154 4.445 3.16 5.362 5.461v-.004c.164.417.065.89-.26 1.214l-.677.68a1.303 1.303 0 01-1.455.248c-.857-.394-2.93-.863-5.137-.54v.006a7.151 7.151 0 00-3.936 1.753c2.715.215 5.381 1.364 7.15 3.178.309.318.409.768.254 1.176l-.463 1.238c-.185.492-.693.81-1.24.782-1.486-.075-6.259.9-7.838 4.458 2.585-.801 5.515-.726 7.892.296.433.182.712.58.727 1.026l.03.933c.02.516-.324.98-.837 1.148-1.011.324-2.596 1.322-3.806 2.757h8.794c-2.367-5.227-1.784-11.213 1.544-15.947 3.328-4.735 8.959-7.585 14.993-7.585 6.034 0 11.664 2.85 14.992 7.585 3.324 4.734 3.907 10.72 1.545 15.947h3.208a1.122 1.122 0 01.05-.614l.463-1.238zM73.65 75.18h19.904V64.266H73.649v10.912zM87.48 67.12c0-.646.558-1.171 1.246-1.171.687 0 1.245.525 1.245 1.171v5.204c0 .646-.558 1.171-1.245 1.171-.688 0-1.246-.525-1.246-1.171V67.12zm-6.716-1.171c1.624 0 3.089.918 3.707 2.33.622 1.41.279 3.032-.867 4.11-1.151 1.078-2.875 1.402-4.375.82-1.495-.585-2.476-1.963-2.476-3.487.005-2.081 1.798-3.773 4.01-3.773z"></path>
          <path d="M100.769 58.098H43.232v23.246l57.537.004v-23.25zm-4.723 18.249v.005c0 .309-.13.609-.364.825-.234.22-.548.346-.882.346H72.403c-.687 0-1.245-.525-1.245-1.171V63.095c0-.647.558-1.172 1.245-1.172H94.8c.334 0 .648.127.882.343.234.22.364.52.364.83v13.25zM15.947 51.63h112.107v4.124H15.947V51.63z"></path>
          <path d="M116.664 87.414L72 92.73l-44.664-5.316V58.098h-5.45v48.839h5.45v-6.529L72 95.092l44.664 5.316v6.529h5.451V58.098h-5.451v29.316zM27.337 98.046v-8.269l34.738 4.134-34.738 4.135zm89.327 0L81.926 93.91l34.738-4.134v8.269z"></path>
        </g>
        <defs>
          <filter
            id="filter0_d_14988_4730"
            width="157.552"
            height="150"
            x="-6.776"
            y="-14"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_14988_4730"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_14988_4730"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    ),
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

      <section>
        <div className="flex flex-row items-center gap-2.5">
          <Title asChild>
            <h2>Featured Brand</h2>
          </Title>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-gray-300"
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

      <section className="mt-9 flex flex-row justify-between gap-[33px]">
        {BANNERS.map(({ Icon, ...banner }) => (
          <Link href={banner.href} key={banner.href} className="relative">
            <Image
              src={banner.background}
              placeholder="blur"
              width={352}
              height={344}
              alt={`The background for ${banner.title}`}
              className="h-auto w-[352px] object-cover"
            />

            <Icon className="absolute inset-x-0 top-4 mx-auto" />

            <div className="absolute bottom-0 left-6 right-0 top-[164px] bg-black/40 p-5 text-white backdrop-blur-sm">
              <div className="font-wurth text-4xl font-extrabold uppercase leading-none">
                {banner.title}
              </div>

              <div className="mb-[18px] mt-1.5 text-lg leading-6">
                {banner.description}
              </div>

              <div className="flex flex-row items-center gap-2 font-wurth text-base font-extrabold uppercase leading-[22px] text-brand-secondary">
                <span>Learn more</span>
                <MdChevronRight className="text-xs leading-none" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Separator
        orientation="horizontal"
        className="my-[55px] h-px w-full bg-brand-gray-200"
      />

      <section className="mb-[92px] flex flex-row justify-between gap-5">
        <div className="max-w-[370px] flex-1">
          <EmailSignup />

          <div className="mt-5">
            <Title className="text-[19px] leading-6" asChild>
              <h3>Keep In Touch Through Social Media</h3>
            </Title>

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
