"use client";

import Separator from "@/old/_components/separator";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useAccountSelectorDialog from "@/old/_hooks/account/use-account-selector-dialog.hook";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_NO_COOKIE, ADDRESS_ID_COOKIE } from "@/old/_lib/constants";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineSwapHoriz } from "react-icons/md";
import defaultAvatar from "./default-avatar.png";

const Profile = () => {
  const accountListQuery = useAccountList();
  const [cookies] = useCookies();
  const setAccountSelectorOpen = useAccountSelectorDialog(
    (state) => state.setOpen,
  );

  const account = accountListQuery.data?.accounts.find(
    (account) => account["account-no"] === cookies[ACCOUNT_NO_COOKIE],
  );

  return (
    <div>
      <div className="flex flex-row">
        <div className="relative">
          <Image
            src={defaultAvatar}
            alt="A picture of the default avatar"
            width={117}
            height={117}
          />

          <button
            className="bg-brand-secondary absolute bottom-0 right-0 p-1 text-white"
            aria-label="Edit profile picture"
          >
            <MdOutlineModeEdit />
          </button>
        </div>

        <div>
          <div>{account?.name}</div>

          <div>
            <span>{cookies[ADDRESS_ID_COOKIE]}</span>

            <button
              aria-label="Switch address"
              onClick={() => setAccountSelectorOpen(true)}
            >
              <MdOutlineSwapHoriz />
            </button>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-black/10"
          />

          <Link
            href="/myaccount/company-profile"
            className="flex flex-row items-center gap-1"
          >
            <span>Company profile</span>

            <FaArrowRight />
          </Link>
        </div>
      </div>

      <div>
        {accountListQuery.data?.["given-name"]}{" "}
        {accountListQuery.data?.["family-name"]}
      </div>
      <div>Buyer/Admin</div>
    </div>
  );
};

export default Profile;
