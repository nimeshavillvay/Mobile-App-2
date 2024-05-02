import { Button } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import ButtonContent from "./button-content";
import type { ViewportTypes } from "./types";

type SignInLinkProps = {
  type: ViewportTypes;
  text?: string;
};

const SignInLink = ({ type, text = "Sign in / Register" }: SignInLinkProps) => {
  return (
    <Button
      variant="ghost"
      size={type === "mobile" ? "icon" : "default"}
      className={
        type === "mobile"
          ? "size-6 md:hidden"
          : "hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0"
      }
      asChild
    >
      <Link href="/sign-in">
        <ButtonContent text={text} />
      </Link>
    </Button>
  );
};

export default SignInLink;
