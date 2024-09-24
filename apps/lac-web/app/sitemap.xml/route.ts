import {
  getFullUrl,
  getNumberOfPages,
  getSitemapProducts,
} from "@/_lib/sitemap-helpers";
import { NextResponse } from "next/server";

// We're using a Route Handler to manually generate the index sitemap because
// Next.js doesn't have an inbuilt way to generate one
export const GET = async () => {
  const sitemapProducts = await getSitemapProducts();

  const urls = [
    getFullUrl("/information/sitemap.xml"),
    getFullUrl("/category/sitemap.xml"),
  ];

  const numberOfProductPages = getNumberOfPages(sitemapProducts);
  Array.from({ length: numberOfProductPages }).forEach((_, index) => {
    urls.push(getFullUrl(`/product/sitemap/${index}.xml`));
  });

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  urls.forEach((url) => {
    xml += "<sitemap>";
    xml += `<loc>${url}</loc>`;
    xml += "</sitemap>";
  });

  xml += "</urlset>";

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
