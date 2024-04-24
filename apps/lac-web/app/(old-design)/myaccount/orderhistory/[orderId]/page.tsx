import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "../back-button";

type DetailedOrderPageProps = {
  params: {
    orderId: string;
  };
};

export const generateMetadata = async ({
  params: { orderId },
}: DetailedOrderPageProps): Promise<Metadata> => {
  // Check if the orderId exists
  if (!orderId) {
    return notFound();
  }

  return {
    title: orderId,
    description: orderId,
  };
};

const DetailedOrderPage = ({ params: { orderId } }: DetailedOrderPageProps) => {
  return (
    <>
      <BackButton title="Back to My Orders" />
      <h1>Order Details {orderId}</h1>
      <p>This is the detailed order page</p>
    </>
  );
};

export default DetailedOrderPage;
