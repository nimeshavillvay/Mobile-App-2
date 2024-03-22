import Separator from "@/old/_components/separator";
import type { Metadata } from "next";
import PurchasedItemsList from "./purchased-items-list";

export const metadata: Metadata = {
  title: "Purchased Items",
};

const PurchasedItemsPage = () => {
  return (
    <>
      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        My Purchased Items
      </h2>

      <Separator
        orientation="horizontal"
        className="mb-4 h-px flex-1 bg-brand-primary"
      />

      <PurchasedItemsList />
    </>
  );
};

export default PurchasedItemsPage;
