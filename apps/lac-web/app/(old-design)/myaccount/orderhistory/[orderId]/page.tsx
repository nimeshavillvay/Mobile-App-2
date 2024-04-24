type DetailedOrderPageProps = {
  params: {
    orderId: string;
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
