"use client";

import { cn } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = {
  readonly title: string;
  readonly className?: string;
};

const BackButton = ({ title = "Back", className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn("px-0 text-base text-black", className)}
      onClick={() => router.back()}
    >
      <FaArrowLeft /> {title}
    </Button>
  );
};

export default BackButton;
