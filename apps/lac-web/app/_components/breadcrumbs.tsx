import VisuallyHidden from "@/_components/visually-hidden";
import { api } from "@/_lib/api";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";

type BreadcrumbsProps =
  | {
      id: string;
      type: "product";
      currentPageTitle: string;
    }
  | {
      id: string;
      type: "category";
    };

const Breadcrumbs = async (props: BreadcrumbsProps) => {
  const { id, type } = props;
  const currentPageTitle =
    props.type === "product" ? props.currentPageTitle : null;

  const breadcrumbs = await api
    .get("pim/webservice/rest/breadcrumbs", {
      searchParams: new URLSearchParams({
        [type === "product" ? "group_id" : "catId"]: id,
      }),
      next: {
        revalidate: 3600,
      },
    })
    .json<
      {
        oo_id: number;
        cat_name: string;
        slug: string;
      }[]
    >();

  return (
    <nav className="bg-brand-light-gray">
      <ul className="max-w-desktop mx-auto flex flex-row items-center">
        <li className="flex flex-row items-center after:mx-2 after:content-['/']">
          <Link href="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <MdOutlineHome />
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.oo_id}
            className={cn(
              (index !== breadcrumbs.length - 1 || !!currentPageTitle) &&
                "flex flex-row items-center after:mx-2 after:content-['/']",
            )}
          >
            <Link href={`/category/${breadcrumb.oo_id}`}>
              {breadcrumb.cat_name}
            </Link>
          </li>
        ))}

        {props.type === "product" && <li>{currentPageTitle}</li>}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
