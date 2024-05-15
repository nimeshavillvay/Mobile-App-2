"use client";

import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import Separator from "@/old/_components/separator";
import useAccountSelectorDialog from "@/old/_hooks/account/use-account-selector-dialog.hook";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineSwapHoriz } from "react-icons/md";
import defaultAvatar from "./default-avatar.png";

const Profile = ({ token }: { token: string }) => {
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data?.manageContact?.yourProfile;

  // TODO: Need to remove if account selector is not needed
  const setAccountSelectorOpen = useAccountSelectorDialog(
    (state) => state.setOpen,
  );

  return (
    <div className="mb-3 space-y-2">
      <div className="flex flex-row gap-2">
        <div className="relative">
          <Image
            src={defaultAvatar}
            alt="A picture of the default avatar"
            width={117}
            height={117}
          />

          <button
            className="absolute bottom-0 right-0 bg-brand-secondary p-1 text-white"
            aria-label="Edit profile picture"
          >
            <MdOutlineModeEdit />
          </button>
        </div>

        <div className="min-w-32 space-y-2">
          <div>Company</div>

          <div className="flex flex-row items-center gap-1">
            <span>{userProfile.id ?? "N/A"}</span>

            <button
              aria-label="Switch address"
              onClick={() => setAccountSelectorOpen(true)}
            >
              <MdOutlineSwapHoriz className="text-lg leading-none" />
            </button>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-black/10"
          />

          <Link
            href="/myaccount/company-profile"
            className="flex flex-row items-center gap-0.5 font-wurth text-sm font-extrabold uppercase hover:text-brand-primary"
          >
            <span>Company profile</span>

            <FaArrowRight className="text-xs leading-none" />
          </Link>
        </div>
      </div>

      <div>
        {userProfile.firstName !== "" ? userProfile.firstName : "N/A"}&nbsp;
        {userProfile.lastName !== "" ? userProfile.lastName : "N/A"}
      </div>

      <div className="capitalize">
        {userProfile.roleDescription !== ""
          ? userProfile.roleDescription
          : "N/A"}
        /
        {userProfile.permission !== ""
          ? userProfile.permission.toLowerCase()
          : "N/A"}
      </div>
    </div>
  );
};

export default Profile;
