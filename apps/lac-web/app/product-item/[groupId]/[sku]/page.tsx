import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { notFound, permanentRedirect } from "next/navigation";

type OldProductPageProps = {
  params: {
    groupId: string;
    sku: string;
  };
};

const OldProductPage = async ({
  params: { groupId, sku },
}: OldProductPageProps) => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  sendGTMEvent({
    event: "view_page",
    viewPageData: {
      page_type: getGTMPageType(
        pathnameHistory[pathnameHistory.length - 1] ?? "",
      ),
    },
  });

  const response = await api
    .get("rest/getproductid", {
      searchParams: {
        sku,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      productid: string;
      groupid: string;
      slug: string;
    }>();

  if (response.groupid !== groupId) {
    return notFound();
  }

  return permanentRedirect(`/product/${response.productid}/${response.slug}`);
};

export default OldProductPage;
