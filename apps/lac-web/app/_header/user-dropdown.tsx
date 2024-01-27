import useAccountList from "@/_hooks/account/use-account-list.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import useFavouriteCount from "@/_hooks/account/use-favourite-count.hook";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const UserDropdown = () => {
  const accountListQuery = useAccountList();
  const favouriteCountQuery = useFavouriteCount();
  const [addressId] = useAddressId();

  return (
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
            <button className="text-left">Logout </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
