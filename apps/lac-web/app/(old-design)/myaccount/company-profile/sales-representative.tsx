"use client";

import { cn } from "@/_lib/utils";
import { Email } from "@repo/web-ui/components/icons/email";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { buttonVariants } from "@repo/web-ui/components/ui/button";

const SalesRepresentative = () => {
  return (
    <div className="space-y-6 rounded-lg border p-6 font-body text-wurth-gray-800 shadow-md">
      <h4 className="font-title text-xl font-medium tracking-[-0.1px]">
        Your Sales Representative
      </h4>

      <div className="flex flex-row items-start gap-4">
        <div className="size-36 shrink-0 rounded-lg bg-green-600" />

        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <h5 className="text-lg font-semibold">Ronald Richards</h5>

            <ul className="flex flex-row items-center gap-6">
              <li>
                <a
                  href={`tel:18663268131`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "group h-fit p-0",
                  )}
                >
                  <Phone className="group-hover:stroke-red-800" />

                  <span>1-866-326-8131</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:johndoe@gmail.com`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "group h-fit p-0",
                  )}
                >
                  <Email className="group-hover:fill-red-800" />

                  <span>johndoe@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-1 rounded-md bg-wurth-gray-50 p-4 text-sm">
            <h5 className="font-semibold">A message from Ronald</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              metus elit, placerat sed placerat a, venenatis ac dolor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentative;
