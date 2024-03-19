"use client";

import VisuallyHidden from "@/old/_components/visually-hidden";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useAccountSelectorDialog from "@/old/_hooks/account/use-account-selector-dialog.hook";
import useSelectedAddress from "@/old/_hooks/account/use-selected-address.hook";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_NO_COOKIE, ADDRESS_ID_COOKIE } from "@/old/_lib/constants";
import { cn } from "@/old/_utils/helpers";
import { type ReactNode } from "react";
import { MdSwapHoriz } from "react-icons/md";

const ShippingDetails = () => {
  const accountListQuery = useAccountList();
  const [cookies] = useCookies();
  const setOpenAccountSelector = useAccountSelectorDialog(
    (state) => state.setOpen,
  );

  const address = useSelectedAddress();

  if (
    !accountListQuery.data ||
    !cookies[ACCOUNT_NO_COOKIE] ||
    !cookies[ADDRESS_ID_COOKIE]
  ) {
    return null;
  }

  return (
    <div className="xs:block hidden bg-brand-tertiary">
      <div className="mx-auto flex max-w-desktop flex-row items-stretch gap-3.5 py-[7px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="58"
          fill="none"
          viewBox="0 0 58 58"
        >
          <path fill="#fff" d="M0 0H58V58H0z" />
          <path
            fill="#DEDEDE"
            d="M14.285 19v-3.615L11.14 10.41h2.033l2.021 3.399 1.98-3.399h1.999l-3.158 4.986V19h-1.729zm5.397-4.242c0-.875.13-1.61.392-2.203.195-.438.461-.83.797-1.178.34-.348.711-.606 1.113-.774.535-.226 1.153-.34 1.852-.34 1.266 0 2.277.393 3.035 1.178.762.786 1.143 1.877 1.143 3.276 0 1.386-.377 2.472-1.131 3.258-.754.78-1.762 1.171-3.024 1.171-1.277 0-2.293-.388-3.047-1.166-.753-.78-1.13-1.855-1.13-3.222zm1.787-.059c0 .973.224 1.711.674 2.215.449.5 1.02.75 1.71.75.692 0 1.258-.248 1.7-.744.445-.5.668-1.248.668-2.244 0-.985-.217-1.719-.65-2.203-.43-.485-1.003-.727-1.718-.727-.714 0-1.29.246-1.728.738-.438.489-.656 1.227-.656 2.215zm7.892-4.289h1.735v4.652c0 .739.021 1.217.064 1.436.074.352.25.635.527.85.282.21.665.316 1.149.316.492 0 .863-.1 1.113-.299.25-.203.4-.45.451-.744.051-.293.077-.78.077-1.459V10.41h1.734v4.512c0 1.031-.047 1.76-.14 2.185a2.401 2.401 0 01-.522 1.079c-.25.293-.586.527-1.008.703-.422.172-.973.258-1.652.258-.82 0-1.444-.094-1.87-.282-.421-.191-.755-.437-1.001-.738a2.391 2.391 0 01-.487-.955c-.113-.492-.17-1.219-.17-2.18V10.41zm8.69 8.59v-8.59h3.65c.918 0 1.584.078 1.998.235.418.152.752.425 1.002.82.25.394.375.845.375 1.353 0 .645-.19 1.178-.568 1.6-.38.418-.946.682-1.7.791.376.219.684.459.926.72.246.262.576.727.99 1.395L45.775 19h-2.075l-1.254-1.87c-.445-.667-.75-1.087-.914-1.259a1.29 1.29 0 00-.521-.357c-.184-.067-.475-.1-.873-.1h-.352V19h-1.734zm1.734-4.957h1.283c.832 0 1.352-.035 1.559-.105a.934.934 0 00.486-.364c.117-.172.176-.386.176-.644 0-.29-.078-.522-.234-.698-.153-.18-.37-.292-.65-.34-.141-.019-.563-.029-1.266-.029h-1.354v2.18zM13.139 30v-7.81h1.59v6.483h3.953V30h-5.543zm6.359-3.889c0-.802.12-1.475.36-2.02.179-.4.422-.76.73-1.079a3.094 3.094 0 011.02-.709c.491-.207 1.057-.311 1.698-.311 1.16 0 2.088.36 2.782 1.08.699.719 1.048 1.72 1.048 3.002 0 1.27-.346 2.266-1.037 2.986-.691.716-1.615 1.074-2.771 1.074-1.171 0-2.102-.356-2.793-1.069-.691-.716-1.037-1.7-1.037-2.954zm1.638-.053c0 .891.206 1.568.618 2.03.412.458.934.687 1.568.687s1.153-.227 1.558-.682c.408-.458.612-1.144.612-2.057 0-.902-.198-1.575-.596-2.02-.394-.443-.919-.665-1.574-.665s-1.183.225-1.584.676c-.401.448-.602 1.125-.602 2.03zm10.909 1.047v-1.327h3.427v3.137c-.333.322-.817.607-1.45.854-.63.244-1.27.365-1.918.365-.824 0-1.541-.172-2.154-.515a3.314 3.314 0 01-1.38-1.483 4.808 4.808 0 01-.462-2.1c0-.82.172-1.549.515-2.186a3.473 3.473 0 011.51-1.466c.505-.262 1.133-.392 1.885-.392.978 0 1.74.206 2.288.617.552.409.906.974 1.064 1.698l-1.58.295a1.65 1.65 0 00-.628-.913c-.304-.226-.686-.338-1.144-.338-.695 0-1.248.22-1.66.66-.408.44-.612 1.094-.612 1.96 0 .935.208 1.637.623 2.106.416.466.96.698 1.633.698.333 0 .666-.064.999-.193a3.48 3.48 0 00.865-.478v-.999h-1.821zm4.576-.994c0-.802.12-1.475.36-2.02.179-.4.422-.76.73-1.079a3.094 3.094 0 011.02-.709c.491-.207 1.057-.311 1.698-.311 1.16 0 2.088.36 2.782 1.08.699.719 1.048 1.72 1.048 3.002 0 1.27-.346 2.266-1.037 2.986-.69.716-1.615 1.074-2.771 1.074-1.171 0-2.102-.356-2.793-1.069-.691-.716-1.037-1.7-1.037-2.954zm1.638-.053c0 .891.206 1.568.618 2.03.412.458.934.687 1.568.687s1.153-.227 1.558-.682c.408-.458.612-1.144.612-2.057 0-.902-.199-1.575-.596-2.02-.394-.443-.918-.665-1.574-.665-.655 0-1.183.225-1.584.676-.401.448-.602 1.125-.602 2.03zM13.203 43v-8.59h1.735v3.381h3.398v-3.38h1.734V43h-1.734v-3.756h-3.398V43h-1.735zm8.666 0v-8.59h6.37v1.453h-4.636v1.905h4.313v1.447h-4.313v2.338h4.8V43h-6.534zm8.01 0v-8.59h3.65c.918 0 1.584.078 1.998.235.418.152.752.425 1.002.82.25.394.375.845.375 1.353 0 .645-.19 1.178-.568 1.6-.379.418-.945.682-1.7.791.376.219.684.459.926.72.247.262.577.727.99 1.395L37.603 43h-2.075l-1.254-1.87c-.445-.667-.75-1.087-.914-1.259a1.29 1.29 0 00-.521-.357c-.184-.067-.475-.1-.873-.1h-.352V43H29.88zm1.734-4.957h1.284c.831 0 1.351-.035 1.558-.105a.934.934 0 00.486-.364c.118-.172.176-.386.176-.644 0-.29-.078-.522-.234-.698-.153-.18-.37-.292-.65-.34-.141-.019-.563-.029-1.266-.029h-1.354v2.18zM38.545 43v-8.59h6.37v1.453h-4.636v1.905h4.313v1.447h-4.313v2.338h4.8V43h-6.534z"
          />
          <path fill="#DEDEDE" d="M13 45H45V47H13z" />
        </svg>

        <Container className="relative w-44">
          <div>Shipping address</div>

          <div className="truncate font-bold">{address?.name}</div>

          <div className="truncate font-bold">
            {address?.["street-address"]}
          </div>

          <button
            onClick={() => setOpenAccountSelector(true)}
            className="absolute right-0 top-0"
          >
            <VisuallyHidden>Change address</VisuallyHidden>

            <MdSwapHoriz className="text-2xl leading-none text-black/50" />
          </button>
        </Container>

        <Container className="w-[484px]">
          <div>
            <span className="inline-block w-40 font-bold">
              Main Ship Location:
            </span>

            <span>
              {address?.locality}, {address?.region}
            </span>
          </div>

          <div>
            <span className="inline-block w-40 font-bold">
              Preferred Ship Via:
            </span>

            <span>Ground</span>
          </div>

          <div>
            <span className="inline-block w-40 font-bold">Delivery days:</span>

            <span>Not on Truck Route</span>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ShippingDetails;

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-center border-[1.5px] border-white px-1 text-sm leading-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
