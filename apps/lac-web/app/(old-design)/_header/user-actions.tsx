"use client";

import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useFavoriteCount from "@/old/_hooks/account/use-favorite-count.hook";
import useLoginDialog from "@/old/_hooks/account/use-login-dialog.hook";
import useLogout from "@/old/_hooks/account/use-logout.hook";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ADDRESS_ID_COOKIE } from "@/old/_lib/constants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const UserActions = () => {
  const accountListQuery = useAccountList();
  const favoriteCountQuery = useFavoriteCount();
  const [cookies] = useCookies();
  const setLoginDialogOpen = useLoginDialog((state) => state.setOpen);
  const logout = useLogout();

  if (!accountListQuery.data) {
    return (
      <div className="flex flex-row items-center gap-4">
        <Link href="/register" className="hover:text-brand-primary">
          Register
        </Link>

        <span>or</span>

        <button className="hover:text-brand-primary">Apply</button>

        <button
          className="bg-brand-gray-500 px-5 py-2.5 font-bold text-white"
          onClick={() => setLoginDialogOpen(true)}
        >
          Sign in
        </button>

        <button className="hover:text-brand-primary">En</button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            aria-label="User menu"
            className="group flex flex-row items-center gap-[5px] self-stretch text-sm leading-4 text-brand-gray-500"
          >
            <FaRegUser className="text-base leading-none" />

            <div className="ml-1.5 text-right">
              <div>
                <span className="text-black group-hover:text-brand-primary group-data-[state=open]:text-brand-primary">
                  Hi! {accountListQuery.data?.["given-name"]}{" "}
                </span>
                (#{cookies[ADDRESS_ID_COOKIE]})
              </div>

              <div className="flex flex-row items-center">
                View Account & History
              </div>
            </div>

            <MdArrowDropDown className="self-end" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="flex flex-col items-stretch bg-white">
            <DropdownMenu.Item asChild>
              <Link href="/myaccount/orderhistory">My Orders</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link href="/myaccount/purchaseditems">My Purchased Items</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                href="/myaccount/myfavorites"
                className="flex flex-row items-center gap-1"
              >
                <span>My Favorites</span>

                <IoMdHeartEmpty className="text-brand-primary" />

                <span className="text-brand-primary">
                  {favoriteCountQuery?.data?.data ?? 0} items
                </span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link href="/myaccount/manage-users">User Management</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <button className="text-left" onClick={logout}>
                Logout
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <button className="bg-brand-gray-500 px-5 py-2.5 font-bold text-white">
        Quick Order
      </button>

      <button className="hover:text-brand-primary">En</button>
    </div>
  );
};

export default UserActions;
