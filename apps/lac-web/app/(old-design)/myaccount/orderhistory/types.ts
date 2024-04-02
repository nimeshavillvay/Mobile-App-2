export type MyOrders = {
  order_status: unknown[];
  orderHistoryResponse: OrderHistoryResponse;
};

export type OrderHistoryResponse = {
  content: OrderItem[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
};

export type OrderItem = {
  orderNo: string;
  orderType: OrderType;
  status: OrderStatus;
  orderDate: string;
  orderBy: string;
  po: string;
  jobName: string;
  orderTotal: number;
  tax: number;
  totalAmountWithTax: number;
};

export type OrderType =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X";

export type OrderStatus = "C" | "I" | "R" | "S" | "K" | "F";

export type Pageable = {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};
