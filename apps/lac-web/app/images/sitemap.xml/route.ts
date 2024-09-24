import {
  getFullUrl,
  getNumberOfPages,
  getSitemapImages,
} from "@/_lib/sitemap-helpers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const sitemapImages = await getSitemapImages();

  const urls: string[] = [];

  const numberOfImagePages = getNumberOfPages(sitemapImages);
  Array.from({ length: numberOfImagePages }).forEach((_, index) => {
    urls.push(getFullUrl(`/images/sitemaps/sitemap/${index}.xml`));
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
