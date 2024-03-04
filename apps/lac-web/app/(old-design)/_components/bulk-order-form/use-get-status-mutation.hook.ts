import useCookies from "@/(old-design)/_hooks/storage/use-cookies.hook";
import { api } from "@/(old-design)/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/(old-design)/_lib/constants";
import { useMutation } from "@tanstack/react-query";

const useGetStatusMutation = () => {
  const [cookies] = useCookies();

  return useMutation({
    mutationFn: (
      items: { sku: string; quantity: number; jobName?: string }[],
    ) =>
      api
        .post("pim/webservice/rest/getstatus", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
            //"Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(
            items.map((item) => ({
              sku: item.sku,
              mqt: item.quantity,
              poOrJobName: item.jobName,
            })),
          ),
        })
        .json<
          {
            sku: string;
            availability: string;
            mqt: string;
            qmm: string;
            qm: string;
            requestedQT: number;
            txt_min_order_amount: string;
            txt_product_summary: string;
            product_exclution: boolean;
            product_exclution_msg: null;
            product_discontinue: boolean;
            product_discontinue_msg: null;
            product_qty_multiple: boolean;
            product_qty_multiple_msg: null;
            product_image: string;
            product_brand: string;
          }[]
        >(),
  });
};

export default useGetStatusMutation;
