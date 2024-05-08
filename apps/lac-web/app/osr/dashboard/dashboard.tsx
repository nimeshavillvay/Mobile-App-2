"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import { Label } from "@repo/web-ui/components/ui/label";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { changeSearchParams } from "./client-helpers";
import {
  INIT_PAGE_NUMBER,
  QUERY_KEYS,
  columnAccount,
  columnCartItemCount,
  columnCartLastUpdate,
  columnCartSubtotal,
  columnEmailAndPhone,
  columnNameAndCompany,
  columnPrimaryRep,
  columnStreetAddress,
  columnTotalOrders,
} from "./constants";
import OSRDashboardCustomersLoading from "./loading";
import MyCustomerDetails from "./my-customers-details";

const Dashboard = ({ token }: { token: string }) => {
  const allColumns = [
    columnAccount,
    columnEmailAndPhone,
    columnNameAndCompany,
    columnStreetAddress,
    columnPrimaryRep,
    columnTotalOrders,
    columnCartSubtotal,
    columnCartItemCount,
    columnCartLastUpdate,
  ];

  const [columnsChecked, setColumnsChecked] = useState(allColumns);

  const searchParams = useSearchParams();

  const selfOnly =
    searchParams.get("selfOnly") === "true" ||
    searchParams.get("selfOnly") === null;

  const searchText = searchParams.get("searchText") ?? "";
  const [searchInput, setSearchInput] = useState(searchText);

  const sortColumnsMatchingToAllColumnsArray = (columns: string[]) => {
    return allColumns.filter((column) => columns.includes(column));
  };

  return (
    <div className="my-5">
      <div className="my-2 grid grid-cols-1 gap-y-2 md:grid-cols-3">
        <div className="col-span-1">
          <div className="flex max-w-56 flex-row items-center">
            <Label className="mr-2">View:</Label>

            <Select
              value={selfOnly ? "self" : "all"}
              onValueChange={(value) => {
                changeSearchParams(searchParams, [
                  {
                    key: QUERY_KEYS.SELF_ONLY,
                    value: (value === "self").toString(),
                  },
                  {
                    key: QUERY_KEYS.PAGE,
                    value: INIT_PAGE_NUMBER,
                  },
                ]);
              }}
            >
              <SelectTrigger className="ui-w-[180px] rounded-md">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="self">Assigned to me</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="col-span-1">
          <div>
            <SearchBox className="rounded">
              <SearchBoxInput
                value={searchInput}
                placeholder="Search all customers"
                className="rounded text-wurth-gray-500"
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <SearchBoxButton
                onClick={() => {
                  changeSearchParams(searchParams, [
                    {
                      key: QUERY_KEYS.SEARCH_TEXT,
                      value: searchInput,
                    },
                    {
                      key: QUERY_KEYS.PAGE,
                      value: INIT_PAGE_NUMBER,
                    },
                  ]);
                }}
              />
            </SearchBox>
          </div>
        </div>

        <div className="col-span-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger className="float-end flex items-center gap-1 rounded border px-3 py-2 text-sm">
              Columns
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {allColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={columnsChecked.includes(column)}
                  onCheckedChange={(checked) => {
                    let columns = [];
                    if (checked) {
                      columns = [...columnsChecked, column];
                    } else {
                      columns = columnsChecked.filter((col) => col !== column);
                    }
                    setColumnsChecked(
                      sortColumnsMatchingToAllColumnsArray(columns),
                    );
                  }}
                  className="DropdownMenuItemIndicator1"
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Suspense
        fallback={
          <OSRDashboardCustomersLoading
            columnsChecked={columnsChecked}
            selfOnly={selfOnly}
          />
        }
      >
        <MyCustomerDetails
          token={token}
          searchText={searchText}
          selfOnly={selfOnly}
          columnsChecked={columnsChecked}
        />
      </Suspense>
    </div>
  );
};

export default Dashboard;
