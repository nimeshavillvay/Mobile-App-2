"use client";

import { Button } from "@/old/_components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ orderId }: { orderId: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="my-4 text-base text-black"
      onClick={() => router.back()}
    >
      <FaArrowLeft /> Back to Order #{orderId}
    </Button>
  );
};

export default BackButton;
