import { API_BASE_URL } from "@/lib/constants";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${API_BASE_URL}/rest/pricecheck`, () => {
    return HttpResponse.json({
      error: null,
      items: [
        {
          productid: "131581",
          price: 1.05,
          price_unit: "Each",
          extended: 1.05,
          list_price: 2.21,
          coupon: null,
          price_breakdowns: [],
        },
      ],
    });
  }),
];
