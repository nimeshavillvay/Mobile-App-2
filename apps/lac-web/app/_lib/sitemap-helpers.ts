import { PRODUCTION_URL, SITEMAP_PAGE_SIZE } from "@/_lib/constants";
import type { MetadataRoute } from "next";
import "server-only";
import { z } from "zod";
import { xCartSearchApi } from "./api";

export const getFullUrl = (pathname: string) => {
  return `${PRODUCTION_URL}${pathname}`;
};

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export const isChangeFrequency = (
  changeFreq: unknown,
): changeFreq is ChangeFrequency => {
  if (
    (changeFreq as ChangeFrequency) === "always" ||
    (changeFreq as ChangeFrequency) === "daily" ||
    (changeFreq as ChangeFrequency) === "hourly" ||
    (changeFreq as ChangeFrequency) === "monthly" ||
    (changeFreq as ChangeFrequency) === "never" ||
    (changeFreq as ChangeFrequency) === "weekly" ||
    (changeFreq as ChangeFrequency) === "yearly"
  ) {
    return true;
  }

  return false;
};

const sitemapPaginationSchema = z.object({
  totalItems: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

const categorySitemapSchema = z.array(
  z.object({
    category: z.string(),
    categoryid: z.string(),
    priority: z.string(),
    changefreq: z.string(),
    image: z.string(),
    slug: z.string(),
  }),
);

export const getSitemapCategories = async () => {
  const response = await xCartSearchApi
    .get("rest/sitemap/category", {
      cache: "no-store",
    })
    .json();

  return await categorySitemapSchema.parseAsync(response);
};

const productSitemapSchema = z.object({
  pagination: sitemapPaginationSchema,
  data: z.array(
    z.object({
      productid: z.string(),
      product: z.string(),
      priority: z.string(),
      changefreq: z.string(),
      categoryid: z.string(),
      category: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  ),
});

export const getSitemapProducts = async (
  page: number,
  limit = SITEMAP_PAGE_SIZE,
) => {
  const response = await xCartSearchApi
    .get("rest/sitemap/product", {
      cache: "no-store",
      searchParams: {
        page,
        limit,
      },
    })
    .json();

  return productSitemapSchema.parse(response);
};

const assetsSitemapSchema = z.object({
  pagination: sitemapPaginationSchema,
  data: z.array(
    z.object({
      url: z.string(),
      type: z.string(),
      priority: z.string(),
      changefreq: z.string(),
    }),
  ),
});

export const getSitemapAssets = async (
  page: number,
  limit = SITEMAP_PAGE_SIZE,
) => {
  const response = await xCartSearchApi
    .get("rest/sitemap/assets", {
      cache: "no-store",
      searchParams: {
        page,
        limit,
      },
    })
    .json();

  return assetsSitemapSchema.parse(response);
};

const imageSitemapSchema = z.object({
  pagination: sitemapPaginationSchema,
  data: z.array(
    z.object({
      productid: z.string(),
      priority: z.string(),
      changefreq: z.string(),
      image: z.string(),
      type: z.string(),
    }),
  ),
});

export const getSitemapImages = async (
  page: number,
  limit = SITEMAP_PAGE_SIZE,
) => {
  const response = await xCartSearchApi
    .get("rest/sitemap/image", {
      cache: "no-store",
      searchParams: {
        page,
        limit,
      },
    })
    .json();

  return imageSitemapSchema.parse(response);
};
