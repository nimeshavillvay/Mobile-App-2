"use client";

import { API_BASE_URL, API_KEY } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import useSuspenseAccountList from "@repo/shared-logic/apis/hooks/account/use-suspense-account-list.hook";
import { Email } from "@repo/web-ui/components/icons/email";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image from "next/image";

type SalesRepresentativeProps = {
  readonly token: string;
};

const SalesRepresentative = ({ token }: SalesRepresentativeProps) => {
  const accountListQuery = useSuspenseAccountList({
    baseUrl: API_BASE_URL,
    token,
    apiKey: API_KEY,
  });
  const salesRep = accountListQuery.data.sales_rep;

  if (Array.isArray(salesRep) || !("fullname" in salesRep)) {
    // If there is not sales rep, the field is an empty array
    return null;
  }

  return (
    <div className="space-y-6 rounded-lg border p-6 font-body text-wurth-gray-800 shadow-md">
      <h4 className="font-title text-xl font-medium tracking-[-0.1px]">
        Your Sales Representative
      </h4>

      <div className="flex flex-row items-start gap-4">
        <Image
          src={salesRep.img}
          alt={salesRep.fullname}
          width={144}
          height={144}
          className="size-36 shrink-0 rounded-lg object-contain"
        />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="space-y-1">
            <h5 className="text-lg font-semibold">{salesRep.fullname}</h5>

            <ul className="flex flex-col">
              <li>
                <a
                  href={`tel:18663268131`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "group h-fit p-0",
                  )}
                >
                  <Phone className="group-hover:stroke-red-800" />

                  <span>{salesRep.phone}</span>
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

                  <span>{salesRep.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {!!salesRep.message && (
            <div className="space-y-1 rounded-md bg-wurth-gray-50 p-4 text-sm">
              <h5 className="font-semibold">A message from Ronald</h5>

              <p>{salesRep.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentative;
