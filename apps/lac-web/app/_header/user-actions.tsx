"use client";

import useAccountList from "@/_hooks/account/use-account-list.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import useFavouriteCount from "@/_hooks/account/use-favourite-count.hook";
import useLogout from "@/_hooks/account/use-logout.hook";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import Login from "./login";

const UserActions = () => {
  const accountListQuery = useAccountList();
  const favouriteCountQuery = useFavouriteCount();
  const [addressId] = useAddressId();
  const logout = useLogout();

  if (!accountListQuery.data) {
    return (
      <div className="flex flex-row items-center gap-2">
        <Link href="/register" className="hover:text-brand-primary">
          Register
        </Link>

        <span>or</span>

        <button className="hover:text-brand-primary">Apply</button>

        <Login />

        <button className="hover:text-brand-primary">En</button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            aria-label="User menu"
            className="flex flex-row items-center gap-2"
          >
            <FaRegUser />

            <div className="text-right">
              <div>
                Hi! {accountListQuery.data?.["given-name"]} (#{addressId})
              </div>

              <div className="flex flex-row items-center">
                <span>View Account & History</span>
                <MdArrowDropDown />
              </div>
            </div>
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
                  {favouriteCountQuery?.data?.data ?? 0} items
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

      <button className="bg-brand-primary text-white">Quick Order</button>

      <button className="hover:text-brand-primary">En</button>
    </div>
  );
};

export default UserActions;
