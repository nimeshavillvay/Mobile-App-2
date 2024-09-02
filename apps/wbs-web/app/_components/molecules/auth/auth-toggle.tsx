import { cn, toCamelCase } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/base/atoms/button";
import Link from "next/link";

type AuthenticationToggleProps = {
  readonly mode: "sign-in" | "register";
};

const AuthenticationToggle = ({ mode }: AuthenticationToggleProps) => {
  const text =
    mode === "register"
      ? "Already have an online account"
      : `Don't have an online account?`;
  const linkText = mode === "register" ? "Sign In" : "Create Account";
  const href = mode === "register" ? "/sign-in" : "/register";

  return (
    <div
      className="flex items-center justify-between text-center text-sm font-normal"
      data-testid="auth-toggle"
    >
      {text}
      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "inline-block h-fit p-0 px-4 py-1 text-center text-sm font-bold",
        )}
        data-testid={`link-${toCamelCase(linkText)}`}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthenticationToggle;
