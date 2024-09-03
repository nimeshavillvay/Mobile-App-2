import { cn } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { SECTIONS, SOCIAL_LINKS } from "./constants";
import { Fsc, VenderFreightRouting, VikingCloud } from "./footer";
import FooterSaleRepDetails from "./footer-sales-rep-details";
import Subscribe from "./subscribe";

const FooterLinksLoggedIn = () => {
  return (
    <>
      <section className="container hidden md:grid md:grid-cols-5 md:gap-8">
        {SECTIONS.map(
          (section) =>
            section.links.length > 0 && (
              <div
                key={section.heading}
                className="space-y-3 text-sm text-black"
              >
                <h3 className="font-bold text-wurth-gray-500">
                  {section.heading}
                </h3>

                <ul>
                  {section.links.map((link) => (
                    <li key={link.label} className="leading-8 hover:underline">
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
        )}
        <div className="col-span-2">
          <FooterSaleRepDetails />
        </div>
      </section>

      <section className="container md:hidden">
        <Subscribe />
      </section>

      <div className="container flex flex-col gap-6 md:flex-row-reverse md:items-center md:justify-between">
        <div className="flex flex-col">
          <div className="hidden md:block">
            <Subscribe />
          </div>
          <ul className="float-end flex flex-row items-center justify-center gap-4 md:self-end">
            {SOCIAL_LINKS.map(({ name, Icon, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "btnAction group p-0",
                  )}
                  data-btn-action="Footer Social Link"
                >
                  <Icon className="size-4 fill-wurth-gray-800 group-hover:fill-red-800 md:size-6" />

                  <span className="sr-only">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <VikingCloud />

          <Fsc />

          <VenderFreightRouting />
        </div>
      </div>
    </>
  );
};

export default FooterLinksLoggedIn;
