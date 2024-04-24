"use client";

import { Button } from "@/old/_components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ title = "Back" }: { title: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="my-4 px-0 text-base text-black"
      onClick={() => router.back()}
    >
      <FaArrowLeft /> {title}
    </Button>
  );
};

export default BackButton;
