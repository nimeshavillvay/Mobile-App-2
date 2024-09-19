import { toCamelCase } from "@/_lib/utils";
import { Button } from "@repo/web-ui/components/base/atoms/button";
import { Email } from "@repo/web-ui/components/icons/email";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { Text } from "@repo/web-ui/components/icons/text";
import Link from "next/link";

type TopBarProps = {
  readonly email: string;
  readonly phoneNumber: string;
  readonly companyName: string;
};

const TopBar = ({ email, phoneNumber, companyName }: TopBarProps) => {
  return (
    <div className="bg-wurth-gray-50">
      <div className="container flex items-center justify-between py-3 text-sm font-medium">
        <Link
          href="/"
          className="hidden md:block"
          data-testid={`link-${toCamelCase(companyName)}`}
        >
          {companyName}
          <span className="sr-only">{companyName}</span>
        </Link>
        <div className="flex flex-row items-center gap-6">
          <Button
            variant="link"
            className="group h-fit px-0 py-0 font-medium"
            asChild
            data-testid="button-phoneNumber"
          >
            <a href={`tel:+${phoneNumber}`}>
              <Text
                width={16}
                height={16}
                className="group-hover:stroke-red-800"
                data-testid="icon-Text"
              />
              <Phone
                width={16}
                height={16}
                className="group-hover:stroke-red-800"
                data-testid="icon-phone"
              />

              <span>{phoneNumber.replace(/\D/g, "")}</span>
            </a>
          </Button>
          <Button
            variant="link"
            className="group h-fit px-0 py-0 font-medium"
            asChild
            data-testid="button-email"
          >
            <a href={`mailto:${email}`}>
              <Email
                width={16}
                height={16}
                className="group-hover:fill-red-800"
                data-testid="icon-email"
              />

              <span>Need help?</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
