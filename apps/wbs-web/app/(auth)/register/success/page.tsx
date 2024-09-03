import { cn } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/base/atoms/button";
import Link from "next/link";

const RegisterSuccessPage = () => {
  return (
    <div className="container" data-testid="register-success">
      <div className="mx-auto my-20 max-w-[28rem] space-y-5 rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
        <h1 className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800">
          Account created successfully
        </h1>
        <p className="text-md text-center">
          Congratulations! Your account with Wurth Baer Supply Company has been
          created successfully. You can now browse the website and make
          purchases
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            href={"/"}
            type="button"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full p-2.5 font-bold",
            )}
            data-testid="link-continue"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
