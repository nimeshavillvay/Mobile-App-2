import Separator from "@/_components/separator";
import VisuallyHidden from "@/_components/visually-hidden";
import { api } from "@/_lib/api";
import type { CarouselBanner, FeaturedProduct } from "@/_lib/types";
import { getMediaUrl } from "@/_utils/helpers";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import banner1Government from "./banner-1-government.jpg";
import banner2CatalogsLiterature from "./banner-2-catalogs-literature.jpg";
import banner3Machinery from "./banner-3-machinery.jpg";
import Carousel from "./carousel";

const FeaturedProducts = dynamic(() => import("./featured-products"));
const EmailSignup = dynamic(() => import("./email-signup"));

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

const HomePage = async () => {
  const [carouselData, featuredProducts, featuredBrand, bottomBanners] =
    await Promise.all([
      api
        .get("pim/webservice/rest/carouselbanner", {
          next: { revalidate: 3600 },
        })
        .json<CarouselBanner[]>(),
      api
        .get("pim/webservice/rest/getfeatureproducts", {
          next: { revalidate: 3600 },
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
          next: { revalidate: 3600 },
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
          next: { revalidate: 3600 },
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
        <h3>Featured Brand</h3>

        <Image
          src={getMediaUrl(featuredBrand[0].brand.logo)}
          alt={`The logo of ${featuredBrand[0].brand.name}`}
          width={130}
          height={50}
          className="height-[50px] w-[130px] border object-contain px-[10px] py-[3px]"
        />

        <div className="grid grid-cols-4 gap-2">
          {featuredBrand[1].groups.map((group) => (
            <div key={group.groupId}>
              <Link
                href={`/product-item/${group.groupId}/${group.itemSkuList[0]?.txt_wurth_lac_item}`}
              >
                <VisuallyHidden>{group.item_group_name}</VisuallyHidden>

                <Image
                  src={getMediaUrl(group.group_img)}
                  alt={`An image of the group ${group.item_group_name}`}
                  width={226}
                  height={226}
                  className="border border-black object-contain"
                />
              </Link>

              <div>{group.brandName}</div>

              <div>{group.item_group_name}</div>

              <div>
                {group.itemSkuList.length}{" "}
                {group.itemSkuList.length > 1 ? "variations" : "variation"}
              </div>

              <Link
                href={`/product-item/${group.groupId}/${group.itemSkuList[0]?.txt_wurth_lac_item}`}
                className="bg-brand-primary rounded p-2 uppercase text-white"
              >
                View item
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-desktop mx-auto grid grid-cols-3 gap-[30px]">
        {BANNERS.map((banner) => (
          <Link
            href={banner.href}
            key={banner.href}
            className="relative h-[353px]"
          >
            <Image
              src={banner.background}
              placeholder="blur"
              fill
              alt={`The background for ${banner.title}`}
              className="object-cover"
            />

            <div className="absolute bottom-0 right-0 max-w-[328px] bg-black/50 text-white backdrop-blur">
              <div className="font-bold uppercase">{banner.title}</div>

              <div>{banner.description}</div>

              <div className="text-brand-secondary font-medium uppercase">
                Learn more
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Separator
        orientation="horizontal"
        className="max-w-desktop mx-auto my-[55px] h-px w-full bg-black"
      />

      <section className="max-w-desktop mx-auto grid grid-cols-3 gap-1">
        <div>
          <EmailSignup />

          <div>
            <h3>Keep In Touch Through Social Media</h3>
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
              title={banner.alt_tag}
              width={376}
              height={200}
            />
          </Link>
        ))}
      </section>
    </>
  );
};

export default HomePage;
