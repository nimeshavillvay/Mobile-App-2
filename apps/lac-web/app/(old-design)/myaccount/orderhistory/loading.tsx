import Separator from "@/old/_components/separator";

const OrderHistoryLoading = () => {
  return (
    <>
      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        My Orders
      </h2>

      <Separator
        orientation="horizontal"
        className="mb-4 h-px flex-1 bg-brand-primary"
      />

      <div className="py-4 text-center">My Orders Loading...</div>
    </>
  );
};

export default OrderHistoryLoading;
