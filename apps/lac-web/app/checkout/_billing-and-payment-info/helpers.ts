import type { CartConfiguration, PaymentMethod } from "@/_lib/types";
import dayjs from "dayjs";
import type { CreditCard } from "./types";

export const isExpiredCreditCard = (date: string) => {
  const [month, year] = date.split("/");
  if (month && year) {
    const comparedDate = dayjs()
      .set("month", parseInt(month) - 1)
      .set("year", parseInt(year) + 2000);
    return comparedDate.isBefore(dayjs(), "month");
  }
  return false;
};

export const getPaymentId = (
  {
    paymentToken,
    paymentMethod,
  }: Pick<CartConfiguration, "paymentToken" | "paymentMethod">,
  {
    creditCards,
    paymentMethods,
  }: {
    creditCards: CreditCard[];
    paymentMethods: PaymentMethod[];
  },
) => {
  const nonExpiredCards = creditCards.filter(
    (card) => !isExpiredCreditCard(card.expiryDate),
  );
  // Search for the credit card
  const creditCard = creditCards.find((card) => card.number === paymentToken);
  if (creditCard && !isExpiredCreditCard(creditCard.expiryDate)) {
    return creditCard.id.toString();
  } else if (nonExpiredCards[0] !== undefined) {
    return nonExpiredCards[0].id.toString();
  }

  // Search for the payment method
  const selectedPaymentMethod = paymentMethods.find(
    (paymentMethodItem) => paymentMethodItem.code === paymentMethod,
  );
  if (selectedPaymentMethod) {
    return selectedPaymentMethod.code;
  }

  return "";
};
