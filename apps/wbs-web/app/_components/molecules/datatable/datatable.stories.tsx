import type { LiteProduct } from "@repo/shared-logic/models/product";
import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";

// Define the DataTableProps type
interface DataTableProps<TData, TValue> {
  readonly columns: ColumnDef<TData, TValue>[];
  readonly data: TData[];
}

// Define the columns and data
const columns: ColumnDef<LiteProduct>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Handle",
    accessorKey: "handle",
  },
  {
    header: "Brand",
    accessorKey: "brandName",
  },
  {
    header: "Category",
    accessorKey: "categoryName",
  },
];

const sampleData: LiteProduct[] = [
  {
    id: "1",
    title: "Wireless Mouse",
    handle: "wireless-mouse",
    brandName: "Logitech",
    categoryName: "Electronics",
    imageUrl: "/wireless-mouse",
    variants: [],
  },
  {
    id: "2",
    title: "Wireless Mouse 2",
    handle: "wireless-mouse-2",
    brandName: "Logitech",
    categoryName: "Electronics",
    imageUrl: "/wireless-mouse-2",
    variants: [],
  },
];

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    columns: {
      control: "object",
      description: "Column definitions for the data table",
    },
    data: {
      control: "object",
      description: "Data to be displayed in the table",
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<DataTableProps<LiteProduct, unknown>>;

type Story = StoryObj<DataTableProps<LiteProduct, unknown>>;

export const Default: Story = {
  args: {
    columns: columns,
    data: sampleData,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
};
