import { api } from "@/_lib/api";
import { getBoolean } from "@/_lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCreditCards = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "credit-cards", token],
    queryFn: async () =>
      api
        .get("rest/my-account/creditcards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<{
          creditcard: {
            card_id: number;
            type: "MC" | "VISA";
            number: string;
            name: string;
            expiry_date: string;
            default_payment_card: "" | "Y";
          }[];
        }>(),
    select: (data) =>
      data.creditcard.map((card) => ({
        id: card.card_id,
        type: card.type,
        number: card.number,
        name: card.name,
        expiryDate: card.expiry_date,
        defaultPaymentCard: getBoolean(card.default_payment_card),
      })),
  });
};

export default useSuspenseCreditCards;
