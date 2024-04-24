import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    <div>
      <h1>Order Details {orderId}</h1>
      <p>This is the detailed order page</p>
    </div>
  );
};

export default DetailedOrderPage;
