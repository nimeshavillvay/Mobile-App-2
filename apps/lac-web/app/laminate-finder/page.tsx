import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import ColorPicker from "./color-picker";
import LaminatesList from "./laminates-list";
import { cookies } from "next/headers";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";

const Page = () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <div className="md mx-width container mb-10">
      <div className="py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Laminate Finder</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="line-clamp-3 text-balance font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
        Laminate Finder
      </h1>
      <div className="mt-4 flex gap-10">
        <section className="grow">
          <ColorPicker token={tokenCookie.value} />
          <LaminatesList />
        </section>
      </div>
    </div>
  );
};

export default Page;
